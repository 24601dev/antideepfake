'use client';

export default function UserSessionSync({
    userEmail,
    userName
}: {
    userEmail: string;
    userName: string;
}) {
    if (typeof window !== 'undefined') {
        localStorage.setItem('aegis_current_user', userEmail);
        localStorage.setItem('aegis_user_name', userName);
    }
    return null;
}
