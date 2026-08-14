<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class ColorsRelationManager extends RelationManager
{
    protected static string $relationship = 'colors';

    protected static ?string $title = 'สีสินค้า';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->label('ชื่อสี')->required(),
            Forms\Components\TextInput::make('code')->label('รหัส'),
            Forms\Components\FileUpload::make('image')
                ->label('รูปสี')
                ->image()
                ->disk(\App\Support\Media::diskName())
                ->directory('product-colors')
                ->visibility('public')
                ->imagePreviewHeight('160')
                ->openable()
                ->helperText('กดเพื่อเลือกไฟล์รูป'),
            Forms\Components\TextInput::make('retail_price')->label('ราคาปลีก')->numeric(),
            Forms\Components\TextInput::make('wholesale_price')->label('ราคาส่ง')->numeric(),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
            Forms\Components\Toggle::make('in_stock')->label('มีสินค้า')->default(true),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('รูป')
                    ->getStateUsing(fn ($record) => \App\Support\Media::url($record->image)),
                Tables\Columns\TextColumn::make('name')->label('สี'),
                Tables\Columns\TextColumn::make('code'),
                Tables\Columns\IconColumn::make('in_stock')->boolean()->label('สต็อก'),
                Tables\Columns\TextColumn::make('sort_order')->label('ลำดับ'),
            ])
            ->headerActions([Tables\Actions\CreateAction::make()])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}
