import { loadAllCards } from '@/lib/content'
import Link from 'next/link'
export const dynamic = 'force-static'
export default function TopicPage({ params }: { params: { slug: string } }) {
  const card = loadAllCards().find(c => c.slug === params.slug)
  if (!card) return <div><p>Not found.</p><Link href="/topics" className="underline">Back</Link></div>
  return (
    <article className="prose max-w-none">
      <Link href="/topics" className="text-sm underline">← Back</Link>
      <h1>{card.title}</h1>
      {card.verses?.length > 0 && (
		<blockquote className="not-prose rounded-lg p-4 border border-white/20 bg-white/5">
			<ul className="space-y-2">
				{card.verses.map((v, i) => (
					<li key={i} className="leading-relaxed break-words">
						{v}
					</li>
				))}
			</ul>
		</blockquote>
		)
	  }
      <p>{card.body}</p>
    </article>
  )
}
