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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div key={product.id} className="rounded-xl border p-4 shadow-sm">
                        <h2 className="text-lg font-semibold">{product.title}</h2>

                        <p className="mt-2 text-sm text-gray-600">
                            Seller: {product.seller.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                            Type: {product.type === 'product' ? 'Товар' : 'Услуга'}
                        </p>

                        {product.description && (
                            <p className="mt-2 text-sm text-gray-600">
                                {product.description}
                            </p>
                        )}

                        {product.price && (
                            <p className="mt-2 font-bold">${product.price}</p>
                        )}

                        {product.location && (
                            <p className="mt-1 text-sm text-gray-600">
                                {product.location}
                            </p>
                        )}

                        {product.image_url && (
                            <img
                                src={product.image_url}
                                alt={product.title}
                                className="mb-3 h-48 w-full rounded-lg object-cover"
                            />
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
                <p>No products found.</p>
            )}
        </div>
    );

    const renderFilters = () => (
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or description..."
                className="w-full rounded-lg border px-4 py-2"
            />

            <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 md:max-w-xs"
            >
                <option value="">All types</option>
                <option value="product">Товар</option>
                <option value="service">Услуга</option>
            </select>
        </div>
    );

    if (!auth?.user) {
        return (
            <>
                <Head title="Products" />

                <div className="mx-auto max-w-5xl p-6">
                    <h1 className="mb-6 text-2xl font-bold">Products</h1>
                    {renderFilters()}
                    {renderProducts()}
                </div>
            </>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Products" />

            <div className="mx-auto max-w-5xl p-6">
                <h1 className="mb-6 text-2xl font-bold">Products</h1>
                {renderFilters()}
                {renderProducts()}
            </div>
        </AuthenticatedLayout>
    );
}
