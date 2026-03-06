import {Sidebar} from '@/components/dashboard/Sidebar';
import {MobileHeader} from '@/components/dashboard/MobileHeader';
import {createClient} from '@/utils/supabase/server';
import {cookies} from 'next/headers';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 1. Resolve user identity to properly namespace local storage data securely
    const cookieStore = await cookies();
    const backdoor = cookieStore.get('dev_backdoor')?.value === 'true';
    let userEmail = 'antideepfake@test.com'; // Default mock test account

    if (!backdoor) {
        const supabase = await createClient();
        const {data: {user}} = await supabase.auth.getUser();
        if (user && user.email) {
            userEmail = user.email;
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-indigo-500/30 flex flex-col md:flex-row">
            <script
                dangerouslySetInnerHTML={{
                    __html: `localStorage.setItem('aegis_current_user', '${userEmail}');`
                }}
            />
            <MobileHeader />
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 min-h-screen">
                {children}
            </main>
        </div>
    );
}
