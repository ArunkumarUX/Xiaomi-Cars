'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { X, ChevronLeft, Check, Upload, Car } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage =
  | 'welcome'
  | 'browse_category'
  | 'browse_cars'
  | 'car_detail'
  | 'quote_form'
  | 'quote_review'
  | 'processing'
  | 'approved'
  | 'declined'
  | 'upload_docs'
  | 'verifying'
  | 'schedule'
  | 'confirmed'

type Category = 'sedan' | 'suv' | null

interface CarData {
  id: string
  name: string
  specs: string
  price: string
  img: string
  hp: string
  range: string
  drive: string
}

interface QuoteForm {
  name: string
  email: string
  phone: string
  term: 24 | 36
  emirate: string
}

interface DocStatus {
  emiratesId: 'pending' | 'uploaded'
  licence: 'pending' | 'uploaded'
  salary: 'pending' | 'uploaded'
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SU7_CDN = 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/su7_20260319/pc'
const YU7_CDN = 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/yu7_20250626/pc'

const SEDANS: CarData[] = [
  {
    id: 'su7',
    name: 'SU7',
    specs: '299HP · 700km · RWD',
    price: 'AED 129,900',
    img: `${SU7_CDN}/6-1.png`,
    hp: '299 HP',
    range: '700 km',
    drive: 'RWD',
  },
  {
    id: 'su7-pro',
    name: 'SU7 Pro',
    specs: '299HP · 830km · RWD',
    price: 'AED 154,900',
    img: `${SU7_CDN}/6-2.png`,
    hp: '299 HP',
    range: '830 km',
    drive: 'RWD',
  },
  {
    id: 'su7-max',
    name: 'SU7 Max',
    specs: '673HP · 800km · AWD',
    price: 'AED 189,900',
    img: `${SU7_CDN}/6-7.png`,
    hp: '673 HP',
    range: '800 km',
    drive: 'AWD',
  },
  {
    id: 'su7-ultra',
    name: 'SU7 Ultra',
    specs: '1526HP · 630km · AWD',
    price: 'AED 379,900',
    img: '/images/cars/su7-ultra.jpg',
    hp: '1526 HP',
    range: '630 km',
    drive: 'AWD',
  },
]

const SUVS: CarData[] = [
  {
    id: 'yu7',
    name: 'YU7',
    specs: '681HP · 760km · AWD',
    price: 'AED 169,900',
    img: `${YU7_CDN}/9.2.png`,
    hp: '681 HP',
    range: '760 km',
    drive: 'AWD',
  },
]

const INCLUDED_ITEMS = [
  'Comprehensive Warranty',
  'Free First-Year Registration',
  '24/7 Roadside Assistance',
  'Full Service Package',
]

const SHOWROOMS = [
  'Dubai Marina Showroom',
  'Downtown Dubai',
  'DIFC',
  'Abu Dhabi – Corniche',
]

// Progress steps for top line segments (7 main)
const PROGRESS_STAGES: Stage[] = [
  'browse_category',
  'browse_cars',
  'car_detail',
  'quote_form',
  'approved',
  'upload_docs',
  'confirmed',
]

function generateRef(): string {
  return 'XM-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}

function getNextSevenDays(): Date[] {
  const days: Date[] = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

function formatDay(date: Date): string {
  return date.toLocaleDateString('en-AE', { weekday: 'short', day: 'numeric', month: 'short' })
}

function getPriceNumber(price: string): number {
  const match = price.match(/[\d,]+/)
  if (!match) return 0
  return parseInt(match[0].replace(',', ''), 10)
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FloatingLeaseChatbot({ hideFab = false }: { hideFab?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOverLight, setIsOverLight] = useState(false)
  const [stage, setStage] = useState<Stage>('welcome')
  const [history, setHistory] = useState<Stage[]>([])
  const [stageKey, setStageKey] = useState(0) // triggers re-animation

  // Selections
  const [selectedCategory, setSelectedCategory] = useState<Category>(null)
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null)
  const [quoteForm, setQuoteForm] = useState<QuoteForm>({
    name: '',
    email: '',
    phone: '',
    term: 36,
    emirate: 'Dubai',
  })
  const [docStatus, setDocStatus] = useState<DocStatus>({
    emiratesId: 'pending',
    licence: 'pending',
    salary: 'pending',
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedShowroom, setSelectedShowroom] = useState<string>('')
  const [quoteRef] = useState<string>(generateRef())

  const contentRef = useRef<HTMLDivElement>(null)

  // Scroll content to top on stage change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [stage])

  // Listen for external open trigger
  useEffect(() => {
    const handler = () => setIsOpen(true)
    window.addEventListener('open-lease-chatbot', handler)
    return () => window.removeEventListener('open-lease-chatbot', handler)
  }, [])

  const goTo = useCallback((next: Stage, pushCurrent = true) => {
    if (pushCurrent) {
      setHistory((prev) => [...prev, stage])
    }
    setStage(next)
    setStageKey((k) => k + 1)
  }, [stage])

  const goBack = useCallback(() => {
    setHistory((prev) => {
      const copy = [...prev]
      const prev_stage = copy.pop()
      if (prev_stage) {
        setStage(prev_stage)
        setStageKey((k) => k + 1)
      }
      return copy
    })
  }, [])

  // Auto-advance: processing -> approved
  useEffect(() => {
    if (stage === 'processing') {
      const t = setTimeout(() => goTo('approved', false), 2800)
      return () => clearTimeout(t)
    }
  }, [stage, goTo])

  // Auto-advance: verifying -> schedule
  useEffect(() => {
    if (stage === 'verifying') {
      const t = setTimeout(() => goTo('schedule', false), 2500)
      return () => clearTimeout(t)
    }
  }, [stage, goTo])

  // Scroll-adaptive FAB color: detect background luminance at button position
  useEffect(() => {
    function detectBackground() {
      const x = window.innerWidth / 2
      const y = window.innerHeight - 110
      const elements = document.elementsFromPoint(x, y)
      for (const el of elements) {
        const bg = getComputedStyle(el).backgroundColor
        if (!bg || bg === 'transparent' || bg === 'rgba(0, 0, 0, 0)') continue
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (!match) continue
        const r = parseInt(match[1], 10)
        const g = parseInt(match[2], 10)
        const b = parseInt(match[3], 10)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        setIsOverLight(luminance > 0.55)
        return
      }
      setIsOverLight(false)
    }

    detectBackground()
    window.addEventListener('scroll', detectBackground, { passive: true })
    window.addEventListener('resize', detectBackground, { passive: true })
    return () => {
      window.removeEventListener('scroll', detectBackground)
      window.removeEventListener('resize', detectBackground)
    }
  }, [])

  const allDocsUploaded =
    docStatus.emiratesId === 'uploaded' &&
    docStatus.licence === 'uploaded' &&
    docStatus.salary === 'uploaded'

  const scheduleReady = selectedDate !== null && selectedTime !== '' && selectedShowroom !== ''

  const cars = selectedCategory === 'sedan' ? SEDANS : SUVS

  // Progress segment index
  const currentProgressIndex = PROGRESS_STAGES.indexOf(stage)

  const purchasePrice = selectedCar ? getPriceNumber(selectedCar.price) : 0
  const estMonthly = quoteForm.term > 0 ? Math.round(purchasePrice / quoteForm.term) : 0

  const css = `
        @keyframes leaseChatSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes leasePulseRing {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.6);  opacity: 0; }
          100% { transform: scale(1.6);  opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes leaseSpinOuter {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes leaseCheckIn {
          0%   { opacity: 0; transform: scale(0.4); }
          60%  { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes leaseShimmer {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(320%)  skewX(-15deg); }
        }
        @keyframes leaseBounceIn {
          0%   { opacity:0; transform: scale(0.7) translateY(12px); }
          60%  { transform: scale(1.06) translateY(-2px); }
          80%  { transform: scale(0.97) translateY(0); }
          100% { opacity:1; transform: scale(1) translateY(0); }
        }
        @keyframes leaseCarDrive {
          0%   { transform: translateX(0); }
          50%  { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }
        .lc-input::placeholder { color: rgba(255,255,255,0.2); }
        .lc-input:focus { outline: none; border-color: rgba(255,255,255,0.2) !important; }
        .lc-select { appearance: none; -webkit-appearance: none; }
        .lc-select:focus { outline: none; border-color: rgba(255,255,255,0.2) !important; }
        .lc-car-card:hover { border-color: rgba(227,25,55,0.3) !important; }
        .lc-car-card:hover .lc-select-btn { background: #E31937 !important; color: #fff !important; }
        .lc-scrollbar::-webkit-scrollbar { width: 4px; }
        .lc-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .lc-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.06); border-radius: 2px; }
        .lc-cat-card:hover { border-color: rgba(227,25,55,0.4) !important; }
        .lc-cat-card:hover .lc-cat-inner { border-left: 2px solid #E31937 !important; }
        .lc-doc-row:hover { background: rgba(255,255,255,0.03) !important; }
        .lc-fab-btn { animation: leaseBounceIn 0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .lc-fab-btn:hover { transform: scale(1.04) !important; }
        .lc-fab-btn:hover .lc-fab-shimmer { animation: leaseShimmer 0.7s ease forwards !important; }
        .lc-fab-btn:hover .lc-fab-icon { animation: leaseCarDrive 0.5s ease-in-out 2; }
        .lc-fab-shimmer {
          position: absolute; inset: 0; border-radius: 2px;
          overflow: hidden; pointer-events: none;
        }
        .lc-fab-shimmer::after {
          content: '';
          position: absolute; top: 0; bottom: 0; width: 35%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-120%) skewX(-15deg);
        }
        @media (max-width: 480px) {
          .lc-fab-wrap { bottom: 76px !important; right: 16px !important; }
          .lc-chat-panel { right: 12px !important; left: 12px !important; width: auto !important; bottom: 136px !important; }
        }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ── FAB Button ──────────────────────────────────────────────────────────── */}
      {!hideFab && <div
        className="lc-fab-wrap"
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '28px',
          zIndex: 9999,
        }}
      >
        {/* Pulse ring */}
        {!isOpen && (
          <div
            style={{
              position: 'absolute',
              inset: '-3px',
              borderRadius: '2px',
              border: `1px solid ${isOverLight ? 'rgba(0,0,0,0.2)' : 'rgba(227,25,55,0.4)'}`,
              animation: 'leasePulseRing 2.8s cubic-bezier(0.215,0.61,0.355,1) infinite',
              pointerEvents: 'none',
            }}
          />
        )}

        <button
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? 'Close Buy Chat' : 'Buy Now'}
          className="lc-fab-btn"
          style={{
            height: '44px',
            padding: '0 18px 0 14px',
            borderRadius: '2px',
            background: isOpen ? 'rgba(255,255,255,0.06)' : isOverLight ? 'rgba(255,255,255,0.95)' : 'transparent',
            border: isOpen
              ? '1px solid rgba(255,255,255,0.12)'
              : isOverLight
              ? '1px solid rgba(0,0,0,0.12)'
              : '1px solid rgba(227,25,55,0.65)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: !isOpen && isOverLight
              ? '0 4px 20px rgba(0,0,0,0.12)'
              : '0 8px 28px rgba(0,0,0,0.4)',
            transition: 'background 0.25s, border-color 0.2s',
            position: 'relative',
            zIndex: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {/* Shimmer on hover */}
          {!isOpen && <span className="lc-fab-shimmer" />}

          {isOpen ? (
            <X size={16} color="rgba(255,255,255,0.7)" strokeWidth={1.5} />
          ) : (
            <svg className="lc-fab-icon" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={isOverLight ? '#111' : '#E31937'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v4a2 2 0 0 1-2 2h-2"/>
              <circle cx="7" cy="17" r="2"/>
              <circle cx="17" cy="17" r="2"/>
            </svg>
          )}
          <span style={{ fontSize: '13px', fontWeight: 600, color: isOpen ? 'rgba(255,255,255,0.7)' : isOverLight ? '#111' : '#fff', letterSpacing: '-0.01em' }}>
            Buy Now
          </span>
        </button>
      </div>}

      {/* ── Chat Window ─────────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Xiaomi Buy Chat"
          className="lc-chat-panel"
          style={{
            position: 'fixed',
            bottom: '110px',
            right: '28px',
            width: '400px',
            maxWidth: 'calc(100vw - 32px)',
            height: '580px',
            background: '#080808',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9997,
            animation: 'leaseChatSlideUp 0.38s cubic-bezier(0.22,1,0.36,1)',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          }}
        >
          {/* ── Progress line — thin segments at very top, shown when in a flow stage ── */}
          {currentProgressIndex >= 0 && (
            <div
              style={{
                display: 'flex',
                gap: '3px',
                padding: '0',
                flexShrink: 0,
                height: '3px',
              }}
            >
              {PROGRESS_STAGES.map((s, idx) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: '3px',
                    background: idx <= currentProgressIndex
                      ? '#fff'
                      : 'rgba(255,255,255,0.12)',
                    transition: 'background 0.3s',
                  }}
                />
              ))}
            </div>
          )}

          {/* ── Header — 56px ── */}
          <div
            style={{
              height: '56px',
              padding: '0 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
              background: '#0a0a0a',
            }}
          >
            {/* Back arrow — shown when history exists */}
            {history.length > 0 && ['browse_category', 'browse_cars', 'car_detail', 'quote_form', 'quote_review', 'upload_docs', 'schedule'].includes(stage) && (
              <button
                onClick={goBack}
                aria-label="Go back"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.4)',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '2px',
                  flexShrink: 0,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#E31937' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)' }}
              >
                <ChevronLeft size={18} strokeWidth={1.5} />
              </button>
            )}

            {/* XI logo square */}
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '2px',
                background: '#E31937',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>XI</span>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Buy Now
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1px' }}>
                Xiaomi Cars UAE
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.3)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '2px',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.color = 'rgba(255,255,255,0.75)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.color = 'rgba(255,255,255,0.3)'
              }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* ── Content ── */}
          <div
            ref={contentRef}
            className="lc-scrollbar"
            style={{
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.06) transparent',
              background: '#080808',
            }}
          >
            <div
              key={stageKey}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                animation: 'fadeUp 0.28s ease both',
              }}
            >
              {/* ════════════════════════════════ WELCOME ════════════════════════ */}
              {stage === 'welcome' && (
                <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                  {/* Full-bleed hero image */}
                  <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section4x1281.jpg"
                      alt="Xiaomi Car"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }}
                    />
                    {/* Dark gradient scrim */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.9) 100%)' }} />

                    {/* Top label */}
                    <div style={{ position: 'absolute', top: 20, left: 20, display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ height: '1px', width: '20px', background: '#E31937' }} />
                      <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                        Xiaomi Cars UAE
                      </span>
                    </div>

                    {/* Bottom text overlay */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 22px 24px' }}>
                      <h1 style={{ fontSize: '32px', lineHeight: 0.95, margin: '0 0 10px', letterSpacing: '-0.04em' }}>
                        <span style={{ fontWeight: 200, color: '#fff', display: 'block' }}>Own a</span>
                        <span style={{ fontWeight: 800, color: '#fff', display: 'block' }}>Xiaomi Car.</span>
                      </h1>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                        Warranty included · Free registration · Flexible financing
                      </p>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#E31937', margin: 0, letterSpacing: '-0.01em' }}>
                        From AED 129,900
                      </p>
                    </div>
                  </div>

                  {/* CTA bar */}
                  <div style={{ padding: '16px 20px', background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                    {/* 3 stat chips */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                      {[['5', 'Models'], ['AED', '129,900+'], ['100%', 'Warranty']].map(([val, label]) => (
                        <div key={label} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '2px', padding: '10px 8px', textAlign: 'center' }}>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{val}</div>
                          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '3px' }}>{label}</div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => goTo('browse_category')}
                      style={{
                        width: '100%',
                        background: '#E31937',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '13px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#fff',
                        cursor: 'pointer',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#C41630' }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.background = '#E31937' }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════ BROWSE CATEGORY ═════════════════════ */}
              {stage === 'browse_category' && (
                <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <div style={{ height: '1px', width: '16px', background: '#E31937' }} />
                    <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                      Select a series
                    </span>
                  </div>

                  {[
                    {
                      category: 'sedan' as Category,
                      series: 'SU7 Series',
                      sub: 'Performance sedan · From AED 129,900',
                      img: `${SU7_CDN}/6-1.png`,
                      tag: '4 models',
                    },
                    {
                      category: 'suv' as Category,
                      series: 'YU7 Series',
                      sub: 'Flagship SUV · From AED 169,900',
                      img: `${YU7_CDN}/9.2.png`,
                      tag: '1 model',
                    },
                  ].map((item) => (
                    <button
                      key={item.series}
                      className="lc-cat-card"
                      onClick={() => {
                        setSelectedCategory(item.category)
                        goTo('browse_cars')
                      }}
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '2px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        height: '110px',
                        cursor: 'pointer',
                        display: 'block',
                        textAlign: 'left',
                        padding: 0,
                        transition: 'border-color 0.2s',
                        background: '#0d0d0d',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.img} alt={item.series} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0 }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.1) 100%)' }} />
                      <div style={{ position: 'absolute', inset: 0, padding: '16px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                          <div>
                            <p style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{item.series}</p>
                            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{item.sub}</p>
                          </div>
                          <span style={{
                            background: 'rgba(227,25,55,0.9)',
                            borderRadius: '2px',
                            padding: '4px 9px',
                            fontSize: '9px',
                            fontWeight: 600,
                            color: '#fff',
                            flexShrink: 0,
                            marginLeft: '8px',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                          }}>{item.tag}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* ═══════════════════════════ BROWSE CARS ═════════════════════════ */}
              {stage === 'browse_cars' && (
                <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {cars.map((car) => (
                    <div
                      key={car.id}
                      className="lc-car-card"
                      style={{
                        background: '#0d0d0d',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '2px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'border-color 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(227,25,55,0.3)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)' }}
                    >
                      {/* Car image — 45% of card height */}
                      <div style={{ position: 'relative', width: '100%', height: '100px', overflow: 'hidden', background: '#080808' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={car.img} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 55%)' }} />
                      </div>

                      {/* Specs below */}
                      <div style={{ padding: '10px 14px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '13px', fontWeight: 700, color: '#fff', margin: '0 0 3px', letterSpacing: '-0.01em' }}>{car.name}</p>
                          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{car.specs}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#E31937', letterSpacing: '-0.01em' }}>{car.price}</span>
                          <button
                            className="lc-select-btn"
                            onClick={() => {
                              setSelectedCar(car)
                              goTo('car_detail')
                            }}
                            style={{
                              background: 'transparent',
                              border: '1px solid rgba(255,255,255,0.15)',
                              borderRadius: '2px',
                              padding: '5px 12px',
                              fontSize: '10px',
                              fontWeight: 600,
                              color: 'rgba(255,255,255,0.6)',
                              cursor: 'pointer',
                              transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                              letterSpacing: '0.06em',
                              textTransform: 'uppercase',
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#C41630'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#C41630'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.6)' }}
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ═══════════════════════════ CAR DETAIL ═════════════════════════ */}
              {stage === 'car_detail' && selectedCar && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Hero image */}
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedCar.img}
                      alt={selectedCar.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '55%',
                        background: 'linear-gradient(to top, #080808, transparent)',
                      }}
                    />
                  </div>

                  <div style={{ padding: '14px 20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Name + price */}
                    <div>
                      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                        {selectedCar.name}
                      </h2>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: '#E31937', margin: 0 }}>{selectedCar.price}</p>
                    </div>

                    {/* Spec chips — no emojis */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {[
                        { label: selectedCar.hp, key: 'HP' },
                        { label: selectedCar.range, key: 'Range' },
                        { label: selectedCar.drive, key: 'Drive' },
                      ].map((spec) => (
                        <div
                          key={spec.key}
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '2px',
                            padding: '6px 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2px',
                            flex: 1,
                          }}
                        >
                          <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.18em' }}>{spec.key}</span>
                          <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{spec.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* What's included */}
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '2px',
                        padding: '14px 16px',
                      }}
                    >
                      <p style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.45)', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.18em' }}>
                        What's Included
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {INCLUDED_ITEMS.map((item) => (
                          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div
                              style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '2px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              <Check size={9} color="rgba(255,255,255,0.7)" strokeWidth={2.5} />
                            </div>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => goTo('quote_form')}
                      style={{
                        width: '100%',
                        background: '#E31937',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '14px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        marginTop: '4px',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.background = '#C41630'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.background = '#E31937'
                      }}
                    >
                      Buy This Car
                    </button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════ QUOTE FORM ═════════════════════════ */}
              {stage === 'quote_form' && (
                <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Full Name */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Full Name</label>
                    <input
                      className="lc-input"
                      type="text"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '2px',
                        padding: '11px 14px',
                        fontSize: '13px',
                        color: '#fff',
                        transition: 'border-color 0.2s',
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Email</label>
                    <input
                      className="lc-input"
                      type="email"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@example.com"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '2px',
                        padding: '11px 14px',
                        fontSize: '13px',
                        color: '#fff',
                        transition: 'border-color 0.2s',
                      }}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Phone</label>
                    <input
                      className="lc-input"
                      type="tel"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+971 5x xxx xxxx"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '2px',
                        padding: '11px 14px',
                        fontSize: '13px',
                        color: '#fff',
                        transition: 'border-color 0.2s',
                      }}
                    />
                  </div>

                  {/* Lease Term */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                    <label style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Finance Term</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {([24, 36] as const).map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuoteForm((f) => ({ ...f, term }))}
                          style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '2px',
                            border: quoteForm.term === term ? '1px solid #E31937' : '1px solid rgba(255,255,255,0.08)',
                            background: quoteForm.term === term ? 'rgba(227,25,55,0.08)' : 'rgba(255,255,255,0.03)',
                            color: quoteForm.term === term ? '#E31937' : 'rgba(255,255,255,0.4)',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {term} Months
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Emirates */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Emirates</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        className="lc-input lc-select"
                        value={quoteForm.emirate}
                        onChange={(e) => setQuoteForm((f) => ({ ...f, emirate: e.target.value }))}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '2px',
                          padding: '11px 36px 11px 14px',
                          fontSize: '13px',
                          color: '#fff',
                          transition: 'border-color 0.2s',
                          cursor: 'pointer',
                        }}
                      >
                        {['Dubai', 'Abu Dhabi', 'Sharjah', 'Other'].map((em) => (
                          <option key={em} value={em} style={{ background: '#0d0d0d' }}>{em}</option>
                        ))}
                      </select>
                      <div
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(255,255,255,0.3)',
                          pointerEvents: 'none',
                          fontSize: '10px',
                        }}
                      >
                        ▾
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => goTo('quote_review')}
                    disabled={!quoteForm.name || !quoteForm.email || !quoteForm.phone}
                    style={{
                      width: '100%',
                      background: quoteForm.name && quoteForm.email && quoteForm.phone ? '#E31937' : 'rgba(255,255,255,0.06)',
                      border: 'none',
                      borderRadius: '2px',
                      padding: '14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: quoteForm.name && quoteForm.email && quoteForm.phone ? '#fff' : 'rgba(255,255,255,0.2)',
                      cursor: quoteForm.name && quoteForm.email && quoteForm.phone ? 'pointer' : 'not-allowed',
                      transition: 'background 0.2s',
                      marginTop: '4px',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Submit Enquiry
                  </button>
                </div>
              )}

              {/* ═══════════════════════════ QUOTE REVIEW ════════════════════════ */}
              {stage === 'quote_review' && selectedCar && (
                <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Summary card */}
                  <div
                    style={{
                      background: '#0d0d0d',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '2px',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Car image strip */}
                    <div style={{ height: '80px', overflow: 'hidden', background: '#080808' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={selectedCar.img} alt={selectedCar.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div>
                          <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 3px' }}>{selectedCar.name}</p>
                          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{quoteForm.term}-month finance</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ fontSize: '15px', fontWeight: 700, color: '#E31937', margin: '0 0 2px' }}>{selectedCar.price}</p>
                          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>purchase price</p>
                        </div>
                      </div>

                      {/* Included items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                        {['Comprehensive Warranty', 'Free Registration', 'Full Service Package', 'Roadside Assistance'].map((item) => (
                          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Check size={10} color="rgba(255,255,255,0.5)" strokeWidth={2.5} />
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Est. monthly */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Est. monthly over {quoteForm.term} months</span>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>
                          AED {estMonthly.toLocaleString()}/mo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Applicant summary */}
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '2px',
                      padding: '12px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {[
                      { label: 'Name', val: quoteForm.name },
                      { label: 'Email', val: quoteForm.email },
                      { label: 'Phone', val: quoteForm.phone },
                      { label: 'Emirates', val: quoteForm.emirate },
                    ].map(({ label, val }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{label}</span>
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 500, maxWidth: '60%', textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button
                      onClick={goBack}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '2px',
                        padding: '12px 16px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.45)',
                        cursor: 'pointer',
                        flexShrink: 0,
                        transition: 'background 0.2s',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => goTo('processing')}
                      style={{
                        flex: 1,
                        background: '#E31937',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '12px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#C41630' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#E31937' }}
                    >
                      Confirm &amp; Submit
                    </button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════ PROCESSING ══════════════════════════ */}
              {stage === 'processing' && (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '40px 24px',
                  }}
                >
                  {/* Clean single-ring spinner with red top border */}
                  <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(255,255,255,0.06)',
                        borderTopColor: '#E31937',
                        animation: 'leaseSpinOuter 0.9s linear infinite',
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>
                      Processing your purchase enquiry
                    </p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      This takes just a moment
                    </p>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════ APPROVED ════════════════════════════ */}
              {stage === 'approved' && selectedCar && (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '32px 24px 24px',
                    gap: '16px',
                  }}
                >
                  {/* Check icon — clean, no confetti */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '2px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'leaseCheckIn 0.5s cubic-bezier(0.22,1,0.36,1) both',
                    }}
                  >
                    <Check size={28} color="#fff" strokeWidth={1.5} />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                      Approved
                    </h2>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>
                      Your purchase enquiry for <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{selectedCar.name}</strong> is confirmed
                    </p>
                  </div>

                  {/* Reference */}
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '2px',
                      padding: '14px 20px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Quote Reference</p>
                      <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '0.04em' }}>{quoteRef}</p>
                    </div>
                    {/* Monthly chip */}
                    <div
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '2px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#E31937',
                      }}
                    >
                      {selectedCar.price}
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: '4px' }}>
                    <button
                      onClick={() => goTo('upload_docs')}
                      style={{
                        width: '100%',
                        background: '#E31937',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '14px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#C41630' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#E31937' }}
                    >
                      Upload Documents
                    </button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════ DECLINED ════════════════════════════ */}
              {stage === 'declined' && (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '40px 24px 24px',
                    gap: '16px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '2px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'leaseCheckIn 0.5s cubic-bezier(0.22,1,0.36,1) both',
                    }}
                  >
                    <X size={28} color="rgba(255,255,255,0.5)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
                      Application Not Approved
                    </h2>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.7 }}>
                      You can reapply after 30 days or contact our team for assistance.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '8px' }}>
                    <button
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '2px',
                        padding: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Contact Us
                    </button>
                    <button
                      onClick={() => {
                        setStage('welcome')
                        setHistory([])
                        setSelectedCar(null)
                        setSelectedCategory(null)
                        setDocStatus({ emiratesId: 'pending', licence: 'pending', salary: 'pending' })
                        setSelectedDate(null)
                        setSelectedTime('')
                        setSelectedShowroom('')
                        setStageKey((k) => k + 1)
                      }}
                      style={{
                        flex: 1,
                        background: '#E31937',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#fff',
                        cursor: 'pointer',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════ UPLOAD DOCS ════════════════════════ */}
              {stage === 'upload_docs' && (
                <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Step indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(227,25,55,0.4)',
                        borderRadius: '2px',
                        padding: '4px 10px',
                        fontSize: '10px',
                        fontWeight: 600,
                        color: '#E31937',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Step 1 of 3
                    </div>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Identity verification</span>
                  </div>

                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: 0, lineHeight: 1.6 }}>
                    Please upload the following documents to complete your purchase application.
                  </p>

                  {/* Doc rows */}
                  {[
                    { key: 'emiratesId' as keyof DocStatus, label: 'Emirates ID', sub: 'Front + back photo' },
                    { key: 'licence' as keyof DocStatus, label: 'UAE Driving Licence', sub: 'Valid licence' },
                    { key: 'salary' as keyof DocStatus, label: 'Proof of Income', sub: 'Last 3 months' },
                  ].map((doc) => (
                    <div
                      key={doc.key}
                      className="lc-doc-row"
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '2px',
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'background 0.15s',
                      }}
                    >
                      {/* Status indicator */}
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '2px',
                          background: docStatus[doc.key] === 'uploaded' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.04)',
                          border: docStatus[doc.key] === 'uploaded' ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'all 0.3s',
                        }}
                      >
                        {docStatus[doc.key] === 'uploaded' ? (
                          <Check size={14} color="rgba(255,255,255,0.8)" strokeWidth={2} />
                        ) : (
                          <Upload size={13} color="rgba(255,255,255,0.25)" strokeWidth={1.5} />
                        )}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>{doc.label}</p>
                        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{doc.sub}</p>
                      </div>

                      <button
                        onClick={() => setDocStatus((prev) => ({ ...prev, [doc.key]: 'uploaded' }))}
                        disabled={docStatus[doc.key] === 'uploaded'}
                        style={{
                          background: docStatus[doc.key] === 'uploaded' ? 'transparent' : 'transparent',
                          border: docStatus[doc.key] === 'uploaded' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(227,25,55,0.4)',
                          borderRadius: '2px',
                          padding: '6px 12px',
                          fontSize: '10px',
                          fontWeight: 600,
                          color: docStatus[doc.key] === 'uploaded' ? 'rgba(255,255,255,0.4)' : '#E31937',
                          cursor: docStatus[doc.key] === 'uploaded' ? 'default' : 'pointer',
                          flexShrink: 0,
                          transition: 'all 0.2s',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {docStatus[doc.key] === 'uploaded' ? 'Uploaded' : 'Upload'}
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => goTo('verifying')}
                    disabled={!allDocsUploaded}
                    style={{
                      width: '100%',
                      background: allDocsUploaded ? '#E31937' : 'rgba(255,255,255,0.05)',
                      border: 'none',
                      borderRadius: '2px',
                      padding: '14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: allDocsUploaded ? '#fff' : 'rgba(255,255,255,0.2)',
                      cursor: allDocsUploaded ? 'pointer' : 'not-allowed',
                      marginTop: '4px',
                      transition: 'background 0.3s, color 0.3s',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* ═══════════════════════════ VERIFYING ═══════════════════════════ */}
              {stage === 'verifying' && (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    padding: '40px 24px',
                  }}
                >
                  {/* Clean single-ring spinner */}
                  <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(255,255,255,0.06)',
                        borderTopColor: '#E31937',
                        animation: 'leaseSpinOuter 0.9s linear infinite',
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: '0 0 6px' }}>
                      Verifying your documents
                    </p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Secure document review in progress
                    </p>
                  </div>
                </div>
              )}

              {/* ═══════════════════════════ SCHEDULE ════════════════════════════ */}
              {stage === 'schedule' && (
                <div style={{ padding: '14px 18px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Choose your preferred date and showroom
                  </p>

                  {/* Date picker */}
                  <div>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 500 }}>
                      Pickup Date
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                      {getNextSevenDays().map((day, idx) => {
                        const isSelected = selectedDate?.toDateString() === day.toDateString()
                        return (
                          <button
                            key={idx}
                            onClick={() => setSelectedDate(day)}
                            style={{
                              background: isSelected ? 'rgba(227,25,55,0.08)' : 'rgba(255,255,255,0.03)',
                              border: isSelected ? '1px solid #E31937' : '1px solid rgba(255,255,255,0.08)',
                              borderRadius: '2px',
                              padding: '8px 10px',
                              fontSize: '12px',
                              fontWeight: isSelected ? 600 : 400,
                              color: isSelected ? '#E31937' : 'rgba(255,255,255,0.45)',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              textAlign: 'center',
                            }}
                          >
                            {formatDay(day)}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 500 }}>
                      Preferred Time
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        { label: 'Morning', sub: '9am – 12pm' },
                        { label: 'Afternoon', sub: '1pm – 5pm' },
                        { label: 'Evening', sub: '5pm – 8pm' },
                      ].map((slot) => {
                        const isSelected = selectedTime === slot.label
                        return (
                          <button
                            key={slot.label}
                            onClick={() => setSelectedTime(slot.label)}
                            style={{
                              background: isSelected ? 'rgba(227,25,55,0.07)' : 'rgba(255,255,255,0.03)',
                              border: isSelected ? '1px solid #E31937' : '1px solid rgba(255,255,255,0.07)',
                              borderRadius: '2px',
                              padding: '10px 14px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            <span style={{ fontSize: '13px', fontWeight: 600, color: isSelected ? '#E31937' : 'rgba(255,255,255,0.55)' }}>{slot.label}</span>
                            <span style={{ fontSize: '11px', color: isSelected ? 'rgba(227,25,55,0.6)' : 'rgba(255,255,255,0.25)' }}>{slot.sub}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Showroom */}
                  <div>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 500 }}>
                      Showroom
                    </p>
                    <div style={{ position: 'relative' }}>
                      <select
                        className="lc-input lc-select"
                        value={selectedShowroom}
                        onChange={(e) => setSelectedShowroom(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.04)',
                          border: `1px solid ${selectedShowroom ? 'rgba(227,25,55,0.4)' : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: '2px',
                          padding: '11px 36px 11px 14px',
                          fontSize: '13px',
                          color: selectedShowroom ? '#fff' : 'rgba(255,255,255,0.3)',
                          transition: 'border-color 0.2s',
                          cursor: 'pointer',
                        }}
                      >
                        <option value="" style={{ background: '#0d0d0d' }}>Select showroom...</option>
                        {SHOWROOMS.map((s) => (
                          <option key={s} value={s} style={{ background: '#0d0d0d' }}>{s}</option>
                        ))}
                      </select>
                      <div
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(255,255,255,0.3)',
                          pointerEvents: 'none',
                          fontSize: '10px',
                        }}
                      >
                        ▾
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => goTo('confirmed')}
                    disabled={!scheduleReady}
                    style={{
                      width: '100%',
                      background: scheduleReady ? '#E31937' : 'rgba(255,255,255,0.05)',
                      border: 'none',
                      borderRadius: '2px',
                      padding: '14px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: scheduleReady ? '#fff' : 'rgba(255,255,255,0.2)',
                      cursor: scheduleReady ? 'pointer' : 'not-allowed',
                      transition: 'background 0.3s, color 0.3s',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                    onMouseEnter={(e) => {
                      if (scheduleReady) (e.currentTarget as HTMLButtonElement).style.background = '#C41630'
                    }}
                    onMouseLeave={(e) => {
                      if (scheduleReady) (e.currentTarget as HTMLButtonElement).style.background = '#E31937'
                    }}
                  >
                    Confirm Pickup
                  </button>
                </div>
              )}

