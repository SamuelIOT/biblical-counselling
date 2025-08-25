import Stripe from 'stripe'
export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY')
  return new Stripe(key, { apiVersion: '2024-06-20' as any })
}
export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || ''
export const STRIPE_SUCCESS_URL = process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/thank-you?session_id={CHECKOUT_SESSION_ID}'
export const STRIPE_CANCEL_URL = process.env.STRIPE_CANCEL_URL || 'http://localhost:3000/pricing'
