'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {signup} from '../actions';

export default function RegisterPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // The backdoor for testing
        const isBackdoorEmail = (email === 'antideepfake' || email === 'antideepfake@test.com');
        const isBackdoorPassword = (password === 'antideepfake');

        if (isBackdoorEmail && isBackdoorPassword && process.env.NODE_ENV === 'development') {
            document.cookie = "dev_backdoor=true; path=/; max-age=31536000"; // 1 year
            window.location.href = '/dashboard'; // Force full reload to ensure middleware catches it
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);

        const result = await signup(formData);

        if (result?.error) {
            let errorMsg = result.error;
            if (errorMsg.toLowerCase().includes('rate limit')) {
                errorMsg = "Email rate limit exceeded (Supabase allows 3 auth emails per hour on the free tier). You can either: 1) Use the included backdoor test account ('antideepfake' / 'antideepfake'), 2) Wait an hour, or 3) Disable 'Confirm Email' entirely in your Supabase dashboard under Authentication -> Providers.";
            }
            setError(errorMsg);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 text-white relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mx-20 -my-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mx-20 -my-20"></div>

            <div className="w-full max-w-xl space-y-8 rounded-2xl bg-[#111111]/80 backdrop-blur-xl border border-white/5 p-8 shadow-2xl relative z-10">
                <div className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-lg bg-indigo-600/20 shadow-[0_0_15px_rgba(79,70,229,0.2)] text-indigo-400 flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create your AegisLens Account</h2>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto">Reclaim ownership of your digital identity. Join the definitive anti-deepfake network.</p>
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                                <input
                                    id="first-name"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="relative block w-full rounded-lg border-0 bg-[#1a1a1a] py-2.5 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-600 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-3 transition-all"
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                                <input
                                    id="last-name"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="relative block w-full rounded-lg border-0 bg-[#1a1a1a] py-2.5 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-600 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-3 transition-all"
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-lg border-0 bg-[#1a1a1a] py-2.5 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-600 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-3 transition-all"
                                placeholder="name@agency.com"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Create Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-lg border-0 bg-[#1a1a1a] py-2.5 text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-600 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 px-3 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <label className="flex items-start gap-3">
                                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-600 bg-[#1a1a1a] text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900" />
                                <span className="text-xs text-gray-400">
                                    I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms of Service</a>, <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>, and consent to perceptual hash generation of my likeness.
                                </span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center items-center gap-2 rounded-lg bg-indigo-600 px-3 py-3.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Securing Identity...
                                </>
                            ) : (
                                <>
                                    Protect My Identity
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-400 mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
