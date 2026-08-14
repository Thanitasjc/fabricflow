<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Warehouse extends Model
{
    public const TYPES = [
        'main' => 'คลังหลัก',
        'branch' => 'คลังสาขา',
        'showroom' => 'โชว์รูม',
    ];

    protected $fillable = ['code', 'name', 'type', 'address', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];

    public function stocks(): HasMany
    {
        return $this->hasMany(WarehouseStock::class);
    }

    public function lots(): HasMany
    {
        return $this->hasMany(StockLot::class);
    }
}
