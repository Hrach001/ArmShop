import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function Index({ products }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const query = search.toLowerCase().trim();

            const title = product.title?.toLowerCase() || '';
            const description = product.description?.toLowerCase() || '';

            const matchesSearch =
                !query ||
                title.includes(query) ||
                description.includes(query);

            const matchesType =
                !selectedType || product.type === selectedType;

            return matchesSearch && matchesType;
        });
    }, [products, search, selectedType]);

    const renderProducts = () => (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg hover:scale-105 transition"
                    >
                        {product.image_url && (
                            <img
                                src={product.image_url}
                                alt={product.title}
                                className="mb-3 h-48 w-full rounded-lg object-cover"
                            />
                        )}

                        <h2 className="text-lg font-semibold text-white">
                            {product.title}
                        </h2>

                        <p className="mt-2 text-sm text-gray-400">
                            Seller: {product.seller.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Type: {product.type === 'product' ? 'Товар' : 'Услуга'}
                        </p>

                        {product.description && (
                            <p className="mt-2 text-sm text-gray-300">
                                {product.description}
                            </p>
                        )}

                        {product.price && (
                            <p className="mt-2 font-bold text-white">
                                ${product.price}
                            </p>
                        )}

                        {product.location && (
                            <p className="mt-1 text-sm text-gray-400">
                                {product.location}
                            </p>
                        )}

                        <Link
                            href={route('products.show', product.id)}
                            className="mt-4 inline-block w-full text-center rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-600 transition"
                        >
                            View
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-gray-400">No products found.</p>
            )}
        </div>
    );

    const renderFilters = () => (
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            />

            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2 text-white md:max-w-xs focus:outline-none"
            >
                <option value="">All types</option>
                <option value="product">Product</option>
                <option value="service">Service</option>
            </select>
        </div>
    );

    const content = (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-6 text-3xl font-bold">Products</h1>
                {renderFilters()}
                {renderProducts()}
            </div>
        </div>
    );

    if (!auth?.user) {
        return (
            <>
                <Head title="Products" />
                {content}
            </>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Products" />
            {content}
        </AuthenticatedLayout>
    );
}
