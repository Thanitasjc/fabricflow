<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PurchaseOrder extends Model
{
    public const STATUSES = [
        'draft' => 'ร่าง',
        'ordered' => 'สั่งซื้อแล้ว',
        'partial' => 'รับบางส่วน',
        'received' => 'รับครบ',
        'cancelled' => 'ยกเลิก',
    ];

    protected $fillable = [
        'number', 'supplier_id', 'warehouse_id', 'status', 'order_date',
        'expected_at', 'total', 'notes',
    ];

    protected $casts = [
        'order_date' => 'date',
        'expected_at' => 'date',
        'total' => 'decimal:2',
    ];

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    public function recalculateTotal(): void
    {
        $this->update(['total' => (float) $this->items()->sum('line_total')]);
    }
}
