import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Show({ chat }) {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('chats.messages.store', chat.id), {
            onSuccess: () => reset('message'),
        });
    };

    const otherUser =
        auth.user.id === chat.buyer_id ? chat.seller : chat.buyer;

    return (
        <AuthenticatedLayout>
            <Head title={`Chat with ${otherUser.name}`} />

            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-6 text-2xl font-bold">
                    Chat with {otherUser.name}
                </h1>

                <div className="mb-6 space-y-3 rounded-xl border p-4">
                    {chat.messages.length > 0 ? (
                        chat.messages.map((message) => {
                            const isMine = message.user_id === auth.user.id;

                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-md rounded-xl px-4 py-2 ${
                                            isMine
                                                ? 'bg-black text-white'
                                                : 'bg-gray-100 text-black'
                                        }`}
                                    >
                                        <div className="mb-1 text-xs opacity-70">
                                            {message.user.name}
                                        </div>

                                        <div>{message.message}</div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500">No messages yet.</p>
                    )}
                </div>

                <form onSubmit={submit} className="space-y-3">
                    <textarea
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        className="w-full rounded-xl border p-3"
                        rows={4}
                        placeholder="Write a message..."
                    />

                    {errors.message && (
                        <div className="text-red-500">{errors.message}</div>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-black px-4 py-2 text-white"
                    >
                        Send
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
