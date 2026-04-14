'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LEASE_OPTIONS } from '@/lib/constants'

export default function LeaseOptionsSection() {
  const [selected, setSelected] = useState<12 | 24 | 36>(24)

  return (
    <section style={{ background: '#f4f4f4' }} id="plans">
      {/* Full-width header */}
      <div
        style={{
          padding: 'clamp(5rem,8vw,8rem) clamp(2rem,5vw,5rem) clamp(3rem,5vw,5rem)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2.5rem',
          }}
        >
          {/* Left: label + headline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ height: '1px', width: '2.5rem', background: '#E31937' }} />
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.35)',
                  fontWeight: 500,
                }}
              >
                Lease Plans
              </span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(3.2rem,7vw,7.5rem)',
                letterSpacing: '-0.048em',
                lineHeight: 1.0,
                color: '#171a20',
                margin: 0,
              }}
            >
              <span style={{ fontWeight: 200 }}>Flexible</span>
              <br />
              <span style={{ fontWeight: 800 }}>lease options.</span>
            </h2>
          </div>

          {/* Right: description */}
          <div style={{ maxWidth: '380px' }}>
            <p
              style={{
                fontSize: '15px',
                color: 'rgba(0,0,0,0.45)',
                lineHeight: 1.75,
              }}
            >
              Choose the term that works for your lifestyle. All plans include insurance,
              registration, and maintenance — fully bundled, zero surprises.
            </p>
          </div>
        </div>
      </div>

      {/* Plans grid */}
      <div
        style={{
          padding: 'clamp(3rem,5vw,5rem) clamp(2rem,5vw,5rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {LEASE_OPTIONS.map((plan, i) => {
          const isHighlight = plan.highlight
          const isSelected = selected === plan.months

          return (
            <motion.div
              key={plan.months}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              onClick={() => setSelected(plan.months)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                padding: '40px 36px',
                cursor: 'pointer',
                transition: 'border-color 0.3s, transform 0.4s, box-shadow 0.4s',
                ...(isHighlight
                  ? {
                      background: '#171a20',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
                      transform: 'scale(1.03)',
                    }
                  : isSelected
                  ? {
                      background: '#fff',
                      border: '1px solid rgba(0,0,0,0.08)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      transform: 'translateY(-6px)',
                    }
                  : {
                      background: '#fff',
                      border: '1px solid rgba(0,0,0,0.08)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    }),
              }}
              className={isHighlight ? '' : 'lease-card'}
            >
              {/* Most Popular badge */}
              {isHighlight && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#E31937',
                    color: 'white',
                    padding: '5px 16px',
                    borderRadius: '100px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Month number */}
              <div
                style={{
                  fontSize: 'clamp(3.5rem,5vw,5rem)',
                  fontWeight: 100,
                  color: '#E31937',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                {plan.months}
              </div>

              {/* Months label */}
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: isHighlight ? 'white' : '#171a20',
                  marginTop: '4px',
                }}
              >
                Months
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '12px',
                  color: isHighlight ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.45)',
                  lineHeight: 1.85,
                  marginTop: '8px',
                  marginBottom: 0,
                }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: '1px',
                  background: isHighlight ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  margin: '24px 0',
                }}
              />

              {/* Pricing box */}
              <div
                style={{
                  background: isHighlight ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                  border: isHighlight ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '14px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    color: isHighlight ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginBottom: '6px',
                  }}
                >
                  Starting from
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: isHighlight ? 'white' : '#171a20',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    AED 999
                  </span>
                  <span style={{ fontSize: '13px', color: isHighlight ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}>/month</span>
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: isHighlight ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.35)',
                    marginTop: '4px',
                  }}
                >
                  20,000 km/year included
                </div>
              </div>

              {/* Inclusions */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0' }}>
                {plan.inclusions.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      padding: '12px 0',
                      borderBottom: idx < plan.inclusions.length - 1
                        ? isHighlight ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)'
                        : undefined,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E31937"
                      strokeWidth="2.5"
                      style={{ flexShrink: 0, marginTop: '1px' }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ fontSize: '13px', color: isHighlight ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div style={{ marginTop: '28px' }}>
                <Link href="/contact" style={{ display: 'block', textDecoration: 'none' }}>
                  <button
                    style={{
                      width: '100%',
                      padding: '15px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: isHighlight ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.25s',
                      ...(isHighlight
                        ? {
                            background: '#E31937',
                            color: 'white',
                            border: 'none',
                          }
                        : {
                            background: 'transparent',
                            color: 'rgba(0,0,0,0.55)',
                            border: '1px solid rgba(0,0,0,0.15)',
                          }),
                    }}
                    className={isHighlight ? '' : 'lease-cta-btn'}
                  >
                    Choose {plan.months} Months
                  </button>
                </Link>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footnote */}
      <div
        style={{
          textAlign: 'center',
          padding: '0 clamp(2rem,5vw,5rem) clamp(3rem,5vw,5rem)',
          fontSize: '12px',
          color: 'rgba(0,0,0,0.3)',
        }}
      >
        * Prices are indicative. Final monthly rate depends on vehicle model and credit approval.
        All plans include VAT as per UAE law.
      </div>

      {/* Hover styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .lease-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(255,105,0,0.3) !important;
          box-shadow: 0 16px 48px rgba(0,0,0,0.1) !important;
        }
        .lease-cta-btn:hover {
          border-color: rgba(255,105,0,0.5) !important;
          color: #E31937 !important;
        }
      ` }} />
    </section>
  )
}
