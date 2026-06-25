'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const COLORWAYS = [
  { name: 'King Black',    upper: '#111111', midsole: '#C0C0C0', sole: '#0A0A0A', laces: '#E8E8E8' },
  { name: 'Championship', upper: '#1a1240', midsole: '#E8E8E8', sole: '#111111', laces: '#ffffff' },
  { name: 'Fire & Steel',  upper: '#8B1A1A', midsole: '#2A2A2A', sole: '#C0392B', laces: '#E8E8E8' },
  { name: 'Ivory King',    upper: '#F0EBE0', midsole: '#C0C0C0', sole: '#1a1a1a', laces: '#111111' },
  { name: 'Phantom',       upper: '#1A1A2E', midsole: '#6C63FF', sole: '#0A0A0A', laces: '#C0C0C0' },
  { name: 'Virat Special', upper: '#C0C0C0', midsole: '#111111', sole: '#C0C0C0', laces: '#0A0A0A' },
]

const WALLPAPER_QUOTES = [
  'Greatness isn\'t given. It\'s earned.',
  'Be the king of your own court.',
  'Every step is a statement.',
  'Champions don\'t sleep. They grind.',
  'The crown is heavy. Wear it.',
]

function ShoeSVG({ colors }: { colors: typeof COLORWAYS[0] }) {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Shadow */}
      <ellipse cx="158" cy="148" rx="130" ry="10" fill="rgba(0,0,0,0.4)"/>
      {/* Sole */}
      <ellipse cx="158" cy="138" rx="128" ry="15" fill={colors.sole}/>
      {/* Midsole */}
      <rect x="36" y="116" width="248" height="20" rx="10" fill={colors.midsole}/>
      {/* ONE8 on midsole */}
      <text x="120" y="130" fontFamily="monospace" fontSize="12" fill={colors.upper} fontWeight="bold" opacity="0.9">ONE8</text>
      {/* Upper body */}
      <path d="M36 116 Q56 62 110 46 Q160 32 210 40 Q258 48 278 72 L278 116 Z" fill={colors.upper}/>
      {/* Toe cap */}
      <ellipse cx="272" cy="90" rx="26" ry="22" fill={colors.upper}/>
      {/* Heel */}
      <rect x="38" y="75" width="32" height="40" rx="4" fill={colors.midsole} opacity="0.7"/>
      {/* Tongue */}
      <path d="M148 46 Q158 36 168 46 L168 110 Q158 114 148 110 Z" fill={colors.upper} opacity="0.8"/>
      {/* Laces */}
      {[110, 130, 150, 170, 190, 210].map((x, i) => (
        <line key={i} x1={x} y1="48" x2={x} y2="112" stroke={colors.laces} strokeWidth="2.5" strokeDasharray="5 5" opacity="0.9"/>
      ))}
      {/* Cross lace lines */}
      {[55, 67, 79, 91, 103].map((y, i) => (
        <line key={i} x1="110" y1={y} x2="210" y2={y} stroke={colors.laces} strokeWidth="1.5" opacity="0.5"/>
      ))}
      {/* Logo patch */}
      <circle cx="72" cy="92" r="12" fill={colors.midsole} opacity="0.8"/>
      <text x="66" y="97" fontFamily="monospace" fontSize="8" fill={colors.sole} fontWeight="bold">V18</text>
    </svg>
  )
}

function WallpaperCanvas({ quote, colorway }: { quote: string; colorway: typeof COLORWAYS[0] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const W = canvas.width = 800
    const H = canvas.height = 450

    // Background
    ctx.fillStyle = '#0A0A0A'
    ctx.fillRect(0, 0, W, H)

    // Gold gradient overlay
    const grad = ctx.createRadialGradient(W/2, H, 50, W/2, H/2, H)
    grad.addColorStop(0, 'rgba(201,168,76,0.15)')
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    // Grid
    ctx.strokeStyle = 'rgba(201,168,76,0.04)'
    ctx.lineWidth = 1
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke() }
    for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke() }

    // ONE8 watermark
    ctx.font = 'bold 160px serif'
    ctx.fillStyle = 'rgba(201,168,76,0.04)'
    ctx.textAlign = 'center'
    ctx.fillText('ONE8', W/2, H/2 + 60)

    // Quote
    ctx.fillStyle = '#F5F5F0'
    ctx.font = 'bold 32px serif'
    ctx.textAlign = 'center'
    const words = quote.split(' ')
    let line = '', y = H/2 - 20
    for (const word of words) {
      const test = line + word + ' '
      if (ctx.measureText(test).width > W * 0.7 && line) {
        ctx.fillText(line.trim(), W/2, y)
        line = word + ' '
        y += 44
      } else line = test
    }
    ctx.fillText(line.trim(), W/2, y)

    // Gold accent line
    const lineGrad = ctx.createLinearGradient(W*0.2, 0, W*0.8, 0)
    lineGrad.addColorStop(0, 'transparent')
    lineGrad.addColorStop(0.5, colorway.midsole)
    lineGrad.addColorStop(1, 'transparent')
    ctx.strokeStyle = lineGrad
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(W*0.2, y + 24)
    ctx.lineTo(W*0.8, y + 24)
    ctx.stroke()

    // Bottom label
    ctx.fillStyle = 'rgba(201,168,76,0.5)'
    ctx.font = '12px monospace'
    ctx.textAlign = 'center'
    ctx.fillText('ONE8 – THE KING EDITION  |  FAN CONCEPT', W/2, H - 20)
  }, [quote, colorway])

  return <canvas ref={canvasRef} className="w-full rounded-lg" style={{ aspectRatio: '16/9' }} />
}

