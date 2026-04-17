'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string
  role: 'ai' | 'user'
  text: string
  timestamp: Date
  showSuggestions?: boolean
}

// ─── Response engine ──────────────────────────────────────────────────────────

const QUICK_REPLIES = [
  "What's the best family car?",
  'How does buying work?',
  'Compare SU7 vs YU7',
  "What's included with purchase?",
]

function generateResponse(input: string): string {
  const msg = input.toLowerCase()

  if (/su7 ultra|ultra/.test(msg)) {
    return "The SU7 Ultra is Xiaomi's hypercar-level sedan — 1,526 HP, 0-100 in 1.98 seconds, and a Nürburgring record. Purchase price from AED 379,900 — with flexible financing available. A true icon for driving enthusiasts."
  }
  if (/su7 max|max/.test(msg)) {
    return "The SU7 Max delivers dual-motor AWD with 673 HP and a 2.78s 0-100 sprint, all with an 800 km range. Purchase price from AED 189,900 — or finance from AED 2,199/month over 36 months."
  }
  if (/su7 pro|pro/.test(msg)) {
    return "The SU7 Pro is built for range: 830 km CLTC on a single charge with the CATL Qilin battery. If you cover long distances, this is your car. Purchase from AED 154,900, or finance from AED 1,399/month."
  }
  if (/su7|sedan/.test(msg)) {
    return "The SU7 lineup covers every need — Standard from AED 129,900, Pro for 830 km range, Max for supercar performance, Ultra for a Nürburgring record. All available with flexible financing. Which variant interests you most?"
  }
  if (/yu7|suv|family|kids|children|space/.test(msg)) {
    return "The Xiaomi YU7 is our flagship SUV — 681 HP dual-motor AWD, 760 km range, air suspension, and a stunning 3-screen cockpit. Perfect for families. Purchase from AED 169,900 with financing available."
  }
  if (/compare|vs|versus|difference/.test(msg)) {
    return "The SU7 is a sleek performance sedan ideal for city and highway driving. The YU7 is a premium SUV with more space, higher seating, and air suspension — ideal for families. Both run Xiaomi HyperOS. What matters most — space or performance?"
  }
  if (/price|cost|budget|afford|month|aed/.test(msg)) {
    return "Prices start from AED 129,900 for the SU7 Standard — with comprehensive warranty, free registration, and 24/7 roadside assistance included. Flexible financing from AED 1,099/month over 36 months. The YU7 starts at AED 169,900."
  }
  if (/range|battery|charge|km|kilometre/.test(msg)) {
    return "Range by model: SU7 Standard (700 km), SU7 Pro (830 km), SU7 Max (800 km), SU7 Ultra (630 km), YU7 (760 km). All CLTC figures. Even the lowest range is ample for UAE daily driving."
  }
  if (/buy|how|process|purchase|sign|contract|start/.test(msg)) {
    return "Buying is simple: choose your model and preferred finance term (12, 24 or 36 months), fill in your details, and our team confirms pricing and availability within 24 hours. Every purchase includes a comprehensive warranty, free registration, and 24/7 roadside assistance."
  }
  if (/include|inclusive|warranty|maintenance|registration/.test(msg)) {
    return "Every purchase includes: a comprehensive warranty, free UAE first-year registration, 24/7 roadside assistance, and a full service package. One price — nothing else to worry about."
  }
  if (/performance|fast|sport|speed|0-100|acceleration/.test(msg)) {
    return "For performance: SU7 Max (673 HP, 2.78s 0-100) and SU7 Ultra (1,526 HP, 1.98s 0-100) are exceptional. The YU7 also delivers 681 HP with a 3.23s sprint. What's your priority — daily driving or hypercar-level thrills?"
  }
  if (/tech|technology|software|hyper|hyperos|screen|display/.test(msg)) {
    return "All Xiaomi cars run HyperOS — deeply integrated with your Xiaomi devices. Every model includes a 16.1\" 3K display, OTA updates, and NOA autonomous driving assistance. The YU7 adds a full 3-screen cockpit."
  }
  if (/hello|hi|hey|good/.test(msg)) {
    return "Hello. I'm Xara, your Xiaomi AI advisor. Tell me what you're looking for and I'll find the right model and purchase option for you."
  }

  return "I'd suggest starting with our SU7 lineup — from the accessible SU7 Standard at AED 129,900 to the record-breaking SU7 Ultra. If space matters, the YU7 SUV is exceptional. Want me to walk you through the options?"
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit', hour12: true })
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 9)
}

