<?php

namespace App\Filament\Resources;

use App\Filament\Resources\StockMovementResource\Pages;
use App\Models\Product;
use App\Models\StockMovement;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class StockMovementResource extends Resource
{
    protected static ?string $model = StockMovement::class;

    protected static ?string $navigationIcon = 'heroicon-o-arrows-right-left';

    protected static ?string $navigationGroup = 'Inventory';

    protected static ?string $modelLabel = 'ความเคลื่อนไหวสต็อก';

    protected static ?string $pluralModelLabel = 'ความเคลื่อนไหวสต็อก';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('product_id')->label('สินค้า')
                ->relationship('product', 'name')
                ->searchable()
                ->preload()
                ->required()
                ->helperText(fn (?string $state) => $state
                    ? 'คงเหลือปัจจุบัน: '.(Product::query()->find($state)?->stock_meters ?? 0).' ม.'
                    : null),
            Forms\Components\Select::make('type')->label('ประเภท')
                ->options(StockMovement::TYPES)
                ->required()
                ->default('in')
                ->live()
                ->helperText('ปรับปรุง = ตั้งค่าคงเหลือใหม่เป็นจำนวนที่กรอก'),
            Forms\Components\TextInput::make('quantity_meters')
                ->label(fn (Forms\Get $get) => $get('type') === 'adjust' ? 'คงเหลือใหม่ (เมตร)' : 'จำนวน (เมตร)')
                ->numeric()
                ->required()
                ->minValue(0),
            Forms\Components\TextInput::make('note')->label('หมายเหตุ')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('created_at')->dateTime('d/m/Y H:i')->label('เมื่อ')->sortable(),
                Tables\Columns\TextColumn::make('product.sku')->label('SKU')->searchable(),
                Tables\Columns\TextColumn::make('product.name')->label('สินค้า')->limit(28)->searchable(),
                Tables\Columns\TextColumn::make('type')->label('ประเภท')
                    ->formatStateUsing(fn (string $state) => StockMovement::TYPES[$state] ?? $state)
                    ->badge(),
                Tables\Columns\TextColumn::make('quantity_meters')->label('เมตร')->numeric(2),
                Tables\Columns\TextColumn::make('balance_after')->label('คงเหลือหลังทำ')->numeric(2),
                Tables\Columns\TextColumn::make('note')->label('หมายเหตุ')->limit(30),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('type')->options(StockMovement::TYPES),
                Tables\Filters\SelectFilter::make('product_id')->relationship('product', 'name')->label('สินค้า')->searchable()->preload(),
            ])
            ->actions([])
            ->bulkActions([]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListStockMovements::route('/'),
            'create' => Pages\CreateStockMovement::route('/create'),
        ];
    }

    public static function canEdit($record): bool
    {
        return false;
    }

    public static function canDelete($record): bool
    {
        return false;
    }
}
