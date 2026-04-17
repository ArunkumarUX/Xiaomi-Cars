'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const REQUIREMENTS = [
  {
    num: '01',
    title: 'Valid Emirates ID',
    desc: 'UAE resident with a current, valid Emirates ID card',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Driving Licence',
    desc: 'UAE or transferable licence held for at least 1 year',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
        <rect x="7" y="15" width="10" height="4" rx="2"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Age 25 or above',
    desc: 'Minimum age of 25 years at the time of purchase or financing application',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4"/>
        <path d="M20 21a8 8 0 1 0-16 0"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Confirmed Employment',
    desc: 'Active employment or an established business in the UAE',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'UAE Bank Account',
    desc: 'Active UAE bank account for financing or direct purchase payments',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="3 7 12 2 21 7 21 17 12 22 3 17 3 7"/>
        <line x1="12" y1="22" x2="12" y2="12"/>
        <polyline points="21 7 12 12 3 7"/>
      </svg>
    ),
  },
]

export default function EligibilitySection() {
  return (
    <section style={{ background: '#fff' }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        className="px-8 sm:px-12 lg:px-20 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div style={{ height: '1px', width: '40px', background: '#E31937' }} />
              <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
                Requirements
              </span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ color: '#111', fontWeight: 200, fontSize: 'clamp(3rem,7.5vw,8rem)', letterSpacing: '-0.048em', lineHeight: 0.88 }}
            >
              You&apos;re probably<br />
              <span style={{ fontWeight: 800 }}>already qualified.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-shrink-0 lg:max-w-[280px]"
            style={{ color: 'rgba(0,0,0,0.45)', fontSize: '13px', lineHeight: 1.85 }}
          >
            Most UAE residents qualify within minutes. Five straightforward requirements — and our team handles everything else from there.
          </motion.p>
        </div>
      </div>

      {/* ── Requirements — 5-column horizontal list ─────────────────── */}
      <div className="px-8 sm:px-12 lg:px-20 pt-20 pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
          {REQUIREMENTS.map((req, i) => (
            <motion.div
              key={req.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Icon + number */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{
                  width: '36px', height: '36px',
                  background: 'rgba(227,25,55,0.05)',
                  border: '1px solid rgba(227,25,55,0.12)',
                  borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {req.icon}
                </div>
                <span style={{
                  fontSize: '10px', color: 'rgba(0,0,0,0.25)',
                  letterSpacing: '0.24em', textTransform: 'uppercase', fontWeight: 600,
                }}>
                  {req.num}
                </span>
              </div>

              <div style={{ fontSize: '14px', fontWeight: 600, color: '#111', marginBottom: '6px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {req.title}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.45)', lineHeight: 1.85 }}>
                {req.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── CTA row ─────────────────────────────────────────────────── */}
      <div
        className="px-8 sm:px-12 lg:px-20 pb-20"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
          <Link
            href="/contact"
            className="hover:bg-[#C41630] transition-colors duration-200"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#E31937', color: '#fff',
              padding: '14px 36px', borderRadius: '4px',
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em',
              textDecoration: 'none',
            }}
          >
            Buy Now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)', lineHeight: 1.5 }}>
              Approval in under 24 hours · Flexible financing available
            </span>
          </div>
        </div>
      </div>

    </section>
  )
}
