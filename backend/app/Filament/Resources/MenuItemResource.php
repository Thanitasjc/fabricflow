<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MenuItemResource\Pages;
use App\Models\MenuItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class MenuItemResource extends Resource
{
    protected static ?string $model = MenuItem::class;

    protected static ?string $navigationIcon = 'heroicon-o-bars-3-bottom-left';

    protected static ?string $navigationGroup = 'Website';

    protected static ?string $modelLabel = 'เมนู';

    protected static ?string $pluralModelLabel = 'เมนู Header';

    protected static ?int $navigationSort = 0;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->whereNull('parent_id')
            ->where('location', 'header');
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('รายการเมนูหลัก')->schema([
                Forms\Components\TextInput::make('label')
                    ->label('ชื่อเมนู')
                    ->required()
                    ->maxLength(120),
                Forms\Components\Select::make('type')
                    ->label('ประเภท')
                    ->options(MenuItem::TYPES)
                    ->required()
                    ->live()
                    ->default('link')
                    ->helperText('เมกะเมนูอุตสาหกรรม = ดึงรายการจาก Industries อัตโนมัติ'),
                Forms\Components\TextInput::make('href')
                    ->label('ลิงก์')
                    ->placeholder('/')
                    ->maxLength(255)
                    ->visible(fn (Get $get) => in_array($get('type'), ['link', 'dropdown', 'industries'], true))
                    ->helperText('เช่น /products หรือ /industries'),
                Forms\Components\Toggle::make('open_in_new_tab')
                    ->label('เปิดแท็บใหม่')
                    ->default(false),
                Forms\Components\TextInput::make('sort_order')
                    ->label('ลำดับ')
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('is_active')
                    ->label('เปิดใช้งาน')
                    ->default(true),
                Forms\Components\Hidden::make('location')->default('header'),
            ])->columns(2),

            Forms\Components\Section::make('เมนูย่อย')
                ->description('ใช้เมื่อประเภทเป็น Dropdown')
                ->visible(fn (Get $get) => $get('type') === 'dropdown')
                ->schema([
                    Forms\Components\Repeater::make('children')
                        ->relationship()
                        ->label('รายการย่อย')
                        ->orderColumn('sort_order')
                        ->defaultItems(0)
                        ->schema([
                            Forms\Components\TextInput::make('label')
                                ->label('ชื่อ')
                                ->required()
                                ->maxLength(120),
                            Forms\Components\TextInput::make('href')
                                ->label('ลิงก์')
                                ->required()
                                ->maxLength(255),
                            Forms\Components\Toggle::make('is_active')
                                ->label('เปิด')
                                ->default(true),
                            Forms\Components\Hidden::make('type')->default('link'),
                            Forms\Components\Hidden::make('location')->default('header'),
                        ])
                        ->columns(3)
                        ->collapsible()
                        ->itemLabel(fn (array $state): ?string => $state['label'] ?? null)
                        ->columnSpanFull(),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sort_order')->label('#')->sortable()->width('60px'),
                Tables\Columns\TextColumn::make('label')->label('ชื่อเมนู')->searchable(),
                Tables\Columns\TextColumn::make('type')
                    ->label('ประเภท')
                    ->badge()
                    ->formatStateUsing(fn (string $state) => MenuItem::TYPES[$state] ?? $state),
                Tables\Columns\TextColumn::make('href')->label('ลิงก์')->placeholder('—'),
                Tables\Columns\TextColumn::make('children_count')
                    ->counts('children')
                    ->label('เมนูย่อย'),
                Tables\Columns\IconColumn::make('is_active')->boolean()->label('เปิด'),
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
            'index' => Pages\ListMenuItems::route('/'),
            'create' => Pages\CreateMenuItem::route('/create'),
            'edit' => Pages\EditMenuItem::route('/{record}/edit'),
        ];
    }
}
