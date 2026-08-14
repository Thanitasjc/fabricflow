<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LowStockProducts extends BaseWidget
{
    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    protected static ?string $heading = 'สินค้าสต็อกต่ำ (≤ 100 ม.)';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Product::query()
                    ->where('is_active', true)
                    ->where('stock_meters', '<=', 100)
                    ->orderBy('stock_meters')
            )
            ->columns([
                Tables\Columns\TextColumn::make('sku')->label('SKU'),
                Tables\Columns\TextColumn::make('name')->label('สินค้า')->searchable(),
                Tables\Columns\TextColumn::make('stock_meters')->label('คงเหลือ (ม.)')->numeric(2)->color('danger'),
                Tables\Columns\IconColumn::make('in_stock')->boolean()->label('มีของ'),
            ])
            ->paginated([5, 10]);
    }
}
