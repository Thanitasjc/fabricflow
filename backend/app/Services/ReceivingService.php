<?php

namespace App\Services;

use App\Models\GoodsReceipt;
use App\Models\StockLot;
use App\Models\WarehouseStock;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class ReceivingService
{
    public function __construct(private StockService $stock) {}

    public function post(GoodsReceipt $receipt): void
    {
        DB::transaction(function () use ($receipt) {
            $receipt = GoodsReceipt::query()->with('items.product')->lockForUpdate()->findOrFail($receipt->id);

            if ($receipt->status === 'posted') {
                throw new RuntimeException('ใบรับสินค้านี้โพสต์แล้ว');
            }

            if ($receipt->items->isEmpty()) {
                throw new RuntimeException('ยังไม่มีรายการรับเข้า');
            }

            foreach ($receipt->items as $item) {
                $this->stock->receive(
                    $item->product,
                    (float) $item->quantity_meters,
                    'รับเข้าจาก GR '.$receipt->number,
                    $receipt,
                    $item->product_color_id,
                    $receipt->warehouse_id,
                );

                WarehouseStock::query()->updateOrCreate(
                    [
                        'warehouse_id' => $receipt->warehouse_id,
                        'product_id' => $item->product_id,
                        'product_color_id' => $item->product_color_id,
                    ],
                    []
                );

                $ws = WarehouseStock::query()
                    ->where('warehouse_id', $receipt->warehouse_id)
                    ->where('product_id', $item->product_id)
                    ->where(function ($q) use ($item) {
                        $item->product_color_id
                            ? $q->where('product_color_id', $item->product_color_id)
                            : $q->whereNull('product_color_id');
                    })
                    ->lockForUpdate()
                    ->first();

                $ws->increment('quantity_meters', (float) $item->quantity_meters);

                if ($item->lot_number || $item->roll_number) {
                    StockLot::query()->create([
                        'warehouse_id' => $receipt->warehouse_id,
                        'product_id' => $item->product_id,
                        'product_color_id' => $item->product_color_id,
                        'lot_number' => $item->lot_number ?: ('LOT-'.$receipt->number),
                        'roll_number' => $item->roll_number,
                        'quantity_meters' => $item->quantity_meters,
                        'received_at' => $receipt->received_at ?? now()->toDateString(),
                        'status' => 'available',
                    ]);
                }
            }

            $receipt->update([
                'status' => 'posted',
                'received_at' => $receipt->received_at ?? now()->toDateString(),
            ]);

            if ($receipt->purchase_order_id) {
                $receipt->purchaseOrder?->update(['status' => 'received']);
            }
        });
    }
}
