import Link from 'next/link'
import { loadAllCards } from '@/lib/content'

export const revalidate = 60 * 60 * 24 // rotate verse daily

export default function Home() {
  const cards = loadAllCards()

  // Prefer Anxiety; fallback to first topic
  const start =
    cards.find(
      (c) =>
        c.id?.toLowerCase() === 'anxiety' ||
        c.title?.toLowerCase() === 'anxiety' ||
        c.slug?.toLowerCase().includes('anxiety')
    ) ?? cards[0]

  const vod = pickVerseOfDay(cards)

  return (
    <div className="w-full -mx-4 px-4 py-16 bg-blue-700 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">Biblical Counselling</h1>

        {/* Disclaimer card */}
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl bg-blue-600 text-white p-5 text-left shadow-lg border border-white/20">
          <p className="leading-relaxed">
            Welcome! Biblical Counselling offers biblical encouragement and guidance. It is not a
            substitute for professional counseling, medical, legal, or emergency services.
          </p>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {start && (
            <Link
              href={`/topics/${start.slug}`}
              className="px-5 py-2 rounded-xl border bg-white text-blue-700"
            >
              Get started
            </Link>
          )}
          <Link href="/topics" className="px-5 py-2 rounded-xl border">
            Browse Topics
          </Link>
          <Link href="/chat" className="px-5 py-2 rounded-xl border">
            Try the AI Assistant
          </Link>
          <Link href="/about" className="px-5 py-2 rounded-xl border">
            Learn More
          </Link>
        </div>

        {/* Verse of the Day */}
        {vod && (
          <div className="mx-auto mt-10 max-w-3xl text-left rounded-2xl p-5 border border-white/20 bg-white/5">
            <div className="text-xs uppercase tracking-wide opacity-80">Verse of the day</div>
            <p className="mt-2 leading-relaxed">{vod.text}</p>
            <div className="mt-3">
              <Link href={`/topics/${vod.slug}`} className="underline underline-offset-4">
                Explore: {vod.title}
              </Link>
            </div>
          </div>
        )}

        {/* In-Person Counselling callout */}

      </div>
    </div>
  )
}

// helpers
type AnyCard = { slug: string; title: string; verses?: string[] }

function pickVerseOfDay(cards: AnyCard[]) {
  const list: { text: string; slug: string; title: string }[] = []
  for (const c of cards) for (const v of c.verses ?? []) list.push({ text: v, slug: c.slug, title: c.title })
  if (list.length === 0) return null
  const today = new Date().toISOString().slice(0, 10)
  const idx = hash(today) % list.length
  return list[idx]
}
function hash(s: string) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h }
