'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ── SVG Icons (no emojis) ──────────────────────────────────────── */
const SvgSword    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M3 17L10 3l7 14M6 11h8"/></svg>
const SvgBrain    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M10 3a4 4 0 014 4c0 1-.3 2-.8 2.7A4 4 0 1110 17a4 4 0 01-3.2-6.3A4 4 0 0110 3z"/></svg>
const SvgCrown    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M3 14l3-7 4 4 4-4 3 7H3z"/><line x1="3" y1="17" x2="17" y2="17"/></svg>
const SvgShield   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M10 2l7 3v5c0 4-3 7-7 8C7 17 3 14 3 10V5l7-3z"/></svg>
const SvgSun      = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><circle cx="10" cy="10" r="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="10" y1="16" x2="10" y2="18"/><line x1="2" y1="10" x2="4" y2="10"/><line x1="16" y1="10" x2="18" y2="10"/></svg>
const SvgTarget   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><circle cx="10" cy="10" r="8"/><circle cx="10" cy="10" r="4"/><circle cx="10" cy="10" r="1" fill="currentColor"/></svg>
const SvgBolt     = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z"/></svg>
const SvgWave     = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M2 10c2-4 4 4 6 0s4-4 6 0"/></svg>
const SvgBat      = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><rect x="8" y="2" width="4" height="12" rx="2" transform="rotate(15 10 8)"/><circle cx="6" cy="15" r="3"/></svg>
const SvgFlame    = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M10 2c0 4-5 6-5 10a5 5 0 0010 0c0-4-3-5-4-8-1 2-1 5-1 5z"/></svg>
const SvgTrophy   = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M6 2h8v7a4 4 0 01-8 0V2z"/><path d="M6 6H3a2 2 0 002 2h1M14 6h3a2 2 0 01-2 2h-1"/><path d="M10 13v4M7 17h6"/></svg>
const SvgStar     = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5"><path d="M10 2l2.4 5 5.6.8-4 4 1 5.5L10 14.5 5 17.3l1-5.5-4-4 5.6-.8z"/></svg>

/* ── Colorways ──────────────────────────────────────────────────── */
const COLORWAYS = [
  { name:'King Black',    upper:'#111111', midsole:'#C0C0C0', sole:'#0A0A0A', laces:'#E8E8E8' },
  { name:'Championship',  upper:'#1a1240', midsole:'#E8E8E8', sole:'#111111', laces:'#ffffff' },
  { name:'Steel Edge',    upper:'#2a2a2a', midsole:'#9CA3AF', sole:'#1a1a1a', laces:'#E8E8E8' },
  { name:'Arctic White',  upper:'#F0EBE0', midsole:'#C0C0C0', sole:'#1a1a1a', laces:'#111111' },
  { name:'Phantom',       upper:'#1A1A2E', midsole:'#7C3AED', sole:'#0A0A0A', laces:'#C0C0C0' },
  { name:'Seam Edition',  upper:'#C0C0C0', midsole:'#111111', sole:'#C0C0C0', laces:'#0A0A0A' },
]

/* ── Quiz ───────────────────────────────────────────────────────── */
const QUIZ = [
  { q: 'Pick your playing style:', options: [
    { label:'Aggressive Attacker',    Icon:SvgSword  },
    { label:'Calculated Strategist',  Icon:SvgBrain  },
    { label:'All-round Dominator',    Icon:SvgCrown  },
    { label:'Gritty Defender',        Icon:SvgShield },
  ]},
  { q: 'Your training philosophy:', options: [
    { label:'4 AM sessions',          Icon:SvgSun    },
    { label:'Quality over quantity',  Icon:SvgTarget },
    { label:'Train till you drop',    Icon:SvgBolt   },
    { label:'Smart recovery',         Icon:SvgWave   },
  ]},
  { q: "Virat's greatest knock?", options: [
    { label:'183 vs Pak, 2012 ODI',   Icon:SvgBat    },
    { label:'149 vs Pak, 2012 T20',   Icon:SvgFlame  },
    { label:'254* vs SA, 2019',       Icon:SvgStar   },
    { label:'WTC Final 2023',         Icon:SvgTrophy },
  ]},
]

