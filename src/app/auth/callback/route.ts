import {NextResponse} from 'next/server'
import {createClient} from '@/utils/supabase/server'

export async function GET(request: Request) {
    const {searchParams, origin} = new URL(request.url)
    const code = searchParams.get('code')

    // if "next" is in param, use it as the redirect path
    const next = searchParams.get('next') ?? '/dashboard'
    const error = searchParams.get('error')

    // If Supabase returned an error during the redirect
    if (error) {
        const errorDescription = searchParams.get('error_description') || error;
        // Redirect to login page and pass the error as a query param to display
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(errorDescription)}`);
    }

    if (code) {
        const supabase = await createClient()
        const {error: exchangeError} = await supabase.auth.exchangeCodeForSession(code)

        if (!exchangeError) {
            return NextResponse.redirect(`${origin}${next}`)
        } else {
            return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(exchangeError.message)}`);
        }
    }

    // fallback redirect
    return NextResponse.redirect(`${origin}/login?error=Invalid_verification_link`)
}
