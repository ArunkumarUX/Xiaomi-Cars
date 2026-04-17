'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { CARS } from '@/lib/data'
import type { Car } from '@/lib/types'

// ── Filter config ────────────────────────────────────────────────────────────
const BODY_TYPES  = ['All', 'Sedan', 'SUV'] as const
const CONDITIONS  = ['All', 'New', 'Pre-Owned'] as const
const TERMS       = [36, 24, 12] as const

const BUDGETS = [
  { label: 'Any Budget',       min: 0,    max: Infinity },
  { label: 'Under AED 1,500',  min: 0,    max: 1500     },
  { label: 'AED 1,500–2,500',  min: 1500, max: 2500     },
  { label: 'AED 2,500–4,000',  min: 2500, max: 4000     },
  { label: 'AED 4,000+',       min: 4000, max: Infinity },
]

const SORT_OPTIONS = [
  { label: 'Featured',          value: 'featured'   },
  { label: 'Price: Low → High', value: 'price-asc'  },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Best Range',        value: 'range'      },
]

type Term = 12 | 24 | 36

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CarsPage() {
  const [bodyType,   setBodyType]   = useState('All')
  const [condition,  setCondition]  = useState('All')
  const [term,       setTerm]       = useState<Term>(36)
  const [budgetIdx,  setBudgetIdx]  = useState(0)
  const [sort,       setSort]       = useState('featured')
  const [favourites, setFavourites] = useState<Set<string>>(new Set())

  const budget = BUDGETS[budgetIdx]

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavourites(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = useMemo(() => {
    let cars = [...CARS]
    if (bodyType !== 'All')    cars = cars.filter(c => c.bodyType === bodyType)
    if (condition !== 'All')   cars = cars.filter(c => c.condition === condition)
    cars = cars.filter(c => {
      const p = c.pricePerMonth[term]
      return p >= budget.min && p < budget.max
    })
    if (sort === 'price-asc')  cars.sort((a, b) => a.pricePerMonth[term] - b.pricePerMonth[term])
    if (sort === 'price-desc') cars.sort((a, b) => b.pricePerMonth[term] - a.pricePerMonth[term])
    if (sort === 'range')      cars.sort((a, b) => parseInt(b.range ?? '0') - parseInt(a.range ?? '0'))
    return cars
  }, [bodyType, condition, term, budget, sort])

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .filter-bar::-webkit-scrollbar { display: none; }
        .filter-no-shrink { flex-shrink: 0; }
      ` }} />

      {/* ── Header — white ─────────────────────────────────────────────────── */}
      <div style={{ background: '#fff', paddingTop: '68px', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
        <div style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: 'clamp(4rem,8vw,7rem) clamp(2rem,5vw,5rem) clamp(3rem,5vw,5rem)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
            <div style={{ height: '1px', width: '40px', background: '#E31937' }} />
            <span style={{ color: 'rgba(0,0,0,0.35)', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
              Our Models
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
            <h1 style={{
              color: '#111', fontWeight: 200,
              fontSize: 'clamp(3rem,8vw,8rem)',
              letterSpacing: '-0.048em', lineHeight: 0.86, margin: 0,
            }}>
              Own it.<br />
              <span style={{ fontWeight: 800 }}>Drive it.</span>
            </h1>
            <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: '13px', lineHeight: 1.85, maxWidth: '280px', margin: 0 }}>
              All Xiaomi cars available for purchase — flexible financing, full warranty, and free registration included.
            </p>
          </div>
        </div>
      </div>

      {/* ── Sticky Filter Bar ──────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: '68px', zIndex: 40,
        background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(1rem,5vw,5rem)' }}>
          <div className="filter-bar" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '12px 0', overflowX: 'auto', WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', msOverflowStyle: 'none',
          }}>

            {/* Body type */}
            <FilterGroup>
              {BODY_TYPES.map(t => (
                <FilterPill key={t} active={bodyType === t} onClick={() => setBodyType(t)}>{t}</FilterPill>
              ))}
            </FilterGroup>

            <FilterDivider />

            {/* Condition */}
            <FilterGroup>
              {CONDITIONS.map(c => (
                <FilterPill key={c} active={condition === c} onClick={() => setCondition(c)}>{c}</FilterPill>
              ))}
            </FilterGroup>

            <FilterDivider />

            {/* Finance term */}
            <FilterGroup>
              <span style={{ fontSize: '10px', color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '4px' }}>Finance</span>
              {TERMS.map(t => (
                <FilterPill key={t} active={term === t} accent onClick={() => setTerm(t)}>{t}mo</FilterPill>
              ))}
            </FilterGroup>

            <div style={{ flex: 1 }} />

            {/* Budget dropdown */}
            <div style={{ position: 'relative', marginRight: '6px', flexShrink: 0 }}>
              <select
                value={budgetIdx}
                onChange={e => setBudgetIdx(Number(e.target.value))}
                style={{
                  appearance: 'none', WebkitAppearance: 'none',
                  background: budgetIdx !== 0 ? '#111' : 'transparent',
                  border: `1px solid ${budgetIdx !== 0 ? '#111' : '#e0e0e0'}`,
                  color: budgetIdx !== 0 ? '#fff' : '#666',
                  fontSize: '12px', padding: '6px 30px 6px 14px',
                  borderRadius: '4px', cursor: 'pointer', outline: 'none',
                  fontWeight: 500,
                }}
              >
                {BUDGETS.map((b, i) => (
                  <option key={b.label} value={i}>{b.label}</option>
                ))}
              </select>
              <span style={{
                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                pointerEvents: 'none', fontSize: '10px',
                color: budgetIdx !== 0 ? 'rgba(255,255,255,0.7)' : '#bbb',
              }}>▾</span>
            </div>

            {/* Sort dropdown */}
            <div style={{ position: 'relative', marginRight: '12px', flexShrink: 0 }}>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  appearance: 'none', WebkitAppearance: 'none',
                  background: 'transparent', border: '1px solid #e0e0e0',
                  color: '#555', fontSize: '12px', padding: '6px 30px 6px 14px',
                  borderRadius: '4px', cursor: 'pointer', outline: 'none', fontWeight: 500,
                }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', fontSize: '10px', color: '#bbb' }}>▾</span>
            </div>

            {/* Count */}
            <span style={{ fontSize: '12px', color: '#bbb', flexShrink: 0 }}>
              {filtered.length} model{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* ── Car Grid ───────────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: 'clamp(3rem,5vw,5rem) clamp(2rem,5vw,5rem)',
      }}>
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '20px',
          }}>
            {filtered.map(car => (
              <CarCard
                key={car.id}
                car={car}
                isFavourite={favourites.has(car.id)}
                onToggleFav={toggleFav}
                term={term}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '40px', color: '#e0e0e0', marginBottom: '16px', fontWeight: 200 }}>○</div>
            <div style={{ fontSize: '14px', color: '#aaa', marginBottom: '8px' }}>No vehicles match your filters</div>
            <button
              onClick={() => { setBodyType('All'); setCondition('All'); setBudgetIdx(0) }}
              style={{ fontSize: '12px', color: '#E31937', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

// ── Primitive filter components ───────────────────────────────────────────────
function FilterGroup({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>{children}</div>
}

function FilterDivider() {
  return <div style={{ width: '1px', height: '18px', background: '#e0e0e0', margin: '0 8px', flexShrink: 0 }} />
}

function FilterPill({
  children, active, accent, onClick,
}: {
  children: React.ReactNode
  active: boolean
  accent?: boolean
  onClick: () => void
}) {
  const activeColor = accent ? '#E31937' : '#111'
  return (
    <button
      onClick={onClick}
      style={{
        padding: '5px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: 500,
        border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
        borderColor: active ? activeColor : '#e0e0e0',
        background: active ? activeColor : 'transparent',
        color: active ? '#fff' : '#666',
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </button>
  )
}

// ── CarCard ───────────────────────────────────────────────────────────────────
function CarCard({
  car, isFavourite, onToggleFav, term,
}: {
  car: Car
  isFavourite: boolean
  onToggleFav: (id: string, e: React.MouseEvent) => void
  term: Term
}) {
  const [hovered,  setHovered]  = useState(false)
  const [imgError, setImgError] = useState(false)

  const specs = [
    car.range        && `${car.range}`,
    car.acceleration && `${car.acceleration}`,
    car.horsepower   && `${car.horsepower}`,
  ].filter(Boolean) as string[]

  return (
    <Link href={`/cars/${car.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: hovered ? 'rgba(0,0,0,0.14)' : '#ebebeb',
          boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.08)' : '0 1px 6px rgba(0,0,0,0.04)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'box-shadow 0.4s ease, transform 0.4s ease, border-color 0.3s ease',
          cursor: 'pointer',
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '16/10', background: '#f5f5f5', overflow: 'hidden' }}>
          {!imgError ? (
            <img
              src={car.images[0]}
              alt={car.fullName}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f0f0' }}>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#E31937', opacity: 0.15 }}>{car.model}</span>
            </div>
          )}

          {/* Badge — top left */}
          {car.badge && (
            <div style={{
              position: 'absolute', top: '12px', left: '12px',
              background: '#E31937', color: '#fff',
              fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: '2px',
            }}>
              {car.badge}
            </div>
          )}

          {/* Favourite button — top right */}
          <button
            onClick={(e) => onToggleFav(car.id, e)}
            aria-label={isFavourite ? 'Remove from favourites' : 'Save to favourites'}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '32px', height: '32px', borderRadius: '50%',
              background: isFavourite ? '#fff' : 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(8px)',
              border: `1.5px solid ${isFavourite ? '#E31937' : 'rgba(0,0,0,0.08)'}`,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, border-color 0.2s',
              transform: isFavourite ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24"
              fill={isFavourite ? '#E31937' : 'none'}
              stroke={isFavourite ? '#E31937' : 'rgba(0,0,0,0.45)'}
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        {/* Card body */}
        <div style={{ padding: '18px 18px 16px' }}>

          {/* Name + Price row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111', lineHeight: 1.2, marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {car.fullName}
              </h3>
              <p style={{ fontSize: '11px', color: '#bbb', margin: 0 }}>
                {car.year} · {car.bodyType} · {car.fuelType}
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: '12px' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: '-0.03em' }}>
                AED {car.pricePerMonth[term].toLocaleString()}
              </div>
              <div style={{ fontSize: '10px', color: '#bbb', marginTop: '2px' }}>/mo · {term}mo finance</div>
            </div>
          </div>

          {/* Key specs */}
          {specs.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
              {specs.map((spec, i) => (
                <span key={i} style={{
                  fontSize: '10px', color: '#555', fontWeight: 500,
                  background: '#f4f4f4', borderRadius: '3px',
                  padding: '3px 9px', letterSpacing: '0.01em',
                }}>
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* CTA row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: '1px solid #f2f2f2', paddingTop: '12px',
          }}>
            <span style={{
              fontSize: '12px', fontWeight: 500, letterSpacing: '0.02em',
              color: hovered ? '#111' : '#999', transition: 'color 0.3s',
            }}>
              Configure &amp; Buy
            </span>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%',
              border: `1px solid ${hovered ? '#111' : '#e0e0e0'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: hovered ? '#111' : 'transparent',
              color: hovered ? '#fff' : '#aaa',
              transition: 'all 0.3s ease', flexShrink: 0,
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
