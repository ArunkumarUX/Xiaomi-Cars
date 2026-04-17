import Link from 'next/link'
import { ArrowRight, Zap, Globe, Award, Users } from 'lucide-react'

const MILESTONES = [
  { year: '2010', event: 'Xiaomi founded in Beijing by Lei Jun and 7 co-founders' },
  { year: '2014', event: 'Listed as the world\'s 3rd most valuable tech startup' },
  { year: '2021', event: 'Xiaomi announces entry into car development' },
  { year: '2024', event: 'Xiaomi SU7 officially launched — fastest car debut in history' },
  { year: '2024', event: 'SU7 Ultra sets Nürburgring Nordschleife lap record' },
  { year: '2025', event: 'Xiaomi YU7 SUV launched · Xiaomi Leasing UAE established' },
]

const STATS = [
  { icon: Globe, value: '100+', label: 'Countries' },
  { icon: Users, value: '35M+', label: 'Loyal Fans Worldwide' },
  { icon: Zap, value: '1526 HP', label: 'SU7 Ultra Output' },
  { icon: Award, value: '#1', label: 'Car Debut Record 2024' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#111111]">
      {/* Hero */}
      <div className="bg-[#1A1A1A] border-b border-[#2E2E2E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-[#E31937]" />
            <span className="text-[#E31937] text-sm font-semibold uppercase tracking-wider">About</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 leading-tight">
            The Future of{' '}
            <span className="text-[#E31937]">Mobility</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
            Xiaomi is redefining what a car can be. And Xiaomi Cars UAE
            is bringing that revolution to the streets of Dubai.
          </p>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#2E2E2E] text-center">
                  <div className="w-12 h-12 bg-[#E31937]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-[#E31937]" />
                  </div>
                  <div className="text-3xl font-black text-[#E31937] mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-white mb-6">
                Xiaomi: <span className="text-[#E31937]">Innovation First</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Founded in 2010 in Beijing, Xiaomi started as a smartphone company and grew
                  to become one of the world&apos;s most innovative technology companies.
                  Today, Xiaomi is present in 100+ countries with a passionate global community.
                </p>
                <p>
                  In 2021, Xiaomi CEO Lei Jun made a bold announcement: Xiaomi would enter the
                  automotive industry. Three years later, the Xiaomi SU7 was born —
                  finding hundreds of thousands of owners and breaking every record in China&apos;s automotive market.
                </p>
                <p>
                  The Xiaomi SU7 Ultra then went further, setting a production car lap record at
                  the famous Nürburgring Nordschleife — cementing Xiaomi&apos;s place as a serious,
                  world-class automotive force.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-bold text-lg mb-5">Our Journey</h3>
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-14 text-[#E31937] font-black text-sm flex-shrink-0 pt-0.5">{m.year}</div>
                  <div className="flex-1 bg-[#1E1E1E] rounded-xl px-4 py-3 border border-[#2E2E2E] text-gray-300 text-sm">
                    {m.event}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Xiaomi Leasing UAE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A1A1A] rounded-3xl p-10 sm:p-16 border border-[#2E2E2E] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E31937]/5 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl font-black text-white mb-4">
                Xiaomi Cars <span className="text-[#E31937]">UAE</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Xiaomi Cars UAE is the authorised car sales platform for
                Xiaomi vehicles in the United Arab Emirates. We are committed to making
                Xiaomi&apos;s revolutionary technology accessible to everyone in the UAE through
                flexible, transparent, and fully managed purchase plans.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/cars"
                  className="bg-[#E31937] hover:bg-[#E55C00] text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
                >
                  View Our Fleet
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="border border-[#2E2E2E] text-gray-300 hover:border-[#E31937] hover:text-[#E31937] font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
