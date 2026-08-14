<?php

namespace App\Filament\Resources\GoodsReceiptResource\Pages;

use App\Filament\Resources\GoodsReceiptResource;
use App\Services\ReceivingService;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditGoodsReceipt extends EditRecord
{
    protected static string $resource = GoodsReceiptResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('postStock')
                ->label('โพสต์รับเข้า + เพิ่มสต็อก')
                ->icon('heroicon-o-check-badge')
                ->color('success')
                ->visible(fn () => $this->record->status !== 'posted')
                ->requiresConfirmation()
                ->action(function () {
                    try {
                        app(ReceivingService::class)->post($this->record);
                        $this->refreshFormData(['status', 'received_at']);
                        Notification::make()->title('รับเข้าคลังและอัปเดตสต็อกแล้ว')->success()->send();
                    } catch (\Throwable $e) {
                        Notification::make()->title('โพสต์ไม่สำเร็จ')->body($e->getMessage())->danger()->send();
                    }
                }),
            Actions\DeleteAction::make()->visible(fn () => $this->record->status !== 'posted'),
        ];
    }
}
