<?php

namespace App\Filament\Resources\ContactMessageResource\Pages;

use App\Filament\Resources\ContactMessageResource;
use App\Filament\Resources\LeadResource;
use App\Models\ContactMessage;
use App\Models\Customer;
use App\Models\Lead;
use App\Support\DocumentNumber;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ViewRecord;
use Illuminate\Support\Facades\DB;

class ViewContactMessage extends ViewRecord
{
    protected static string $resource = ContactMessageResource::class;

    protected function mutateFormDataBeforeFill(array $data): array
    {
        /** @var ContactMessage $record */
        $record = $this->getRecord();
        if (! $record->is_read) {
            $record->update(['is_read' => true]);
        }

        return $data;
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('convertLead')
                ->label('แปลงเป็น Lead + ลูกค้า')
                ->icon('heroicon-o-funnel')
                ->color('success')
                ->visible(fn () => ! $this->record->lead_id)
                ->requiresConfirmation()
                ->action(function () {
                    /** @var ContactMessage $message */
                    $message = $this->record;

                    $lead = DB::transaction(function () use ($message) {
                        $customer = Customer::query()
                            ->when($message->email, fn ($q) => $q->where('email', $message->email))
                            ->when(! $message->email && $message->phone, fn ($q) => $q->where('phone', $message->phone))
                            ->first();

                        if (! $customer) {
                            $customer = Customer::query()->create([
                                'code' => DocumentNumber::customer(),
                                'name' => $message->name,
                                'type' => 'wholesale',
                                'phone' => $message->phone,
                                'email' => $message->email,
                                'notes' => 'สร้างจากข้อความติดต่อ #'.$message->id,
                                'is_active' => true,
                            ]);
                        }

                        $lead = Lead::query()->create([
                            'customer_id' => $customer->id,
                            'contact_message_id' => $message->id,
                            'name' => $message->name,
                            'phone' => $message->phone,
                            'email' => $message->email,
                            'topic' => $message->topic,
                            'message' => $message->message,
                            'status' => 'new',
                        ]);

                        $message->update([
                            'customer_id' => $customer->id,
                            'lead_id' => $lead->id,
                            'is_read' => true,
                        ]);

                        return $lead;
                    });

                    Notification::make()->title('สร้าง Lead และลูกค้าแล้ว')->success()->send();

                    return redirect(LeadResource::getUrl('edit', ['record' => $lead]));
                }),
            Actions\DeleteAction::make(),
        ];
    }
}
