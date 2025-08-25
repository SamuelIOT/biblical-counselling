'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/about', label: 'About' },
  { href: '/topics', label: 'Topics' },
  { href: '/chat', label: 'AI Assistant' },
  { href: '/pricing', label: 'Subscription' },
]

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()

  // treat child routes as active (e.g., /topics/[slug])
  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(href))

  const base =
    'px-3 py-1.5 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500'
  const rest = isActive
    ? 'bg-blue-600 text-white shadow-sm'
    : 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'

  return (
    <Link href={href} className={`${base} ${rest}`}>
      {label}
    </Link>
  )
}

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl h-14 px-4 flex items-center justify-between">
        {/* Brand (keep or remove) */}
        <Link
          href="/"
          className="font-extrabold text-blue-700 tracking-tight hover:opacity-90"
        >
          Biblical Counselling
        </Link>

        {/* Pill menu */}
        <nav className="flex items-center gap-1 p-1 rounded-full bg-white shadow-sm ring-1 ring-slate-200">
          {links.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </nav>
      </div>
    </header>
  )
}
