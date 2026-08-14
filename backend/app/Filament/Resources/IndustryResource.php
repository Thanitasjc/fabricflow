<?php

namespace App\Filament\Resources;

use App\Filament\Resources\IndustryResource\Pages;
use App\Filament\Resources\IndustryResource\RelationManagers\CollectionsRelationManager;
use App\Models\Industry;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class IndustryResource extends Resource
{
    protected static ?string $model = Industry::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';

    protected static ?string $navigationGroup = 'Website';

    protected static ?string $modelLabel = 'อุตสาหกรรม';

    protected static ?string $pluralModelLabel = 'ผ้าแต่ละอุตสาหกรรม';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name_th')->label('ชื่อ (ไทย)')->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
            Forms\Components\TextInput::make('name_en')->label('ชื่อ (EN)'),
            Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
            Forms\Components\TextInput::make('description')->label('คำอธิบายสั้น'),
            Forms\Components\Textarea::make('intro')->label('Intro')->rows(3)->columnSpanFull(),
            Forms\Components\TextInput::make('guide_title')->label('หัวข้อคู่มือ'),
            Forms\Components\TagsInput::make('guide_body')->label('เนื้อหาคู่มือ (ทีละบรรทัด)')->columnSpanFull(),
            Forms\Components\FileUpload::make('image')
                ->label('รูปภาพ (การ์ดเมกะเมนู)')
                ->image()
                ->disk(\App\Support\Media::diskName())
                ->directory('industries')
                ->visibility('public')
                ->imagePreviewHeight('200')
                ->openable()
                ->downloadable()
                ->helperText('รูปนี้แสดงในการ์ดเมนูย่อย Header / หน้าอุตสาหกรรม'),
            Forms\Components\TextInput::make('sort_order')
                ->label('ลำดับในเมนู')
                ->numeric()
                ->default(0)
                ->helperText('เลขน้อยอยู่ก่อน — หรือลากเรียงในหน้ารายการ'),
            Forms\Components\Toggle::make('is_active')
                ->label('เปิดใช้งาน (แสดงในเมนู)')
                ->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('รูป')
                    ->getStateUsing(fn (Industry $record) => \App\Support\Media::url($record->image)),
                Tables\Columns\TextColumn::make('name_th')->label('ชื่อ')->searchable(),
                Tables\Columns\TextColumn::make('slug'),
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

    public static function getRelations(): array
    {
        return [CollectionsRelationManager::class];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListIndustries::route('/'),
            'create' => Pages\CreateIndustry::route('/create'),
            'edit' => Pages\EditIndustry::route('/{record}/edit'),
        ];
    }
}
