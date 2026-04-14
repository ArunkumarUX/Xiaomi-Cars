import Link from 'next/link'
import {
  CreditCard, Shield, FileCheck, HeartPulse, Wrench,
  TrendingDown, Umbrella, UserCheck, CheckCircle2, XCircle, ArrowRight
} from 'lucide-react'

const BENEFITS = [
  { icon: CreditCard, title: 'No Down Payment', description: 'Start leasing your Xiaomi EV with zero upfront cost. Just sign and drive away the same day.' },
  { icon: Shield, title: 'Full Comprehensive Insurance', description: '3rd party liability, natural disaster, and full cover included with every Xiaomi lease plan.' },
  { icon: FileCheck, title: 'Free Registration', description: 'Vehicle registration and annual renewal handled entirely by us — zero paperwork.' },
  { icon: HeartPulse, title: '24/7 Roadside Assistance', description: 'Round-the-clock support across the UAE. Day or night, we\'ve got you covered.' },
  { icon: Wrench, title: 'Full Maintenance Package', description: 'Scheduled service, parts, and labour covered for the full lease duration.' },
  { icon: TrendingDown, title: 'Zero Depreciation', description: 'Drive without the burden of ownership depreciation. Upgrade to the latest model easily.' },
  { icon: Umbrella, title: 'ILOE Cover', description: 'Involuntary Loss of Employment cover included so you\'re protected in any scenario.' },
  { icon: UserCheck, title: 'Personal Accident Insurance', description: 'Driver and passenger personal accident cover in every Xiaomi lease plan.' },
]

const COMPARISON = [
  { feature: 'Upfront cost', lease: 'Zero — drive today', own: 'Large deposit required' },
  { feature: 'Monthly budget', lease: 'Fixed, predictable payment', own: 'Loan + maintenance + insurance' },
  { feature: 'Insurance', lease: 'Included in lease price', own: 'Additional annual cost' },
  { feature: 'Maintenance', lease: 'Fully covered', own: 'Your expense throughout' },
  { feature: 'Registration', lease: 'Free, handled for you', own: 'Annual cost + admin time' },
  { feature: 'Depreciation risk', lease: 'None — not your asset', own: 'Full depreciation on you' },
  { feature: 'Upgrade flexibility', lease: 'New model at end of term', own: 'Sell first, then buy again' },
  { feature: 'Technology access', lease: 'Always latest Xiaomi tech', own: 'Stuck with what you bought' },
]

export default function WhyLeasePage() {
  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Hero */}
      <div className="bg-[#1A1A1A] border-b border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-[#E31937]" />
            <span className="text-[#E31937] text-sm font-semibold uppercase tracking-wider">Why Lease</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight">
            Leasing is the{' '}
            <span className="text-[#E31937]">Smarter Choice</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
            Discover why thousands of UAE residents choose to lease their Xiaomi EV rather than buy.
            More value, less worry.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-12 text-center">
            Everything <span className="text-[#E31937]">Included</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon
              return (
                <div
                  key={i}
                  className="group bg-[#1A1A1A] rounded-2xl p-6 border border-[#2E2E2E] hover:border-[#E31937]/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-[#E31937]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#E31937] transition-colors">
                    <Icon size={22} className="text-[#E31937] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-4 text-center">
            Lease vs. <span className="text-[#E31937]">Buy</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">See why leasing makes more financial sense in the UAE</p>

          <div className="bg-[#111111] rounded-2xl overflow-hidden border border-[#2E2E2E]">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#1E1E1E] border-b border-[#2E2E2E]">
              <div className="p-4 text-gray-500 text-sm font-semibold">Feature</div>
              <div className="p-4 text-center">
                <div className="text-[#E31937] font-bold">Lease with Xiaomi</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-gray-500 font-bold">Buy (Ownership)</div>
              </div>
            </div>

            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 border-b border-[#1E1E1E] hover:bg-[#1A1A1A] transition-colors ${
                  i === COMPARISON.length - 1 ? 'border-b-0' : ''
                }`}
              >
                <div className="p-4 text-gray-400 text-sm">{row.feature}</div>
                <div className="p-4 flex items-center justify-center gap-2">
                  <CheckCircle2 size={14} className="text-[#E31937] flex-shrink-0" />
                  <span className="text-green-400 text-sm text-center">{row.lease}</span>
                </div>
                <div className="p-4 flex items-center justify-center gap-2">
                  <XCircle size={14} className="text-red-500/60 flex-shrink-0" />
                  <span className="text-gray-500 text-sm text-center">{row.own}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Ready to <span className="text-[#E31937]">Drive Smarter?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Explore our Xiaomi EV fleet and get a personalised lease quote today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/cars"
              className="bg-[#E31937] hover:bg-[#E55C00] text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(255,105,0,0.3)]"
            >
              Explore Cars
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="border border-[#E31937] text-[#E31937] hover:bg-[#E31937] hover:text-white font-semibold px-8 py-4 rounded-xl transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
