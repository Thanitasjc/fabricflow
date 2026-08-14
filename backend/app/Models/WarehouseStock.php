<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WarehouseStock extends Model
{
    protected $fillable = [
        'warehouse_id', 'product_id', 'product_color_id',
        'quantity_meters', 'reserved_meters',
    ];

    protected $casts = [
        'quantity_meters' => 'decimal:2',
        'reserved_meters' => 'decimal:2',
    ];

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function availableMeters(): float
    {
        return max(0, (float) $this->quantity_meters - (float) $this->reserved_meters);
    }
}
