<?php

namespace App\Filament\Resources;

use App\Filament\Resources\InvoiceResource\Pages;
use App\Models\Invoice;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class InvoiceResource extends Resource
{
    protected static ?string $model = Invoice::class;
    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationGroup = 'Finance';
    protected static ?string $modelLabel = 'ใบแจ้งหนี้';
    protected static ?string $pluralModelLabel = 'ใบแจ้งหนี้';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('number')->required()->unique(ignoreRecord: true)->default(fn () => \App\Support\DocumentNumber::invoice()),
            Forms\Components\Select::make('customer_id')->relationship('customer','name')->required()->searchable()->preload(),
            Forms\Components\Select::make('order_id')->relationship('order','number')->searchable()->preload(),
            Forms\Components\Select::make('status')->options(\App\Models\Invoice::STATUSES)->required(),
            Forms\Components\DatePicker::make('invoice_date')->default(now()),
            Forms\Components\DatePicker::make('due_date'),
            Forms\Components\TextInput::make('subtotal')->numeric()->default(0),
            Forms\Components\TextInput::make('vat_amount')->numeric()->default(0),
            Forms\Components\TextInput::make('total')->numeric()->default(0),
            Forms\Components\TextInput::make('paid_amount')->numeric()->default(0),
            Forms\Components\Textarea::make('notes')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('number')->searchable(),
                Tables\Columns\TextColumn::make('customer.name')->label('ลูกค้า'),
                Tables\Columns\TextColumn::make('status')->formatStateUsing(fn ($state) => \App\Models\Invoice::STATUSES[$state] ?? $state)->badge(),
                Tables\Columns\TextColumn::make('total')->money('THB'),
                Tables\Columns\TextColumn::make('paid_amount')->money('THB')->label('ชำระแล้ว'),
                Tables\Columns\TextColumn::make('due_date')->date('d/m/Y'),
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
            'index' => Pages\ListInvoices::route('/'),
            'create' => Pages\CreateInvoice::route('/create'),
            'edit' => Pages\EditInvoice::route('/{record}/edit'),
        ];
    }
}