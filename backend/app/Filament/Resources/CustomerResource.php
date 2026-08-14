<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomerResource\Pages;
use App\Models\Customer;
use App\Support\DocumentNumber;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class CustomerResource extends Resource
{
    protected static ?string $model = Customer::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'CRM';

    protected static ?string $modelLabel = 'ลูกค้า';

    protected static ?string $pluralModelLabel = 'ลูกค้า';

    protected static ?int $navigationSort = 6;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('code')
                ->label('รหัส')
                ->required()
                ->unique(ignoreRecord: true)
                ->default(fn () => DocumentNumber::customer()),
            Forms\Components\TextInput::make('name')->label('ชื่อบัญชีลูกค้า')->required(),
            Forms\Components\Select::make('company_id')->label('บริษัท (B2B)')
                ->relationship('companyAccount', 'name')->searchable()->preload(),
            Forms\Components\Select::make('customer_group_id')->label('กลุ่มลูกค้า')
                ->relationship('group', 'name')->searchable()->preload(),
            Forms\Components\Select::make('sales_user_id')->label('Sales Owner')
                ->relationship('salesOwner', 'name')->searchable()->preload(),
            Forms\Components\Select::make('type')->label('ประเภท')
                ->options(['wholesale' => 'ค้าส่ง', 'retail' => 'ค้าปลีก'])
                ->required(),
            Forms\Components\Select::make('price_tier')->label('Price Tier')
                ->options(Customer::PRICE_TIERS)->required()->default('wholesale'),
            Forms\Components\TextInput::make('company')->label('ชื่อบริษัท (ข้อความ)'),
            Forms\Components\TextInput::make('phone')->label('โทร'),
            Forms\Components\TextInput::make('email')->label('อีเมล')->email(),
            Forms\Components\TextInput::make('line_id')->label('LINE ID'),
            Forms\Components\TextInput::make('credit_limit')->label('Credit Limit')->numeric()->default(0),
            Forms\Components\TextInput::make('credit_used')->label('Credit Used')->numeric()->disabled()->dehydrated(),
            Forms\Components\TextInput::make('payment_terms_days')->label('Payment Terms (วัน)')->numeric()->default(0),
            Forms\Components\Placeholder::make('available_credit')
                ->label('Available Credit')
                ->content(fn (?Customer $record) => $record
                    ? number_format($record->availableCredit(), 2).' บาท'
                    : '-'),
            Forms\Components\Textarea::make('address')->label('ที่อยู่')->rows(3)->columnSpanFull(),
            Forms\Components\Textarea::make('notes')->label('หมายเหตุ')->rows(3)->columnSpanFull(),
            Forms\Components\Toggle::make('is_active')->label('ใช้งาน')->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('code')->label('รหัส')->searchable(),
                Tables\Columns\TextColumn::make('name')->label('ชื่อ')->searchable(),
                Tables\Columns\TextColumn::make('companyAccount.name')->label('บริษัท'),
                Tables\Columns\TextColumn::make('price_tier')->label('Tier')->badge(),
                Tables\Columns\TextColumn::make('credit_limit')->label('Credit')->money('THB'),
                Tables\Columns\TextColumn::make('credit_used')->label('Used')->money('THB'),
                Tables\Columns\TextColumn::make('orders_count')->counts('orders')->label('ออเดอร์'),
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
            'index' => Pages\ListCustomers::route('/'),
            'create' => Pages\CreateCustomer::route('/create'),
            'edit' => Pages\EditCustomer::route('/{record}/edit'),
        ];
    }
}
