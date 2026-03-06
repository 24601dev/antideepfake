'use server'

import {createClient} from '@/utils/supabase/server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Backdoor for development testing
    if (email === 'antideepfake' && process.env.NODE_ENV === 'development') {
        // We handle the cookie client-side for the backdoor for simplicity in the current setup, 
        // but a real action would redirect. This server action is for real users.
    }

    const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return {error: error.message}
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
            data: {
                first_name: firstName,
                last_name: lastName,
            }
        }
    })

    if (error) {
        return {error: error.message}
    }

    if (data?.user && !data?.session) {
        return {error: "Check your email for the confirmation link to complete registration."};
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}
