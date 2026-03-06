import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-indigo-500/30">

      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center neon-glow">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Aegis<span className="text-indigo-500">Lens</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/how-it-works" className="hover:text-white transition-colors">How it Works</Link>
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

      {/* Hero Section */}
      <main className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-indigo-500/30 text-xs font-semibold text-indigo-300 uppercase tracking-widest mb-4 mx-auto hover:bg-indigo-500/10 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Active Monitoring 24/7
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Take Back Control of <br />
            <span className="gradient-text">Your Digital Likeness.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Autonomous protection against unauthorized deepfakes and explicit content. We scan the web, match your encrypted biometric vectors, and issue automated DMCA takedowns.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold text-lg shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all active:scale-95 flex items-center justify-center gap-2">
              Start Your Free Scan
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link href="/how-it-works" className="w-full sm:w-auto px-8 py-4 glass-panel hover:bg-white/5 border border-white/10 text-white rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
              See How It Works
            </Link>
          </div>

          <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
            <div className="glass-panel p-6 border-white/10 rounded-2xl hover:bg-white/[0.02] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Automated Crawling</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Our residential proxy network continuously scans adult platforms, forums, and the deep web to find unauthorized imagery.</p>
            </div>

            <div className="glass-panel p-6 border-white/10 rounded-2xl hover:bg-white/[0.02] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">99.9% Match Accuracy</h3>
              <p className="text-sm text-gray-400 leading-relaxed">State-of-the-art vector embeddings (InsightFace) compare scraped content against your biometric profile with extreme precision.</p>
            </div>

            <div className="glass-panel p-6 border-white/10 rounded-2xl hover:bg-white/[0.02] transition-colors group">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Legal Action</h3>
              <p className="text-sm text-gray-400 leading-relaxed">When a match is found, we automatically generate and dispatch legally binding DMCA takedown notices without you lifting a finger.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 mt-20 relative z-10 glass-panel">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white">Aegis<span className="text-indigo-500">Lens</span></span>
            <span className="text-xs text-gray-500">© 2026 All Rights Reserved</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/security" className="hover:text-white transition-colors">Security</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/how-it-works" className="hover:text-white transition-colors">Technology</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
