import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <AuthenticatedLayout
        >
            <Head title="About" />

            <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
                <div className="max-w-3xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        About Us
                    </h1>

                    <p className="text-gray-300 mb-4">
                        Welcome to ArmShop — a modern online shopping platform designed to provide users with a simple, fast, and convenient shopping experience.
                    </p>

                    <p className="text-gray-300 mb-4">
                        Our mission is to offer high-quality products at affordable prices while ensuring a user-friendly interface and smooth interaction with the system. We aim to make online shopping accessible and enjoyable for everyone.
                    </p>

                    <p className="text-gray-300 mb-4">
                        ArmShop allows users to browse products, view detailed information, and interact with sellers in a secure and efficient environment. Sellers can easily manage their products, upload images, and update information through a dedicated dashboard.
                    </p>

                    <p className="text-gray-300 mb-4">
                        This platform is developed as part of a diploma project, demonstrating the implementation of a full-featured e-commerce system using modern web technologies. It includes both frontend and backend functionalities such as authentication, product management, and dynamic user interaction.
                    </p>

                    <p className="text-gray-300 mb-4">
                        The project focuses on performance, usability, and clean design, following current development standards and best practices.
                    </p>

                    <p className="text-gray-400 mt-6 text-center">
                        © 2026 ArmShop. All rights reserved.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
