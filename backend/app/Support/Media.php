<?php

namespace App\Support;

use Illuminate\Support\Facades\Storage;

class Media
{
    public static function diskName(): string
    {
        return config('filesystems.media_disk', env('MEDIA_DISK', 'public'));
    }

    public static function url(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return Storage::disk(static::diskName())->url($path);
    }
}
