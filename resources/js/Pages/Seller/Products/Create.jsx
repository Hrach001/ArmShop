import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        type: 'product',
        image: null,
        description: '',
        price: '',
        phone: '',
        location: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('seller.products.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create Product" />

            <div className="min-h-screen bg-gray-900 text-white p-6">
                <div className="mx-auto max-w-2xl bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">

                    <h1 className="mb-6 text-3xl font-bold text-center">
                        Create Product
                    </h1>

                    <form onSubmit={submit} className="space-y-4">

                        <div>
                            <label className="block text-gray-300 mb-1">Title</label>
                            <input
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                            />
                            {errors.title && <div className="text-red-400 text-sm">{errors.title}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-1">Category</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white focus:outline-none"
                            >
                                <option value="product">Товар</option>
                                <option value="service">Услуга</option>
                            </select>
                            {errors.type && <div className="text-red-400 text-sm">{errors.type}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-1">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('image', e.target.files[0])}
                                className="w-full text-gray-300"
                            />
                            {errors.image && <div className="text-red-400 text-sm">{errors.image}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-1">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white focus:outline-none"
                            />
                            {errors.price && <div className="text-red-400 text-sm">{errors.price}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-1">Phone</label>
                            <input
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white focus:outline-none"
                            />
                            {errors.phone && <div className="text-red-400 text-sm">{errors.phone}</div>}
                        </div>

                        <div>
                            <label className="block text-gray-300 mb-1">Location</label>
                            <input
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white focus:outline-none"
                            />
                            {errors.location && <div className="text-red-400 text-sm">{errors.location}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-gray-700 py-2 text-white font-semibold hover:bg-gray-600 transition"
                        >
                            Save Product
                        </button>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
