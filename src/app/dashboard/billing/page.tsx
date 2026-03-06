'use client';

export default function BillingPage() {
    return (
        <>
            <header className="h-20 border-b border-white/5 px-4 sm:px-8 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-md z-30">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Billing & Plans</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Manage your subscription, usage limits, and payment methods.</p>
                </div>
            </header>

            <div className="p-4 sm:p-8 flex-1 overflow-x-hidden relative max-w-5xl space-y-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Current Plan & Usage */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-lg font-bold text-white tracking-tight">Current Plan Overview</h2>

                        <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mx-10 -my-10 pointer-events-none"></div>

                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 relative z-10">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-extrabold text-white">Pro Plan</h3>
                                        <span className="px-2.5 py-1 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300">Active</span>
                                    </div>
                                    <div className="text-3xl font-black text-white mt-4">$29<span className="text-lg text-gray-400 font-medium">/month</span></div>
                                    <p className="text-sm text-gray-400 mt-2">Your next billing cycle is on <strong>April 5, 2026</strong>.</p>
                                </div>
                                <button className="px-5 py-2.5 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                                    Manage Subscription
                                </button>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 space-y-6 relative z-10">
                                <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Current Usage</h4>

                                <div className="space-y-5">
                                    {/* Monthly Takedowns */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-300 font-medium text-xs uppercase tracking-wider">DMCA Takedowns Issued</span>
                                            <span className="text-white font-bold text-xs">42 / 100</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 rounded-full" style={{width: '42%'}}></div>
                                        </div>
                                    </div>

                                    {/* Monitored Images */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-300 font-medium text-xs uppercase tracking-wider">Automated Scans (Monthly)</span>
                                            <span className="text-white font-bold text-xs">1,248 / 5,000</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 rounded-full" style={{width: '25%'}}></div>
                                        </div>
                                    </div>

                                    {/* Biometric Sources */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-300 font-medium text-xs uppercase tracking-wider">Biometric Identity Sources</span>
                                            <span className="text-white font-bold text-xs">1 / 3</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 rounded-full" style={{width: '33.3%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <h2 className="text-lg font-bold text-white tracking-tight mb-4">Payment Method</h2>
                            <div className="glass-panel p-5 rounded-2xl border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-10 bg-white rounded flex items-center justify-center border border-gray-300 shadow-sm">
                                        {/* Simple placeholder for a VISA logo */}
                                        <span className="text-[#1a1f71] font-black italic text-lg tracking-tighter hidden sm:block">VISA</span>
                                        <svg className="w-8 h-8 text-[#1a1f71] sm:hidden" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" /></svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">•••• •••• •••• 4242</div>
                                        <div className="text-xs text-gray-500 mt-0.5">Expires 12/28</div>
                                    </div>
                                </div>
                                <button className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold focus:outline-none">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* UPSELL: VIP Plan */}
                    <div className="space-y-6">
                        <h2 className="text-lg font-bold text-white tracking-tight">Available Upgrades</h2>
                        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/50 bg-indigo-500/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mx-10 -my-10"></div>

                            <div className="w-12 h-12 rounded bg-indigo-600 flex items-center justify-center neon-glow mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">Agency Tier</h3>
                            <p className="text-sm text-indigo-200/80 leading-relaxed mb-6">
                                Perfect for talent managers and agencies balancing multiple creators across various platforms.
                            </p>

                            <div className="text-3xl font-black text-white mb-6">$129<span className="text-sm text-gray-400 font-medium">/month</span></div>

                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-sm text-gray-300"><strong>500</strong> DMCA Takedowns / mo</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-sm text-gray-300">50,000 Deep web scrapes / mo</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-sm text-gray-300">Up to 15 Biometric Identity Sources</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span className="text-sm text-gray-300">Priority AI Email Parsing Manager</span>
                                </li>
                            </ul>

                            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Billing History Table */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-white tracking-tight">Billing History</h2>
                    <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-300">Mar 5, 2026</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-white">$29.00</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 uppercase tracking-wider border border-emerald-500/20">Paid</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm">Download PDF</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-300">Feb 5, 2026</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-white">$29.00</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 uppercase tracking-wider border border-emerald-500/20">Paid</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm">Download PDF</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-300">Jan 5, 2026</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-white">$29.00</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 uppercase tracking-wider border border-emerald-500/20">Paid</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm">Download PDF</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
