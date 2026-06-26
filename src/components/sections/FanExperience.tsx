'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ── Shoe colorways for customizer ──────────────────────────────────
const COLORWAYS = [
  { name: 'King Black',     upper: '#111111', midsole: '#C0C0C0', sole: '#0A0A0A', laces: '#E8E8E8' },
  { name: 'Championship',  upper: '#1a1240', midsole: '#E8E8E8', sole: '#111111', laces: '#ffffff' },
  { name: 'Steel Edge',    upper: '#2a2a2a', midsole: '#9CA3AF', sole: '#1a1a1a', laces: '#E8E8E8' },
  { name: 'Arctic White',  upper: '#F0EBE0', midsole: '#C0C0C0', sole: '#1a1a1a', laces: '#111111' },
  { name: 'Phantom',       upper: '#1A1A2E', midsole: '#6C63FF', sole: '#0A0A0A', laces: '#C0C0C0' },
  { name: 'Seam Edition',  upper: '#C0C0C0', midsole: '#111111', sole: '#C0C0C0', laces: '#0A0A0A' },
]

// ── Quiz questions ─────────────────────────────────────────────────
const QUIZ = [
  {
    q: 'Pick your playing style:',
    options: [
      { label: 'Aggressive Attacker', icon: '⚔️' },
      { label: 'Calculated Strategist', icon: '🧠' },
      { label: 'All-round Dominator', icon: '👑' },
      { label: 'Gritty Defender', icon: '🛡️' },
    ],
  },
  {
    q: 'Your training philosophy:',
    options: [
      { label: '4 AM sessions', icon: '🌅' },
      { label: 'Quality over quantity', icon: '🎯' },
      { label: 'Train till you drop', icon: '💪' },
      { label: 'Smart recovery', icon: '🧘' },
    ],
  },
  {
    q: 'Virat\'s greatest knock?',
    options: [
      { label: '183 vs Pakistan, 2012', icon: '🏏' },
      { label: '149 vs Pakistan, 2012 T20', icon: '⚡' },
      { label: '254 vs SA, 2019', icon: '🔥' },
      { label: 'WTC Final 2023', icon: '🏆' },
    ],
  },
]

const RESULTS = [
  { title: 'The Cover Drive King', shoe: 'Cover Drive 18 Pro', desc: 'You play with authority at the crease. Precision is your superpower.', link: 'https://one8.com/products/cover-drive-18-pro-men-high-performance' },
  { title: 'The Hybrid Warrior',  shoe: 'Boom Rush',           desc: 'You never stop. From the gym to the ground, you dominate everywhere.', link: 'https://one8.com/products/boom-rush-women-mint-green-classic-white' },
  { title: 'The Street Legend',   shoe: 'Seam Pavilion',       desc: 'Style is your statement. You bring the game to the street.', link: 'https://one8.com/products/seam-pavilion-mens-black' },
  { title: 'The Sonic Leaper',    shoe: 'Sonic Leap',          desc: 'Explosive, fast, and unstoppable. You were born for the big moments.', link: 'https://one8.com/products/sonic-leap-open-air-century-blue' },
]

// ── SVG Shoe preview ───────────────────────────────────────────────
function ShoeSVG({ c }: { c: typeof COLORWAYS[0] }) {
  return (
    <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      <ellipse cx="158" cy="148" rx="128" ry="10" fill="rgba(0,0,0,0.35)" />
      <ellipse cx="158" cy="138" rx="126" ry="14" fill={c.sole} />
      <rect x="36" y="116" width="248" height="20" rx="10" fill={c.midsole} />
      <text x="122" y="130" fontFamily="monospace" fontSize="11" fill={c.sole} fontWeight="bold" opacity="0.85">ONE8</text>
      <path d="M36 116 Q56 62 110 46 Q160 32 210 40 Q258 48 278 72 L278 116 Z" fill={c.upper} />
      <ellipse cx="272" cy="90" rx="25" ry="21" fill={c.upper} />
      <rect x="38" y="76" width="30" height="40" rx="4" fill={c.midsole} opacity="0.6" />
      <path d="M148 46 Q158 36 168 46 L168 110 Q158 114 148 110 Z" fill={c.upper} opacity="0.75" />
      {[108, 128, 148, 168, 188, 208].map((x, i) => (
        <line key={i} x1={x} y1="48" x2={x} y2="112" stroke={c.laces} strokeWidth="2.5" strokeDasharray="5 5" opacity="0.9" />
      ))}
      {[56, 68, 80, 92, 104].map((y, i) => (
        <line key={i} x1="108" y1={y} x2="208" y2={y} stroke={c.laces} strokeWidth="1.5" opacity="0.4" />
      ))}
      <circle cx="72" cy="92" r="11" fill={c.midsole} opacity="0.75" />
      <text x="66" y="97" fontFamily="monospace" fontSize="8" fill={c.sole} fontWeight="bold">V18</text>
    </svg>
  )
}

