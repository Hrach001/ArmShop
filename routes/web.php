<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/products', [ProductController::class, 'adminIndex'])->name('products.index');
});

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');

Route::middleware(['auth', 'seller'])->prefix('seller')->name('seller.')->group(function () {
    Route::get('/products', [ProductController::class, 'sellerIndex'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('home');


    Route::get('/dashboard', function () {
        return redirect()->route('home');
    })->name('dashboard');
});

require __DIR__.'/auth.php';
