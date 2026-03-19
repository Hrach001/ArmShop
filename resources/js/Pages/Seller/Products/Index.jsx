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

            <div className="mx-auto max-w-5xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Products</h1>

                    <Link
                        href={route('seller.products.create')}
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        Add Product
                    </Link>
                </div>

                <div className="space-y-4">
                    {products.map((product) => (
                        <div key={product.id} className="rounded border p-4">
                            <h2 className="font-semibold">{product.title}</h2>
                            <p>Price: {product.price ? `$${product.price}` : 'Not specified'}</p>
                            <p>Phone: {product.phone}</p>
                            <p>Location: {product.location ?? 'Not specified'}</p>
                            {product.image_url && (
                                <img
                                    src={product.image_url}
                                    alt={product.title}
                                    className="mb-3 h-48 w-full rounded-lg object-cover"
                                />
                            )}
                            <div className="mt-3 flex gap-2">
                                <Link
                                    href={route('seller.products.edit', product.id)}
                                    className="rounded bg-blue-600 px-3 py-2 text-white"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => destroyProduct(product.id)}
                                    className="rounded bg-red-600 px-3 py-2 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
