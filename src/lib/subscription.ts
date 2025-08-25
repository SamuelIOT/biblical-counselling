import { cookies } from 'next/headers'
import { getStripe } from './stripe'
const COOKIE_NAME = 'ctb_cust'
export function readStripeCustomerIdFromCookie(): string | null {
  return cookies().get(COOKIE_NAME)?.value || null
}
export function setStripeCustomerCookieHeaders(customerId: string) {
  return `${COOKIE_NAME}=${encodeURIComponent(customerId)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60*60*24*365}`
}
export async function hasActiveSubscription(customerId: string | null): Promise<boolean> {
  if (!customerId) return false
  const stripe = getStripe()
  const subs = await stripe.subscriptions.list({ customer: customerId, status: 'all' })
  return subs.data.some(s => ['active','trialing','past_due'].includes(s.status))
}
