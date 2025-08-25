import fs from 'fs'
import path from 'path'

export type Card = {
  id: string
  title: string
  slug: string
  verses?: string[]
  body?: string
  prayer?: string 
  tags?: string[]
}

const contentDir = path.join(process.cwd(), 'content', 'cards')

export function loadAllCards(): Card[] {
  if (!fs.existsSync(contentDir)) return []
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'))
  const cards: Card[] = []
  for (const f of files) {
    try {
      const raw = fs.readFileSync(path.join(contentDir, f), 'utf8')
      const data = JSON.parse(raw)
      const title: string = data.title || path.basename(f, '.json')
      const slug = (data.slug || title).toLowerCase().replace(/[^a-z0-9]+/g,'-')
      cards.push({
        id: data.id || slug,
        title,
        slug,
        verses: data.verses || [],
        body: data.body || (data.content ?? ''),
		prayer: data.prayer || '',    
        tags: data.tags || [],
      })
    } catch {}
  }
  return cards.sort((a,b)=> a.title.localeCompare(b.title))
}

export function searchCards(query: string, limit=10): Card[] {
  const q = query.trim().toLowerCase()
  if (!q) return loadAllCards().slice(0, limit)
  const words = q.split(/\s+/).filter(Boolean)
  let scored = loadAllCards().map(card => {
    const hay = (card.title + ' ' + (card.body||'') + ' ' + (card.verses||[]).join(' ') + ' ' + (card.tags||[]).join(' ')).toLowerCase()
    let score = 0
    for (const w of words) { if (hay.includes(w)) score += 1 }
    return { card, score }
  })
  return scored.filter(s => s.score > 0).sort((a,b)=> b.score - a.score).slice(0, limit).map(s => s.card)
}
