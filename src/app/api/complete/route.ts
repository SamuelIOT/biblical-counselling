import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { setStripeCustomerCookieHeaders } from '@/lib/subscription'
export async function POST(req: NextRequest) {
  const { session_id } = await req.json()
  if (!session_id) return NextResponse.json({ ok: false, error: 'Missing session_id' }, { status: 400 })
  const stripe = getStripe()
  const session = await stripe.checkout.sessions.retrieve(session_id)
  if (!session || typeof session.customer !== 'string') return NextResponse.json({ ok: false, error: 'Invalid session' }, { status: 400 })
  const res = NextResponse.json({ ok: true })
  res.headers.set('Set-Cookie', setStripeCustomerCookieHeaders(session.customer))
  return res
}
