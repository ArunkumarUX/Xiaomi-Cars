'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const FAQS = [
  {
    q: 'Who can lease a Xiaomi EV in Dubai?',
    a: 'UAE residents with a valid Emirates ID, a driving licence held for at least one year, confirmed employment or business ownership, and an active UAE bank account. Minimum age is 25.',
  },
  {
    q: "What's included in every lease?",
    a: 'Free vehicle registration, comprehensive insurance (third-party, natural disaster, and personal accident cover), full scheduled maintenance, 24/7 roadside assistance, and a 20,000 km annual mileage allowance — all in one fixed monthly payment.',
  },
  {
    q: 'Which lease terms are available?',
    a: 'We offer 12, 24, and 36-month terms. The 24-month plan is the most popular — balancing optimal flexibility with the lowest monthly rate.',
  },
  {
    q: 'How are payments made?',
    a: 'Fixed equal monthly payments via direct debit, credit card, or UAE bank transfer. No hidden fees, no balloon payments — ever.',
  },
  {
    q: 'Can I upgrade at the end of my lease?',
    a: 'Yes. At lease-end you can seamlessly transition into the latest Xiaomi model, extend your current lease, or simply return the vehicle — with zero obligation to purchase.',
  },
]

const STATS = [
  { value: '5 min', label: 'Average application time' },
  { value: '24h', label: 'Response time' },
  { value: '7 days', label: 'Support availability' },
  { value: 'Zero', label: 'Hidden fees, ever' },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section style={{ background: '#fff', overflow: 'hidden' }}>
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '720px' }}>

        {/* ── Left Panel ──────────────────────────────────────────────── */}
        <div
          className="w-full lg:w-[44%] flex-shrink-0 flex flex-col justify-center"
          style={{
            background: '#fff',
            padding: 'clamp(5rem,9vw,9rem) clamp(2rem,5vw,5rem)',
          }}
        >
          {/* Section label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div style={{ height: '1px', width: '40px', background: '#E31937' }} />
            <span style={{
              color: 'rgba(0,0,0,0.35)',
              fontSize: '10px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
            }}>
              Frequently Asked
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontWeight: 200,
              fontSize: 'clamp(2.8rem,5vw,5.5rem)',
              letterSpacing: '-0.048em',
              lineHeight: 0.88,
              color: '#171a20',
              marginBottom: '40px',
            }}
          >
            Questions<br />
            <span style={{ fontWeight: 800 }}>answered.</span>
          </h2>

          {/* Stat cards 2×2 */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginTop: '0',
              maxWidth: '360px',
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: '#f4f4f4',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '14px',
                  padding: '18px 20px',
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#E31937', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(0,0,0,0.45)', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Contact nudge */}
          <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ height: '1px', width: '32px', background: 'rgba(0,0,0,0.1)' }} />
            <a href="/contact" style={{ fontSize: '13px', fontWeight: 400, color: 'rgba(0,0,0,0.4)', textDecoration: 'none' }}>
              More questions? Contact us →
            </a>
          </div>
        </div>

        {/* ── Right Panel — Accordion ──────────────────────────────────── */}
        <div
          className="flex-1 flex flex-col justify-center"
          style={{
            background: '#f4f4f4',
            padding: 'clamp(5rem,9vw,9rem) clamp(2rem,5vw,5rem)',
            borderLeft: '1px solid rgba(0,0,0,0.07)',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            {FAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
              >
                <button
                  className="w-full flex items-start justify-between gap-8 py-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.55,
                      color: openIndex === i ? '#171a20' : 'rgba(0,0,0,0.45)',
                      transition: 'color 0.3s',
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 mt-0.5"
                    style={{
                      fontSize: '22px',
                      fontWeight: 200,
                      lineHeight: 1,
                      color: openIndex === i ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.2)',
                      display: 'inline-block',
                      transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), color 0.3s',
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: openIndex === i ? '280px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
                  }}
                >
                  <p
                    className="pb-7 pr-4 sm:pr-10"
                    style={{
                      color: 'rgba(0,0,0,0.5)',
                      fontSize: '12px',
                      lineHeight: 1.95,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
