import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ chats }) {
    return (
        <AuthenticatedLayout>
            <Head title="My Chats" />

            <div className="mx-auto max-w-4xl p-6">
                <h1 className="mb-6 text-2xl font-bold">My Chats</h1>

                <div className="space-y-3">
                    {chats.length > 0 ? (
                        chats.map((chat) => (
                            <Link
                                key={chat.id}
                                href={route('chats.show', chat.id)}
                                className="block rounded-xl border p-4 transition hover:bg-gray-50"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="font-semibold">
                                            {chat.other_user.name}
                                        </div>

                                        <div className="mt-1 text-sm text-gray-500">
                                            {chat.last_message
                                                ? chat.last_message.message
                                                : 'No messages yet'}
                                        </div>
                                    </div>

                                    {chat.unread_count > 0 && (
                                        <span className="rounded-full bg-black px-2 py-1 text-xs text-white">
                                            {chat.unread_count}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500">No chats yet.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
