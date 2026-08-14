<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HeroSlideResource\Pages;
use App\Models\HeroSlide;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class HeroSlideResource extends Resource
{
    protected static ?string $model = HeroSlide::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';

    protected static ?string $navigationGroup = 'Website';

    protected static ?string $modelLabel = 'Hero Slide';

    protected static ?string $pluralModelLabel = 'Hero Slides';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('eyebrow')->label('Eyebrow'),
            Forms\Components\TextInput::make('title_line_1')->label('หัวข้อบรรทัด 1')->required(),
            Forms\Components\TextInput::make('title_line_2')->label('หัวข้อบรรทัด 2'),
            Forms\Components\Textarea::make('description')->label('รายละเอียด')->rows(3)->columnSpanFull(),
            Forms\Components\FileUpload::make('image')
                ->label('รูปภาพพื้นหลัง')
                ->image()
                ->disk(\App\Support\Media::diskName())
                ->directory('hero')
                ->visibility('public')
                ->imagePreviewHeight('280')
                ->loadingIndicatorPosition('left')
                ->panelAspectRatio('16:9')
                ->panelLayout('integrated')
                ->removeUploadedFileButtonPosition('right')
                ->uploadButtonPosition('left')
                ->uploadProgressIndicatorPosition('left')
                ->openable()
                ->downloadable()
                ->helperText('กดเพื่อเลือกไฟล์รูปจากเครื่อง')
                ->columnSpanFull(),
            Forms\Components\TextInput::make('primary_cta_label')->label('ปุ่มหลัก'),
            Forms\Components\TextInput::make('primary_cta_url')->label('ลิงก์ปุ่มหลัก'),
            Forms\Components\TextInput::make('secondary_cta_label')->label('ปุ่มรอง'),
            Forms\Components\TextInput::make('secondary_cta_url')->label('ลิงก์ปุ่มรอง'),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
            Forms\Components\Toggle::make('is_active')->label('เปิดใช้งาน')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('รูป')
                    ->getStateUsing(fn (HeroSlide $record) => \App\Support\Media::url($record->image)),
                Tables\Columns\TextColumn::make('title_line_1')->label('หัวข้อ')->searchable(),
                Tables\Columns\TextColumn::make('sort_order')->label('ลำดับ')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->boolean()->label('เปิด'),
            ])
            ->defaultSort('sort_order')
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
            'index' => Pages\ListHeroSlides::route('/'),
            'create' => Pages\CreateHeroSlide::route('/create'),
            'edit' => Pages\EditHeroSlide::route('/{record}/edit'),
        ];
    }
}
