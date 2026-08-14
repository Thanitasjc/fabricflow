<?php

namespace App\Support;

use App\Models\Company;
use App\Models\Customer;
use App\Models\GoodsReceipt;
use App\Models\Invoice;
use App\Models\Opportunity;
use App\Models\Order;
use App\Models\Payment;
use App\Models\PurchaseOrder;
use App\Models\Quotation;
use App\Models\StockTransfer;
use App\Models\Supplier;

class DocumentNumber
{
    public static function customer(): string
    {
        return self::seq('CUS-', Customer::class, 5);
    }

    public static function company(): string
    {
        return self::seq('COM-', Company::class, 5);
    }

    public static function supplier(): string
    {
        return self::seq('SUP-', Supplier::class, 5);
    }

    public static function opportunity(): string
    {
        return 'OPP-'.now()->format('Ym').'-'.str_pad((string) (Opportunity::query()->whereYear('created_at', now()->year)->whereMonth('created_at', now()->month)->count() + 1), 4, '0', STR_PAD_LEFT);
    }

    public static function quotation(): string
    {
        return self::monthly('QT-', Quotation::class);
    }

    public static function order(): string
    {
        return self::monthly('SO-', Order::class);
    }

    public static function invoice(): string
    {
        return self::monthly('INV-', Invoice::class);
    }

    public static function payment(): string
    {
        return self::monthly('PAY-', Payment::class);
    }

    public static function purchaseOrder(): string
    {
        return self::monthly('PO-', PurchaseOrder::class);
    }

    public static function goodsReceipt(): string
    {
        return self::monthly('GR-', GoodsReceipt::class);
    }

    public static function transfer(): string
    {
        return self::monthly('TR-', StockTransfer::class);
    }

    private static function seq(string $prefix, string $model, int $pad): string
    {
        $seq = $model::query()->count() + 1;

        return $prefix.str_pad((string) $seq, $pad, '0', STR_PAD_LEFT);
    }

    private static function monthly(string $prefix, string $model): string
    {
        $full = $prefix.now()->format('Ym').'-';
        $count = $model::query()->where('number', 'like', $full.'%')->count() + 1;

        return $full.str_pad((string) $count, 4, '0', STR_PAD_LEFT);
    }
}
