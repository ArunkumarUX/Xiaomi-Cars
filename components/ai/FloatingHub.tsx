'use client'

const trigger = (event: string) => {
  setTimeout(() => window.dispatchEvent(new CustomEvent(event)), 80)
}

const css = `
  .fhub-root {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    font-family: 'Inter', -apple-system, sans-serif;
  }

  /* ── shared pill ── */
  .fhub-pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 0 20px 0 12px;
    height: 48px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.22s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.22s ease,
                background 0.2s ease;
  }
  .fhub-pill:active { transform: scale(0.95) !important; }

  .fhub-pill-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  /* ── Lease Now (primary) ── */
  .fhub-lease {
    background: #E31937;
    box-shadow: 0 4px 20px rgba(227,25,55,0.45), 0 1px 4px rgba(0,0,0,0.2);
  }
  .fhub-lease:hover {
    background: #c8162f;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(227,25,55,0.55), 0 2px 8px rgba(0,0,0,0.25);
  }
  .fhub-lease .fhub-pill-icon {
    background: rgba(255,255,255,0.18);
  }
  .fhub-lease:hover .fhub-pill-icon {
    transform: rotate(-6deg) scale(1.08);
  }
  .fhub-lease-label {
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    letter-spacing: 0.01em;
  }

  /* ── AI Advisor (secondary) ── */
  .fhub-ai {
    background: rgba(12,12,12,0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07);
  }
  .fhub-ai:hover {
    background: rgba(22,22,22,0.95);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.45), 0 0 0 1px rgba(232,33,39,0.3);
  }
  .fhub-ai .fhub-pill-icon {
    background: rgba(232,33,39,0.12);
    border: 1px solid rgba(232,33,39,0.2);
  }
  .fhub-ai:hover .fhub-pill-icon {
    background: rgba(232,33,39,0.18);
    transform: scale(1.08);
  }
  .fhub-ai-label {
    font-size: 13px;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    letter-spacing: 0.01em;
  }

  @media (max-width: 480px) {
    .fhub-root { bottom: 20px; right: 16px; }
    .fhub-pill { height: 44px; padding: 0 16px 0 10px; }
    .fhub-pill-icon { width: 28px; height: 28px; }
    .fhub-lease-label, .fhub-ai-label { font-size: 12px; }
  }
`

export default function FloatingHub() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="fhub-root">

        {/* AI Advisor */}
        <button
          className="fhub-pill fhub-ai"
          onClick={() => trigger('open-concierge')}
          aria-label="Chat with AI Advisor"
        >
          <span className="fhub-pill-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </span>
          <span className="fhub-ai-label">AI Advisor</span>
        </button>

        {/* Lease Now */}
        <button
          className="fhub-pill fhub-lease"
          onClick={() => trigger('open-lease-chatbot')}
          aria-label="Start lease application"
        >
          <span className="fhub-pill-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v4a2 2 0 0 1-2 2h-2"/>
              <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
            </svg>
          </span>
          <span className="fhub-lease-label">Lease Now</span>
        </button>

      </div>
    </>
  )
}
