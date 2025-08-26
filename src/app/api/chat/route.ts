import { NextRequest } from 'next/server'
import { streamText } from 'ai'
import { model } from '@/lib/llm'

// Ensure this route is always executed on-demand (no static caching)
export const dynamic = 'force-dynamic'

// Toggle free mode with env var:
//   SUBSCRIPTION_FREE_MODE=on  → bypass subscription checks
const FREE_MODE = process.env.SUBSCRIPTION_FREE_MODE === 'on'

// Optional: keep your offline toggle if you use it elsewhere
const OFFLINE = process.env.LLM_OFFLINE === 'on'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message || typeof message !== 'string') {
      return new Response('Bad request: missing "message"', { status: 400 })
    }

    // --- subscription gate (bypassed when FREE_MODE is on) ---
    if (!FREE_MODE) {
      // TODO: replace with your real auth/subscription check (cookie/db/user)
      // If not active, block:
      // return new Response('Subscription required. Visit /pricing.', { status: 402 })
    }

    // --- optional: ultra-simple offline behavior (keeps existing UI flowing) ---
    if (OFFLINE) {
      const text =
        `Assistant: (offline mode)\n` +
        `Here’s a brief, Bible-first response to: "${message}"\n\n` +
        `• Consider reading Psalm 23 and Matthew 11:28–30 today.\n` +
        `• Pray: “Lord, give me rest in You and guide my steps.”\n` +
        `• Take one step: write down one promise from Scripture and keep it with you.`
      return new Response(text, {
        headers: { 'content-type': 'text/plain; charset=utf-8', 'x-free-mode': String(FREE_MODE) },
      })
    }

    // --- live LLM streaming via Vercel AI SDK ---
    const result = await streamText({
      model,
      messages: [{ role: 'user', content: message }],
    })

    // Add a small header so you can confirm free mode in logs if desired
    const res = result.toDataStreamResponse()
    res.headers.set('x-free-mode', String(FREE_MODE))
    return res
  } catch (err: unknown) {
    // Graceful error message (don’t leak internals)
    const msg =
      err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error'
    return new Response(`Server error: ${msg}`, { status: 500 })
  }
}
