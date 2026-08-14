<?php

namespace App\Filament\Resources\IndustryResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class CollectionsRelationManager extends RelationManager
{
    protected static string $relationship = 'collections';

    protected static ?string $title = 'คอลเลกชันในอุตสาหกรรม';

    public function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->label('ชื่อ')->required(),
            Forms\Components\Textarea::make('description')->label('รายละเอียด')->rows(3),
            Forms\Components\FileUpload::make('image')
                ->label('รูปภาพ')
                ->image()
                ->disk(\App\Support\Media::diskName())
                ->directory('industry-collections')
                ->visibility('public')
                ->imagePreviewHeight('160')
                ->openable()
                ->helperText('กดเพื่อเลือกไฟล์รูป'),
            Forms\Components\TextInput::make('sort_order')->numeric()->default(0),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('รูป')
                    ->getStateUsing(fn ($record) => \App\Support\Media::url($record->image)),
                Tables\Columns\TextColumn::make('name')->label('ชื่อ'),
                Tables\Columns\TextColumn::make('sort_order')->label('ลำดับ'),
            ])
            ->headerActions([Tables\Actions\CreateAction::make()])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }
}
