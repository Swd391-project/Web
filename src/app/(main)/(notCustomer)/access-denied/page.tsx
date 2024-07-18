"use client"
import React from 'react';

import { useRouter } from 'next/navigation';

const AccessDenied = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
            <p className="text-lg text-gray-600 mb-6">You do not have permission to view this page.</p>
            <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
                Go to Home
            </button>
        </div>
    );
};

export default AccessDenied;
