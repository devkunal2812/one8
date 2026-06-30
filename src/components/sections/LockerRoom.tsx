'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Types ─────────────────────────────────────────────────────── */
interface WinData {
  id: string; title: string; subtitle: string; type: string; body: string
  link?: string; linkLabel?: string
  stats?: { label: string; value: string }[]
}
interface OpenWin { data: WinData; x: number; y: number; z: number }

/* ── SVG Icons ──────────────────────────────────────────────────── */
const ShoeSVG  = () => <svg viewBox="0 0 48 28" fill="none" className="w-8 h-5"><path d="M5 22 Q8 9 16 7 Q25 4 34 7 Q42 10 44 16L44 22Z" fill="#C0C0C0" opacity=".9"/><ellipse cx="43" cy="18" rx="4" ry="3.5" fill="#C0C0C0"/><rect x="4" y="21" width="41" height="5" rx="2.5" fill="#666"/><line x1="18" y1="7" x2="18" y2="21" stroke="white" strokeWidth="1.2" strokeDasharray="2 2" opacity=".6"/><line x1="24" y1="6" x2="24" y2="21" stroke="white" strokeWidth="1.2" strokeDasharray="2 2" opacity=".6"/><line x1="30" y1="7" x2="30" y2="21" stroke="white" strokeWidth="1.2" strokeDasharray="2 2" opacity=".6"/><text x="7" y="19" fontSize="5" fontFamily="monospace" fill="#C0C0C0" opacity=".8">ONE8</text></svg>
const StatsSVG = () => <svg viewBox="0 0 40 36" fill="none" className="w-7 h-7"><rect x="3" y="22" width="7" height="11" rx="1.5" fill="#C0C0C0" opacity=".65"/><rect x="16" y="14" width="7" height="19" rx="1.5" fill="#C0C0C0"/><rect x="29" y="6" width="7" height="27" rx="1.5" fill="#C0C0C0" opacity=".8"/><line x1="2" y1="33" x2="38" y2="33" stroke="#666" strokeWidth="1.5"/></svg>
const JourneySVG = () => <svg viewBox="0 0 40 36" fill="none" className="w-7 h-7"><circle cx="6" cy="30" r="3.5" fill="#C0C0C0" opacity=".55"/><circle cx="20" cy="18" r="3.5" fill="#C0C0C0" opacity=".8"/><circle cx="34" cy="6" r="3.5" fill="#C0C0C0"/><path d="M6 30Q13 24 20 18Q27 12 34 6" stroke="#C0C0C0" strokeWidth="1.5" strokeDasharray="3 2" opacity=".4"/></svg>
const CrownSVG = () => <svg viewBox="0 0 40 36" fill="none" className="w-7 h-7"><path d="M5 26L5 12L13 20L20 4L27 20L35 12L35 26Z" fill="#C0C0C0" opacity=".88"/><rect x="5" y="26" width="30" height="5" rx="1.5" fill="#666"/><circle cx="20" cy="4" r="2.2" fill="white" opacity=".8"/><circle cx="5" cy="12" r="2.2" fill="white" opacity=".8"/><circle cx="35" cy="12" r="2.2" fill="white" opacity=".8"/></svg>
const CricketSVG = () => <svg viewBox="0 0 40 36" fill="none" className="w-7 h-7"><rect x="17" y="2" width="7" height="20" rx="3.5" fill="#C0C0C0" opacity=".85" transform="rotate(18 20 12)"/><circle cx="12" cy="27" r="7" fill="none" stroke="#C0C0C0" strokeWidth="2" opacity=".7"/></svg>
const FitnessSVG = () => <svg viewBox="0 0 44 28" fill="none" className="w-8 h-6"><rect x="1" y="10" width="6" height="8" rx="3" fill="#C0C0C0" opacity=".75"/><rect x="37" y="10" width="6" height="8" rx="3" fill="#C0C0C0" opacity=".75"/><rect x="7" y="6" width="7" height="16" rx="3.5" fill="#C0C0C0"/><rect x="30" y="6" width="7" height="16" rx="3.5" fill="#C0C0C0"/><rect x="14" y="10" width="16" height="8" rx="2" fill="#777"/></svg>
const BrandSVG = () => <svg viewBox="0 0 44 20" fill="none" className="w-10 h-5"><text x="1" y="16" fontFamily="serif" fontSize="15" fontWeight="bold" fill="#C0C0C0" letterSpacing="2">ONE8</text></svg>
const RecordSVG = () => <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7"><circle cx="20" cy="20" r="17" stroke="#C0C0C0" strokeWidth="1.5" opacity=".5"/><circle cx="20" cy="20" r="11" stroke="#C0C0C0" strokeWidth="1.5" opacity=".7"/><circle cx="20" cy="20" r="5" fill="#C0C0C0" opacity=".9"/></svg>

