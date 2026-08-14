<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invoice extends Model
{
    public const STATUSES = [
        'draft' => 'ร่าง',
        'issued' => 'ออกแล้ว',
        'partial' => 'ชำระบางส่วน',
        'paid' => 'ชำระครบ',
        'void' => 'ยกเลิก',
    ];

    protected $fillable = [
        'number', 'customer_id', 'order_id', 'status', 'invoice_date', 'due_date',
        'subtotal', 'vat_amount', 'total', 'paid_amount', 'notes',
    ];

    protected $casts = [
        'invoice_date' => 'date',
        'due_date' => 'date',
        'subtotal' => 'decimal:2',
        'vat_amount' => 'decimal:2',
        'total' => 'decimal:2',
        'paid_amount' => 'decimal:2',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function outstanding(): float
    {
        return max(0, (float) $this->total - (float) $this->paid_amount);
    }
}