// ── Tab 1: Shoe Customizer ─────────────────────────────────────────
function ShoeCustomizer() {
  const [selected, setSelected] = useState(0)
  const [saved, setSaved] = useState<number[]>([])

  return (
    <div className="flex flex-col gap-6">
      {/* Preview */}
      <div className="relative bg-king-black rounded-xl overflow-hidden h-44 flex items-center justify-center"
        style={{ boxShadow: `inset 0 0 60px rgba(192,192,192,0.04)` }}>
        <div className="w-full max-w-xs px-4 h-full flex items-center">
          <ShoeSVG c={COLORWAYS[selected]} />
        </div>
        <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest text-white/20">
          {COLORWAYS[selected].name}
        </div>
      </div>

      {/* Colorway grid */}
      <div className="grid grid-cols-3 gap-2">
        {COLORWAYS.map((cw, i) => (
          <button
            key={cw.name}
            onClick={() => setSelected(i)}
            className="p-3 rounded-lg border text-left transition-all duration-200"
            style={{
              borderColor: selected === i ? '#C0C0C0' : 'rgba(255,255,255,0.08)',
              background: selected === i ? 'rgba(192,192,192,0.08)' : 'transparent',
            }}
          >
            <div className="flex gap-1.5 mb-1.5">
              {[cw.upper, cw.midsole, cw.sole].map((c, j) => (
                <div key={j} className="w-3.5 h-3.5 rounded-full border border-white/10" style={{ background: c }} />
              ))}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-white/50 leading-tight truncate">
              {cw.name}
            </div>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setSaved(p => p.includes(selected) ? p : [...p, selected])}
          className="flex-1 py-3 text-sm rounded-sm font-mono uppercase tracking-wider transition-all duration-200 btn-secondary"
          style={saved.includes(selected) ? { borderColor: '#C0C0C0', color: '#C0C0C0', background: 'rgba(192,192,192,0.08)' } : {}}
        >
          {saved.includes(selected) ? '✓ Saved' : 'Save Design'}
        </button>
        <a
          href="https://one8.com/collections/shoes"
          target="_blank" rel="noopener noreferrer"
          className="btn-primary flex-1 py-3 text-sm rounded-sm text-center"
        >
          Order Custom
        </a>
      </div>
      {saved.length > 0 && (
        <p className="font-mono text-[10px] text-white/30 tracking-wider">
          {saved.length} design{saved.length > 1 ? 's' : ''} saved
        </p>
      )}
    </div>
  )
}


// ── Tab 1: Locker Room Entry ───────────────────────────────────────
function LockerRoomEntry() {
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      {/* Preview thumbnail */}
      <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src="/images/virat-hero.png"
          alt="Locker Room Preview"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.3) saturate(0.5)' }}
        />
        {/* Overlay icons preview */}
        <div className="absolute inset-0 flex items-center justify-center gap-4">
          {[
            { label: 'Products', color: '#C0C0C0' },
            { label: 'Stats',    color: '#E8E8E8' },
            { label: 'Journey',  color: '#C0C0C0' },
          ].map((item) => (
            <div key={item.label}
              className="flex flex-col items-center gap-1.5"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(30,30,30,0.8)', border: '1px solid rgba(192,192,192,0.3)' }}>
                <svg viewBox="0 0 20 20" fill="none" stroke={item.color} strokeWidth="1.5" className="w-5 h-5">
                  <rect x="2" y="3" width="16" height="14" rx="2"/>
                  <path d="M6 3v14M2 8h4"/>
                </svg>
              </div>
              <span className="font-mono text-[9px] text-white/70" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        {/* macOS menubar */}
        <div className="absolute top-0 left-0 right-0 px-3 py-1.5 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: '#FF5F57' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#FEBC2E' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: '#28C840' }} />
          <span className="font-mono text-[9px] text-white/40 ml-2">Virat's Locker Room</span>
        </div>
      </div>

      <div>
        <h4 className="font-display text-2xl text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          VIRAT'S LOCKER ROOM
        </h4>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm">
          An interactive macOS-style desktop experience. Click icons to explore products, stats, and the journey. Drag windows. Feel the world of ONE8.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full text-left">
        {[
          '8 interactive desktop icons',
          'Draggable macOS-style windows',
          'Real ONE8 product details',
          'Career stats, journey timeline',
        ].map((f) => (
          <div key={f} className="flex items-center gap-3 font-mono text-[11px] text-white/50">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0">
              <circle cx="6" cy="6" r="5" stroke="#C0C0C0" strokeWidth="1"/>
              <path d="M3.5 6l2 2 3-3" stroke="#C0C0C0" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {f}
          </div>
        ))}
      </div>

      <a
        href="/locker-room"
        className="btn-primary w-full py-4 text-sm rounded-sm text-center inline-flex items-center justify-center gap-3 group"
      >
        <span>Enter the Locker Room</span>
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
          <path d="M4 10h12M11 5l5 5-5 5"/>
        </svg>
      </a>
    </div>
  )
}

// ── Tab 2: Shoe Quiz ───────────────────────────────────────────────
function ShoeQuiz() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [done, setDone]       = useState(false)

  const pick = (i: number) => {
    const next = [...answers, i]
    if (step < QUIZ.length - 1) {
      setAnswers(next)
      setStep(s => s + 1)
    } else {
      setAnswers(next)
      setDone(true)
    }
  }

  const result = RESULTS[answers.reduce((a, b) => a + b, 0) % RESULTS.length]

  const reset = () => { setStep(0); setAnswers([]); setDone(false) }

  if (done) return (
    <div className="flex flex-col items-center gap-5 text-center py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">Your Match</div>
      <div className="font-display text-3xl text-white" style={{ fontFamily: 'var(--font-display)' }}>
        {result.title}
      </div>
      <div className="glass-card px-5 py-3 rounded-xl">
        <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-1">Recommended Shoe</div>
        <div className="font-display text-xl" style={{ color: '#C0C0C0', fontFamily: 'var(--font-display)' }}>{result.shoe}</div>
      </div>
      <p className="text-white/50 text-sm leading-relaxed max-w-xs">{result.desc}</p>
      <div className="flex gap-3">
        <a href={result.link} target="_blank" rel="noopener noreferrer"
          className="btn-primary px-6 py-3 text-sm rounded-sm">
          View Shoe
        </a>
        <button onClick={reset} className="btn-secondary px-6 py-3 text-sm rounded-sm">
          Retake
        </button>
      </div>
    </div>
  )

  const q = QUIZ[step]
  return (
    <div className="flex flex-col gap-5">
      {/* Progress */}
      <div className="flex gap-1.5">
        {QUIZ.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full transition-all duration-300"
            style={{ background: i <= step ? '#C0C0C0' : 'rgba(255,255,255,0.1)' }} />
        ))}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/30">
        Question {step + 1} of {QUIZ.length}
      </div>
      <h4 className="text-white text-lg font-medium">{q.q}</h4>
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className="p-4 rounded-lg border border-white/8 text-left transition-all duration-200 group hover:border-white/30"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="text-xl mb-2">{opt.icon}</div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/60 group-hover:text-white transition-colors leading-tight">
              {opt.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Tab 3: Wallpaper Generator ─────────────────────────────────────
const QUOTES = [
  "Greatness isn't given. It's earned.",
  'Be the king of your own court.',
  'Every step is a statement.',
  'Champions don\'t sleep. They grind.',
  'The crown is heavy. Wear it.',
]

function WallpaperGen() {
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [generated, setGenerated] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!generated) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const W = canvas.width = 800, H = canvas.height = 450

    ctx.fillStyle = '#0A0A0A'
    ctx.fillRect(0, 0, W, H)

    const grad = ctx.createRadialGradient(W / 2, H, 50, W / 2, H / 2, H)
    grad.addColorStop(0, 'rgba(192,192,192,0.1)')
    grad.addColorStop(1, 'transparent')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)

    // Grid
    ctx.strokeStyle = 'rgba(192,192,192,0.04)'
    ctx.lineWidth = 1
    for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
    for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

    // ONE8 watermark
    ctx.font = 'bold 150px serif'
    ctx.fillStyle = 'rgba(192,192,192,0.04)'
    ctx.textAlign = 'center'
    ctx.fillText('ONE8', W / 2, H / 2 + 60)

    // Quote
    ctx.fillStyle = '#F5F5F0'
    ctx.font = 'bold 30px serif'
    ctx.textAlign = 'center'
    const words = QUOTES[quoteIdx].split(' ')
    let line = '', y = H / 2 - 30
    for (const w of words) {
      const test = line + w + ' '
      if (ctx.measureText(test).width > W * 0.7 && line) {
        ctx.fillText(line.trim(), W / 2, y); line = w + ' '; y += 44
      } else line = test
    }
    ctx.fillText(line.trim(), W / 2, y)

    // Silver line
    const lg = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0)
    lg.addColorStop(0, 'transparent'); lg.addColorStop(0.5, '#C0C0C0'); lg.addColorStop(1, 'transparent')
    ctx.strokeStyle = lg; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(W * 0.2, y + 22); ctx.lineTo(W * 0.8, y + 22); ctx.stroke()

    // Label
    ctx.fillStyle = 'rgba(192,192,192,0.4)'
    ctx.font = '11px monospace'; ctx.textAlign = 'center'
    ctx.fillText('ONE8 - THE KING EDITION  |  FAN CONCEPT', W / 2, H - 18)
  }, [generated, quoteIdx])

  const download = () => {
    const canvas = canvasRef.current!
    const a = document.createElement('a')
    a.download = `one8-king-wallpaper.png`
    a.href = canvas.toDataURL('image/png')
    a.click()
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {QUOTES.map((q, i) => (
          <button key={i} onClick={() => { setQuoteIdx(i); setGenerated(false) }}
            className="text-left p-3 rounded-lg border text-sm transition-all duration-200"
            style={{
              borderColor: quoteIdx === i ? '#C0C0C0' : 'rgba(255,255,255,0.07)',
              color: quoteIdx === i ? '#C0C0C0' : 'rgba(255,255,255,0.45)',
              background: quoteIdx === i ? 'rgba(192,192,192,0.06)' : 'transparent',
            }}>
            "{q}"
          </button>
        ))}
      </div>

      {generated
        ? (
          <div>
            <canvas ref={canvasRef} className="w-full rounded-lg" style={{ aspectRatio: '16/9' }} />
            <button onClick={download} className="btn-primary w-full py-3.5 text-sm rounded-sm mt-3">
              Download Wallpaper
            </button>
          </div>
        )
        : (
          <button onClick={() => setGenerated(true)} className="btn-primary w-full py-3.5 text-sm rounded-sm">
            Generate Wallpaper
          </button>
        )}
    </div>
  )
}

