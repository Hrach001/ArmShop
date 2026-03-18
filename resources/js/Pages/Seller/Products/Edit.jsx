import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ product }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: product.title,
        type: product.type ?? 'product',
        image: null,
        description: product.description ?? '',
        price: product.price ?? '',
        phone: product.phone,
        location: product.location ?? '',
        is_active: product.is_active,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('seller.products.update', product.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Product" />

            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-6 text-2xl font-bold">Edit Product</h1>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block">Title</label>
                        <input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.title && <div className="text-red-500">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block">Category</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="w-full rounded border p-2"
                        >
                            <option value="product">Товар</option>
                            <option value="service">Услуга</option>
                        </select>
                        {errors.type && <div className="text-red-500">{errors.type}</div>}
                    </div>

                    {product.image_url && (
                        <div>
                            <label className="mb-2 block">Current image</label>
                            <img
                                src={product.image_url}
                                alt={product.title}
                                className="h-48 w-full rounded-lg border object-cover"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block">New image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="w-full rounded border p-2"
                        />
                        {errors.image && <div className="text-red-500">{errors.image}</div>}
                    </div>

                    <div>
                        <label className="block">Description</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                    </div>

                    <div>
                        <label className="block">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.price && <div className="text-red-500">{errors.price}</div>}
                    </div>

                    <div>
                        <label className="block">Phone</label>
                        <input
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.phone && <div className="text-red-500">{errors.phone}</div>}
                    </div>

                    <div>
                        <label className="block">Location</label>
                        <input
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.location && <div className="text-red-500">{errors.location}</div>}
                    </div>

                    <div>
                        <label className="block">Active</label>
                        <select
                            value={data.is_active ? '1' : '0'}
                            onChange={(e) => setData('is_active', e.target.value === '1')}
                            className="w-full rounded border p-2"
                        >
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        Update
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
