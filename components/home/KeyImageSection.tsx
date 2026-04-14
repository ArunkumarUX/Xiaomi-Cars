export default function KeyImageSection() {
  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        height: 'clamp(200px, 28vw, 420px)',
        background: 'linear-gradient(120deg, #1A0A00 0%, #E31937 35%, #CC5500 60%, #0A0500 100%)',
      }}
    >
      {/* Dark overlay for depth */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Central content */}
      <div className="relative z-10 text-center px-6">
        <div className="text-white/25 font-black uppercase tracking-[0.5em] text-xs mb-4">
          Xiaomi Leasing UAE
        </div>
        {/* Car key SVG */}
        <svg
          className="mx-auto mb-5 opacity-70"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="7" cy="7" r="4" />
          <path d="M10.3 10.3L17 17" />
          <path d="M17 17l2 1-1 2-2-1" />
          <path d="M14.5 14.5l1 2" />
        </svg>
        <div className="text-white font-black uppercase tracking-[0.35em] text-sm sm:text-base">
          YOUR KEY TO THE ROAD
        </div>
      </div>
    </div>
  )
}
