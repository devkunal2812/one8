'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Window Data ────────────────────────────────────────────────────
interface WinData {
  id:       string
  title:    string
  subtitle: string
  type:     string
  body:     string
  link?:    string
  linkLabel?: string
  stats?:   { label: string; value: string }[]
}

// ── SVG Icons ──────────────────────────────────────────────────────
const ShoeSVG = () => (
  <svg viewBox="0 0 48 28" fill="none" className="w-9 h-6">
    <path d="M5 22 Q8 9 16 7 Q25 4 34 7 Q42 10 44 16 L44 22Z" fill="#C0C0C0" opacity=".9"/>
    <ellipse cx="43" cy="18" rx="4" ry="3.5" fill="#C0C0C0"/>
    <rect x="4" y="21" width="41" height="5" rx="2.5" fill="#777"/>
    <line x1="18" y1="7" x2="18" y2="21" stroke="white" strokeWidth="1.2" strokeDasharray="2 2" opacity=".6"/>
    <line x1="24" y1="6" x2="24" y2="21" stroke="white" strokeWidth="1.2" strokeDasharray="2 2" opacity=".6"/>
    <line x1="30" y1="7" x2="30" y2="21" stroke="white" strokeWidth="1.2" strokeDasharray="2 2" opacity=".6"/>
    <text x="8" y="20" fontSize="5" fontFamily="monospace" fill="#C0C0C0" opacity=".8">ONE8</text>
  </svg>
)
const StatsSVG = () => (
  <svg viewBox="0 0 40 36" fill="none" className="w-8 h-7">
    <rect x="3"  y="22" width="7" height="11" rx="1.5" fill="#C0C0C0" opacity=".7"/>
    <rect x="16" y="14" width="7" height="19" rx="1.5" fill="#C0C0C0"/>
    <rect x="29" y="6"  width="7" height="27" rx="1.5" fill="#C0C0C0" opacity=".85"/>
    <line x1="2" y1="33" x2="38" y2="33" stroke="#666" strokeWidth="1.5"/>
  </svg>
)
const JourneySVG = () => (
  <svg viewBox="0 0 40 36" fill="none" className="w-8 h-7">
    <circle cx="6"  cy="30" r="3.5" fill="#C0C0C0" opacity=".6"/>
    <circle cx="20" cy="18" r="3.5" fill="#C0C0C0" opacity=".85"/>
    <circle cx="34" cy="6"  r="3.5" fill="#C0C0C0"/>
    <path d="M6 30 Q13 24 20 18 Q27 12 34 6" stroke="#C0C0C0" strokeWidth="1.5" strokeDasharray="3 2" opacity=".4"/>
  </svg>
)
const CrownSVG = () => (
  <svg viewBox="0 0 40 36" fill="none" className="w-8 h-7">
    <path d="M5 26 L5 12 L13 20 L20 4 L27 20 L35 12 L35 26Z" fill="#C0C0C0" opacity=".9"/>
    <rect x="5" y="26" width="30" height="5" rx="1.5" fill="#777"/>
    <circle cx="20" cy="4"  r="2.2" fill="white" opacity=".8"/>
    <circle cx="5"  cy="12" r="2.2" fill="white" opacity=".8"/>
    <circle cx="35" cy="12" r="2.2" fill="white" opacity=".8"/>
  </svg>
)
const CricketSVG = () => (
  <svg viewBox="0 0 40 36" fill="none" className="w-8 h-7">
    <rect x="17" y="2" width="7" height="20" rx="3.5" fill="#C0C0C0" opacity=".85" transform="rotate(18 20 12)"/>
    <circle cx="12" cy="27" r="7" fill="none" stroke="#C0C0C0" strokeWidth="2" opacity=".7"/>
    <path d="M15 24 Q18 21 22 24" stroke="white" strokeWidth="1" opacity=".5"/>
  </svg>
)
const FitnessSVG = () => (
  <svg viewBox="0 0 44 28" fill="none" className="w-9 h-6">
    <rect x="1"  y="10" width="6"  height="8" rx="3" fill="#C0C0C0" opacity=".8"/>
    <rect x="37" y="10" width="6"  height="8" rx="3" fill="#C0C0C0" opacity=".8"/>
    <rect x="7"  y="6"  width="7"  height="16" rx="3.5" fill="#C0C0C0"/>
    <rect x="30" y="6"  width="7"  height="16" rx="3.5" fill="#C0C0C0"/>
    <rect x="14" y="10" width="16" height="8" rx="2" fill="#888"/>
  </svg>
)
const FolderSVG = () => (
  <svg viewBox="0 0 40 34" fill="none" className="w-8 h-7">
    <path d="M3 12 Q3 8 7 8 L15 8 L19 12 L37 12 Q37 8 33 8 H7" fill="#C0C0C0" opacity=".4"/>
    <rect x="3" y="12" width="34" height="19" rx="3" fill="#C0C0C0" opacity=".65"/>
  </svg>
)