// ─── Initial message ──────────────────────────────────────────────────────────

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'ai',
  text: "Hi, I'm Xara — your Xiaomi AI advisor. Tell me about your lifestyle or ask about any model and I'll find your perfect Xiaomi to own.",
  timestamp: new Date(),
  showSuggestions: true,
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
  @keyframes xaraSlideUp {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  @keyframes xaraMsgIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes xaraDot {
    0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
    40%           { opacity: 0.9;  transform: translateY(-3px); }
  }

  .xara-panel {
    position: fixed;
    bottom: 110px;
    right: 28px;
    width: 380px;
    max-width: calc(100vw - 32px);
    height: 540px;
    background: #080808;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 9997;
    animation: xaraSlideUp 0.32s cubic-bezier(0.22,1,0.36,1);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .xara-header {
    height: 56px;
    padding: 0 16px;
    background: #0a0a0a;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .xara-logo {
    width: 28px;
    height: 28px;
    border-radius: 2px;
    background: #E31937;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .xara-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.06) transparent;
  }
  .xara-messages::-webkit-scrollbar { width: 3px; }
  .xara-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }

  .xara-msg { animation: xaraMsgIn 0.26s cubic-bezier(0.22,1,0.36,1) both; }

  /* AI — left red accent border */
  .xara-ai-bubble {
    border-left: 2px solid #E31937;
    padding: 10px 14px 10px 14px;
    background: rgba(255,255,255,0.03);
    display: inline-block;
    max-width: 90%;
  }

  /* User — subtle elevated block */
  .xara-user-bubble {
    padding: 10px 14px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.09);
    max-width: 85%;
  }

  .xara-qr {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }
  .xara-qr-btn {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    padding: 5px 12px;
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    font-family: inherit;
    letter-spacing: 0;
    line-height: 1.4;
  }
  .xara-qr-btn:hover {
    border-color: rgba(227,25,55,0.5);
    color: #E31937;
    background: rgba(227,25,55,0.05);
  }

  .xara-input-bar {
    padding: 10px 12px;
    background: #0a0a0a;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    gap: 8px;
    align-items: center;
    flex-shrink: 0;
  }

  .xara-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    padding: 9px 14px;
    font-size: 13px;
    color: #fff;
    font-family: inherit;
    transition: border-color 0.2s;
  }
  .xara-input::placeholder { color: rgba(255,255,255,0.2); }
  .xara-input:focus { outline: none; border-color: rgba(227,25,55,0.4); }
  .xara-input:disabled { opacity: 0.45; }

  .xara-send {
    width: 36px;
    height: 36px;
    border-radius: 2px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s, transform 0.15s;
  }
  .xara-send:enabled:hover { transform: scale(1.06); }
  .xara-send:active { transform: scale(0.94); }

  .xara-close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255,255,255,0.28);
    padding: 4px;
    display: flex;
    align-items: center;
    border-radius: 2px;
    transition: color 0.15s;
    flex-shrink: 0;
  }
  .xara-close-btn:hover { color: rgba(255,255,255,0.75); }

  @media (max-width: 480px) {
    .xara-panel { right: 12px; left: 12px; width: auto; bottom: 90px; }
  }
`

// ─── Component ────────────────────────────────────────────────────────────────

export default function AIConcierge({ hideFab = false }: { hideFab?: boolean }) {
  const [isOpen, setIsOpen]         = useState(false)
  const [messages, setMessages]     = useState<Message[]>([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping]     = useState(false)
  const messagesEndRef               = useRef<HTMLDivElement>(null)
  const inputRef                     = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('open-concierge', handler)
    return () => window.removeEventListener('open-concierge', handler)
  }, [])

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, isOpen])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300)
  }, [isOpen])

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMsg: Message = { id: generateId(), role: 'user', text: trimmed, timestamp: new Date() }
    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const aiMsg: Message = { id: generateId(), role: 'ai', text: generateResponse(trimmed), timestamp: new Date() }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1100)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(inputValue)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* FAB — rendered only when not managed by FloatingHub */}
      {!hideFab && (
        <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 9998 }}>
          <button
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? 'Close AI Advisor' : 'Ask Xara — AI Advisor'}
            style={{
              height: '44px', padding: '0 18px 0 14px', borderRadius: '2px',
              background: isOpen ? '#111' : '#E31937',
              border: isOpen ? '1px solid rgba(255,255,255,0.12)' : 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)', transition: 'background 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {isOpen
              ? <X size={15} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
            }
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
              {isOpen ? 'Close' : 'Ask Xara'}
            </span>
          </button>
        </div>
      )}

      {/* ── Chat panel ──────────────────────────────────────────────────────── */}
      {isOpen && (
        <div role="dialog" aria-label="Xara AI Advisor" className="xara-panel">

          {/* ── Header ── */}
          <div className="xara-header">
            <div className="xara-logo">
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>XI</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Xara</span>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#22c55e', boxShadow: '0 0 5px rgba(34,197,94,0.5)',
                }} />
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '1px' }}>
                AI Advisor · Xiaomi Cars UAE
              </div>
            </div>
            <button className="xara-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={15} strokeWidth={1.5} />
            </button>
          </div>

          {/* ── Messages ── */}
          <div className="xara-messages">
            {messages.map((msg) => (
              <div key={msg.id} className="xara-msg">

                {/* AI message */}
                {msg.role === 'ai' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
                    <div className="xara-ai-bubble">
                      <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '13px', lineHeight: 1.65, margin: 0 }}>
                        {msg.text}
                      </p>
                    </div>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', paddingLeft: '16px' }}>
                      Xara · {formatTime(msg.timestamp)}
                    </span>
                    {msg.showSuggestions && (
                      <div className="xara-qr">
                        {QUICK_REPLIES.map((reply) => (
                          <button key={reply} className="xara-qr-btn" onClick={() => sendMessage(reply)}>
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* User message */}
                {msg.role === 'user' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                    <div className="xara-user-bubble">
                      <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '13px', lineHeight: 1.65, margin: 0 }}>
                        {msg.text}
                      </p>
                    </div>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', paddingRight: '2px' }}>
                      You · {formatTime(msg.timestamp)}
                    </span>
                  </div>
                )}

              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="xara-msg">
                <div className="xara-ai-bubble" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '12px 16px' }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.35)',
                      animation: `xaraDot 1.2s ease-in-out ${i * 0.18}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input bar ── */}
          <div className="xara-input-bar">
            <input
              ref={inputRef}
              className="xara-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about any model…"
              disabled={isTyping}
            />
            <button
              className="xara-send"
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              style={{ background: inputValue.trim() ? '#E31937' : 'rgba(255,255,255,0.06)' }}
            >
              <Send size={14} color={inputValue.trim() ? '#fff' : 'rgba(255,255,255,0.2)'} strokeWidth={1.5} />
            </button>
          </div>

        </div>
      )}
    </>
  )
}
