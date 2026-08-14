<?php

namespace App\Filament\Resources;

use App\Filament\Resources\QuotationResource\Pages;
use App\Filament\Resources\QuotationResource\RelationManagers\ItemsRelationManager;
use App\Models\Quotation;
use App\Support\DocumentNumber;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class QuotationResource extends Resource
{
    protected static ?string $model = Quotation::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationGroup = 'Sales';

    protected static ?string $modelLabel = 'ใบเสนอราคา';

    protected static ?string $pluralModelLabel = 'ใบเสนอราคา';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('number')->label('เลขที่')
                ->required()->unique(ignoreRecord: true)
                ->default(fn () => DocumentNumber::quotation()),
            Forms\Components\Select::make('customer_id')->label('ลูกค้า')
                ->relationship('customer', 'name')->searchable()->preload()->required(),
            Forms\Components\Select::make('lead_id')->label('Lead')
                ->relationship('lead', 'name')->searchable()->preload(),
            Forms\Components\Select::make('status')->label('สถานะ')
                ->options(Quotation::STATUSES)->required()->default('draft'),
            Forms\Components\DatePicker::make('valid_until')->label('ใช้ได้ถึง'),
            Forms\Components\TextInput::make('discount')->label('ส่วนลด')->numeric()->default(0),
            Forms\Components\TextInput::make('subtotal')->label('ยอดรวม')->disabled()->dehydrated(),
            Forms\Components\TextInput::make('total')->label('สุทธิ')->disabled()->dehydrated(),
            Forms\Components\Textarea::make('notes')->label('หมายเหตุ')->rows(3)->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('number')->label('เลขที่')->searchable(),
                Tables\Columns\TextColumn::make('customer.name')->label('ลูกค้า')->searchable(),
                Tables\Columns\TextColumn::make('status')->label('สถานะ')
                    ->formatStateUsing(fn (string $state) => Quotation::STATUSES[$state] ?? $state)
                    ->badge(),
                Tables\Columns\TextColumn::make('total')->label('สุทธิ')->money('THB'),
                Tables\Columns\TextColumn::make('valid_until')->date('d/m/Y')->label('ใช้ได้ถึง'),
                Tables\Columns\TextColumn::make('created_at')->dateTime('d/m/Y')->label('สร้าง'),
            ])
            ->defaultSort('created_at', 'desc')
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
        return [ItemsRelationManager::class];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuotations::route('/'),
            'create' => Pages\CreateQuotation::route('/create'),
            'edit' => Pages\EditQuotation::route('/{record}/edit'),
        ];
    }
}