// ── Desktop Icons config ───────────────────────────────────────────
const DESKTOP_ICONS: {
  id: string; label: string
  defaultX: number; defaultY: number
  Icon: () => JSX.Element
  win: WinData
}[] = [
  {
    id: 'cover-drive', label: 'Cover Drive 18 Pro',
    defaultX: 80, defaultY: 120,
    Icon: ShoeSVG,
    win: {
      id: 'cover-drive', title: 'Cover Drive 18 Pro', subtitle: 'ONE8 Cricket Shoe — ₹13,999',
      type: 'Product > Cricket > High Performance',
      body: "Co-created with Virat Kohli himself. Engineered for the striker who demands precision at the crease.\n\nFeatures PWR+LCK heel-lock collar and a TPU Boom Shank for torsional rigidity. Breathable mono-mesh upper with synthetic overlays for toe protection. The shoe Virat trusts at the crease.",
      link: 'https://one8.com/products/cover-drive-18-pro-men-high-performance', linkLabel: 'Buy on ONE8.com',
      stats: [{ label: 'Price', value: '₹13,999' }, { label: 'Tech', value: 'PWR+LCK' }, { label: 'Shank', value: 'TPU Boom' }, { label: 'Upper', value: 'Mono Mesh' }],
    },
  },
  {
    id: 'seam-pavilion', label: 'Seam Pavilion',
    defaultX: 80, defaultY: 260,
    Icon: ShoeSVG,
    win: {
      id: 'seam-pavilion', title: 'Seam Pavilion', subtitle: 'ONE8 Lifestyle Sneaker — ₹6,999',
      type: 'Product > Lifestyle > Laceless',
      body: "A modern classic inspired by retro cricket shoes of the 70s and 80s. Laceless silhouette for effortless, refined style.\n\nMade for stylishly stepping in and out of your everyday — from the ground to the street. The perfect blend of cricket heritage and modern lifestyle.",
      link: 'https://one8.com/products/seam-pavilion-mens-black', linkLabel: 'Buy on ONE8.com',
      stats: [{ label: 'Price', value: '₹6,999' }, { label: 'Style', value: 'Laceless' }, { label: 'Vibe', value: 'Retro Cricket' }, { label: 'Fit', value: "Men's" }],
    },
  },
  {
    id: 'boom-rush', label: 'Boom Rush Women',
    defaultX: 80, defaultY: 400,
    Icon: ShoeSVG,
    win: {
      id: 'boom-rush', title: 'Boom Rush', subtitle: "ONE8 Women's Trainer — ₹9,999",
      type: "Product > Women's > Hybrid Training",
      body: "Built for the hybrid athlete who never stops. Boom Foam midsole provides explosive, responsive cushioning for running and gym sessions both.\n\nSonic Grip outsole delivers advanced multi-directional traction. Mint Green + Classic White colorway. Dominate everything.",
      link: 'https://one8.com/products/boom-rush-women-mint-green-classic-white', linkLabel: 'Buy on ONE8.com',
      stats: [{ label: 'Price', value: '₹9,999' }, { label: 'Foam', value: 'Boom Foam' }, { label: 'Grip', value: 'Sonic Grip' }, { label: 'Fit', value: "Women's" }],
    },
  },
  {
    id: 'career-stats', label: 'Career Stats.csv',
    defaultX: 1180, defaultY: 120,
    Icon: StatsSVG,
    win: {
      id: 'career-stats', title: 'Career Statistics', subtitle: 'Virat Kohli — All International Formats',
      type: 'Data > Statistics > Updated 2024',
      body: "Numbers that define a generation. The most complete batsman of the modern era — dominant across all three formats simultaneously.\n\nThe only player to average 50+ in Tests, ODIs, and T20Is at the same time. ICC Cricketer of the Decade 2010-2019.",
      stats: [{ label: "Int'l Runs", value: '27,289' }, { label: 'Centuries', value: '80+' }, { label: 'ODI Average', value: '58.18' }, { label: 'Test Average', value: '48.96' }, { label: 'ICC Ranking', value: '#1' }, { label: 'Active Since', value: '2008' }],
    },
  },
  {
    id: 'journey', label: 'The Journey.mov',
    defaultX: 1180, defaultY: 260,
    Icon: JourneySVG,
    win: {
      id: 'journey', title: "The Journey", subtitle: 'From Delhi to the World — 2002 to Present',
      type: 'Story > Timeline > Personal',
      body: "2002 — Plays first match for Delhi U-15\n2008 — Test debut in Kingston, Jamaica\n2011 — ICC Cricket World Cup Winner\n2013 — Becomes ICC No.1 ODI Batsman\n2016 — Appointed Test Captain of India\n2018 — ONE8 brand launched with PUMA\n2019 — ICC Male Cricketer of the Decade\n2023 — ICC World Test Championship winner\n2024 — T20 World Cup Winner. Legacy complete.",
      stats: [{ label: 'Debut Year', value: '2008' }, { label: 'ONE8 Founded', value: '2018' }, { label: 'World Cup Wins', value: '2' }, { label: 'ICC Awards', value: '7+' }],
    },
  },
  {
    id: 'fitness', label: 'Fitness Protocol',
    defaultX: 1180, defaultY: 400,
    Icon: FitnessSVG,
    win: {
      id: 'fitness', title: 'Fitness Protocol', subtitle: "Virat Kohli's Training System",
      type: 'Lifestyle > Fitness > Diet & Training',
      body: "The man who transformed Indian cricket's fitness culture. Wakes at 5 AM, gym by 6 AM, six days a week. No cheat days.\n\nSwitched to a plant-based diet in 2018 after a cervical spine injury. Zero alcohol since 2012. Approximately 10% body fat. His philosophy: the body is the temple — treat it accordingly.",
      stats: [{ label: 'Wake Time', value: '5:00 AM' }, { label: 'Body Fat', value: '~10%' }, { label: 'Diet', value: 'Plant-based' }, { label: 'Sessions/Wk', value: '6 days' }],
    },
  },
  {
    id: 'one8-brand', label: 'ONE8 Brand Story',
    defaultX: 620, defaultY: 500,
    Icon: CrownSVG,
    win: {
      id: 'one8-brand', title: 'ONE8', subtitle: "Virat Kohli's Lifestyle Brand",
      type: 'Brand > Lifestyle > Performance',
      body: "ONE8 is Virat Kohli's personal lifestyle brand — co-created with PUMA India in 2018.\n\nThe name represents 18 hours of hustle every single day — the grind that separates good from great. The brand spans performance footwear, athleisure apparel, fragrances, and ONE8 Commune restaurants across India.",
      link: 'https://one8.com', linkLabel: 'Explore ONE8.com',
      stats: [{ label: 'Founded', value: '2018' }, { label: 'Partner', value: 'PUMA India' }, { label: 'Philosophy', value: '18hr Hustle' }, { label: 'Categories', value: '4+' }],
    },
  },
  {
    id: 'records', label: 'Cricket Records',
    defaultX: 620, defaultY: 120,
    Icon: CricketSVG,
    win: {
      id: 'records', title: 'Cricket Records', subtitle: 'Records that may never be broken',
      type: 'Data > Records > All Time Greats',
      body: "Fastest to 8,000 / 9,000 / 10,000 ODI runs in history.\n\nMost centuries in successful run chases in ODIs. Most Player of the Match awards in ODI cricket. First player to score 20,000+ runs in the shortest time across all formats. These aren't just records — they are monuments to dedication.",
      stats: [{ label: 'ODI 100s', value: '50' }, { label: 'Test 100s', value: '30' }, { label: 'T20I 100s', value: '1' }, { label: 'Fastest to 10K', value: '205 inns' }],
    },
  },
]

