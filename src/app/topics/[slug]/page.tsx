import { loadAllCards } from '@/lib/content'
import Link from 'next/link'

export const dynamic = 'force-static'

import BackHome from '@/components/BackHome'

export default function TopicPage({ params }: { params: { slug: string } }) {
  const card = loadAllCards().find(c => c.slug === params.slug)
  if (!card) {
    return (
      <div>
        <p>Not found.</p>
        <Link href="/topics" className="underline">← Back</Link>
      </div>
    )
  }

  return (
    <article className="max-w-3xl space-y-6">
      <Link href="/topics" className="text-sm underline">← Back</Link>

      <h1 className="text-2xl font-bold">{card.title}</h1>

	{/* Verses — full-bleed panel */}
	{card.verses?.length ? (
	<div className="-mx-4 sm:-mx-6 lg:-mx-10">
    <div className="rounded-2xl border border-white/20 bg-white/5 p-5 text-[17px] leading-8">
      {card.verses.map((v, i) => (
        <p key={i} className="break-words">{v}</p>
      ))}
    </div>
  </div>
) : null}


      {/* Guidance / body */}
      {card.body ? (
        <div className="rounded-lg p-4 border border-white/20 bg-white/5">
          <div className="text-sm uppercase tracking-wide opacity-80 mb-2">Assistant</div>
          {card.body}
        </div>
      ) : null}

      {/* Prayer */}
      {card.prayer ? (
        <div className="rounded-lg p-4 border border-white/20 bg-white/5">
          <div className="text-sm uppercase tracking-wide opacity-80 mb-2">Prayer</div>
          <p className="leading-relaxed whitespace-pre-line">{card.prayer}</p>
        </div>
      ) : null}
    </article>
  )
}
