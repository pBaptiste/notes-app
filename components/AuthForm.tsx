"use client"
import React, { useState } from 'react';
import { signInWithGoogle } from '@/auth/actions';
import Image from 'next/image';

type Props = {
    type: "login" | "signup";
}

function AuthForm({ type }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during sign-in.');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {type === 'login' ? 'Sign In' : 'Sign Up'}
            </h2>
            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
            <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
                {loading ? (
                    <span>Signing in...</span>
                ) : (
                    <>
                        <Image
                            src="/assets/images/icon-google.svg"
                            alt="Google"
                            width={20}
                            height={20}
                        />
                        Sign {type === 'login' ? 'in' : 'up'} with Google
                    </>
                )}
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">
                This will use your Google account to {type === 'login' ? 'sign in' : 'sign up'}.
            </p>
        </div>
    );
}

export default AuthForm;