<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'eyebrow', 'title_line_1', 'title_line_2', 'description', 'image',
        'primary_cta_label', 'primary_cta_url', 'secondary_cta_label',
        'secondary_cta_url', 'sort_order', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
