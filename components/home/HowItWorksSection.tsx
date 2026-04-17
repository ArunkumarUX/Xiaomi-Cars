'use client'

import { useState } from 'react'

const STEPS = [
  {
    number: '01',
    title: 'Browse',
    desc: 'Explore our full range of Xiaomi cars. Filter by model, body type, or budget.',
    image: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/su7_20260319/pc/6-1.png',
    icon: 'search',
  },
  {
    number: '02',
    title: 'Choose',
    desc: 'Select your preferred model and financing term — 12, 24, or 36 months.',
    image: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/su7_20260319/pc/6-3.png',
    icon: 'car',
  },
  {
    number: '03',
    title: 'Apply',
    desc: 'Submit your purchase enquiry online. Our team confirms pricing and availability within 24 hours.',
    image: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/su7_20260319/pc/6-7.png',
    icon: 'clipboard',
  },
  {
    number: '04',
    title: 'Drive',
    desc: 'Sign your purchase agreement, collect your Xiaomi car, and start driving the future today.',
    image: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/yu7_20250626/pc/9.1.png',
    icon: 'key',
  },
] as const

type IconName = 'search' | 'car' | 'clipboard' | 'key'

function StepIcon({ name }: { name: IconName }) {
  const shared = {
    stroke: '#E31937',
    strokeWidth: 1.5,
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  if (name === 'search') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" {...shared}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    )
  }
  if (name === 'car') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" {...shared}>
        <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <rect x="7" y="15" width="10" height="4" rx="2" />
      </svg>
    )
  }
  if (name === 'clipboard') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" {...shared}>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </svg>
    )
  }
  // key
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...shared}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M21 2l-9.6 9.6" />
      <path d="M15.5 7.5l3 3L22 7l-3-3" />
    </svg>
  )
}

function StepCard({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`relative overflow-hidden group cursor-pointer ${index % 2 === 0 ? 'sm:border-r' : ''} ${index < 2 ? 'border-b' : ''} border-[rgba(0,0,0,0.07)]`}
      style={{ aspectRatio: '4/3' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <img
        src={step.image}
        alt={step.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: 'transform 1.4s cubic-bezier(0.25,0.46,0.45,0.94)',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
        loading="lazy"
      />

      {/* Gradient scrim */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      {/* Hover darkening overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: 'rgba(0,0,0,0.18)',
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-10 sm:p-12">
        {/* Top: step number + icon pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              color: 'rgba(255,255,255,0.18)',
              fontSize: '11px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            {step.number}
          </span>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <StepIcon name={step.icon} />
          </div>
        </div>

        {/* Bottom: title + desc */}
        <div>
          <h3
            className="text-white mb-3 transition-transform duration-500 group-hover:-translate-y-1"
            style={{
              fontWeight: 600,
              fontSize: 'clamp(1.4rem,2.8vw,2rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}
          >
            {step.title}
          </h3>
          <p
            className="text-white/35 transition-colors duration-500 group-hover:text-white/55"
            style={{ fontSize: '12px', maxWidth: '260px', lineHeight: 1.85 }}
          >
            {step.desc}
          </p>
        </div>
      </div>

      {/* Bottom hover accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/0 group-hover:bg-white/12 transition-all duration-500" />
    </div>
  )
}

export default function HowItWorksSection() {
  return (
    <section style={{ background: '#fff' }} id="how-it-works">

      {/* ── Section Header ────────────────────────────────────────────── */}
      <div
        className="px-8 sm:px-12 lg:px-20 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div style={{ height: '1px', width: '40px', background: '#E31937' }} />
              <span
                style={{
                  color: 'rgba(0,0,0,0.35)',
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                }}
              >
                The Process
              </span>
            </div>
            <h2
              style={{
                color: '#171a20',
                fontWeight: 200,
                fontSize: 'clamp(3rem,7.5vw,8rem)',
                letterSpacing: '-0.048em',
                lineHeight: 0.88,
              }}
            >
              From browse<br />
              <span style={{ fontWeight: 800 }}>to owning.</span>
            </h2>
          </div>
          <p
            style={{ color: 'rgba(0,0,0,0.45)', fontSize: '13px', lineHeight: 1.85, letterSpacing: '0.01em' }}
            className="flex-shrink-0 lg:max-w-[260px]"
          >
            Four straightforward steps from discovering your Xiaomi car to owning it — all managed online in under 24 hours.
          </p>
        </div>
      </div>

      {/* ── 2×2 Grid ─────────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        {STEPS.map((step, i) => (
          <StepCard key={i} step={step} index={i} />
        ))}
      </div>

    </section>
  )
}
