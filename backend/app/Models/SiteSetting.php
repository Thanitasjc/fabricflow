<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value'];

    public static function getValue(string $key, mixed $default = null): mixed
    {
        $all = static::allCached();

        return array_key_exists($key, $all) ? $all[$key] : $default;
    }

    public static function setValue(string $key, mixed $value): void
    {
        static::query()->updateOrCreate(
            ['key' => $key],
            ['value' => is_bool($value) ? ($value ? '1' : '0') : (is_scalar($value) || $value === null ? $value : json_encode($value))]
        );

        Cache::forget('site_settings');
    }

    public static function setMany(array $values): void
    {
        foreach ($values as $key => $value) {
            static::setValue($key, $value);
        }
    }

    /**
     * @return array<string, mixed>
     */
    public static function allCached(): array
    {
        return Cache::remember('site_settings', 60, function () {
            return static::query()->pluck('value', 'key')->all();
        });
    }

    public static function branding(): array
    {
        $logo = static::getValue('logo');
        $showText = static::getValue('show_brand_text', '1');

        return [
            'logo' => $logo,
            'brandName' => static::getValue('brand_name', 'FabricFlow') ?: 'FabricFlow',
            'brandAccent' => static::getValue('brand_accent', 'Flow') ?: '',
            'tagline' => static::getValue('brand_tagline', ''),
            'showText' => $showText === null || $showText === '' || $showText === '1' || $showText === 1 || $showText === true,
        ];
    }
}
