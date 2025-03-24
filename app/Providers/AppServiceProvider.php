<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

use App\Models\Year;
use App\Observers\YearObserver;


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
        Vite::prefetch(concurrency: 3);
        Year::observe(YearObserver::class);

        ini_set('upload_max_filesize', env('UPLOAD_MAX_FILESIZE', '40M'));
        ini_set('post_max_size', env('POST_MAX_SIZE', '40M'));
    

    }
}
