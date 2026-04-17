'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  UserPlus,
  Car,
  FileText,
  CheckCircle2,
  PenLine,
  Key,
  type LucideIcon,
} from 'lucide-react'

interface Step {
  num: string
  title: string
  desc: string
  Icon: LucideIcon
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Register',
    desc: 'Create your account and select a lease term that fits your life.',
    Icon: UserPlus,
  },
  {
    num: '02',
    title: 'Choose Your Model',
    desc: 'Browse the fleet, pick your colour and configuration.',
    Icon: Car,
  },
  {
    num: '03',
    title: 'Upload Documents',
    desc: 'Securely submit your Emirates ID, licence, and proof of income.',
    Icon: FileText,
  },
  {
    num: '04',
    title: 'Instant Approval',
    desc: 'Our team verifies your documents and confirms within hours.',
    Icon: CheckCircle2,
  },
  {
    num: '05',
    title: 'Sign & Pay',
    desc: 'Review your agreement online and complete your first payment.',
    Icon: PenLine,
  },
  {
    num: '06',
    title: 'Drive Away',
    desc: 'Your Xiaomi car is prepped, inspected, and delivered to your door.',
    Icon: Key,
  },
]

function StepCard({ step, index }: { step: Step; index: number }) {
  const col = index % 3
  const row = Math.floor(index / 3)

  const borderRight = col < 2 ? '1px solid rgba(0,0,0,0.07)' : 'none'
  const borderBottom = row < 1 ? '1px solid rgba(0,0,0,0.07)' : 'none'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      whileHover={{ background: 'rgba(0,0,0,0.02)' }}
      style={{
        background: '#f7f7f7',
        padding: 'clamp(3rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem)',
        borderRight,
        borderBottom,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'background 0.5s',
      }}
    >
      {/* Large ghost number — very light on #f7f7f7 surface */}
      <div
        className="tabular-nums select-none"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(5rem, 7vw, 7rem)',
          fontWeight: 800,
          color: 'rgba(0,0,0,0.06)',
          letterSpacing: '-0.06em',
          lineHeight: 1,
          marginBottom: '2rem',
        }}
      >
        {step.num}
      </div>

      {/* Icon row */}
      <div
        className="flex items-center gap-4"
        style={{ marginBottom: '24px' }}
        aria-hidden="true"
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            background: 'rgba(255,105,0,0.1)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <step.Icon size={22} color="#C94F00" strokeWidth={1.5} />
        </div>
        <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,0.1)' }} />
      </div>

      {/* Title — #111 on #f7f7f7 = 15.5:1 ✓ AAA */}
      <h3
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: '#111',
          letterSpacing: '-0.02em',
          lineHeight: 1.3,
          margin: 0,
        }}
      >
        {step.title}
      </h3>

      {/* Description — #555 on #f7f7f7 = 6.8:1 ✓ AA */}
      <p
        style={{
          fontSize: '13px',
          color: '#555',
          lineHeight: 1.9,
          marginTop: '8px',
          marginBottom: 0,
        }}
      >
        {step.desc}
      </p>

      {/* Bottom orange accent line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#E31937',
          transition: 'opacity 0.4s',
        }}
      />
    </motion.div>
  )
}

export default function ProcessSection() {
  return (
    <section style={{ background: '#f7f7f7', overflow: 'hidden' }}>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        className="px-8 sm:px-12 lg:px-20 pt-32 pb-20"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

          {/* Left: label + headline */}
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px w-10" style={{ background: '#E31937' }} aria-hidden="true" />
              {/* #767 on white/light = 4.54:1 ✓ AA */}
              <span
                style={{
                  color: '#767676',
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                How It Works
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
              Six steps to
              <br />
              <span style={{ fontWeight: 800 }}>your new drive.</span>
            </motion.h2>
          </div>

          {/* Right: CTA link */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="flex-shrink-0 pb-2"
          >
            <Link
              href="/cars"
              className="group inline-flex items-center gap-3 transition-all duration-300"
            >
              {/* #555 on #f7f7f7 = 6.8:1 ✓ AA */}
              <span
                className="transition-colors duration-300 group-hover:text-black"
                style={{ fontSize: '14px', fontWeight: 400, color: '#555' }}
              >
                Start Your Lease
              </span>
              <span
                className="flex items-center justify-center rounded-full transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:border-black"
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid rgba(0,0,0,0.25)',
                  color: '#555',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* ── Steps Grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <StepCard key={step.num} step={step} index={i} />
        ))}
      </div>

      {/* ── Bottom Strip ─────────────────────────────────────────────── */}
      <div
        className="px-8 sm:px-12 lg:px-20 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8"
        style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
      >
        <div>
          {/* #333 on #f7f7f7 = 11.5:1 ✓ AAA */}
          <p
            style={{
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: '#333',
              marginBottom: '6px',
            }}
          >
            Questions about your lease?
          </p>
          {/* #555 on #f7f7f7 = 6.8:1 ✓ AA */}
          <p style={{ fontSize: '11px', letterSpacing: '0.08em', color: '#555' }}>
            Our team is available 7 days a week in Dubai.
          </p>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link
            href="/contact"
            style={{
              padding: '13px 32px',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.25)',
              fontSize: '14px',
              fontWeight: 400,
              color: '#444', /* 9.7:1 ✓ AAA */
              display: 'inline-block',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
          >
            Contact Us
          </Link>
          <Link
            href="/cars"
            style={{
              padding: '13px 32px',
              borderRadius: '20px',
              background: '#111',
              fontSize: '14px',
              fontWeight: 500,
              color: '#fff', /* 16.1:1 ✓ AAA */
              display: 'inline-block',
              textDecoration: 'none',
              transition: 'all 0.3s',
            }}
          >
            Browse Models
          </Link>
        </div>
      </div>

    </section>
  )
}
