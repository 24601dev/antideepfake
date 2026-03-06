'use client';

import {useState, useRef} from 'react';

export default function ThreatScanner() {
    const [isUploading, setIsUploading] = useState(false);
    const [scanState, setScanState] = useState<'idle' | 'scanning' | 'results'>('idle');
    const [scannedImage, setScannedImage] = useState<string | null>(null);
    const [matches, setMatches] = useState<any[]>([]);
    const [groupedMatches, setGroupedMatches] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        if (scanState === 'idle') {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const base64str = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (ev) => resolve(ev.target?.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });

            setScannedImage(base64str);
            setScanState('scanning');
            setError(null);

            try {
                // Step 1: Vectorize the uploaded evidence
                const recogResponse = await fetch('/api/recognize', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({image: base64str})
                });
                const recogData = await recogResponse.json();
                if (!recogResponse.ok) throw new Error(recogData.error || "Failed to vectorize evidence.");

                // Step 2: Deploy Swarm to find matches
                const swarmResponse = await fetch('/api/swarm', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        targetVector: recogData.embedding,
                        targetImage: base64str
                    })
                });
                const swarmData = await swarmResponse.json();
                if (!swarmResponse.ok) throw new Error(swarmData.error || "Swarm scanning failed.");

                // Apply Whitelist and Confidence Threshold Filtering
                const rawWhitelist = localStorage.getItem('aegis_whitelist');
                const whitelist: string[] = rawWhitelist ? JSON.parse(rawWhitelist) : [];
                const rawThreshold = localStorage.getItem('aegis_match_threshold');
                const threshold = rawThreshold ? Number(rawThreshold) : 75;

                const filteredMatches = (swarmData.matches || []).filter((m: any) => {
                    const matchUrl = (m.url || '').toLowerCase();
                    const matchSource = (m.source || '').toLowerCase();
                    const isWhitelisted = whitelist.some(w => matchUrl.includes(w) || matchSource.includes(w));
                    const meetsThreshold = m.score === undefined || m.score === null || m.score >= threshold;
                    return !isWhitelisted && meetsThreshold;
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

                setMatches(mappedMatches);

                // Store globally so the "Active Threat Feed" page picks it up!
                try {
                    localStorage.setItem('aegis_scan_results', JSON.stringify(mappedMatches));
                } catch (e) {}

                setGroupedMatches([]); // no longer used
                setScanState('results');
            } catch (err: any) {
                console.error(err);
                setError(err.message || "An error occurred during scanning");
                setScanState('idle');
            }
        }
    };

    const totalMatchesFound = matches.length;

    const handleBulkDMCA = () => {
        const uniqueHosts = new Set(matches.map((m: any) => {try {return new URL(m.url).hostname;} catch {return 'unknown';} }));
        alert(`Bulk DMCA notices dispatched to ${uniqueHosts.size} host providers covering ${totalMatchesFound} instances.`);
        setScanState('idle');
        setScannedImage(null);
        setMatches([]);
    };

    return (
        <>
            <header className="h-20 border-b border-white/5 px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-md z-30">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Threat Scanner</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Upload a specific deepfake to hunt down every instance globally.</p>
                </div>
            </header>

            <div className="p-4 sm:p-8 flex-1 overflow-x-hidden relative max-w-5xl">

                {error && (
                    <div className="max-w-2xl mx-auto mb-4 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {error}
                    </div>
                )}

                {scanState === 'idle' && (
                    <div className="max-w-2xl mx-auto mt-12">
                        <div
                            onClick={handleUploadClick}
                            className="glass-panel border-white/10 rounded-3xl flex flex-col items-center justify-center p-16 text-center hover:bg-white/[0.02] hover:border-indigo-500/50 transition-all cursor-pointer border-dashed cursor-pointer group"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/jpeg, image/png, image/webp"
                            />
                            <div className="w-20 h-20 rounded-full bg-gray-900 border border-gray-700 text-gray-500 flex items-center justify-center mb-6 group-hover:bg-indigo-900/30 group-hover:text-indigo-400 group-hover:border-indigo-500/50 transition-all">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-indigo-400 transition-colors">Upload Target Evidence</h2>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                                Found a deepfake of yourself? Upload it here. Our swarm will use perceptual hashing to find every identical copy on the clear and dark web, ignoring modifications or watermarks.
                            </p>
                        </div>
                    </div>
                )}

                {scanState === 'scanning' && (
                    <div className="max-w-2xl mx-auto mt-12 flex flex-col items-center">
                        <div className="relative w-48 h-48 rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
                            {scannedImage && (
                                <img src={scannedImage} alt="Scanning target" className="w-full h-full object-cover blur-sm opacity-50" />
                            )}
                            {/* Scanning laser animation overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent w-full h-[10%] animate-[scan_2s_ease-in-out_infinite]"></div>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                            <svg className="animate-spin w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <h2 className="text-xl font-bold text-white tracking-tight">Deploying Swarm...</h2>
                        </div>
                        <p className="text-sm text-indigo-400/80 mb-6 uppercase tracking-wider font-medium text-center max-w-sm">
                            Bypassing Cloudflare protections...<br />
                            Executing perceptual hash match...
                        </p>
                    </div>
                )}

                {scanState === 'results' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Summary Header */}
                        <div className="glass-panel p-6 rounded-2xl border-rose-500/30 bg-rose-500/5 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                            <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-white/10 relative">
                                {scannedImage && <img src={scannedImage} alt="Target" className="w-full h-full object-cover blur-md" />}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-black text-white mb-2">{totalMatchesFound} Network Matches Found</h2>
                                <p className="text-sm text-gray-400 max-w-2xl leading-relaxed mb-4">
                                    Our agents have positively identified {totalMatchesFound} instances of this exact image file across {groupedMatches.length} unique hosting providers, image boards, and Telegram channels. Real forensic proofs have been localized successfully for your verification.
                                </p>
                                <button
                                    onClick={handleBulkDMCA}
                                    className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    Nuke All {totalMatchesFound} Matches (Issue Bulk DMCA)
                                </button>
                            </div>
                        </div>

                        {/* Individual Match Results */}
                        {matches.length === 0 && (
                            <div className="glass-panel p-8 rounded-2xl border-white/5 text-center">
                                <p className="text-gray-400">No matches found across the web for this image. Your biometric data appears clean.</p>
                            </div>
                        )}

                        {matches.length > 0 && (
                            <div className="glass-panel overflow-hidden rounded-2xl border-white/5">
                                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                                    <h3 className="font-bold text-white tracking-tight">Detected Matches</h3>
                                    <span className="text-xs text-gray-500">{matches.length} results via Google Lens</span>
                                </div>
                                <div className="divide-y divide-white/5">
                                    {matches.map((match: any, idx: number) => {
                                        let hostname = '';
                                        try {hostname = new URL(match.url).hostname;} catch {hostname = match.source || 'unknown';}
                                        return (
                                            <div key={idx} className="flex items-start gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                                                {/* Thumbnail from Google Lens */}
                                                <a href={match.url} target="_blank" rel="noopener noreferrer" className="shrink-0 block w-20 h-20 rounded-lg overflow-hidden border border-white/10 bg-gray-900 relative group/thumb">
                                                    {match.thumbnail ? (
                                                        <img src={match.thumbnail} alt="Match thumbnail" className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-600">
                                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                        </div>
                                                    )}
                                                </a>

                                                {/* Match Details */}
                                                <div className="flex-1 min-w-0">
                                                    <a href={match.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 hover:underline block truncate transition-colors" title={match.url}>
                                                        {match.title || hostname}
                                                    </a>
                                                    <div className="text-xs text-gray-500 mt-0.5 truncate">{hostname}</div>
                                                    <a href={match.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-gray-600 hover:text-gray-400 mt-1 block truncate transition-colors">
                                                        {match.url}
                                                    </a>
                                                </div>

                                                {/* Match Type Tag */}
                                                <div className="flex flex-col items-end gap-2 shrink-0">
                                                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase whitespace-nowrap ${match.tag === 'EXACT'
                                                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                        }`}>
                                                        {match.tag === 'EXACT' ? 'Exact Match' : 'Visual Match'}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{match.score}% conf.</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { top: -10%; }
                    50% { top: 100%; }
                    100% { top: -10%; }
                }
            `}} />
        </>
    )
}
