import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <nav className="border-b border-gray-800 bg-gray-900 text-white shadow-md sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">

                        {/* LEFT */}
                        <div className="flex items-center">
                            <Link href={route('home')}>
                                <div className="flex items-center gap-2">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-white"/>
                                </div>
                            </Link>

                            <div className="hidden sm:ms-10 sm:flex sm:items-center sm:gap-6">
                                <NavLink
                                    href={route('products.index')}
                                    active={route().current('products.index')}
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    Products
                                </NavLink>

                                <NavLink
                                    href="/contact"
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    Contact
                                </NavLink>

                                <NavLink
                                    href="/about"
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    About
                                </NavLink>

                                {user.role === 'seller' && (
                                    <NavLink
                                        href={route('seller.products.index')}
                                        active={route().current('seller.products.*')}
                                        className="text-gray-300 hover:text-white transition"
                                    >
                                        My Products
                                    </NavLink>
                                )}

                                {user.is_admin && (
                                    <NavLink href={route('admin.products.index')}>
                                        All Products
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="hidden sm:flex sm:items-center sm:gap-4">

                            {/* USER */}
                            <div className="flex items-center gap-3 bg-gray-800 px-3 py-2 rounded-xl">
                                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">
                                        {user.name}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            {/* LOGOUT */}
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-red-600 transition"
                            >
                                Logout
                            </Link>
                        </div>

                        {/* MOBILE BUTTON */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(!showingNavigationDropdown)
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE MENU */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink href={route('products.index')}>
                            Products
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href="/contact">
                            Contact
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href="/about">
                            About
                        </ResponsiveNavLink>

                        {user.role === 'seller' && (
                            <ResponsiveNavLink href={route('seller.products.index')}>
                                My Products
                            </ResponsiveNavLink>
                        )}

                        {user.is_admin && (
                            <ResponsiveNavLink href={route('admin.products.index')}>
                                All Products
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="border-t border-gray-700 pb-3 pt-4">
                        <div className="px-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <div className="text-base font-medium text-white">
                                    {user.name}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 space-y-1 px-2">
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Logout
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* HEADER */}
            {header && (
                <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-lg font-semibold">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
