'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, X, Check, Zap, Timer, Gauge, Activity } from 'lucide-react'
import { CARS } from '@/lib/data'
import type { ColorVariant } from '@/lib/types'
import LifeSimulator from '@/components/ai/LifeSimulator'
import TimeTravel from '@/components/ai/TimeTravel'

/** Convert a hex colour into a very dark rgba tint for background radial gradients */
function hexTint(hex: string, alpha = 0.20): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

/** Strip parenthetical suffixes like "(0-100)" so spec values fit cleanly in cards */
function cleanSpec(val?: string): string {
  return (val ?? '—').replace(/\s*\(.*?\)/, '').trim()
}

export default function CarDetailPage() {
  const params  = useParams()
  const car     = CARS.find((c) => c.slug === params.slug)

  const [imgError,       setImgError]       = useState(false)
  const [prevImage,      setPrevImage]      = useState<string | null>(null)
  const [selectedColor,  setSelectedColor]  = useState<ColorVariant | null>(car?.colorVariants?.[0] ?? null)
  const [contractTerm,   setContractTerm]   = useState<12 | 24 | 36>(36)
  const [stickyVisible,  setStickyVisible]  = useState(false)
  const [showModal,      setShowModal]      = useState(false)
  const [formName,       setFormName]       = useState('')
  const [formPhone,      setFormPhone]      = useState('')
  const [submitting,     setSubmitting]     = useState(false)
  const [success,        setSuccess]        = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      setStickyVisible(heroRef.current.getBoundingClientRect().bottom < 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808' }}>
        <div className="text-center">
          <h1 style={{ color: 'rgba(255,255,255,0.35)', fontSize: '18px', fontWeight: 300, marginBottom: '16px' }}>
            Vehicle not found
          </h1>
          <Link href="/cars" style={{ color: '#E31937', fontSize: '13px', textDecoration: 'none' }}>
            All Cars
          </Link>
        </div>
      </div>
    )
  }

  // ── Derived values ────────────────────────────────────────────────────────────
  const currentImage = selectedColor?.image ?? car.images[0]


  const specItems = [
    { label: 'Range',     value: cleanSpec(car.range),        Icon: Zap      },
    { label: '0 – 100',  value: cleanSpec(car.acceleration), Icon: Timer    },
    { label: 'Top Speed', value: cleanSpec(car.topSpeed),     Icon: Gauge    },
    { label: 'Power',     value: cleanSpec(car.horsepower),   Icon: Activity },
  ]

  const relatedCars = CARS.filter((c) => c.slug !== car.slug && c.condition !== 'Pre-Owned').slice(0, 3)

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleColorChange = (variant: ColorVariant) => {
    setPrevImage(currentImage)
    setSelectedColor(variant)
    setImgError(false)
    setTimeout(() => setPrevImage(null), 900)
  }

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSuccess(true) }, 1800)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setTimeout(() => { setSuccess(false); setFormName(''); setFormPhone('') }, 400)
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
    }}>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroFadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp     { from { opacity: 0; transform: translateY(28px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes modalIn     { from { opacity: 0; transform: translateY(20px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes spinRing    { to { transform: rotate(360deg) } }
        @keyframes checkBounce { from { opacity: 0; transform: scale(0.5) } to { opacity: 1; transform: scale(1) } }
        .spec-card:hover  { border-color: rgba(255,255,255,0.16) !important; }
        .feat-card:hover  { border-color: rgba(227,25,55,0.22) !important; }
        .rel-card:hover   { border-color: rgba(255,255,255,0.18) !important; transform: translateY(-4px) !important; }
      ` }} />

      {/* ─── STICKY TOP BAR ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '64px',
        background: 'rgba(8,8,8,0.92)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 clamp(1.25rem,3.5vw,3.5rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transform:  stickyVisible ? 'translateY(0)'    : 'translateY(-100%)',
        opacity:    stickyVisible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s',
        pointerEvents: stickyVisible ? 'auto' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Link href="/cars" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.35)', fontSize: '12px', textDecoration: 'none' }}>
            <ChevronLeft size={13} strokeWidth={1.5} /> All Cars
          </Link>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500, letterSpacing: '-0.02em' }}>{car.fullName}</span>
          {car.badge && (
            <span style={{ background: '#E31937', color: '#fff', fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '100px' }}>
              {car.badge}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>
            AED {car.price.toLocaleString()}
          </span>
          <button
            onClick={() => setShowModal(true)}
            style={{ background: '#E31937', color: '#fff', fontSize: '12px', fontWeight: 500, padding: '9px 22px', borderRadius: '100px', border: 'none', cursor: 'pointer' }}
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* ─── HERO ────────────────────────────────────────────────────────────── */}
      <div ref={heroRef} style={{ position: 'relative', width: '100%', height: '100svh', minHeight: '620px', overflow: 'hidden' }}>

        {/* Previous image fades out */}
        {prevImage && !imgError && (
          <img src={prevImage} alt="" aria-hidden style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0, transition: 'opacity 0.85s cubic-bezier(0.25,0.46,0.45,0.94)',
          }} />
        )}

        {/* Current image fades in */}
        {!imgError ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={`${car.fullName}${selectedColor ? ` — ${selectedColor.name}` : ''}`}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              animation: 'heroFadeIn 0.85s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '80px', fontWeight: 800, color: '#E31937', opacity: 0.1 }}>{car.model}</span>
          </div>
        )}

        {/* Gradient — clean dark bottom fade */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.6) 38%, rgba(8,8,8,0.15) 70%, transparent 100%)',
        }} />

        {/* Back link */}
        <div style={{ position: 'absolute', top: '84px', left: 'clamp(1.5rem,3.5vw,3.5rem)' }}>
          <Link href="/cars" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.5)', fontSize: '12px', textDecoration: 'none', letterSpacing: '0.08em', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)' }}
          >
            <ChevronLeft size={14} strokeWidth={1.5} /> All Cars
          </Link>
        </div>

        {/* Bottom overlay — colour picker pill sits just above car info */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 clamp(1.5rem,3.5vw,3.5rem) clamp(2.5rem,5vw,4rem)',
        }}>

          {/* ── Floating colour picker row ── */}
          {car.colorVariants && car.colorVariants.length > 0 && (
            <div style={{ marginBottom: '26px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: 'rgba(0,0,0,0.50)',
                backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '100px',
                padding: '9px 18px 9px 12px',
              }}>
                {/* Swatches */}
                <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
                  {car.colorVariants.map((variant) => {
                    const active = selectedColor?.name === variant.name
                    return (
                      <button
                        key={variant.name}
                        onClick={() => handleColorChange(variant)}
                        title={variant.name}
                        aria-label={variant.name}
                        aria-pressed={active}
                        style={{
                          width:  active ? '30px' : '22px',
                          height: active ? '30px' : '22px',
                          borderRadius: '50%',
                          background: variant.hex,
                          border: active ? '2.5px solid #fff' : '2.5px solid transparent',
                          boxShadow: active
                            ? `0 0 0 2.5px ${variant.hex}, 0 4px 12px ${hexTint(variant.hex, 0.5)}`
                            : '0 0 0 1.5px rgba(255,255,255,0.2)',
                          cursor: 'pointer', outline: 'none', flexShrink: 0,
                          transition: 'all 0.38s cubic-bezier(0.34,1.56,0.64,1)',
                        }}
                      />
                    )
                  })}
                </div>

                {/* Divider */}
                <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />

                {/* Colour name — fades when changing */}
                <span key={selectedColor?.name} style={{
                  fontSize: '12px', color: 'rgba(255,255,255,0.78)',
                  letterSpacing: '0.03em', whiteSpace: 'nowrap',
                  animation: 'heroFadeIn 0.35s ease',
                  minWidth: '90px',
                }}>
                  {selectedColor?.name ?? ''}
                </span>
              </div>
            </div>
          )}

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>
              {car.brand} · {car.year} · {car.bodyType}
            </span>
            {car.badge && (
              <span style={{ background: '#E31937', color: '#fff', fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '100px' }}>
                {car.badge}
              </span>
            )}
          </div>

          {/* Model name */}
          <h1 style={{
            color: '#fff', fontWeight: 200, margin: '0 0 28px',
            fontSize: 'clamp(3.2rem,9vw,8rem)',
            letterSpacing: '-0.052em', lineHeight: 0.88,
            animation: 'slideUp 0.9s cubic-bezier(0.22,1,0.36,1)',
          }}>
            {car.fullName}
          </h1>

          {/* Price info */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em' }}>
              AED {car.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
              or {car.pricePerMonth[36].toLocaleString()}/mo over 36 months
            </span>
          </div>
        </div>
      </div>

      {/* ─── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1340px', margin: '0 auto', padding: 'clamp(3rem,5vw,6rem) clamp(1.25rem,3.5vw,3.5rem)' }}>
        <div className="flex flex-col lg:flex-row" style={{ gap: 'clamp(2.5rem,5vw,5.5rem)', alignItems: 'flex-start' }}>

          {/* ── LEFT COLUMN ────────────────────────────────────────────────── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Spec cards — 4-up on desktop, 2×2 on mobile */}
            <div style={{ marginBottom: '56px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '20px' }}>
                Performance
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: '8px' }}>
                {specItems.map(({ label, value, Icon }) => (
                  <div
                    key={label}
                    className="spec-card"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '20px', padding: '24px 16px',
                      textAlign: 'center',
                      transition: 'border-color 0.25s',
                      cursor: 'default',
                    }}
                  >
                    <Icon size={16} strokeWidth={1.5} style={{ color: '#E31937', opacity: 0.75, display: 'block', margin: '0 auto 14px' }} />
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 'clamp(13px,1.7vw,17px)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '6px' }}>
                      {value}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.28)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Battery row */}
              {car.battery && (
                <div style={{
                  marginTop: '8px', borderRadius: '20px', padding: '18px 22px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(227,25,55,0.1)', border: '1px solid rgba(227,25,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Zap size={16} strokeWidth={1.5} style={{ color: '#E31937' }} />
                    </div>
                    <div>
                      <div style={{ color: '#fff', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.03em' }}>{car.battery}</div>
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '2px' }}>Battery Capacity</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '100px', padding: '5px 12px' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
                    <span style={{ fontSize: '11px', color: '#22c55e', fontWeight: 500 }}>Zero Emissions</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '56px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '18px' }}>About</p>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(0.9rem,1.4vw,1rem)', lineHeight: 1.85, fontWeight: 300, margin: 0 }}>
                {car.description}
              </p>
            </div>

            {/* Features grid */}
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '18px' }}>
                Standard Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '8px' }}>
                {car.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="feat-card"
                    style={{
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '14px', padding: '16px 18px',
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      transition: 'border-color 0.25s',
                    }}
                  >
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(227,25,55,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                      <Check size={10} strokeWidth={2.5} style={{ color: '#E31937' }} />
                    </div>
                    <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.68)', lineHeight: 1.55, fontWeight: 300 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN — purchase panel ──────────────────────────────── */}
          <div className="w-full lg:w-[380px] lg:flex-shrink-0">
            <div style={{
              background: '#fff', borderRadius: '28px', overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
              position: 'sticky', top: '88px',
            }}>

              {/* Header */}
              <div style={{ padding: '26px 28px 20px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '5px' }}>
                  <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111', lineHeight: 1.2, margin: 0 }}>{car.fullName}</h2>
                  {car.badge && (
                    <span style={{ background: '#E31937', color: '#fff', fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 9px', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {car.badge}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '11px', color: '#bbb', margin: 0 }}>{car.year} · {car.bodyType} · {car.condition}</p>
              </div>

              <div style={{ padding: '20px 28px 28px' }}>

                {/* Finance term */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb', marginBottom: '10px' }}>Finance Term</div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {([12, 24, 36] as const).map((months) => (
                      <button
                        key={months}
                        onClick={() => setContractTerm(months)}
                        style={{
                          flex: 1, padding: '10px 0', borderRadius: '100px', fontSize: '12px',
                          background: contractTerm === months ? '#111' : '#fff',
                          color:      contractTerm === months ? '#fff' : '#999',
                          border:     contractTerm === months ? 'none' : '1px solid #e0e0e0',
                          cursor: 'pointer', transition: 'all 0.2s',
                          fontWeight: contractTerm === months ? 600 : 400,
                        }}
                      >
                        {months} mo
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price box */}
                <div style={{ background: '#f7f7f7', borderRadius: '16px', padding: '16px 18px', marginBottom: '18px' }}>
                  <div style={{ fontSize: '10px', color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '5px' }}>Purchase Price</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '5px' }}>
                    <span style={{ fontSize: '11px', color: '#aaa' }}>AED</span>
                    <span style={{ fontSize: '32px', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.04em' }}>
                      {car.price.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#bbb' }}>
                    Or from AED {car.pricePerMonth[contractTerm].toLocaleString()}/mo · {contractTerm} months
                  </div>
                </div>

                {/* Inclusions */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {['Comprehensive warranty included', 'Free first-year registration', '24/7 roadside assistance', 'Full service package'].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '12px', color: '#666' }}>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(227,25,55,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={9} strokeWidth={2.5} style={{ color: '#E31937' }} />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Buy Now */}
                <button
                  onClick={() => setShowModal(true)}
                  style={{
                    width: '100%', background: '#E31937', color: '#fff',
                    fontSize: '14px', fontWeight: 500, letterSpacing: '0.01em',
                    padding: '15px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                    transition: 'all 0.25s', marginBottom: '12px',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.background = '#C41630'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLButtonElement).style.background = '#E31937'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                  }}
                >
                  Buy Now
                </button>

                {/* Delivery status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' }} />
                  <span style={{ fontSize: '11px', color: '#aaa' }}>Delivery 24 – 48 hrs · Dubai & Abu Dhabi</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── ALSO CONSIDER ───────────────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(4rem,7vw,7rem) clamp(1.25rem,3.5vw,3.5rem)' }}>
        <div style={{ maxWidth: '1340px', margin: '0 auto' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '10px' }}>Also Consider</p>
          <h2 style={{ color: '#fff', fontWeight: 200, margin: '0 0 40px', fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', letterSpacing: '-0.04em' }}>
            Explore the lineup.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '14px' }}>
            {relatedCars.map((related) => (
              <Link key={related.slug} href={`/cars/${related.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  className="rel-card"
                  style={{
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px', overflow: 'hidden',
                    transition: 'border-color 0.25s, transform 0.3s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', paddingTop: '56%', background: '#111', overflow: 'hidden' }}>
                    <img
                      src={related.colorVariants?.[0]?.image ?? related.images[0]}
                      alt={related.fullName}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.65) 0%, transparent 60%)' }} />
                    {related.badge && (
                      <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#E31937', color: '#fff', fontSize: '9px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '100px' }}>
                        {related.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '16px 18px 20px' }}>
                    <h3 style={{ color: '#fff', fontWeight: 500, fontSize: '14px', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{related.fullName}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px', margin: '0 0 12px' }}>{related.bodyType} · {related.year}</p>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '15px', letterSpacing: '-0.02em' }}>AED {related.price.toLocaleString()}</div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '10px', marginTop: '2px' }}>
                      {cleanSpec(related.range)} range · {cleanSpec(related.horsepower)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI components ───────────────────────────────────────────────────── */}
      <LifeSimulator carSlug={car.slug} />
      <TimeTravel pricePerMonth={car.pricePerMonth[contractTerm]} />

      {/* ─── ENQUIRY MODAL ───────────────────────────────────────────────────── */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            onClick={() => !submitting && handleModalClose()}
          />
          <div style={{
            position: 'relative', width: '100%', maxWidth: '440px', margin: '0 16px',
            background: '#fff', borderRadius: '32px',
            padding: success ? '52px 40px' : '48px 40px 44px',
            boxShadow: '0 48px 120px rgba(0,0,0,0.5)',
            animation: 'modalIn 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}>

            {!submitting && (
              <button onClick={handleModalClose} aria-label="Close" style={{ position: 'absolute', top: '20px', right: '20px', background: '#f5f5f5', border: 'none', cursor: 'pointer', color: 'rgba(0,0,0,0.4)', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} strokeWidth={1.5} />
              </button>
            )}

            {success ? (
              <div style={{ textAlign: 'center', animation: 'checkBounce 0.55s cubic-bezier(0.34,1.56,0.64,1)' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,#E31937,#C41630)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111', marginBottom: '10px', letterSpacing: '-0.03em' }}>You&apos;re in.</h2>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.65, marginBottom: '6px' }}>
                  Your interest in the <strong style={{ color: '#111', fontWeight: 600 }}>{car.fullName}</strong>
                  {selectedColor ? ` in ${selectedColor.name}` : ''} is confirmed.
                </p>
                <p style={{ fontSize: '13px', color: '#bbb', lineHeight: 1.6, marginBottom: '36px' }}>
                  Our Dubai team will reach out within 24 hours.
                </p>
                <button onClick={handleModalClose} style={{ width: '100%', background: '#111', color: '#fff', fontSize: '14px', padding: '15px', borderRadius: '100px', border: 'none', cursor: 'pointer' }}>
                  Done
                </button>
              </div>

            ) : submitting ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '44px', height: '44px', border: '2px solid rgba(227,25,55,0.15)', borderTopColor: '#E31937', borderRadius: '50%', margin: '0 auto 20px', animation: 'spinRing 0.75s linear infinite' }} />
                <p style={{ fontSize: '14px', color: '#aaa' }}>Submitting your enquiry…</p>
              </div>

            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f7f7f7', borderRadius: '100px', padding: '5px 14px 5px 10px', marginBottom: '18px' }}>
                    {selectedColor && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedColor.hex, border: '1px solid rgba(0,0,0,0.1)' }} />}
                    <span style={{ fontSize: '11px', color: '#888', letterSpacing: '0.03em' }}>
                      {car.fullName}{selectedColor ? ` · ${selectedColor.name}` : ''}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#111', marginBottom: '8px', letterSpacing: '-0.03em' }}>Make an Enquiry</h2>
                  <p style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.6 }}>Leave your details — we&apos;ll be in touch within 24 hours.</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                  {([
                    { label: 'Full Name',     type: 'text', value: formName,  set: setFormName,  ph: 'e.g. Arun Kumar'       },
                    { label: 'Phone Number',  type: 'tel',  value: formPhone, set: setFormPhone, ph: '+971 50 000 0000'       },
                  ] as const).map(({ label, type, value, set, ph }) => (
                    <div key={label}>
                      <label style={{ display: 'block', fontSize: '10px', color: '#bbb', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{label}</label>
                      <input
                        type={type} value={value}
                        onChange={(e) => set(e.target.value)}
                        placeholder={ph}
                        style={{ width: '100%', padding: '13px 16px', borderRadius: '14px', border: '1.5px solid #e8e8e8', fontSize: '14px', color: '#111', outline: 'none', background: '#fafafa', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                        onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E31937' }}
                        onBlur={(e)  => { (e.target as HTMLInputElement).style.borderColor = '#e8e8e8' }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ background: '#f7f7f7', borderRadius: '12px', padding: '12px 16px', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{contractTerm}-month finance</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#111', lineHeight: 1 }}>
                      AED {car.pricePerMonth[contractTerm].toLocaleString()}<span style={{ fontSize: '11px', color: '#bbb', fontWeight: 400 }}>/mo</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#bbb' }}>AED {car.price.toLocaleString()} total</div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  style={{ width: '100%', background: '#E31937', color: '#fff', fontSize: '14px', padding: '15px', borderRadius: '100px', border: 'none', cursor: 'pointer', transition: 'background 0.2s', marginBottom: '10px' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#C41630' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#E31937' }}
                >
                  Confirm Enquiry
                </button>
                <p style={{ textAlign: 'center', fontSize: '11px', color: '#ccc', lineHeight: 1.5 }}>
                  No payment required. No commitment.
                </p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
