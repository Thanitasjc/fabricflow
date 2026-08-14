<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lead extends Model
{
    public const STATUSES = [
        'new' => 'ใหม่',
        'contacted' => 'ติดต่อแล้ว',
        'quoted' => 'เสนอราคาแล้ว',
        'won' => 'ปิดการขาย',
        'lost' => 'แพ้/ยกเลิก',
    ];

    protected $fillable = [
        'customer_id', 'contact_message_id', 'product_id', 'name', 'phone',
        'email', 'topic', 'message', 'status', 'estimated_meters', 'notes',
    ];

    protected $casts = [
        'estimated_meters' => 'decimal:2',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function contactMessage(): BelongsTo
    {
        return $this->belongsTo(ContactMessage::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class);
    }
}
