import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price: '',
        phone: '',
        location: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('seller.products.store'));
    };

    return (
        <>
            <AuthenticatedLayout>
            <Head title="Create Product" />

            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-6 text-2xl font-bold">Create Product</h1>

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

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        Save
                    </button>
                </form>
            </div>
            </AuthenticatedLayout>
        </>
    );
}
