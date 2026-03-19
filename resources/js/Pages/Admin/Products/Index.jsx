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
            <Head title="All Products" />

            <div className="min-h-screen bg-gray-900 p-6">
                <div className="mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-white">All Products</h1>
                    </div>

                    {/* Products */}
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="rounded-xl bg-gray-800 border border-gray-700 p-4 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition"
                            >
                                {/* Image */}
                                {product.image_url && (
                                    <img
                                        src={product.image_url}
                                        alt={product.title}
                                        className="mb-4 h-48 w-full rounded-lg object-cover"
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
                                        className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-white font-medium hover:bg-blue-700 transition"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => destroyProduct(product.id)}
                                        className="flex-1 rounded-lg bg-red-600 py-2 text-center text-white font-medium hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
