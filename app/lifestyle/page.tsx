'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CARS } from '@/lib/data'
import type { Car } from '@/lib/types'

const QUESTIONS = [
  {
    id: 1,
    eyebrow: 'Your Drive',
    text: 'How do you mainly use your car?',
    options: [
      { label: 'City Commute',       sub: 'Daily urban driving',         value: 'city',     icon: '🌆' },
      { label: 'Weekend Adventures', sub: 'Escapes & road trips',         value: 'weekend',  icon: '🏔️' },
      { label: 'Family Trips',       sub: 'School runs & holidays',       value: 'family',   icon: '👨‍👩‍👧' },
      { label: 'Business Travel',    sub: 'Meetings & airports',          value: 'business', icon: '💼' },
    ],
  },
  {
    id: 2,
    eyebrow: 'Your Range',
    text: 'How far do you drive daily?',
    options: [
      { label: 'Under 50 km',  sub: 'Short city hops',           value: 'low',       icon: '📍' },
      { label: '50 – 100 km',  sub: 'Moderate commutes',         value: 'medium',    icon: '🛣️' },
      { label: '100 – 200 km', sub: 'Long haul commuter',        value: 'high',      icon: '⚡' },
      { label: 'Over 200 km',  sub: 'Cross-city professional',   value: 'very_high', icon: '🚀' },
    ],
  },
  {
    id: 3,
    eyebrow: 'Your Priority',
    text: 'What matters most to you?',
    options: [
      { label: 'Performance',  sub: 'Raw power & speed',          value: 'performance', icon: '⚡' },
      { label: 'Range',        sub: 'Maximum distance per charge', value: 'range',       icon: '🔋' },
      { label: 'Technology',   sub: 'HyperOS & smart features',   value: 'tech',        icon: '📱' },
      { label: 'Comfort',      sub: 'Smooth & refined ride',      value: 'comfort',     icon: '🛋️' },
    ],
  },
  {
    id: 4,
    eyebrow: 'Your People',
    text: 'How many people travel with you?',
    options: [
      { label: 'Just Me',           sub: 'Solo driver',              value: 'solo',         icon: '🧍' },
      { label: 'Me + Partner',      sub: 'Two of us',                value: 'couple',       icon: '👫' },
      { label: 'Small Family',      sub: '3 – 4 people',             value: 'small_family', icon: '👨‍👩‍👦' },
      { label: 'Large Family',      sub: '5 or more',                value: 'large_family', icon: '👨‍👩‍👧‍👦' },
    ],
  },
  {
    id: 5,
    eyebrow: 'Your Style',
    text: "What's your driving style?",
    options: [
      { label: 'Relaxed Cruiser', sub: 'Smooth & unhurried',       value: 'relaxed',  icon: '😌' },
      { label: 'Spirited Driver', sub: 'Loves the throttle',        value: 'spirited', icon: '🏎️' },
      { label: 'Efficient & Eco', sub: 'Every kWh counts',          value: 'eco',      icon: '🌿' },
      { label: 'Mixed',           sub: 'Depends on the day',        value: 'mixed',    icon: '🔀' },
    ],
  },
  {
    id: 6,
    eyebrow: 'Your Location',
    text: 'Where do you live?',
    options: [
      { label: 'City Centre',     sub: 'Downtown & busy streets',  value: 'city_centre', icon: '🏙️' },
      { label: 'Suburbs',         sub: 'Quieter neighbourhoods',    value: 'suburbs',     icon: '🏡' },
      { label: 'Between Cities',  sub: 'Highway driving',          value: 'intercity',   icon: '🛤️' },
      { label: 'Rural Areas',     sub: 'Open roads',               value: 'rural',       icon: '🌄' },
    ],
  },
  {
    id: 7,
    eyebrow: 'Your Tech',
    text: 'How important is the latest tech?',
    options: [
      { label: 'Essential',       sub: 'Must have cutting-edge',   value: 'essential',     icon: '🤖' },
      { label: 'Nice to Have',    sub: 'Appreciate but not vital', value: 'nice',          icon: '👍' },
      { label: 'Not Important',   sub: 'Just drive it',            value: 'not_important', icon: '🙂' },
    ],
  },
  {
    id: 8,
    eyebrow: 'Your Budget',
    text: "What's your monthly budget?",
    options: [
      { label: 'AED 1,000 – 1,300', sub: 'Accessible entry',      value: 'budget_low',     icon: '💳' },
      { label: 'AED 1,300 – 1,800', sub: 'Mid-range sweet spot',  value: 'budget_mid',     icon: '💰' },
      { label: 'AED 1,800 – 2,500', sub: 'Premium comfort',       value: 'budget_high',    icon: '✨' },
      { label: 'AED 2,500+',        sub: 'Ultimate performance',  value: 'budget_premium', icon: '👑' },
    ],
  },
  {
    id: 9,
    eyebrow: 'Your Thrill',
    text: 'Do you care about 0–100 performance?',
    options: [
      { label: 'Yes, I Love It',  sub: 'The faster, the better',  value: 'perf_yes',      icon: '🔥' },
      { label: 'Somewhat',        sub: 'Nice when I need it',     value: 'perf_somewhat', icon: '⚡' },
      { label: 'Not Really',      sub: 'Smooth is enough',        value: 'perf_no',       icon: '😎' },
    ],
  },
  {
    id: 10,
    eyebrow: 'Your Identity',
    text: 'What best describes your lifestyle?',
    options: [
      { label: 'Urban Professional', sub: 'City, career & culture', value: 'urban',           icon: '👔' },
      { label: 'Tech Enthusiast',    sub: 'Always first to upgrade', value: 'tech_enthusiast', icon: '🤓' },
      { label: 'Family-Focused',     sub: 'Safety & space matter',  value: 'family_focused',  icon: '❤️' },
      { label: 'Adventure Seeker',   sub: 'Life is a road trip',    value: 'adventure',       icon: '🧭' },
    ],
  },
]

