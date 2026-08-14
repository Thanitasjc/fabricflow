<?php

namespace App\Filament\Resources\QuotationResource\Pages;

use App\Filament\Resources\OrderResource;
use App\Filament\Resources\QuotationResource;
use App\Models\Order;
use App\Models\Quotation;
use App\Support\DocumentNumber;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\DB;

class EditQuotation extends EditRecord
{
    protected static string $resource = QuotationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('convertOrder')
                ->label('สร้างออเดอร์')
                ->icon('heroicon-o-shopping-cart')
                ->color('success')
                ->requiresConfirmation()
                ->action(function () {
                    /** @var Quotation $quotation */
                    $quotation = $this->record->load('items');

                    if ($quotation->items->isEmpty()) {
                        Notification::make()->title('ยังไม่มีรายการสินค้า')->danger()->send();

                        return;
                    }

                    $order = DB::transaction(function () use ($quotation) {
                        $order = Order::query()->create([
                            'number' => DocumentNumber::order(),
                            'customer_id' => $quotation->customer_id,
                            'quotation_id' => $quotation->id,
                            'status' => 'draft',
                            'order_date' => now()->toDateString(),
                            'discount' => $quotation->discount,
                            'notes' => 'สร้างจากใบเสนอราคา '.$quotation->number,
                        ]);

                        foreach ($quotation->items as $item) {
                            $order->items()->create([
                                'product_id' => $item->product_id,
                                'product_color_id' => $item->product_color_id,
                                'description' => $item->description,
                                'quantity_meters' => $item->quantity_meters,
                                'unit_price' => $item->unit_price,
                                'sort_order' => $item->sort_order,
                            ]);
                        }

                        $quotation->update(['status' => 'accepted']);

                        return $order;
                    });

                    Notification::make()->title('สร้างออเดอร์แล้ว')->success()->send();

                    return redirect(OrderResource::getUrl('edit', ['record' => $order]));
                }),
            Actions\DeleteAction::make(),
        ];
    }
}
