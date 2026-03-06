'use client';

import {useState} from 'react';
import Link from 'next/link';

// Mock evidence data
const mockMatches = [
    {
        id: 'm_1001',
        url: 'forums.anon-leak[.]net/thread/v29xx',
        date: '2 hours ago',
        type: 'Explicit Image',
        confidence: 98,
        status: 'Action Required',
        thumbnail: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=400&auto=format&fit=crop', // Stock face/person for demo
    },
    {
        id: 'm_1002',
        url: 'image-host-77[.]biz/view/a883k1',
        date: 'Yesterday',
        type: 'Deepfake Video Frame',
        confidence: 92,
        status: 'DMCA Pending',
        thumbnail: 'https://images.unsplash.com/photo-1579783900864-51c3127cdfb1?q=80&w=400&auto=format&fit=crop', // Abstract/blurred face for demo
    },
    {
        id: 'm_1003',
        url: 'tg-groups-hub[.]ru/c/9921',
        date: '3 days ago',
        type: 'Social Media Rip',
        confidence: 85,
        status: 'Resolved',
        thumbnail: 'https://images.unsplash.com/photo-1544604961-1e9411dd7b29?q=80&w=400&auto=format&fit=crop', // Another face demo
    }
];

// Reusable Evidence Card Component
function EvidenceCard({match}: {match: any}) {
    const [isBlurred, setIsBlurred] = useState(true);
    const [localStatus, setLocalStatus] = useState(match.status);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSendDMCA = () => {
        setIsSubmitting(true);
        // Simulate API delay
        setTimeout(() => {
            setIsSubmitting(false);
            setLocalStatus('DMCA Pending');
        }, 1500);
    };

    return (
        <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-6 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">

            {/* Interactive Image Container */}
            <div className="relative w-full md:w-64 h-48 shrink-0 rounded-xl overflow-hidden bg-gray-900 border border-white/10 group/image">
                <img
                    src={match.thumbnail}
                    alt="Matched Evidence"
                    className={`w-full h-full object-cover transition-all duration-500 ${isBlurred ? 'blur-xl scale-110 opacity-40' : 'blur-0 scale-100 opacity-100'}`}
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                />

                {isBlurred && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10 transition-opacity">
                        <svg className="w-8 h-8 text-rose-500 mb-2 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                        <span className="text-white font-bold text-sm tracking-widest uppercase mb-3">NSFW Evidence</span>
                        <button
                            onClick={() => setIsBlurred(false)}
                            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-semibold text-white transition-all focus:outline-none focus:ring-2 focus:ring-rose-500"
                        >
                            Click to Unblur
                        </button>
                    </div>
                )}

                {!isBlurred && <div className="absolute inset-0 bg-transparent z-10" />}

                {!isBlurred && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsBlurred(true);
                        }}
                        className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur border border-white/10 rounded-md text-[10px] uppercase font-bold text-white z-20 hover:bg-black/80 transition-colors opacity-0 group-hover/image:opacity-100 focus:outline-none"
                    >
                        Hide Frame
                    </button>
                )}
            </div>

            {/* Match Details */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider transition-colors ${localStatus === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    localStatus === 'DMCA Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                        'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                }`}>
                                {localStatus}
                            </span>
                            <span className="text-xs text-gray-500">Detected {match.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white break-all">{match.url}</h3>
                    </div>
                    <div className="text-right shrink-0">
                        <div className="text-2xl font-black text-white">{match.confidence}%</div>
                        <div className="text-xs text-gray-400 font-medium tracking-wide">MATCH SCORE</div>
                    </div>
                </div>

                <div className="mt-2 mb-4">
                    <p className="text-sm text-gray-400">
                        <span className="font-semibold text-gray-300">Classification:</span> {match.type}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xl mt-1">
                        System has identified exact biometric vector alignment with Source ID `_8f9A...c2`. Target content is flagged for unauthorized distribution and likeness infringement.
                    </p>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-white/5">
                    {localStatus === 'Action Required' ? (
                        <button
                            onClick={handleSendDMCA}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Serving Notice...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    Issue Automated DMCA
                                </>
                            )}
                        </button>
                    ) : localStatus === 'DMCA Pending' ? (
                        <button className="px-4 py-2 bg-white/5 text-gray-300 hover:text-white border border-white/10 text-sm font-bold rounded-lg transition-all flex items-center gap-2">
                            Waiting on Host Response...
                        </button>
                    ) : (
                        <button className="px-4 py-2 bg-white/5 text-emerald-400 border border-emerald-500/20 text-sm font-bold rounded-lg flex items-center gap-2 cursor-default">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            Resolution Confirmed
                        </button>
                    )}

                    <button className="px-4 py-2 text-gray-400 hover:text-white text-sm font-semibold transition-colors">
                        View Technical Logs
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function MatchesPage() {
    return (
        <>
            {/* Top Header */}
            <header className="h-20 border-b border-white/5 px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-md z-30">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Active Threat Feed</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Showing 3 high-confidence biometric matches.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-sm font-bold text-white rounded-lg hover:bg-white/10 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                        Filter Results
                    </button>
                </div>
            </header>

            {/* Feed Content */}
            <div className="p-4 sm:p-8 flex-1 overflow-x-hidden relative max-w-5xl">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-8">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <p><strong>Warning:</strong> The blurred images below may contain sexually explicit or disturbing content extracted from adult deepfake forums. Please use discretion when unblurring.</p>
                </div>

                <div className="space-y-6">
                    {mockMatches.map((match) => (
                        <EvidenceCard key={match.id} match={match} />
                    ))}
                </div>
            </div>
        </>
    )
}
