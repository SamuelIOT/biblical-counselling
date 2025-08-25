'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },          // new page you create later  
  { href: '/topics', label: 'Topics' },
  { href: '/chat', label: 'AI Assistant' },
  { href: '/pricing', label: 'Subscription' },

]
export default function Nav() {
  const pathname = usePathname()
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">CounsellingThroughBible</Link>
        <div className="flex gap-6">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={clsx(
              "text-sm hover:underline",
              pathname === l.href ? "font-semibold" : "text-gray-600"
            )}>{l.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