/* ── Icon data ──────────────────────────────────────────────────── */
const ICONS = [
  { id:'cover-drive',   label:'Cover Drive 18', col:0, row:0, Icon:ShoeSVG,
    win:{ id:'cover-drive', title:'Cover Drive 18 Pro', subtitle:'ONE8 Cricket Shoe  -  Rs.13,999', type:'Product > Cricket > High Performance',
      body:'Co-created with Virat Kohli himself. Engineered for the striker who demands precision at the crease.\n\nPWR+LCK heel-lock collar prevents heel slippage at the moment of impact. TPU Boom Shank provides torsional rigidity through the crease. Breathable mono-mesh upper with synthetic overlays for toe protection.',
      link:'https://one8.com/products/cover-drive-18-pro-men-high-performance', linkLabel:'Buy on ONE8.com',
      stats:[{label:'Price',value:'Rs.13,999'},{label:'Tech',value:'PWR+LCK'},{label:'Shank',value:'TPU Boom'},{label:'Upper',value:'Mono Mesh'}]}},
  { id:'seam-pavilion', label:'Seam Pavilion',  col:0, row:1, Icon:ShoeSVG,
    win:{ id:'seam-pavilion', title:'Seam Pavilion', subtitle:'ONE8 Lifestyle Sneaker  -  Rs.6,999', type:'Product > Lifestyle > Laceless Design',
      body:'A modern classic inspired by retro cricket shoes of the 70s and 80s. Laceless silhouette for effortless style.\n\nMade for stylishly stepping in and out of your everyday from the ground to the street. The perfect blend of cricket heritage and modern lifestyle.',
      link:'https://one8.com/products/seam-pavilion-mens-black', linkLabel:'Buy on ONE8.com',
      stats:[{label:'Price',value:'Rs.6,999'},{label:'Style',value:'Laceless'},{label:'Vibe',value:'Retro'},{label:'Fit',value:"Men's"}]}},
  { id:'boom-rush',     label:'Boom Rush',      col:0, row:2, Icon:ShoeSVG,
    win:{ id:'boom-rush', title:'Boom Rush', subtitle:"ONE8 Women's Trainer  -  Rs.9,999", type:"Product > Women's > Hybrid Training",
      body:"Built for the hybrid athlete who never stops. Boom Foam midsole delivers explosive, responsive cushioning for running and gym sessions.\n\nSonic Grip outsole provides advanced multi-directional traction. Mint Green + Classic White colorway.",
      link:'https://one8.com/products/boom-rush-women-mint-green-classic-white', linkLabel:'Buy on ONE8.com',
      stats:[{label:'Price',value:'Rs.9,999'},{label:'Foam',value:'Boom Foam'},{label:'Grip',value:'Sonic Grip'},{label:'Fit',value:"Women's"}]}},
  { id:'career-stats',  label:'Career Stats',   col:3, row:0, Icon:StatsSVG,
    win:{ id:'career-stats', title:'Career Statistics', subtitle:'Virat Kohli  -  All Formats', type:'Data > Statistics > 2024',
      body:'Numbers that define a generation. The most complete batsman of the modern era.\n\nThe only player to average 50+ in Tests, ODIs and T20Is simultaneously. ICC Cricketer of the Decade 2010-2019.',
      stats:[{label:'Int Runs',value:'27,289'},{label:'Centuries',value:'80+'},{label:'ODI Avg',value:'58.18'},{label:'Test Avg',value:'48.96'},{label:'ICC Rank',value:'#1'},{label:'Active',value:'Since 2008'}]}},
  { id:'journey',       label:'The Journey',    col:3, row:1, Icon:JourneySVG,
    win:{ id:'journey', title:'The Journey', subtitle:'From Delhi to the World', type:'Story > Timeline > 2002-Present',
      body:'2002  -  Delhi U-15 debut\n2008  -  Test debut, Jamaica\n2011  -  World Cup winner\n2013  -  ICC No.1 ODI batsman\n2016  -  Test Captain of India\n2018  -  ONE8 launched with PUMA\n2019  -  ICC Cricketer of the Decade\n2023  -  WTC Final winner\n2024  -  T20 World Cup winner',
      stats:[{label:'Debut',value:'2008'},{label:'ONE8',value:'2018'},{label:'WC Wins',value:'2'},{label:'Awards',value:'7+'}]}},
  { id:'fitness',       label:'Fitness',        col:3, row:2, Icon:FitnessSVG,
    win:{ id:'fitness', title:'Fitness Protocol', subtitle:"Virat's Training System", type:'Lifestyle > Fitness',
      body:"Wakes at 5 AM, gym by 6 AM, six days a week. Switched to plant-based diet in 2018. Zero alcohol since 2012. Approx 10% body fat.\n\nHis philosophy: the body is the temple. Treat it accordingly.",
      stats:[{label:'Wake',value:'5:00 AM'},{label:'Body Fat',value:'~10%'},{label:'Diet',value:'Plant-based'},{label:'Sessions',value:'6/week'}]}},
  { id:'one8-brand',    label:'ONE8 Story',     col:2, row:3, Icon:BrandSVG,
    win:{ id:'one8-brand', title:'ONE8', subtitle:"Virat Kohli's Lifestyle Brand", type:'Brand > Lifestyle > Performance',
      body:"ONE8 is Virat Kohli's personal brand co-created with PUMA India in 2018.\n\nThe name: 18 hours of hustle every single day. Spans performance footwear, apparel, fragrances and ONE8 Commune restaurants across India.",
      link:'https://one8.com', linkLabel:'Explore ONE8.com',
      stats:[{label:'Founded',value:'2018'},{label:'Partner',value:'PUMA'},{label:'Ethos',value:'18hr Hustle'},{label:'Verticals',value:'4+'}]}},
  { id:'records',       label:'Records',        col:1, row:3, Icon:RecordSVG,
    win:{ id:'records', title:'Cricket Records', subtitle:'Records that may never be broken', type:'Data > All Time Greats',
      body:'Fastest to 8,000 / 9,000 / 10,000 ODI runs in history.\n\nMost centuries in successful ODI run chases. Most Player of the Match awards in ODI cricket. These are not just records - they are monuments.',
      stats:[{label:'ODI 100s',value:'50'},{label:'Test 100s',value:'30'},{label:'T20I 100s',value:'1'},{label:'To 10K',value:'205 inn'}]}},
]

