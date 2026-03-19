import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ product }) {
    return (
        <AuthenticatedLayout>
            <Head title={product.title} />

            <div className="min-h-screen bg-gray-900 p-6">
                <div className="mx-auto max-w-3xl">

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white mb-2">{product.title}</h1>

                    {/* Seller & Location */}
                    <p className="mt-2 text-gray-400">Seller: {product.seller.name}</p>
                    {product.location && (
                        <p className="mt-1 text-gray-400">Location: {product.location}</p>
                    )}

                    {/* Price */}
                    {product.price && (
                        <p className="mt-4 text-2xl font-bold text-white">${product.price}</p>
                    )}

                    {/* Image */}
                    {product.image_url && (
                        <img
                            src={product.image_url}
                            alt={product.title}
                            className="my-6 h-80 w-full rounded-xl object-cover border border-gray-700 shadow-md"
                        />
                    )}

                    {/* Description */}
                    <p className="mt-4 text-gray-200">{product.description}</p>

                    {/* Contact Card */}
                    <div className="mt-6 rounded-xl bg-gray-800 border border-gray-700 p-4 shadow-md">
                        <p className="text-sm text-gray-400">Seller phone</p>
                        <a
                            href={`tel:${product.phone}`}
                            className="mt-2 inline-block text-lg font-semibold text-blue-600 hover:text-blue-500 underline transition"
                        >
                            {product.phone}
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
