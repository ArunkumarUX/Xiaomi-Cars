'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// ─── Car data ─────────────────────────────────────────────────────────────────
const SU7_CDN = 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/su7_20260319/pc'
const YU7_CDN = 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/yu7_20250626/pc'

const CARS = [
  { id: 'su7',       slug: 'xiaomi-su7-standard', name: 'SU7',       badge: 'Best Value',  price: 129900, range: 700, accel: '5.28s', image: `${SU7_CDN}/6-7.png` },
  { id: 'su7-pro',   slug: 'xiaomi-su7-pro',      name: 'SU7 Pro',   badge: 'Max Range',   price: 154900, range: 830, accel: '5.28s', image: `${SU7_CDN}/6-3.png` },
  { id: 'su7-max',   slug: 'xiaomi-su7-max',       name: 'SU7 Max',   badge: 'Performance', price: 189900, range: 800, accel: '2.78s', image: `${SU7_CDN}/6-2.png` },
  { id: 'su7-ultra', slug: 'xiaomi-su7-ultra',     name: 'SU7 Ultra', badge: 'Hypercar',    price: 379900, range: 630, accel: '1.98s', image: `${SU7_CDN}/6-8.png` },
  { id: 'yu7',       slug: 'xiaomi-yu7',           name: 'YU7',       badge: 'Family SUV',  price: 169900, range: 760, accel: '3.23s', image: `${YU7_CDN}/9.1.png` },
] as const
type Car = typeof CARS[number]

// ─── Stage background images ──────────────────────────────────────────────────
const STAGE_BG: Record<string, string> = {
  boot: 'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section4x1281.jpg',
  q1:   'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/pc/section_3_4.jpg',
  q2:   'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section3_1x1281.jpg',
  q3:   'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section3_3x1281.jpg',
  q4:   'https://s1.xiaomiev.com/activity-outer-assets/0328/images/home/section3_2x1281.jpg',
}

// ─── Quiz questions ───────────────────────────────────────────────────────────
type Stage = 'boot' | 'q1' | 'q2' | 'q3' | 'q4' | 'analyzing' | 'results'

const QUESTIONS = [
  {
    stage: 'q1' as Stage,
    prompt: 'What kind of driver are you?',
    opts: [
      { v: 'perf',   t: 'Performance First',  s: 'Speed & adrenaline' },
      { v: 'urban',  t: 'Urban Professional',  s: 'Style, tech & city life' },
      { v: 'family', t: 'Family Explorer',     s: 'Space, safety & comfort' },
      { v: 'eco',    t: 'Smart & Efficient',   s: 'Range & sustainability' },
    ],
  },
  {
    stage: 'q2' as Stage,
    prompt: 'How far do you drive on a typical day?',
    opts: [
      { v: 'city',  t: 'Under 100 km',  s: 'City commutes & errands' },
      { v: 'mid',   t: '100 – 250 km',  s: 'Regular long commute' },
      { v: 'road',  t: '250 – 400 km',  s: 'Frequent road trips' },
      { v: 'ultra', t: '400 km+',       s: 'Always pushing limits' },
    ],
  },
  {
    stage: 'q3' as Stage,
    prompt: 'Which feature matters most to you?',
    opts: [
      { v: 'acc',   t: 'Blistering Speed',   s: '0–100 in under 3 seconds' },
      { v: 'tech',  t: 'Cutting-Edge Tech',  s: 'HyperOS & smart living' },
      { v: 'safe',  t: 'Space & Safety',     s: 'Built for who matters most' },
      { v: 'range', t: 'Range Confidence',   s: 'Never worry about charging' },
    ],
  },
  {
    stage: 'q4' as Stage,
    prompt: "What's your purchase budget?",
    opts: [
      { v: 'tier1', t: 'AED 100k – 160k',  s: 'Smart entry tier' },
      { v: 'tier2', t: 'AED 160k – 200k',  s: 'Premium tier' },
      { v: 'tier3', t: 'AED 200k – 350k',  s: 'Performance tier' },
      { v: 'tier4', t: 'AED 350k+',        s: 'No compromises' },
    ],
  },
]

