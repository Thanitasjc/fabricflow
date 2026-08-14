<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use RuntimeException;

class StockService
{
    public function receive(
        Product $product,
        float $meters,
        ?string $note = null,
        ?Model $reference = null,
        ?int $productColorId = null,
        ?int $warehouseId = null,
    ): StockMovement {
        return $this->apply($product, 'in', abs($meters), $note, $reference, $productColorId, false, false, $warehouseId);
    }

    public function issue(
        Product $product,
        float $meters,
        ?string $note = null,
        ?Model $reference = null,
        ?int $productColorId = null,
        bool $allowNegative = false,
        ?int $warehouseId = null,
    ): StockMovement {
        return $this->apply($product, 'out', abs($meters), $note, $reference, $productColorId, $allowNegative, false, $warehouseId);
    }

    public function adjustTo(
        Product $product,
        float $newBalance,
        ?string $note = null,
    ): StockMovement {
        $current = (float) $product->stock_meters;
        $delta = round($newBalance - $current, 2);

        if ($delta >= 0) {
            return $this->apply($product, 'adjust', $delta, $note ?? 'ปรับปรุงสต็อก', null, null, true);
        }

        return $this->apply($product, 'adjust', abs($delta), $note ?? 'ปรับปรุงสต็อก', null, null, true, isDecrease: true);
    }

    public function confirmOrder(Order $order): void
    {
        DB::transaction(function () use ($order) {
            $order = Order::query()->with(['items.product', 'customer'])->lockForUpdate()->findOrFail($order->id);

            if ($order->isStockDeducted()) {
                throw new RuntimeException('ออเดอร์นี้ตัดสต็อกไปแล้ว');
            }

            if ($order->items->isEmpty()) {
                throw new RuntimeException('ออเดอร์ยังไม่มีรายการสินค้า');
            }

            app(CreditService::class)->consumeForOrder($order);

            foreach ($order->items as $item) {
                $this->issue(
                    $item->product,
                    (float) $item->quantity_meters,
                    'ตัดสต็อกจากออเดอร์ '.$order->number,
                    $order,
                    $item->product_color_id,
                );
            }

            $order->update([
                'status' => 'confirmed',
                'stock_deducted_at' => now(),
                'order_date' => $order->order_date ?? now()->toDateString(),
            ]);
        });
    }

    public function cancelOrder(Order $order): void
    {
        DB::transaction(function () use ($order) {
            $order = Order::query()->with(['items.product', 'customer'])->lockForUpdate()->findOrFail($order->id);

            if ($order->isStockDeducted()) {
                foreach ($order->items as $item) {
                    $this->receive(
                        $item->product,
                        (float) $item->quantity_meters,
                        'คืนสต็อกจากยกเลิกออเดอร์ '.$order->number,
                        $order,
                        $item->product_color_id,
                    );
                }

                app(CreditService::class)->releaseForOrder($order);
            }

            $order->update([
                'status' => 'cancelled',
                'stock_deducted_at' => null,
            ]);
        });
    }

    private function apply(
        Product $product,
        string $type,
        float $meters,
        ?string $note,
        ?Model $reference,
        ?int $productColorId,
        bool $allowNegative = false,
        bool $isDecrease = false,
        ?int $warehouseId = null,
    ): StockMovement {
        if ($meters < 0) {
            throw new InvalidArgumentException('จำนวนเมตรต้องไม่ติดลบ');
        }

        return DB::transaction(function () use ($product, $type, $meters, $note, $reference, $productColorId, $allowNegative, $isDecrease, $warehouseId) {
            $locked = Product::query()->lockForUpdate()->findOrFail($product->id);
            $current = (float) $locked->stock_meters;

            $decrease = $isDecrease || $type === 'out';
            $delta = $decrease ? -abs($meters) : abs($meters);
            $balance = round($current + $delta, 2);

            if (! $allowNegative && $balance < 0) {
                throw new RuntimeException("สต็อกไม่พอสำหรับ {$locked->sku} (คงเหลือ {$current} ม.)");
            }

            $storedBalance = max(0, $balance);

            $locked->update([
                'stock_meters' => $storedBalance,
                'in_stock' => $storedBalance > 0,
            ]);

            return StockMovement::query()->create([
                'product_id' => $locked->id,
                'warehouse_id' => $warehouseId,
                'product_color_id' => $productColorId,
                'type' => $type,
                'quantity_meters' => abs($meters),
                'balance_after' => $storedBalance,
                'reference_type' => $reference?->getMorphClass(),
                'reference_id' => $reference?->getKey(),
                'note' => $note,
                'user_id' => auth()->id(),
            ]);
        });
    }
}
