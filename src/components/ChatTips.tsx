'use client'

import { useEffect, useMemo, useState } from 'react'

const BASE_TIPS = [
  'Ask for 3 verses on a topic and one action step.',
  'Request a short prayer you can pray right now.',
  'Ask for a 7-day Bible reading plan for your topic.',
  'Summarize in 3 bullet points with verses.',
  'Draft a gentle message to encourage a friend (with a verse).',
  'Give journaling prompts based on today’s verses.',
  'Compare two verses that seem to disagree.',
  'Memory verse + a simple mnemonic.',
  'One next step I can do in 10 minutes.',
  'Rewrite this for a teen in simpler words.',
  'Mini devotional: verse, reflection, prayer.',
  'Verses + short prayer for gratitude.',
  'Verses for forgiveness & reconciliation.',
  'Verses to fight temptation; add a plan.',
  'How to confess sin biblically (with verses).',
  'Verses for assurance of salvation.',
  'Create a prayer using Psalm 23.',
  'Turn these verses into an “I will…” statement.',
]

export default function ChatTips({
  offline = false,
  className = '',
  count = 3,            // how many tips to show at once
  intervalMs = 7000,    // rotate speed
  onPick,               // optional: click to fill input
}: {
  offline?: boolean
  className?: string
  count?: number
  intervalMs?: number
  onPick?: (tip: string) => void
}) {
  const tips = useMemo(
    () =>
      offline
        ? [
            'LLM_OFFLINE=on — test without an API key. Turn it off and set an API key to use a live model.',
            ...BASE_TIPS,
          ]
        : BASE_TIPS,
    [offline]
  )

  // start at random; rotate
  const [i, setI] = useState(() => Math.floor(Math.random() * tips.length))
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % tips.length), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, tips.length])

  const window = Array.from({ length: Math.min(count, tips.length) }, (_, k) => tips[(i + k) % tips.length])

  return (
    <div className={`mt-3 text-sm ${className}`}>
      <div className="uppercase tracking-wide opacity-80 mb-1">Tips</div>

      <ul className="space-y-1">
        {window.map((t, idx) => (
          <li key={idx}>
            <button
              type="button"
              onClick={onPick ? () => onPick(t) : undefined}
              className={`text-left underline underline-offset-4 hover:opacity-90 ${
                onPick ? '' : 'cursor-default'
              }`}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>

      {/* Controls */}
      <div className="mt-2 flex gap-2 opacity-80">
        <button
          type="button"
          onClick={() => setI((n) => (n - 1 + tips.length) % tips.length)}
          className="rounded px-2 py-0.5 border border-white/30 hover:bg-white/10"
          aria-label="Previous tips"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={() => setI((n) => (n + 1) % tips.length)}
          className="rounded px-2 py-0.5 border border-white/30 hover:bg-white/10"
          aria-label="Next tips"
        >
          ▶
        </button>
      </div>
    </div>
  )
}
