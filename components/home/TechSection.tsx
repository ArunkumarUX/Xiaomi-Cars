'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'

// ─── Animated counter hook ─────────────────────────────────────────────────────
function useCounter(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf: number
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: 830,  suffix: 'km',  label: 'Max Range',         sub: 'Single charge · CLTC' },
  { value: 198,  suffix: 's',   label: '0–100 km/h',        sub: 'SU7 Ultra · 1.98 seconds', decimal: true },
  { value: 1526, suffix: 'HP',  label: 'Peak Power',        sub: 'Triple-motor hypercar' },
  { value: 0,    suffix: '',    label: 'Down Payment',       sub: 'Zero upfront, ever' },
]

const PILLARS = [
  {
    num: '01',
    label: '800V Architecture',
    desc: '100 km of range in 5 minutes. Industry-leading charging speed built on a proprietary 800V platform that outpaces every rival.',
    image: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section3_1x1281.jpg',
  },
  {
    num: '02',
    label: 'HyperMotor',
    desc: 'Self-developed electric motor with class-leading power density. Instant torque, whisper-quiet delivery, zero compromise.',
    image: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section3_2x1281.jpg',
  },
  {
    num: '03',
    label: 'HyperOS Cockpit',
    desc: 'A 16.1\" 3K display running Xiaomi HyperOS — your phone, your music, your navigation, all seamlessly unified.',
    image: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section3_3x1281.jpg',
  },
  {
    num: '04',
    label: 'NOA Autopilot',
    desc: 'Navigate on Autopilot end-to-end. Highway lane changes, urban routing, self-parking — all handled intelligently.',
    image: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/pc/section_3_4.jpg',
  },
]


// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, sub, decimal, index, triggerCount }: {
  value: number; suffix: string; label: string; sub: string;
  decimal?: boolean; index: number; triggerCount: boolean
}) {
  const count = useCounter(decimal ? value : value, 1600 + index * 150, triggerCount)
  const display = decimal
    ? (count / 100).toFixed(2)
    : count.toLocaleString()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        flex: 1, minWidth: 0,
        borderRight: index < STATS.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
        padding: '40px 32px',
        display: 'flex', flexDirection: 'column', gap: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', lineHeight: 1 }}>
        <span style={{
          fontSize: 'clamp(2.8rem, 5vw, 5rem)',
          fontWeight: 800, color: '#111',
          letterSpacing: '-0.04em', lineHeight: 1,
        }}>
          {display}
        </span>
        {suffix && (
          <span style={{ fontSize: 'clamp(1rem, 1.8vw, 1.5rem)', fontWeight: 300, color: '#E31937', letterSpacing: '-0.02em' }}>
            {suffix}
          </span>
        )}
      </div>
      <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.02em', marginTop: '2px' }}>
        {sub}
      </div>
    </motion.div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function TechSection() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const statsRef    = useRef<HTMLDivElement>(null)
  const bannerRef   = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  const { scrollYProgress: bannerProgress } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] })
  const bannerY = useTransform(bannerProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={sectionRef} style={{ overflow: 'hidden' }}>

      {/* ── 1. MANIFESTO HEADLINE — white ────────────────────────────────── */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: 'clamp(5rem,10vw,10rem) clamp(2rem,5vw,5rem) clamp(4rem,8vw,8rem)',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}
        >
          <div style={{ height: '1px', width: '40px', background: '#E31937' }} />
          <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            Why Xiaomi
          </span>
        </motion.div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '40px' }}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: '#111', fontWeight: 200,
              fontSize: 'clamp(3rem, 8vw, 8.5rem)',
              letterSpacing: '-0.05em', lineHeight: 0.88, margin: 0,
            }}
          >
            Built different.<br />
            <span style={{ fontWeight: 800 }}>Driven smarter.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: '340px' }}
          >
            <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: '14px', lineHeight: 1.85, margin: '0 0 28px', letterSpacing: '0.01em' }}>
              Xiaomi didn&apos;t adapt an existing car — they engineered one from first principles. 800V charging, a self-developed HyperMotor, and a 16.1&Prime; 3K cockpit. The result outperforms rivals at twice the price, available in Dubai with everything included.
            </p>
            <Link
              href="/cars"
              className="group"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
            >
              <span style={{ fontSize: '13px', color: 'rgba(0,0,0,0.35)', transition: 'color 0.3s' }}
                className="group-hover:text-black">
                Explore models
              </span>
              <span style={{
                width: '34px', height: '34px', borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(0,0,0,0.35)',
                transition: 'background 0.3s, color 0.3s',
              }}
                className="group-hover:bg-black group-hover:text-white group-hover:border-black">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── 2. ANIMATED STATS ROW — light gray ──────────────────────────── */}
      <div
        ref={statsRef}
        style={{
          display: 'flex', flexWrap: 'wrap',
          background: '#f8f8f8',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} triggerCount={statsInView} />
        ))}
      </div>

      {/* ── 3. TECH PILLARS 2×2 ──────────────────────────────────────────── */}
      <div style={{ background: '#070707', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ padding: 'clamp(4rem,7vw,7rem) clamp(2rem,5vw,5rem) 0' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}
          >
            <div style={{ height: '1px', width: '32px', background: '#E31937' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
              Core Technology
            </span>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {PILLARS.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
              style={{
                position: 'relative', overflow: 'hidden',
                aspectRatio: '4/3',
                borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                cursor: 'pointer',
              }}
            >
              <motion.img
                src={item.image}
                alt={item.label}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                initial={{ scale: 1.08, filter: 'brightness(0.6)' }}
                whileInView={{ scale: 1, filter: 'brightness(1)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                loading="lazy"
              />
              {/* Dark scrim */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
              }} />
              {/* Hover overlay */}
              <div
                className="group-hover:opacity-100"
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.22)', opacity: 0, transition: 'opacity 0.5s' }}
              />
              {/* Red accent line on hover */}
              <div
                className="group-hover:opacity-100"
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '2px', background: '#E31937',
                  opacity: 0, transition: 'opacity 0.4s',
                }}
              />
              {/* Content */}
              <div style={{ position: 'absolute', inset: 0, padding: 'clamp(1.5rem,3vw,3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500 }}>
                  {item.num}
                </span>
                <div>
                  <h3 style={{
                    color: '#fff', fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                    letterSpacing: '-0.03em', lineHeight: 1.1,
                    margin: '0 0 12px',
                    transform: 'translateY(0)', transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                  }}
                    className="group-hover:-translate-y-1">
                    {item.label}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '12px', maxWidth: '280px', lineHeight: 1.8, margin: 0, transition: 'color 0.4s' }}
                    className="group-hover:text-white/55">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 4. CINEMATIC FACTORY BANNER ──────────────────────────────────── */}
      <div ref={bannerRef} style={{ position: 'relative', overflow: 'hidden', height: '65vh', minHeight: '420px' }}>
        <motion.div style={{ position: 'absolute', inset: '-12% 0', y: bannerY }}>
          <img
            src="https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section4x1281.jpg"
            alt="Xiaomi Manufacturing"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            loading="lazy"
          />
        </motion.div>

        {/* Gradient scrim */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.08) 100%)',
        }} />

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 clamp(2rem,5vw,5rem)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
              <div style={{ height: '1px', width: '28px', background: 'rgba(255,255,255,0.3)' }} />
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
                Engineering
              </span>
            </div>
            <h3 style={{
              color: '#fff', fontWeight: 200,
              fontSize: 'clamp(2.2rem, 5vw, 5.5rem)',
              letterSpacing: '-0.045em', lineHeight: 0.9,
              margin: '0 0 36px',
            }}>
              Built in Beijing.<br />
              <span style={{ fontWeight: 800 }}>Driven in Dubai.</span>
            </h3>
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', marginBottom: '40px' }}>
              {[['160-pt', 'Inspection'], ['3-yr', 'Warranty'], ['24/7', 'Support']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '5px' }}>{lbl}</div>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="group"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
            >
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}
                className="group-hover:text-white transition-colors duration-300">
                Learn about Xiaomi
              </span>
              <span style={{
                width: '34px', height: '34px', borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.4)',
                transition: 'background 0.3s, color 0.3s',
              }}
                className="group-hover:bg-white group-hover:text-black">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── 5. BOTTOM CTA STRIP — white ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: '#fff',
          padding: 'clamp(3rem,6vw,6rem) clamp(2rem,5vw,5rem)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '32px',
          borderTop: '1px solid rgba(0,0,0,0.07)',
        }}
      >
        <div>
          <p style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 12px' }}>
            Ready to drive?
          </p>
          <h4 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', fontWeight: 200, color: '#111', letterSpacing: '-0.04em', lineHeight: 1, margin: 0 }}>
            Your Xiaomi EV.<br />
            <span style={{ fontWeight: 800 }}>From AED 1,099/mo.</span>
          </h4>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href="/cars"
            style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#E31937', color: '#fff',
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em',
              padding: '14px 36px', borderRadius: '4px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            className="hover:bg-[#C41630]"
          >
            Browse All Models
          </Link>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.2)',
              color: 'rgba(0,0,0,0.55)',
              fontSize: '13px', fontWeight: 400, letterSpacing: '0.04em',
              padding: '14px 36px', borderRadius: '4px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            className="hover:border-black hover:text-black"
          >
            Talk to Us
          </Link>
        </div>
      </motion.div>

    </section>
  )
}
