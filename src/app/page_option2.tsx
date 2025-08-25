// src/app/page.tsx
import Link from 'next/link'

function BibleIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 260 200" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".8" />
          <stop offset="1" stopColor="#e5f0ff" stopOpacity=".9" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="260" height="200" rx="16" fill="url(#g)" />
      <rect x="32" y="35" width="88" height="130" rx="8" fill="#2563eb" opacity=".15" />
      <rect x="140" y="35" width="88" height="130" rx="8" fill="#2563eb" opacity=".25" />
      <path d="M76 70h48M76 88h48M76 106h48" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" opacity=".45"/>
      <path d="M168 70h48M168 88h48M168 106h48" stroke="#1e40af" strokeWidth="3" strokeLinecap="round" opacity=".45"/>
      <circle cx="130" cy="150" r="22" fill="#2563eb" opacity=".15" />
      <path d="M130 140v20M120 150h20" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export default function Home() {
  return (
    <div className="w-full -mx-4 px-4 py-12 bg-blue-700 text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left column: headline + disclaimer + CTAs */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Biblical Counselling
          </h1>

          <div className="mt-6 rounded-2xl bg-white text-gray-800 p-5 shadow-lg">
            <p className="leading-relaxed">
              Welcome! Biblical Counselling offers biblical encouragement and guidance.
              It is not a substitute for professional counseling, medical, legal, or
              emergency services.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/topics" className="px-5 py-2 rounded-xl border bg-white text-blue-700">
              Browse Topics
            </Link>
            <Link href="/chat" className="px-5 py-2 rounded-xl border">
              Try the AI Assistant
            </Link>
            <Link href="/about" className="px-5 py-2 rounded-xl border">
              Learn More
            </Link>
          </div>

          {/* How it works */}
          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              ['1.', 'Pick a topic'],
              ['2.', 'Read verses & guidance'],
              ['3.', 'Pray & take one step'],
            ].map(([n, t]) => (
              <div key={n} className="rounded-xl border border-white/20 bg-white/5 p-4">
                <div className="text-2xl font-bold">{n}</div>
                <div className="opacity-90">{t}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Illustration */}
        <div className="flex items-center justify-center">
          <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <BibleIllustration className="w-[520px] max-w-full h-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
