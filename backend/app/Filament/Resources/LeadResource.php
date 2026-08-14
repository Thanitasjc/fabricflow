<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeadResource\Pages;
use App\Models\Lead;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;

    protected static ?string $navigationIcon = 'heroicon-o-funnel';

    protected static ?string $navigationGroup = 'CRM';

    protected static ?string $modelLabel = 'Lead';

    protected static ?string $pluralModelLabel = 'Leads';

    protected static ?int $navigationSort = 7;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('customer_id')->label('ลูกค้า')
                ->relationship('customer', 'name')->searchable()->preload(),
            Forms\Components\Select::make('product_id')->label('สินค้าสนใจ')
                ->relationship('product', 'name')->searchable()->preload(),
            Forms\Components\TextInput::make('name')->label('ชื่อ')->required(),
            Forms\Components\TextInput::make('phone')->label('โทร'),
            Forms\Components\TextInput::make('email')->label('อีเมล')->email(),
            Forms\Components\TextInput::make('topic')->label('หัวข้อ'),
            Forms\Components\Select::make('status')->label('สถานะ')
                ->options(Lead::STATUSES)->required()->default('new'),
            Forms\Components\TextInput::make('estimated_meters')->label('ปริมาณโดยประมาณ (ม.)')->numeric(),
            Forms\Components\Textarea::make('message')->label('ข้อความ')->rows(4)->columnSpanFull(),
            Forms\Components\Textarea::make('notes')->label('โน้ตภายใน')->rows(3)->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->label('ชื่อ')->searchable(),
                Tables\Columns\TextColumn::make('phone')->label('โทร'),
                Tables\Columns\TextColumn::make('customer.name')->label('ลูกค้า'),
                Tables\Columns\TextColumn::make('product.name')->label('สินค้า')->limit(24),
                Tables\Columns\TextColumn::make('status')->label('สถานะ')
                    ->formatStateUsing(fn (string $state) => Lead::STATUSES[$state] ?? $state)
                    ->badge(),
                Tables\Columns\TextColumn::make('estimated_meters')->label('ม.')->numeric(2),
                Tables\Columns\TextColumn::make('created_at')->dateTime('d/m/Y H:i')->label('สร้าง'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')->options(Lead::STATUSES),
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
            'index' => Pages\ListLeads::route('/'),
            'create' => Pages\CreateLead::route('/create'),
            'edit' => Pages\EditLead::route('/{record}/edit'),
        ];
    }
}
