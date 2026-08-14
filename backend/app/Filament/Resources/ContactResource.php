<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactResource\Pages;
use App\Models\Contact;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ContactResource extends Resource
{
    protected static ?string $model = Contact::class;
    protected static ?string $navigationIcon = 'heroicon-o-identification';
    protected static ?string $navigationGroup = 'CRM';
    protected static ?string $modelLabel = 'Contact';
    protected static ?string $pluralModelLabel = 'Contacts';
    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('company_id')->label('บริษัท')->relationship('company','name')->searchable()->preload(),
            Forms\Components\TextInput::make('name')->label('ชื่อ')->required(),
            Forms\Components\TextInput::make('title')->label('ตำแหน่ง'),
            Forms\Components\TextInput::make('phone')->label('โทร'),
            Forms\Components\TextInput::make('email')->email()->label('อีเมล'),
            Forms\Components\TextInput::make('line_id')->label('LINE'),
            Forms\Components\Toggle::make('is_primary')->label('ผู้ติดต่อหลัก'),
            Forms\Components\Textarea::make('notes')->label('หมายเหตุ')->columnSpanFull(),
            Forms\Components\Toggle::make('is_active')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->label('ชื่อ'),
                Tables\Columns\TextColumn::make('company.name')->label('บริษัท'),
                Tables\Columns\TextColumn::make('title')->label('ตำแหน่ง'),
                Tables\Columns\TextColumn::make('phone')->label('โทร'),
                Tables\Columns\IconColumn::make('is_primary')->boolean()->label('หลัก'),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContacts::route('/'),
            'create' => Pages\CreateContact::route('/create'),
            'edit' => Pages\EditContact::route('/{record}/edit'),
        ];
    }
}