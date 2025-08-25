import { NextResponse } from 'next/server'
import { hasActiveSubscription, readStripeCustomerIdFromCookie } from '@/lib/subscription'
export async function GET() {
  const isFree = process.env.FREE_TIER === 'on'
  if (isFree) return NextResponse.json({ active: true })
  try {
    const cust = readStripeCustomerIdFromCookie()
    const active = await hasActiveSubscription(cust)
    return NextResponse.json({ active })
  } catch {
    return NextResponse.json({ active: false })
  }
}