export default function FanExperience() {
  const [selected, setSelected]   = useState(0)
  const [quoteIdx, setQuoteIdx]   = useState(0)
  const [saved,    setSaved]      = useState<number[]>([])
  const [genWall,  setGenWall]    = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleSave = () => {
    if (!saved.includes(selected)) setSaved([...saved, selected])
  }

  const downloadWallpaper = () => {
    const canvas = document.querySelector('canvas[data-wallpaper]') as HTMLCanvasElement
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `one8-king-wallpaper-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <section id="fan-experience" className="section-padding overflow-hidden" style={{ background: '#0D0D0D' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.5em] uppercase text-king-gold block mb-4">
            Fan Zone
          </span>
          <h2 className="font-display text-[3.5rem] md:text-[5.5rem] text-king-white leading-none"
            style={{ fontFamily: 'var(--font-display)' }}>
            YOUR{' '}
            <span className="text-gold-shimmer" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
              EXPERIENCE
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ── Color Customizer ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8"
          >
            <div className="font-mono text-xs tracking-[0.4em] uppercase text-king-gold mb-2">01</div>
            <h3 className="font-display text-3xl text-king-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              SHOE CUSTOMIZER
            </h3>

            {/* Shoe preview */}
            <div className="relative bg-king-black rounded-xl p-6 mb-6 h-44 flex items-center justify-center"
              style={{ boxShadow: `0 0 40px ${COLORWAYS[selected].midsole}20` }}>
              <div className="w-full max-w-xs">
                <ShoeSVG colors={COLORWAYS[selected]} />
              </div>
            </div>

            {/* Colorway picker */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {COLORWAYS.map((cw, i) => (
                <button
                  key={cw.name}
                  onClick={() => setSelected(i)}
                  className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                    selected === i
                      ? 'border-king-gold bg-king-gold/10'
                      : 'border-king-gray hover:border-king-gold/40'
                  }`}
                >
                  {/* Swatch row */}
                  <div className="flex gap-1 mb-2">
                    {[cw.upper, cw.midsole, cw.sole].map((c, j) => (
                      <div key={j} className="w-4 h-4 rounded-full border border-white/10" style={{ background: c }} />
                    ))}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-king-white/60 leading-tight">
                    {cw.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className={`flex-1 py-3 text-sm rounded-sm font-mono uppercase tracking-wider transition-all duration-200 ${
                  saved.includes(selected)
                    ? 'border border-king-gold text-king-gold bg-king-gold/10'
                    : 'btn-secondary'
                }`}
              >
                {saved.includes(selected) ? '✓ Saved' : 'Save Design'}
              </button>
              <button className="btn-primary flex-1 py-3 text-sm rounded-sm">
                Order Custom
              </button>
            </div>

            {saved.length > 0 && (
              <p className="font-mono text-[10px] text-king-gold/50 mt-3 tracking-wider">
                {saved.length} design{saved.length > 1 ? 's' : ''} saved to your collection
              </p>
            )}
          </motion.div>

          {/* ── Wallpaper Generator ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8"
          >
            <div className="font-mono text-xs tracking-[0.4em] uppercase text-king-gold mb-2">02</div>
            <h3 className="font-display text-3xl text-king-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              WALLPAPER GEN
            </h3>

            {/* Quote selector */}
            <div className="flex flex-col gap-2 mb-6">
              {WALLPAPER_QUOTES.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIdx(i)}
                  className={`text-left p-3 rounded-lg border text-sm transition-all duration-200 ${
                    quoteIdx === i
                      ? 'border-king-gold text-king-gold bg-king-gold/10'
                      : 'border-king-gray text-king-white/50 hover:border-king-gold/30'
                  }`}
                >
                  "{q}"
                </button>
              ))}
            </div>

            {/* Preview & generate */}
            {genWall ? (
              <div className="mb-4">
                <WallpaperCanvas
                  quote={WALLPAPER_QUOTES[quoteIdx]}
                  colorway={COLORWAYS[selected]}
                />
                <button
                  onClick={downloadWallpaper}
                  className="btn-primary w-full py-3.5 text-sm rounded-sm mt-3"
                >
                  ↓ Download Wallpaper
                </button>
              </div>
            ) : (
              <button
                onClick={() => setGenWall(true)}
                className="btn-primary w-full py-3.5 text-sm rounded-sm"
              >
                Generate Wallpaper
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
