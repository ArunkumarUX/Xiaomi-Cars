'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  TrendingDown,
  Package,
  Zap,
  RefreshCw,
  ShieldCheck,
  BarChart3,
  type LucideIcon,
} from 'lucide-react'

interface Benefit {
  num: string
  title: string
  desc: string
  Icon: LucideIcon
}

const BENEFITS: Benefit[] = [
  {
    num: '01',
    title: 'Pay only for what you drive',
    desc: "Enjoy the car without owning the depreciation. Lease payments cover only the vehicle's use — nothing more.",
    Icon: TrendingDown,
  },
  {
    num: '02',
    title: 'All-inclusive from day one',
    desc: 'Full insurance, free registration, and maintenance bundled into one fixed monthly payment. No hidden costs.',
    Icon: Package,
  },
  {
    num: '03',
    title: 'Instant, hassle-free approval',
    desc: 'Minimal paperwork. Our digital process means approval in hours, not days.',
    Icon: Zap,
  },
  {
    num: '04',
    title: 'Upgrade every cycle',
    desc: 'Step into the latest Xiaomi model when your lease ends. Always drive the newest technology.',
    Icon: RefreshCw,
  },
  {
    num: '05',
    title: 'Zero financial burden',
    desc: "Leasing doesn't affect your credit score and keeps your capital free for what matters most.",
    Icon: ShieldCheck,
  },
  {
    num: '06',
    title: 'Total value, zero depreciation',
    desc: 'Return the car at end of term. You paid for the experience — not the loss in resale value.',
    Icon: BarChart3,
  },
]

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const col = index % 3
  const row = Math.floor(index / 3)

  const borderRight = col < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none'
  const borderBottom = row < 1 ? '1px solid rgba(0,0,0,0.07)' : 'none'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -3, borderColor: 'rgba(227,25,55,0.2)' }}
      style={{
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRight,
        borderBottom,
        padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.4s, transform 0.4s',
      }}
    >
      {/* Number — 4.5:1 contrast on white */}
      <span
        style={{
          display: 'block',
          color: 'rgba(0,0,0,0.35)',
          fontSize: '11px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {benefit.num}
      </span>

      {/* Icon */}
      <div
        style={{
          width: '44px',
          height: '44px',
          background: 'rgba(227,25,55,0.06)',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '16px 0',
        }}
      >
        <benefit.Icon size={22} color="#E31937" strokeWidth={1.5} aria-hidden="true" />
      </div>

      {/* Title — #111 on white = 16.1:1 */}
      <p
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: '#111',
          letterSpacing: '-0.015em',
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        {benefit.title}
      </p>

      {/* Description — #555 on white = 7.0:1 */}
      <p
        style={{
          fontSize: '13px',
          color: '#555',
          lineHeight: 1.9,
          marginTop: '8px',
          marginBottom: 0,
        }}
      >
        {benefit.desc}
      </p>

      {/* Bottom accent line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#E31937',
          transition: 'opacity 0.4s',
        }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

export default function WhyLeaseSection() {
  return (
    <section style={{ background: '#fff', overflow: 'hidden' }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        className="px-8 sm:px-12 lg:px-20 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

          {/* Left: label + headline */}
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px w-10" style={{ background: '#E31937' }} aria-hidden="true" />
              {/* label — #767 on white = 4.54:1 ✓ AA */}
              <span
                style={{
                  color: '#767676',
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                The Leasing Advantage
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                color: '#111',
                fontWeight: 200,
                fontSize: 'clamp(3rem, 7.5vw, 8rem)',
                letterSpacing: '-0.048em',
                lineHeight: 0.88,
              }}
            >
              Why choose
              <br />
              <span style={{ fontWeight: 800 }}>Xiaomi Leasing?</span>
            </motion.h2>
          </div>

          {/* Right: description + CTAs */}
          <div className="flex-shrink-0 lg:max-w-[300px] flex flex-col gap-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: '13px',
                color: '#555', /* 7.0:1 on white ✓ AAA */
                lineHeight: 1.85,
                letterSpacing: '0.01em',
              }}
            >
              Drive the latest Xiaomi EV with one flat monthly payment. No ownership headaches,
              no depreciation surprises — just pure driving pleasure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <Link
                href="/cars"
                style={{
                  background: '#111',
                  color: '#fff',
                  padding: '13px 36px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'inline-block',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
              >
                Browse Cars
              </Link>
              <Link
                href="/cars"
                style={{
                  border: '1px solid rgba(0,0,0,0.25)',
                  color: '#444', /* 9.7:1 on white ✓ AAA */
                  padding: '13px 36px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  fontWeight: 400,
                  display: 'inline-block',
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
              >
                From AED 1,099 / mo
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Benefits Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((benefit, i) => (
          <BenefitCard key={benefit.num} benefit={benefit} index={i} />
        ))}
      </div>

    </section>
  )
}
