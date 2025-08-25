'use client'

import { useEffect, useRef, useState } from 'react'
import BackHome from '@/components/BackHome'
import ChatTips from '@/components/ChatTips'

export default function ChatPage() {
  const [input, setInput] = useState('')
  const [log, setLog] = useState<string>('')
  const controllerRef = useRef<AbortController | null>(null)

  // abort any in-flight request when unmounting
  useEffect(() => {
    return () => {
      try { controllerRef.current?.abort() } catch {}
    }
  }, [])

  const safeAbortPrev = () => {
    const c = controllerRef.current
    if (!c) return
    try {
      // give a reason for debugging; some environments throw if unhandled
      // We catch it regardless.
      // @ts-expect-error reason is allowed in newer DOM, ignored otherwise
      c.abort('replaced-by-new-request')
    } catch {
      /* ignore AbortError */
    } finally {
      controllerRef.current = null
    }
  }

  const send = async () => {
    if (!input.trim()) return

    setLog((p) => p + `\n\nYou: ${input}`)
    safeAbortPrev()
    controllerRef.current = new AbortController()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message: input }),
        signal: controllerRef.current.signal,
      })

      if (!res.ok || !res.body) {
        let t = 'Request failed'
        try { t = await res.text() } catch {}
        setLog((p) => p + `\n\n⚠️ ${t}`)
        return
      }

      setLog((p) => p + `\n\nAssistant: `)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        setLog((p) => p + decoder.decode(value))
      }
    } catch (err: unknown) {
      // Swallow aborts cleanly; show only real errors
      if (err instanceof DOMException && err.name === 'AbortError') {
        // optional: setLog((p) => p + '\n\n⏹️ (previous request cancelled)')
      } else {
        setLog((p) => p + `\n\n⚠️ ${String(err)}`)
      }
    } finally {
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

	function renderLog(text: string) {
		const lines = text.split(/\n/);
		return lines.map((line, i) => {
			if (line.startsWith('You:')) {
				return (
				<p key={i} className="mb-1">
					<strong>You:</strong>
						{line.slice(4)}
				</p>
			);
		}
		if (line.startsWith('Assistant:')) {
		return (
			<p key={i} className="mb-1">
				<strong>Assistant:</strong>
          {line.slice(10)}
        </p>
      );
    }
    // keep blank lines as vertical space
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return (
      <p key={i} className="mb-1">
        {line}
      </p>
    );
  });
}



  return (
    <div className="w-full -mx-4 px-4 py-10 bg-blue-700 text-white">
      <div className="mx-auto max-w-5xl flex min-h-[70vh] flex-col gap-4">
        <BackHome linkClass="text-white/90 hover:text-white" sepClass="text-white/50" />
        <h1 className="text-2xl font-bold">AI Assistant</h1>

        {/* Messages panel grows/shrinks with the page */}
		<div className="rounded-2xl border border-white/20 bg-white/5 p-4 overflow-y-auto 		flex-1 min-h-[320px] text-sm">
			{log ? renderLog(log) : 'Start a conversation...'}
		</div>


        {/* Input row */}
        <div className="flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about a topic..."
            className="flex-1 border rounded-xl px-3 py-2 text-gray-900"
          />
          <button onClick={send} className="px-4 py-2 rounded-xl border bg-white text-blue-700">
            Send
          </button>
        </div>

        {/* Tips */}
        <ChatTips
          count={5}
          intervalMs={8000}
          offline={process.env.LLM_OFFLINE === 'on'}
          onPick={(t) => setInput(t)}
          className="text-white/85"
        />
      </div>
    </div>
  )
}
