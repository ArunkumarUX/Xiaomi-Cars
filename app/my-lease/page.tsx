'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const STEPS = [
  {
    key: 'quotation',
    label: 'QUOTATION APPROVAL',
    status: 'Pending Approval',
    statusColor: '#E31937',
    icon: '📋',
  },
  {
    key: 'documents',
    label: 'DOCUMENT VERIFICATION',
    status: 'Pending Upload',
    statusColor: '#888',
    icon: '📄',
  },
  {
    key: 'pickup',
    label: 'VEHICLE READY FOR PICKUP',
    status: 'Pending Calendar',
    statusColor: '#888',
    icon: '🚗',
  },
]

const RIGHT_PANELS: Record<string, React.ReactNode> = {
  quotation: <QuotationApproval />,
  documents: <DocumentVerification />,
  pickup: <VehiclePickup />,
}

export default function MyLeasePage() {
  return (
    <Suspense>
      <MyLeaseContent />
    </Suspense>
  )
}

function MyLeaseContent() {
  const searchParams = useSearchParams()
  const carImg = searchParams.get('img') ?? 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=400&auto=format&fit=crop'
  const carColor = searchParams.get('color') ?? ''

  const [tab, setTab] = useState<'active' | 'inactive'>('active')
  const [activeStep, setActiveStep] = useState('quotation')

  return (
    <div className="min-h-screen pb-12" style={{ background: '#ebebeb' }}>

      {/* Breadcrumb */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', paddingTop: '60px' }}>
        <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-14 py-3">
          <div className="flex items-center gap-2 text-xs" style={{ color: '#aaa' }}>
            <Link href="/cars" className="hover:text-[#E31937] uppercase tracking-wider font-semibold">BROWSE CARS</Link>
            <span>›</span>
            <Link href="/cars/xiaomi-su7-standard" className="hover:text-[#E31937] uppercase tracking-wider font-semibold">XIAOMI SU7</Link>
            <span>›</span>
            <span className="uppercase tracking-wider font-semibold" style={{ color: '#ddd' }}>MY LEASE</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-14 py-8">

        {/* ACTIVE / INACTIVE tabs */}
        <div className="flex mb-6" style={{ borderBottom: '2px solid #ddd' }}>
          {(['active', 'inactive'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="font-black uppercase tracking-widest text-sm px-8 py-3 transition-all"
              style={{
                color: tab === t ? '#111' : '#aaa',
                borderBottom: tab === t ? '3px solid #E31937' : '3px solid transparent',
                marginBottom: '-2px',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'active' && (
          <div className="flex flex-col lg:flex-row gap-5">

            {/* LEFT — dark lease status panel */}
            <div
              className="lg:w-[280px] flex-shrink-0 rounded-2xl overflow-hidden"
              style={{ background: '#1A1A1A' }}
            >
              {/* Car summary */}
              <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid #2E2E2E' }}>
                <div
                  className="rounded-lg overflow-hidden flex-shrink-0"
                  style={{ width: '64px', height: '48px', background: '#333' }}
                >
                  <img
                    src={carImg}
                    alt="Xiaomi SU7"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-white font-black text-sm uppercase leading-tight">XIAOMI SU7</div>
                  {carColor ? (
                    <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: '#aaa' }}>
                      <span>{carColor}</span>
                    </div>
                  ) : null}
                  <div className="text-xs mt-0.5" style={{ color: '#888' }}>
                    AED 1,099 · MONTH · TERMS · 36 MONTHS
                  </div>
                </div>
              </div>

              {/* Steps with numbers */}
              <div className="px-4 py-3">
                {STEPS.map((step, i) => (
                  <button
                    key={step.key}
                    onClick={() => setActiveStep(step.key)}
                    className="w-full flex items-start gap-3 text-left transition-all mb-0"
                  >
                    {/* Number + vertical line */}
                    <div className="flex flex-col items-center flex-shrink-0" style={{ width: '28px' }}>
                      {/* Circle number */}
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                        style={{
                          background: activeStep === step.key ? '#E31937' : step.statusColor === '#E31937' ? '#E31937' : '#2E2E2E',
                          color: '#fff',
                          border: activeStep === step.key ? 'none' : '2px solid #3E3E3E',
                        }}
                      >
                        {i + 1}
                      </div>
                      {/* Vertical connector line */}
                      {i < STEPS.length - 1 && (
                        <div style={{ width: '2px', height: '48px', background: '#2E2E2E', marginTop: '2px' }} />
                      )}
                    </div>

                    {/* Step content */}
                    <div
                      className="flex-1 flex items-center justify-between rounded-xl px-3 py-2.5 mb-1"
                      style={{
                        background: activeStep === step.key ? '#2E2E2E' : 'transparent',
                        minHeight: '48px',
                      }}
                    >
                      <div>
                        <div className="text-white text-xs font-bold uppercase tracking-wide leading-tight">
                          {step.label}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: step.statusColor }}>
                          {step.status}
                        </div>
                      </div>
                      <span className="text-gray-600 text-sm ml-2">›</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — content panel */}
            <div className="flex-1 rounded-2xl overflow-hidden" style={{ background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
              {RIGHT_PANELS[activeStep]}
            </div>

          </div>
        )}

        {tab === 'inactive' && (
          <div className="text-center py-20 text-gray-400 text-sm">
            No inactive leases found.
          </div>
        )}

      </div>
    </div>
  )
}

function QuotationApproval() {
  return (
    <div className="p-8">
      <div className="mb-1">
        <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#888' }}>
          QUOTATION APPROVAL
        </div>
        <div className="text-sm font-semibold" style={{ color: '#E31937' }}>Pending Approval</div>
      </div>

      <div className="mt-6 mb-4">
        {/* PDF download row */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl mb-4"
          style={{ background: '#f8f8f8', border: '1px solid #eee' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: '#E31937' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: '#111' }}>QUOTATION.PDF</div>
              <div className="text-xs" style={{ color: '#aaa' }}>Download to view</div>
            </div>
          </div>
          <button
            className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg transition-all hover:opacity-80"
            style={{ background: '#E31937', color: '#fff' }}
          >
            Save Quotation
          </button>
        </div>

        {/* Info text */}
        <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
          You have a pending quotation requiring your review and acceptance. The quotation is only valid for 7 days and will expire afterwards.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mt-8">
        <button
          className="flex-1 font-bold uppercase tracking-wider text-sm py-3.5 rounded-xl transition-all hover:bg-gray-100"
          style={{ border: '2px solid #ddd', color: '#555', background: '#fff' }}
        >
          Decline quotation
        </button>
        <button
          className="flex-1 font-bold uppercase tracking-wider text-sm py-3.5 rounded-xl text-white transition-all hover:opacity-90"
          style={{ background: '#E31937' }}
        >
          Accept quotation
        </button>
      </div>
    </div>
  )
}

function DocumentVerification() {
  return (
    <div className="p-8">
      <div className="mb-1">
        <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#888' }}>
          DOCUMENT VERIFICATION
        </div>
        <div className="text-sm font-semibold" style={{ color: '#aaa' }}>Pending Upload</div>
      </div>
      <div className="mt-6 space-y-4">
        {['Emirates ID (Front)', 'Emirates ID (Back)', 'Driving Licence', 'Proof of Income'].map((doc) => (
          <div
            key={doc}
            className="flex items-center justify-between px-4 py-3 rounded-xl"
            style={{ background: '#f8f8f8', border: '1px dashed #ddd' }}
          >
            <span className="text-sm font-semibold" style={{ color: '#333' }}>{doc}</span>
            <button
              className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg"
              style={{ background: '#E31937', color: '#fff' }}
            >
              Upload
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function VehiclePickup() {
  return (
    <div className="p-8">
      <div className="mb-1">
        <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#888' }}>
          VEHICLE READY FOR PICKUP
        </div>
        <div className="text-sm font-semibold" style={{ color: '#aaa' }}>Pending Calendar</div>
      </div>
      <div className="mt-6">
        <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
          Your Xiaomi EV is ready for pickup. Please select a convenient date and location below.
        </p>
        <button
          className="w-full font-bold uppercase tracking-wider text-sm py-4 rounded-xl text-white transition-all hover:opacity-90"
          style={{ background: '#E31937' }}
        >
          Schedule Pickup
        </button>
      </div>
    </div>
  )
}
