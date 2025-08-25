import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export function llmEnabled() {
  return process.env.LLM_OFFLINE !== 'on' && !!OPENAI_API_KEY
}

export const openai = createOpenAI({ apiKey: OPENAI_API_KEY, compatibility: 'strict' })

export async function* chatStream(messages: { role: 'user'|'assistant'|'system', content: string }[]) {
  if (!llmEnabled()) {
    yield '⚠️ AI is in offline mode. Enable by providing OPENAI_API_KEY and setting LLM_OFFLINE=off.'
    return
  }
  try {
    const model = openai('gpt-4o-mini')
    const result = await streamText({ model, messages, temperature: 0.4 })
    for await (const delta of result.textStream) { yield delta }
  } catch (e:any) {
    // Graceful fallback
    const msg = (e && e.message) ? e.message : 'Unknown error'
    yield `⚠️ AI service is temporarily unavailable (${msg}).`
  }
}
