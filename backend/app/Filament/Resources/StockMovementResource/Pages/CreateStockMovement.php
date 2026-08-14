<?php

namespace App\Filament\Resources\StockMovementResource\Pages;

use App\Filament\Resources\StockMovementResource;
use App\Models\Product;
use App\Services\StockService;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;

class CreateStockMovement extends CreateRecord
{
    protected static string $resource = StockMovementResource::class;

    protected function handleRecordCreation(array $data): \Illuminate\Database\Eloquent\Model
    {
        $product = Product::query()->findOrFail($data['product_id']);
        $service = app(StockService::class);
        $meters = (float) $data['quantity_meters'];
        $note = $data['note'] ?? null;

        try {
            return match ($data['type']) {
                'in' => $service->receive($product, $meters, $note),
                'out' => $service->issue($product, $meters, $note),
                'adjust' => $service->adjustTo($product, $meters, $note),
                default => throw new \InvalidArgumentException('ประเภทไม่ถูกต้อง'),
            };
        } catch (\Throwable $e) {
            Notification::make()->title('ปรับสต็อกไม่สำเร็จ')->body($e->getMessage())->danger()->send();
            $this->halt();
        }
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'บันทึกความเคลื่อนไหวสต็อกแล้ว';
    }
}
