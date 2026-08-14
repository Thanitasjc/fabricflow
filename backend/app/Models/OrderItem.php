<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id', 'product_id', 'product_color_id', 'description',
        'quantity_meters', 'unit_price', 'line_total', 'sort_order',
    ];

    protected $casts = [
        'quantity_meters' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'line_total' => 'decimal:2',
    ];

    protected static function booted(): void
    {
        static::saving(function (OrderItem $item) {
            $item->line_total = round(((float) $item->quantity_meters) * ((float) $item->unit_price), 2);
        });

        static::saved(function (OrderItem $item) {
            $item->order?->recalculateTotals();
        });

        static::deleted(function (OrderItem $item) {
            $item->order?->recalculateTotals();
        });
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function productColor(): BelongsTo
    {
        return $this->belongsTo(ProductColor::class);
    }
}
