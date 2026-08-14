<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuotationItem extends Model
{
    protected $fillable = [
        'quotation_id', 'product_id', 'product_color_id', 'description',
        'quantity_meters', 'unit_price', 'line_total', 'sort_order',
    ];

    protected $casts = [
        'quantity_meters' => 'decimal:2',
        'unit_price' => 'decimal:2',
        'line_total' => 'decimal:2',
    ];

    protected static function booted(): void
    {
        static::saving(function (QuotationItem $item) {
            $item->line_total = round(((float) $item->quantity_meters) * ((float) $item->unit_price), 2);
        });

        static::saved(function (QuotationItem $item) {
            $item->quotation?->recalculateTotals();
        });

        static::deleted(function (QuotationItem $item) {
            $item->quotation?->recalculateTotals();
        });
    }

    public function quotation(): BelongsTo
    {
        return $this->belongsTo(Quotation::class);
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
