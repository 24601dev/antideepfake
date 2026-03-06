'use client';

import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            {/* Navbar */}
            <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 transition-all">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center neon-glow">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">Aegis<span className="text-indigo-500">Lens</span></span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <Link href="/how-it-works" className="hover:text-white transition-colors">How it Works</Link>
                        <Link href="/pricing" className="text-white transition-colors font-bold">Pricing</Link>
                        <Link href="/security" className="hover:text-white transition-colors">Security</Link>
                    </nav>
                    <div className="flex items-center gap-4 text-sm font-semibold">
                        <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Log in</Link>
                        <Link href="/register" className="bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Get Protected
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">Simple, Honest <span className="gradient-text">Protection.</span></h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        No hidden fees. No "celebrity tax". Just the cost of the residential proxies and AI agents needed to keep you safe.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16 text-left">
                        {/* Pro Plan */}
                        <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col group">
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
                                <p className="text-sm text-gray-400">Perfect for micro-influencers and creators.</p>
                            </div>
                            <div className="mb-8">
                                <div className="text-5xl font-black text-white">$29<span className="text-lg text-gray-500 font-medium">/mo</span></div>
                            </div>
                            <ul className="space-y-4 mb-10 flex-1">
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    5,000 Monthly Scans
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    100 Automated DMCA Notices
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    3 Biometric Identity Vectors
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Residential Proxy Rotation
                                </li>
                            </ul>
                            <Link href="/register" className="w-full py-4 text-center bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                Start Your Protection
                            </Link>
                        </div>

                        {/* Agency Plan */}
                        <div className="glass-panel p-8 rounded-3xl border border-indigo-500/50 bg-indigo-500/5 hover:border-indigo-400 transition-all flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3">
                                <span className="bg-indigo-600 text-[10px] font-bold text-white px-2.5 py-1 rounded-full uppercase tracking-widest shadow-lg">Most Popular</span>
                            </div>
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">Agency Plan</h3>
                                <p className="text-sm text-indigo-200/60">For management teams and high-traffic VIPs.</p>
                            </div>
                            <div className="mb-8">
                                <div className="text-5xl font-black text-white">$129<span className="text-lg text-indigo-500/60 font-medium">/mo</span></div>
                            </div>
                            <ul className="space-y-4 mb-10 flex-1">
                                <li className="flex items-center gap-3 text-sm text-indigo-100">
                                    <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    50,000 Monthly Scans
                                </li>
                                <li className="flex items-center gap-3 text-sm text-indigo-100">
                                    <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    500 Automated DMCA Notices
                                </li>
                                <li className="flex items-center gap-3 text-sm text-indigo-100">
                                    <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    15 Biometric Identity Vectors
                                </li>
                                <li className="flex items-center gap-3 text-sm text-indigo-100">
                                    <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Priority AI Legal Triage
                                </li>
                                <li className="flex items-center gap-3 text-sm text-indigo-100">
                                    <svg className="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Early Access: Dark Web Probe
                                </li>
                            </ul>
                            <Link href="/register" className="w-full py-4 text-center bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all shadow-[0_0_25px_rgba(79,70,229,0.4)]">
                                Secure Your Agency
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/10 py-12 glass-panel">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-white">Aegis<span className="text-indigo-500">Lens</span></span>
                        <span className="text-xs text-gray-500">© 2026 All Rights Reserved</span>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <Link href="/security" className="hover:text-white transition-colors">Security Disclosure</Link>
                        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                        <Link href="/how-it-works" className="hover:text-white transition-colors">Technology</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
