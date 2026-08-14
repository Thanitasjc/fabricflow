<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Opportunity extends Model
{
    public const STAGES = [
        'qualify' => 'Qualify',
        'propose' => 'Propose / Sample',
        'quotation' => 'Quotation',
        'negotiation' => 'Negotiation',
        'won' => 'Won',
        'lost' => 'Lost',
    ];

    protected $fillable = [
        'code', 'title', 'company_id', 'customer_id', 'contact_id', 'lead_id',
        'product_id', 'owner_user_id', 'stage', 'estimated_meters',
        'estimated_value', 'probability', 'expected_close_date',
        'next_follow_up_at', 'notes',
    ];

    protected $casts = [
        'estimated_meters' => 'decimal:2',
        'estimated_value' => 'decimal:2',
        'expected_close_date' => 'date',
        'next_follow_up_at' => 'date',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function contact(): BelongsTo
    {
        return $this->belongsTo(Contact::class);
    }

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_user_id');
    }

    public function quotations(): HasMany
    {
        return $this->hasMany(Quotation::class);
    }

    public function activities(): MorphMany
    {
        return $this->morphMany(Activity::class, 'related');
    }
}
