<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseOrderItem extends Model
{
    protected $fillable = [
        'purchase_order_id', 'product_id', 'description', 'quantity_meters',
        'unit_cost', 'line_total', 'received_meters',
    ];

    protected $casts = [
        'quantity_meters' => 'decimal:2',
        'unit_cost' => 'decimal:2',
        'line_total' => 'decimal:2',
        'received_meters' => 'decimal:2',
    ];

    protected static function booted(): void
    {
        static::saving(function (PurchaseOrderItem $item) {
            $item->line_total = round(((float) $item->quantity_meters) * ((float) $item->unit_cost), 2);
        });

        static::saved(fn (PurchaseOrderItem $item) => $item->purchaseOrder?->recalculateTotal());
        static::deleted(fn (PurchaseOrderItem $item) => $item->purchaseOrder?->recalculateTotal());
    }

    public function purchaseOrder(): BelongsTo
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
