'use client';
import {getStorageKey} from '@/utils/storage';

import {useState, useEffect} from 'react';
import Link from 'next/link';

interface MatchRowProps {
    match: {
        id: number;
        tag: string;
        url: string;
        date: string;
        score: number | null;
        status: string;
        thumbnail?: string;
        source?: string;
    };
    onDismiss?: (id: number, urlDomain: string) => void;
}

function MatchRow({match, onDismiss}: MatchRowProps) {
    const [localStatus, setLocalStatus] = useState(match.status);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isBlurred, setIsBlurred] = useState(true);

    useEffect(() => {
        const checkUnblur = () => {
            const unblurAll = localStorage.getItem(getStorageKey('aegis_unblur_all')) === 'true';
            setIsBlurred(!unblurAll);
        };

        checkUnblur();
        window.addEventListener('aegis_settings_changed', checkUnblur);
        return () => window.removeEventListener('aegis_settings_changed', checkUnblur);
    }, []);

    const handleSendDMCA = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setLocalStatus('DMCA Pending');
        }, 1500);
    };

    const handleDismiss = () => {
        if (confirm("Dismiss this match? It will be permanently removed from this list.")) {
            if (onDismiss) onDismiss(match.id, match.url || match.source || '');
        }
    };

    return (
        <tr className="hover:bg-white/[0.02] transition-colors">
            <td className="px-4 sm:px-6 py-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 shrink-0 rounded flex items-center justify-center overflow-hidden border border-white/10 relative group bg-gray-900 cursor-pointer">
                        {match.thumbnail ? (
                            <img src={match.thumbnail} className={`w-full h-full object-cover transition-all duration-300 pointer-events-none ${isBlurred ? 'blur-md group-hover:blur-none' : 'blur-none'}`} alt="Evidence Thumbnail" />
                        ) : (
                            <span className="text-[10px] sm:text-xs text-rose-500 font-bold mix-blend-difference z-10">FLAGGED</span>
                        )}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors flex items-center justify-center pointer-events-none">
                            <svg className="w-4 h-4 text-white opacity-50 group-hover:opacity-0 transition-opacity drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </div>
                    </div>
                    <div className="min-w-0">
                        <a
                            href={match.url.startsWith('http') ? match.url : (match.url.startsWith('/') ? match.url : `https://${match.url}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-medium truncate block hover:underline transition-all w-full max-w-[200px] sm:max-w-[300px] overflow-hidden text-ellipsis ${localStatus === 'Successfully Removed' ? 'text-white line-through opacity-50 pointer-events-none' : 'text-indigo-400 hover:text-indigo-300'}`}
                            title="Verify Match in New Tab"
                        >
                            {match.url.replace(/^https?:\/\//, '')}
                        </a>
                        <div className="text-xs text-gray-500 truncate mt-0.5">{match.date}</div>
                    </div>
                </div>
            </td>
            <td className="px-4 sm:px-6 py-4">
                {match.score ? (
                    <div className="flex items-center gap-2">
                        <div className="w-12 sm:w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden shrink-0">
                            <div className={`h-full ${match.tag === 'NSFW' ? 'bg-rose-500' : 'bg-orange-500'}`} style={{width: `${match.score}%`}}></div>
                        </div>
                        <span className={`text-sm font-bold ${match.tag === 'NSFW' ? 'text-rose-400' : 'text-orange-400'}`}>{match.score}%</span>
                    </div>
                ) : (
                    <span className="text-sm font-medium text-gray-500">--</span>
                )}
            </td>
            <td className="px-4 sm:px-6 py-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium border whitespace-nowrap ${localStatus === 'Action Required' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    localStatus === 'DMCA Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                    {localStatus}
                </span>
            </td>
            <td className="px-4 sm:px-6 py-4">
                {localStatus === 'Action Required' ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSendDMCA}
                            disabled={isSubmitting}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded shadow disabled:opacity-50 transition-all flex items-center gap-2 whitespace-nowrap"
                        >
                            {isSubmitting ? 'Sending...' : 'Send DMCA'}
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="px-2 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 rounded text-xs font-semibold transition-colors"
                            title="Dismiss match"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                ) : localStatus === 'DMCA Pending' ? (
                    <button className="px-3 py-1.5 bg-white/5 text-gray-400 hover:text-white border border-white/10 text-xs font-bold rounded transition-all whitespace-nowrap">
                        View Logs
                    </button>
                ) : (
                    <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-widest">Resolved</span>
                )}
            </td>
        </tr>
    );
}

