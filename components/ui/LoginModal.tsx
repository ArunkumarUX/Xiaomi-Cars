'use client'

import { useState } from 'react'

interface LoginModalProps {
  onClose: () => void
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [view, setView] = useState<'login' | 'register'>('login')
  const [tab, setTab] = useState<'email' | 'mobile'>('email')
  const [showPassword, setShowPassword] = useState(false)
  const [showRegPassword, setShowRegPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const inputClass = "w-full px-4 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E31937] transition-all"
  const inputStyle = { border: '1.5px solid #e5e5e5', color: '#111', background: '#fff' }
  const labelStyle = { color: '#111', fontWeight: 600, fontSize: '14px', marginBottom: '6px', display: 'block' }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {view === 'login' ? (
        /* ── LOGIN MODAL ── */
        <div
          className="w-full max-w-[600px] mx-4 rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}
        >
          {/* TOP — dark promo banner */}
          <div
            className="relative flex items-center px-8 py-6"
            style={{
              background: 'linear-gradient(135deg, #1a1a2e 0%, #2d3561 50%, #1a2a3a 100%)',
              minHeight: '180px',
            }}
          >
            <div className="absolute top-5 left-6 flex items-center gap-2 z-10">
              <img src="/images/xiaomi-logo.svg" alt="Xiaomi" className="h-8 w-auto" />
              <span className="text-[#E31937] font-semibold text-sm lowercase tracking-wide">leasing</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-end pr-4 opacity-80">
              <img
                src="/images/cars/su7-hero.jpg"
                alt="Xiaomi SU7"
                className="h-full object-cover object-center w-3/4"
                style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 40%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.9) 40%, transparent 100%)' }}
              />
            </div>
          </div>

          {/* BOTTOM — white form */}
          <div className="bg-white px-8 py-8">
            <h2 className="font-black text-2xl text-center mb-6 uppercase tracking-wider" style={{ color: '#111' }}>
              LOGIN
            </h2>

            {/* Tabs */}
            <div className="flex mb-6" style={{ borderBottom: '2px solid #eee' }}>
              {(['email', 'mobile'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="flex-1 pb-3 text-sm font-bold uppercase tracking-wider transition-all"
                  style={{
                    color: tab === t ? '#E31937' : '#aaa',
                    borderBottom: tab === t ? '2px solid #E31937' : '2px solid transparent',
                    marginBottom: '-2px',
                  }}
                >
                  {t === 'email' ? 'EMAIL' : 'MOBILE NUMBER'}
                </button>
              ))}
            </div>

            {tab === 'email' ? (
              <div className="space-y-4">
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" placeholder="Email" className={inputClass} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      className={inputClass + ' pr-12'}
                      style={inputStyle}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>
                <div>
                  <button className="text-sm font-semibold" style={{ color: '#E31937' }}>Forgot Password ?</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label style={labelStyle}>Mobile Number</label>
                  <div className="flex rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e5e5e5' }}>
                    <div className="flex items-center gap-2 px-3 py-3 flex-shrink-0 bg-white" style={{ borderRight: '1.5px solid #e5e5e5' }}>
                      <span>🇦🇪</span>
                      <span className="text-sm font-semibold text-gray-700">+971</span>
                    </div>
                    <input type="tel" placeholder="5X XXX XXXX"
                      className="flex-1 px-4 py-3 text-sm focus:outline-none bg-white" style={{ color: '#111' }} />
                  </div>
                </div>
              </div>
            )}

            <button className="w-full font-bold uppercase tracking-wider text-sm py-4 rounded-2xl text-white transition-all mt-6 hover:opacity-90"
              style={{ background: '#FF9A76' }}>
              Login
            </button>

            <div className="text-center mt-5 space-y-2">
              <p className="text-sm" style={{ color: '#555' }}>
                Don&apos;t have an account ?{' '}
                <button className="font-bold" style={{ color: '#E31937' }} onClick={() => setView('register')}>
                  Register
                </button>
              </p>
              <button onClick={onClose} className="text-sm font-bold" style={{ color: '#E31937' }}>Skip</button>
            </div>
          </div>
        </div>
      ) : (
        /* ── REGISTER MODAL ── */
        <div
          className="w-full max-w-[680px] mx-4 bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}
        >
          <div className="px-10 py-8">
            {/* Logo */}
            <div className="flex items-center gap-1.5 mb-6">
              <img src="/images/xiaomi-logo.svg" alt="Xiaomi" className="h-9 w-auto" />
              <span className="text-[#E31937] font-semibold text-sm lowercase tracking-wide">leasing</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-black text-center mb-8" style={{ color: '#111' }}>
              Create New Account
            </h2>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" placeholder="Full Name" className={inputClass} style={inputStyle} />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email Address</label>
                <input type="email" placeholder="Email" className={inputClass} style={inputStyle} />
              </div>

              {/* Mobile Number */}
              <div>
                <label style={labelStyle}>Mobile Number</label>
                <div className="flex rounded-2xl overflow-hidden" style={{ border: '1.5px solid #e5e5e5' }}>
                  <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0 bg-white" style={{ borderRight: '1.5px solid #e5e5e5' }}>
                    <span>🇦🇪</span>
                    <span className="text-sm font-semibold text-gray-700">+971</span>
                  </div>
                  <input type="tel" placeholder="Enter Your Mobile No"
                    className="flex-1 px-4 py-3 text-sm focus:outline-none bg-white" style={{ color: '#111' }} />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label style={labelStyle}>Date of Birth</label>
                <div className="relative">
                  <input type="date" placeholder="Date of Birth"
                    className={inputClass + ' pr-12'}
                    style={{ ...inputStyle, color: '#999' }}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#E31937' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                </div>
              </div>

              {/* Password */}
              <div>
                <label style={labelStyle}>Password</label>
                <div className="relative">
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className={inputClass + ' pr-12'}
                    style={inputStyle}
                  />
                  <button type="button" onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#aaa' }}>
                    <EyeIcon open={showRegPassword} />
                  </button>
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 accent-[#E31937] cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm cursor-pointer" style={{ color: '#333' }}>
                  I agree to the{' '}
                  <button className="font-semibold underline" style={{ color: '#E31937' }}>Terms of Use</button>
                </label>
              </div>
            </div>

            {/* Register button */}
            <button
              className="w-full font-bold uppercase tracking-wider text-sm py-4 rounded-2xl text-white transition-all mt-7 hover:opacity-90"
              style={{ background: agreed ? '#555' : '#aaa', cursor: agreed ? 'pointer' : 'not-allowed' }}
            >
              Register
            </button>

            {/* Already have account */}
            <p className="text-center text-sm mt-5" style={{ color: '#555' }}>
              Already have an account ?{' '}
              <button className="font-bold" style={{ color: '#E31937' }} onClick={() => setView('login')}>
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {open
        ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
        : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      }
    </svg>
  )
}
