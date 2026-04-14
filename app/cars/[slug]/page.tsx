'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, X } from 'lucide-react'
import { CARS } from '@/lib/data'
import type { ColorVariant } from '@/lib/types'
import LifeSimulator from '@/components/ai/LifeSimulator'
import TimeTravel from '@/components/ai/TimeTravel'

const FEATURE_GROUPS = [
  { label: 'Premium', key: 0 },
  { label: 'Safety & Assistance', key: 1 },
  { label: 'Comfort & Convenience', key: 2 },
  { label: 'Technology & Connectivity', key: 3 },
  { label: 'Options', key: 4 },
]

export default function CarDetailPage() {
  const params = useParams()
  const car = CARS.find((c) => c.slug === params.slug)

  const [imgError, setImgError] = useState(false)
  const [prevImage, setPrevImage] = useState<string | null>(null)
  const [openAccordion, setOpenAccordion] = useState<number | null>(null)
  const [contractTerm, setContractTerm] = useState<12 | 24 | 36>(36)
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(
    car?.colorVariants?.[0] ?? null
  )

  // Subscribe modal states
  const [showSubscribe, setShowSubscribe] = useState(false)
  const [subscribeName, setSubscribeName] = useState('')
  const [subscribePhone, setSubscribePhone] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080808' }}>
        <div className="text-center">
          <h1 style={{ color: 'rgba(255,255,255,0.35)', fontSize: '18px', fontWeight: 300, marginBottom: '16px' }}>
            Vehicle not found
          </h1>
          <Link href="/cars" style={{ color: '#E31937', fontSize: '13px', textDecoration: 'none' }}>
            Back to Lease Options
          </Link>
        </div>
      </div>
    )
  }

  const featureGroups: Record<number, string[]> = {
    0: car.features.slice(0, 2),
    1: car.features.slice(2, 4),
    2: car.features.slice(4, 6),
    3: car.features.slice(0, 3),
    4: car.features.slice(3, 6),
  }

  const currentImage = selectedColor?.image ?? car.images[0]

  const handleColorChange = (variant: ColorVariant) => {
    setPrevImage(currentImage)
    setSelectedColor(variant)
    setImgError(false)
    setTimeout(() => setPrevImage(null), 700)
  }

  const handleSubscribeSubmit = () => {
    setSubscribing(true)
    setTimeout(() => {
      setSubscribing(false)
      setSubscribeSuccess(true)
    }, 1800)
  }

  const handleSubscribeClose = () => {
    setShowSubscribe(false)
    setTimeout(() => {
      setSubscribeSuccess(false)
      setSubscribeName('')
      setSubscribePhone('')
    }, 400)
  }

  const specItems = [
    { label: 'Range', value: car.range ?? '—' },
    { label: '0 – 100', value: car.acceleration ?? '—' },
    { label: 'Top Speed', value: car.topSpeed ?? '—' },
    { label: 'Power', value: car.horsepower ?? '—' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>

      {/* ── Full-width hero with crossfade ──────────────────── */}
      <div style={{ position: 'relative', width: '100%', height: '65vh', minHeight: '480px' }}>

        {/* Previous image (fades out) */}
        {prevImage && !imgError && (
          <img
            src={prevImage}
            alt=""
            aria-hidden
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: 0,
              transition: 'opacity 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          />
        )}

        {/* Current image (fades in) */}
        {!imgError ? (
          <img
            key={currentImage}
            src={currentImage}
            alt={`${car.fullName}${selectedColor ? ` — ${selectedColor.name}` : ''}`}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              animation: 'heroFadeIn 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, background: '#111',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '64px', fontWeight: 800, color: '#E31937', opacity: 0.15 }}>
              {car.model}
            </span>
          </div>
        )}

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 35%, rgba(8,8,8,0.1) 65%, transparent 100%)',
        }} />

        {/* Back link */}
        <div style={{ position: 'absolute', top: '84px', left: 'clamp(1.5rem,3.5vw,3.5rem)' }}>
          <Link
            href="/cars"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              color: 'rgba(255,255,255,0.45)', fontSize: '12px',
              textDecoration: 'none', letterSpacing: '0.08em',
              transition: 'color 0.2s',
            }}
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
            All Lease Options
          </Link>
        </div>

        {/* Model name */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 clamp(1.5rem,3.5vw,3.5rem) 40px',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
            {car.brand} · {car.year} · {car.fuelType}
          </p>
          <h1 style={{
            color: '#fff', fontWeight: 200,
            fontSize: 'clamp(3rem,8vw,7rem)',
            letterSpacing: '-0.048em', lineHeight: 0.86, margin: 0,
          }}>
            {car.fullName}
          </h1>
        </div>
      </div>

      {/* ── Keyframes ─────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes subscribeModalIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes subscribeSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes checkIn {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      ` }} />

      {/* ── Content ────────────────────────────────────────────── */}
      <div style={{
        maxWidth: '1300px', margin: '0 auto',
        padding: 'clamp(3rem,5vw,5rem) clamp(1.5rem,3.5vw,3.5rem)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 'clamp(2.5rem,5vw,5rem)', flexWrap: 'wrap' }}>

          {/* ── Left column ───────────────────────────────────── */}
          <div style={{ flex: 1, minWidth: 'min(100%, 480px)' }}>

            {/* Colour picker */}
            {car.colorVariants && car.colorVariants.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <div style={{
                  fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.2)', marginBottom: '16px',
                }}>
                  Colour —{' '}
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
                    {selectedColor?.name}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {car.colorVariants.map((variant) => (
                    <button
                      key={variant.name}
                      onClick={() => handleColorChange(variant)}
                      title={variant.name}
                      aria-label={variant.name}
                      aria-pressed={selectedColor?.name === variant.name}
                      style={{
                        width: '30px', height: '30px',
                        borderRadius: '50%',
                        background: variant.hex,
                        border: selectedColor?.name === variant.name ? '3px solid #E31937' : '3px solid transparent',
                        boxShadow: selectedColor?.name === variant.name
                          ? '0 0 0 2px rgba(255,105,0,0.45)'
                          : '0 0 0 2px rgba(255,255,255,0.1)',
                        transform: selectedColor?.name === variant.name ? 'scale(1.18)' : 'scale(1)',
                        transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s, border-color 0.25s',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Specs row */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{
                fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)', marginBottom: '16px',
              }}>
                Specifications
              </div>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                background: '#111', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '16px', overflow: 'hidden',
              }}>
                {specItems.map((spec, i) => (
                  <div
                    key={spec.label}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      padding: '24px 12px', textAlign: 'center',
                      borderRight: i < specItems.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}
                  >
                    <span style={{ color: '#fff', fontWeight: 500, fontSize: '15px', lineHeight: 1, marginBottom: '6px' }}>
                      {spec.value}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {spec.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features accordion */}
            <div>
              <div style={{
                fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)', marginBottom: '16px',
              }}>
                Features
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {FEATURE_GROUPS.map((group) => (
                  <div
                    key={group.key}
                    style={{
                      background: '#111', border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '14px', overflow: 'hidden',
                    }}
                  >
                    <button
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between', padding: '18px 20px',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onClick={() => setOpenAccordion(openAccordion === group.key ? null : group.key)}
                      aria-expanded={openAccordion === group.key}
                    >
                      <span style={{
                        fontSize: '12px', fontWeight: 400, color: 'rgba(255,255,255,0.55)',
                        letterSpacing: '0.02em',
                      }}>
                        {group.label}
                      </span>
                      <span style={{
                        fontSize: '20px', fontWeight: 200, lineHeight: 1,
                        color: openAccordion === group.key ? '#E31937' : 'rgba(255,255,255,0.2)',
                        display: 'inline-block',
                        transform: openAccordion === group.key ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), color 0.3s',
                      }}>
                        +
                      </span>
                    </button>
                    <div style={{
                      maxHeight: openAccordion === group.key ? '200px' : '0',
                      overflow: 'hidden',
                      transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
                    }}>
                      <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(featureGroups[group.key] || []).map((f, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                            <span style={{ color: '#E31937', flexShrink: 0, marginTop: '1px' }}>✓</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column — pricing panel ──────────────────── */}
          <div style={{ width: 'min(100%, 360px)', flexShrink: 0 }}>
            <div style={{
              background: '#fff', borderRadius: '24px', overflow: 'hidden',
              position: 'sticky', top: '88px',
            }}>

              {/* Panel header */}
              <div style={{ padding: '28px 28px 22px', borderBottom: '1px solid #ebebeb' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111', lineHeight: 1.2, marginBottom: '4px' }}>
                  {car.fullName}
                </h2>
                <p style={{ fontSize: '13px', color: '#aaa', margin: 0 }}>
                  AED {car.pricePerMonth[contractTerm].toLocaleString()} / month · {contractTerm} months
                </p>
              </div>

              <div style={{ padding: '24px 28px 28px' }}>

                {/* Colour picker in panel */}
                {car.colorVariants && car.colorVariants.length > 0 && (
                  <div style={{ marginBottom: '22px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb', marginBottom: '10px' }}>
                      Colour — <span style={{ color: '#111', fontWeight: 400 }}>{selectedColor?.name}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {car.colorVariants.map((variant) => (
                        <button
                          key={variant.name}
                          onClick={() => handleColorChange(variant)}
                          title={variant.name}
                          aria-label={variant.name}
                          aria-pressed={selectedColor?.name === variant.name}
                          style={{
                            width: '24px', height: '24px',
                            borderRadius: '50%',
                            background: variant.hex,
                            border: selectedColor?.name === variant.name ? '3px solid #E31937' : '3px solid transparent',
                            outline: selectedColor?.name === variant.name ? '2px solid #E31937' : '2px solid #ddd',
                            outlineOffset: '2px',
                            transform: selectedColor?.name === variant.name ? 'scale(1.15)' : 'scale(1)',
                            transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Contract term */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb', marginBottom: '10px' }}>
                    Contract Term
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {([12, 24, 36] as const).map((months) => (
                      <button
                        key={months}
                        onClick={() => setContractTerm(months)}
                        style={{
                          flex: 1, padding: '12px', borderRadius: '100px',
                          fontSize: '13px', fontWeight: 400, letterSpacing: '0',
                          background: contractTerm === months ? '#111' : '#fff',
                          color: contractTerm === months ? '#fff' : '#888',
                          border: contractTerm === months ? 'none' : '1px solid #ddd',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {months} months
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div style={{ borderTop: '1px solid #ebebeb', paddingTop: '20px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontSize: '34px', fontWeight: 800, color: '#111', lineHeight: 1 }}>
                      AED {car.pricePerMonth[contractTerm].toLocaleString()}
                    </span>
                    <span style={{ fontSize: '13px', color: '#bbb', fontWeight: 400 }}>/month</span>
                  </div>
                </div>

                {/* Inclusions */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    'Comprehensive insurance',
                    'Free registration',
                    '24/7 roadside assistance',
                    'Full maintenance package',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#888' }}>
                      <span style={{ color: '#E31937', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Subscribe CTA */}
                <button
                  onClick={() => setShowSubscribe(true)}
                  style={{
                    width: '100%', background: '#E31937',
                    color: '#fff', fontSize: '14px', fontWeight: 400,
                    padding: '15px 0', borderRadius: '100px',
                    border: 'none', cursor: 'pointer',
                    transition: 'background 0.25s, transform 0.2s',
                    letterSpacing: '0',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#C41630'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#E31937'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                  }}
                >
                  Enquire to Lease
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Life Simulator ────────────────────────────────── */}
      <LifeSimulator carSlug={car.slug} />

      {/* ── Time-Travel Lease Preview ─────────────────────── */}
      <TimeTravel pricePerMonth={car.pricePerMonth[contractTerm]} />

      {/* ── Subscribe Modal ───────────────────────────────────── */}
      {showSubscribe && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 300,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Backdrop */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
            onClick={() => !subscribing && handleSubscribeClose()}
          />

          {/* Modal card */}
          <div style={{
            position: 'relative', width: '100%', maxWidth: '420px',
            margin: '0 16px',
            background: '#fff', borderRadius: '28px',
            padding: subscribeSuccess ? '52px 40px' : '48px 40px 44px',
            boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            animation: 'subscribeModalIn 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}>

            {/* Close */}
            {!subscribing && (
              <button
                onClick={handleSubscribeClose}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(0,0,0,0.2)', transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '4px',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(0,0,0,0.5)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(0,0,0,0.2)' }}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            )}

            {subscribeSuccess ? (
              /* ── Success state ── */
              <div style={{ textAlign: 'center', animation: 'fadeUp 0.5s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
                {/* Animated checkmark */}
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E31937, #C41630)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                  animation: 'checkIn 0.55s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '10px' }}>
                  You're in.
                </h2>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6, marginBottom: '6px' }}>
                  Your interest in the <strong style={{ color: '#111', fontWeight: 600 }}>{car.fullName}</strong> has been confirmed.
                </p>
                <p style={{ fontSize: '13px', color: '#bbb', lineHeight: 1.6, marginBottom: '36px' }}>
                  Our team in Dubai will reach out to you within 24 hours to finalise your lease.
                </p>
                <button
                  onClick={handleSubscribeClose}
                  style={{
                    width: '100%', background: '#111', color: '#fff',
                    fontSize: '14px', fontWeight: 400, padding: '14px 0',
                    borderRadius: '100px', border: 'none', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#333' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#111' }}
                >
                  Done
                </button>
              </div>
            ) : subscribing ? (
              /* ── Loading state ── */
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: '44px', height: '44px',
                  border: '2px solid rgba(227,25,55,0.15)',
                  borderTopColor: '#E31937',
                  borderRadius: '50%',
                  margin: '0 auto 20px',
                  animation: 'subscribeSpin 0.75s linear infinite',
                }} />
                <p style={{ fontSize: '14px', color: '#aaa' }}>Submitting your enquiry…</p>
              </div>
            ) : (
              /* ── Form state ── */
              <>
                {/* Car name */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{
                    display: 'inline-block',
                    background: '#f7f7f7',
                    borderRadius: '100px',
                    padding: '6px 16px',
                    marginBottom: '20px',
                  }}>
                    <span style={{ fontSize: '11px', color: '#888', letterSpacing: '0.04em' }}>
                      {car.fullName}{selectedColor ? ` · ${selectedColor.name}` : ''}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '8px' }}>
                    Reserve your lease
                  </h2>
                  <p style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.6 }}>
                    Leave your details and we'll be in touch within 24 hours.
                  </p>
                </div>

                {/* Form fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={subscribeName}
                      onChange={(e) => setSubscribeName(e.target.value)}
                      placeholder="e.g. Arun Kumar"
                      style={{
                        width: '100%', padding: '13px 16px',
                        borderRadius: '12px', border: '1px solid #e0e0e0',
                        fontSize: '14px', color: '#111', outline: 'none',
                        background: '#fafafa',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E31937' }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e0e0e0' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#aaa', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={subscribePhone}
                      onChange={(e) => setSubscribePhone(e.target.value)}
                      placeholder="+971 50 000 0000"
                      style={{
                        width: '100%', padding: '13px 16px',
                        borderRadius: '12px', border: '1px solid #e0e0e0',
                        fontSize: '14px', color: '#111', outline: 'none',
                        background: '#fafafa',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E31937' }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#e0e0e0' }}
                    />
                  </div>
                </div>

                {/* Monthly price reminder */}
                <div style={{
                  background: '#fafafa', borderRadius: '12px',
                  padding: '14px 16px', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: '12px', color: '#aaa' }}>{contractTerm}-month lease</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#111' }}>
                    AED {car.pricePerMonth[contractTerm].toLocaleString()}<span style={{ fontSize: '12px', fontWeight: 400, color: '#bbb' }}>/mo</span>
                  </span>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubscribeSubmit}
                  style={{
                    width: '100%', background: '#E31937',
                    color: '#fff', fontSize: '14px', fontWeight: 400,
                    padding: '15px 0', borderRadius: '100px',
                    border: 'none', cursor: 'pointer',
                    transition: 'background 0.25s, transform 0.2s',
                    marginBottom: '12px',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#C41630' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#E31937' }}
                >
                  Confirm Enquiry
                </button>

                <p style={{ textAlign: 'center', fontSize: '11px', color: '#ccc', lineHeight: 1.6 }}>
                  No payment required now. No commitment.
                </p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