// ── macOS Window ───────────────────────────────────────────────────
function MacWindow({
  data, onClose, zIndex, onFocus,
  initX, initY,
}: {
  data: WinData; onClose: () => void
  zIndex: number; onFocus: () => void
  initX: number; initY: number
}) {
  const [pos, setPos]   = useState({ x: initX, y: initY })
  const drag = useRef({ on: false, ox: 0, oy: 0 })
  const bodyRef = useRef<HTMLDivElement>(null)

  const startDrag = (e: React.PointerEvent) => {
    drag.current = { on: true, ox: e.clientX - pos.x, oy: e.clientY - pos.y }
    onFocus()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!drag.current.on) return
      setPos({ x: e.clientX - drag.current.ox, y: e.clientY - drag.current.oy })
    }
    const up = () => { drag.current.on = false }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 20 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{
        position: 'fixed', left: pos.x, top: pos.y,
        zIndex, width: 380, maxWidth: 'calc(100vw - 24px)',
      }}
      className="select-none"
      onMouseDown={onFocus}  // catch any missed clicks
    >
      {/* Title bar — drag handle */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-t-xl cursor-grab active:cursor-grabbing"
        style={{ background: 'rgba(28,28,30,0.98)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        onPointerDown={startDrag}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onClose() }}
          className="w-3 h-3 rounded-full transition-opacity hover:opacity-75 flex-shrink-0"
          style={{ background: '#FF5F57' }} aria-label="Close"
        />
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#FEBC2E' }} />
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#28C840' }} />
        <span className="ml-2 font-mono text-[11px] text-white/50 truncate pointer-events-none">{data.title}</span>
      </div>

      {/* Window body — SCROLLABLE */}
      <div
        ref={bodyRef}
        className="rounded-b-xl"
        style={{
          background: 'rgba(18,18,20,0.97)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderTop: 'none',
          maxHeight: '68vh',
          overflowY: 'scroll',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={(e) => { onFocus(); e.stopPropagation() }}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="font-display text-xl text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            {data.title}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#C0C0C0' }}>
            {data.subtitle}
          </div>
        </div>

        {/* Type */}
        <div className="px-5 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <span className="font-mono text-[10px] text-white/30">Type: </span>
          <span className="font-mono text-[10px] text-white/55">{data.type}</span>
        </div>

        {/* Body text */}
        <div className="px-5 py-4">
          <p className="text-white/65 text-sm leading-relaxed whitespace-pre-line">{data.body}</p>
        </div>

        {/* Stats */}
        {data.stats && (
          <div className="px-5 pb-4 grid grid-cols-2 gap-2">
            {data.stats.map((s) => (
              <div key={s.label} className="rounded-lg px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-0.5">{s.label}</div>
                <div className="font-display text-base" style={{ fontFamily: 'var(--font-display)', color: '#C0C0C0' }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Link */}
        {data.link && (
          <div className="px-5 pb-5">
            <a
              href={data.link} target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full py-3 text-xs rounded-lg text-center block"
            >
              {data.linkLabel || 'Open Link'}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Draggable Desktop Icon ─────────────────────────────────────────
function DesktopIcon({
  item, onOpen,
}: {
  item: typeof DESKTOP_ICONS[0]
  onOpen: (win: WinData, x: number, y: number) => void
}) {
  const ref  = useRef<HTMLDivElement>(null)
  const drag = useRef({ on: false, moved: false, ox: 0, oy: 0 })
  const [pos, setPos] = useState({ x: item.defaultX, y: item.defaultY })

  // Correct right-side icon positions after mount using real window width
  useEffect(() => {
    if (item.defaultX >= 1100) {
      setPos(p => ({ ...p, x: window.innerWidth - 120 }))
    } else if (item.defaultX >= 600 && item.defaultX < 700) {
      setPos(p => ({ ...p, x: window.innerWidth / 2 - 60 }))
    }
  }, [item.defaultX])
  const [active, setActive] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!drag.current.on) return
      drag.current.moved = true
      setPos({ x: e.clientX - drag.current.ox, y: e.clientY - drag.current.oy })
    }
    const up = (e: MouseEvent) => {
      if (!drag.current.on) return
      drag.current.on = false
      setActive(false)
      if (!drag.current.moved) {
        // It was a click — open window near icon
        const rect = ref.current?.getBoundingClientRect()
        const wx = Math.min((rect?.right ?? e.clientX) + 10, window.innerWidth - 400)
        const wy = Math.max((rect?.top  ?? e.clientY) - 40, 40)
        onOpen(item.win, wx, wy)
      }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
  }, [item, onOpen])

  const onPointerDown = (e: React.PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    drag.current = { on: true, moved: false, ox: e.clientX - rect.left, oy: e.clientY - rect.top }
    setActive(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    e.preventDefault()
  }

  return (
    <div
      ref={ref}
      onPointerDown={onPointerDown}
      className="absolute flex flex-col items-center gap-1.5 cursor-pointer select-none"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, 0)', zIndex: active ? 500 : 10 }}
    >
      <motion.div
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.92 }}
        animate={{ scale: active ? 0.95 : 1 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{
          background:     active ? 'rgba(192,192,192,0.15)' : 'rgba(20,20,20,0.72)',
          backdropFilter: 'blur(20px)',
          border:         `1px solid ${active ? 'rgba(192,192,192,0.4)' : 'rgba(192,192,192,0.14)'}`,
          boxShadow:      active
            ? '0 0 0 2px rgba(192,192,192,0.3), 0 8px 32px rgba(0,0,0,0.6)'
            : '0 4px 20px rgba(0,0,0,0.5)',
          transition:     'background 0.15s, border-color 0.15s, box-shadow 0.15s',
        }}
      >
        <item.Icon />
      </motion.div>

      <div
        className="font-mono text-center leading-tight px-2 py-0.5 rounded"
        style={{
          fontSize: '10px',
          color: 'rgba(255,255,255,0.85)',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(10px)',
          textShadow: '0 1px 6px rgba(0,0,0,0.9)',
          maxWidth: 90,
          wordBreak: 'break-word',
          textAlign: 'center',
        }}
      >
        {item.label}
      </div>
    </div>
  )
}

// ── Main Locker Room ───────────────────────────────────────────────
type OpenWin = { data: WinData; x: number; y: number; zIndex: number }

export default function LockerRoomClient() {
  const [wins, setWins] = useState<Record<string, OpenWin>>({})
  const zTop = useRef(1000)

  const openWin = useCallback((data: WinData, x: number, y: number) => {
    zTop.current += 1
    setWins(prev => ({
      ...prev,
      [data.id]: { data, x, y, zIndex: zTop.current },
    }))
  }, [])

  const closeWin = useCallback((id: string) => {
    setWins(prev => { const n = { ...prev }; delete n[id]; return n })
  }, [])

  const focusWin = useCallback((id: string) => {
    zTop.current += 1
    setWins(prev => prev[id] ? { ...prev, [id]: { ...prev[id], zIndex: zTop.current } } : prev)
  }, [])

  // Set correct default X for right-side icons after mount
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ background: '#050505' }}>

      {/* ── Background: dark cricket stadium feel (no photo = cinematic) ── */}
      <div className="absolute inset-0 z-0">
        {/* Deep gradient base */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% 100%, rgba(30,30,30,0.9) 0%, #050505 60%)',
        }} />
        {/* Silver spotlight rays from top */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 40% 60% at 20% 0%, rgba(192,192,192,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 80% 0%, rgba(192,192,192,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 20% 40% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 50%)
          `,
        }} />
        {/* Noise grid overlay */}
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: `linear-gradient(rgba(192,192,192,1) 1px, transparent 1px), linear-gradient(90deg,rgba(192,192,192,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{
          background: 'linear-gradient(0deg, rgba(5,5,5,0.9) 0%, transparent 100%)',
        }} />
      </div>

      {/* ── macOS menu bar ── */}
      <div
        className="absolute top-0 left-0 right-0 z-[900] flex items-center justify-between px-4 py-2"
        style={{
          background:     'rgba(8,8,8,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom:   '1px solid rgba(255,255,255,0.06)',
          height:         32,
        }}
      >
        <div className="flex items-center gap-5">
          <span className="font-display text-sm" style={{ fontFamily: 'var(--font-display)', color: '#C0C0C0' }}>ONE8</span>
          <span className="font-mono text-[11px] text-white/50">Virat's Locker Room</span>
          <span className="hidden sm:block font-mono text-[11px] text-white/25">File</span>
          <span className="hidden sm:block font-mono text-[11px] text-white/25">View</span>
          <span className="hidden sm:block font-mono text-[11px] text-white/25">Window</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block font-mono text-[11px] text-white/30">
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          <a
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest px-3 py-0.5 rounded transition-all"
            style={{ color: '#C0C0C0', border: '1px solid rgba(192,192,192,0.25)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(192,192,192,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            Exit
          </a>
        </div>
      </div>

      {/* ── Desktop Icons ── */}
      {mounted && (
        <div className="absolute inset-0 z-10" style={{ top: 32 }}>
          {DESKTOP_ICONS.map((item) => (
            <DesktopIcon key={item.id} item={item} onOpen={openWin} />
          ))}
        </div>
      )}

      {/* ── Open Windows ── */}
      <AnimatePresence>
        {Object.values(wins).map((w) => (
          <MacWindow
            key={w.data.id}
            data={w.data}
            onClose={() => closeWin(w.data.id)}
            zIndex={w.zIndex}
            onFocus={() => focusWin(w.data.id)}
            initX={w.x}
            initY={w.y}
          />
        ))}
      </AnimatePresence>

      {/* ── Bottom hint ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/20">
          Click to open - Drag to move icons and windows
        </p>
      </div>

      {/* ── Disclaimer bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[900] text-center py-1"
        style={{ background: 'rgba(5,5,5,0.9)', borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <p className="font-mono text-[9px] text-white/15 tracking-wider">
          Fan-made concept. Not affiliated with Virat Kohli or ONE8.
        </p>
      </div>
    </div>
  )
}
