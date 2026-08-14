<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PurchaseOrderResource\Pages;
use App\Filament\Resources\PurchaseOrderResource\RelationManagers;
use App\Models\PurchaseOrder;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PurchaseOrderResource extends Resource
{
    protected static ?string $model = PurchaseOrder::class;
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-check';
    protected static ?string $navigationGroup = 'Purchasing';
    protected static ?string $modelLabel = 'ใบสั่งซื้อ';
    protected static ?string $pluralModelLabel = 'ใบสั่งซื้อ';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('number')->required()->unique(ignoreRecord: true)->default(fn () => \App\Support\DocumentNumber::purchaseOrder()),
            Forms\Components\Select::make('supplier_id')->relationship('supplier','name')->required()->searchable()->preload(),
            Forms\Components\Select::make('warehouse_id')->relationship('warehouse','name')->searchable()->preload(),
            Forms\Components\Select::make('status')->options(\App\Models\PurchaseOrder::STATUSES)->required(),
            Forms\Components\DatePicker::make('order_date')->default(now()),
            Forms\Components\DatePicker::make('expected_at'),
            Forms\Components\TextInput::make('total')->numeric()->disabled()->dehydrated(),
            Forms\Components\Textarea::make('notes')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('number')->searchable(),
                Tables\Columns\TextColumn::make('supplier.name'),
                Tables\Columns\TextColumn::make('status')->formatStateUsing(fn ($state) => \App\Models\PurchaseOrder::STATUSES[$state] ?? $state)->badge(),
                Tables\Columns\TextColumn::make('total')->money('THB'),
                Tables\Columns\TextColumn::make('order_date')->date('d/m/Y'),
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

    public static function getRelations(): array
    {
        return [
            RelationManagers\ItemsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPurchaseOrders::route('/'),
            'create' => Pages\CreatePurchaseOrder::route('/create'),
            'edit' => Pages\EditPurchaseOrder::route('/{record}/edit'),
        ];
    }
}