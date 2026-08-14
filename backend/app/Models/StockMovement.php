<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class StockMovement extends Model
{
    public const TYPES = [
        'in' => 'รับเข้า',
        'out' => 'จ่ายออก',
        'adjust' => 'ปรับปรุง',
    ];

    protected $fillable = [
        'product_id', 'warehouse_id', 'product_color_id', 'stock_lot_id', 'type',
        'quantity_meters', 'balance_after', 'reference_type', 'reference_id',
        'note', 'user_id',
    ];

    protected $casts = [
        'quantity_meters' => 'decimal:2',
        'balance_after' => 'decimal:2',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function productColor(): BelongsTo
    {
        return $this->belongsTo(ProductColor::class);
    }

    public function stockLot(): BelongsTo
    {
        return $this->belongsTo(StockLot::class);
    }

    public function reference(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
