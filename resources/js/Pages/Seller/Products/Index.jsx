import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ products }) {
    const destroyProduct = (id) => {
        if (confirm('Delete this product?')) {
            router.delete(route('seller.products.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="My Products" />

            {/* Page background */}
            <div className="min-h-screen bg-gray-900 text-white p-6">
                <div className="mx-auto max-w-6xl px-6">

                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold">
                            My Products
                        </h1>

                        <Link
                            href={route('seller.products.create')}
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition"
                        >
                            + Add Product
                        </Link>
                    </div>

                    {/* Products */}
                    {products.length === 0 ? (
                        <div className="rounded-xl bg-white/60 p-6 text-center text-blue-800 shadow">
                            No products yet.
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-gray-800 border-gray-700 shadow-lg hover:scale-105  rounded-2xl backdrop-blur border p-4 hover:shadow-lg transition"
                                >
                                    {/* Image */}
                                    {product.image_url && (
                                        <img
                                            src={product.image_url}
                                            alt={product.title}
                                            className="mb-4 h-44 w-full rounded-xl object-cover"
                                        />
                                    )}

                                    {/* Info */}
                                    <h2 className="mb-2 text-lg font-semibold text-white">
                                        {product.title}
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        💰 {product.price ? `$${product.price}` : 'Not specified'}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        📞 {product.phone}
                                    </p>

                                    <p className="text-sm text-gray-400">
                                        📍 {product.location ?? 'Not specified'}
                                    </p>

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-2">
                                        <Link
                                            href={route('seller.products.edit', product.id)}
                                            className="flex-1 rounded-lg bg-blue-500 py-2 text-center text-sm font-medium text-white hover:bg-blue-600 transition"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => destroyProduct(product.id)}
                                            className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
