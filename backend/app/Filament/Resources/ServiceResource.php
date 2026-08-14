<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';

    protected static ?string $navigationGroup = 'Website';

    protected static ?string $modelLabel = 'บริการ';

    protected static ?string $pluralModelLabel = 'บริการ';

    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('title')->label('ชื่อบริการ')->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state ?? ''))),
            Forms\Components\TextInput::make('slug')->required()->unique(ignoreRecord: true),
            Forms\Components\TextInput::make('eyebrow')->label('Eyebrow'),
            Forms\Components\TextInput::make('short_label')->label('ป้ายสั้น'),
            Forms\Components\TextInput::make('subtitle')->label('Subtitle')->columnSpanFull(),
            Forms\Components\TagsInput::make('highlights')->label('Highlights')->columnSpanFull(),
            Forms\Components\Repeater::make('body')->label('เนื้อหา')
                ->schema([
                    Forms\Components\TextInput::make('heading')->label('หัวข้อ'),
                    Forms\Components\Textarea::make('text')->label('ข้อความ')->rows(3),
                ])
                ->columnSpanFull(),
            Forms\Components\FileUpload::make('image')
                ->label('รูปภาพ')
                ->image()
                ->disk(\App\Support\Media::diskName())
                ->directory('services')
                ->visibility('public')
                ->imagePreviewHeight('200')
                ->openable()
                ->downloadable()
                ->helperText('กดเพื่อเลือกไฟล์รูปจากเครื่อง'),
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
                    ->getStateUsing(fn (Service $record) => \App\Support\Media::url($record->image)),
                Tables\Columns\TextColumn::make('title')->label('ชื่อ')->searchable(),
                Tables\Columns\TextColumn::make('slug'),
                Tables\Columns\IconColumn::make('is_active')->boolean()->label('เปิด'),
                Tables\Columns\TextColumn::make('sort_order')->label('ลำดับ')->sortable(),
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
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