/* ── Detect touch device ────────────────────────────────────────── */
const isTouchDevice = () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

/* ── Interactive background: dither pattern reveals Virat photo on cursor proximity ── */
function LockerBackground() {
  const photoRef = useRef<HTMLDivElement>(null)
  const mouse    = useRef({ x: 0.5, y: 0.32 })
  const display  = useRef({ x: 0.5, y: 0.32 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      mouse.current = { x: t.clientX / window.innerWidth, y: t.clientY / window.innerHeight }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })

    let raf: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      display.current.x = lerp(display.current.x, mouse.current.x, 0.07)
      display.current.y = lerp(display.current.y, mouse.current.y, 0.07)
      const px = `${display.current.x * 100}%`
      const py = `${display.current.y * 100}%`
      if (photoRef.current) {
        // Soft, wide falloff - no hard edge, photo fades gently into dither
        const mask = `radial-gradient(circle 340px at ${px} ${py}, black 0%, black 18%, rgba(0,0,0,0.5) 50%, transparent 85%)`
        photoRef.current.style.maskImage = mask
        photoRef.current.style.webkitMaskImage = mask
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: '#060608' }} />

      {/* Virat photo layer - sharp, natural color, masked reveal */}
      <div
        ref={photoRef}
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/locker-virat.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 18%',
          opacity: 1,
          filter: 'contrast(1.04) saturate(1.05)',
          maskImage: 'radial-gradient(circle 340px at 50% 32%, black 0%, black 18%, rgba(0,0,0,0.5) 50%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle 340px at 50% 32%, black 0%, black 18%, rgba(0,0,0,0.5) 50%, transparent 85%)',
        }}
      />

      {/* Dither pattern - desaturated overlay, only in non-photo areas via multiply (keeps photo clean) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/locker-dither.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.22,
          filter: 'grayscale(1) brightness(1.3)',
          mixBlendMode: 'lighten',
        }}
      />

      {/* Edge vignette */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 90% 80% at 50% 42%, transparent 38%, #060608 96%)',
      }} />

      {/* Bottom fade for menu bar / icons readability */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, rgba(6,6,8,0.45) 0%, transparent 16%, transparent 72%, rgba(6,6,8,0.8) 100%)',
      }} />
    </div>
  )
}

