<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StockLotResource\Pages;
use App\Models\StockLot;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class StockLotResource extends Resource
{
    protected static ?string $model = StockLot::class;
    protected static ?string $navigationIcon = 'heroicon-o-queue-list';
    protected static ?string $navigationGroup = 'Inventory';
    protected static ?string $modelLabel = 'Lot / ม้วน';
    protected static ?string $pluralModelLabel = 'Lot / ม้วน';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('warehouse_id')->relationship('warehouse','name')->required()->searchable()->preload(),
            Forms\Components\Select::make('product_id')->relationship('product','name')->required()->searchable()->preload(),
            Forms\Components\TextInput::make('lot_number')->required(),
            Forms\Components\TextInput::make('roll_number'),
            Forms\Components\TextInput::make('quantity_meters')->numeric()->required(),
            Forms\Components\DatePicker::make('received_at'),
            Forms\Components\Select::make('status')->options(['available'=>'Available','reserved'=>'Reserved','sold'=>'Sold','hold'=>'Hold'])->default('available'),
            Forms\Components\Textarea::make('notes')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('lot_number')->searchable(),
                Tables\Columns\TextColumn::make('roll_number'),
                Tables\Columns\TextColumn::make('product.sku')->label('SKU'),
                Tables\Columns\TextColumn::make('warehouse.name')->label('คลัง'),
                Tables\Columns\TextColumn::make('quantity_meters')->numeric(2)->label('ม.'),
                Tables\Columns\TextColumn::make('status')->badge(),
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
            'index' => Pages\ListStockLots::route('/'),
            'create' => Pages\CreateStockLot::route('/create'),
            'edit' => Pages\EditStockLot::route('/{record}/edit'),
        ];
    }
}