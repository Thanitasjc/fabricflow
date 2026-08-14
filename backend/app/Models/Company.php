<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    protected $fillable = [
        'code', 'name', 'tax_id', 'industry', 'phone', 'email', 'website',
        'address', 'notes', 'is_active',
    ];

    protected $casts = ['is_active' => 'boolean'];

    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function customers(): HasMany
    {
        return $this->hasMany(Customer::class);
    }

    public function opportunities(): HasMany
    {
        return $this->hasMany(Opportunity::class);
    }
}