/* ── macOS Window ───────────────────────────────────────────────── */
function MacWindow({ w, onClose, onFocus, isMobile }: {
  w: OpenWin; onClose: () => void; onFocus: () => void; isMobile: boolean
}) {
  const [pos, setPos] = useState({ x: w.x, y: w.y })
  const drag = useRef({ on: false, ox: 0, oy: 0 })

  /* Desktop drag via pointer events on title bar */
  const onTitlePointerDown = (e: React.PointerEvent) => {
    if (isMobile) return
    drag.current = { on: true, ox: e.clientX - pos.x, oy: e.clientY - pos.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    onFocus(); e.preventDefault()
  }
  const onTitlePointerMove = (e: React.PointerEvent) => {
    if (!drag.current.on) return
    setPos({ x: e.clientX - drag.current.ox, y: e.clientY - drag.current.oy })
  }
  const onTitlePointerUp = () => { drag.current.on = false }

  /* Mobile: full-screen sheet style — fixed bottom */
  if (isMobile) {
    return (
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: w.z, maxHeight: '80vh',
          borderRadius: '20px 20px 0 0',
          overflow: 'hidden',
        }}
        onPointerDown={onFocus}
      >
        {/* Drag handle bar */}
        <div style={{ background: 'rgba(18,18,20,0.99)', paddingTop: 8, paddingBottom: 4 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)', margin: '0 auto' }} />
        </div>
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: 'rgba(18,18,20,0.99)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <button className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: '#FF5F57' }}
            onClick={(e) => { e.stopPropagation(); onClose() }} />
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#FEBC2E' }} />
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#28C840' }} />
          <span className="ml-2 font-mono text-[11px] text-white/45 truncate">{w.data.title}</span>
        </div>
        {/* Body */}
        <WinBody data={w.data} onClose={onClose} />
      </motion.div>
    )
  }

  /* Desktop floating window */
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 16 }}
      transition={{ type: 'spring', stiffness: 340, damping: 30 }}
      style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: w.z, width: 380, maxWidth: 'calc(100vw - 24px)' }}
      onPointerDown={onFocus}
    >
      <div className="flex items-center gap-2 px-3 py-2 rounded-t-xl cursor-grab active:cursor-grabbing"
        style={{ background: 'rgba(28,28,30,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)', userSelect: 'none' }}
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
      >
        <button className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ background: '#FF5F57' }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); onClose() }} />
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#FEBC2E' }} />
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#28C840' }} />
        <span className="ml-2 font-mono text-[11px] text-white/45 truncate pointer-events-none">{w.data.title}</span>
      </div>
      <WinBody data={w.data} onClose={onClose} />
    </motion.div>
  )
}

