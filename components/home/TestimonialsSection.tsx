'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/data'

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1))

  const testimonial = TESTIMONIALS[current]

  return (
    <section style={{ background: '#fff', overflow: 'hidden' }}>
      {/* Full-width header */}
      <div
        style={{
          padding: 'clamp(5rem,8vw,8rem) clamp(2rem,5vw,5rem) clamp(3rem,5vw,5rem)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
        }}
      >
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
              Testimonials
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
            <span style={{ fontWeight: 200 }}>What our</span>
            <br />
            <span style={{ fontWeight: 800 }}>customers say.</span>
          </h2>
        </div>
      </div>

      {/* Carousel area */}
      <div
        style={{
          padding: 'clamp(3rem,5vw,5rem) clamp(2rem,5vw,5rem)',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {/* Main testimonial card */}
        <div
          style={{
            background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: '8px',
            padding: 'clamp(2.5rem,4vw,4rem)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
          }}
        >
          {/* Decorative quote SVG */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E31937"
            strokeWidth="1.5"
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              opacity: 0.2,
              pointerEvents: 'none',
            }}
          >
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2h4c0 3-1 4-4 5z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2h4c0 3-1 4-4 5z" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#E31937"
                    stroke="#E31937"
                    strokeWidth="1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <blockquote
                style={{
                  fontSize: 'clamp(1.1rem,2.5vw,1.35rem)',
                  fontWeight: 200,
                  color: 'rgba(0,0,0,0.8)',
                  lineHeight: 1.65,
                  margin: '0 0 32px',
                }}
              >
                &ldquo;{testimonial.review}&rdquo;
              </blockquote>

              {/* Author row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    background: '#E31937',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '18px',
                    flexShrink: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {testimonial.avatar.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: '#171a20' }}>
                    {testimonial.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#E31937', marginTop: '2px' }}>
                    {testimonial.car}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(0,0,0,0.35)', marginTop: '2px' }}>
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            marginTop: '32px',
          }}
        >
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.04)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            className="nav-btn"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  height: '4px',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  padding: 0,
                  ...(i === current
                    ? { width: '32px', background: '#E31937' }
                    : { width: '8px', background: 'rgba(0,0,0,0.15)' }),
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.04)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            className="nav-btn"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mini reviewer pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '32px',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setCurrent(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                ...(i === current
                  ? {
                      border: '1px solid rgba(227,25,55,0.3)',
                      background: 'rgba(227,25,55,0.06)',
                      color: '#E31937',
                    }
                  : {
                      border: '1px solid rgba(0,0,0,0.1)',
                      background: 'transparent',
                      color: 'rgba(0,0,0,0.4)',
                    }),
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  flexShrink: 0,
                  ...(i === current
                    ? { background: '#E31937', color: 'white' }
                    : { background: 'rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.4)' }),
                }}
              >
                {t.avatar.charAt(0)}
              </div>
              {t.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Hover styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-btn:hover {
          border-color: #E31937 !important;
          color: #E31937 !important;
          background: rgba(227,25,55,0.05) !important;
        }
      ` }} />
    </section>
  )
}
