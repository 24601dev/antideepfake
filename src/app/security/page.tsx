'use client';

import Link from 'next/link';

export default function SecurityPage() {
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
                        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                        <Link href="/security" className="text-white transition-colors font-bold">Security</Link>
                    </nav>
                    <div className="flex items-center gap-4 text-sm font-semibold">
                        <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Log in</Link>
                        <Link href="/register" className="bg-white text-black px-5 py-2.5 rounded-full hover:bg-gray-200 transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                            Get Protected
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4 mb-20 text-center md:text-left">
                        <div className="inline-flex px-3 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em]">Security Protocol v2.4</div>
                        <h1 className="text-5xl font-black text-white tracking-tight">Security by <span className="gradient-text">Architecture.</span></h1>
                        <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                            AegisLens is built on the principle that if we don't have your data, it can't be stolen. We've engineered the world's first zero-knowledge biometric protection network.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">Zero-Knowledge Mapping</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Your source images are processed in volatile memory. We extract a 512-dimensional mathematical hash (Vector Map) and immediately purge the source file. We never store original photos of our clients.
                            </p>
                        </div>

                        <div className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">Encrypted Takedowns</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Legal notices are generated as transient PDF streams. Personal data is injected at the moment of dispatch and encrypted in transit (TLS 1.3), ensuring host providers only receive what's legally necessary.
                            </p>
                        </div>
                    </div>

                    <div className="glass-panel p-10 rounded-3xl border border-white/5 bg-white/[0.01] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2px h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                        <h2 className="text-2xl font-bold text-white mb-6">Our Commitment</h2>
                        <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
                            <p>
                                AegisLens operates under strict **Data Isolation Protocols**. Our web-scanning swarm and our biometric matching engine sit in VPC-isolated environments with zero cross-talk unless a perceptual hash collision is detected.
                            </p>
                            <p>
                                We undergo bi-monthly independent security audits and maintain a public Bug Bounty program to ensure our "Secure Vault" remains the safest place for your digital likeness.
                            </p>
                            <div className="pt-4 flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-white font-bold text-lg">ISO 27001</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500">Compliance</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-white font-bold text-lg">GDPR</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500">Certified</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-white font-bold text-lg">AES-256</div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500">Encryption</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/10 py-12 glass-panel mt-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-white">Aegis<span className="text-indigo-500">Lens</span></span>
                        <span className="text-xs text-gray-500">© 2026 All Rights Reserved</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
