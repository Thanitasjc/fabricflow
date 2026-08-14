<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Customer extends Model
{
    public const PRICE_TIERS = [
        'retail' => 'Retail',
        'wholesale' => 'Wholesale',
        'dealer' => 'Dealer',
        'vip' => 'VIP',
        'corporate' => 'Corporate',
    ];

    protected $fillable = [
        'company_id', 'customer_group_id', 'sales_user_id', 'code', 'name', 'type',
        'price_tier', 'company', 'phone', 'email', 'line_id', 'address', 'notes',
        'credit_limit', 'payment_terms_days', 'credit_used', 'is_active',
    ];

    protected $casts = [
        'credit_limit' => 'decimal:2',
        'credit_used' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function companyAccount(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function group(): BelongsTo
    {
        return $this->belongsTo(CustomerGroup::class, 'customer_group_id');
    }

    public function salesOwner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sales_user_id');
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }

    public function opportunities(): HasMany
    {
        return $this->hasMany(Opportunity::class);
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(CustomerDocument::class);
    }

    public function customPrices(): HasMany
    {
        return $this->hasMany(CustomerPrice::class);
    }

    public function contactMessages(): HasMany
    {
        return $this->hasMany(ContactMessage::class);
    }

    public function activities(): MorphMany
    {
        return $this->morphMany(Activity::class, 'related');
    }

    public function availableCredit(): float
    {
        return max(0, (float) $this->credit_limit - (float) $this->credit_used);
    }
}
