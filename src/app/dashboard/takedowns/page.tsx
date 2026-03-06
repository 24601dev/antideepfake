'use client';

import Link from 'next/link';

export default function TakedownsPage() {
    return (
        <>
            <header className="h-20 border-b border-white/5 px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-md z-30">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Legal Execution</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Automated DMCA payload tracking and host compliance logs.</p>
                </div>
            </header>

            <div className="p-4 sm:p-8 flex-1 overflow-x-hidden relative max-w-5xl">

                {/* This is what influencers actually care about: Is the problem gone? */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="glass-panel p-5 rounded-2xl border-white/5 border-l-2 border-l-indigo-500">
                        <div className="text-gray-400 text-sm font-medium mb-1">Active Takedown Requests</div>
                        <div className="text-3xl font-bold text-white">14</div>
                        <div className="text-xs text-indigo-400 mt-2">Currently awaiting host compliance review.</div>
                    </div>
                    <div className="glass-panel p-5 rounded-2xl border-white/5 border-l-2 border-l-emerald-500">
                        <div className="text-gray-400 text-sm font-medium mb-1">Successfully Scrubbed</div>
                        <div className="text-3xl font-bold text-white">412</div>
                        <div className="text-xs text-emerald-400 mt-2">Items legally removed from indexed sources.</div>
                    </div>
                </div>

                <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px]">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/[0.02]">
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Case ID / Target</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Filing Date</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Host Provider</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">DMCA Copy</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="font-mono text-xs text-indigo-400 mb-1">DMCA-9982-A</div>
                                        <div className="text-sm font-medium text-white max-w-[200px] truncate">image-host-77[.]biz/view/a883k1</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-400">March 4, 2026</td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="text-sm text-white">Cloudflare, Inc.</div>
                                        <div className="text-xs text-gray-500">abuse@cloudflare.com</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                            Pending Review (48h)
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <button className="text-indigo-400 hover:text-indigo-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            PDF
                                        </button>
                                    </td>
                                </tr>

                                <tr className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="font-mono text-xs text-gray-500 mb-1">DMCA-9901-B</div>
                                        <div className="text-sm font-medium text-gray-500 line-through truncate max-w-[200px]">tg-groups-hub[.]ru/c/9921</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">Feb 28, 2026</td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <div className="text-sm text-gray-400">Telegram FZ-LLC</div>
                                        <div className="text-xs text-gray-500">abuse@telegram.org</div>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                            Complied / Removed
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-6 py-4">
                                        <button className="text-gray-500 hover:text-gray-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                            PDF
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
