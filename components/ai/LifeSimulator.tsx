'use client'

import Link from 'next/link'
import { CARS } from '@/lib/data'
import type { Car } from '@/lib/types'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Scenario {
  icon: string
  title: string
  description: string
  tags: string[]
  fitScore: number
  recommendedCar: Car
}

interface LifeSimulatorProps {
  carSlug: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScenarios(carSlug: string): Scenario[] {
  // Default cars per scenario — can be overridden by the current carSlug context
  const isSUV        = carSlug === 'xiaomi-yu7'
  const isPerformance = carSlug === 'xiaomi-su7-max' || carSlug === 'xiaomi-su7-ultra'
  const isRange       = carSlug === 'xiaomi-su7-pro'

  const su7Standard = CARS.find((c) => c.slug === 'xiaomi-su7-standard')!
  const su7Pro      = CARS.find((c) => c.slug === 'xiaomi-su7-pro')!
  const su7Max      = CARS.find((c) => c.slug === 'xiaomi-su7-max')!
  const yu7         = CARS.find((c) => c.slug === 'xiaomi-yu7')!

  // Pick the scenario-recommended car based on current car context
  const cityCarPick       = isPerformance ? su7Max : su7Standard
  const weekendCarPick    = isRange ? su7Pro : isPerformance ? su7Max : su7Pro
  const familyCarPick     = isSUV ? yu7 : yu7

  // Fit scores — slightly customised per context
  const cityScore    = isSUV ? 82 : isPerformance ? 91 : 94
  const weekendScore = isRange ? 97 : isPerformance ? 93 : 88
  const familyScore  = isSUV ? 96 : 79

  return [
    {
      icon: '🏙️',
      title: 'City Professional',
      description: 'Daily commutes, business meetings, and rooftop dinner reservations — all effortless.',
      tags: ['City driving', 'Business travel', 'Parking tech'],
      fitScore: cityScore,
      recommendedCar: cityCarPick,
    },
    {
      icon: '🏔️',
      title: 'Weekend Explorer',
      description: 'Mountain drives, coastal roads, and spontaneous road trips with zero range anxiety.',
      tags: ['Road trips', 'Long range', 'Fast charging'],
      fitScore: weekendScore,
      recommendedCar: weekendCarPick,
    },
    {
      icon: '👨‍👩‍👧',
      title: 'Family First',
      description: 'School runs, supermarket visits, and holiday travel — comfortable for everyone on board.',
      tags: ['Spacious cabin', 'Safety suite', 'Boot space'],
      fitScore: familyScore,
      recommendedCar: familyCarPick,
    },
  ]
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LifeSimulator({ carSlug }: LifeSimulatorProps) {
  const scenarios = getScenarios(carSlug)

  const simCss = `
        @keyframes barExpandSim {
          from { width: 0%; }
          to   { width: var(--bar-w); }
        }
        .sim-card {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 20px;
          padding: 32px 28px 28px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06), 0 0 0 0 transparent;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          cursor: default;
        }
        .sim-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          transform: translateY(-4px);
          border-color: rgba(0,0,0,0.12);
        }
        .sim-tag {
          background: rgba(0,0,0,0.04);
          color: rgba(0,0,0,0.45);
          border-radius: 100px;
          padding: 4px 10px;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 400;
        }
        .sim-explore-link {
          color: rgba(0,0,0,0.35);
          font-size: 12px;
          text-decoration: none;
          transition: color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .sim-explore-link:hover {
          color: #E31937;
        }
  `

  return (
    <section style={{ background: '#fff', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3.5rem)' }}>
      <style dangerouslySetInnerHTML={{ __html: simCss }} />

      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '56px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '24px', height: '2px', background: '#E31937', borderRadius: '2px' }} />
            <span style={{
              fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase',
              color: '#E31937', fontWeight: 400,
            }}>
              AI Life Simulator
            </span>
          </div>
          <h2 style={{
            fontWeight: 200, margin: 0,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            letterSpacing: '-0.04em',
            color: 'rgba(0,0,0,0.85)',
            lineHeight: 1.05,
          }}>
            Your life,{' '}
            <span style={{ fontWeight: 800 }}>reimagined.</span>
          </h2>
          <p style={{
            color: 'rgba(0,0,0,0.38)', fontSize: '14px',
            maxWidth: '420px', marginTop: '16px',
            lineHeight: 1.7,
          }}>
            See how different Xiaomi models fit the chapters of your life.
          </p>
        </div>

        {/* Scenario cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '20px',
          overflowX: 'auto',
        }}>
          {scenarios.map((scenario, idx) => (
            <div key={idx} className="sim-card">

              {/* Icon */}
              <div style={{
                fontSize: '32px', marginBottom: '16px', lineHeight: 1,
              }}>
                {scenario.icon}
              </div>

              {/* Title + description */}
              <h3 style={{
                fontSize: '16px', fontWeight: 600,
                color: 'rgba(0,0,0,0.82)', margin: '0 0 8px',
                letterSpacing: '-0.01em',
              }}>
                {scenario.title}
              </h3>
              <p style={{
                fontSize: '13px', color: 'rgba(0,0,0,0.42)',
                lineHeight: 1.65, margin: '0 0 16px',
              }}>
                {scenario.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {scenario.tags.map((tag) => (
                  <span key={tag} className="sim-tag">{tag}</span>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '20px' }} />

              {/* Recommended car */}
              <div style={{ marginBottom: '16px' }}>
                <span style={{
                  fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.28)', display: 'block', marginBottom: '6px',
                }}>
                  Best match
                </span>
                <span style={{
                  fontSize: '14px', fontWeight: 600, color: 'rgba(0,0,0,0.75)',
                }}>
                  {scenario.recommendedCar.fullName}
                </span>
                <span style={{
                  fontSize: '12px', color: 'rgba(0,0,0,0.3)', marginLeft: '8px',
                }}>
                  from AED {scenario.recommendedCar.pricePerMonth[36].toLocaleString()}/mo
                </span>
              </div>

              {/* Fit score */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: '8px',
                }}>
                  <span style={{
                    fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(0,0,0,0.28)',
                  }}>
                    Fit score
                  </span>
                  <span style={{
                    fontSize: '24px', fontWeight: 800,
                    color: '#E31937', lineHeight: 1,
                    letterSpacing: '-0.04em',
                  }}>
                    {scenario.fitScore}%
                  </span>
                </div>
                <div style={{
                  height: '3px', background: 'rgba(0,0,0,0.08)',
                  borderRadius: '100px', overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${scenario.fitScore}%`,
                    background: 'linear-gradient(to right, #E31937, #FF8C00)',
                    borderRadius: '100px',
                    transition: 'width 1.4s cubic-bezier(0.25,0.46,0.45,0.94)',
                  }} />
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/cars/${scenario.recommendedCar.slug}`}
                className="sim-explore-link"
              >
                Explore this life →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
