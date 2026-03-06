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
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    let userEmail = 'antideepfake@test.com'; // Default mock test account
    let userName = 'Test Account';

    if (user && user.email) {
        userEmail = user.email;
        if (user.user_metadata?.first_name) {
            userName = `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`.trim();
        } else {
            userName = user.email.split('@')[0];
        }
    } else {
        const cookieStore = await cookies();
        const backdoor = cookieStore.get('dev_backdoor')?.value === 'true';
        if (!backdoor) {
            // Middleware handles this, but logically we are a guest
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-indigo-500/30 flex flex-col md:flex-row">
            <script
                dangerouslySetInnerHTML={{
                    __html: `localStorage.setItem('aegis_current_user', '${userEmail}'); localStorage.setItem('aegis_user_name', '${userName.replace(/'/g, "\\'")}');`
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
