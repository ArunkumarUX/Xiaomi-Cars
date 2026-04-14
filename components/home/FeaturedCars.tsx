'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { CARS } from '@/lib/data'
import type { ColorVariant } from '@/lib/types'

const SU7_CDN = 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/su7_20260319/pc'
const YU7_CDN = 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/yu7_20250626/pc'

const CAR_BG: Record<string, string> = {
  'xiaomi-su7-standard': `${SU7_CDN}/6-1.png`,   // Capri Blue · ocean beach
  'xiaomi-su7-pro':      `${SU7_CDN}/6-2.png`,   // Crimson Red · sunset city
  'xiaomi-su7-max':      `${SU7_CDN}/6-7.png`,   // Pearl White · mountain dusk
  'xiaomi-su7-ultra':    '/images/cars/su7-ultra.jpg',
  'xiaomi-yu7':          `${YU7_CDN}/9.2.png`,   // Solar Orange · studio
}

const SPEC_LABELS: Record<string, string[]> = {
  'xiaomi-su7-standard': ['700 km Range', '5.28s  0–100', '210 km/h Top'],
  'xiaomi-su7-pro':      ['830 km Range', '5.28s  0–100', '94.3 kWh Battery'],
  'xiaomi-su7-max':      ['800 km Range', '2.78s  0–100', '265 km/h Top'],
  'xiaomi-su7-ultra':    ['1,526 HP  Triple Motor', '1.98s  0–100', '350 km/h Top'],
  'xiaomi-yu7':          ['760 km Range', '3.23s  0–100', '681 HP  AWD'],
}

