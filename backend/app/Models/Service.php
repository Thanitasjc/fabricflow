<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'slug', 'eyebrow', 'title', 'short_label', 'subtitle', 'image',
        'highlights', 'body', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'highlights' => 'array',
        'body' => 'array',
        'is_active' => 'boolean',
    ];
}