// ── Main section ───────────────────────────────────────────────────
const TABS = [
  {
    id: 'locker-room',
    label: 'Locker Room',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="3" width="16" height="14" rx="2"/>
        <path d="M7 3v14M2 8h5M2 12h5"/>
      </svg>
    ),
    sub: 'Interactive desktop experience',
  },
  {
    id: 'quiz',
    label: 'Find Your Shoe',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 5v4m0 3v.5" />
      </svg>
    ),
    sub: '3-question quiz',
  },
  {
    id: 'wallpaper',
    label: 'Wallpaper Studio',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="3" width="16" height="12" rx="2" /><path d="M8 19h4M10 15v4" />
      </svg>
    ),
    sub: 'Generate & download',
  },
]

export default function FanExperience() {
  const [activeTab, setActiveTab] = useState('locker-room')

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
          <span className="font-mono text-xs tracking-[0.5em] uppercase block mb-4" style={{ color: '#C0C0C0' }}>
            Interactive Zone
          </span>
          <h2 className="font-display text-[3.5rem] md:text-[5.5rem] text-white leading-none"
            style={{ fontFamily: 'var(--font-display)' }}>
            KING'S{' '}
            <span style={{
              background: 'linear-gradient(90deg, #C0C0C0, #E8E8E8, #C0C0C0)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}>
              LAB
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-lg mx-auto">
            Design your colorway, find your perfect shoe, or create a wallpaper worthy of the king.
          </p>
        </motion.div>

        {/* Tab selector */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 text-left"
              style={{
                borderColor: activeTab === tab.id ? '#C0C0C0' : 'rgba(255,255,255,0.08)',
                background: activeTab === tab.id ? 'rgba(192,192,192,0.08)' : 'rgba(255,255,255,0.02)',
                color: activeTab === tab.id ? '#C0C0C0' : 'rgba(255,255,255,0.4)',
              }}
            >
              {tab.icon}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider font-medium leading-tight">
                  {tab.label}
                </div>
                <div className="font-mono text-[9px] text-white/30 mt-0.5">{tab.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="glass-card p-6 md:p-8 max-w-2xl mx-auto"
        >
          {activeTab === 'locker-room' && <LockerRoomEntry />}
          {activeTab === 'quiz'       && <ShoeQuiz />}
          {activeTab === 'wallpaper'  && <WallpaperGen />}
        </motion.div>
      </div>
    </section>
  )
}
