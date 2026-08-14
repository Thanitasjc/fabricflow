<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BrandResource\Pages;
use App\Models\Brand;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class BrandResource extends Resource
{
    protected static ?string $model = Brand::class;

    protected static ?string $navigationIcon = 'heroicon-o-sparkles';

    protected static ?string $navigationGroup = 'Website';

    protected static ?string $modelLabel = 'แบรนด์';

    protected static ?string $pluralModelLabel = 'แบรนด์';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('ข้อมูลแบรนด์')->schema([
                Forms\Components\TextInput::make('name')
                    ->label('ชื่อแบรนด์')
                    ->required()
                    ->maxLength(120)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
                Forms\Components\TextInput::make('name_th')
                    ->label('ชื่อ (ไทย)')
                    ->maxLength(120),
                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(120),
                Forms\Components\TextInput::make('tagline')
                    ->label('แท็กไลน์')
                    ->maxLength(160),
                Forms\Components\TextInput::make('country')
                    ->label('ประเทศ / แหล่งกำเนิด')
                    ->maxLength(80),
                Forms\Components\TextInput::make('website_url')
                    ->label('เว็บไซต์')
                    ->url()
                    ->maxLength(255),
                Forms\Components\Textarea::make('description')
                    ->label('รายละเอียด')
                    ->rows(4)
                    ->columnSpanFull(),
            ])->columns(2),

            Forms\Components\Section::make('สื่อ')->schema([
                Forms\Components\FileUpload::make('logo')
                    ->label('โลโก้')
                    ->image()
                    ->disk(\App\Support\Media::diskName())
                    ->directory('brands/logos')
                    ->visibility('public')
                    ->imagePreviewHeight('120')
                    ->openable()
                    ->downloadable(),
                Forms\Components\FileUpload::make('image')
                    ->label('รูปปก / แบนเนอร์')
                    ->image()
                    ->disk(\App\Support\Media::diskName())
                    ->directory('brands')
                    ->visibility('public')
                    ->imagePreviewHeight('200')
                    ->openable()
                    ->downloadable()
                    ->helperText('ใช้บนหน้า /brands และการ์ดแบรนด์'),
                Forms\Components\TextInput::make('sort_order')
                    ->label('ลำดับ')
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('is_featured')
                    ->label('แนะนำ')
                    ->default(false),
                Forms\Components\Toggle::make('is_active')
                    ->label('เปิดใช้งาน')
                    ->default(true),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('logo')
                    ->label('โลโก้')
                    ->getStateUsing(fn (Brand $record) => \App\Support\Media::url($record->logo ?: $record->image)),
                Tables\Columns\TextColumn::make('name')->label('ชื่อ')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('country')->label('ประเทศ')->placeholder('—'),
                Tables\Columns\IconColumn::make('is_featured')->boolean()->label('แนะนำ'),
                Tables\Columns\IconColumn::make('is_active')->boolean()->label('เปิด'),
                Tables\Columns\TextColumn::make('sort_order')->label('ลำดับ')->sortable(),
            ])
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
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
            'index' => Pages\ListBrands::route('/'),
            'create' => Pages\CreateBrand::route('/create'),
            'edit' => Pages\EditBrand::route('/{record}/edit'),
        ];
    }
}
