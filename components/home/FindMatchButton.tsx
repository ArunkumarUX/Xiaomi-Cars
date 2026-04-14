'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const AiFindMatchChat = dynamic(() => import('@/components/ai/AiFindMatchChat'), { ssr: false })

export default function FindMatchButton() {
  const [open, setOpen] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null)
  const rippleId = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    rippleId.current++
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: rippleId.current })
    setPressed(true)
    setTimeout(() => setRipple(null), 700)
  }

  const css = `
    @keyframes fmb-ripple {
      0%   { transform: translate(-50%,-50%) scale(0); opacity: .45; }
      100% { transform: translate(-50%,-50%) scale(6); opacity: 0; }
    }
    @keyframes fmb-glow-pulse {
      0%,100% {
        box-shadow:
          0 0 0 1px rgba(255,255,255,.15),
          0 4px 24px rgba(227,25,55,.25),
          0 2px 8px rgba(0,0,0,.15),
          0 0 30px rgba(227,25,55,.15);
      }
      50% {
        box-shadow:
          0 0 0 1px rgba(255,255,255,.2),
          0 6px 32px rgba(227,25,55,.4),
          0 2px 12px rgba(0,0,0,.18),
          0 0 50px rgba(227,25,55,.35);
      }
    }
    @keyframes fmb-sparkle-spin {
      0%   { transform: rotate(0deg) scale(1); }
      50%  { transform: rotate(20deg) scale(1.15); }
      100% { transform: rotate(0deg) scale(1); }
    }

    .fmb-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      padding: 14px 36px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      outline: none;
      overflow: hidden;
      /* Tesla-red gradient with pulsing glow */
      background: linear-gradient(105deg, #E31937 0%, #C41630 100%);
      animation: fmb-glow-pulse 2s ease-in-out infinite;
      box-shadow:
        0 0 0 1px rgba(255,255,255,.15),
        0 4px 24px rgba(227,25,55,.25),
        0 2px 8px rgba(0,0,0,.15),
        0 0 30px rgba(227,25,55,.15);
      transition: box-shadow .28s ease, transform .14s cubic-bezier(.22,1,.36,1), filter .2s;
    }
    .fmb-btn:hover {
      box-shadow:
        0 0 0 1px rgba(255,255,255,.25),
        0 6px 32px rgba(227,25,55,.35),
        0 2px 12px rgba(0,0,0,.18);
      filter: brightness(1.08);
    }
    .fmb-btn:active { transform: scale(.962); filter: brightness(.96); }

    /* subtle noise texture overlay */
    .fmb-btn::before {
      content: '';
      position: absolute; inset: 0; border-radius: 4px;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      background-size: 180px 180px;
      opacity: .05;
      pointer-events: none;
      mix-blend-mode: overlay;
    }

    /* inner highlight top rim */
    .fmb-btn::after {
      content: '';
      position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent);
      border-radius: 4px;
      pointer-events: none;
    }

    /* text */
    .fmb-btn-text {
      font-family: 'MiSans', 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      letter-spacing: .01em;
      white-space: nowrap;
      position: relative; z-index: 1;
      text-shadow: 0 1px 4px rgba(0,0,0,.18);
    }

    /* sparkle icon */
    .fmb-sparkle {
      position: relative; z-index: 1;
      color: rgba(255,255,255,0.7); flex-shrink: 0;
      filter: drop-shadow(0 0 3px rgba(255,255,255,.4));
      animation: fmb-sparkle-spin 2.8s ease-in-out infinite;
    }

    /* click ripple */
    .fmb-ripple {
      position: absolute; width: 60px; height: 60px; border-radius: 50%;
      background: radial-gradient(circle, rgba(255,255,255,.45) 0%, transparent 70%);
      animation: fmb-ripple .7s ease-out forwards;
      pointer-events: none; z-index: 2;
    }
  `

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .65, ease: [.22,1,.36,1], delay: .3 }}
        style={{ display: 'inline-block' }}
      >
        <button
          className="fmb-btn"
          onClick={() => setOpen(true)}
          onMouseDown={handleMouseDown}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          aria-label="Ask XARA – AI Car Advisor"
        >
          {/* ripple */}
          {ripple && (
            <span
              key={ripple.id}
              className="fmb-ripple"
              style={{ left: ripple.x, top: ripple.y }}
            />
          )}

          <span className="fmb-btn-text">Ask XARA</span>

          {/* sparkle ✦ icon */}
          <svg
            className="fmb-sparkle"
            width="18" height="18" viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2 L13.5 9.5 L21 11 L13.5 12.5 L12 20 L10.5 12.5 L3 11 L10.5 9.5 Z" />
          </svg>
        </button>
      </motion.div>

      <AnimatePresence>
        {open && <AiFindMatchChat onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
