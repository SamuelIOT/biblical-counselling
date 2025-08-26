import { NextRequest } from 'next/server'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const FREE_MODE = process.env.SUBSCRIPTION_FREE_MODE === 'on'
const OFFLINE = process.env.LLM_OFFLINE === 'on'
const MODEL_NAME = process.env.OPENAI_MODEL || 'gpt-4o-mini'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message || typeof message !== 'string') {
      return new Response('Bad request: missing "message"', { status: 400 })
    }

    if (!FREE_MODE) {
      // TODO: when Stripe is ready, enforce here (402 if not active)
      // return new Response('Subscription required. Visit /pricing.', { status: 402 })
    }

    if (OFFLINE) {
      const text =
        `Assistant: (offline mode)\n` +
        `Here’s a brief, Bible-first response to: "${message}"\n\n` +
        `• Consider reading Psalm 23 and Matthew 11:28–30 today.\n` +
        `• Pray: “Lord, give me rest in You and guide my steps.”\n` +
        `• Take one step: write down one promise from Scripture and keep it with you.`
      return new Response(text, {
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'x-free-mode': String(FREE_MODE),
          'x-model': MODEL_NAME,
        },
      })
    }

    const result = await streamText({
      model: openai(MODEL_NAME),
      messages: [{ role: 'user', content: message }],
    })

    const res = result.toDataStreamResponse()
    res.headers.set('x-free-mode', String(FREE_MODE))
    res.headers.set('x-model', MODEL_NAME)
    return res
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return new Response(`Server error: ${msg}`, { status: 500 })
  }
}
