<?php

/**
 * Generates compact Filament v3 resources for ERP modules.
 * Run: php database/generators/make_erp_resources.php
 */

$base = dirname(__DIR__, 2).'/app/Filament/Resources';

$resources = [
    [
        'name' => 'Company',
        'model' => 'Company',
        'group' => 'CRM',
        'icon' => 'heroicon-o-building-office-2',
        'label' => 'บริษัท',
        'plural' => 'บริษัท',
        'sort' => 1,
        'fields' => [
            "Forms\\Components\\TextInput::make('code')->label('รหัส')->required()->unique(ignoreRecord: true)->default(fn () => \\App\\Support\\DocumentNumber::company())",
            "Forms\\Components\\TextInput::make('name')->label('ชื่อบริษัท')->required()",
            "Forms\\Components\\TextInput::make('tax_id')->label('เลขภาษี')",
            "Forms\\Components\\TextInput::make('industry')->label('อุตสาหกรรม')",
            "Forms\\Components\\TextInput::make('phone')->label('โทร')",
            "Forms\\Components\\TextInput::make('email')->email()->label('อีเมล')",
            "Forms\\Components\\TextInput::make('website')->label('เว็บไซต์')",
            "Forms\\Components\\Textarea::make('address')->label('ที่อยู่')->columnSpanFull()",
            "Forms\\Components\\Textarea::make('notes')->label('หมายเหตุ')->columnSpanFull()",
            "Forms\\Components\\Toggle::make('is_active')->label('ใช้งาน')->default(true)",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('code')->label('รหัส')->searchable()",
            "Tables\\Columns\\TextColumn::make('name')->label('บริษัท')->searchable()",
            "Tables\\Columns\\TextColumn::make('phone')->label('โทร')",
            "Tables\\Columns\\TextColumn::make('contacts_count')->counts('contacts')->label('Contacts')",
            "Tables\\Columns\\IconColumn::make('is_active')->boolean()->label('เปิด')",
        ],
    ],
    [
        'name' => 'Contact',
        'model' => 'Contact',
        'group' => 'CRM',
        'icon' => 'heroicon-o-identification',
        'label' => 'Contact',
        'plural' => 'Contacts',
        'sort' => 2,
        'fields' => [
            "Forms\\Components\\Select::make('company_id')->label('บริษัท')->relationship('company','name')->searchable()->preload()",
            "Forms\\Components\\TextInput::make('name')->label('ชื่อ')->required()",
            "Forms\\Components\\TextInput::make('title')->label('ตำแหน่ง')",
            "Forms\\Components\\TextInput::make('phone')->label('โทร')",
            "Forms\\Components\\TextInput::make('email')->email()->label('อีเมล')",
            "Forms\\Components\\TextInput::make('line_id')->label('LINE')",
            "Forms\\Components\\Toggle::make('is_primary')->label('ผู้ติดต่อหลัก')",
            "Forms\\Components\\Textarea::make('notes')->label('หมายเหตุ')->columnSpanFull()",
            "Forms\\Components\\Toggle::make('is_active')->default(true)",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('name')->searchable()->label('ชื่อ')",
            "Tables\\Columns\\TextColumn::make('company.name')->label('บริษัท')",
            "Tables\\Columns\\TextColumn::make('title')->label('ตำแหน่ง')",
            "Tables\\Columns\\TextColumn::make('phone')->label('โทร')",
            "Tables\\Columns\\IconColumn::make('is_primary')->boolean()->label('หลัก')",
        ],
    ],
    [
        'name' => 'CustomerGroup',
        'model' => 'CustomerGroup',
        'group' => 'CRM',
        'icon' => 'heroicon-o-rectangle-group',
        'label' => 'กลุ่มลูกค้า',
        'plural' => 'กลุ่มลูกค้า',
        'sort' => 3,
        'fields' => [
            "Forms\\Components\\TextInput::make('code')->required()->unique(ignoreRecord: true)",
            "Forms\\Components\\TextInput::make('name')->required()",
            "Forms\\Components\\Select::make('price_tier')->options(\\App\\Models\\Customer::PRICE_TIERS)->required()",
            "Forms\\Components\\Textarea::make('description')->columnSpanFull()",
            "Forms\\Components\\Toggle::make('is_active')->default(true)",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('code')->searchable()",
            "Tables\\Columns\\TextColumn::make('name')->searchable()",
            "Tables\\Columns\\TextColumn::make('price_tier')->badge()",
            "Tables\\Columns\\IconColumn::make('is_active')->boolean()",
        ],
    ],
    [
        'name' => 'Opportunity',
        'model' => 'Opportunity',
        'group' => 'CRM',
        'icon' => 'heroicon-o-chart-bar',
        'label' => 'Opportunity',
        'plural' => 'Sales Pipeline',
        'sort' => 4,
        'fields' => [
            "Forms\\Components\\TextInput::make('code')->required()->unique(ignoreRecord: true)->default(fn () => \\App\\Support\\DocumentNumber::opportunity())",
            "Forms\\Components\\TextInput::make('title')->required()->label('หัวข้อดีล')",
            "Forms\\Components\\Select::make('company_id')->relationship('company','name')->searchable()->preload()",
            "Forms\\Components\\Select::make('customer_id')->relationship('customer','name')->searchable()->preload()",
            "Forms\\Components\\Select::make('contact_id')->relationship('contact','name')->searchable()->preload()",
            "Forms\\Components\\Select::make('lead_id')->relationship('lead','name')->searchable()->preload()",
            "Forms\\Components\\Select::make('product_id')->relationship('product','name')->searchable()->preload()",
            "Forms\\Components\\Select::make('owner_user_id')->relationship('owner','name')->label('Sales Owner')->searchable()->preload()",
            "Forms\\Components\\Select::make('stage')->options(\\App\\Models\\Opportunity::STAGES)->required()",
            "Forms\\Components\\TextInput::make('estimated_meters')->numeric()->label('ปริมาณ (ม.)')",
            "Forms\\Components\\TextInput::make('estimated_value')->numeric()->label('มูลค่า')",
            "Forms\\Components\\TextInput::make('probability')->numeric()->minValue(0)->maxValue(100)",
            "Forms\\Components\\DatePicker::make('expected_close_date')",
            "Forms\\Components\\DatePicker::make('next_follow_up_at')->label('Follow-up')",
            "Forms\\Components\\Textarea::make('notes')->columnSpanFull()",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('code')->searchable()",
            "Tables\\Columns\\TextColumn::make('title')->searchable()->limit(28)",
            "Tables\\Columns\\TextColumn::make('company.name')->label('บริษัท')",
            "Tables\\Columns\\TextColumn::make('stage')->formatStateUsing(fn (\$s) => \\App\\Models\\Opportunity::STAGES[\$s] ?? \$s)->badge()",
            "Tables\\Columns\\TextColumn::make('estimated_value')->money('THB')->label('มูลค่า')",
            "Tables\\Columns\\TextColumn::make('owner.name')->label('Owner')",
            "Tables\\Columns\\TextColumn::make('next_follow_up_at')->date('d M Y')->label('Follow-up')",
        ],
    ],
    [
        'name' => 'Activity',
        'model' => 'Activity',
        'group' => 'CRM',
        'icon' => 'heroicon-o-clipboard-document-list',
        'label' => 'Activity',
        'plural' => 'Activities / Follow-ups',
        'sort' => 5,
        'fields' => [
            "Forms\\Components\\Select::make('type')->options(\\App\\Models\\Activity::TYPES)->required()",
            "Forms\\Components\\TextInput::make('subject')->required()",
            "Forms\\Components\\Select::make('status')->options(['open'=>'Open','done'=>'Done','cancelled'=>'Cancelled'])->default('open')",
            "Forms\\Components\\Select::make('owner_user_id')->relationship('owner','name')->searchable()->preload()",
            "Forms\\Components\\DateTimePicker::make('due_at')",
            "Forms\\Components\\Textarea::make('body')->columnSpanFull()",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('type')->formatStateUsing(fn (\$s) => \\App\\Models\\Activity::TYPES[\$s] ?? \$s)->badge()",
            "Tables\\Columns\\TextColumn::make('subject')->searchable()",
            "Tables\\Columns\\TextColumn::make('status')->badge()",
            "Tables\\Columns\\TextColumn::make('owner.name')->label('Owner')",
            "Tables\\Columns\\TextColumn::make('due_at')->dateTime('d/m/Y H:i')",
        ],
    ],
    [
        'name' => 'Warehouse',
        'model' => 'Warehouse',
        'group' => 'Inventory',
        'icon' => 'heroicon-o-home-modern',
        'label' => 'คลังสินค้า',
        'plural' => 'คลังสินค้า',
        'sort' => 1,
        'fields' => [
            "Forms\\Components\\TextInput::make('code')->required()->unique(ignoreRecord: true)",
            "Forms\\Components\\TextInput::make('name')->required()",
            "Forms\\Components\\Select::make('type')->options(\\App\\Models\\Warehouse::TYPES)->required()",
            "Forms\\Components\\Textarea::make('address')->columnSpanFull()",
            "Forms\\Components\\Toggle::make('is_active')->default(true)",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('code')->searchable()",
            "Tables\\Columns\\TextColumn::make('name')->searchable()",
            "Tables\\Columns\\TextColumn::make('type')->formatStateUsing(fn (\$s) => \\App\\Models\\Warehouse::TYPES[\$s] ?? \$s)",
            "Tables\\Columns\\IconColumn::make('is_active')->boolean()",
        ],
    ],
    [
        'name' => 'StockLot',
        'model' => 'StockLot',
        'group' => 'Inventory',
        'icon' => 'heroicon-o-queue-list',
        'label' => 'Lot / ม้วน',
        'plural' => 'Lot / ม้วน',
        'sort' => 2,
        'fields' => [
            "Forms\\Components\\Select::make('warehouse_id')->relationship('warehouse','name')->required()->searchable()->preload()",
            "Forms\\Components\\Select::make('product_id')->relationship('product','name')->required()->searchable()->preload()",
            "Forms\\Components\\TextInput::make('lot_number')->required()",
            "Forms\\Components\\TextInput::make('roll_number')",
            "Forms\\Components\\TextInput::make('quantity_meters')->numeric()->required()",
            "Forms\\Components\\DatePicker::make('received_at')",
            "Forms\\Components\\Select::make('status')->options(['available'=>'Available','reserved'=>'Reserved','sold'=>'Sold','hold'=>'Hold'])->default('available')",
            "Forms\\Components\\Textarea::make('notes')->columnSpanFull()",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('lot_number')->searchable()",
            "Tables\\Columns\\TextColumn::make('roll_number')",
            "Tables\\Columns\\TextColumn::make('product.sku')->label('SKU')",
            "Tables\\Columns\\TextColumn::make('warehouse.name')->label('คลัง')",
            "Tables\\Columns\\TextColumn::make('quantity_meters')->numeric(2)->label('ม.')",
            "Tables\\Columns\\TextColumn::make('status')->badge()",
        ],
    ],
    [
        'name' => 'Invoice',
        'model' => 'Invoice',
        'group' => 'Finance',
        'icon' => 'heroicon-o-banknotes',
        'label' => 'ใบแจ้งหนี้',
        'plural' => 'ใบแจ้งหนี้',
        'sort' => 1,
        'fields' => [
            "Forms\\Components\\TextInput::make('number')->required()->unique(ignoreRecord: true)->default(fn () => \\App\\Support\\DocumentNumber::invoice())",
            "Forms\\Components\\Select::make('customer_id')->relationship('customer','name')->required()->searchable()->preload()",
            "Forms\\Components\\Select::make('order_id')->relationship('order','number')->searchable()->preload()",
            "Forms\\Components\\Select::make('status')->options(\\App\\Models\\Invoice::STATUSES)->required()",
            "Forms\\Components\\DatePicker::make('invoice_date')->default(now())",
            "Forms\\Components\\DatePicker::make('due_date')",
            "Forms\\Components\\TextInput::make('subtotal')->numeric()->default(0)",
            "Forms\\Components\\TextInput::make('vat_amount')->numeric()->default(0)",
            "Forms\\Components\\TextInput::make('total')->numeric()->default(0)",
            "Forms\\Components\\TextInput::make('paid_amount')->numeric()->default(0)",
            "Forms\\Components\\Textarea::make('notes')->columnSpanFull()",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('number')->searchable()",
            "Tables\\Columns\\TextColumn::make('customer.name')->label('ลูกค้า')",
            "Tables\\Columns\\TextColumn::make('status')->formatStateUsing(fn (\$s) => \\App\\Models\\Invoice::STATUSES[\$s] ?? \$s)->badge()",
            "Tables\\Columns\\TextColumn::make('total')->money('THB')",
            "Tables\\Columns\\TextColumn::make('paid_amount')->money('THB')->label('ชำระแล้ว')",
            "Tables\\Columns\\TextColumn::make('due_date')->date('d/m/Y')",
        ],
    ],
    [
        'name' => 'Payment',
        'model' => 'Payment',
        'group' => 'Finance',
        'icon' => 'heroicon-o-credit-card',
        'label' => 'การรับชำระ',
        'plural' => 'การรับชำระ',
        'sort' => 2,
        'fields' => [
            "Forms\\Components\\TextInput::make('number')->required()->unique(ignoreRecord: true)->default(fn () => \\App\\Support\\DocumentNumber::payment())",
            "Forms\\Components\\Select::make('customer_id')->relationship('customer','name')->required()->searchable()->preload()",
            "Forms\\Components\\Select::make('invoice_id')->relationship('invoice','number')->searchable()->preload()",
            "Forms\\Components\\Select::make('method')->options(['cash'=>'Cash','transfer'=>'Transfer','credit'=>'Credit','cheque'=>'Cheque'])->required()",
            "Forms\\Components\\TextInput::make('amount')->numeric()->required()",
            "Forms\\Components\\DatePicker::make('paid_at')->default(now())",
            "Forms\\Components\\TextInput::make('reference')",
            "Forms\\Components\\Textarea::make('notes')->columnSpanFull()",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('number')->searchable()",
            "Tables\\Columns\\TextColumn::make('customer.name')",
            "Tables\\Columns\\TextColumn::make('invoice.number')->label('Invoice')",
            "Tables\\Columns\\TextColumn::make('method')->badge()",
            "Tables\\Columns\\TextColumn::make('amount')->money('THB')",
            "Tables\\Columns\\TextColumn::make('paid_at')->date('d/m/Y')",
        ],
    ],
    [
        'name' => 'Supplier',
        'model' => 'Supplier',
        'group' => 'Purchasing',
        'icon' => 'heroicon-o-truck',
        'label' => 'ผู้ขาย',
        'plural' => 'ผู้ขาย',
        'sort' => 1,
        'fields' => [
            "Forms\\Components\\TextInput::make('code')->required()->unique(ignoreRecord: true)->default(fn () => \\App\\Support\\DocumentNumber::supplier())",
            "Forms\\Components\\TextInput::make('name')->required()",
            "Forms\\Components\\TextInput::make('phone')",
            "Forms\\Components\\TextInput::make('email')->email()",
            "Forms\\Components\\TextInput::make('tax_id')",
            "Forms\\Components\\Textarea::make('address')->columnSpanFull()",
            "Forms\\Components\\Textarea::make('notes')->columnSpanFull()",
            "Forms\\Components\\Toggle::make('is_active')->default(true)",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('code')->searchable()",
            "Tables\\Columns\\TextColumn::make('name')->searchable()",
            "Tables\\Columns\\TextColumn::make('phone')",
            "Tables\\Columns\\IconColumn::make('is_active')->boolean()",
        ],
    ],
    [
        'name' => 'PurchaseOrder',
        'model' => 'PurchaseOrder',
        'group' => 'Purchasing',
        'icon' => 'heroicon-o-clipboard-document-check',
        'label' => 'ใบสั่งซื้อ',
        'plural' => 'ใบสั่งซื้อ',
        'sort' => 2,
        'fields' => [
            "Forms\\Components\\TextInput::make('number')->required()->unique(ignoreRecord: true)->default(fn () => \\App\\Support\\DocumentNumber::purchaseOrder())",
            "Forms\\Components\\Select::make('supplier_id')->relationship('supplier','name')->required()->searchable()->preload()",
            "Forms\\Components\\Select::make('warehouse_id')->relationship('warehouse','name')->searchable()->preload()",
            "Forms\\Components\\Select::make('status')->options(\\App\\Models\\PurchaseOrder::STATUSES)->required()",
            "Forms\\Components\\DatePicker::make('order_date')->default(now())",
            "Forms\\Components\\DatePicker::make('expected_at')",
            "Forms\\Components\\TextInput::make('total')->numeric()->disabled()->dehydrated()",
            "Forms\\Components\\Textarea::make('notes')->columnSpanFull()",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('number')->searchable()",
            "Tables\\Columns\\TextColumn::make('supplier.name')",
            "Tables\\Columns\\TextColumn::make('status')->formatStateUsing(fn (\$s) => \\App\\Models\\PurchaseOrder::STATUSES[\$s] ?? \$s)->badge()",
            "Tables\\Columns\\TextColumn::make('total')->money('THB')",
            "Tables\\Columns\\TextColumn::make('order_date')->date('d/m/Y')",
        ],
    ],
    [
        'name' => 'GoodsReceipt',
        'model' => 'GoodsReceipt',
        'group' => 'Purchasing',
        'icon' => 'heroicon-o-inbox-arrow-down',
        'label' => 'รับสินค้าเข้า',
        'plural' => 'รับสินค้าเข้า',
        'sort' => 3,
        'fields' => [
            "Forms\\Components\\TextInput::make('number')->required()->unique(ignoreRecord: true)->default(fn () => \\App\\Support\\DocumentNumber::goodsReceipt())",
            "Forms\\Components\\Select::make('supplier_id')->relationship('supplier','name')->required()->searchable()->preload()",
            "Forms\\Components\\Select::make('purchase_order_id')->relationship('purchaseOrder','number')->searchable()->preload()",
            "Forms\\Components\\Select::make('warehouse_id')->relationship('warehouse','name')->required()->searchable()->preload()",
            "Forms\\Components\\Select::make('status')->options(['draft'=>'ร่าง','posted'=>'โพสต์แล้ว'])->required()->default('draft')",
            "Forms\\Components\\DatePicker::make('received_at')->default(now())",
            "Forms\\Components\\Textarea::make('notes')->columnSpanFull()",
        ],
        'columns' => [
            "Tables\\Columns\\TextColumn::make('number')->searchable()",
            "Tables\\Columns\\TextColumn::make('supplier.name')",
            "Tables\\Columns\\TextColumn::make('warehouse.name')",
            "Tables\\Columns\\TextColumn::make('status')->badge()",
            "Tables\\Columns\\TextColumn::make('received_at')->date('d/m/Y')",
        ],
    ],
];

