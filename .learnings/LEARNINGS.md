## [LRN-20260306-001] react_nextjs_soft_routing_cache

**Logged**: 2026-03-06T14:18:17+08:00
**Priority**: high
**Status**: resolved
**Area**: frontend

### Summary
Avoid raw `<script>` tags for localStorage injection in Next.js layouts during auth transitions due to soft routing bypassing script execution.

### Details
During a Next.js `redirect()` (e.g., after login), the browser performs a soft navigation. A raw HTML `<script>` tag injected into the new layout (like `DashboardLayout`) to sync `localStorage` will not execute because the page is not fully reloaded. This causes components to read stale or fallback mock data from `localStorage` until the user manually refreshes the page (F5), which then executes the script and isolates the data.

### Suggested Action
Instead of raw `<script>` tags, use a dedicated synchronous React component using `use client` to force initialization of localStorage before child components mount in the layout.

### Metadata
- Source: user_feedback
- Related Files: src/app/dashboard/layout.tsx, src/components/dashboard/UserSessionSync.tsx
- Tags: nextjs, react, localstorage, auth, soft-routing
- Pattern-Key: harden.nextjs_localstorage_sync
- Recurrence-Count: 1

---
## [LRN-20260306-002] hydration_flash_during_signout

**Logged**: 2026-03-06T14:18:17+08:00
**Priority**: medium
**Status**: resolved
**Area**: frontend

### Summary
Avoid synchronously clearing `localStorage` user keys *before* the router completes navigation on signout to prevent phantom data flashes.

### Details
When the "Sign Out" button clears `localStorage.removeItem('aegis_current_user')` and then triggers Next.js router redirection, there is a split-second delay while the server redirect is processed. React components observe the state change during this delay, find no user key in `localStorage`, and fall back to mock data or empty states, causing a visual flash of incorrect data right before the page unmounts.

### Suggested Action
Leave the `localStorage` keys intact during the sign-out process. Since the layout level component (`UserSessionSync`) will definitively overwrite the cache when a new user signs in, deleting it manually during sign out is unnecessary and causes visual glitching during hydration unload.

### Metadata
- Source: user_feedback
- Related Files: src/components/dashboard/Sidebar.tsx
- Tags: nextjs, react, localstorage, auth, signout, ui-flash
- Pattern-Key: simplify.auth_signout_cache
- Recurrence-Count: 1

---
