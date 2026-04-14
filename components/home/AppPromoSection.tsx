'use client'

import { Search, CalendarCheck, Settings, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const APP_FEATURES = [
  {
    icon: Search,
    label: 'Browse Models',
    description: 'Explore all Xiaomi EVs in our fleet',
  },
  {
    icon: CalendarCheck,
    label: 'Book Instantly',
    description: 'Reserve your car with one tap',
  },
  {
    icon: Settings,
    label: 'Manage Lease',
    description: 'View payments, mileage & documents',
  },
  {
    icon: MessageCircle,
    label: '24/7 Support',
    description: 'Chat with our team anytime',
  },
]

export default function AppPromoSection() {
  return (
    <section style={{ background: '#000' }}>

      {/* ── Header Block ──────────────────────────────────────────────── */}
      <div
        className="px-8 sm:px-12 lg:px-20 pt-32 pb-20"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div>
            <div className="flex items-center gap-5 mb-10">
              <div className="h-px w-10" style={{ background: '#E31937' }} />
              <span
                style={{
                  color: 'rgba(255,255,255,0.22)',
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                }}
              >
                Mobile App
              </span>
            </div>
            <h2
              className="text-white"
              style={{
                fontWeight: 200,
                fontSize: 'clamp(3rem, 7.5vw, 8rem)',
                letterSpacing: '-0.048em',
                lineHeight: 0.88,
              }}
            >
              Manage your
              <br />
              <span style={{ fontWeight: 800 }}>lease anywhere.</span>
            </h2>
          </div>
          <p
            className="flex-shrink-0 lg:max-w-[260px]"
            style={{
              color: 'rgba(255,255,255,0.28)',
              fontSize: '13px',
              lineHeight: 1.85,
              letterSpacing: '0.01em',
            }}
          >
            The Xiaomi Leasing app puts complete control in your hands. Browse, book, manage, and get support — all from your smartphone.
          </p>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="px-8 sm:px-12 lg:px-20 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Left: Feature cards + download buttons ─────────────── */}
          <div>
            {/* 2×2 feature grid */}
            <div className="grid grid-cols-2 gap-4">
              {APP_FEATURES.map(({ icon: Icon, label, description }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                  style={{
                    background: '#111111',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px',
                    padding: '28px 24px',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'default',
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'rgba(255,105,0,0.08)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={22} color="#E31937" />
                  </div>

                  {/* Text */}
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 600, marginTop: '16px' }}>
                    {label}
                  </div>
                  <div
                    style={{
                      color: 'rgba(255,255,255,0.35)',
                      fontSize: '11px',
                      marginTop: '4px',
                      lineHeight: 1.7,
                    }}
                  >
                    {description}
                  </div>

                  {/* Bottom orange accent line on hover */}
                  <div
                    className="feature-accent"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: '#E31937',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease',
                    }}
                  />

                  <style dangerouslySetInnerHTML={{ __html: `
                    .group:hover .feature-accent {
                      transform: scaleX(1);
                    }
                  ` }} />
                </motion.div>
              ))}
            </div>

            {/* Download buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '32px' }}>
              {/* App Store */}
              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  padding: '14px 24px',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,105,0,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255,105,0,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', lineHeight: 1 }}>Download on the</div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginTop: '2px' }}>App Store</div>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  padding: '14px 24px',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,105,0,0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255,105,0,0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                }}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 23.76c.31.17.67.19 1.01.04L15.31 12 3.81.5C3.48.35 3.12.37 2.81.54A1.5 1.5 0 002 1.9v20.2c0 .56.32 1.06.82 1.3.12.06.24.1.36.12v.24zM16.56 10.71L5.34 1.8l11.36 9.13-1.32 1.25 1.32 1.25L5.34 22.2l11.22-8.91 2.2-1.29-2.2-1.29zm1.53.92L17.8 12l.29-.3-2.77-1.62 2.77-1.62.29.3-.29-.29v.01z" />
                </svg>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', lineHeight: 1 }}>Get it on</div>
                  <div style={{ color: 'white', fontSize: '14px', fontWeight: 600, lineHeight: 1.3, marginTop: '2px' }}>Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* ── Right: Phone mockup ─────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '288px' }}>
              <motion.div
                initial={{ opacity: 0, x: 40, rotateY: 8 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ perspective: '1000px' }}
              >
                {/* Phone frame */}
                <div
                  style={{
                    position: 'relative',
                    background: '#111111',
                    borderRadius: '3.5rem',
                    border: '2px solid rgba(255,255,255,0.08)',
                    padding: '12px',
                    boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Notch */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '88px',
                      height: '20px',
                      background: '#0A0A0A',
                      borderRadius: '999px',
                      zIndex: 10,
                    }}
                  />

                  {/* Screen */}
                  <div
                    style={{
                      background: '#0A0A0A',
                      borderRadius: '2.8rem',
                      overflow: 'hidden',
                      aspectRatio: '9/19',
                    }}
                  >
                    <div
                      style={{
                        padding: '20px',
                        paddingTop: '40px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                      }}
                    >
                      {/* App header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Welcome back</div>
                          <div style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>Ahmed</div>
                        </div>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            background: '#E31937',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <span style={{ color: 'white', fontSize: '10px', fontWeight: 700 }}>AM</span>
                        </div>
                      </div>

                      {/* Active lease card */}
                      <div
                        style={{
                          background: '#E31937',
                          borderRadius: '16px',
                          padding: '16px',
                        }}
                      >
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px' }}>Active Lease</div>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>Xiaomi SU7 Pro</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                          <div>
                            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px' }}>Monthly</div>
                            <div style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>AED 1,299</div>
                          </div>
                          <div>
                            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px' }}>Next due</div>
                            <div style={{ color: 'white', fontWeight: 700, fontSize: '13px' }}>May 1</div>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div style={{ background: '#111111', borderRadius: '12px', padding: '12px' }}>
                          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px' }}>Mileage</div>
                          <div style={{ color: 'white', fontWeight: 700, fontSize: '12px' }}>12,450 km</div>
                          <div style={{ color: '#E31937', fontSize: '10px' }}>of 20,000</div>
                        </div>
                        <div style={{ background: '#111111', borderRadius: '12px', padding: '12px' }}>
                          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px' }}>Duration</div>
                          <div style={{ color: 'white', fontWeight: 700, fontSize: '12px' }}>18 mo left</div>
                          <div style={{ color: '#E31937', fontSize: '10px' }}>24 mo total</div>
                        </div>
                      </div>

                      {/* Quick actions */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {['Request Service', 'View Documents', 'Support'].map((action) => (
                          <div
                            key={action}
                            style={{
                              background: '#111111',
                              borderRadius: '12px',
                              padding: '10px 16px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>{action}</span>
                            <span style={{ color: '#E31937', fontSize: '14px' }}>›</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                    <div
                      style={{
                        width: '72px',
                        height: '4px',
                        background: 'rgba(255,255,255,0.12)',
                        borderRadius: '999px',
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Glow effect under phone */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-32px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '160px',
                  height: '80px',
                  background: 'rgba(255,105,0,0.2)',
                  borderRadius: '50%',
                  filter: 'blur(24px)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
