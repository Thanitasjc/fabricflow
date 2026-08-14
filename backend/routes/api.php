<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\PortalController;
use Illuminate\Support\Facades\Route;

Route::get('/categories', [CatalogController::class, 'categories']);
Route::get('/products', [CatalogController::class, 'products']);
Route::get('/products/{slug}', [CatalogController::class, 'product']);
Route::get('/industries', [CatalogController::class, 'industries']);
Route::get('/industries/{slug}', [CatalogController::class, 'industry']);
Route::get('/articles', [CatalogController::class, 'articles']);
Route::get('/articles/{slug}', [CatalogController::class, 'article']);
Route::get('/services', [CatalogController::class, 'services']);
Route::get('/services/{slug}', [CatalogController::class, 'service']);
Route::get('/hero-slides', [CatalogController::class, 'heroSlides']);
Route::get('/brands', [CatalogController::class, 'brands']);
Route::get('/brands/{slug}', [CatalogController::class, 'brand']);
Route::get('/branding', [CatalogController::class, 'branding']);
Route::get('/menus', [CatalogController::class, 'menus']);
Route::post('/contact', [CatalogController::class, 'storeContact']);

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
    });
});

Route::middleware('auth:sanctum')->prefix('portal')->group(function () {
    Route::get('/dashboard', [PortalController::class, 'dashboard']);
    Route::get('/orders', [PortalController::class, 'orders']);
    Route::get('/quotations', [PortalController::class, 'quotations']);
    Route::get('/invoices', [PortalController::class, 'invoices']);
});
