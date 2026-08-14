<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Industry extends Model
{
    protected $fillable = [
        'slug', 'name_th', 'name_en', 'description', 'intro', 'guide_title',
        'guide_body', 'image', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'guide_body' => 'array',
        'is_active' => 'boolean',
    ];

    public function collections(): HasMany
    {
        return $this->hasMany(IndustryCollection::class)->orderBy('sort_order');
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class);
    }
}
