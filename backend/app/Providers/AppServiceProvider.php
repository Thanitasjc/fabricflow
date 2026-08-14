<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Keep storage/preview URLs on the same host the admin is opened with
        // (localhost vs 127.0.0.1) so Filament FilePond can show image previews.
        if (! $this->app->runningInConsole() && $this->app->environment('local')) {
            $root = request()->getSchemeAndHttpHost();

            if ($root) {
                URL::forceRootUrl($root);
                config([
                    'filesystems.disks.public.url' => $root.'/storage',
                ]);
            }
        }
    }
}
