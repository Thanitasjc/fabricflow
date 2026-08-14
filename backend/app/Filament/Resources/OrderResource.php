<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers\ItemsRelationManager;
use App\Models\Order;
use App\Support\DocumentNumber;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';

    protected static ?string $navigationGroup = 'Sales';

    protected static ?string $modelLabel = 'Sales Order';

    protected static ?string $pluralModelLabel = 'Sales Orders';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('number')->label('เลขที่')
                ->required()->unique(ignoreRecord: true)
                ->default(fn () => DocumentNumber::order()),
            Forms\Components\Select::make('customer_id')->label('ลูกค้า')
                ->relationship('customer', 'name')->searchable()->preload()->required(),
            Forms\Components\Select::make('quotation_id')->label('ใบเสนอราคา')
                ->relationship('quotation', 'number')->searchable()->preload(),
            Forms\Components\Select::make('status')->label('สถานะ')
                ->options(Order::STATUSES)->required()->default('draft')
                ->disabled(fn (?Order $record) => $record?->isStockDeducted()),
            Forms\Components\DatePicker::make('order_date')->label('วันที่ออเดอร์')->default(now()),
            Forms\Components\TextInput::make('discount')->label('ส่วนลด')->numeric()->default(0),
            Forms\Components\TextInput::make('subtotal')->label('ยอดรวม')->disabled()->dehydrated(),
            Forms\Components\TextInput::make('total')->label('สุทธิ')->disabled()->dehydrated(),
            Forms\Components\Placeholder::make('stock_info')
                ->label('สถานะสต็อก')
                ->content(fn (?Order $record) => $record?->isStockDeducted()
                    ? 'ตัดสต็อกแล้วเมื่อ '.$record->stock_deducted_at?->format('d/m/Y H:i')
                    : 'ยังไม่ตัดสต็อก'),
            Forms\Components\Textarea::make('notes')->label('หมายเหตุ')->rows(3)->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('number')->label('เลขที่')->searchable(),
                Tables\Columns\TextColumn::make('customer.name')->label('ลูกค้า')->searchable(),
                Tables\Columns\TextColumn::make('status')->label('สถานะ')
                    ->formatStateUsing(fn (string $state) => Order::STATUSES[$state] ?? $state)
                    ->badge()
                    ->color(fn (string $state) => match ($state) {
                        'confirmed', 'shipped', 'completed' => 'success',
                        'cancelled' => 'danger',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('total')->label('สุทธิ')->money('THB'),
                Tables\Columns\IconColumn::make('stock_deducted_at')->label('ตัดสต็อก')
                    ->boolean()
                    ->getStateUsing(fn (Order $record) => $record->isStockDeducted()),
                Tables\Columns\TextColumn::make('order_date')->date('d/m/Y')->label('วันที่'),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [ItemsRelationManager::class];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
