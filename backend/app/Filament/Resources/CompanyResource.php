<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CompanyResource\Pages;
use App\Models\Company;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CompanyResource extends Resource
{
    protected static ?string $model = Company::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    protected static ?string $navigationGroup = 'CRM';
    protected static ?string $modelLabel = 'บริษัท';
    protected static ?string $pluralModelLabel = 'บริษัท';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('code')->label('รหัส')->required()->unique(ignoreRecord: true)->default(fn () => \App\Support\DocumentNumber::company()),
            Forms\Components\TextInput::make('name')->label('ชื่อบริษัท')->required(),
            Forms\Components\TextInput::make('tax_id')->label('เลขภาษี'),
            Forms\Components\TextInput::make('industry')->label('อุตสาหกรรม'),
            Forms\Components\TextInput::make('phone')->label('โทร'),
            Forms\Components\TextInput::make('email')->email()->label('อีเมล'),
            Forms\Components\TextInput::make('website')->label('เว็บไซต์'),
            Forms\Components\Textarea::make('address')->label('ที่อยู่')->columnSpanFull(),
            Forms\Components\Textarea::make('notes')->label('หมายเหตุ')->columnSpanFull(),
            Forms\Components\Toggle::make('is_active')->label('ใช้งาน')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('code')->label('รหัส')->searchable(),
                Tables\Columns\TextColumn::make('name')->label('บริษัท')->searchable(),
                Tables\Columns\TextColumn::make('phone')->label('โทร'),
                Tables\Columns\TextColumn::make('contacts_count')->counts('contacts')->label('Contacts'),
                Tables\Columns\IconColumn::make('is_active')->boolean()->label('เปิด'),
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
            'index' => Pages\ListCompanies::route('/'),
            'create' => Pages\CreateCompany::route('/create'),
            'edit' => Pages\EditCompany::route('/{record}/edit'),
        ];
    }
}