// ─── Option icons ─────────────────────────────────────────────────────────────
const OPT_ICONS: Record<string, React.ReactNode> = {
  perf:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4.5 13.5h7L10 22l8.5-11.5H11.5L13 2z"/></svg>,
  urban:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="4" height="13"/><rect x="10" y="6" width="4" height="16"/><rect x="17" y="3" width="4" height="19"/></svg>,
  family: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2"/><circle cx="18" cy="8" r="2.5"/><path d="M15.5 20v-1.5a5 5 0 0 1 5-5"/></svg>,
  eco:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>,
  city:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h20"/><path d="M5 20V8h5v12"/><path d="M14 20V4h5v16"/></svg>,
  mid:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l3-10 3 5 3-8 3 8 3-5 3 10"/></svg>,
  road:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><rect x="7" y="15" width="10" height="4" rx="2"/></svg>,
  ultra:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#E31937" fillOpacity="0.15"/></svg>,
  acc:    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 1 7.07 17.07"/><path d="M12 2a10 10 0 0 0-7.07 17.07"/><line x1="12" y1="12" x2="17" y2="7"/><circle cx="12" cy="12" r="1.5" fill="#E31937"/></svg>,
  tech:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6" fill="#E31937" fillOpacity="0.15"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  safe:   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#E31937" fillOpacity="0.1"/></svg>,
  range:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/><rect x="3" y="8" width="8" height="8" rx="1" fill="#E31937" fillOpacity="0.3"/></svg>,
  tier1:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 9 18 20 6 20 2 9" fill="#E31937" fillOpacity="0.1"/></svg>,
  tier2:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#E31937" fillOpacity="0.12"/></svg>,
  tier3:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 19h20"/><path d="M2 19l3-10 5 5 2-7 2 7 5-5 3 10" fill="#E31937" fillOpacity="0.1"/></svg>,
  tier4:  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" fill="#E31937" fillOpacity="0.1"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
}

