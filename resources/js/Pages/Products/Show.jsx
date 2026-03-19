import {Head, Link, usePage} from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ product }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout>
            <Head title={product.title} />

            <div className="min-h-screen bg-gray-900 p-6">
                <div className="mx-auto max-w-3xl">

                    {/* Title */}
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold text-white mb-2">{product.title}</h1>
                        <div>
                            {auth?.user && auth.user.id !== product.seller.id && (
                                <Link
                                    href={route('chats.start', product.seller.id)}
                                    className="inline-flex items-center justify-center rounded-full border p-2 bg-gray-100 hover:bg-gray-500"
                                    title="Open chat"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 10h8M8 14h5m-9 6 2.5-2.5A9 9 0 1 1 21 12a9 9 0 0 1-9 9 8.96 8.96 0 0 1-3.5-.7L4 20Z"
                                        />
                                    </svg>
                                </Link>
                            )}
                        </div>
                    </div>

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
