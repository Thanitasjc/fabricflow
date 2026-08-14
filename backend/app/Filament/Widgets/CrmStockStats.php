<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use App\Models\Order;
use App\Models\Product;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CrmStockStats extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $lowStock = Product::query()->where('is_active', true)->where('stock_meters', '<=', 100)->count();
        $openLeads = Lead::query()->whereIn('status', ['new', 'contacted', 'quoted'])->count();
        $openOrders = Order::query()->whereIn('status', ['draft', 'confirmed', 'shipped'])->count();

        return [
            Stat::make('Lead เปิดอยู่', (string) $openLeads)
                ->description('ใหม่ / ติดต่อแล้ว / เสนอราคา')
                ->color('warning'),
            Stat::make('ออเดอร์ดำเนินการ', (string) $openOrders)
                ->description('ร่าง / ยืนยัน / จัดส่ง')
                ->color('primary'),
            Stat::make('สินค้าสต็อกต่ำ', (string) $lowStock)
                ->description('คงเหลือ ≤ 100 เมตร')
                ->color($lowStock > 0 ? 'danger' : 'success'),
        ];
    }
}
