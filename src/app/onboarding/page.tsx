export default function OnboardingPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white">
            <div className="w-full max-w-lg space-y-8 rounded-xl bg-gray-800 p-8 shadow-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white">Identity Verification Required</h2>
                <p className="mt-4 text-gray-400">
                    To protect your likeness and process automated DMCA takedowns, we are legally required to verify your identity.
                    We use Stripe Identity for a secure, encrypted KYC process.
                    Your actual ID documents are never stored on our servers.
                </p>
                <div className="mt-8">
                    {/* In a real implementation this would trigger the Stripe Identity SDK or redirect */}
                    <button className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full transition-all">
                        Begin KYC Verification with Stripe
                    </button>
                    <div className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        End-to-End Encrypted via AES-256
                    </div>
                </div>
            </div>
        </div>
    )
}
