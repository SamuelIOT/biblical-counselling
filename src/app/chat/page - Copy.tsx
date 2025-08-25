'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import BackHome from '@/components/BackHome'
import ChatTips from '@/components/ChatTips'


export default function ChatPage() {
  const [input, setInput] = useState('')
  const [log, setLog] = useState<string>('')
  const [subStatus, setSubStatus] = useState<'unknown'|'ok'|'none'>('unknown')
  const controllerRef = useRef<AbortController|null>(null)
  useEffect(() => { fetch('/api/me').then(r=>r.json()).then(d=>setSubStatus(d.active?'ok':'none')).catch(()=>setSubStatus('none')) }, [])
  const send = async () => {
    if (!input.trim()) return
    setLog(p=>p+`\n\nYou: ${input}`)
    controllerRef.current?.abort(); controllerRef.current = new AbortController()
    const res = await fetch('/api/chat', { method:'POST', body: JSON.stringify({ message: input }), signal: controllerRef.current.signal })
    if (!res.ok || !res.body) { let t='Request failed'; try{t=await res.text()}catch{}; setLog(p=>p+`\n\n⚠️ ${t}`); return }
    setLog(p=>p+`\n\nAssistant: `)
    const reader = res.body.getReader(); const decoder = new TextDecoder()
    while(true){ const {value, done} = await reader.read(); if(done) break; setLog(p=>p+decoder.decode(value)) }
    setInput('')
  }
  return (
    <div className="space-y-4 rounded-xl p-6 bg-blue-700 text-white">
	
	    <BackHome
          linkClass="text-white/90 hover:text-white"
          sepClass="text-white/50"
        />
	
     <h1 className="text-2xl font-bold">AI Assistant</h1>
	 
	<div className="border border-blue-300/40 rounded-xl p-3 h-80 overflow-auto whitespace-pre-wrap text-sm bg-blue-900 text-white">

      {log || 'Start a conversation...'}
    </div>
 
    <div className="flex gap-2">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask about a topic..."
        className="flex-1 border rounded-xl px-3 py-2 text-gray-900"
      />
      <button onClick={send} className="px-4 py-2 rounded-xl border bg-white text-blue-700">
        Send
      </button>
    </div>
    {/* (Optional) tip line — remove or change as you like */}
    <p className="text-xs text-blue-100">
	
     {/* show 3 tips at once, rotate every 6s */}
		<ChatTips
		count={5}
		intervalMs={8000}
		offline={process.env.LLM_OFFLINE === 'on'}
		onPick={(t) => setInput(t)}   // remove this line if you don’t want click-to-fill
		className="text-white/85"
		/>
    </p>	

     </div>
  )
}
