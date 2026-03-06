import {NextRequest, NextResponse} from 'next/server';
import Stripe from 'stripe';
import {PrismaClient} from '@prisma/client';

function getPrisma() {
    if (!(globalThis as any).__prisma) {
        (globalThis as any).__prisma = new PrismaClient();
    }
    return (globalThis as any).__prisma as PrismaClient;
}

export async function POST(req: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const prisma = getPrisma();

    const payload = await req.text();
    const sig = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return NextResponse.json({error: `Webhook Error: ${err.message}`}, {status: 400});
    }

    // Handle the Stripe Identity events
    if (event.type === 'identity.verification_session.verified') {
        const session = event.data.object as Stripe.Identity.VerificationSession;

        // Assuming metadata contains the userId
        const userId = session.metadata?.userId;
        if (userId) {
            await prisma.user.update({
                where: {id: userId},
                data: {kycStatus: 'VERIFIED'},
            });
            console.log(`User ${userId} successfully verified via KYC.`);
        }
    } else if (event.type === 'identity.verification_session.requires_input') {
        const session = event.data.object as Stripe.Identity.VerificationSession;
        const userId = session.metadata?.userId;
        if (userId) {
            await prisma.user.update({
                where: {id: userId},
                data: {kycStatus: 'FAILED'},
            });
            console.log(`User ${userId} failed KYC verification.`);
        }
    }

    return NextResponse.json({received: true});
}
