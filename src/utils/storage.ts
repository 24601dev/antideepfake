export function getStorageKey(key: string) {
    if (typeof window === 'undefined') return key;
    const user = localStorage.getItem('aegis_current_user');

    // For backwards compatibility and the demo test account (non-prefixed)
    if (!user || user === 'antideepfake' || user === 'antideepfake@test.com') {
        return key;
    }
    // Namespace the key to the current user
    return `${user}_${key}`;
}
