import Link from 'next/link';

export function MobileHeader() {
    return (
        <header className="md:hidden h-16 border-b border-white/5 bg-[#0a0a0a]/90 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-50">
            <Link href="/" className="font-bold text-lg tracking-tight text-white flex gap-2 items-center">
                <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center neon-glow">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                Aegis<span className="text-indigo-500">Lens</span>
            </Link>
            <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </header>
    );
}
