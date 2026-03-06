import {Sidebar} from '@/components/dashboard/Sidebar';
import {MobileHeader} from '@/components/dashboard/MobileHeader';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-indigo-500/30 flex flex-col md:flex-row">
            <MobileHeader />
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 min-h-screen">
                {children}
            </main>
        </div>
    );
}
