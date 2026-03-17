<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {

        $products = Product::with('seller')
            ->where('is_active', true)
            ->latest()
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product)
    {
        $product->load('seller');

        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }

    public function sellerIndex()
    {
        $products = Product::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Seller/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Seller/Products/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'phone' => ['required', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],
        ]);

        Product::create([
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'] ?? null,
            'phone' => $validated['phone'],
            'location' => $validated['location'] ?? null,
            'is_active' => true,
        ]);

        return redirect()->route('seller.products.index');
    }

    public function edit(Product $product)
    {
        abort_if($product->user_id !== auth()->id(), 403);

        return Inertia::render('Seller/Products/Edit', [
            'product' => $product,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        abort_if($product->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'phone' => ['required', 'string', 'max:50'],
            'location' => ['nullable', 'string', 'max:255'],
            'is_active' => ['required', 'boolean'],
        ]);

        $product->update($validated);

        return redirect()->route('seller.products.index');
    }

    public function destroy(Product $product)
    {
        abort_if($product->user_id !== auth()->id(), 403);

        $product->delete();

        return redirect()->route('seller.products.index');
    }
}
