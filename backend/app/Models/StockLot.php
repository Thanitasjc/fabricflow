<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockLot extends Model
{
    protected $fillable = [
        'warehouse_id', 'product_id', 'product_color_id', 'lot_number',
        'roll_number', 'quantity_meters', 'received_at', 'status', 'notes',
    ];

    protected $casts = [
        'quantity_meters' => 'decimal:2',
        'received_at' => 'date',
    ];

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
