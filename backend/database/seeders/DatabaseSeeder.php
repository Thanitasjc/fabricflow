<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Article;
use App\Models\Category;
use App\Models\Company;
use App\Models\Contact;
use App\Models\Customer;
use App\Models\CustomerGroup;
use App\Models\GoodsReceipt;
use App\Models\HeroSlide;
use App\Models\Brand;
use App\Models\MenuItem;
use App\Models\SiteSetting;
use App\Models\Industry;
use App\Models\Lead;
use App\Models\Opportunity;
use App\Models\Order;
use App\Models\Product;
use App\Models\PurchaseOrder;
use App\Models\Quotation;
use App\Models\Service;
use App\Models\StockLot;
use App\Models\Supplier;
use App\Models\User;
use App\Models\Warehouse;
use App\Models\WarehouseStock;
use App\Services\ReceivingService;
use App\Services\StockService;
use App\Support\DocumentNumber;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@fabricflow.test'],
            [
                'name' => 'FabricFlow Admin',
                'password' => Hash::make('password'),
            ]
        );

        $path = database_path('data/frontend-seed.json');
        if (! file_exists($path)) {
            throw new \RuntimeException('Missing frontend-seed.json. Run: npx tsx scripts/export-frontend-seed.mts');
        }

        /** @var array<string, mixed> $data */
        $data = json_decode(file_get_contents($path), true, 512, JSON_THROW_ON_ERROR);

        $this->resetCatalogTables();
        $this->seedCategories($data['categories'] ?? []);
        $this->seedIndustries($data['industries'] ?? []);
        $this->seedProducts($data['products'] ?? []);
        $this->seedArticles($data['articles'] ?? []);
        $this->seedServices($data['services'] ?? []);
        $this->seedHeroSlides($data['heroSlides'] ?? []);
        $this->seedBranding();
        $this->seedBrands();
        $this->seedHeaderMenus();
        $this->seedCrmSample();
        $this->seedInventoryPurchasingSample();
        $this->call(RoleSeeder::class);
    }

    private function resetCatalogTables(): void
    {
        $tables = [
            'goods_receipt_items', 'goods_receipts', 'purchase_order_items', 'purchase_orders',
            'payments', 'invoice_items', 'invoices', 'stock_transfer_items', 'stock_transfers',
            'stock_lots', 'warehouse_stocks', 'customer_documents', 'customer_prices', 'activities',
            'order_items', 'orders', 'quotation_items', 'quotations', 'opportunities',
            'stock_movements', 'contacts',
        ];

        foreach ($tables as $table) {
            if (Schema::hasTable($table)) {
                DB::table($table)->delete();
            }
        }

        if (Schema::hasTable('leads')) {
            DB::table('leads')->update(['contact_message_id' => null, 'customer_id' => null, 'product_id' => null]);
        }
        if (Schema::hasTable('contact_messages')) {
            DB::table('contact_messages')->update(['customer_id' => null, 'lead_id' => null]);
        }
        if (Schema::hasTable('leads')) {
            DB::table('leads')->delete();
        }
        if (Schema::hasTable('customers')) {
            DB::table('customers')->delete();
        }
        if (Schema::hasTable('companies')) {
            DB::table('companies')->delete();
        }
        if (Schema::hasTable('customer_groups')) {
            DB::table('customer_groups')->delete();
        }
        if (Schema::hasTable('suppliers')) {
            DB::table('suppliers')->delete();
        }
        if (Schema::hasTable('warehouses')) {
            DB::table('warehouses')->delete();
        }

        DB::table('industry_product')->delete();
        DB::table('product_colors')->delete();
        DB::table('products')->delete();
        DB::table('industry_collections')->delete();
        DB::table('industries')->delete();
        DB::table('categories')->delete();
        DB::table('articles')->delete();
        DB::table('services')->delete();
        DB::table('hero_slides')->delete();
        if (Schema::hasTable('brands')) {
            DB::table('brands')->delete();
        }
    }

    private function seedCrmSample(): void
    {
        $admin = User::query()->where('email', 'admin@fabricflow.test')->first();

        $group = CustomerGroup::query()->create([
            'code' => 'WS',
            'name' => 'Wholesale Standard',
            'price_tier' => 'wholesale',
            'description' => 'ลูกค้าค้าส่งมาตรฐาน',
            'is_active' => true,
        ]);

        CustomerGroup::query()->create([
            'code' => 'DLR',
            'name' => 'Dealer',
            'price_tier' => 'dealer',
            'is_active' => true,
        ]);

        $company = Company::query()->create([
            'code' => DocumentNumber::company(),
            'name' => 'ABC Garment Co., Ltd.',
            'industry' => 'Apparel / Uniform',
            'phone' => '029998887',
            'email' => 'procurement@abcgarment.test',
            'address' => 'สมุทรปราการ',
            'is_active' => true,
        ]);

        $contact = Contact::query()->create([
            'company_id' => $company->id,
            'name' => 'คุณสมชาย จัดซื้อ',
            'title' => 'Purchasing Manager',
            'phone' => '0899998888',
            'email' => 'somchai@abcgarment.test',
            'is_primary' => true,
            'is_active' => true,
        ]);

        $customer = Customer::query()->create([
            'code' => DocumentNumber::customer(),
            'company_id' => $company->id,
            'customer_group_id' => $group->id,
            'sales_user_id' => $admin?->id,
            'name' => 'ABC Garment',
            'type' => 'wholesale',
            'price_tier' => 'wholesale',
            'company' => $company->name,
            'phone' => $company->phone,
            'email' => $company->email,
            'address' => $company->address,
            'credit_limit' => 1000000,
            'credit_used' => 0,
            'payment_terms_days' => 30,
            'is_active' => true,
        ]);

        User::query()->updateOrCreate(
            ['email' => 'customer@fabricflow.test'],
            [
                'name' => 'ABC Garment Portal',
                'phone' => $company->phone,
                'account_type' => 'wholesale',
                'customer_id' => $customer->id,
                'password' => 'password',
            ]
        );

        $product = Product::query()->where('sku', 'UF-021')->first()
            ?? Product::query()->where('sku', 'CT-001')->first()
            ?? Product::query()->first();

        if (! $product) {
            return;
        }

        $product->update([
            'composition' => $product->composition ?: '100% '.$product->material,
            'weight_gsm' => $product->weight_gsm ?: 180,
            'unit' => 'meter',
            'dealer_price' => round(((float) $product->wholesale_price) * 0.92, 2),
            'vip_price' => round(((float) $product->wholesale_price) * 0.88, 2),
            'min_order_meters' => 50,
        ]);

        $lead = Lead::query()->create([
            'customer_id' => $customer->id,
            'product_id' => $product->id,
            'name' => $contact->name,
            'phone' => $contact->phone,
            'email' => $contact->email,
            'topic' => 'uniform',
            'message' => 'ต้องการผ้ายูนิฟอร์ม 5,000 เมตร',
            'status' => 'quoted',
            'estimated_meters' => 5000,
        ]);

        $opportunity = Opportunity::query()->create([
            'code' => DocumentNumber::opportunity(),
            'title' => 'ผ้ายูนิฟอร์ม ABC Garment 5,000 ม.',
            'company_id' => $company->id,
            'customer_id' => $customer->id,
            'contact_id' => $contact->id,
            'lead_id' => $lead->id,
            'product_id' => $product->id,
            'owner_user_id' => $admin?->id,
            'stage' => 'negotiation',
            'estimated_meters' => 5000,
            'estimated_value' => 475000,
            'probability' => 60,
            'expected_close_date' => now()->addDays(20)->toDateString(),
            'next_follow_up_at' => now()->addDays(5)->toDateString(),
            'notes' => 'ตัวอย่าง Pipeline B2B',
        ]);

        Activity::query()->create([
            'type' => 'follow_up',
            'subject' => 'Follow-up เจรจาราคาผ้ายูนิฟอร์ม',
            'body' => 'นัดคุยส่วนลดและกำหนดส่งมอบ',
            'status' => 'open',
            'due_at' => now()->addDays(5),
            'owner_user_id' => $admin?->id,
            'related_type' => Opportunity::class,
            'related_id' => $opportunity->id,
        ]);

        $quotation = Quotation::query()->create([
            'number' => DocumentNumber::quotation(),
            'customer_id' => $customer->id,
            'lead_id' => $lead->id,
            'opportunity_id' => $opportunity->id,
            'owner_user_id' => $admin?->id,
            'status' => 'sent',
            'valid_until' => now()->addDays(14)->toDateString(),
            'discount' => 0,
            'notes' => 'เสนอผ้ายูนิฟอร์มตามสเปก',
        ]);

        $quotation->items()->create([
            'product_id' => $product->id,
            'description' => $product->name.' ('.$product->sku.')',
            'quantity_meters' => 5000,
            'unit_price' => 95,
            'sort_order' => 1,
        ]);

        $mainWarehouse = Warehouse::query()->where('code', 'WH-MAIN')->first();

        $order = Order::query()->create([
            'number' => DocumentNumber::order(),
            'customer_id' => $customer->id,
            'quotation_id' => $quotation->id,
            'opportunity_id' => $opportunity->id,
            'warehouse_id' => $mainWarehouse?->id,
            'sales_user_id' => $admin?->id,
            'status' => 'draft',
            'order_date' => now()->toDateString(),
            'discount' => 0,
            'notes' => 'ตัวอย่างออเดอร์ B2B — ยืนยันเพื่อตัดสต็อก + ใช้เครดิต',
        ]);

        $order->items()->create([
            'product_id' => $product->id,
            'description' => $product->name.' ('.$product->sku.')',
            'quantity_meters' => 50,
            'unit_price' => 95,
            'sort_order' => 1,
        ]);
    }

    private function seedInventoryPurchasingSample(): void
    {
        $admin = User::query()->where('email', 'admin@fabricflow.test')->first();
        $stock = app(StockService::class);
        $receiving = app(ReceivingService::class);

        $main = Warehouse::query()->create([
            'code' => 'WH-MAIN',
            'name' => 'Main Warehouse',
            'type' => 'main',
            'address' => 'คลังหลัก บางนา กรุงเทพฯ',
            'is_active' => true,
        ]);

        $showroom = Warehouse::query()->create([
            'code' => 'WH-SHOW',
            'name' => 'Showroom Rama 3',
            'type' => 'showroom',
            'address' => 'โชว์รูม พระราม 3',
            'is_active' => true,
        ]);

        $branch = Warehouse::query()->create([
            'code' => 'WH-CNX',
            'name' => 'Branch Chiang Mai',
            'type' => 'branch',
            'address' => 'คลังสาขา เชียงใหม่',
            'is_active' => true,
        ]);

        $supplierA = Supplier::query()->create([
            'code' => DocumentNumber::supplier(),
            'name' => 'Asia Textile Mill',
            'phone' => '021111222',
            'email' => 'sales@asiatex.test',
            'tax_id' => '0105558000001',
            'address' => 'สมุทรสาคร',
            'notes' => 'ผู้ผลิตผ้าคอตตอน / ยูนิฟอร์ม',
            'is_active' => true,
        ]);

        $supplierB = Supplier::query()->create([
            'code' => DocumentNumber::supplier(),
            'name' => 'Northern Denim Co.',
            'phone' => '053444555',
            'email' => 'order@northerndenim.test',
            'address' => 'ลำพูน',
            'notes' => 'ผู้ผลิตยีนส์และผ้าทอหนัก',
            'is_active' => true,
        ]);

        $supplierC = Supplier::query()->create([
            'code' => DocumentNumber::supplier(),
            'name' => 'Pacific Suiting Export',
            'phone' => '027778889',
            'email' => 'export@pacificsuit.test',
            'address' => 'ชลบุรี',
            'is_active' => true,
        ]);

        $products = Product::query()
            ->whereIn('sku', ['CT-001', 'DN-012', 'UF-021', 'ST-008', 'SH-005'])
            ->get()
            ->keyBy('sku');

        if ($products->isEmpty()) {
            $products = Product::query()->take(5)->get()->keyBy('sku');
        }

        if ($products->isEmpty()) {
            return;
        }

        $cotton = $products->get('CT-001') ?? $products->first();
        $denim = $products->get('DN-012') ?? $products->skip(1)->first() ?? $cotton;
        $uniform = $products->get('UF-021') ?? $products->skip(2)->first() ?? $cotton;
        $suiting = $products->get('ST-008') ?? $products->skip(3)->first() ?? $cotton;

        // Opening stock movements + warehouse balance
        $opening = [
            [$cotton, $main, 1200, 'Opening stock คอตตอน'],
            [$denim, $main, 800, 'Opening stock ยีนส์'],
            [$uniform, $main, 1500, 'Opening stock ยูนิฟอร์ม'],
            [$suiting, $showroom, 250, 'ย้ายเข้าโชว์รูมตัวอย่าง'],
            [$cotton, $branch, 300, 'สต็อกสาขาเชียงใหม่'],
        ];

        foreach ($opening as [$product, $warehouse, $meters, $note]) {
            $stock->receive($product, $meters, $note, null, null, $warehouse->id);
        }

        foreach ([
            [$main->id, $cotton->id, 1200],
            [$main->id, $denim->id, 800],
            [$main->id, $uniform->id, 1500],
            [$showroom->id, $suiting->id, 250],
            [$branch->id, $cotton->id, 300],
        ] as [$wid, $pid, $qty]) {
            WarehouseStock::query()->create([
                'warehouse_id' => $wid,
                'product_id' => $pid,
                'product_color_id' => null,
                'quantity_meters' => $qty,
                'reserved_meters' => 0,
            ]);
        }

        // Sample lots / rolls
        $lots = [
            [$main, $cotton, 'LOT-CT-2608-A', 'R-001', 400],
            [$main, $cotton, 'LOT-CT-2608-A', 'R-002', 400],
            [$main, $cotton, 'LOT-CT-2608-B', 'R-003', 400],
            [$main, $denim, 'LOT-DN-2608-A', 'R-101', 500],
            [$main, $denim, 'LOT-DN-2608-A', 'R-102', 300],
            [$main, $uniform, 'LOT-UF-2608-A', 'R-201', 750],
            [$main, $uniform, 'LOT-UF-2608-A', 'R-202', 750],
            [$showroom, $suiting, 'LOT-ST-SHOW-01', 'R-S01', 120],
            [$showroom, $suiting, 'LOT-ST-SHOW-01', 'R-S02', 130],
            [$branch, $cotton, 'LOT-CT-CNX-01', 'R-C01', 300],
        ];

        foreach ($lots as [$warehouse, $product, $lotNo, $rollNo, $meters]) {
            StockLot::query()->create([
                'warehouse_id' => $warehouse->id,
                'product_id' => $product->id,
                'lot_number' => $lotNo,
                'roll_number' => $rollNo,
                'quantity_meters' => $meters,
                'received_at' => now()->subDays(rand(1, 20))->toDateString(),
                'status' => 'available',
                'notes' => 'ตัวอย่าง Lot/ม้วน',
            ]);
        }

        // Purchase Order (ordered)
        $po = PurchaseOrder::query()->create([
            'number' => DocumentNumber::purchaseOrder(),
            'supplier_id' => $supplierA->id,
            'warehouse_id' => $main->id,
            'status' => 'ordered',
            'order_date' => now()->subDays(7)->toDateString(),
            'expected_at' => now()->addDays(3)->toDateString(),
            'notes' => 'สั่งผ้าคอตตอน + ยูนิฟอร์ม รอบสิงหาคม',
        ]);

        $po->items()->create([
            'product_id' => $cotton->id,
            'description' => $cotton->name.' ('.$cotton->sku.')',
            'quantity_meters' => 1000,
            'unit_cost' => 70,
        ]);
        $po->items()->create([
            'product_id' => $uniform->id,
            'description' => $uniform->name.' ('.$uniform->sku.')',
            'quantity_meters' => 2000,
            'unit_cost' => 55,
        ]);

        // Goods receipt posted from PO
        $grPosted = GoodsReceipt::query()->create([
            'number' => DocumentNumber::goodsReceipt(),
            'purchase_order_id' => $po->id,
            'supplier_id' => $supplierA->id,
            'warehouse_id' => $main->id,
            'status' => 'draft',
            'received_at' => now()->subDays(2)->toDateString(),
            'notes' => 'รับเข้าบางส่วนจาก PO — ตัวอย่างโพสต์สต็อก',
        ]);

        $grPosted->items()->create([
            'product_id' => $cotton->id,
            'lot_number' => 'LOT-CT-GR-01',
            'roll_number' => 'R-GR-01',
            'quantity_meters' => 500,
        ]);
        $grPosted->items()->create([
            'product_id' => $uniform->id,
            'lot_number' => 'LOT-UF-GR-01',
            'roll_number' => 'R-GR-11',
            'quantity_meters' => 800,
        ]);

        $receiving->post($grPosted);
        $po->update(['status' => 'partial']);

        // Draft PO + draft GR (pending)
        $poDraft = PurchaseOrder::query()->create([
            'number' => DocumentNumber::purchaseOrder(),
            'supplier_id' => $supplierB->id,
            'warehouse_id' => $main->id,
            'status' => 'draft',
            'order_date' => now()->toDateString(),
            'expected_at' => now()->addDays(10)->toDateString(),
            'notes' => 'ร่างสั่งยีนส์รอบถัดไป',
        ]);
        $poDraft->items()->create([
            'product_id' => $denim->id,
            'description' => $denim->name.' ('.$denim->sku.')',
            'quantity_meters' => 1500,
            'unit_cost' => 110,
        ]);

        $grDraft = GoodsReceipt::query()->create([
            'number' => DocumentNumber::goodsReceipt(),
            'purchase_order_id' => $poDraft->id,
            'supplier_id' => $supplierB->id,
            'warehouse_id' => $main->id,
            'status' => 'draft',
            'received_at' => now()->toDateString(),
            'notes' => 'รอตรวจนับก่อนโพสต์รับเข้า',
        ]);
        $grDraft->items()->create([
            'product_id' => $denim->id,
            'lot_number' => 'LOT-DN-PENDING',
            'roll_number' => 'R-P01',
            'quantity_meters' => 600,
        ]);

        // Extra PO from third supplier
        $poSuit = PurchaseOrder::query()->create([
            'number' => DocumentNumber::purchaseOrder(),
            'supplier_id' => $supplierC->id,
            'warehouse_id' => $showroom->id,
            'status' => 'ordered',
            'order_date' => now()->subDays(3)->toDateString(),
            'expected_at' => now()->addDays(5)->toDateString(),
            'notes' => 'สั่งผ้าสูทเข้าโชว์รูม',
        ]);
        $poSuit->items()->create([
            'product_id' => $suiting->id,
            'description' => $suiting->name.' ('.$suiting->sku.')',
            'quantity_meters' => 400,
            'unit_cost' => 210,
        ]);

        // Sample outbound movement (issue to sample / sale)
        $stock->issue(
            $cotton,
            50,
            'จ่ายตัวอย่างผ้าให้ลูกค้า ABC Garment',
            null,
            null,
            false,
            $main->id,
        );

        if ($ws = WarehouseStock::query()->where('warehouse_id', $main->id)->where('product_id', $cotton->id)->first()) {
            $ws->update(['quantity_meters' => max(0, (float) $ws->quantity_meters - 50)]);
        }

        Order::query()->whereNull('warehouse_id')->update(['warehouse_id' => $main->id]);
    }

    private function seedCategories(array $rows): void
    {
        foreach ($rows as $row) {
            Category::query()->create([
                'slug' => $row['slug'],
                'name_th' => $row['nameTh'],
                'name_en' => $row['nameEn'],
                'image' => $row['image'],
                'sort_order' => $row['sortOrder'] ?? 0,
                'is_active' => true,
            ]);
        }
    }

    private function seedIndustries(array $rows): void
    {
        foreach ($rows as $row) {
            $industry = Industry::query()->create([
                'slug' => $row['slug'],
                'name_th' => $row['nameTh'],
                'name_en' => $row['nameEn'],
                'description' => $row['description'],
                'intro' => $row['intro'],
                'guide_title' => $row['guideTitle'],
                'guide_body' => $row['guideBody'] ?? [],
                'image' => $row['image'],
                'sort_order' => $row['sortOrder'] ?? 0,
                'is_active' => true,
            ]);

            foreach ($row['collections'] ?? [] as $collection) {
                $industry->collections()->create([
                    'name' => $collection['name'],
                    'description' => $collection['description'],
                    'image' => $collection['image'],
                    'sort_order' => $collection['sortOrder'] ?? 0,
                ]);
            }
        }
    }

    private function seedProducts(array $rows): void
    {
        $categories = Category::query()->pluck('id', 'slug');
        $industries = Industry::query()->pluck('id', 'slug');

        foreach ($rows as $row) {
            $wholesale = (float) $row['wholesalePrice'];
            $product = Product::query()->create([
                'category_id' => $categories[$row['categorySlug']] ?? null,
                'sku' => $row['sku'],
                'name' => $row['name'],
                'slug' => $row['slug'],
                'material' => $row['material'],
                'composition' => '100% '.$row['material'],
                'width' => $row['width'],
                'weight_gsm' => 180,
                'color' => $row['color'],
                'unit' => 'meter',
                'min_order_meters' => 10,
                'retail_price' => $row['retailPrice'],
                'wholesale_price' => $wholesale,
                'dealer_price' => round($wholesale * 0.92, 2),
                'vip_price' => round($wholesale * 0.88, 2),
                'in_stock' => (bool) ($row['inStock'] ?? true),
                'stock_meters' => (int) (($row['wholesalePrice'] ?? 100) * 8),
                'badge' => $row['badge'],
                'image' => $row['image'],
                'description' => $row['name'].' — วัสดุ '.$row['material'].' ความกว้าง '.$row['width'],
                'is_featured' => (bool) ($row['isFeatured'] ?? false),
                'is_active' => true,
            ]);

            $industryIds = collect($row['industrySlugs'] ?? [])
                ->map(fn ($slug) => $industries[$slug] ?? null)
                ->filter()
                ->values()
                ->all();

            $product->industries()->sync($industryIds);

            foreach ($row['colors'] ?? [] as $index => $color) {
                $product->colors()->create([
                    'name' => $color['name'],
                    'code' => $color['code'] ?? null,
                    'image' => $color['image'] ?? null,
                    'in_stock' => (bool) ($color['inStock'] ?? true),
                    'retail_price' => $color['retailPrice'] ?? null,
                    'wholesale_price' => $color['wholesalePrice'] ?? null,
                    'sort_order' => $index + 1,
                ]);
            }
        }
    }

    private function seedArticles(array $rows): void
    {
        foreach ($rows as $row) {
            Article::query()->create([
                'slug' => $row['slug'],
                'title' => $row['title'],
                'category' => $row['category'],
                'author' => $row['author'],
                'read_time' => $row['readTime'],
                'published_at' => $row['publishedAt'] ?? now()->toDateString(),
                'excerpt' => $row['excerpt'],
                'content' => $row['content'],
                'image' => $row['image'],
                'is_published' => true,
            ]);
        }
    }

    private function seedServices(array $rows): void
    {
        foreach ($rows as $row) {
            Service::query()->create([
                'slug' => $row['slug'],
                'eyebrow' => $row['eyebrow'],
                'title' => $row['title'],
                'short_label' => $row['shortLabel'],
                'subtitle' => $row['subtitle'],
                'image' => $row['image'],
                'highlights' => $row['highlights'] ?? [],
                'body' => $row['body'] ?? [],
                'sort_order' => $row['sortOrder'] ?? 0,
                'is_active' => true,
            ]);
        }
    }

    private function seedHeroSlides(array $rows): void
    {
        foreach ($rows as $row) {
            HeroSlide::query()->create([
                'eyebrow' => $row['eyebrow'],
                'title_line_1' => $row['titleLine1'],
                'title_line_2' => $row['titleLine2'],
                'description' => $row['description'],
                'image' => $row['image'],
                'primary_cta_label' => $row['primaryCtaLabel'],
                'primary_cta_url' => $row['primaryCtaUrl'],
                'secondary_cta_label' => $row['secondaryCtaLabel'],
                'secondary_cta_url' => $row['secondaryCtaUrl'],
                'sort_order' => $row['sortOrder'] ?? 0,
                'is_active' => true,
            ]);
        }
    }

    private function seedBranding(): void
    {
        SiteSetting::setMany([
            'logo' => null,
            'brand_name' => 'FabricFlow',
            'brand_accent' => 'Flow',
            'brand_tagline' => '',
            'show_brand_text' => true,
        ]);
    }

    private function seedBrands(): void
    {
        $rows = [
            [
                'slug' => 'milano-textile',
                'name' => 'Milano Textile',
                'name_th' => 'มิลาโน่ เท็กซ์ไทล์',
                'tagline' => 'Italian suiting & wool blends',
                'description' => 'แบรนด์ผ้าสูทและวูลเบลนด์จากอิตาลี สำหรับงานเทเลอร์และยูนิฟอร์มพรีเมียม',
                'image' => 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=85',
                'logo' => null,
                'website_url' => null,
                'country' => 'Italy',
                'sort_order' => 10,
                'is_featured' => true,
            ],
            [
                'slug' => 'pacific-cotton',
                'name' => 'Pacific Cotton',
                'name_th' => 'แปซิฟิก คอตตอน',
                'tagline' => 'Everyday cotton for retail & wholesale',
                'description' => 'คอตตอนคุณภาพสำหรับงานเสื้อผ้าทั่วไป ร้านค้า และแบรนด์แฟชั่น',
                'image' => 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&q=85',
                'logo' => null,
                'website_url' => null,
                'country' => 'Thailand',
                'sort_order' => 20,
                'is_featured' => true,
            ],
            [
                'slug' => 'denim-works',
                'name' => 'Denim Works',
                'name_th' => 'เดนิม เวิร์คส์',
                'tagline' => 'Classic & stretch denim',
                'description' => 'ผ้ายีนส์หลากน้ำหนัก ทั้ง classic และ stretch สำหรับกางเกงและแจ็กเก็ต',
                'image' => 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=85',
                'logo' => null,
                'website_url' => null,
                'country' => 'Japan',
                'sort_order' => 30,
                'is_featured' => false,
            ],
            [
                'slug' => 'haven-home',
                'name' => 'Haven Home',
                'name_th' => 'เฮเว่น โฮม',
                'tagline' => 'Fabrics for interiors',
                'description' => 'ผ้าตกแต่งบ้าน ผ้าม่าน และผ้าบุเฟอร์นิเจอร์',
                'image' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
                'logo' => null,
                'website_url' => null,
                'country' => 'Thailand',
                'sort_order' => 40,
                'is_featured' => false,
            ],
            [
                'slug' => 'uniform-pro',
                'name' => 'Uniform Pro',
                'name_th' => 'ยูนิฟอร์ม โปร',
                'tagline' => 'Durable fabrics for hospitality',
                'description' => 'ผ้ายูนิฟอร์มทนซัก เหมาะกับโรงแรม ร้านอาหาร และองค์กร',
                'image' => 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=85',
                'logo' => null,
                'website_url' => null,
                'country' => 'Thailand',
                'sort_order' => 50,
                'is_featured' => true,
            ],
            [
                'slug' => 'atelier-print',
                'name' => 'Atelier Print',
                'name_th' => 'อาเตอลิเย่ร์ พริ้นท์',
                'tagline' => 'Digital print base fabrics',
                'description' => 'ผ้าฐานพิมพ์ดิจิตอลสำหรับงานแฟชั่นและงานคราฟต์',
                'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
                'logo' => null,
                'website_url' => null,
                'country' => 'Korea',
                'sort_order' => 60,
                'is_featured' => false,
            ],
        ];

        foreach ($rows as $row) {
            Brand::query()->create([
                ...$row,
                'is_active' => true,
            ]);
        }
    }

    private function seedHeaderMenus(): void
    {
        MenuItem::query()->delete();

        $items = [
            ['label' => 'หน้าแรก', 'href' => '/', 'type' => 'link', 'sort_order' => 10],
            ['label' => 'สินค้า', 'href' => '/products', 'type' => 'link', 'sort_order' => 20],
            ['label' => 'ขายส่ง', 'href' => '/wholesale', 'type' => 'link', 'sort_order' => 30],
            ['label' => 'ผ้าแต่ละอุตสาหกรรม', 'href' => '/industries', 'type' => 'industries', 'sort_order' => 40],
            [
                'label' => 'บริการ',
                'href' => '/services',
                'type' => 'dropdown',
                'sort_order' => 50,
                'children' => [
                    ['label' => 'การจัดหาผ้า และการพรีออเดอร์ผ้า', 'href' => '/services/sourcing-preorder', 'sort_order' => 10],
                    ['label' => 'รับสั่งผลิต และพิมพ์ดิจิตอล', 'href' => '/services/custom-production', 'sort_order' => 20],
                    ['label' => 'วาร์ป & ไซส์ซิ่ง', 'href' => '/services/warp-sizing', 'sort_order' => 30],
                    ['label' => 'เครื่องคำนวณผ้า', 'href' => '/fabric-calculator', 'sort_order' => 40],
                ],
            ],
            ['label' => 'แบรนด์', 'href' => '/brands', 'type' => 'link', 'sort_order' => 60],
            ['label' => 'เกี่ยวกับเรา', 'href' => '/about', 'type' => 'link', 'sort_order' => 70],
            ['label' => 'บทความ', 'href' => '/articles', 'type' => 'link', 'sort_order' => 80],
            ['label' => 'ติดต่อเรา', 'href' => '/contact', 'type' => 'link', 'sort_order' => 90],
        ];

        foreach ($items as $row) {
            $children = $row['children'] ?? [];
            unset($row['children']);

            $parent = MenuItem::query()->create([
                ...$row,
                'location' => 'header',
                'is_active' => true,
            ]);

            foreach ($children as $child) {
                MenuItem::query()->create([
                    ...$child,
                    'parent_id' => $parent->id,
                    'location' => 'header',
                    'type' => 'link',
                    'is_active' => true,
                ]);
            }
        }
    }
}
