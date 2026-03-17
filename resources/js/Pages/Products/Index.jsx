import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ products }) {
    const { auth } = usePage().props;

    if (!auth?.user) {
        return (
            <>
                <Head title="Products" />

                <div className="mx-auto max-w-5xl p-6">
                    <h1 className="mb-6 text-2xl font-bold">Products</h1>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="rounded-xl border p-4 shadow-sm">
                                    <h2 className="text-lg font-semibold">{product.title}</h2>

                                    <p className="mt-2 text-sm text-gray-600">
                                        Seller: {product.seller.name}
                                    </p>

                                    {product.price && (
                                        <p className="mt-2 font-bold">${product.price}</p>
                                    )}

                                    {product.location && (
                                        <p className="mt-1 text-sm text-gray-600">
                                            {product.location}
                                        </p>
                                    )}

                                    <Link
                                        href={route('products.show', product.id)}
                                        className="mt-4 inline-block rounded bg-black px-4 py-2 text-white"
                                    >
                                        View
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No products yet.</p>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Products" />

            <div className="mx-auto max-w-5xl p-6">
                <h1 className="mb-6 text-2xl font-bold">Products</h1>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="rounded-xl border p-4 shadow-sm">
                                <h2 className="text-lg font-semibold">{product.title}</h2>

                                <p className="mt-2 text-sm text-gray-600">
                                    Seller: {product.seller.name}
                                </p>

                                {product.price && (
                                    <p className="mt-2 font-bold">${product.price}</p>
                                )}

                                {product.location && (
                                    <p className="mt-1 text-sm text-gray-600">
                                        {product.location}
                                    </p>
                                )}

                                <Link
                                    href={route('products.show', product.id)}
                                    className="mt-4 inline-block rounded bg-black px-4 py-2 text-white"
                                >
                                    View
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No products yet.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
