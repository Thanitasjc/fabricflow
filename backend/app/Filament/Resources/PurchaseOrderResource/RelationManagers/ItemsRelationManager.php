<?php

namespace App\Filament\Resources\PurchaseOrderResource\RelationManagers;

use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    protected static ?string $title = 'รายการสั่งซื้อ';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('product_id')->label('สินค้า')
                ->relationship('product', 'name')->searchable()->preload()->required()
                ->live()
                ->afterStateUpdated(function (Set $set, ?string $state) {
                    $product = Product::query()->find($state);
                    if ($product) {
                        $set('description', $product->name.' ('.$product->sku.')');
                        $set('unit_cost', $product->wholesale_price);
                    }
                }),
            Forms\Components\TextInput::make('description'),
            Forms\Components\TextInput::make('quantity_meters')->numeric()->required()->default(100),
            Forms\Components\TextInput::make('unit_cost')->numeric()->required(),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('product.sku')->label('SKU'),
                Tables\Columns\TextColumn::make('description'),
                Tables\Columns\TextColumn::make('quantity_meters')->numeric(2)->label('ม.'),
                Tables\Columns\TextColumn::make('unit_cost')->money('THB'),
                Tables\Columns\TextColumn::make('line_total')->money('THB'),
            ])
            ->headerActions([Tables\Actions\CreateAction::make()])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}
