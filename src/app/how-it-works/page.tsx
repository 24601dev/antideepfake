'use client';

import Link from 'next/link';

export default function HowItWorks() {
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
                        <Link href="/how-it-works" className="text-white transition-colors font-bold">How it Works</Link>
                        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
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

            <main className="pt-32 pb-20 relative px-6">
                <div className="max-w-4xl mx-auto space-y-24">
                    <div className="text-center space-y-6">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">The Three-Pillar <br /><span className="gradient-text">Protection Engine.</span></h1>
                        <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                            AegisLens isn't just a scanner. It's an autonomous legal shield that identifies, verifies, and nukes malicious content across the global web.
                        </p>
                    </div>

                    {/* Step 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 text-indigo-400 font-bold uppercase tracking-widest text-sm">
                                <span className="w-8 h-8 rounded-full border border-indigo-500/50 flex items-center justify-center text-xs">01</span>
                                Biometric Vectorization
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">We don't store your face. <br />We store the math.</h2>
                            <p className="text-gray-400 leading-relaxed">
                                When you create an account, AegisLens converts your likeness into a Zero-Knowledge Vector Map. This 512-dimensional mathematical fingerprint allows our AI to identify you with 99.9% accuracy while ensuring your original images are instantly flushed from our servers.
                            </p>
                        </div>
                        <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/5 to-transparent relative overflow-hidden group">
                            <div className="flex flex-col gap-4">
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[85%] group-hover:w-[95%] transition-all duration-1000"></div>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="h-12 rounded bg-white/5 animate-pulse" style={{animationDelay: `${i * 100}ms`}} />
                                    ))}
                                </div>
                                <div className="text-[10px] font-mono text-gray-500 text-center uppercase tracking-widest">Generating 512D Perceptual Hash...</div>
                            </div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                        <div className="md:order-last space-y-6">
                            <div className="inline-flex items-center gap-3 text-emerald-400 font-bold uppercase tracking-widest text-sm">
                                <span className="w-8 h-8 rounded-full border border-emerald-500/50 flex items-center justify-center text-xs">02</span>
                                Autonomous Swarm Scan
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">Invisible agents on a <br />24/7 global patrol.</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Our proprietary residential proxy network bypasses anti-bot protections like Cloudflare and Datadome. Hundreds of AI agents scan forums, image boards, and Telegram channels, comparing every new image against your encrypted vector map in real-time.
                            </p>
                        </div>
                        <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/5 to-transparent min-h-[300px] flex items-center justify-center">
                            <div className="relative w-full h-full flex items-center justify-center">
                                <div className="absolute w-32 h-32 border border-emerald-500/30 rounded-full animate-ping" />
                                <div className="absolute w-48 h-48 border border-emerald-500/20 rounded-full animate-ping [animation-delay:400ms]" />
                                <svg className="w-16 h-16 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H10a1 1 0 01-1-1v-4z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 text-rose-400 font-bold uppercase tracking-widest text-sm">
                                <span className="w-8 h-8 rounded-full border border-rose-500/50 flex items-center justify-center text-xs">03</span>
                                Automated Enforcement
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">One-button nuke for <br />any malicious threat.</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Once a match is verified by our AI agents, a legally binding DMCA takedown notice is prepared. For 98%+ confidence matches, AegisLens can automatically dispatch these to host providers, ensuring content is removed before it can spread.
                            </p>
                        </div>
                        <div className="glass-panel p-8 rounded-2xl border border-rose-500/30 bg-rose-500/5 flex flex-col gap-4">
                            <div className="flex items-center justify-between text-xs font-bold text-rose-300 uppercase">
                                <span>Threat Detected</span>
                                <span>Status: Issuing DMCA</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 w-[100%] transition-all duration-[3s]" />
                            </div>
                            <div className="p-4 bg-black/40 rounded border border-white/5 text-[10px] font-mono text-gray-500">
                                Dispatching to: host-matrix-01.de <br />
                                Submitting notarized evidence package... <br />
                                Confirmation #728491-DMCA
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 text-center">
                        <Link href="/register" className="inline-flex px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full text-xl shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all active:scale-95">
                            Start Your Protection Now
                        </Link>
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/10 py-12 glass-panel">
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
