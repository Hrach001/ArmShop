import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div>
                <Link href="/">
                    <ApplicationLogo className="text-center"/>
                </Link>
            </div>

            <div
                className="w-full sm:max-w-md mt-6 px-8 py-6 bg-gray-900/80 border border-gray-700 backdrop-blur-md shadow-xl rounded-2xl">
                {children}
            </div>
        </div>
    );
}