type Answers = Record<number, string>

function scoreCarAgainstAnswers(car: Car, answers: Answers): number {
  let score = 0
  const use = answers[1]; const distance = answers[2]; const priority = answers[3]
  const people = answers[4]; const style = answers[5]; const tech = answers[7]
  const budget = answers[8]; const perf = answers[9]; const lifestyle = answers[10]
  const price = car.pricePerMonth[36]
  if (budget === 'budget_low'     && price <= 1300) score += 20
  if (budget === 'budget_mid'     && price > 1300 && price <= 1800) score += 20
  if (budget === 'budget_high'    && price > 1800 && price <= 2500) score += 20
  if (budget === 'budget_premium' && price > 2500) score += 20
  const isSUV = car.bodyType === 'SUV'
  const isSedan = car.bodyType === 'Sedan'
  if ((people === 'large_family' || use === 'family') && isSUV) score += 15
  if ((people === 'large_family' || use === 'family') && isSedan) score -= 5
  if ((people === 'solo' || people === 'couple') && isSedan) score += 8
  const accel = parseFloat(car.acceleration ?? '99')
  if ((perf === 'perf_yes' || style === 'spirited' || priority === 'performance') && accel <= 3.0) score += 18
  if ((perf === 'perf_yes' || style === 'spirited') && accel <= 5.5) score += 8
  if (perf === 'perf_no' && accel > 4) score += 5
  const rangeNum = parseInt(car.range ?? '0')
  if ((priority === 'range' || distance === 'very_high') && rangeNum >= 800) score += 18
  if ((priority === 'range' || distance === 'high') && rangeNum >= 700) score += 10
  if (distance === 'low' && rangeNum >= 600) score += 5
  if ((tech === 'essential' || lifestyle === 'tech_enthusiast') && car.slug !== 'xiaomi-su7-preowned') score += 10
  if (priority === 'tech' && car.slug !== 'xiaomi-su7-preowned') score += 8
  if ((use === 'city' || use === 'business') && isSedan) score += 8
  if ((lifestyle === 'urban' || lifestyle === 'tech_enthusiast') && isSedan) score += 6
  if ((lifestyle === 'family_focused' || lifestyle === 'adventure') && isSUV) score += 12
  if (car.condition === 'Pre-Owned' && budget === 'budget_low') score += 12
  if (car.condition === 'Pre-Owned' && budget !== 'budget_low') score -= 8
  if (car.condition === 'New' && (budget === 'budget_high' || budget === 'budget_premium')) score += 5
  return Math.max(0, Math.min(100, score))
}

