<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    public const STATUSES = [
        'draft' => 'ร่าง',
        'confirmed' => 'ยืนยันแล้ว',
        'shipped' => 'จัดส่งแล้ว',
        'completed' => 'เสร็จสิ้น',
        'cancelled' => 'ยกเลิก',
    ];

    protected $fillable = [
        'number', 'customer_id', 'quotation_id', 'opportunity_id', 'warehouse_id',
        'sales_user_id', 'status', 'order_date', 'subtotal', 'discount', 'total',
        'reserved_meters_total', 'notes', 'stock_deducted_at',
    ];

    protected $casts = [
        'order_date' => 'date',
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'stock_deducted_at' => 'datetime',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function quotation(): BelongsTo
    {
        return $this->belongsTo(Quotation::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class)->orderBy('sort_order');
    }

    public function recalculateTotals(): void
    {
        $subtotal = (float) $this->items()->sum('line_total');
        $discount = (float) $this->discount;
        $this->update([
            'subtotal' => $subtotal,
            'total' => max(0, $subtotal - $discount),
        ]);
    }

    public function isStockDeducted(): bool
    {
        return $this->stock_deducted_at !== null;
    }
}
