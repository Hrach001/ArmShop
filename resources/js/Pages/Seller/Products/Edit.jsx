import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Edit({ product }) {
    const { data, setData, post,  put,  processing, errors } = useForm({
        title: product.title || '',
        type: product.type || 'product',
        image: null,
        description: product.description || '',
        price: product.price || '',
        phone: product.phone || '',
        location: product.location || '',
    });

    const [preview, setPreview] = useState(null);

    const submit = (e) => {
        e.preventDefault();

        const formData = {
            ...data,
        };

        if (!data.image) {
            delete formData.image;
        }

        post(route('seller.products.update', product.id), {
            ...formData,
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Edit Product" />

            <div className="min-h-screen bg-gray-900 text-white p-6">
                <div className="mx-auto max-w-2xl bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl">

                    <h1 className="mb-6 text-3xl font-bold text-center">
                        Edit Product
                    </h1>

                    <form onSubmit={submit} className="space-y-4">

                        {/* Title */}
                        <div>
                            <label className="block text-gray-300 mb-1">Title</label>
                            <input
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white"
                            />
                            {errors.title && <div className="text-red-400 text-sm">{errors.title}</div>}
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-gray-300 mb-1">Category</label>
                            <select
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white"
                            >
                                <option value="product">Product</option>
                                <option value="service">Service</option>
                            </select>
                        </div>

                        {/* Current Image */}
                        {product.image_url && !preview && (
                            <img
                                src={product.image_url}
                                alt="Current"
                                className="h-40 w-full object-cover rounded-lg"
                            />
                        )}

                        {/* New Image */}
                        <div>
                            <label className="block text-gray-300 mb-1">Change Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setData('image', file);

                                    if (file) {
                                        setPreview(URL.createObjectURL(file));
                                    }
                                }}
                                className="w-full text-gray-300"
                            />
                        </div>

                        {/* Preview */}
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="h-40 w-full object-cover rounded-lg"
                            />
                        )}

                        {/* Description */}
                        <div>
                            <label className="block text-gray-300 mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-gray-300 mb-1">Price</label>
                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-gray-300 mb-1">Phone</label>
                            <input
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-gray-300 mb-1">Location</label>
                            <input
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="w-full rounded-lg bg-gray-700 border border-gray-600 px-4 py-2 text-white"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-gray-700 py-2 text-white font-semibold hover:bg-gray-600 hover:scale-[1.02] transition"
                        >
                            Update Product
                        </button>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