const RESULTS = [
  { title:'The Cover Drive King', shoe:'Cover Drive 18 Pro', desc:'Precision at the crease is your superpower.', link:'https://one8.com/products/cover-drive-18-pro-men-high-performance' },
  { title:'The Hybrid Warrior',   shoe:'Boom Rush',          desc:'From gym to ground, you dominate everywhere.', link:'https://one8.com/products/boom-rush-women-mint-green-classic-white' },
  { title:'The Street Legend',    shoe:'Seam Pavilion',      desc:'Style is your statement. Ground meets street.', link:'https://one8.com/products/seam-pavilion-mens-black' },
  { title:'The Sonic Leaper',     shoe:'Sonic Leap',         desc:'Explosive and unstoppable. Born for big moments.', link:'https://one8.com/products/sonic-leap-open-air-century-blue' },
]

const QUOTES = [
  "Greatness isn't given. It's earned.",
  'Be the king of your own court.',
  'Every step is a statement.',
  "Champions don't sleep. They grind.",
  'The crown is heavy. Wear it.',
]

/* ── Shoe SVG preview ───────────────────────────────────────────── */
function ShoeSVG({ c }: { c: typeof COLORWAYS[0] }) {
  return (
    <svg viewBox="0 0 320 160" fill="none" className="w-full drop-shadow-2xl">
      <ellipse cx="158" cy="150" rx="128" ry="9" fill="rgba(0,0,0,0.3)"/>
      <ellipse cx="158" cy="140" rx="126" ry="13" fill={c.sole}/>
      <rect x="36" y="118" width="248" height="19" rx="9.5" fill={c.midsole}/>
      <text x="122" y="132" fontFamily="monospace" fontSize="10" fill={c.sole} fontWeight="bold" opacity=".85">ONE8</text>
      <path d="M36 118 Q56 62 110 46 Q160 32 210 40 Q258 48 278 72L278 118Z" fill={c.upper}/>
      <ellipse cx="272" cy="90" rx="25" ry="21" fill={c.upper}/>
      <rect x="38" y="76" width="30" height="40" rx="4" fill={c.midsole} opacity=".55"/>
      <path d="M148 46 Q158 36 168 46L168 112Q158 116 148 112Z" fill={c.upper} opacity=".7"/>
      {[108,128,148,168,188,208].map((x,i)=>(
        <line key={i} x1={x} y1="48" x2={x} y2="113" stroke={c.laces} strokeWidth="2.2" strokeDasharray="5 4" opacity=".88"/>
      ))}
      {[58,70,82,94,106].map((y,i)=>(
        <line key={i} x1="108" y1={y} x2="208" y2={y} stroke={c.laces} strokeWidth="1.3" opacity=".35"/>
      ))}
      <circle cx="72" cy="92" r="11" fill={c.midsole} opacity=".7"/>
      <text x="66" y="97" fontFamily="monospace" fontSize="8" fill={c.sole} fontWeight="bold">V18</text>
    </svg>
  )
}

