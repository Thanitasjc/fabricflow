<?php

namespace App\Filament\Resources\GoodsReceiptResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ItemsRelationManager extends RelationManager
{
    protected static string $relationship = 'items';

    protected static ?string $title = 'รายการรับเข้า';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('product_id')->relationship('product', 'name')->searchable()->preload()->required(),
            Forms\Components\TextInput::make('lot_number')->label('Lot'),
            Forms\Components\TextInput::make('roll_number')->label('Roll'),
            Forms\Components\TextInput::make('quantity_meters')->numeric()->required()->default(100),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('product.sku')->label('SKU'),
                Tables\Columns\TextColumn::make('product.name')->label('สินค้า'),
                Tables\Columns\TextColumn::make('lot_number'),
                Tables\Columns\TextColumn::make('roll_number'),
                Tables\Columns\TextColumn::make('quantity_meters')->numeric(2)->label('ม.'),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->visible(fn () => $this->getOwnerRecord()->status !== 'posted'),
            ])
            ->actions([
                Tables\Actions\EditAction::make()
                    ->visible(fn () => $this->getOwnerRecord()->status !== 'posted'),
                Tables\Actions\DeleteAction::make()
                    ->visible(fn () => $this->getOwnerRecord()->status !== 'posted'),
            ]);
    }
}
