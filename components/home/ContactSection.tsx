'use client'

import { Phone, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { BRAND } from '@/lib/constants'

export default function ContactSection() {

  return (
    <section id="contact" style={{ background: '#fff' }}>
      {/* ── Header Block ──────────────────────────────────────────────── */}
      <div
        className="px-8 sm:px-12 lg:px-20 pt-16 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20"
        style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px w-10" style={{ background: '#E31937' }} />
              <span
                style={{
                  color: 'rgba(0,0,0,0.35)',
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                }}
              >
                Contact Us
              </span>
            </div>
            <h2
              style={{
                color: '#171a20',
                fontWeight: 200,
                fontSize: 'clamp(3rem, 7.5vw, 8rem)',
                letterSpacing: '-0.048em',
                lineHeight: 0.88,
              }}
            >
              Get a{' '}
              <br />
              <span style={{ fontWeight: 800 }}>free quote.</span>
            </h2>
          </div>
          <p
            className="flex-shrink-0 lg:max-w-[260px]"
            style={{
              color: 'rgba(0,0,0,0.45)',
              fontSize: '13px',
              lineHeight: 1.85,
              letterSpacing: '0.01em',
            }}
          >
            Our team will prepare a personalised lease offer within 24 hours. Fill in your details and a dedicated advisor will reach out to find the perfect plan for you.
          </p>
        </div>
      </div>

      {/* ── Content Area ──────────────────────────────────────────────── */}
      <div className="px-8 sm:px-12 lg:px-20 py-20">
        <div className="grid lg:grid-cols-5 gap-12">

          {/* ── CTA Card (left) ─────────────────────────────────────── */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                minHeight: '460px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://s1.xiaomiev.com/activity-outer-assets/0328/images/su7_20260319/pc/6-1.png"
                alt="Xiaomi SU7"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              />
              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.1) 100%)' }} />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(2rem, 4vw, 3rem)' }}>
                {/* Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ height: '1px', width: '24px', background: '#E31937' }} />
                  <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    Instant Quote
                  </span>
                </div>

                {/* Headline */}
                <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 0.95, margin: '0 0 16px', letterSpacing: '-0.04em' }}>
                  <span style={{ fontWeight: 200, color: '#fff', display: 'block' }}>Start your</span>
                  <span style={{ fontWeight: 800, color: '#fff', display: 'block' }}>lease journey.</span>
                </h3>

                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', margin: '0 0 32px', lineHeight: 1.7, maxWidth: '360px' }}>
                  Our AI advisor guides you through the entire leasing process — from choosing your car to scheduling pickup — in minutes.
                </p>

                {/* Feature chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                  {['Instant approval', 'Zero down payment', '5 models', 'All-inclusive'].map((label) => (
                    <span key={label} style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '100px',
                      padding: '5px 14px',
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.55)',
                    }}>
                      {label}
                    </span>
                  ))}
                </div>

                {/* CTA — fires event to open FloatingHub → Lease Now */}
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-lease-chatbot'))}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#E31937',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '15px 32px',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#fff',
                    cursor: 'pointer',
                    letterSpacing: '-0.01em',
                    boxShadow: '0 8px 32px rgba(227,25,55,0.25)',
                    transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.background = '#C41630'
                    el.style.transform = 'scale(1.02)'
                    el.style.boxShadow = '0 12px 40px rgba(227,25,55,0.35)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLButtonElement
                    el.style.background = '#E31937'
                    el.style.transform = 'scale(1)'
                    el.style.boxShadow = '0 8px 32px rgba(227,25,55,0.25)'
                  }}
                >
                  Get a Free Quote
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>

          {/* ── Right: Contact Info ──────────────────────────────────── */}
          <div className="lg:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Contact details card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h3 style={{ color: '#171a20', fontWeight: 600, fontSize: '14px', marginBottom: '20px', letterSpacing: '0.02em' }}>
                Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { href: `tel:${BRAND.phone}`, icon: Phone, label: 'Call Us', value: BRAND.phone },
                  { href: `mailto:${BRAND.email}`, icon: Mail, label: 'Email', value: BRAND.email },
                  { href: undefined, icon: MapPin, label: 'Address', value: BRAND.address },
                ].map(({ href, icon: Icon, label, value }) => {
                  const inner = (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="group">
                      <div
                        className="contact-icon-wrap"
                        style={{
                          width: '44px',
                          height: '44px',
                          background: 'rgba(227,25,55,0.06)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#E31937'
                          const svg = e.currentTarget.querySelector('svg')
                          if (svg) svg.style.color = 'white'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(227,25,55,0.06)'
                          const svg = e.currentTarget.querySelector('svg')
                          if (svg) svg.style.color = '#E31937'
                        }}
                      >
                        <Icon size={20} color="#E31937" style={{ transition: 'color 0.2s' }} />
                      </div>
                      <div>
                        <div style={{ color: 'rgba(0,0,0,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                          {label}
                        </div>
                        <div style={{ color: '#171a20', fontSize: '15px', fontWeight: 500, marginTop: '2px' }}>
                          {value}
                        </div>
                      </div>
                    </div>
                  )
                  return href ? (
                    <a key={label} href={href} style={{ textDecoration: 'none' }}>
                      {inner}
                    </a>
                  ) : (
                    <div key={label}>{inner}</div>
                  )
                })}
              </div>
            </motion.div>

            {/* Working hours card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h3 style={{ color: '#171a20', fontWeight: 600, fontSize: '14px', marginBottom: '16px', letterSpacing: '0.02em' }}>
                Working Hours
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM', closed: false },
                  { day: 'Saturday', hours: '10:00 AM – 5:00 PM', closed: false },
                  { day: 'Sunday', hours: 'Closed', closed: true },
                ].map(({ day, hours, closed }) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'rgba(0,0,0,0.5)', fontSize: '13px' }}>{day}</span>
                    <span style={{ color: closed ? 'rgba(255,80,80,0.8)' : '#E31937', fontSize: '13px', fontWeight: 500 }}>
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
