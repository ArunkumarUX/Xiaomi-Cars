'use client'

import { useState, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimeTravelProps {
  pricePerMonth: number
}

// ─── Simulation curves ────────────────────────────────────────────────────────

/** Satisfaction curve: peaks at 24-30mo, dips at 48, recovers slightly */
function getSatisfaction(months: number): number {
  // Simulate a realistic satisfaction curve
  if (months === 0)  return 92
  if (months === 6)  return 93
  if (months === 12) return 94
  if (months === 18) return 93
  if (months === 24) return 92
  if (months === 30) return 89
  if (months === 36) return 86
  if (months === 42) return 82
  if (months === 48) return 78
  if (months === 54) return 80
  if (months === 60) return 83
  // Interpolate for any value
  const breakpoints = [0,6,12,18,24,30,36,42,48,54,60]
  const values      = [92,93,94,93,92,89,86,82,78,80,83]
  for (let i = 0; i < breakpoints.length - 1; i++) {
    if (months >= breakpoints[i] && months <= breakpoints[i + 1]) {
      const t = (months - breakpoints[i]) / (breakpoints[i + 1] - breakpoints[i])
      return Math.round(values[i] + t * (values[i + 1] - values[i]))
    }
  }
  return 85
}

/** Lease value score /10 — peaks at 24-36 months */
function getLeaseValueScore(months: number): number {
  if (months === 0)  return 7.2
  if (months === 6)  return 7.8
  if (months === 12) return 8.4
  if (months === 18) return 9.0
  if (months === 24) return 9.6
  if (months === 30) return 9.4
  if (months === 36) return 9.1
  if (months === 42) return 8.3
  if (months === 48) return 7.5
  if (months === 54) return 7.2
  if (months === 60) return 7.0
  const breakpoints = [0,6,12,18,24,30,36,42,48,54,60]
  const values      = [7.2,7.8,8.4,9.0,9.6,9.4,9.1,8.3,7.5,7.2,7.0]
  for (let i = 0; i < breakpoints.length - 1; i++) {
    if (months >= breakpoints[i] && months <= breakpoints[i + 1]) {
      const t = (months - breakpoints[i]) / (breakpoints[i + 1] - breakpoints[i])
      return Math.round((values[i] + t * (values[i + 1] - values[i])) * 10) / 10
    }
  }
  return 8.0
}

// ─── SVG chart ────────────────────────────────────────────────────────────────

const CHART_MONTHS    = [0, 6, 12, 18, 24, 30, 36, 42, 48, 54, 60]
const CHART_W         = 520
const CHART_H         = 120
const CHART_PADDING_X = 24
const CHART_PADDING_Y = 16

function monthToX(month: number): number {
  return CHART_PADDING_X + ((month / 60) * (CHART_W - CHART_PADDING_X * 2))
}

function satisfactionToY(val: number): number {
  // Map 70–100 → CHART_H → 0
  const min = 70, max = 100
  const ratio = (val - min) / (max - min)
  return CHART_H - CHART_PADDING_Y - ratio * (CHART_H - CHART_PADDING_Y * 2)
}

function buildSvgPath(): string {
  const points = CHART_MONTHS.map((m) => ({
    x: monthToX(m),
    y: satisfactionToY(getSatisfaction(m)),
  }))

  // Smooth curve using cubic bezier
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpx  = (prev.x + curr.x) / 2
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`
  }
  return d
}

function buildAreaPath(): string {
  const points = CHART_MONTHS.map((m) => ({
    x: monthToX(m),
    y: satisfactionToY(getSatisfaction(m)),
  }))

  let d = `M ${points[0].x} ${CHART_H}`
  d += ` L ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const cpx  = (prev.x + curr.x) / 2
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`
  }
  d += ` L ${points[points.length - 1].x} ${CHART_H} Z`
  return d
}

const MILESTONES = [12, 24, 36, 48, 60]

// ─── Component ────────────────────────────────────────────────────────────────

export default function TimeTravel({ pricePerMonth }: TimeTravelProps) {
  const [months, setMonths] = useState(36)

  const totalPaid    = pricePerMonth * months
  const satisfaction = getSatisfaction(months)
  const valueScore   = getLeaseValueScore(months)

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMonths(parseInt(e.target.value))
  }, [])

  const svgLinePath  = buildSvgPath()
  const svgAreaPath  = buildAreaPath()
  const activeDotX   = monthToX(months)
  const activeDotY   = satisfactionToY(getSatisfaction(months))

  const ttCss = `
        @keyframes statCountUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tt-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.1);
          border-radius: 100px;
          outline: none;
          cursor: pointer;
        }
        .tt-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #E31937;
          cursor: pointer;
          box-shadow: 0 0 0 4px rgba(255,105,0,0.2);
          transition: box-shadow 0.2s;
        }
        .tt-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 6px rgba(255,105,0,0.25);
        }
        .tt-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #E31937;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 4px rgba(255,105,0,0.2);
        }
        .tt-stat-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 24px;
          transition: border-color 0.2s;
        }
        .tt-stat-card:hover {
          border-color: rgba(255,255,255,0.12);
        }
  `

  return (
    <section style={{ background: '#080808', padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 3.5vw, 3.5rem)' }}>
      <style dangerouslySetInnerHTML={{ __html: ttCss }} />

      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: '56px' }}>
          <p style={{
            fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)', marginBottom: '16px', fontWeight: 400,
          }}>
            Time-Travel Preview
          </p>
          <h2 style={{
            fontWeight: 200, margin: 0,
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            letterSpacing: '-0.04em',
            color: '#fff',
            lineHeight: 1.05,
          }}>
            See your{' '}
            <span style={{ fontWeight: 800 }}>lease journey.</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.28)', fontSize: '14px',
            maxWidth: '400px', marginTop: '16px', lineHeight: 1.7,
          }}>
            Drag the timeline to explore how your lease evolves over time.
          </p>
        </div>

        {/* Slider */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{
              fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
            }}>
              Lease duration
            </span>
            <span style={{
              fontSize: '20px', fontWeight: 700, color: '#E31937',
              letterSpacing: '-0.04em',
            }}>
              {months} months
            </span>
          </div>

          <input
            className="tt-slider"
            type="range"
            min={0}
            max={60}
            step={1}
            value={months}
            onChange={handleSlider}
            aria-label="Lease duration in months"
          />

          {/* Milestone markers */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: '10px',
          }}>
            {MILESTONES.map((m) => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                style={{
                  background: months === m ? 'rgba(255,105,0,0.1)' : 'none',
                  border: 'none', cursor: 'pointer',
                  padding: '4px 8px', borderRadius: '100px',
                  fontSize: '11px', fontWeight: 400,
                  color: months === m ? '#E31937' : 'rgba(255,255,255,0.22)',
                  transition: 'color 0.2s, background 0.2s',
                } as React.CSSProperties}
              >
                {m}mo
              </button>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '16px',
          marginBottom: '48px',
        }}>
          {/* Total Paid */}
          <div className="tt-stat-card">
            <p style={{
              fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', margin: '0 0 12px',
            }}>
              Total Paid
            </p>
            <p style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800,
              color: '#fff', margin: 0,
              letterSpacing: '-0.04em', lineHeight: 1,
            }}>
              AED {totalPaid.toLocaleString()}
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', margin: '6px 0 0' }}>
              over {months} months
            </p>
          </div>

          {/* Predicted Satisfaction */}
          <div className="tt-stat-card">
            <p style={{
              fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', margin: '0 0 12px',
            }}>
              Predicted Satisfaction
            </p>
            <p style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800,
              color: satisfaction >= 88 ? '#22c55e' : satisfaction >= 80 ? '#E31937' : '#ef4444',
              margin: 0, letterSpacing: '-0.04em', lineHeight: 1,
            }}>
              {satisfaction}%
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', margin: '6px 0 0' }}>
              {satisfaction >= 88 ? 'Excellent period' : satisfaction >= 80 ? 'Good period' : 'Consider upgrading'}
            </p>
          </div>

          {/* Lease Value Score */}
          <div className="tt-stat-card">
            <p style={{
              fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', margin: '0 0 12px',
            }}>
              Lease Value Score
            </p>
            <p style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800,
              color: '#fff', margin: 0,
              letterSpacing: '-0.04em', lineHeight: 1,
            }}>
              {valueScore}
              <span style={{ fontSize: '18px', fontWeight: 200, color: 'rgba(255,255,255,0.3)' }}>/10</span>
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', margin: '6px 0 0' }}>
              {valueScore >= 9 ? 'Peak value window' : valueScore >= 8 ? 'Good value' : 'Past sweet spot'}
            </p>
          </div>
        </div>

        {/* SVG Satisfaction Curve */}
        <div style={{
          background: '#111',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          padding: '28px 20px 16px',
          overflow: 'hidden',
        }}>
          <p style={{
            fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)', margin: '0 0 20px',
          }}>
            Satisfaction curve
          </p>

          <div style={{ overflowX: 'auto' }}>
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              style={{ width: '100%', minWidth: '280px', height: 'auto', display: 'block' }}
              aria-label="Satisfaction curve over lease duration"
              role="img"
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#E31937" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#E31937" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid lines at milestone months */}
              {MILESTONES.map((m) => (
                <line
                  key={m}
                  x1={monthToX(m)} y1={CHART_PADDING_Y}
                  x2={monthToX(m)} y2={CHART_H}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}

              {/* Area fill */}
              <path d={svgAreaPath} fill="url(#areaGrad)" />

              {/* Line */}
              <path
                d={svgLinePath}
                fill="none"
                stroke="rgba(255,105,0,0.55)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Active dot */}
              <circle
                cx={activeDotX}
                cy={activeDotY}
                r="5"
                fill="#E31937"
              />
              <circle
                cx={activeDotX}
                cy={activeDotY}
                r="9"
                fill="none"
                stroke="rgba(255,105,0,0.3)"
                strokeWidth="1"
              />

              {/* Milestone labels */}
              {MILESTONES.map((m) => (
                <text
                  key={m}
                  x={monthToX(m)}
                  y={CHART_H - 2}
                  textAnchor="middle"
                  fill={months === m ? '#E31937' : 'rgba(255,255,255,0.2)'}
                  fontSize="9"
                  fontFamily="inherit"
                >
                  {m}mo
                </text>
              ))}
            </svg>
          </div>

          {/* Sweet spot callout */}
          {months >= 24 && months <= 36 && (
            <div style={{
              marginTop: '12px',
              background: 'rgba(255,105,0,0.08)',
              border: '1px solid rgba(255,105,0,0.2)',
              borderRadius: '10px',
              padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{
                width: '6px', height: '6px',
                borderRadius: '50%', background: '#E31937', flexShrink: 0,
              }} />
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.5 }}>
                You're in the <strong style={{ color: '#E31937', fontWeight: 600 }}>peak value window</strong> — 24–36 months delivers the best satisfaction and cost balance.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