              {/* ═══════════════════════════ CONFIRMED ═══════════════════════════ */}
              {stage === 'confirmed' && selectedCar && (
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '28px 22px 24px',
                    gap: '16px',
                  }}
                >
                  {/* Clean check icon — no confetti */}
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '2px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'leaseCheckIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both',
                    }}
                  >
                    <Car size={32} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                      Booking Confirmed
                    </h2>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.7 }}>
                      Your <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{selectedCar.name}</strong> pickup is scheduled for{' '}
                      <strong style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                        {selectedDate ? formatDay(selectedDate) : ''}, {selectedTime}
                      </strong>
                    </p>
                  </div>

                  {/* Booking card */}
                  <div
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '2px',
                      padding: '14px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    {[
                      { label: 'Booking Ref', val: quoteRef },
                      { label: 'Showroom', val: selectedShowroom },
                      { label: 'Date', val: selectedDate ? formatDay(selectedDate) : '—' },
                      { label: 'Time', val: selectedTime },
                    ].map(({ label, val }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{label}</span>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '4px' }}>
                    <button
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '2px',
                        padding: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.45)',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s, color 0.2s',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.borderColor = 'rgba(255,255,255,0.22)'
                        el.style.color = 'rgba(255,255,255,0.7)'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement
                        el.style.borderColor = 'rgba(255,255,255,0.1)'
                        el.style.color = 'rgba(255,255,255,0.45)'
                      }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      style={{
                        flex: 1,
                        background: '#E31937',
                        border: 'none',
                        borderRadius: '2px',
                        padding: '12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#fff',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#C41630' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#E31937' }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