/* ── Tab: Locker Room Entry ─────────────────────────────────────── */
function LockerRoomEntry() {
  return (
    <div className="flex flex-col items-center gap-5 py-2 text-center">
      {/* Preview */}
      <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio:'16/9' }}>
        <img src="/images/virat-hero.png" alt="Locker Room"
          className="w-full h-full object-cover object-center"
          style={{ filter:'brightness(0.25) saturate(0.5)' }}/>
        {/* macOS bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3 py-2"
          style={{ background:'rgba(0,0,0,0.75)', backdropFilter:'blur(10px)' }}>
          <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#FF5F57' }}/>
          <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#FEBC2E' }}/>
          <div className="w-2.5 h-2.5 rounded-full" style={{ background:'#28C840' }}/>
          <span className="font-mono text-[10px] text-white/40 ml-2">Virat's Locker Room</span>
        </div>
        {/* Floating icons preview */}
        <div className="absolute inset-0 flex items-center justify-center gap-5">
          {['Products','Stats','Journey','Brand'].map((lb,i) => (
            <div key={i} className="flex flex-col items-center gap-1.5" style={{ filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.8))' }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background:'rgba(20,20,22,0.8)', border:'1px solid rgba(192,192,192,0.25)' }}>
                <svg viewBox="0 0 20 20" fill="none" stroke="#C0C0C0" strokeWidth="1.5" className="w-5 h-5">
                  <rect x="2" y="3" width="16" height="14" rx="2"/><path d="M6 3v14M2 8h4"/>
                </svg>
              </div>
              <span className="font-mono text-[9px] text-white/65" style={{ textShadow:'0 1px 4px rgba(0,0,0,0.9)' }}>{lb}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-display text-2xl text-white mb-2" style={{ fontFamily:'var(--font-display)' }}>
          VIRAT'S LOCKER ROOM
        </h4>
        <p className="text-white/45 text-sm leading-relaxed max-w-xs">
          An interactive macOS-style desktop. Click icons, drag windows, explore products, stats and stories.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full text-left">
        {['8 interactive desktop icons','Draggable macOS-style windows','Real ONE8 product details','Career stats, journey, fitness'].map(f=>(
          <div key={f} className="flex items-center gap-3">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 flex-shrink-0">
              <circle cx="6" cy="6" r="5" stroke="#C0C0C0" strokeWidth="1"/>
              <path d="M3.5 6l2 2 3-3" stroke="#C0C0C0" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="font-mono text-[11px] text-white/45">{f}</span>
          </div>
        ))}
      </div>

      <a href="/locker-room"
        className="btn-primary w-full py-4 text-sm rounded-sm text-center inline-flex items-center justify-center gap-3 group">
        <span>Enter the Locker Room</span>
      </a>
    </div>
  )
}

/* ── Tab: Shoe Quiz ─────────────────────────────────────────────── */
function ShoeQuiz() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [done, setDone]       = useState(false)

  const pick = (i: number) => {
    const next = [...answers, i]
    if (step < QUIZ.length - 1) { setAnswers(next); setStep(s => s+1) }
    else { setAnswers(next); setDone(true) }
  }
  const result = RESULTS[answers.reduce((a,b)=>a+b,0) % RESULTS.length]
  const reset  = () => { setStep(0); setAnswers([]); setDone(false) }

  if (done) return (
    <div className="flex flex-col items-center gap-5 text-center py-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/35">Your Perfect Match</div>
      <div className="font-display text-3xl text-white" style={{ fontFamily:'var(--font-display)' }}>{result.title}</div>
      <div className="glass-card px-6 py-4 rounded-xl w-full">
        <div className="font-mono text-[10px] uppercase tracking-wider text-white/30 mb-1">Recommended</div>
        <div className="font-display text-xl" style={{ fontFamily:'var(--font-display)', color:'#C0C0C0' }}>{result.shoe}</div>
      </div>
      <p className="text-white/45 text-sm leading-relaxed max-w-xs">{result.desc}</p>
      <div className="flex gap-3 w-full">
        <a href={result.link} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 py-3 text-xs rounded-sm">View Shoe</a>
        <button onClick={reset} className="btn-secondary flex-1 py-3 text-xs rounded-sm">Retake</button>
      </div>
    </div>
  )

  const q = QUIZ[step]
  return (
    <div className="flex flex-col gap-5">
      {/* progress */}
      <div className="flex gap-1.5">
        {QUIZ.map((_,i)=>(
          <div key={i} className="flex-1 h-0.5 rounded-full transition-all duration-400"
            style={{ background: i<=step ? '#C0C0C0' : 'rgba(255,255,255,0.1)' }}/>
        ))}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/30">
        Question {step+1} of {QUIZ.length}
      </div>
      <h4 className="text-white text-lg font-medium">{q.q}</h4>
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt,i)=>(
          <button key={i} onClick={()=>pick(i)}
            className="p-4 rounded-xl border text-left transition-all duration-200 group"
            style={{ background:'rgba(255,255,255,0.02)', borderColor:'rgba(255,255,255,0.07)' }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(192,192,192,0.3)';(e.currentTarget as HTMLElement).style.background='rgba(192,192,192,0.05)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.07)';(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.02)'}}>
            <div className="text-white/50 mb-2"><opt.Icon /></div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/55 leading-snug">{opt.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ── Tab: Wallpaper ─────────────────────────────────────────────── */
/* ── Wallpaper templates ────────────────────────────────────────── */
const TEMPLATES = [
  { id: 'minimal', label: 'Minimal',     desc: 'Clean quote, no photo' },
  { id: 'portrait', label: 'Portrait',   desc: 'Virat photo + quote overlay' },
  { id: 'stats',    label: 'Stats',      desc: 'Career numbers showcase' },
]

const ASPECTS = [
  { id: 'mobile',  label: 'Mobile',  w: 1080, h: 1920, ratio: '9/16' },
  { id: 'desktop', label: 'Desktop', w: 1920, h: 1080, ratio: '16/9' },
  { id: 'square',  label: 'Square',  w: 1080, h: 1080, ratio: '1/1' },
]

