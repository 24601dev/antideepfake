'use client';
import { getStorageKey } from '@/utils/storage';

import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';
import {useState, useEffect} from 'react';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [autoDMCA, setAutoDMCA] = useState(false);
    const [unblurAll, setUnblurAll] = useState(false);

    useEffect(() => {
        setUnblurAll(localStorage.getItem(getStorageKey('aegis_unblur_all')) === 'true');
    }, []);

    const toggleUnblurAll = () => {
        const newValue = !unblurAll;
        setUnblurAll(newValue);
        localStorage.setItem(getStorageKey('aegis_unblur_all'), String(newValue));
        // Dispatch event so other components can react instantly in the same tab
        window.dispatchEvent(new Event('aegis_settings_changed'));
    };

    const handleSignOut = () => {
        // Clear the dev backdoor cookie
        document.cookie = "dev_backdoor=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        router.push('/');
    };

    const [matchesCount, setMatchesCount] = useState<number>(0);

    useEffect(() => {
        // Run once on mount
        const saved = localStorage.getItem(getStorageKey('aegis_scan_results'));
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed && parsed.length > 0) {
                    setMatchesCount(parsed.length);
                }
            } catch (e) {}
        }

        // Listen for standard storage events (if changed in another tab)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === getStorageKey('aegis_scan_results') && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    setMatchesCount(parsed.length);
                } catch (e) {}
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Periodically poll for changes within the same tab, since
        // standard storage events don't trigger when modified by the same window.
        const pollInterval = setInterval(() => {
            const raw = localStorage.getItem(getStorageKey('aegis_scan_results'));
            if (raw) {
                try {
                    const p = JSON.parse(raw);
                    if (p.length !== matchesCount) {
                        setMatchesCount(p.length);
                    }
                } catch (e) {}
            }
        }, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(pollInterval);
        };
    }, [matchesCount]);

    const links = [
        {
            name: 'Overview',
            href: '/dashboard',
            icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
            exact: true
        },
        {
            name: 'Detected Matches',
            href: '/dashboard/matches',
            icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
            badge: matchesCount > 0 ? `${matchesCount} New` : null
        },
        {
            name: 'Threat Scanner',
            href: '/dashboard/scanner',
            icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
        },
        {
            name: 'Legal Takedowns',
            href: '/dashboard/takedowns',
            icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        },
        {
            name: 'Biometric Sources',
            href: '/dashboard/biometrics',
            icon: <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
        }
    ];

    return (
        <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] hidden md:flex flex-col justify-between h-screen sticky top-0 shrink-0 z-40">
            <div>
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <Link href="/dashboard" className="font-bold text-xl tracking-tight text-white flex gap-2 items-center">
                        <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center neon-glow">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        Aegis<span className="text-indigo-500">Lens</span>
                    </Link>
                </div>
                <nav className="p-4 space-y-2">
                    {links.map((link) => {
                        const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                                    ? 'bg-indigo-500/10 text-indigo-400'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.icon}
                                {link.name}
                                {link.badge && (
                                    <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="p-4 border-t border-white/5 relative">
                {/* Settings Popup Menu */}
                {isSettingsOpen && (
                    <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                        <div className="p-4 border-b border-white/5">
                            <h4 className="text-sm font-bold text-white mb-1">Account Settings</h4>
                            <p className="text-xs text-gray-400">Manage your preferences</p>
                        </div>

                        <div className="p-2 space-y-1">
                            <div className="px-3 py-2 flex items-center justify-between hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => setAutoDMCA(!autoDMCA)}>
                                <div>
                                    <div className="text-sm font-medium text-white">Auto-Submit DMCA</div>
                                    <div className="text-[10px] text-gray-500 mt-0.5">Applies to 98%+ confidence matches</div>
                                </div>
                                {/* Toggle switch */}
                                <div className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${autoDMCA ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                                    <div className={`w-3 h-3 bg-white rounded-full transition-transform shadow-sm ${autoDMCA ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </div>
                            </div>

                            <div className="px-3 py-2 flex items-center justify-between hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={toggleUnblurAll}>
                                <div>
                                    <div className="text-sm font-medium text-white">Unblur All Evidence</div>
                                    <div className="text-[10px] text-gray-500 mt-0.5">Show explicit thumbnails by default</div>
                                </div>
                                {/* Toggle switch */}
                                <div className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${unblurAll ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                                    <div className={`w-3 h-3 bg-white rounded-full transition-transform shadow-sm ${unblurAll ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </div>
                            </div>

                            <Link href="/dashboard/billing" className="px-3 py-2 flex items-center gap-3 hover:bg-white/5 rounded-lg transition-colors text-sm text-gray-300">
                                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                Billing & Plans
                            </Link>

                            <button
                                onClick={handleSignOut}
                                className="w-full px-3 py-2 flex items-center gap-3 hover:bg-rose-500/10 rounded-lg transition-colors text-sm text-rose-400"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] bg-white/[0.02] border border-white/5 transition-colors text-left"
                >
                    <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold tracking-tight">VIP</div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white truncate">Test Account</div>
                        <div className="text-xs text-indigo-400 font-medium truncate">Pro Plan</div>
                    </div>
                    <svg className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${isSettingsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
            </div>
        </aside>
    );
}
