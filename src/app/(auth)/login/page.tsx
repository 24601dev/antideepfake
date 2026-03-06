'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {login} from '../actions';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // The sweet little "backdoor" for oppa's testing!
        const isBackdoorEmail = (email === 'antideepfake' || email === 'antideepfake@test.com');
        const isBackdoorPassword = (password === 'antideepfake');

        if (isBackdoorEmail && isBackdoorPassword) {
            document.cookie = "dev_backdoor=true; path=/; max-age=31536000"; // 1 year
            window.location.href = '/dashboard'; // Force full reload to ensure middleware catches it
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const result = await login(formData);

        if (result?.error) {
            setError(result.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-white">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-[#111111] border border-[#262626] p-8 shadow-2xl">
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-lg bg-indigo-600/20 text-indigo-500 flex items-center justify-center mb-6">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back</h2>
                    <p className="text-sm text-gray-400">Sign in to your AegisLens dashboard.</p>
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-lg border-0 bg-[#1a1a1a] py-2.5 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-3 transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-lg border-0 bg-[#1a1a1a] py-2.5 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-3 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center items-center gap-2 rounded-lg bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in securely
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    )
}
