<?php

namespace App\Filament\Resources\OrderResource\Pages;

use App\Filament\Resources\OrderResource;
use App\Models\Order;
use App\Services\StockService;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditOrder extends EditRecord
{
    protected static string $resource = OrderResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('confirmStock')
                ->label('ยืนยันออเดอร์ + ตัดสต็อก')
                ->icon('heroicon-o-check-circle')
                ->color('success')
                ->visible(fn () => ! $this->record->isStockDeducted() && $this->record->status !== 'cancelled')
                ->requiresConfirmation()
                ->modalHeading('ยืนยันตัดสต็อก')
                ->modalDescription('ระบบจะตัดสต็อกตามรายการในออเดอร์ทันที')
                ->action(function () {
                    try {
                        app(StockService::class)->confirmOrder($this->record);
                        $this->refreshFormData(['status', 'stock_deducted_at', 'order_date']);
                        Notification::make()->title('ยืนยันออเดอร์และตัดสต็อกแล้ว')->success()->send();
                    } catch (\Throwable $e) {
                        Notification::make()->title('ตัดสต็อกไม่สำเร็จ')->body($e->getMessage())->danger()->send();
                    }
                }),
            Actions\Action::make('cancelOrder')
                ->label('ยกเลิกออเดอร์')
                ->icon('heroicon-o-x-circle')
                ->color('danger')
                ->visible(fn () => $this->record->status !== 'cancelled')
                ->requiresConfirmation()
                ->action(function () {
                    try {
                        app(StockService::class)->cancelOrder($this->record);
                        $this->refreshFormData(['status', 'stock_deducted_at']);
                        Notification::make()->title('ยกเลิกออเดอร์แล้ว')->success()->send();
                    } catch (\Throwable $e) {
                        Notification::make()->title('ยกเลิกไม่สำเร็จ')->body($e->getMessage())->danger()->send();
                    }
                }),
            Actions\DeleteAction::make()
                ->visible(fn () => ! $this->record->isStockDeducted()),
        ];
    }
}