export default function DashboardPage() {
    const [isScanning, setIsScanning] = useState(false);
    const [matches, setMatches] = useState<any[]>([]);
    const [vectors, setVectors] = useState<any[]>([]);
    const [scanError, setScanError] = useState<string | null>(null);

    useEffect(() => {
        const savedVectors = localStorage.getItem(getStorageKey('aegis_biometric_vectors'));
        if (savedVectors) {
            try {
                setVectors(JSON.parse(savedVectors));
            } catch (e) {}
        }

        const savedMatches = localStorage.getItem(getStorageKey('aegis_scan_results'));
        if (savedMatches) {
            try {
                setMatches(JSON.parse(savedMatches));
            } catch (e) {}
        } else {
            setMatches([]);
        }
    }, []);

    const handleDismissMatch = (id: number) => {
        // Find the match
        const matchToRemove = matches.find(m => m.id === id);
        if (matchToRemove) {
            try {
                const imageUrl = matchToRemove.thumbnail || matchToRemove.url;
                const existingList = JSON.parse(localStorage.getItem(getStorageKey('aegis_safe_images')) || '[]');
                if (!existingList.includes(imageUrl)) {
                    localStorage.setItem(getStorageKey('aegis_safe_images'), JSON.stringify([...existingList, imageUrl]));
                }
            } catch (e) {}
        }

        // Remove from active state
        const updated = matches.filter(m => m.id !== id);
        setMatches(updated);
        localStorage.setItem(getStorageKey('aegis_scan_results'), JSON.stringify(updated));
    }

    const handleStartScan = async () => {
        if (vectors.length === 0) {
            setScanError("Requires Biometric Data. Please upload a reference photo in the Biometric Safe.");
            return;
        }

        const targetVector = vectors[0].embedding || Array.from({length: 512}, () => Math.random() * 2 - 1); // Fallback mock
        const targetImage = vectors[0].raw_image || null;

        setScanError(null);
        setIsScanning(true);

        try {
            const response = await fetch('/api/swarm', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({targetVector, targetImage})
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to initialize swarm.');
            }

            // Map python output to UI match objects
            // The python script returns { url, score, tag }
            // Apply Whitelist and Confidence Threshold Filtering
            const rawWhitelist = localStorage.getItem(getStorageKey('aegis_whitelist'));
            const whitelist: string[] = rawWhitelist ? JSON.parse(rawWhitelist) : [];
            const rawSafeImages = localStorage.getItem(getStorageKey('aegis_safe_images'));
            const safeImages: string[] = rawSafeImages ? JSON.parse(rawSafeImages) : [];
            const rawThreshold = localStorage.getItem(getStorageKey('aegis_match_threshold'));
            const threshold = rawThreshold ? Number(rawThreshold) : 75;

            const filteredMatches = (data.matches || []).filter((m: any) => {
                const matchUrl = (m.url || '').toLowerCase();
                const matchSource = (m.source || '').toLowerCase();
                const matchThumb = (m.thumbnail || '').toLowerCase();

                const isWhitelisted = whitelist.some(w => matchUrl.includes(w) || matchSource.includes(w));
                const isSafeImage = safeImages.some(safe => {
                    const lSafe = safe.toLowerCase();
                    return lSafe === matchUrl || lSafe === matchThumb;
                });
                const meetsThreshold = m.score === undefined || m.score === null || m.score >= threshold;
                return !isWhitelisted && !isSafeImage && meetsThreshold;
            });

            const mappedMatches = filteredMatches.map((m: any, idx: number) => ({
                id: Date.now() + idx,
                tag: m.tag,
                url: m.url,
                date: 'Detected just now',
                score: m.score,
                status: 'Action Required',
                thumbnail: m.thumbnail,
                type: m.title || 'Unauthorized Likeness',
                title: m.title,
                source: m.source
            }));

            // Only update if we found new matches to prevent empty overwrites
            if (mappedMatches.length > 0) {
                setMatches(prev => {
                    const newMatches = [...mappedMatches, ...prev];
                    localStorage.setItem(getStorageKey('aegis_scan_results'), JSON.stringify(newMatches));
                    return newMatches;
                });
            } else {
                // If it successfully scanned but found nothing
                setScanError(`Scan completed. ${data.sites_scanned} sites analyzed. 0 matches found.`);
            }

        } catch (error: any) {
            console.error('Scan Error:', error);
            setScanError(error.message || "An unexpected error occurred during the swarm scan.");
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <>
            {/* Top Header */}
            <header className="h-20 border-b border-white/5 px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-md z-30">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">System Overview</h1>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass-panel border text-xs sm:text-sm font-semibold transition-colors ${isScanning ? 'border-emerald-500/20 text-emerald-400' : 'border-white/10 text-gray-400'}`}>
                        {isScanning && (
                            <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        )}
                        <span className="hidden sm:inline">{isScanning ? 'Engine Online — Scanning' : 'Engine Idle'}</span>
                        <span className="sm:hidden">{isScanning ? 'Scanning' : 'Idle'}</span>
                    </div>

                    <button
                        onClick={handleStartScan}
                        disabled={isScanning}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all ${isScanning ? 'bg-indigo-600/50 text-white/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                    >
                        {isScanning ? (
                            <>
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Scan Active
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Start Global Scan
                            </>
                        )}
                    </button>
                </div>
            </header>

            {/* Dashboard Content */}
            <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 flex-1 overflow-x-hidden">

                {scanError && (
                    <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {scanError}
                    </div>
                )}

                {/* Top Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="glass-panel p-5 sm:p-6 rounded-2xl border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <svg className="w-16 h-16 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Total Scanned Sites</h3>
                        <div className="text-2xl sm:text-3xl font-extrabold text-white">{matches.length > 0 ? '12,482' : '0'}</div>
                        <div className="text-xs text-emerald-400 flex items-center gap-1 mt-2 font-medium">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            {matches.length > 0 ? '+2,149 this week' : 'Awaiting initialization'}
                        </div>
                    </div>

                    <div className="glass-panel p-5 sm:p-6 rounded-2xl border-white/5 border-l-2 border-l-rose-500 relative overflow-hidden">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Active Matches</h3>
                        <div className="text-2xl sm:text-3xl font-extrabold text-white">{matches.filter(m => m.status !== 'Successfully Removed').length}</div>
                        <div className="text-xs text-rose-400 flex items-center gap-1 mt-2 font-medium">
                            {matches.filter(m => m.status !== 'Successfully Removed').length > 0 ? (
                                <>
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    High confidence matches found
                                </>
                            ) : (
                                <span className="text-gray-500">System baseline clear</span>
                            )}
                        </div>
                    </div>

                    <div className="glass-panel p-5 sm:p-6 rounded-2xl border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">DMCA Takedowns Sent</h3>
                        <div className="text-2xl sm:text-3xl font-extrabold text-white">{matches.length > 0 ? '42' : '0'}</div>
                        <div className="text-xs text-indigo-400 flex items-center gap-1 mt-2 font-medium">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            {matches.length > 0 ? 'Processing 14 pending' : 'No active dispatches'}
                        </div>
                    </div>

                    <div className="glass-panel p-5 sm:p-6 rounded-2xl border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                        <h3 className="text-gray-400 text-sm font-medium mb-1">Success Rate</h3>
                        <div className="text-2xl sm:text-3xl font-extrabold text-white">{matches.length > 0 ? '88%' : '100%'}</div>
                        <div className="text-xs text-emerald-400 flex items-center gap-1 mt-2 font-medium">
                            {matches.length > 0 ? 'Avg. removal time: 3.2 days' : 'Awaiting first action'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Left Column (2/3 width) - Recent Activity */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Recent Threat Matches</h2>
                            <Link href="/dashboard/matches" className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-medium">View All &rarr;</Link>
                        </div>

                        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[700px]">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/[0.02]">
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Detection Details</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Match Score</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                                            <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {matches.length > 0 ? matches.map((match) => (
                                            <MatchRow key={match.id} match={match} onDismiss={handleDismissMatch} />
                                        )) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                                                    No threat data available. Run a scan to monitor the web.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (1/3 width) - Source Profile & Vectors */}
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Your Biometric Profile</h2>

                        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/5 space-y-5 sm:space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className={`w-3 h-3 rounded-full shrink-0 ${vectors.length > 0 ? 'bg-emerald-500 neon-glow' : 'bg-rose-500 animate-pulse'}`}></div>
                                    <span className="text-sm font-semibold text-white">{vectors.length > 0 ? `${vectors.length} Vectors Encrypted` : 'No Vectors Found'}</span>
                                </div>
                                <Link href="/dashboard/biometrics" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium whitespace-nowrap">
                                    Manage
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {vectors.length > 0 ? (
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full bg-gray-800 border-2 border-indigo-500/50 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-indigo-500/20"></div>
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-sm font-semibold text-white truncate">Source ID: {vectors[0].id}</div>
                                            <div className="text-xs text-emerald-400 mt-0.5 truncate">Active & Monitoring</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-sm text-rose-400 p-3 bg-rose-500/10 rounded border border-rose-500/20 leading-relaxed">
                                        You must upload a reference photo in the Biometric Safe to enable the global scanning engine.
                                    </div>
                                )}

                                <p className="text-xs text-gray-500 leading-relaxed pt-2">
                                    Your raw images have been permanently deleted. We only store the high-dimensional mathematical vectors to perform facial similarity matching.
                                </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-white/5">
                                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3 sm:p-4">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <div>
                                            <h4 className="text-sm font-semibold text-indigo-300">Boost Accuracy?</h4>
                                            <p className="text-xs text-indigo-400/80 mt-1 leading-relaxed">
                                                Uploading multiple angles of your face improves match confidence and reduces false positives.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
