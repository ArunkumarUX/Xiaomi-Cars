'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import FindMatchButton from './FindMatchButton'

const STEPS = [
  {
    num: '01',
    label: 'Choose your car',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
        <rect x="7" y="15" width="10" height="4" rx="2"/>
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Quick verification',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    num: '03',
    label: 'Drive from day one',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="7.5" cy="15.5" r="5.5"/>
        <path d="M21 2l-9.6 9.6"/>
        <path d="M15.5 7.5l3 3L22 7l-3-3"/>
      </svg>
    ),
  },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-6%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden" style={{ height: '100svh', minHeight: '700px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 639px) {
          .steps-item { border-right: none !important; padding-left: 0 !important; }
        }
      ` }} />

      {/* Background video */}
      <motion.div style={{ position: 'absolute', inset: '-12% 0', y: bgY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        >
          <source src="/videos/home.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Tesla-style: minimal gradient overlay — let image speak */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.05) 70%, transparent 100%)',
      }} />
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        height: '180px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)',
      }} />

      {/* Content — pinned to bottom */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="absolute inset-0 flex flex-col justify-end">
        <div className="px-8 sm:px-12 lg:px-20 pb-0">

          {/* Tesla-style headline: ultra-thin, massive with reveal animation */}
          <motion.h1
            className="text-white mb-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontWeight: 100, fontSize: 'clamp(4rem, 12vw, 11rem)', letterSpacing: '-0.05em', lineHeight: 0.88 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block' }}
            >
              Own Bold.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'block', fontWeight: 800 }}
            >
              Drive Yours.
            </motion.span>
          </motion.h1>

          {/* Subtext with fade in */}
          <motion.p
            className="text-white/35 mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', maxWidth: '400px', lineHeight: 1.9, letterSpacing: '0.01em' }}
          >
            The world&apos;s most advanced cars — yours to own.<br />
            Flexible financing available. From AED&nbsp;129,900.
          </motion.p>

          {/* CTAs — Tesla glass-morphism style with staggered animation */}
          <motion.div
            className="flex items-center gap-4 flex-wrap mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/cars"
              className="transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: '#fff',
                fontWeight: 400,
                fontSize: '13px', letterSpacing: '0.05em',
                padding: '14px 40px', borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'inline-block',
              }}>
              Browse Cars
            </Link>
            <FindMatchButton />
          </motion.div>
        </div>

        {/* Steps bar — Xiaomi SU7 design language with staggered animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          style={{
            borderTop: '1px solid hsla(0,0%,100%,.06)',
            background: 'rgba(13,13,13,0.72)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <div className="px-8 sm:px-12 lg:px-20 grid grid-cols-1 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-5 steps-item"
                style={{
                  padding: '26px 0',
                  paddingLeft: i === 0 ? 0 : '40px',
                  borderRight: i < STEPS.length - 1 ? '1px solid hsla(0,0%,100%,.06)' : 'none',
                }}
              >
                {/* Icon with hover animation */}
                <motion.div
                  style={{
                    flexShrink: 0,
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'hsla(0,0%,100%,.9)',
                  }}
                  whileHover={{ scale: 1.1, color: '#E31937' }}
                  transition={{ duration: 0.2 }}
                >
                  {s.icon}
                </motion.div>

                {/* Thin vertical rule */}
                <div style={{
                  width: '1px',
                  height: '28px',
                  background: 'hsla(0,0%,100%,.16)',
                  flexShrink: 0,
                }} aria-hidden="true" />

                <div>
                  {/* Step counter */}
                  <div style={{
                    fontSize: '10px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'hsla(0,0%,100%,.3)',
                    fontWeight: 400,
                    marginBottom: '5px',
                    lineHeight: 1,
                    fontFamily: 'MiSans, sans-serif',
                  }}>
                    {s.num}
                  </div>
                  {/* Label */}
                  <div style={{
                    fontSize: 'clamp(12px, 1.15vw, 14px)',
                    fontWeight: 300,
                    color: 'hsla(0,0%,100%,.8)',
                    letterSpacing: '0.01em',
                    lineHeight: 1.35,
                    fontFamily: 'MiSans, sans-serif',
                  }}>
                    {s.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue with bounce animation */}
      <motion.div
        className="absolute hidden sm:flex flex-col items-center gap-2.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{ bottom: '130px', right: '2.5rem' }}
      >
        <div className="w-px overflow-hidden" style={{ height: '56px', background: 'rgba(255,255,255,0.08)' }}>
          <motion.div
            className="w-full"
            style={{ height: '50%', background: 'linear-gradient(to bottom, rgba(227,25,55,0.8), rgba(255,255,255,0.8))' }}
            animate={{ y: [-20, 0, -20] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <motion.span
          style={{ fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', writingMode: 'vertical-rl' }}
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll
        </motion.span>
      </motion.div>

    </section>
  )
}
