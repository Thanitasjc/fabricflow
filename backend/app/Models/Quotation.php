<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quotation extends Model
{
    public const STATUSES = [
        'draft' => 'ร่าง',
        'sent' => 'ส่งแล้ว',
        'accepted' => 'ลูกค้าตอบรับ',
        'rejected' => 'ปฏิเสธ',
        'expired' => 'หมดอายุ',
    ];

    protected $fillable = [
        'number', 'customer_id', 'lead_id', 'opportunity_id', 'owner_user_id',
        'status', 'valid_until', 'subtotal', 'discount', 'total', 'notes',
    ];

    protected $casts = [
        'valid_until' => 'date',
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(QuotationItem::class)->orderBy('sort_order');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
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
}