export default function FeaturedCars() {
  const featured = CARS.filter((c) => c.isFeatured)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  const [activeIndex, setActiveIndex]     = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const [isHovered, setIsHovered]         = useState(false)
  const [activeColor, setActiveColor]     = useState<ColorVariant | null>(
    featured[0]?.colorVariants?.[0] ?? null
  )
  const [bloomKey, setBloomKey]           = useState(0)
  const [showBloom, setShowBloom]         = useState(false)
  const bloomHex                          = useRef('#ffffff')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const car   = featured[activeIndex] ?? featured[0]
  const specs = SPEC_LABELS[car.slug] ?? []
  const bgImage = activeColor?.image ?? CAR_BG[car.slug] ?? '/images/cars/su7-teal.jpg'

  /* reset color to first variant whenever the active car changes */
  useEffect(() => {
    const nextCar = featured[activeIndex]
    setActiveColor(nextCar?.colorVariants?.[0] ?? null)
  }, [activeIndex])

  /* ── color change: trigger bloom ── */
  const handleColorChange = (variant: ColorVariant) => {
    if (variant.name === activeColor?.name) return
    bloomHex.current = variant.hex
    setActiveColor(variant)
    setShowBloom(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBloomKey((k) => k + 1)
        setShowBloom(true)
        setTimeout(() => setShowBloom(false), 1000)
      })
    })
  }

  /* ── carousel advance ── */
  const goTo = (index: number) => {
    if (index === activeIndex || transitioning) return
    setTransitioning(true)
    setTimeout(() => { setActiveIndex(index); setTransitioning(false) }, 350)
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!isHovered) intervalRef.current = setInterval(advance, 5500)
  }

  const advance = () => {
    setTransitioning(true)
    setTimeout(() => {
      setActiveIndex((i) => (i + 1) % featured.length)
      setTransitioning(false)
    }, 350)
  }

  useEffect(() => {
    if (isHovered) { if (intervalRef.current) clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(advance, 5500)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isHovered, featured.length])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUpFadeSlow {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bgCinemaIn {
          0%   { opacity: 0; transform: scale(1.07); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes colorBloom {
          0%   { opacity: 0;    transform: scale(0.4);  }
          30%  { opacity: 0.22; transform: scale(1.0);  }
          100% { opacity: 0;    transform: scale(2.2);  }
        }
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /* ── Extended Range: Range-meter sweep ── */
        @keyframes rangeMeterGrow {
          0%   { width: 0%; opacity: 0; }
          10%  { opacity: 1; }
          100% { width: 100%; opacity: 1; }
        }
        @keyframes rangeGlowPulse {
          0%, 100% { box-shadow: 0 0 8px 1px rgba(227,25,55,0.5); }
          50%       { box-shadow: 0 0 22px 4px rgba(227,25,55,0.85); }
        }
        @keyframes erBadgeDrop {
          0%   { opacity: 0; transform: translateY(-24px) scaleX(0.6); }
          60%  { opacity: 1; transform: translateY(4px)  scaleX(1.02); }
          100% { opacity: 1; transform: translateY(0)    scaleX(1); }
        }
        @keyframes erNameReveal {
          0%   { opacity: 0; clip-path: inset(0 100% 0 0); letter-spacing: -0.1em; }
          100% { opacity: 1; clip-path: inset(0 0% 0 0);   letter-spacing: -0.04em; }
        }
        @keyframes erSpecStagger {
          0%   { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes erPriceCount {
          0%   { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes erHorizonScan {
          0%   { transform: translateX(-100%); opacity: 0.6; }
          60%  { opacity: 0.9; }
          100% { transform: translateX(100vw);  opacity: 0; }
        }
        @keyframes erBgDrift {
          0%   { transform: scale(1.07) translateX(-1.5%); }
          100% { transform: scale(1.0)  translateX(0%); }
        }

        .fleet-animate        { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .fleet-animate-delay  { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .fleet-animate-delay2 { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .bg-cinema-in         { animation: bgCinemaIn 1.2s cubic-bezier(0.25,0.46,0.45,0.94) both; }
        .bg-er-drift          { animation: erBgDrift 2.4s cubic-bezier(0.25,0.46,0.45,0.94) both; }
        .badge-animate        { animation: slideUpFade 0.55s cubic-bezier(0.22,1,0.36,1) both; }
        .badge-text-animate   { animation: slideUpFadeSlow 0.65s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        .er-badge-animate     { animation: erBadgeDrop 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .er-name-animate      { animation: erNameReveal 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s both; }
        .er-spec-1            { animation: erSpecStagger 0.55s cubic-bezier(0.22,1,0.36,1) 0.3s both; }
        .er-spec-2            { animation: erSpecStagger 0.55s cubic-bezier(0.22,1,0.36,1) 0.42s both; }
        .er-spec-3            { animation: erSpecStagger 0.55s cubic-bezier(0.22,1,0.36,1) 0.54s both; }
        .er-price-animate     { animation: erPriceCount  0.6s cubic-bezier(0.22,1,0.36,1) 0.55s both; }
      ` }} />

      <section style={{ background: '#fff' }}>

        {/* ── Section Header — Tesla-style generous spacing ─────────────────────────────────── */}
        <div ref={headerRef} className="px-8 sm:px-12 lg:px-20 pt-20 sm:pt-28 lg:pt-40 pb-12 sm:pb-16 lg:pb-24"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-5 mb-8"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isHeaderInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-px w-8 origin-left"
                  style={{ background: '#E31937' }}
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isHeaderInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ color: 'rgba(0,0,0,0.35)', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase' }}
                >
                  Leasing Options
                </motion.span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ color: '#171a20', fontWeight: 200, fontSize: 'clamp(3rem, 9vw, 8.5rem)', letterSpacing: '-0.05em', lineHeight: 0.9 }}
              >
                Drive.<br />
                <span style={{ fontWeight: 700 }}>Not Buy.</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start lg:items-end gap-5 pb-2 flex-shrink-0"
            >
              <p className="lg:text-right" style={{ color: 'rgba(0,0,0,0.4)', fontSize: '12px', letterSpacing: '0.04em', maxWidth: '230px', lineHeight: 1.85 }}>
                Zero down payment. Full insurance. Free registration. All in one monthly lease.
              </p>
              <Link href="/cars" className="group inline-flex items-center gap-3">
                <span className="text-black/40 group-hover:text-black/80 transition-colors duration-300"
                  style={{ fontSize: '14px', fontWeight: 400 }}>
                  View Lease Plans
                </span>
                <span
                  className="flex items-center justify-center rounded-full group-hover:bg-black/90 group-hover:text-white group-hover:translate-x-1 group-hover:border-black/80"
                  style={{
                    width: '36px', height: '36px',
                    border: '1px solid rgba(0,0,0,0.15)',
                    color: 'rgba(0,0,0,0.4)',
                    transition: 'background 0.3s, color 0.3s, transform 0.3s, border-color 0.3s',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* ── Full-bleed Showcase ─────────────────────────────── */}
        <div
          className="relative overflow-hidden"
          style={{ minHeight: '88vh' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* ── Cinematic background — remounts on every image change ── */}
          <div
            key={bgImage}
            className={`absolute inset-0 ${car.slug === 'xiaomi-su7-pro' ? 'bg-er-drift' : 'bg-cinema-in'}`}
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: car.slug === 'xiaomi-su7-pro' ? 'center right' : 'center',
              opacity: transitioning ? 0 : 1,
              transition: 'opacity 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          />

          {/* ── Extended Range: horizon scan line ── */}
          {car.slug === 'xiaomi-su7-pro' && !transitioning && (
            <div key={`er-scan-${activeIndex}`} style={{
              position: 'absolute', top: '52%', left: 0, zIndex: 4,
              width: '420px', height: '1px',
              background: 'linear-gradient(to right, transparent, rgba(227,25,55,0.9) 40%, rgba(255,255,255,0.6) 60%, transparent)',
              animation: 'erHorizonScan 1.4s cubic-bezier(0.4,0,0.2,1) 0.05s both',
              pointerEvents: 'none',
            }} />
          )}

          {/* ── Color bloom pulse ─────────────────────────────── */}
          {showBloom && (
            <div
              key={bloomKey}
              style={{
                position: 'absolute', inset: 0, zIndex: 2,
                pointerEvents: 'none',
                background: `radial-gradient(circle at 62% 48%, ${bloomHex.current} 0%, transparent 60%)`,
                animation: 'colorBloom 1s cubic-bezier(0.25,0.46,0.45,0.94) forwards',
              }}
            />
          )}

          {/* ── Minimal gradient overlays — Tesla style ─────────────────────────── */}
          <div className="absolute inset-0" style={{
            zIndex: 3,
            background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 38%, rgba(0,0,0,0.02) 70%, transparent 100%)',
          }} />
          <div className="absolute inset-0" style={{
            zIndex: 3,
            background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.72) 28%, rgba(0,0,0,0.28) 55%, transparent 100%)',
          }} />

          {/* ── Content ───────────────────────────────────────── */}
          <div
            className="absolute inset-0 flex flex-col justify-between px-8 sm:px-12 lg:px-20 py-14 lg:py-20"
            style={{ zIndex: 10 }}
          >

            {/* Badge */}
            {car.badge && (
              car.slug === 'xiaomi-su7-pro' ? (
                <div key={`badge-${activeIndex}`} className="er-badge-animate inline-flex items-center gap-3">
                  {/* ER pill badge */}
                  <div style={{
                    background: 'linear-gradient(135deg, #E31937 0%, #a8001f 100%)',
                    color: '#fff', fontSize: '9px', letterSpacing: '0.3em',
                    textTransform: 'uppercase', fontWeight: 700,
                    padding: '5px 14px', borderRadius: '2px',
                    boxShadow: '0 0 18px rgba(227,25,55,0.55)',
                  }}>
                    {car.badge}
                  </div>
                  {/* Range meter */}
                  <div key={`meter-${activeIndex}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '120px', height: '2px',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '2px', overflow: 'hidden', position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute', inset: '0 auto 0 0', height: '100%',
                        background: 'linear-gradient(to right, #E31937, rgba(255,255,255,0.9))',
                        borderRadius: '2px',
                        animation: 'rangeMeterGrow 1.4s cubic-bezier(0.4,0,0.2,1) 0.2s both, rangeGlowPulse 2s ease-in-out 1.6s infinite',
                      }} />
                    </div>
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', letterSpacing: '0.2em' }}>830 KM</span>
                  </div>
                </div>
              ) : (
                <div key={`badge-${activeIndex}`} className="badge-animate inline-flex items-center gap-2.5">
                  <div className="h-px w-5" style={{ background: 'rgba(255,255,255,0.35)' }} />
                  <span className="badge-text-animate"
                    style={{ color: 'rgba(255,255,255,0.72)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500 }}>
                    {car.badge}
                  </span>
                </div>
              )
            )}

            {/* Bottom block */}
            <div>

              {/* Model name */}
              <div key={`name-${activeIndex}`} className={car.slug === 'xiaomi-su7-pro' ? 'er-name-animate mb-5' : 'fleet-animate mb-5'}>
                <h3 className="text-white leading-[0.86]"
                  style={{ fontWeight: 800, fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', letterSpacing: '-0.04em' }}>
                  {car.fullName}
                </h3>
              </div>

              {/* Specs */}
              {car.slug === 'xiaomi-su7-pro' ? (
                <div key={`specs-${activeIndex}`} className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-7">
                  {specs.map((spec, i) => (
                    <span key={i} className={`er-spec-${i + 1}`} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', letterSpacing: '0.08em', fontWeight: 500, textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
                        {spec}
                      </span>
                      {i < specs.length - 1 && (
                        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>·</span>
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <div key={`specs-${activeIndex}`} className="fleet-animate-delay flex flex-wrap items-center gap-x-4 gap-y-2 mb-7">
                  {specs.map((spec, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', letterSpacing: '0.08em', fontWeight: 500, textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}>
                        {spec}
                      </span>
                      {i < specs.length - 1 && (
                        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>·</span>
                      )}
                    </span>
                  ))}
                </div>
              )}

              {/* Price + CTA + Nav row */}
              <div key={`cta-${activeIndex}`} className={`${car.slug === 'xiaomi-su7-pro' ? 'er-price-animate' : 'fleet-animate-delay2'} flex flex-col sm:flex-row sm:items-end justify-between gap-8`}>

                {/* Price + CTA */}
                <div className="flex flex-row items-end gap-8 flex-wrap">
                  {/* Price block */}
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 500 }}>AED</span>
                      <span className="text-white"
                        style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>
                        {car.pricePerMonth[36].toLocaleString()}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 400 }}>/mo</span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '4px', letterSpacing: '0.02em' }}>
                      36 months · All-inclusive
                    </div>
                  </div>

                  {/* CTA — solid red, prominent */}
                  <Link
                    href={`/cars/${car.slug}`}
                    className="hover:bg-[#C41630] transition-colors duration-200 inline-flex items-center gap-2.5"
                    style={{
                      background: '#E31937',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '13px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '14px 28px',
                      borderRadius: '4px',
                      whiteSpace: 'nowrap',
                      marginBottom: '2px',
                    }}
                  >
                    Lease This Car
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>

                {/* Model navigator */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
                    {featured.map((f, i) => (
                      <button
                        key={f.id}
                        onClick={() => goTo(i)}
                        style={{
                          fontSize: '11px', letterSpacing: '0.12em',
                          fontWeight: i === activeIndex ? 600 : 400,
                          color: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.45)',
                          textTransform: 'uppercase', background: 'none', border: 'none',
                          cursor: 'pointer', padding: 0,
                          transition: 'color 0.3s',
                        }}
                      >
                        {f.model}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-1.5 lg:justify-end">
                    {featured.map((_, i) => (
                      <div
                        key={i}
                        className="relative overflow-hidden"
                        style={{
                          height: '1px',
                          width: i === activeIndex ? '40px' : '16px',
                          background: 'rgba(255,255,255,0.15)',
                          transition: 'width 0.4s ease',
                          cursor: 'pointer',
                        }}
                        onClick={() => goTo(i)}
                      >
                        {i === activeIndex && (
                          <div style={{
                            position: 'absolute', inset: 0, background: '#fff',
                            animation: isHovered ? 'none' : `progressFill 5500ms linear both`,
                          }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ghost watermark */}
          <div
            key={`mark-${activeIndex}`}
            className="fleet-animate absolute right-0 bottom-0 pointer-events-none select-none"
            style={{ zIndex: 3, opacity: transitioning ? 0 : 1, transition: 'opacity 0.35s ease' }}
          >
            <div style={{
              fontSize: 'clamp(5rem, 14vw, 13rem)', fontWeight: 800,
              letterSpacing: '-0.04em', lineHeight: 0.85,
              paddingRight: '2rem', paddingBottom: '1rem',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
            }}>
              {car.model}
            </div>
          </div>
        </div>

      </section>
    </>
  )
}