const WALL_STATS = [
  { label: 'Int Runs',  value: '27,289' },
  { label: 'Centuries', value: '80+' },
  { label: 'ICC Rank',  value: '#1' },
]

function WallpaperGen() {
  const [qi, setQi]           = useState(0)
  const [template, setTemplate] = useState('portrait')
  const [aspect, setAspect]   = useState('mobile')
  const [gen, setGen]         = useState(false)
  const [rendering, setRendering] = useState(false)
  const cvs = useRef<HTMLCanvasElement>(null)
  const photoImg = useRef<HTMLImageElement | null>(null)

  // Preload photo once
  useEffect(() => {
    const img = new Image()
    img.src = '/images/locker-virat.jpeg'
    img.onload = () => { photoImg.current = img }
  }, [])

  const draw = useCallback(() => {
    const canvas = cvs.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const a = ASPECTS.find(x => x.id === aspect)!
    const W = canvas.width = a.w
    const H = canvas.height = a.h

    // Base
    ctx.fillStyle = '#060608'
    ctx.fillRect(0, 0, W, H)

    /* ── PORTRAIT template: photo + quote ── */
    if (template === 'portrait' && photoImg.current) {
      const img = photoImg.current
      const imgRatio = img.width / img.height
      const canvasRatio = W / H
      let dw, dh, dx, dy
      if (imgRatio > canvasRatio) {
        dh = H; dw = H * imgRatio; dx = (W - dw) / 2; dy = 0
      } else {
        dw = W; dh = W / imgRatio; dx = 0; dy = (H - dh) * 0.15
      }
      ctx.drawImage(img, dx, dy, dw, dh)

      // Dark gradient overlay - bottom heavy for text legibility
      const grad = ctx.createLinearGradient(0, 0, 0, H)
      grad.addColorStop(0, 'rgba(6,6,8,0.55)')
      grad.addColorStop(0.45, 'rgba(6,6,8,0.25)')
      grad.addColorStop(0.7, 'rgba(6,6,8,0.75)')
      grad.addColorStop(1, 'rgba(6,6,8,0.95)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, W, H)

      // Side vignette
      const sideGrad = ctx.createLinearGradient(0, 0, W, 0)
      sideGrad.addColorStop(0, 'rgba(6,6,8,0.4)')
      sideGrad.addColorStop(0.15, 'transparent')
      sideGrad.addColorStop(0.85, 'transparent')
      sideGrad.addColorStop(1, 'rgba(6,6,8,0.4)')
      ctx.fillStyle = sideGrad
      ctx.fillRect(0, 0, W, H)
    }

    /* ── STATS template: career numbers ── */
    if (template === 'stats') {
      const g = ctx.createRadialGradient(W / 2, H * 0.4, 40, W / 2, H / 2, H * 0.7)
      g.addColorStop(0, 'rgba(192,192,192,0.1)')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, W, H)

      // Grid lines
      ctx.strokeStyle = 'rgba(192,192,192,0.04)'
      ctx.lineWidth = Math.max(1, W / 800)
      const step = W / 14
      for (let x = 0; x < W; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }

      // Stats stacked
      const fontScale = W / 1080
      let sy = H * 0.32
      WALL_STATS.forEach((s) => {
        ctx.font = `bold ${100 * fontScale}px Georgia, serif`
        ctx.fillStyle = '#C0C0C0'
        ctx.textAlign = 'center'
        ctx.fillText(s.value, W / 2, sy)
        ctx.font = `${20 * fontScale}px monospace`
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.fillText(s.label.toUpperCase(), W / 2, sy + 32 * fontScale)
        sy += 170 * fontScale
      })
    }

    /* ── MINIMAL / shared: grid + ONE8 watermark (skip heavy grid if portrait, photo already busy) ── */
    if (template !== 'portrait') {
      ctx.strokeStyle = 'rgba(192,192,192,0.03)'
      ctx.lineWidth = 1
      const gridStep = W / 14
      for (let x = 0; x < W; x += gridStep) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += gridStep) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
    }

    const fontScale = W / 1080
    if (template === 'minimal') {
      ctx.font = `bold ${180 * fontScale}px Georgia, serif`
      ctx.fillStyle = 'rgba(192,192,192,0.05)'
      ctx.textAlign = 'center'
      ctx.fillText('ONE8', W / 2, H / 2 + 65 * fontScale)
    }

    /* ── Quote (minimal + portrait templates) ── */
    if (template === 'minimal' || template === 'portrait') {
      const quoteY = template === 'portrait' ? H * 0.78 : H / 2 - 20 * fontScale
      ctx.fillStyle = '#F5F5F0'
      ctx.font = `bold ${36 * fontScale}px Georgia, serif`
      ctx.textAlign = 'center'
      const words = QUOTES[qi].split(' ')
      const maxW = W * 0.78
      let line = '', y = quoteY
      const lineH = 52 * fontScale
      const lines: string[] = []
      for (const w of words) {
        const test = line + w + ' '
        if (ctx.measureText(test).width > maxW && line) { lines.push(line.trim()); line = w + ' ' } else line = test
      }
      lines.push(line.trim())
      // vertically center the block around quoteY for portrait, or use as top anchor for minimal
      const startY = template === 'portrait' ? quoteY - (lines.length - 1) * lineH * 0.5 : quoteY
      lines.forEach((l, i) => ctx.fillText(l, W / 2, startY + i * lineH))
      y = startY + (lines.length - 1) * lineH

      // Divider line
      const lg = ctx.createLinearGradient(W * 0.25, 0, W * 0.75, 0)
      lg.addColorStop(0, 'transparent'); lg.addColorStop(0.5, '#C0C0C0'); lg.addColorStop(1, 'transparent')
      ctx.strokeStyle = lg
      ctx.lineWidth = 1.5 * fontScale
      ctx.beginPath()
      ctx.moveTo(W * 0.25, y + 30 * fontScale)
      ctx.lineTo(W * 0.75, y + 30 * fontScale)
      ctx.stroke()
    }

    // Footer label - always present
    ctx.fillStyle = 'rgba(192,192,192,0.4)'
    ctx.font = `${15 * fontScale}px monospace`
    ctx.textAlign = 'center'
    ctx.fillText('ONE8  -  THE KING EDITION  |  FAN CONCEPT', W / 2, H - 28 * fontScale)
  }, [template, aspect, qi])

  useEffect(() => {
    if (!gen) return
    setRendering(true)
    // Slight delay so loading state is visible (canvas draw is sync/fast otherwise)
    const t = setTimeout(() => { draw(); setRendering(false) }, 180)
    return () => clearTimeout(t)
  }, [gen, draw])

  const download = () => {
    const a = document.createElement('a')
    a.download = `one8-wallpaper-${template}-${aspect}.png`
    a.href = cvs.current!.toDataURL('image/png')
    a.click()
  }

  const activeAspect = ASPECTS.find(x => x.id === aspect)!

  return (
    <div className="flex flex-col gap-5">

      {/* Template picker */}
      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-2">Style</span>
        <div className="grid grid-cols-3 gap-2">
          {TEMPLATES.map(t => (
            <button key={t.id} onClick={() => { setTemplate(t.id); setGen(false) }}
              className="px-2 py-3 rounded-xl border text-center transition-all duration-200"
              style={{
                borderColor: template === t.id ? '#C0C0C0' : 'rgba(255,255,255,0.07)',
                background:  template === t.id ? 'rgba(192,192,192,0.07)' : 'transparent',
              }}>
              <div className="font-mono text-[10px] uppercase tracking-wider"
                style={{ color: template === t.id ? '#C0C0C0' : 'rgba(255,255,255,0.5)' }}>{t.label}</div>
              <div className="font-mono text-[8px] text-white/25 mt-0.5 leading-tight">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Aspect ratio picker */}
      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-2">Size</span>
        <div className="flex gap-2">
          {ASPECTS.map(a => (
            <button key={a.id} onClick={() => { setAspect(a.id); setGen(false) }}
              className="flex-1 px-3 py-2 rounded-lg border font-mono text-[10px] uppercase tracking-wider transition-all duration-200"
              style={{
                borderColor: aspect === a.id ? '#C0C0C0' : 'rgba(255,255,255,0.07)',
                color:       aspect === a.id ? '#C0C0C0' : 'rgba(255,255,255,0.45)',
                background:  aspect === a.id ? 'rgba(192,192,192,0.07)' : 'transparent',
              }}>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quote picker - only relevant for minimal/portrait */}
      {template !== 'stats' && (
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/30 block mb-2">Quote</span>
          <div className="flex flex-col gap-2">
            {QUOTES.map((q, i) => (
              <button key={i} onClick={() => { setQi(i); setGen(false) }}
                className="text-left px-4 py-2.5 rounded-xl border text-sm transition-all duration-200"
                style={{ borderColor: qi === i ? '#C0C0C0' : 'rgba(255,255,255,0.07)', color: qi === i ? '#C0C0C0' : 'rgba(255,255,255,0.42)', background: qi === i ? 'rgba(192,192,192,0.06)' : 'transparent' }}>
                "{q}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview / generate */}
      {gen ? (
        <div>
          <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: activeAspect.ratio, maxHeight: 360, margin: '0 auto', background: '#0a0a0a' }}>
            {rendering && (
              <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: '#0a0a0a' }}>
                <div className="w-6 h-6 rounded-full border-2 border-white/10 animate-spin" style={{ borderTopColor: '#C0C0C0' }} />
              </div>
            )}
            <canvas ref={cvs} className="w-full h-full object-contain" />
          </div>
          <div className="flex gap-3 mt-3">
            <button onClick={() => setGen(false)} className="btn-secondary flex-1 py-3 text-xs rounded-sm">Edit</button>
            <button onClick={download} className="btn-primary flex-1 py-3 text-xs rounded-sm">Download</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setGen(true)} className="btn-primary w-full py-3.5 text-sm rounded-sm">
          Generate Wallpaper
        </button>
      )}
    </div>
  )
}

/* ── Tabs config ────────────────────────────────────────────────── */
const TABS = [
  { id:'locker-room', label:'Locker Room',     sub:'Interactive desktop',
    Icon:()=><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4"><rect x="2" y="3" width="16" height="14" rx="2"/><path d="M7 3v14M2 8h5M2 12h5"/></svg> },
  { id:'quiz',        label:'Find Your Shoe',  sub:'3-question quiz',
    Icon:()=><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4"><circle cx="10" cy="10" r="8"/><path d="M10 7v4M10 13v.5"/></svg> },
  { id:'wallpaper',   label:'Wallpaper Studio', sub:'Generate and download',
    Icon:()=><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-4 h-4"><rect x="2" y="3" width="16" height="11" rx="2"/><path d="M8 18h4M10 14v4"/></svg> },
]

/* ── Main section ───────────────────────────────────────────────── */
export default function FanExperience() {
  const [tab, setTab] = useState('locker-room')

  return (
    <section id="fan-experience" className="section-padding overflow-hidden" style={{ background:'#0D0D0F' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="text-center mb-14">
          <span className="font-mono text-xs tracking-[0.5em] uppercase block mb-4" style={{ color:'#C0C0C0' }}>
            Interactive Zone
          </span>
          <h2 className="font-display leading-none text-white" style={{ fontFamily:'var(--font-display)', fontSize:'clamp(3rem,8vw,5.5rem)' }}>
            KING'S{' '}
            <span style={{ background:'linear-gradient(90deg,#C0C0C0,#E8E8E8,#C0C0C0)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 3s linear infinite' }}>
              LAB
            </span>
          </h2>
          <p className="text-white/38 text-sm mt-4 max-w-md mx-auto">
            Enter the Locker Room, find your perfect shoe, or create a wallpaper worthy of the king.
          </p>
        </motion.div>

        {/* Tab selector */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-300 text-left"
              style={{
                borderColor: tab===t.id ? '#C0C0C0'                 : 'rgba(255,255,255,0.07)',
                background:  tab===t.id ? 'rgba(192,192,192,0.07)'  : 'rgba(255,255,255,0.02)',
                color:       tab===t.id ? '#C0C0C0'                 : 'rgba(255,255,255,0.38)',
              }}>
              <t.Icon />
              <div>
                <div className="font-mono text-[11px] uppercase tracking-wider font-medium leading-tight">{t.label}</div>
                <div className="font-mono text-[9px] text-white/28 mt-0.5">{t.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div key={tab} initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.3 }}
          className="glass-card p-6 md:p-8 max-w-2xl mx-auto">
          {tab==='locker-room' && <LockerRoomEntry />}
          {tab==='quiz'        && <ShoeQuiz />}
          {tab==='wallpaper'   && <WallpaperGen />}
        </motion.div>
      </div>
    </section>
  )
}
