import { loadAllCards } from '@/lib/content'
import Link from 'next/link'
export const dynamic = 'force-static'

import BackHome from '@/components/BackHome'

export default function Topics() {
  const cards = loadAllCards()
  return (
    <div className="space-y-6">
	        <BackHome
          linkClass="text-white/90 hover:text-white"
          sepClass="text-white/50"
        />
	
      <h1 className="text-2xl font-bold">Topics</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {cards.map(c => (
          <Link key={c.id} href={`/topics/${c.slug}`} 
			className="block rounded-xl border border-white/30 bg-white/5 px-5 py-4
                 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30
                 select-none selection:bg-transparent selection:text-inherit"
    >
            <div className="font-semibold">{c.title}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
