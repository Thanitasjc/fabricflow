<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PaymentResource\Pages;
use App\Models\Payment;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PaymentResource extends Resource
{
    protected static ?string $model = Payment::class;
    protected static ?string $navigationIcon = 'heroicon-o-credit-card';
    protected static ?string $navigationGroup = 'Finance';
    protected static ?string $modelLabel = 'การรับชำระ';
    protected static ?string $pluralModelLabel = 'การรับชำระ';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('number')->required()->unique(ignoreRecord: true)->default(fn () => \App\Support\DocumentNumber::payment()),
            Forms\Components\Select::make('customer_id')->relationship('customer','name')->required()->searchable()->preload(),
            Forms\Components\Select::make('invoice_id')->relationship('invoice','number')->searchable()->preload(),
            Forms\Components\Select::make('method')->options(['cash'=>'Cash','transfer'=>'Transfer','credit'=>'Credit','cheque'=>'Cheque'])->required(),
            Forms\Components\TextInput::make('amount')->numeric()->required(),
            Forms\Components\DatePicker::make('paid_at')->default(now()),
            Forms\Components\TextInput::make('reference'),
            Forms\Components\Textarea::make('notes')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('number')->searchable(),
                Tables\Columns\TextColumn::make('customer.name'),
                Tables\Columns\TextColumn::make('invoice.number')->label('Invoice'),
                Tables\Columns\TextColumn::make('method')->badge(),
                Tables\Columns\TextColumn::make('amount')->money('THB'),
                Tables\Columns\TextColumn::make('paid_at')->date('d/m/Y'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPayments::route('/'),
            'create' => Pages\CreatePayment::route('/create'),
            'edit' => Pages\EditPayment::route('/{record}/edit'),
        ];
    }
}