function getRecommendations(answers: Answers) {
  return CARS
    .map((car) => ({ car, score: scoreCarAgainstAnswers(car, answers) }))
    .sort((a, b) => b.score - a.score)
    .filter((s) => s.score >= 10)
    .slice(0, 3)
}

export default function LifestylePage() {
  const [step, setStep]           = useState<'quiz' | 'loading' | 'results'>('quiz')
  const [currentQ, setCurrentQ]   = useState(0)
  const [answers, setAnswers]      = useState<Answers>({})
  const [selected, setSelected]    = useState<string | null>(null)
  const [direction, setDirection]  = useState<'forward' | 'back'>('forward')
  const [animating, setAnimating]  = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)

  const question = QUESTIONS[currentQ]
  const progress = (currentQ / QUESTIONS.length) * 100

  useEffect(() => {
    if (step !== 'loading') return
    let p = 0
    const id = setInterval(() => {
      p += Math.random() * 22
      setLoadProgress(Math.min(p, 95))
      if (p >= 95) clearInterval(id)
    }, 180)
    const done = setTimeout(() => {
      setLoadProgress(100)
      setTimeout(() => setStep('results'), 300)
    }, 2200)
    return () => { clearInterval(id); clearTimeout(done) }
  }, [step])

  const handleSelect = (value: string) => { if (!animating) setSelected(value) }

  const handleNext = () => {
    if (!selected || animating) return
    const newAnswers = { ...answers, [question.id]: selected }
    setAnswers(newAnswers)
    if (currentQ === QUESTIONS.length - 1) { setStep('loading'); return }
    setAnimating(true); setDirection('forward')
    setTimeout(() => { setCurrentQ((q) => q + 1); setSelected(null); setAnimating(false) }, 380)
  }

  const handleBack = () => {
    if (currentQ === 0 || animating) return
    setAnimating(true); setDirection('back')
    setTimeout(() => {
      setCurrentQ((q) => q - 1)
      setSelected(answers[QUESTIONS[currentQ - 1].id] ?? null)
      setAnimating(false)
    }, 380)
  }

  const handleStartOver = () => {
    setStep('quiz'); setCurrentQ(0); setAnswers({}); setSelected(null); setLoadProgress(0)
  }

  const recommendations = step === 'results' ? getRecommendations(answers) : []

  // ── Loading ────────────────────────────────────────────────────────────────
  if (step === 'loading') {
    return (
      <div style={{
        minHeight: '100vh', background: '#fafaf9',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', paddingTop: '68px',
      }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spinRing {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes spinRingRev {
            from { transform: rotate(0deg); }
            to   { transform: rotate(-360deg); }
          }
          @keyframes loadIn {
            from { opacity:0; transform: translateY(20px); }
            to   { opacity:1; transform: translateY(0); }
          }
          @keyframes barShimmer {
            from { transform: translateX(-100%); }
            to   { transform: translateX(400%); }
          }
          @keyframes dotPulse {
            0%,100% { transform: scale(1); opacity: 0.6; }
            50%      { transform: scale(1.4); opacity: 1; }
          }
        ` }} />

        {/* Orbital rings — dark on white */}
        <div style={{ position: 'relative', width: '140px', height: '140px', marginBottom: '48px', animation: 'loadIn 0.5s ease both' }}>
          {/* Outer ring */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1.5px solid transparent',
            borderTopColor: '#E31937',
            borderRightColor: 'rgba(255,105,0,0.3)',
            animation: 'spinRing 1.8s linear infinite',
          }} />
          {/* Middle ring */}
          <div style={{
            position: 'absolute', inset: '22px', borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.08)',
            animation: 'spinRingRev 3s linear infinite',
          }}>
            <div style={{
              position: 'absolute', top: '-5px', left: '50%',
              width: '9px', height: '9px', borderRadius: '50%',
              background: '#E31937',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 10px rgba(255,105,0,0.5)',
            }} />
          </div>
          {/* Inner ring */}
          <div style={{
            position: 'absolute', inset: '46px', borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.05)',
            animation: 'spinRing 2.5s linear infinite',
          }}>
            <div style={{
              position: 'absolute', bottom: '-3px', left: '50%',
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.2)',
              transform: 'translateX(-50%)',
            }} />
          </div>
          {/* Centre */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #E31937, #C41630)',
              boxShadow: '0 0 20px rgba(255,105,0,0.35)',
              animation: 'dotPulse 1.6s ease-in-out infinite',
            }} />
          </div>
        </div>

        {/* Label */}
        <p style={{
          color: 'rgba(0,0,0,0.4)', fontSize: '12px', letterSpacing: '0.22em',
          textTransform: 'uppercase', marginBottom: '36px',
          animation: 'loadIn 0.5s ease 0.15s both',
        }}>
          Analysing your lifestyle profile
        </p>

        {/* Progress bar */}
        <div style={{ width: '280px', animation: 'loadIn 0.5s ease 0.3s both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Matching</span>
            <span style={{ fontSize: '12px', color: '#E31937', fontWeight: 600 }}>{Math.round(loadProgress)}%</span>
          </div>
          <div style={{ height: '3px', background: 'rgba(0,0,0,0.07)', borderRadius: '100px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              height: '100%', width: `${loadProgress}%`,
              background: 'linear-gradient(to right, #E31937, #FF6677)',
              borderRadius: '100px', transition: 'width 0.2s ease',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, bottom: 0, width: '40%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
                animation: 'barShimmer 1.2s ease-in-out infinite',
              }} />
            </div>
          </div>

          {/* Stage labels */}
          <div style={{ marginTop: '22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Scoring lifestyle compatibility', done: loadProgress > 30 },
              { label: 'Matching performance profile',    done: loadProgress > 55 },
              { label: 'Calculating fit scores',          done: loadProgress > 80 },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
                  background: s.done ? '#E31937' : 'rgba(0,0,0,0.07)',
                  border: s.done ? 'none' : '1.5px solid rgba(0,0,0,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.4s',
                  boxShadow: s.done ? '0 0 10px rgba(255,105,0,0.25)' : 'none',
                }}>
                  {s.done && <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                </div>
                <span style={{
                  fontSize: '12px', letterSpacing: '0.01em',
                  color: s.done ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.2)',
                  transition: 'color 0.4s',
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (step === 'results') {
    return (
      <div style={{ minHeight: '100vh', background: '#fafaf9', paddingTop: '68px' }}>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes resultsIn {
            from { opacity:0; transform: translateY(28px); }
            to   { opacity:1; transform: translateY(0); }
          }
          @keyframes cardIn {
            from { opacity:0; transform: translateY(20px) scale(0.99); }
            to   { opacity:1; transform: translateY(0) scale(1); }
          }
          .rc-card {
            background: #fff;
            border: 1px solid rgba(0,0,0,0.07);
            border-radius: 28px;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
            box-shadow: 0 2px 24px rgba(0,0,0,0.04);
          }
          .rc-card:hover {
            box-shadow: 0 12px 48px rgba(0,0,0,0.1);
            transform: translateY(-4px);
            border-color: rgba(255,105,0,0.2);
          }
          .rc-explore:hover {
            background: #E31937 !important;
            color: #fff !important;
            border-color: #E31937 !important;
          }
        ` }} />

        <div style={{
          maxWidth: '1000px', margin: '0 auto',
          padding: 'clamp(3rem,6vw,6rem) clamp(1.5rem,4vw,4rem)',
          animation: 'resultsIn 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}>

          {/* Header */}
          <div style={{ marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ height: '1px', width: '32px', background: '#E31937' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#E31937', fontWeight: 500 }}>
                Your AI Profile
              </span>
            </div>
            <h1 style={{
              color: '#0a0a0a', margin: '0 0 20px',
              fontWeight: 200,
              fontSize: 'clamp(3rem,8vw,7rem)',
              letterSpacing: '-0.048em', lineHeight: 0.86,
            }}>
              Your perfect<br />
              <span style={{ fontWeight: 800 }}>match.</span>
            </h1>
            <p style={{ color: 'rgba(0,0,0,0.38)', fontSize: '15px', maxWidth: '440px', lineHeight: 1.9, margin: 0 }}>
              Based on your lifestyle profile, our AI has found the Xiaomi models that fit you best.
            </p>
          </div>

          {/* Result Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '72px' }}>
            {recommendations.map(({ car, score }, idx) => (
              <div
                key={car.id}
                className="rc-card"
                style={{
                  animation: `cardIn 0.6s cubic-bezier(0.22,1,0.36,1) ${idx * 0.12}s both`,
                  border: idx === 0 ? '1.5px solid rgba(255,105,0,0.25)' : '1px solid rgba(0,0,0,0.07)',
                  background: idx === 0 ? '#fff' : '#fff',
                }}
              >
                {/* Image panel */}
                <div style={{
                  width: 'min(100%, 320px)', minHeight: '220px',
                  background: '#f0eeeb', flexShrink: 0, overflow: 'hidden',
                  position: 'relative',
                }}>
                  <img
                    src={car.images[0]}
                    alt={car.fullName}
                    style={{ width: '100%', height: '100%', minHeight: '220px', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                  {/* Rank badge */}
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: idx === 0 ? '#E31937' : 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase',
                    padding: '5px 13px', borderRadius: '100px', fontWeight: 500,
                  }}>
                    {idx === 0 ? 'Best Match' : `Match #${idx + 1}`}
                  </div>
                </div>

                {/* Info panel */}
                <div style={{
                  flex: 1, padding: 'clamp(24px, 4vw, 40px)',
                  minWidth: '260px', display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between', gap: '24px',
                }}>
                  <div>
                    <h2 style={{
                      color: '#0a0a0a', fontWeight: 200,
                      fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)',
                      letterSpacing: '-0.04em', lineHeight: 0.9,
                      margin: '0 0 10px',
                    }}>
                      {car.fullName}
                    </h2>
                    <p style={{ color: 'rgba(0,0,0,0.35)', fontSize: '13px', margin: '0 0 30px', letterSpacing: '0.01em' }}>
                      From AED {car.pricePerMonth[36].toLocaleString()} / month
                    </p>

                    {/* Fit score bar */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                        <span style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.3)' }}>
                          Lifestyle Fit
                        </span>
                        <span style={{ fontSize: '28px', fontWeight: 800, color: '#E31937', lineHeight: 1, letterSpacing: '-0.04em' }}>
                          {score}%
                        </span>
                      </div>
                      <div style={{ height: '4px', background: 'rgba(0,0,0,0.07)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          background: idx === 0
                            ? 'linear-gradient(to right, #E31937, #FF6677)'
                            : 'linear-gradient(to right, #888, #aaa)',
                          borderRadius: '100px',
                          width: `${score}%`,
                          transition: 'width 1.4s cubic-bezier(0.25,0.46,0.45,0.94) 0.4s',
                        }} />
                      </div>
                    </div>

                    {/* Specs row */}
                    {car.range && (
                      <div style={{
                        display: 'flex', gap: '24px', marginTop: '20px',
                        paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.06)',
                      }}>
                        <div>
                          <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: '3px' }}>Range</div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.02em' }}>{car.range}</div>
                        </div>
                        {car.acceleration && (
                          <div>
                            <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: '3px' }}>0–100</div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.02em' }}>{car.acceleration}</div>
                          </div>
                        )}
                        <div>
                          <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', marginBottom: '3px' }}>Type</div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.02em' }}>{car.bodyType}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    <Link
                      href={`/cars/${car.slug}`}
                      className="rc-explore"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: idx === 0 ? '#0a0a0a' : 'transparent',
                        color: idx === 0 ? '#fff' : 'rgba(0,0,0,0.55)',
                        border: idx === 0 ? '1.5px solid #0a0a0a' : '1.5px solid rgba(0,0,0,0.15)',
                        fontSize: '13px', fontWeight: 400,
                        padding: '12px 26px', borderRadius: '100px',
                        textDecoration: 'none', transition: 'all 0.25s',
                        letterSpacing: '0.01em',
                      }}
                    >
                      Explore Model →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer actions */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '28px',
            paddingTop: '32px', borderTop: '1px solid rgba(0,0,0,0.07)',
            flexWrap: 'wrap',
          }}>
            <button
              onClick={handleStartOver}
              style={{
                background: 'none', border: 'none',
                color: 'rgba(0,0,0,0.3)', fontSize: '13px',
                cursor: 'pointer', padding: 0, transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(0,0,0,0.75)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(0,0,0,0.3)' }}
            >
              ← Retake quiz
            </button>
            <span style={{ color: 'rgba(0,0,0,0.12)', fontSize: '18px' }}>·</span>
            <a
              href="#concierge"
              onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-concierge')) }}
              style={{ color: '#E31937', fontSize: '13px', textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.65' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
            >
              Talk to AI Concierge →
            </a>
          </div>
        </div>
      </div>
    )
  }

  // ── Quiz ───────────────────────────────────────────────────────────────────
  const animClass = animating ? (direction === 'forward' ? 'q-out-fwd' : 'q-out-back') : 'q-in'

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes qIn {
          from { opacity:0; transform: translateX(36px) scale(0.99); }
          to   { opacity:1; transform: translateX(0) scale(1); }
        }
        @keyframes qInBack {
          from { opacity:0; transform: translateX(-36px) scale(0.99); }
          to   { opacity:1; transform: translateX(0) scale(1); }
        }
        @keyframes qOutFwd {
          from { opacity:1; transform: translateX(0); }
          to   { opacity:0; transform: translateX(-28px); }
        }
        @keyframes qOutBack {
          from { opacity:1; transform: translateX(0); }
          to   { opacity:0; transform: translateX(28px); }
        }
        .q-in      { animation: qIn      0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .q-in-back { animation: qInBack  0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .q-out-fwd { animation: qOutFwd  0.35s cubic-bezier(0.22,1,0.36,1) both; }
        .q-out-back{ animation: qOutBack 0.35s cubic-bezier(0.22,1,0.36,1) both; }

        .opt-card {
          background: #fff;
          border: 1.5px solid rgba(0,0,0,0.08);
          border-radius: 20px;
          padding: 22px 22px 20px;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
          box-shadow: 0 1px 6px rgba(0,0,0,0.03);
        }
        .opt-card:hover {
          border-color: rgba(0,0,0,0.18);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }
        .opt-card.is-selected {
          border-color: #E31937;
          background: rgba(255,105,0,0.03);
          box-shadow: 0 4px 20px rgba(255,105,0,0.12);
        }
        .opt-card:active { transform: scale(0.98); }

        .next-btn {
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .next-btn:hover:not(:disabled) {
          background: #222 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18);
        }
        .next-btn:active:not(:disabled) { transform: scale(0.97); }
        .next-btn:disabled { opacity: 0.25; cursor: not-allowed; }

        .back-btn:hover { color: rgba(0,0,0,0.7) !important; }

        /* ── Mobile responsive ── */
        @media (max-width: 680px) {
          .quiz-layout {
            grid-template-columns: 1fr !important;
          }
          .quiz-left-panel {
            display: none !important;
          }
        }
      ` }} />

      {/* Top progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'rgba(0,0,0,0.06)', zIndex: 200 }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: '#E31937',
          transition: 'width 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
          boxShadow: '0 0 10px rgba(255,105,0,0.4)',
        }} />
      </div>

      {/* Two-column layout on desktop */}
      <div className="quiz-layout" style={{
        minHeight: '100vh', display: 'grid',
        gridTemplateColumns: 'clamp(260px, 36%, 400px) 1fr',
        paddingTop: '68px',
      }}>

        {/* Left panel — question number & category */}
        <div className="quiz-left-panel" style={{
          borderRight: '1px solid rgba(0,0,0,0.06)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          padding: 'clamp(3rem,6vw,5rem) clamp(2rem,4vw,4rem)',
          background: '#fff',
        }}>
          <div>
            {/* Category tag */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E31937' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E31937', fontWeight: 500 }}>
                {question.eyebrow}
              </span>
            </div>

            {/* Large question number */}
            <div style={{
              fontSize: 'clamp(7rem, 16vw, 14rem)',
              fontWeight: 800, lineHeight: 0.85,
              color: 'rgba(0,0,0,0.04)',
              letterSpacing: '-0.06em',
              marginBottom: '20px',
              userSelect: 'none',
            }}>
              {String(currentQ + 1).padStart(2, '0')}
            </div>

            <p style={{ fontSize: '12px', color: 'rgba(0,0,0,0.25)', letterSpacing: '0.06em' }}>
              of {QUESTIONS.length} questions
            </p>
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', maxWidth: '200px' }}>
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i < currentQ ? '20px' : '6px',
                  height: '6px', borderRadius: '100px',
                  background: i < currentQ
                    ? '#E31937'
                    : i === currentQ
                      ? '#0a0a0a'
                      : 'rgba(0,0,0,0.1)',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right panel — question + options */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(3rem,6vw,5rem) clamp(2rem,4vw,4.5rem)',
          overflowY: 'auto',
        }}>
          <div className={animClass} key={`q-${currentQ}`}>

            {/* Question */}
            <h2 style={{
              color: '#0a0a0a', fontWeight: 200,
              fontSize: 'clamp(1.8rem, 4.5vw, 3.6rem)',
              letterSpacing: '-0.04em', lineHeight: 0.94,
              margin: '0 0 44px',
            }}>
              {question.text}
            </h2>

            {/* Options grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: question.options.length === 3
                ? 'repeat(auto-fit, minmax(170px, 1fr))'
                : 'repeat(auto-fit, minmax(185px, 1fr))',
              gap: '10px',
              marginBottom: '44px',
            }}>
              {question.options.map((opt) => {
                const isSel = selected === opt.value
                return (
                  <button
                    key={opt.value}
                    className={`opt-card${isSel ? ' is-selected' : ''}`}
                    onClick={() => handleSelect(opt.value)}
                  >
                    {/* Check mark */}
                    {isSel && (
                      <div style={{
                        position: 'absolute', top: '14px', right: '14px',
                        width: '20px', height: '20px', borderRadius: '50%',
                        background: '#E31937',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                    <div style={{ fontSize: '24px', marginBottom: '14px', lineHeight: 1 }}>
                      {opt.icon}
                    </div>
                    <div style={{
                      fontSize: '14px', fontWeight: 600, lineHeight: 1.2,
                      color: isSel ? '#0a0a0a' : 'rgba(0,0,0,0.7)',
                      marginBottom: '5px', transition: 'color 0.2s',
                      letterSpacing: '-0.01em',
                    }}>
                      {opt.label}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: isSel ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.28)',
                      lineHeight: 1.5, transition: 'color 0.2s',
                    }}>
                      {opt.sub}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <button
                className="next-btn"
                onClick={handleNext}
                disabled={!selected}
                style={{
                  background: '#0a0a0a', color: '#fff',
                  fontSize: '14px', fontWeight: 400,
                  padding: '14px 42px', borderRadius: '100px',
                  border: 'none', cursor: selected ? 'pointer' : 'not-allowed',
                  letterSpacing: '0.01em',
                }}
              >
                {currentQ === QUESTIONS.length - 1 ? 'See My Match →' : 'Continue →'}
              </button>
              {currentQ > 0 && (
                <button
                  className="back-btn"
                  onClick={handleBack}
                  style={{
                    background: 'none', border: 'none',
                    color: 'rgba(0,0,0,0.28)', fontSize: '13px',
                    cursor: 'pointer', padding: 0, transition: 'color 0.2s',
                  }}
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
