import { router } from '@inertiajs/react';

export default function LogoutButton() {
    const logout = () => {
        router.post(route('logout'));
    };

    return (
        <button
            onClick={logout}
            className="rounded bg-red-600 px-4 py-2 text-white"
        >
            Logout
        </button>
    );
}
