import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ product }) {
    return (
        <AuthenticatedLayout>
            <Head title={product.title} />

            <div className="mx-auto max-w-3xl p-6">
                <h1 className="text-2xl font-bold">{product.title}</h1>

                <p className="mt-2 text-gray-600">Seller: {product.seller.name}</p>

                {product.location && (
                    <p className="mt-2 text-gray-600">Location: {product.location}</p>
                )}

                {product.price && (
                    <p className="mt-4 text-xl font-bold">${product.price}</p>
                )}

                <p className="mt-4">{product.description}</p>

                <div className="mt-6 rounded-lg border p-4">
                    <p className="text-sm text-gray-500">Seller phone</p>
                    <a
                        href={`tel:${product.phone}`}
                        className="mt-2 inline-block text-lg font-semibold text-blue-600 underline"
                    >
                        {product.phone}
                    </a>
                </div>
            </div>
            </AuthenticatedLayout>
    );
}
