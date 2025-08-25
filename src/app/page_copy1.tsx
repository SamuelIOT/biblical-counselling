import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full -mx-4 px-4 py-16 bg-blue-700 text-white text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold">Biblical Counselling</h1>

      {/* White message card on blue background */}
      <div className="mx-auto mt-6 max-w-3xl rounded-2xl bg-white text-gray-800 p-5 text-left shadow-lg">
        <p className="leading-relaxed">
          Welcome! Biblical Counselling offers biblical encouragement and guidance.
          It is not a substitute for professional counseling, medical, legal, or
          emergency services.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/about" className="px-5 py-2 rounded-xl border">
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
    </div>
  )
}
