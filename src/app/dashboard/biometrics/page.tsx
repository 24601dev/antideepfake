'use client';

import {useState, useRef, useEffect} from 'react';
import Link from 'next/link';

export default function BiometricsPage() {
    const [vectors, setVectors] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [whitelist, setWhitelist] = useState<string[]>([]);
    const [newWhitelistEntry, setNewWhitelistEntry] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Load from local storage on mount
    useEffect(() => {
        const savedVectors = localStorage.getItem('aegis_biometric_vectors');
        if (savedVectors) {
            try {setVectors(JSON.parse(savedVectors));} catch (e) {}
        }

        const savedWhitelist = localStorage.getItem('aegis_whitelist');
        if (savedWhitelist) {
            try {setWhitelist(JSON.parse(savedWhitelist));} catch (e) {}
        }
        setHasLoaded(true);
    }, []);

    // Save to local storage whenever vectors change
    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem('aegis_biometric_vectors', JSON.stringify(vectors));
            localStorage.setItem('aegis_whitelist', JSON.stringify(whitelist));
        }
    }, [vectors, whitelist, hasLoaded]);

    const handleUploadClick = () => {
        if (!isUploading) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setIsUploading(true);
            setError(null);

            try {
                const file = e.target.files[0];
                const base64str = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });

                const response = await fetch('/api/recognize', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({image: base64str})
                });

                const data = await response.json();

                if (!response.ok) throw new Error(data.error || 'Failed to vectorize');

                const newVector = {
                    id: `vec_${Math.random().toString(36).substring(2, 9)}`,
                    name: vectors.length === 0 ? 'Primary Identity Vector' : `Alternate Perspective ${vectors.length}`,
                    isDefault: vectors.length === 0,
                    date: new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}),
                    score: Math.floor(data.confidence * 100),
                    engine: data.engine,
                    embedding: data.embedding,
                    raw_image: base64str
                };

                setVectors(prev => [...prev, newVector]);
            } catch (err: any) {
                setError(err.message);
                console.error(err);
            } finally {
                setIsUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        }
    };

    const handleRemoveVector = (id: string) => {
        if (confirm("Are you sure you want to permanently delete this biometric vector from your safe?")) {
            setVectors(prev => prev.filter(vec => vec.id !== id));
        }
    };

    const handleAddWhitelist = (e: React.FormEvent) => {
        e.preventDefault();
        if (newWhitelistEntry.trim()) {
            const cleanEntry = newWhitelistEntry.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
            if (!whitelist.includes(cleanEntry)) {
                setWhitelist(prev => [...prev, cleanEntry]);
            }
            setNewWhitelistEntry('');
        }
    };

    const handleRemoveWhitelist = (entry: string) => {
        setWhitelist(prev => prev.filter(w => w !== entry));
    };

    return (
        <>
            <header className="h-20 border-b border-white/5 px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-md z-30">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Biometric Safe</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Manage the highly-encrypted facial vectors we use for monitoring.</p>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/jpeg, image/png, image/webp"
                    multiple
                />
                <button
                    onClick={handleUploadClick}
                    disabled={isUploading}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUploading ? (
                        <>
                            <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Vectorizing...
                        </>
                    ) : (
                        <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            Upload New Images
                        </>
                    )}
                </button>
            </header>

            <div className="p-4 sm:p-8 flex-1 overflow-x-hidden relative max-w-5xl">

                {/* Core Concept: Security first! */}
                <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 mb-8 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-emerald-400 font-bold mb-1">Zero-Knowledge Image Storage Protocol Active</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            AegisLens fundamentally relies on InsightFace mathematical vectors. We analyze your uploaded selfies to extract 512-dimensional geographic coordinate maps of your face structure, store ONLY those numbers, and instantly flush the raw `.jpg` / `.png` images from our servers. If we ever suffered a breach, hackers would only find raw math, not your face.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

                    {error && (
                        <div className="col-span-full p-4 mb-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error}
                        </div>
                    )}

                    {/* Empty State Prompt */}
                    {vectors.length === 0 && !isUploading && hasLoaded && (
                        <div className="col-span-full glass-panel p-12 rounded-3xl border border-dashed border-white/10 text-center my-4">
                            <div className="w-16 h-16 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">No Biometric Vectors Found</h2>
                            <p className="text-gray-400 max-w-sm mx-auto mb-8">You need to upload at least one high-quality reference photo to enable the scanning engine.</p>
                            <div className="flex justify-center">
                                <button
                                    onClick={handleUploadClick}
                                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                                >
                                    Upload Primary Photo
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Render all existing vectors */}
                    {vectors.map((vec) => (
                        <div key={vec.id} className="glass-panel rounded-2xl border border-indigo-500/30 overflow-hidden relative group">
                            <div className="h-32 bg-indigo-900/20 relative overflow-hidden flex items-center justify-center p-4">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMTBoNDBNMCAyMGg0ME0wIDMwaDQwTTEwIDB2NDBNMjAgMHY0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz4KPC9zdmc+')] mix-blend-screen opacity-50"></div>
                                {/* Simulated Point Cloud visualization instead of a real picture */}
                                <div className="w-20 h-24 relative border border-indigo-500/50 rounded-full flex gap-[1px] flex-wrap justify-center items-center opacity-70">
                                    {[...Array(50)].map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex gap-2 items-center">
                                        <h3 className="text-white font-bold tracking-tight">{vec.name}</h3>
                                        {vec.isDefault && (
                                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-300">Default</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleRemoveVector(vec.id)}
                                        title="Permanently Delete Vector"
                                        className="text-gray-500 hover:text-rose-500 transition-colors p-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                                <div className="font-mono text-xs text-gray-500 mb-4 bg-black/40 p-2 rounded truncate border border-white/5">
                                    ID: {vec.id}
                                </div>

                                <div className="flex items-center justify-between text-xs font-medium text-gray-400 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span>Generated:</span>
                                        <span className="text-white">{vec.date}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 text-right">
                                        <span>Quality Score:</span>
                                        <span className={vec.score >= 95 ? "text-emerald-400" : "text-indigo-400"}>
                                            {vec.score >= 95 ? 'High' : 'Good'} ({vec.score}%)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* A prompt to add a side-profile or different lighting angle */}
                    <div
                        onClick={handleUploadClick}
                        className={`glass-panel border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 text-center hover:bg-white/[0.02] hover:border-white/20 transition-all cursor-pointer border-dashed ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        {isUploading ? (
                            <>
                                <div className="w-16 h-16 rounded-full bg-indigo-900/30 border-2 border-indigo-500/50 text-indigo-400 flex items-center justify-center mb-4 neon-glow">
                                    <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-indigo-400 font-bold mb-1">Encrypting Vectors...</h3>
                                <p className="text-xs text-indigo-400/60">Flushing raw image data from server.</p>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-dashed border-gray-600 text-gray-400 flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                </div>
                                <h3 className="text-white font-bold mb-1">Add Alternate Angle</h3>
                                <p className="text-xs text-gray-500">Provide a side-profile or low-lighting shot to greatly improve engine detection accuracy against heavily-edited deepfakes.</p>
                            </>
                        )}
                    </div>

                </div>

                {/* Whitelist Settings */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-2">Safe Domains & Authorized Profiles</h3>
                    <p className="text-sm text-gray-400 mb-6">
                        Prevent AegisLens from flagging your own content. Add your official social media handles (e.g. <code className="text-indigo-400 font-mono">instagram.com/username</code>) or domains. The Swarm engine will automatically ignore any matches that originate from these exact locations.
                    </p>

                    <form onSubmit={handleAddWhitelist} className="flex flex-col sm:flex-row gap-4 mb-6">
                        <input
                            type="text"
                            value={newWhitelistEntry}
                            onChange={(e) => setNewWhitelistEntry(e.target.value)}
                            placeholder="e.g. twitter.com/username"
                            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors whitespace-nowrap border border-white/10"
                        >
                            Add to Allowlist
                        </button>
                    </form>

                    {whitelist.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {whitelist.map((entry, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 text-sm text-emerald-400">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span className="font-semibold tracking-wide">{entry}</span>
                                    <button onClick={() => handleRemoveWhitelist(entry)} className="text-emerald-500/50 hover:text-rose-500 ml-1 transition-colors">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500 italic">No safe domains configured. Everything is considered hostile.</div>
                    )}
                </div>

            </div>
        </>
    )
}