/* ── Window Body (shared desktop + mobile) ──────────────────────── */
function WinBody({ data, onClose }: { data: WinData; onClose: () => void }) {
  return (
    <div
      style={{
        background: 'rgba(16,16,18,0.97)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderTop: 'none',
        borderRadius: '0 0 14px 14px',
        maxHeight: '60vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerDownCapture={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="font-display text-xl text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>{data.title}</div>
        <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#C0C0C0' }}>{data.subtitle}</div>
      </div>
      {/* Type */}
      <div className="px-5 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <span className="font-mono text-[10px] text-white/28">Type: </span>
        <span className="font-mono text-[10px] text-white/50">{data.type}</span>
      </div>
      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line">{data.body}</p>
      </div>
      {/* Stats */}
      {data.stats && (
        <div className="px-5 pb-4 grid grid-cols-2 gap-2">
          {data.stats.map(s => (
            <div key={s.label} className="rounded-xl px-3 py-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-1">{s.label}</div>
              <div className="font-display text-lg" style={{ fontFamily: 'var(--font-display)', color: '#C0C0C0' }}>{s.value}</div>
            </div>
          ))}
        </div>
      )}
      {/* Link */}
      {data.link && (
        <div className="px-5 pb-5">
          <a href={data.link} target="_blank" rel="noopener noreferrer"
            className="btn-primary w-full py-3 text-xs rounded-xl text-center block">
            {data.linkLabel ?? 'Open Link'}
          </a>
        </div>
      )}
      <div className="h-2" />
    </div>
  )
}

/* ── Desktop Icon ───────────────────────────────────────────────── */
function DesktopIcon({ item, pos, isActive, onPointerDown, onTouchTap }: {
  item: typeof ICONS[0]
  pos: { x: number; y: number }
  isActive: boolean
  onPointerDown: (e: React.PointerEvent) => void
  onTouchTap: () => void
}) {
  return (
    <div
      className="absolute flex flex-col items-center gap-1.5"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%,0)', zIndex: isActive ? 200 : 5, userSelect: 'none', touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onTouchEnd={(e) => { e.preventDefault(); onTouchTap() }}
    >
      <motion.div
        whileHover={{ scale: 1.15, y: -3 }}
        whileTap={{ scale: 0.88 }}
        className="flex items-center justify-center cursor-pointer"
        style={{
          width: 56, height: 56,
          borderRadius: 14,
          background: isActive ? 'rgba(192,192,192,0.14)' : 'rgba(18,18,20,0.78)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${isActive ? 'rgba(192,192,192,0.4)' : 'rgba(192,192,192,0.13)'}`,
          boxShadow: isActive ? '0 0 0 2px rgba(192,192,192,0.2), 0 8px 28px rgba(0,0,0,0.7)' : '0 4px 20px rgba(0,0,0,0.55)',
        }}
      >
        <item.Icon />
      </motion.div>
      <div
        className="font-mono text-center leading-snug px-1.5 py-0.5 rounded"
        style={{
          fontSize: 9, color: 'rgba(255,255,255,0.8)',
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
          textShadow: '0 1px 5px rgba(0,0,0,0.9)', maxWidth: 72,
          wordBreak: 'break-word', textAlign: 'center',
        }}
      >
        {item.label}
      </div>
    </div>
  )
}

/* ── Main ───────────────────────────────────────────────────────── */
export default function LockerRoomClient() {
  const [wins, setWins] = useState<Record<string, OpenWin>>({})
  const zTop = useRef(1000)
  const [mobile, setMobile] = useState(false)
  const [iconPos, setIconPos] = useState<Record<string, { x: number; y: number }>>({})
  const [activeIcon, setActiveIcon] = useState<string | null>(null)
  const iconDrag = useRef<Record<string, { on: boolean; moved: boolean; ox: number; oy: number }>>({})

  /* Compute grid on mount + resize */
  const computeGrid = useCallback(() => {
    const W  = window.innerWidth
    const H  = window.innerHeight - 32
    const isMob = W < 640
    setMobile(isMob)

    if (isMob) {
      /* Mobile: 4 cols × 2 rows grid, compact */
      const cols = 4
      const colW = W / cols
      const rowH = 110
      const positions: Record<string, { x: number; y: number }> = {}
      ICONS.forEach((ic, idx) => {
        const col = idx % cols
        const row = Math.floor(idx / cols)
        positions[ic.id] = { x: col * colW + colW * 0.5, y: 50 + row * rowH }
      })
      setIconPos(positions)
    } else {
      /* Desktop: original 4-col layout */
      const cols = 4
      const colW = W / cols
      const rowH = (H - 80) / 4
      const positions: Record<string, { x: number; y: number }> = {}
      ICONS.forEach(ic => {
        positions[ic.id] = { x: ic.col * colW + colW * 0.5, y: 48 + ic.row * rowH }
      })
      setIconPos(positions)
    }
  }, [])

  useEffect(() => {
    computeGrid()
    window.addEventListener('resize', computeGrid)
    return () => window.removeEventListener('resize', computeGrid)
  }, [computeGrid])

  const getPos = (id: string) => iconPos[id] ?? { x: 80, y: 120 }

  /* Open window */
  const openWin = useCallback((id: string, clickX?: number, clickY?: number) => {
    const icon = ICONS.find(i => i.id === id)!
    zTop.current += 1
    const isMob = window.innerWidth < 640
    let x = 40, y = 60
    if (!isMob && clickX !== undefined && clickY !== undefined) {
      x = Math.min(clickX + 20, window.innerWidth - 400)
      y = Math.max(clickY - 30, 40)
    }
    setWins(prev => ({ ...prev, [id]: { data: icon.win, x, y, z: zTop.current } }))
  }, [])

  /* Pointer events for desktop drag */
  const onIconPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    if (isTouchDevice()) return // touch handled separately
    const p = getPos(id)
    iconDrag.current[id] = { on: true, moved: false, ox: e.clientX - p.x, oy: e.clientY - p.y }
    setActiveIcon(id)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    e.preventDefault()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconPos])

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!activeIcon || !iconDrag.current[activeIcon]?.on) return
      const d = iconDrag.current[activeIcon]
      const p = getPos(activeIcon)
      if (!d.moved && Math.hypot(e.clientX - (p.x + d.ox), e.clientY - (p.y + d.oy)) < 5) return
      d.moved = true
      setIconPos(prev => ({ ...prev, [activeIcon]: { x: e.clientX - d.ox, y: e.clientY - d.oy } }))
    }
    const up = (e: PointerEvent) => {
      if (!activeIcon) return
      const d = iconDrag.current[activeIcon]
      if (!d?.on) return
      d.on = false
      setActiveIcon(null)
      if (!d.moved) openWin(activeIcon, e.clientX, e.clientY)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIcon, openWin])

  const focusWin = useCallback((id: string) => {
    zTop.current += 1
    setWins(prev => prev[id] ? { ...prev, [id]: { ...prev[id], z: zTop.current } } : prev)
  }, [])
  const closeWin = useCallback((id: string) => {
    setWins(prev => { const n = { ...prev }; delete n[id]; return n })
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#060608' }}>

      {/* Background - interactive dither reveal */}
      <LockerBackground />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'linear-gradient(rgba(192,192,192,1) 1px,transparent 1px),linear-gradient(90deg,rgba(192,192,192,1) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
        }} />
      </div>

      {/* macOS menu bar */}
      <div className="absolute top-0 left-0 right-0 z-[800] flex items-center justify-between px-4"
        style={{ height: 32, background: 'rgba(6,6,8,0.9)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="font-display text-sm leading-none" style={{ fontFamily: 'var(--font-display)', color: '#C0C0C0' }}>ONE8</span>
          <span className="font-mono text-[10px] text-white/40 hidden sm:block">Virat's Locker Room</span>
          {!mobile && ['File','View','Window'].map(m => (
            <span key={m} className="font-mono text-[10px] text-white/20 cursor-default select-none">{m}</span>
          ))}
          {mobile && <span className="font-mono text-[10px] text-white/30">Tap to open</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block font-mono text-[10px] text-white/25">
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <a href="/"
            className="font-mono text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-md transition-all"
            style={{ color: '#C0C0C0', border: '1px solid rgba(192,192,192,0.2)', background: 'transparent' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(192,192,192,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            Exit
          </a>
        </div>
      </div>

      {/* Mobile backdrop when window open */}
      {mobile && Object.keys(wins).length > 0 && (
        <div className="fixed inset-0 z-[900]" style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => Object.keys(wins).forEach(closeWin)} />
      )}

      {/* Desktop icons */}
      <div className="absolute inset-0 z-10" style={{ top: 32 }}>
        {Object.keys(iconPos).length > 0 && ICONS.map(item => (
          <DesktopIcon
            key={item.id}
            item={item}
            pos={getPos(item.id)}
            isActive={activeIcon === item.id}
            onPointerDown={(e) => onIconPointerDown(e, item.id)}
            onTouchTap={() => openWin(item.id)}
          />
        ))}
      </div>

      {/* Hint */}
      <div className="absolute z-20 pointer-events-none text-center"
        style={{ bottom: mobile ? 28 : 28, left: 0, right: 0 }}>
        <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/18">
          {mobile ? 'Tap icons to explore' : 'Click to open  -  Drag icons and windows freely'}
        </p>
      </div>

      {/* Open windows */}
      <AnimatePresence>
        {Object.values(wins).map(w => (
          <MacWindow key={w.data.id} w={w} onClose={() => closeWin(w.data.id)}
            onFocus={() => focusWin(w.data.id)} isMobile={mobile} />
        ))}
      </AnimatePresence>

      {/* Disclaimer */}
      <div className="absolute bottom-0 left-0 right-0 z-[850] text-center py-1"
        style={{ background: 'rgba(6,6,8,0.95)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <p className="font-mono text-[9px] text-white/15 tracking-wider">
          Fan-made concept. Not affiliated with Virat Kohli or ONE8.
        </p>
      </div>
    </div>
  )
}