function writeResource(string $base, array $r): void
{
    $ns = "App\\Filament\\Resources";
    $pagesNs = "{$ns}\\{$r['name']}Resource\\Pages";
    $dir = "{$base}/{$r['name']}Resource";
    $pagesDir = "{$dir}/Pages";
    if (! is_dir($pagesDir)) {
        mkdir($pagesDir, 0777, true);
    }

    $fields = implode(",\n            ", $r['fields']);
    $columns = implode(",\n                ", $r['columns']);
    $modelFqn = "App\\Models\\{$r['model']}";

    $resource = <<<PHP
<?php

namespace {$ns};

use {$ns}\\{$r['name']}Resource\\Pages;
use {$modelFqn};
use Filament\\Forms;
use Filament\\Forms\\Form;
use Filament\\Resources\\Resource;
use Filament\\Tables;
use Filament\\Tables\\Table;

class {$r['name']}Resource extends Resource
{
    protected static ?string \$model = {$r['model']}::class;
    protected static ?string \$navigationIcon = '{$r['icon']}';
    protected static ?string \$navigationGroup = '{$r['group']}';
    protected static ?string \$modelLabel = '{$r['label']}';
    protected static ?string \$pluralModelLabel = '{$r['plural']}';
    protected static ?int \$navigationSort = {$r['sort']};

    public static function form(Form \$form): Form
    {
        return \$form->schema([
            {$fields},
        ]);
    }

    public static function table(Table \$table): Table
    {
        return \$table
            ->columns([
                {$columns},
            ])
            ->actions([
                Tables\\Actions\\EditAction::make(),
                Tables\\Actions\\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\\Actions\\BulkActionGroup::make([
                    Tables\\Actions\\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\\List{$r['name']}s::route('/'),
            'create' => Pages\\Create{$r['name']}::route('/create'),
            'edit' => Pages\\Edit{$r['name']}::route('/{record}/edit'),
        ];
    }
}
PHP;

    // Fix awkward plurals for names ending with y/s
    $list = "List{$r['name']}s";
    $create = "Create{$r['name']}";
    $edit = "Edit{$r['name']}";

    if (str_ends_with($r['name'], 'y')) {
        // CustomerGroup -> ListCustomerGroups already ends with s from generator List{$name}s = ListCustomerGroups - OK for Group
    }
    if ($r['name'] === 'Opportunity') {
        $list = 'ListOpportunities';
        $resource = str_replace("Pages\\ListOpportunitys::route", "Pages\\ListOpportunities::route", $resource);
    }
    if ($r['name'] === 'Activity') {
        $list = 'ListActivities';
        $resource = str_replace("Pages\\ListActivitys::route", "Pages\\ListActivities::route", $resource);
    }
    if ($r['name'] === 'Company') {
        $list = 'ListCompanies';
        $resource = str_replace("Pages\\ListCompanys::route", "Pages\\ListCompanies::route", $resource);
    }
    if ($r['name'] === 'PurchaseOrder') {
        $list = 'ListPurchaseOrders';
        // ListPurchaseOrders from ListPurchaseOrders - name is PurchaseOrder + s = PurchaseOrders - generator makes ListPurchaseOrders - OK
    }

    file_put_contents("{$dir}/{$r['name']}Resource.php", $resource);

    $listClass = $list;
    if ($r['name'] === 'Opportunity') {
        $listClass = 'ListOpportunities';
    } elseif ($r['name'] === 'Activity') {
        $listClass = 'ListActivities';
    } elseif ($r['name'] === 'Company') {
        $listClass = 'ListCompanies';
    } elseif ($r['name'] === 'CustomerGroup') {
        $listClass = 'ListCustomerGroups';
        $resourceFixed = file_get_contents("{$dir}/{$r['name']}Resource.php");
        $resourceFixed = str_replace("Pages\\ListCustomerGroups::route", "Pages\\ListCustomerGroups::route", $resourceFixed);
        // ListCustomerGroups: name CustomerGroup + s = CustomerGroups -> ListCustomerGroups - generator produces ListCustomerGroups - wait List{$name}s = ListCustomerGroups - CustomerGroup + s = CustomerGroups. Good.
    } elseif ($r['name'] === 'GoodsReceipt') {
        $listClass = 'ListGoodsReceipts';
    } else {
        $listClass = "List{$r['name']}s";
    }

    // Fix resource getPages list class names properly
    $pageMap = [
        'Company' => 'ListCompanies',
        'Opportunity' => 'ListOpportunities',
        'Activity' => 'ListActivities',
        'CustomerGroup' => 'ListCustomerGroups',
        'GoodsReceipt' => 'ListGoodsReceipts',
    ];
    if (isset($pageMap[$r['name']])) {
        $content = file_get_contents("{$dir}/{$r['name']}Resource.php");
        $content = preg_replace("/Pages\\\\List{$r['name']}s::/", "Pages\\\\{$pageMap[$r['name']]}::", $content);
        file_put_contents("{$dir}/{$r['name']}Resource.php", $content);
        $listClass = $pageMap[$r['name']];
    }

    file_put_contents("{$pagesDir}/{$listClass}.php", <<<PHP
<?php

namespace {$pagesNs};

use {$ns}\\{$r['name']}Resource;
use Filament\\Actions;
use Filament\\Resources\\Pages\\ListRecords;

class {$listClass} extends ListRecords
{
    protected static string \$resource = {$r['name']}Resource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\\CreateAction::make()];
    }
}
PHP);

    file_put_contents("{$pagesDir}/{$create}.php", <<<PHP
<?php

namespace {$pagesNs};

use {$ns}\\{$r['name']}Resource;
use Filament\\Resources\\Pages\\CreateRecord;

class {$create} extends CreateRecord
{
    protected static string \$resource = {$r['name']}Resource::class;
}
PHP);

    file_put_contents("{$pagesDir}/{$edit}.php", <<<PHP
<?php

namespace {$pagesNs};

use {$ns}\\{$r['name']}Resource;
use Filament\\Actions;
use Filament\\Resources\\Pages\\EditRecord;

class {$edit} extends EditRecord
{
    protected static string \$resource = {$r['name']}Resource::class;

    protected function getHeaderActions(): array
    {
        return [Actions\\DeleteAction::make()];
    }
}
PHP);

    echo "Generated {$r['name']}Resource\n";
}

foreach ($resources as $resource) {
    writeResource($base, $resource);
}

echo "Done\n";
