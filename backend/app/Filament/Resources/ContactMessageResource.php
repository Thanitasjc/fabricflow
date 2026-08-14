<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactMessageResource\Pages;
use App\Models\ContactMessage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';

    protected static ?string $navigationGroup = 'CRM';

    protected static ?string $modelLabel = 'ข้อความติดต่อ';

    protected static ?string $pluralModelLabel = 'ข้อความติดต่อ';

    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->label('ชื่อ')->disabled(),
            Forms\Components\TextInput::make('phone')->label('โทร')->disabled(),
            Forms\Components\TextInput::make('email')->label('อีเมล')->disabled(),
            Forms\Components\TextInput::make('topic')->label('หัวข้อ')->disabled(),
            Forms\Components\Textarea::make('message')->label('ข้อความ')->rows(6)->disabled()->columnSpanFull(),
            Forms\Components\Toggle::make('is_read')->label('อ่านแล้ว'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('ชื่อ')->searchable(),
                Tables\Columns\TextColumn::make('phone')->label('โทร'),
                Tables\Columns\TextColumn::make('email')->label('อีเมล'),
                Tables\Columns\TextColumn::make('topic')->label('หัวข้อ'),
                Tables\Columns\TextColumn::make('lead.id')->label('Lead')
                    ->formatStateUsing(fn ($state) => $state ? '#'.$state : '-'),
                Tables\Columns\IconColumn::make('is_read')->boolean()->label('อ่าน'),
                Tables\Columns\TextColumn::make('created_at')->dateTime('d/m/Y H:i')->label('เมื่อ'),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactMessages::route('/'),
            'view' => Pages\ViewContactMessage::route('/{record}'),
        ];
    }
}
