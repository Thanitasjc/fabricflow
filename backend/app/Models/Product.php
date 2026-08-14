<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'category_id', 'sku', 'name', 'slug', 'brand', 'material', 'composition',
        'width', 'weight_gsm', 'color', 'pattern', 'finish', 'country_of_origin',
        'unit', 'min_order_meters', 'retail_price', 'wholesale_price', 'dealer_price',
        'vip_price', 'in_stock', 'stock_meters', 'badge', 'image', 'description',
        'is_featured', 'is_active',
    ];

    protected $casts = [
        'retail_price' => 'decimal:2',
        'wholesale_price' => 'decimal:2',
        'dealer_price' => 'decimal:2',
        'vip_price' => 'decimal:2',
        'min_order_meters' => 'decimal:2',
        'in_stock' => 'boolean',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function colors(): HasMany
    {
        return $this->hasMany(ProductColor::class)->orderBy('sort_order');
    }

    public function industries(): BelongsToMany
    {
        return $this->belongsToMany(Industry::class);
    }

    public function stockMovements(): HasMany
    {
        return $this->hasMany(StockMovement::class)->latest();
    }

    public function warehouseStocks(): HasMany
    {
        return $this->hasMany(WarehouseStock::class);
    }

    public function lots(): HasMany
    {
        return $this->hasMany(StockLot::class);
    }

    public function priceForTier(string $tier): float
    {
        return match ($tier) {
            'retail' => (float) $this->retail_price,
            'dealer' => (float) ($this->dealer_price ?? $this->wholesale_price),
            'vip', 'corporate' => (float) ($this->vip_price ?? $this->dealer_price ?? $this->wholesale_price),
            default => (float) $this->wholesale_price,
        };
    }
}
