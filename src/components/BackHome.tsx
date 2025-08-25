'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function BackHome({
  linkClass = '',
  sepClass = '',
  wrapperClass = '',
}: {
  linkClass?: string
  sepClass?: string
  wrapperClass?: string
}) {
  const pathname = usePathname()
  const router = useRouter()
  if (pathname === '/') return null

  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) router.back()
    else router.push('/')
  }

  return (
    <div className={`mb-4 ${wrapperClass}`}>
      <button
        onClick={goBack}
        className={`text-sm underline underline-offset-4 hover:opacity-80 ${linkClass}`}
      >
        ← Back
      </button>
      <span className={`mx-2 ${sepClass}`}>|</span>
      <Link
        href="/"
        className={`text-sm underline underline-offset-4 hover:opacity-80 ${linkClass}`}
      >
        Home
      </Link>
    </div>
  )
}
