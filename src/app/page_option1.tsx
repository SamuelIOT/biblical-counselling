// src/app/page.tsx
import Link from 'next/link'
import type { SVGProps } from 'react'

const IconBible = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M6 4a3 3 0 0 0-3 3v10a3 3 0 0 1 3-3h13V6a2 2 0 0 0-2-2H6Z"/>
    <path fill="currentColor" d="M6 16a3 3 0 1 0 0 6h13v-6H6Zm5.25-8.75h1.5v2.25H15v1.5h-2.25V13h-1.5v-2.25H9v-1.5h2.25V7.25Z"/>
  </svg>
)

const IconChat = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-6l-4 3v-3H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
  </svg>
)

const IconHeartShield = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="currentColor" d="M12 2 4.5 5v6c0 4.5 3.6 7.9 7.5 9 3.9-1.1 7.5-4.5 7.5-9V5L12 2Z"/>
    <path fill="#fff" d="M12 16.3c-2.1-1.5-3.5-2.8-3.5-4.4a2.3 2.3 0 0 1 3.8-1.7l.2.2.2-.2a2.3 2.3 0 0 1 3.8 1.7c0 1.6-1.5 2.9-3.5 4.4Z"/>
  </svg>
)

export default function Home() {
  return (
    <div className="w-full -mx-4 px-4 py-16 bg-blue-700 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Biblical Counselling
        </h1>

        {/* White disclaimer card */}
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl bg-white text-gray-800 p-5 text-left shadow-lg">
          <p className="leading-relaxed">
            Welcome! Biblical Counselling offers biblical encouragement and guidance.
            It is not a substitute for professional counseling, medical, legal, or
            emergency services.
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/about" className="px-5 py-2 rounded-xl border bg-white text-blue-700">
            About
          </Link>
          <Link href="/topics" className="px-5 py-2 rounded-xl border">
            Interested Topics
          </Link>
          <Link href="/chat" className="px-5 py-2 rounded-xl border">
            AI Assistant
          </Link>
          <Link href="/pricing" className="px-5 py-2 rounded-xl border">
            Subscription
          </Link>
        </div>

        {/* Feature row */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3 text-left">
          <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
            <IconBible className="w-8 h-8 mb-3 text-white/90" />
            <h3 className="font-semibold">Scripture First</h3>
            <p className="mt-1 text-white/80 text-sm leading-relaxed">
              Curated passages from the Bible with short reflections and a simple prayer.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
            <IconChat className="w-8 h-8 mb-3 text-white/90" />
            <h3 className="font-semibold">Helpful Assistant</h3>
            <p className="mt-1 text-white/80 text-sm leading-relaxed">
              Ask questions and explore topics; always test counsel by God’s Word.
            </p>
          </div>
          <div className="rounded-2xl border border-white/20 bg-white/5 p-5">
            <IconHeartShield className="w-8 h-8 mb-3 text-white/90" />
            <h3 className="font-semibold">Gentle & Safe</h3>
            <p className="mt-1 text-white/80 text-sm leading-relaxed">
              Clear disclaimers, pastoral tone, and pointers to real-world care when needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
