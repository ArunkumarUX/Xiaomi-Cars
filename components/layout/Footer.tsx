'use client'

import Link from 'next/link'

const FOOTER_LINKS = [
  {
    heading: 'Models',
    links: [
      { label: 'SU7',               href: '/cars/xiaomi-su7-standard' },
      { label: 'SU7 Pro',           href: '/cars/xiaomi-su7-pro' },
      { label: 'SU7 Max',           href: '/cars/xiaomi-su7-max' },
      { label: 'SU7 Ultra',         href: '/cars/xiaomi-su7-ultra' },
      { label: 'YU7',               href: '/cars/xiaomi-yu7' },
      { label: 'YU7 Pro',           href: '/cars/xiaomi-yu7-pro' },
      { label: 'YU7 Max',           href: '/cars/xiaomi-yu7-max' },
    ],
  },
  {
    heading: 'Buying',
    links: [
      { label: 'Browse Cars',       href: '/cars' },
      { label: 'Why Buy',           href: '/why-lease' },
      { label: 'My Orders',         href: '/my-lease' },
      { label: 'How It Works',      href: '/#how-it-works' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',          href: '/about' },
      { label: 'Contact',           href: '/contact' },
      { label: 'Privacy Policy',    href: '/privacy' },
      { label: 'Terms & Conditions',href: '/terms' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-20 py-20 lg:py-28">

        {/* Top row */}
        <div
          className="flex flex-col lg:flex-row lg:justify-between gap-16 mb-20 pb-20"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Brand */}
          <div className="lg:w-[30%]">
            <div className="flex items-center gap-3 mb-8">
              <img src="/images/xiaomi-logo.svg" alt="Xiaomi" className="h-8 w-auto" />
              <div>
                <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', lineHeight: 1 }}>
                  Xiaomi Cars
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '9px', letterSpacing: '0.15em', lineHeight: 1, marginTop: '4px' }}>
                  Dubai · UAE
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', lineHeight: 1.9, maxWidth: '250px', marginBottom: '32px', letterSpacing: '0.01em' }}>
              Own a Xiaomi car with flexible financing, full warranty, and free registration.
            </p>
            {/* Social */}
            <div className="flex gap-6">
              {[
                {
                  href: 'https://www.instagram.com/xiaomi/',
                  label: 'Instagram',
                  path: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </>
                  ),
                },
                {
                  href: 'https://www.linkedin.com/company/xiaomi/',
                  label: 'LinkedIn',
                  path: (
                    <>
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </>
                  ),
                },
                {
                  href: 'https://www.youtube.com/@XiaomiGlobal',
                  label: 'YouTube',
                  path: (
                    <>
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                    </>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ color: 'rgba(255,255,255,0.45)', transition: 'color 0.3s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.85)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {s.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 lg:gap-20">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.26em', marginBottom: '24px', fontWeight: 600 }}>
                  {col.heading}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        style={{
                          fontSize: '13px',
                          letterSpacing: '-0.01em',
                          lineHeight: 1,
                          color: 'rgba(255,255,255,0.6)',
                          textDecoration: 'none',
                          transition: 'color 0.3s',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.08em' }}>
            © 2026 Xiaomi Cars UAE · All rights reserved
          </p>
          <div style={{
            fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em',
            padding: '8px 16px', borderRadius: '4px',
            background: 'rgba(255,255,255,0.07)',
            color: 'rgba(255,255,255,0.45)',
          }}>
            Dubai Silicon Oasis · UAE
          </div>
        </div>

      </div>
    </footer>
  )
}
