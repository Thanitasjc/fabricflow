<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OpportunityResource\Pages;
use App\Models\Opportunity;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class OpportunityResource extends Resource
{
    protected static ?string $model = Opportunity::class;
    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';
    protected static ?string $navigationGroup = 'CRM';
    protected static ?string $modelLabel = 'Opportunity';
    protected static ?string $pluralModelLabel = 'Sales Pipeline';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('code')->required()->unique(ignoreRecord: true)->default(fn () => \App\Support\DocumentNumber::opportunity()),
            Forms\Components\TextInput::make('title')->required()->label('หัวข้อดีล'),
            Forms\Components\Select::make('company_id')->relationship('company','name')->searchable()->preload(),
            Forms\Components\Select::make('customer_id')->relationship('customer','name')->searchable()->preload(),
            Forms\Components\Select::make('contact_id')->relationship('contact','name')->searchable()->preload(),
            Forms\Components\Select::make('lead_id')->relationship('lead','name')->searchable()->preload(),
            Forms\Components\Select::make('product_id')->relationship('product','name')->searchable()->preload(),
            Forms\Components\Select::make('owner_user_id')->relationship('owner','name')->label('Sales Owner')->searchable()->preload(),
            Forms\Components\Select::make('stage')->options(\App\Models\Opportunity::STAGES)->required(),
            Forms\Components\TextInput::make('estimated_meters')->numeric()->label('ปริมาณ (ม.)'),
            Forms\Components\TextInput::make('estimated_value')->numeric()->label('มูลค่า'),
            Forms\Components\TextInput::make('probability')->numeric()->minValue(0)->maxValue(100),
            Forms\Components\DatePicker::make('expected_close_date'),
            Forms\Components\DatePicker::make('next_follow_up_at')->label('Follow-up'),
            Forms\Components\Textarea::make('notes')->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('code')->searchable(),
                Tables\Columns\TextColumn::make('title')->searchable()->limit(28),
                Tables\Columns\TextColumn::make('company.name')->label('บริษัท'),
                Tables\Columns\TextColumn::make('stage')->formatStateUsing(fn ($state) => \App\Models\Opportunity::STAGES[$state] ?? $state)->badge(),
                Tables\Columns\TextColumn::make('estimated_value')->money('THB')->label('มูลค่า'),
                Tables\Columns\TextColumn::make('owner.name')->label('Owner'),
                Tables\Columns\TextColumn::make('next_follow_up_at')->date('d M Y')->label('Follow-up'),
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
            'index' => Pages\ListOpportunities::route('/'),
            'create' => Pages\CreateOpportunity::route('/create'),
            'edit' => Pages\EditOpportunity::route('/{record}/edit'),
        ];
    }
}