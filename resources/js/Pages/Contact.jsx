import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Contact() {
    const { data, setData, post } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <AuthenticatedLayout
            // header={<h2>Contact Us</h2>}
        >
            <Head title="Contact" />

            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg">

                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Contact Us
                    </h1>

                    <form onSubmit={submit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full mb-3 px-4 py-2 bg-gray-700 rounded text-white"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full mb-3 px-4 py-2 bg-gray-700 rounded text-white"
                        />

                        <textarea
                            placeholder="Message"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className="w-full mb-3 px-4 py-2 bg-gray-700 rounded text-white"
                        />

                        <button className="w-full bg-indigo-600 py-2 rounded hover:bg-indigo-700 transition">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
