import { NextResponse } from 'next/server'
import { getStripe, STRIPE_PRICE_ID, STRIPE_SUCCESS_URL, STRIPE_CANCEL_URL } from '@/lib/stripe'
export async function POST() {
  if (!STRIPE_PRICE_ID) return NextResponse.json({ error: 'Missing STRIPE_PRICE_ID in env' }, { status: 400 })
  const stripe = getStripe()
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
    success_url: STRIPE_SUCCESS_URL,
    cancel_url: STRIPE_CANCEL_URL,
    allow_promotion_codes: true,
  })
  return NextResponse.json({ url: session.url })
}
