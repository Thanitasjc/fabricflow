<?php

namespace App\Filament\Resources\OrderResource\RelationManagers;

use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    protected static ?string $title = 'รายการสินค้า';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('product_id')->label('สินค้า')
                ->relationship('product', 'name')
                ->searchable()
                ->preload()
                ->required()
                ->live()
                ->afterStateUpdated(function (Set $set, ?string $state) {
                    $product = Product::query()->find($state);
                    if (! $product) {
                        return;
                    }
                    $set('description', $product->name.' ('.$product->sku.') · คงเหลือ '.$product->stock_meters.' ม.');
                    $set('unit_price', $product->wholesale_price);
                }),
            Forms\Components\Select::make('product_color_id')->label('สี')
                ->relationship('productColor', 'name', fn ($query, Get $get) => $query->where('product_id', $get('product_id')))
                ->searchable()
                ->preload(),
            Forms\Components\TextInput::make('description')->label('รายละเอียด'),
            Forms\Components\TextInput::make('quantity_meters')->label('จำนวน (ม.)')->numeric()->required()->default(1),
            Forms\Components\TextInput::make('unit_price')->label('ราคา/ม.')->numeric()->required(),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('product.sku')->label('SKU'),
                Tables\Columns\TextColumn::make('description')->label('รายละเอียด'),
                Tables\Columns\TextColumn::make('product.stock_meters')->label('คงเหลือ')->numeric(2),
                Tables\Columns\TextColumn::make('quantity_meters')->label('ม.')->numeric(2),
                Tables\Columns\TextColumn::make('unit_price')->label('ราคา/ม.')->money('THB'),
                Tables\Columns\TextColumn::make('line_total')->label('รวม')->money('THB'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->visible(fn () => ! $this->getOwnerRecord()->isStockDeducted()),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->visible(fn () => ! $this->getOwnerRecord()->isStockDeducted()),
                Tables\Actions\DeleteAction::make()
                    ->visible(fn () => ! $this->getOwnerRecord()->isStockDeducted()),
            ]);
    }
}
