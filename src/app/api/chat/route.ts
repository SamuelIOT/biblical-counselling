import { NextRequest } from 'next/server'
import { chatStream, llmEnabled } from '@/lib/llm'
import { hasActiveSubscription, readStripeCustomerIdFromCookie } from '@/lib/subscription'
import { searchCards } from '@/lib/content'

export const runtime = 'nodejs'

function offlineReply(message: string, verses: string[]): string {
  const refs = verses.length ? `Scriptures: ${verses.join(' | ')}` : 'Scriptures: (add more cards in /content/cards)'
  return [
    'AI (offline mode)',
    '',
    refs,
    '',
    `You said: "${message}"`,
    '',
    'Encouragement: Bring this to the Lord in prayer. Meditate on the verses above and take one small step of obedience today.',
  ].join('\n')
}

export async function POST(req: NextRequest) {
  const isFree = process.env.FREE_TIER === 'on'
  let ok = isFree
  if (!ok) {
    const cust = readStripeCustomerIdFromCookie()
    try { ok = await hasActiveSubscription(cust) } catch { ok = false }
  }
  if (!ok) return new Response('Subscription required. Visit /pricing.', { status: 402 })

  const { message } = await req.json()
  const cards = searchCards(String(message||'').slice(0, 200), 3)
  const versesOnly = cards.flatMap(c => c.verses || [])

  if (!llmEnabled()) {
    const text = offlineReply(String(message||''), versesOnly)
    return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }

  const system = `You are a friendly Christian counselling assistant. Always ground your guidance in Scripture with sensitivity.`
  const ctx = cards.map(c => `- ${c.title}\nVerses: ${(c.verses||[]).join(' ')}\nNotes: ${c.body}`).join('\n\n')
  const messages = [
    { role: 'system', content: system },
    { role: 'user', content: `User message: ${message}\n\nContext cards (top matches):\n${ctx}` },
  ] as const

  try {
    const stream = chatStream(messages as any)
    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) controller.enqueue(encoder.encode(chunk))
        controller.close()
      }
    })
    return new Response(readable, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  } catch (e:any) {
    const text = offlineReply(String(message||''), versesOnly)
    return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
}
