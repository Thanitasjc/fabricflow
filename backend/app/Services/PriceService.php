<?php

namespace App\Services;

use App\Models\Customer;
use App\Models\CustomerPrice;
use App\Models\Product;

class PriceService
{
    public function resolve(Product $product, ?Customer $customer = null): float
    {
        if ($customer) {
            $custom = CustomerPrice::query()
                ->where('customer_id', $customer->id)
                ->where('product_id', $product->id)
                ->value('unit_price');

            if ($custom !== null) {
                return (float) $custom;
            }

            $tier = $customer->group?->price_tier ?: $customer->price_tier;

            return $product->priceForTier($tier ?: 'wholesale');
        }

        return (float) $product->wholesale_price;
    }
}
