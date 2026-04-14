'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight, User } from 'lucide-react'
import { useSession, signIn, signOut } from 'next-auth/react'

const MOBILE_LINKS = [
  { label: 'SU7',        href: '/cars/xiaomi-su7-standard' },
  { label: 'SU7 Pro',    href: '/cars/xiaomi-su7-pro' },
  { label: 'SU7 Max',    href: '/cars/xiaomi-su7-max' },
  { label: 'SU7 Ultra',  href: '/cars/xiaomi-su7-ultra' },
  { label: 'YU7',        href: '/cars/xiaomi-yu7' },
  { label: 'All Models', href: '/cars' },
  { label: 'My Lease',   href: '/my-lease' },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  // On non-home pages the background is white from the start — always use dark styling
  const dark = isHomePage ? scrolled : true

  const { data: session, status } = useSession()
  const loggedIn = !!session
  const userName = session?.user?.name ?? ''
  const userImage = session?.user?.image ?? null
  const signingIn = status === 'loading'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || showLogin ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, showLogin])

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: window.location.href })
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          height: '68px',
          background: dark ? 'rgba(255,255,255,0.96)' : 'transparent',
          backdropFilter: dark ? 'blur(20px) saturate(180%)' : 'blur(0px)',
          WebkitBackdropFilter: dark ? 'blur(20px) saturate(180%)' : 'blur(0px)',
          borderBottom: dark ? '1px solid rgba(0,0,0,0.08)' : '1px solid transparent',
        }}
      >
        <div className="h-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10 flex-shrink-0">
            <img src="/images/xiaomi-logo.svg" alt="Xiaomi" className="h-7 w-auto" />
            <div className="hidden sm:block leading-none">
              <div style={{ color: dark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.8)' }} className="text-[10px] font-semibold uppercase tracking-[0.22em] leading-none transition-colors duration-700">
                Car Leasing
              </div>
              <div style={{ color: dark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.3)' }} className="text-[9px] tracking-[0.15em] leading-none mt-0.5 transition-colors duration-700">
                Dubai · UAE
              </div>
            </div>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-3">

            {/* Profile icon / avatar */}
            {loggedIn ? (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center justify-center rounded-full transition-all duration-300 hover:ring-2 hover:ring-white/20 overflow-hidden"
                style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #E31937, #C41630)', color: '#fff', fontSize: '13px', fontWeight: 700, flexShrink: 0 }}
                aria-label="Account"
              >
                {userImage
                  ? <img src={userImage} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : userName.charAt(0)
                }
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10"
                style={{ width: '36px', height: '36px', border: dark ? '1px solid rgba(0,0,0,0.15)' : '1px solid rgba(255,255,255,0.18)', color: dark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)', flexShrink: 0 }}
                aria-label="Login"
              >
                <User size={14} strokeWidth={1.5} />
              </button>
            )}

            {/* Login / name CTA */}
            {!loggedIn ? (
              <button
                onClick={() => setShowLogin(true)}
                className="hidden md:inline-flex items-center transition-all duration-300 hover:bg-white/90"
                style={{
                  background: dark ? 'rgba(23,26,32,0.9)' : '#fff',
                  color: dark ? '#fff' : '#000',
                  fontSize: '13px',
                  fontWeight: 400, letterSpacing: '0', padding: '8px 22px', borderRadius: '20px',
                  transition: 'background 0.7s, color 0.7s',
                }}
              >
                Login
              </button>
            ) : (
              <span className="hidden md:inline text-white/55 text-[13px]">
                {userName}
              </span>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex md:hidden transition-colors p-1"
              style={{ color: dark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)' }}
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Google Login Modal ──────────────────────────────────────────── */}
      {showLogin && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            onClick={() => !signingIn && setShowLogin(false)}
          />
          <div
            className="relative w-full mx-4"
            style={{
              maxWidth: '400px',
              background: '#fff',
              borderRadius: '24px',
              padding: '48px 40px 40px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
              animation: 'modalIn 0.35s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes modalIn {
                from { opacity: 0; transform: translateY(20px) scale(0.97); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
              }
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            ` }} />

            {/* Close */}
            {!signingIn && (
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-5 right-5 text-black/20 hover:text-black/50 transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            )}

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img src="/images/xiaomi-logo.svg" alt="Xiaomi" className="h-8 w-auto" />
            </div>

            {loggedIn ? (
              /* Logged-in state */
              <div className="text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #E31937, #C41630)' }}>
                  {userImage
                    ? <img src={userImage} alt={userName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : userName.charAt(0)
                  }
                </div>
                <p className="text-black/80 font-medium text-[15px] mb-1">{userName}</p>
                <p className="text-black/35 text-[13px] mb-8">{session?.user?.email ?? 'Signed in with Google'}</p>
                <Link href="/my-lease" onClick={() => setShowLogin(false)}>
                  <button className="w-full text-white text-[14px] py-3.5 rounded-full transition-all hover:opacity-90 mb-3"
                    style={{ background: '#E31937' }}>
                    My Lease
                  </button>
                </Link>
                <button
                  onClick={() => { signOut(); setShowLogin(false) }}
                  className="w-full text-black/40 text-[13px] py-2 hover:text-black/70 transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : signingIn ? (
              /* Loading state */
              <div className="text-center py-6">
                <div className="w-10 h-10 border-2 border-[#E31937]/20 border-t-[#E31937] rounded-full mx-auto mb-5"
                  style={{ animation: 'spin 0.8s linear infinite' }} />
                <p className="text-black/50 text-[14px]">Signing in with Google…</p>
              </div>
            ) : (
              /* Sign-in state */
              <>
                <h2 className="text-center text-[20px] font-semibold text-black/85 mb-2">
                  Sign in
                </h2>
                <p className="text-center text-black/40 text-[14px] mb-8">
                  to Xiaomi Car Leasing · Dubai UAE
                </p>

                {/* Google button */}
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-full border transition-all hover:bg-black/[0.03] mb-4"
                  style={{ border: '1px solid rgba(0,0,0,0.15)', color: '#3c4043', fontSize: '15px', fontWeight: 500 }}
                >
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  Continue with Google
                </button>

                <p className="text-center text-black/25 text-[11px] leading-relaxed">
                  By continuing, you agree to our{' '}
                  <a href="/terms" className="underline">Terms</a> and{' '}
                  <a href="/privacy" className="underline">Privacy Policy</a>
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[200] md:hidden transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'}`}
        role="dialog" aria-modal="true"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 flex flex-col transition-transform duration-400 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ background: '#0c0c0c', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between px-6" style={{ height: '68px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <img src="/images/xiaomi-logo.svg" alt="Xiaomi" className="h-6 w-auto" />
            <button onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.35)' }}>
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex-1 px-3 pt-4 space-y-0.5 overflow-y-auto">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.05] transition-all"
                style={{ fontSize: '13px', fontWeight: 400 }}
              >
                {link.label}
                <ChevronRight size={12} style={{ color: 'rgba(255,255,255,0.2)' }} />
              </Link>
            ))}
          </nav>
          <div className="p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <button
              onClick={() => { setMenuOpen(false); setShowLogin(true) }}
              className="flex items-center justify-center gap-2 w-full border border-white/15 text-white/60 text-center py-3.5 rounded-full transition-all hover:bg-white/5"
              style={{ fontSize: '12px' }}
            >
              <User size={13} strokeWidth={1.5} />
              {loggedIn ? userName : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
