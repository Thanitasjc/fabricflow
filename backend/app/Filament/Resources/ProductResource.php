<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers\ColorsRelationManager;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    protected static ?string $navigationGroup = 'Catalog';

    protected static ?string $modelLabel = 'สินค้าผ้า';

    protected static ?string $pluralModelLabel = 'สินค้าผ้า';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Fabric Product')->schema([
                Forms\Components\TextInput::make('name')->label('ชื่อสินค้า')->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
                Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
                Forms\Components\TextInput::make('sku')->label('SKU')->required()->unique(ignoreRecord: true),
                Forms\Components\TextInput::make('brand')->label('Brand'),
                Forms\Components\Select::make('category_id')->label('หมวดหมู่')
                    ->relationship('category', 'name_th')->searchable()->preload(),
                Forms\Components\Select::make('industries')->label('อุตสาหกรรม')
                    ->relationship('industries', 'name_th')->multiple()->preload()->searchable(),
                Forms\Components\TextInput::make('material')->label('วัสดุ'),
                Forms\Components\TextInput::make('composition')->label('Composition'),
                Forms\Components\TextInput::make('width')->label('ความกว้าง'),
                Forms\Components\TextInput::make('weight_gsm')->label('Weight GSM')->numeric(),
                Forms\Components\TextInput::make('color')->label('สีหลัก'),
                Forms\Components\TextInput::make('pattern')->label('Pattern'),
                Forms\Components\TextInput::make('finish')->label('Finish'),
                Forms\Components\TextInput::make('country_of_origin')->label('Country of Origin'),
                Forms\Components\Select::make('unit')->label('Unit')
                    ->options(['meter' => 'Meter', 'yard' => 'Yard', 'roll' => 'Roll'])
                    ->default('meter'),
                Forms\Components\TextInput::make('min_order_meters')->label('MOQ (ม.)')->numeric()->default(0),
                Forms\Components\Textarea::make('description')->label('รายละเอียด')->rows(4)->columnSpanFull(),
            ])->columns(2),
            Forms\Components\Section::make('Price Engine / สต็อก')->schema([
                Forms\Components\TextInput::make('retail_price')->label('Retail')->numeric()->required(),
                Forms\Components\TextInput::make('wholesale_price')->label('Wholesale')->numeric()->required(),
                Forms\Components\TextInput::make('dealer_price')->label('Dealer')->numeric(),
                Forms\Components\TextInput::make('vip_price')->label('VIP / Corporate')->numeric(),
                Forms\Components\TextInput::make('stock_meters')->label('Stock (ม.)')->numeric()->default(0),
                Forms\Components\Select::make('badge')->label('Badge')
                    ->options(['ขายดี' => 'ขายดี', 'ใหม่' => 'ใหม่', 'ราคาส่ง' => 'ราคาส่ง']),
                Forms\Components\Toggle::make('in_stock')->label('มีสินค้า')->default(true),
                Forms\Components\Toggle::make('is_featured')->label('สินค้าแนะนำ')->default(false),
                Forms\Components\Toggle::make('is_active')->label('เปิดใช้งาน')->default(true),
            ])->columns(3),
            Forms\Components\Section::make('รูปภาพ')->schema([
                Forms\Components\FileUpload::make('image')
                    ->label('รูปหลัก')
                    ->image()
                    ->disk(\App\Support\Media::diskName())
                    ->directory('products')
                    ->visibility('public')
                    ->imagePreviewHeight('200')
                    ->openable()
                    ->downloadable()
                    ->helperText('กดพื้นที่นี้เพื่อเลือกไฟล์รูปจากเครื่อง'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('รูป')
                    ->getStateUsing(fn (Product $record) => \App\Support\Media::url($record->image)),
                Tables\Columns\TextColumn::make('name')->label('ชื่อ')->searchable(),
                Tables\Columns\TextColumn::make('sku')->searchable(),
                Tables\Columns\TextColumn::make('category.name_th')->label('หมวด'),
                Tables\Columns\TextColumn::make('retail_price')->label('ปลีก')->money('THB'),
                Tables\Columns\TextColumn::make('wholesale_price')->label('ส่ง')->money('THB'),
                Tables\Columns\TextColumn::make('stock_meters')->label('คงเหลือ (ม.)')->numeric(0)->sortable(),
                Tables\Columns\IconColumn::make('in_stock')->boolean()->label('มีของ'),
                Tables\Columns\IconColumn::make('is_active')->boolean()->label('เปิด'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')->relationship('category', 'name_th')->label('หมวดหมู่'),
                Tables\Filters\TernaryFilter::make('is_featured')->label('แนะนำ'),
                Tables\Filters\Filter::make('low_stock')
                    ->label('สต็อกต่ำ (≤100)')
                    ->query(fn ($query) => $query->where('stock_meters', '<=', 100)),
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
        return [ColorsRelationManager::class];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