// ─── Matching algorithm ───────────────────────────────────────────────────────
function matchCars(answers: string[]): [Car, Car] {
  const scores = CARS.map(c => ({ c, n: 0 }))
  if (answers[0] === 'perf')   { scores[2].n += 4; scores[3].n += 5 }
  if (answers[0] === 'urban')  { scores[0].n += 3; scores[1].n += 3 }
  if (answers[0] === 'family') { scores[4].n += 5; scores[0].n += 1 }
  if (answers[0] === 'eco')    { scores[0].n += 4; scores[1].n += 3 }
  if (answers[1] === 'city')   { scores[0].n += 3 }
  if (answers[1] === 'mid')    { scores[0].n += 1; scores[1].n += 2 }
  if (answers[1] === 'road')   { scores[1].n += 3; scores[2].n += 2 }
  if (answers[1] === 'ultra')  { scores[1].n += 4; scores[0].n += 1 }
  if (answers[2] === 'acc')    { scores[2].n += 4; scores[3].n += 5 }
  if (answers[2] === 'tech')   { scores[1].n += 3; scores[2].n += 2 }
  if (answers[2] === 'safe')   { scores[4].n += 4; scores[0].n += 2 }
  if (answers[2] === 'range')  { scores[1].n += 4; scores[0].n += 2 }
  if (answers[3] === 'tier1')  { scores[0].n += 5 }
  if (answers[3] === 'tier2')  { scores[1].n += 3; scores[4].n += 3 }
  if (answers[3] === 'tier3')  { scores[2].n += 4; scores[4].n += 2 }
  if (answers[3] === 'tier4')  { scores[3].n += 5; scores[2].n += 2 }
  scores.sort((a, b) => b.n - a.n)
  return [scores[0].c, scores[1].c]
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes scanline {
    0%   { transform:translateY(-100%); opacity:0; }
    10%  { opacity:1; }
    90%  { opacity:1; }
    100% { transform:translateY(100vh); opacity:0; }
  }
  @keyframes gridFadeIn { from{opacity:0} to{opacity:0.18} }
  @keyframes particleDrift0  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-40px)} }
  @keyframes particleDrift1  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-35px,25px)} }
  @keyframes particleDrift2  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,45px)} }
  @keyframes particleDrift3  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,-30px)} }
  @keyframes particleDrift4  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(45px,20px)} }
  @keyframes particleDrift5  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,50px)} }
  @keyframes particleDrift6  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(50px,-20px)} }
  @keyframes particleDrift7  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,15px)} }
  @keyframes particleDrift8  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,-55px)} }
  @keyframes particleDrift9  { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,-45px)} }
  @keyframes particleDrift10 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,35px)} }
  @keyframes particleDrift11 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-45px,-10px)} }
  @keyframes particleDrift12 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(10px,55px)} }
  @keyframes particleDrift13 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px)} }
  @keyframes particleDrift14 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(55px,-35px)} }
  @keyframes particleDrift15 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-55px,5px)} }
  @keyframes particleDrift16 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(5px,-60px)} }
  @keyframes particleDrift17 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-60px,30px)} }
  @keyframes particleDrift18 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(60px,10px)} }
  @keyframes particleDrift19 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-10px,-65px)} }
  @keyframes particleDrift20 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(35px,60px)} }
  @keyframes particleDrift21 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-65px,-5px)} }
  @keyframes confettiBurst {
    0%   { transform:translate(0,0) rotate(0deg) scale(1); opacity:1; }
    100% { transform:translate(var(--tx),var(--ty)) rotate(var(--r)) scale(0); opacity:0; }
  }
  @keyframes pulseRing { 0%,100%{transform:scale(1);opacity:0.6} 50%{transform:scale(1.06);opacity:1} }
  @keyframes spinCW  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes spinCCW { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes logoPulse {
    0%,100%{filter:drop-shadow(0 0 8px rgba(232,33,39,0.5))}
    50%{filter:drop-shadow(0 0 20px rgba(232,33,39,0.9))}
  }
  @keyframes carSlideIn {
    from{transform:translateX(60px) scale(0.96);opacity:0}
    to{transform:translateX(0) scale(1);opacity:1}
  }

  .ami-opt-card {
    cursor:pointer;
    background:rgba(0,0,0,0.4);
    backdrop-filter:blur(8px);
    -webkit-backdrop-filter:blur(8px);
    border:1px solid rgba(255,255,255,0.1);
    border-radius:4px;
    padding:14px 12px 12px;
    display:flex; flex-direction:column; gap:6px;
    transition:border-color 0.25s, background 0.25s, transform 0.25s;
    user-select:none; position:relative; overflow:hidden;
  }
  .ami-opt-card:hover {
    border-color:rgba(255,255,255,0.22);
    background:rgba(0,0,0,0.55);
    transform:translateY(-2px);
  }
  .ami-opt-card.selected {
    border-color:#E31937;
    background:rgba(227,25,55,0.1);
    box-shadow:0 0 0 1px #E31937;
    transform:translateY(-1px);
  }
  .ami-opt-card-accent {
    position:absolute; bottom:0; left:0; right:0; height:1px;
    background:#E31937; opacity:0; transition:opacity 0.3s;
  }
  .ami-opt-card:hover .ami-opt-card-accent,
  .ami-opt-card.selected .ami-opt-card-accent { opacity:1; }
  .ami-opt-icon {
    width:40px; height:40px;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0; transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ami-opt-card:hover .ami-opt-icon { transform:scale(1.15) translateY(-1px); }
  .ami-opt-num {
    position:absolute; top:12px; right:14px;
    font-size:10px; font-weight:600;
    color:rgba(255,255,255,0.12); letter-spacing:0.12em;
    font-family:'Inter', -apple-system, sans-serif;
  }
  .ami-step-dots { display:flex; gap:6px; }
  .ami-step-dot { width:6px; height:6px; border-radius:50%; transition:background 0.3s, transform 0.3s, width 0.3s; }
  .ami-step-dot.done    { background:#E31937; transform:scale(1.2); }
  .ami-step-dot.active  { background:#E31937; width:18px; border-radius:3px; }
  .ami-step-dot.future  { background:rgba(255,255,255,0.12); }
  .ami-scrollable { overflow-y:auto; scrollbar-width:thin; scrollbar-color:rgba(232,33,39,0.4) transparent; }
  .ami-scrollable::-webkit-scrollbar { width:4px; }
  .ami-scrollable::-webkit-scrollbar-thumb { background:rgba(232,33,39,0.4); border-radius:2px; }
  .xara-results-pane { display:flex; flex-direction:row; width:100%; height:100%; overflow:hidden; }
  .xara-results-img  { flex:0 0 55%; position:relative; overflow:hidden; }
  .xara-results-panel{ flex:0 0 45%; overflow-y:auto; background:#0A0A0A; border-left:1px solid rgba(255,255,255,0.06); }
  @media(max-width:600px){
    .xara-results-pane  { flex-direction:column; }
    .xara-results-img   { flex:0 0 42%; }
    .xara-results-panel { flex:1; border-left:none; border-top:1px solid rgba(255,255,255,0.06); }
  }
`

// ─── MiLogo ───────────────────────────────────────────────────────────────────
function MiLogo({ size = 40, color = '#E31937' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-label="Xiaomi Mi logo">
      <rect x="4" y="4" width="32" height="32" rx="8" fill={color} />
      <text x="20" y="27" textAnchor="middle" fontSize="18" fontWeight="700" fill="#fff" fontFamily="'Inter', -apple-system, sans-serif">mi</text>
    </svg>
  )
}

function AnalyzingParticle({ index }: { index: number }) {
  const x = Math.round(10 + ((index * 53 + 7) % 80))
  const y = Math.round(5 + ((index * 37 + 13) % 90))
  const size = 1 + (index % 3)
  const dur = 4 + (index % 5) * 1.2
  const delay = (index % 7) * 0.6
  const opacity = 0.2 + (index % 4) * 0.12
  return (
    <div style={{
      position: 'absolute', left: `${x}%`, top: `${y}%`,
      width: size, height: size, borderRadius: '50%',
      background: '#E31937', opacity,
      animation: `particleDrift${index % 22} ${dur}s ${delay}s ease-in-out infinite`,
    }} />
  )
}

function ConfettiParticle({ index }: { index: number }) {
  const angle = (index / 20) * 360
  const dist = 80 + (index % 5) * 40
  const tx = Math.round(Math.cos((angle * Math.PI) / 180) * dist)
  const ty = Math.round(Math.sin((angle * Math.PI) / 180) * dist - 60)
  const size = 4 + (index % 5) * 2
  const hue = index % 3 === 0 ? '#E31937' : index % 3 === 1 ? '#E31937' : '#FFD6B0'
  return (
    <div style={{
      position: 'absolute', top: 0, left: '50%',
      width: size, height: size,
      borderRadius: index % 2 === 0 ? '50%' : '2px',
      background: hue,
      ['--tx' as string]: `${tx}px`,
      ['--ty' as string]: `${ty}px`,
      ['--r' as string]: `${index * 23}deg`,
      animation: `confettiBurst 1.4s ${(index % 5) * 0.08}s ease-out both`,
    }} />
  )
}

function useTypewriter(text: string, speed = 40, startDelay = 300) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    const t0 = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(t0)
  }, [text, speed, startDelay])
  return displayed
}

// ─── Boot stage ───────────────────────────────────────────────────────────────
function BootStage() {
  const typed = useTypewriter('XARA · AI Match Engine · Initialising…', 45, 500)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${STAGE_BG.boot}')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '0 40px 48px',
      }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }} style={{ marginBottom: 16 }}>
          <MiLogo size={48} color="#E31937" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div style={{ fontSize: 'clamp(3rem,7vw,4.5rem)', fontWeight: 200, color: '#fff', fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 6 }}>
            XARA
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '0.06em', marginBottom: 16 }}>
            AI Recommendation Advisor
          </div>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ fontSize: 10, letterSpacing: '0.14em', color: '#E31937', textTransform: 'uppercase', fontFamily: 'Inter, -apple-system, sans-serif', minHeight: '1.4em' }}>
          {typed}<span style={{ color: '#E31937', opacity: 0.8 }}>_</span>
        </motion.p>
      </div>
    </div>
  )
}

// ─── Question stage ───────────────────────────────────────────────────────────
function QuestionStage({ qIndex, onAnswer, onBack }: {
  qIndex: number; onAnswer: (v: string) => void; onBack: (() => void) | null
}) {
  const q = QUESTIONS[qIndex]
  const [selected, setSelected] = useState<string | null>(null)
  const bgKey = `q${qIndex + 1}` as keyof typeof STAGE_BG
  const numStr = String(qIndex + 1).padStart(2, '0')

  function handleSelect(v: string) {
    if (selected) return
    setSelected(v)
    setTimeout(() => onAnswer(v), 380)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* BG image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${STAGE_BG[bgKey]}')`,
        backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      {/* Gradient scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.9) 100%)',
      }} />
      {/* Top progress bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.08)', zIndex: 5 }}>
        <motion.div
          initial={{ width: `${(qIndex / QUESTIONS.length) * 100}%` }}
          animate={{ width: `${((qIndex + 1) / QUESTIONS.length) * 100}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg,#E31937,#E31937)' }}
        />
      </div>

      {/* Back button */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, delay: 0.15 }}
          onClick={onBack}
          style={{
            position: 'absolute', top: 58, left: 20, zIndex: 21,
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20,
            cursor: 'pointer', color: 'rgba(255,255,255,0.8)',
            fontSize: 11, fontFamily: 'Inter, -apple-system, sans-serif', fontWeight: 500,
            letterSpacing: '0.06em', padding: '6px 12px 6px 8px',
            transition: 'color 0.18s, border-color 0.18s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#E31937'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(232,33,39,0.5)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.8)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back
        </motion.button>
      )}

      {/* Question text — Tesla ultra-thin style */}
      <div style={{ position: 'absolute', left: 28, right: 28, top: '14%' }}>
        <motion.div key={`num-${qIndex}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ fontSize: 10, fontWeight: 500, color: '#E31937', letterSpacing: '0.28em', textTransform: 'uppercase', fontFamily: 'Inter, -apple-system, sans-serif', marginBottom: 10 }}>
          Question {numStr} of {QUESTIONS.length.toString().padStart(2, '0')}
        </motion.div>
        <motion.h2 key={`prompt-${qIndex}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.07 }}
          style={{ fontSize: 'clamp(1.7rem,4vw,2.6rem)', fontWeight: 200, color: '#fff', fontFamily: 'Inter, -apple-system, sans-serif', lineHeight: 1.1, letterSpacing: '-0.03em', margin: 0, maxWidth: 480 }}>
          {q.prompt}
        </motion.h2>
      </div>

      {/* Glass panel at bottom — Tesla minimal */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(0,0,0,0.75)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '14px 20px 20px', zIndex: 6,
      }}>
        {/* Step dots */}
        <div className="ami-step-dots" style={{ marginBottom: 14 }}>
          {QUESTIONS.map((_, di) => (
            <div key={di} className={`ami-step-dot ${di < qIndex ? 'done' : di === qIndex ? 'active' : 'future'}`} />
          ))}
        </div>
        {/* Option grid */}
        <motion.div key={`grid-${qIndex}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.12 }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {q.opts.map((opt, i) => (
            <motion.div
              key={opt.v}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.15 + i * 0.05 }}
              className={`ami-opt-card${selected === opt.v ? ' selected' : ''}`}
              onClick={() => handleSelect(opt.v)}
              role="button" aria-pressed={selected === opt.v} tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleSelect(opt.v)}
            >
              <span className="ami-opt-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="ami-opt-icon">{OPT_ICONS[opt.v]}</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', fontFamily: 'Inter, -apple-system, sans-serif', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{opt.t}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, -apple-system, sans-serif', lineHeight: 1.5 }}>{opt.s}</span>
              <div className="ami-opt-card-accent" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

// ─── Analyzing stage ──────────────────────────────────────────────────────────
const ANALYZE_STEPS = ['Reading your lifestyle DNA', 'Scanning 5 Xiaomi models', 'Calculating 12 match dimensions', 'Preparing your reveal']

function AnalyzingStage({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(-1)
  const [pct, setPct] = useState(0)
  const particles = Array.from({ length: 22 }, (_, i) => i)

  useEffect(() => {
    let s = 0
    const si = setInterval(() => { s++; setStep(s - 1); if (s >= ANALYZE_STEPS.length) clearInterval(si) }, 700)
    let p = 0
    const pi = setInterval(() => {
      p = Math.min(p + 1, 100); setPct(p)
      if (p >= 100) { clearInterval(pi); setTimeout(onDone, 300) }
    }, 31)
    return () => { clearInterval(si); clearInterval(pi) }
  }, [onDone])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '32px 24px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${STAGE_BG.q4}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.88)' }} />
      {particles.map(i => <AnalyzingParticle key={i} index={i} />)}

      <div style={{ position: 'relative', width: 140, height: 140, marginBottom: 32 }}>
        {[{ inset: 0, border: '1.5px solid rgba(232,33,39,0.18)', anim: 'spinCW 12s linear infinite', dot: '#E31937' },
          { inset: 18, border: '1.5px solid rgba(232,33,39,0.35)', anim: 'spinCCW 7s linear infinite', dot: '#E31937' },
          { inset: 36, border: '2px solid rgba(232,33,39,0.6)', anim: 'spinCW 4s linear infinite', dot: '#E31937' }].map((r, ri) => (
          <div key={ri} style={{ position: 'absolute', inset: r.inset, borderRadius: '50%', border: r.border, animation: r.anim }}>
            <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: ri === 1 ? 6 : 7, height: ri === 1 ? 6 : 7, borderRadius: '50%', background: r.dot, boxShadow: `0 0 ${ri === 2 ? 10 : 8}px ${r.dot}` }} />
          </div>
        ))}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulseRing 1.8s ease-in-out infinite, logoPulse 1.8s ease-in-out infinite' }}>
          <MiLogo size={44} color="#E31937" />
        </div>
      </div>

      <motion.div key={pct} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15 }}
        style={{ fontSize: '3rem', fontWeight: 100, color: '#E31937', fontFamily: 'Inter, -apple-system, sans-serif', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 24, position: 'relative' }}>
        {pct}<span style={{ fontSize: '1.2rem', color: 'rgba(232,33,39,0.6)' }}>%</span>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 300, position: 'relative' }}>
        {ANALYZE_STEPS.map((label, i) => {
          const done = step >= i
          return (
            <motion.div key={label} initial={{ opacity: 0.3 }} animate={{ opacity: done ? 1 : 0.3 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: done ? '#E31937' : 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}>{done ? '✦' : '○'}</span>
                <span style={{ fontSize: 12, fontFamily: 'Inter, -apple-system, sans-serif', color: done ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)', transition: 'color 0.3s', letterSpacing: '0.04em' }}>{label}</span>
              </div>
              {done && (
                <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ height: 2, background: 'linear-gradient(90deg,#E31937,rgba(232,33,39,0.3))', borderRadius: 1, marginLeft: 21 }} />
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Results stage ────────────────────────────────────────────────────────────
function ResultsStage({ best, second, onClose, onRetake }: { best: Car; second: Car; onClose: () => void; onRetake: () => void }) {
  const confetti = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="xara-results-pane">
      {/* LEFT — car hero */}
      <div className="xara-results-img">
        <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 0, pointerEvents: 'none', zIndex: 10 }}>
          {confetti.map(i => <ConfettiParticle key={i} index={i} />)}
        </div>
        <motion.img
          src={best.image} alt={best.name}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,transparent 55%,rgba(0,0,0,0.5) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.15) 55%,rgba(0,0,0,0.3) 100%)' }} />
        <div style={{ position: 'absolute', top: 20, left: 20, background: '#E31937', borderRadius: 20, padding: '4px 12px', fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, -apple-system, sans-serif' }}>{best.badge}</div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 24px 24px' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.22em', color: '#E31937', textTransform: 'uppercase', fontFamily: 'Inter, -apple-system, sans-serif', marginBottom: 6 }}>Your Perfect Match</div>
          <div style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', fontWeight: 800, color: '#fff', fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 6 }}>Xiaomi {best.name}</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, -apple-system, sans-serif' }}>AED {best.price.toLocaleString()}</div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 9, fontFamily: 'Inter, -apple-system, sans-serif', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>AI Match</span>
            <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                style={{ height: '100%', background: 'linear-gradient(90deg,#E31937,#E31937)', borderRadius: 2 }} />
            </div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
              style={{ fontSize: 12, fontWeight: 700, color: '#E31937', fontFamily: 'Inter, -apple-system, sans-serif' }}>94%</motion.span>
          </div>
        </div>
      </div>

      {/* RIGHT — action panel */}
      <div className="xara-results-panel ami-scrollable">
        <div style={{ padding: '22px 20px 20px' }}>
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 10, letterSpacing: '0.18em', color: '#E31937', textTransform: 'uppercase', fontFamily: 'Inter, -apple-system, sans-serif', marginBottom: 6 }}>What would you like to do?</p>
          </motion.div>

          {/* Specs */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {[{ label: 'Range', val: `${best.range} km` }, { label: '0–100', val: best.accel }, { label: 'Segment', val: best.badge }].map(spec => (
              <div key={spec.label} style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '8px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 8, color: '#555', fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>{spec.label}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#fff', fontFamily: 'Inter, -apple-system, sans-serif' }}>{spec.val}</div>
              </div>
            ))}
          </motion.div>

          {/* 4 action buttons */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {/* Buy Now */}
            <button
              onClick={() => { onClose(); window.dispatchEvent(new CustomEvent('open-lease-chatbot')) }}
              style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '13px 12px 11px', background: 'linear-gradient(135deg,#E31937,#C41630)', borderRadius: 4, border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(232,33,39,0.3)', transition: 'transform 0.2s, box-shadow 0.2s', textAlign: 'left' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(232,33,39,0.45)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(232,33,39,0.3)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/><rect x="7" y="15" width="10" height="4" rx="2"/></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: 'Inter, -apple-system, sans-serif', lineHeight: 1.2 }}>Buy Now</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.72)', fontFamily: 'Inter, -apple-system, sans-serif' }}>Start your journey</span>
            </button>
            {/* Test Drive */}
            <Link href="/contact?ref=test-drive" onClick={onClose} style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '13px 12px 11px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, textDecoration: 'none', transition: 'transform 0.2s, border-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.borderColor = 'rgba(232,33,39,0.4)'; el.style.background = 'rgba(232,33,39,0.06)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(0)'; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.background = 'rgba(255,255,255,0.04)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, -apple-system, sans-serif', lineHeight: 1.2 }}>Test Drive</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, -apple-system, sans-serif' }}>Book a session</span>
            </Link>
            {/* Compare */}
            <Link href="/cars" onClick={onClose} style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '13px 12px 11px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, textDecoration: 'none', transition: 'transform 0.2s, border-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.borderColor = 'rgba(232,33,39,0.4)'; el.style.background = 'rgba(232,33,39,0.06)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(0)'; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.background = 'rgba(255,255,255,0.04)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, -apple-system, sans-serif', lineHeight: 1.2 }}>Compare</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, -apple-system, sans-serif' }}>All models</span>
            </Link>
            {/* View Offers */}
            <Link href="/cars" onClick={onClose} style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '13px 12px 11px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, textDecoration: 'none', transition: 'transform 0.2s, border-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.borderColor = 'rgba(232,33,39,0.4)'; el.style.background = 'rgba(232,33,39,0.06)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(0)'; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.background = 'rgba(255,255,255,0.04)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, -apple-system, sans-serif', lineHeight: 1.2 }}>View Offers</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, -apple-system, sans-serif' }}>Exclusive deals</span>
            </Link>
          </motion.div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '4px 0 14px' }} />

          {/* Second match */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            style={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: '#141414', display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ width: 80, height: 60, flexShrink: 0, overflow: 'hidden', background: '#0E0E0E' }}>
              <img src={second.image} alt={second.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, -apple-system, sans-serif' }}>Xiaomi {second.name}</span>
                <span style={{ fontSize: 8, fontWeight: 600, color: '#E31937', letterSpacing: '0.06em', fontFamily: 'Inter, -apple-system, sans-serif', background: 'rgba(232,33,39,0.12)', border: '1px solid rgba(232,33,39,0.25)', borderRadius: 4, padding: '1px 5px' }}>#2 MATCH</span>
              </div>
              <div style={{ fontSize: 10, color: '#E31937', fontWeight: 600, fontFamily: 'Inter, -apple-system, sans-serif' }}>AED {second.price.toLocaleString()}</div>
            </div>
            <Link href={`/cars/${second.slug}`} onClick={onClose} style={{ marginRight: 12, fontSize: 10, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontFamily: 'Inter, -apple-system, sans-serif', whiteSpace: 'nowrap', padding: '5px 8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#E31937'; el.style.color = '#E31937' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.color = 'rgba(255,255,255,0.4)' }}>
              View →
            </Link>
          </motion.div>

          {/* Retake */}
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} onClick={onRetake}
            style={{ display: 'block', width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, -apple-system, sans-serif', fontSize: 11, cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s', letterSpacing: '0.04em' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = 'rgba(232,33,39,0.35)'; el.style.color = '#E31937' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.color = 'rgba(255,255,255,0.3)' }}>
            Retake Quiz
          </motion.button>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AiFindMatchChat({ onClose }: { onClose: () => void }) {
  const [stage, setStage] = useState<Stage>('boot')
  const [answers, setAnswers] = useState<string[]>([])
  const [qIndex, setQIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [results, setResults] = useState<[Car, Car] | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setStage('q1'), 2200)
    return () => clearTimeout(t)
  }, [])

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose()
  }

  const handleAnswer = useCallback((v: string) => {
    const next = [...answers, v]
    setAnswers(next)
    setDirection(1)
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qi => qi + 1)
      const stages: Stage[] = ['q1', 'q2', 'q3', 'q4']
      setStage(stages[qIndex + 1])
    } else {
      setStage('analyzing')
    }
  }, [answers, qIndex])

  const handleBack = useCallback(() => {
    if (qIndex === 0) return
    const prev = qIndex - 1
    setAnswers(a => a.slice(0, prev))
    setDirection(-1)
    setQIndex(prev)
    const stages: Stage[] = ['q1', 'q2', 'q3', 'q4']
    setStage(stages[prev])
  }, [qIndex])

  const handleAnalyzingDone = useCallback(() => {
    setResults(matchCars(answers))
    setStage('results')
  }, [answers])

  function handleRetake() {
    setAnswers([]); setQIndex(0); setDirection(1); setResults(null); setStage('boot')
    setTimeout(() => setStage('q1'), 2200)
  }

  const slideVariants = {
    enter: (d: number) => ({ x: d * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -60, opacity: 0 }),
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div onClick={handleBackdropClick} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', width: 'min(920px,96vw)', height: 'min(92vh,880px)', background: '#0A0A0A', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 32px 80px rgba(0,0,0,0.7)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          onClick={e => e.stopPropagation()}
        >
          {/* XARA badge */}
          <div style={{ position: 'absolute', top: 18, left: 18, zIndex: 20, display: 'flex', alignItems: 'center', gap: 7 }}>
            <MiLogo size={22} color="#E31937" />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, -apple-system, sans-serif', textTransform: 'uppercase' }}>XARA</span>
          </div>
          {/* Close */}
          <button onClick={onClose} aria-label="Close XARA" style={{ position: 'absolute', top: 16, right: 16, zIndex: 20, width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', color: 'rgba(255,255,255,0.55)', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', lineHeight: 1, padding: 0 }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = '#E31937'; b.style.color = '#E31937'; b.style.background = 'rgba(232,33,39,0.1)' }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.12)'; b.style.color = 'rgba(255,255,255,0.55)'; b.style.background = 'rgba(0,0,0,0.45)' }}>
            ×
          </button>

          <AnimatePresence mode="wait" custom={direction}>
            {stage === 'boot' && (
              <motion.div key="boot" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: 'easeInOut' }} style={{ width: '100%', height: '100%' }}>
                <BootStage />
              </motion.div>
            )}
            {(['q1','q2','q3','q4'] as Stage[]).includes(stage) && (
              <motion.div key={stage} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.38, ease: 'easeInOut' }} style={{ width: '100%', height: '100%' }}>
                <QuestionStage qIndex={qIndex} onAnswer={handleAnswer} onBack={qIndex > 0 ? handleBack : null} />
              </motion.div>
            )}
            {stage === 'analyzing' && (
              <motion.div key="analyzing" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: 'easeInOut' }} style={{ width: '100%', height: '100%' }}>
                <AnalyzingStage onDone={handleAnalyzingDone} />
              </motion.div>
            )}
            {stage === 'results' && results && (
              <motion.div key="results" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: 'easeInOut' }} style={{ width: '100%', height: '100%' }}>
                <ResultsStage best={results[0]} second={results[1]} onClose={onClose} onRetake={handleRetake} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}
