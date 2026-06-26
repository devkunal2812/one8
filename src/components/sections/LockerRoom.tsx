'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Types ──────────────────────────────────────────────────────────
interface DesktopIcon {
  id:       string
  label:    string
  x:        number   // % of viewport width
  y:        number   // % of viewport height
  icon:     React.ReactNode
  window:   WindowData
}

interface WindowData {
  title:    string
  subtitle: string
  type:     string
  body:     string
  link?:    string
  linkLabel?: string
  image?:   string
  stats?:   { label: string; value: string }[]
}

// ── SVG Icons for desktop items ────────────────────────────────────
const Icons = {
  shoe: (
    <svg viewBox="0 0 40 28" fill="none" className="w-8 h-6">
      <path d="M4 20 Q7 8 14 6 Q22 3 30 6 Q37 9 38 14 L38 20 Z" fill="#C0C0C0" opacity="0.9"/>
      <ellipse cx="37" cy="17" rx="3.5" ry="3" fill="#C0C0C0"/>
      <rect x="3" y="19" width="36" height="4" rx="2" fill="#888"/>
      <rect x="3" y="22" width="36" height="3" rx="1.5" fill="#555"/>
      <line x1="16" y1="6" x2="16" y2="19" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.6"/>
      <line x1="21" y1="5" x2="21" y2="19" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.6"/>
      <line x1="26" y1="6" x2="26" y2="19" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.6"/>
    </svg>
  ),
  stats: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="4" y="24" width="7" height="12" rx="1" fill="#C0C0C0" opacity="0.8"/>
      <rect x="16" y="16" width="7" height="20" rx="1" fill="#C0C0C0"/>
      <rect x="28" y="8"  width="7" height="28" rx="1" fill="#C0C0C0" opacity="0.9"/>
      <line x1="4" y1="36" x2="36" y2="36" stroke="#888" strokeWidth="1.5"/>
    </svg>
  ),
  journey: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <circle cx="8"  cy="32" r="3.5" fill="#C0C0C0" opacity="0.7"/>
      <circle cx="20" cy="20" r="3.5" fill="#C0C0C0" opacity="0.85"/>
      <circle cx="32" cy="8"  r="3.5" fill="#C0C0C0"/>
      <path d="M8 32 Q14 26 20 20 Q26 14 32 8" stroke="#C0C0C0" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5"/>
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M6 28 L6 14 L14 22 L20 8 L26 22 L34 14 L34 28 Z" fill="#C0C0C0" opacity="0.9"/>
      <rect x="6" y="28" width="28" height="5" rx="1" fill="#888"/>
      <circle cx="20" cy="8"  r="2" fill="white" opacity="0.8"/>
      <circle cx="6"  cy="14" r="2" fill="white" opacity="0.8"/>
      <circle cx="34" cy="14" r="2" fill="white" opacity="0.8"/>
    </svg>
  ),
  cricket: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="18" y="4" width="6" height="22" rx="3" fill="#C0C0C0" opacity="0.8" transform="rotate(20 21 15)"/>
      <circle cx="12" cy="28" r="8" fill="none" stroke="#C0C0C0" strokeWidth="2" opacity="0.7"/>
      <path d="M16 24 Q20 20 24 24" stroke="white" strokeWidth="1" opacity="0.5"/>
    </svg>
  ),
  fitness: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <rect x="2"  y="17" width="6"  height="6" rx="3" fill="#C0C0C0" opacity="0.8"/>
      <rect x="32" y="17" width="6"  height="6" rx="3" fill="#C0C0C0" opacity="0.8"/>
      <rect x="8"  y="13" width="6"  height="14" rx="3" fill="#C0C0C0"/>
      <rect x="26" y="13" width="6"  height="14" rx="3" fill="#C0C0C0"/>
      <rect x="14" y="16" width="12" height="8"  rx="2" fill="#888"/>
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
      <path d="M4 14 Q4 10 8 10 L16 10 L20 14 L36 14 Q36 10 32 10 H8" fill="#C0C0C0" opacity="0.4"/>
      <rect x="4" y="14" width="32" height="20" rx="3" fill="#C0C0C0" opacity="0.7"/>
    </svg>
  ),
  one8logo: (
    <svg viewBox="0 0 40 20" fill="none" className="w-10 h-5">
      <text x="2" y="16" fontFamily="serif" fontSize="16" fontWeight="bold" fill="#C0C0C0" letterSpacing="2">ONE8</text>
    </svg>
  ),
}

// ── Desktop Icons Data ─────────────────────────────────────────────
const ICONS: DesktopIcon[] = [
  {
    id: 'cover-drive',
    label: 'Cover Drive 18 Pro',
    x: 8, y: 18,
    icon: Icons.shoe,
    window: {
      title:    'Cover Drive 18 Pro',
      subtitle: 'ONE8 Cricket Shoe',
      type:     'Product > Cricket > High Performance',
      body:     'Co-created with Virat Kohli himself. Engineered for the striker who demands precision at the crease. Features PWR+LCK heel-lock collar and a TPU shank for torsional rigidity. The shoe Virat trusts.',
      link:     'https://one8.com/products/cover-drive-18-pro-men-high-performance',
      linkLabel:'View on ONE8.com',
      stats: [
        { label: 'Price',    value: '₹13,999' },
        { label: 'Category', value: 'Cricket' },
        { label: 'Feature',  value: 'PWR+LCK Heel' },
        { label: 'Sole',     value: 'Cricket Spike' },
      ],
    },
  },
  {
    id: 'seam-pavilion',
    label: 'Seam Pavilion',
    x: 8, y: 42,
    icon: Icons.shoe,
    window: {
      title:    'Seam Pavilion',
      subtitle: 'ONE8 Lifestyle Sneaker',
      type:     'Product > Lifestyle > Laceless',
      body:     'A modern classic inspired by retro cricket shoes of the 70s and 80s. Laceless silhouette for effortless style. Made for stylishly stepping in and out of your everyday — from the ground to the street.',
      link:     'https://one8.com/products/seam-pavilion-mens-black',
      linkLabel:'View on ONE8.com',
      stats: [
        { label: 'Price',    value: '₹6,999' },
        { label: 'Category', value: 'Lifestyle' },
        { label: 'Feature',  value: 'Laceless Design' },
        { label: 'Vibe',     value: 'Retro Cricket' },
      ],
    },
  },
  {
    id: 'boom-rush',
    label: 'Boom Rush',
    x: 8, y: 65,
    icon: Icons.shoe,
    window: {
      title:    'Boom Rush',
      subtitle: 'ONE8 Women\'s Trainer',
      type:     'Product > Women > Hybrid Training',
      body:     'Built for the hybrid athlete who never stops. Boom Foam midsole provides responsive cushioning for running and training. Sonic Grip outsole for advanced traction. Dominate everything.',
      link:     'https://one8.com/products/boom-rush-women-mint-green-classic-white',
      linkLabel:'View on ONE8.com',
      stats: [
        { label: 'Price',    value: '₹9,999' },
        { label: 'Category', value: 'Women / Training' },
        { label: 'Feature',  value: 'Boom Foam' },
        { label: 'Grip',     value: 'Sonic Grip' },
      ],
    },
  },
  {
    id: 'career-stats',
    label: 'Career Stats.csv',
    x: 82, y: 18,
    icon: Icons.stats,
    window: {
      title:    'Career Stats',
      subtitle: 'Virat Kohli — International Cricket',
      type:     'Data > Statistics > All Formats',
      body:     'Numbers that define a generation. 27,289 international runs. 80+ centuries across formats. ICC Cricketer of the Decade 2010-2019. The only player to average 50+ in all three formats simultaneously.',
      stats: [
        { label: 'Int\'l Runs',   value: '27,289' },
        { label: 'Centuries',     value: '80+' },
        { label: 'Test Average',  value: '48.96' },
        { label: 'ODI Average',   value: '58.18' },
        { label: 'ICC Ranking',   value: '#1' },
        { label: 'Active Years',  value: '18+' },
      ],
    },
  },
  {
    id: 'journey',
    label: 'The Journey.mov',
    x: 82, y: 42,
    icon: Icons.journey,
    window: {
      title:    'The Journey',
      subtitle: 'From Delhi to the World',
      type:     'Story > Timeline > 2002 - Present',
      body:     '2002: Plays first Delhi U-15 match.\n2008: Test debut in Jamaica.\n2011: World Cup winner.\n2013: ICC No.1 ODI batsman.\n2014: Test series in England — the grind begins.\n2016: Becomes Test captain.\n2018: ONE8 launched.\n2023: WTC Final winner.\n2024: T20 World Cup winner.',
      stats: [
        { label: 'Debut',      value: '2008' },
        { label: 'ONE8 Founded', value: '2018' },
        { label: 'WC Titles',  value: '2' },
        { label: 'ICC Awards', value: '7+' },
      ],
    },
  },
  {
    id: 'fitness',
    label: 'Fitness Protocol',
    x: 82, y: 65,
    icon: Icons.fitness,
    window: {
      title:    'Fitness Protocol',
      subtitle: 'Virat Kohli\'s Training System',
      type:     'Lifestyle > Fitness > Diet & Training',
      body:     'The man who transformed Indian cricket fitness culture. Wakes at 5 AM, gym by 6. Plant-based diet since 2018 — switched after struggling with a cervical spine issue. 10% body fat. No alcohol since 2012. His philosophy: the body is the temple.',
      stats: [
        { label: 'Wake Time',  value: '5:00 AM' },
        { label: 'Body Fat',   value: '~10%' },
        { label: 'Diet',       value: 'Plant-based' },
        { label: 'Sessions/Wk', value: '6 days' },
      ],
    },
  },
  {
    id: 'one8-brand',
    label: 'ONE8 Brand',
    x: 45, y: 72,
    icon: Icons.crown,
    window: {
      title:    'ONE8',
      subtitle: 'The Brand Behind the King',
      type:     'Brand > Lifestyle > Performance',
      body:     'ONE8 is Virat Kohli\'s personal lifestyle brand — co-created with PUMA India. Launched in 2018, ONE8 represents his philosophy: 18 hours of hustle a day. The brand spans footwear, apparel, fragrances, and restaurants. Not a sponsorship — a way of life.',
      link:     'https://one8.com',
      linkLabel:'Explore ONE8.com',
      stats: [
        { label: 'Founded',   value: '2018' },
        { label: 'Partner',   value: 'PUMA India' },
        { label: 'Category',  value: 'Lifestyle' },
        { label: 'Philosophy', value: '18hr Hustle' },
      ],
    },
  },
  {
    id: 'cricket-folder',
    label: 'Cricket Records',
    x: 45, y: 20,
    icon: Icons.cricket,
    window: {
      title:    'Cricket Records',
      subtitle: 'Records that may never be broken',
      type:     'Data > Records > All Time',
      body:     'Fastest to 8,000 / 9,000 / 10,000 ODI runs. Most centuries in successful run chases. Only player with 70+ international centuries. Most Player of the Match awards in ODIs. These aren\'t just records — they are monuments.',
      stats: [
        { label: 'ODI 100s',     value: '50' },
        { label: 'Test 100s',    value: '30' },
        { label: 'T20I 100s',    value: '1' },
        { label: 'Fastest to 10K', value: '205 inn' },
      ],
    },
  },
]

// ── macOS Window Component ─────────────────────────────────────────
function MacWindow({
  data, onClose, initialX, initialY,
}: {
  data: WindowData
  onClose: () => void
  initialX: number
  initialY: number
}) {
  const winRef   = useRef<HTMLDivElement>(null)
  const dragRef  = useRef({ dragging: false, startX: 0, startY: 0, elX: 0, elY: 0 })
  const [pos, setPos] = useState({ x: initialX, y: initialY })

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, elX: pos.x, elY: pos.y }
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.dragging) return
      setPos({
        x: dragRef.current.elX + e.clientX - dragRef.current.startX,
        y: dragRef.current.elY + e.clientY - dragRef.current.startY,
      })
    }
    const onUp = () => { dragRef.current.dragging = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [])

  return (
    <motion.div
      ref={winRef}
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 1000, minWidth: 320, maxWidth: 420 }}
      className="select-none"
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 rounded-t-xl cursor-grab active:cursor-grabbing"
        style={{ background: 'rgba(30,30,30,0.97)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        onMouseDown={onMouseDown}
      >
        {/* Traffic lights */}
        <button onClick={onClose}
          className="w-3 h-3 rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
          style={{ background: '#FF5F57' }} aria-label="Close" />
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#FEBC2E' }} />
        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: '#28C840' }} />
        <span className="ml-2 font-mono text-[11px] text-white/50 truncate">{data.title}</span>
      </div>

      {/* Window body */}
      <div className="rounded-b-xl overflow-hidden"
        style={{ background: 'rgba(18,18,18,0.97)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none' }}>

        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-white/5">
          <div className="font-display text-xl text-white mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
            {data.title}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">{data.subtitle}</div>
        </div>

        {/* Type badge */}
        <div className="px-5 py-3 border-b border-white/5">
          <span className="font-mono text-[10px] text-white/30">Type: </span>
          <span className="font-mono text-[10px]" style={{ color: '#C0C0C0' }}>{data.type}</span>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <p className="text-white/65 text-sm leading-relaxed whitespace-pre-line">{data.body}</p>
        </div>

        {/* Stats grid */}
        {data.stats && (
          <div className="px-5 pb-4 grid grid-cols-2 gap-2">
            {data.stats.map((s) => (
              <div key={s.label} className="rounded-lg px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="font-mono text-[9px] uppercase tracking-widest text-white/30 mb-0.5">{s.label}</div>
                <div className="font-display text-base text-white" style={{ fontFamily: 'var(--font-display)', color: '#C0C0C0' }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Link */}
        {data.link && (
          <div className="px-5 pb-5">
            <a href={data.link} target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full py-2.5 text-xs rounded-lg text-center block">
              {data.linkLabel || 'Open Link'}
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Desktop Icon Component ─────────────────────────────────────────
function DesktopIconEl({
  icon, onOpen, onDragEnd,
}: {
  icon: DesktopIcon
  onOpen: (icon: DesktopIcon, x: number, y: number) => void
  onDragEnd: (id: string, x: number, y: number) => void
}) {
  const [pos, setPos] = useState({ x: `${icon.x}vw`, y: `${icon.y}vh` })
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, moved: false })
  const elRef   = useRef<HTMLDivElement>(null)

  const onMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, moved: false }
    e.preventDefault()
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.dragging || !elRef.current) return
      dragRef.current.moved = true
      const rect = elRef.current.getBoundingClientRect()
      elRef.current.style.left = `${rect.left + e.movementX}px`
      elRef.current.style.top  = `${rect.top  + e.movementY}px`
      elRef.current.style.transform = 'none'
    }
    const onUp = (e: MouseEvent) => {
      if (!dragRef.current.dragging) return
      dragRef.current.dragging = false
      if (!dragRef.current.moved) {
        onOpen(icon, e.clientX, e.clientY)
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup',   onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [icon, onOpen])

  return (
    <div
      ref={elRef}
      onMouseDown={onMouseDown}
      className="absolute flex flex-col items-center gap-1.5 cursor-pointer group select-none"
      style={{ left: `${icon.x}vw`, top: `${icon.y}vh`, transform: 'translate(-50%, -50%)' }}
    >
      {/* Icon box */}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200
        group-hover:scale-110 group-active:scale-95"
        style={{
          background:    'rgba(30,30,30,0.7)',
          backdropFilter:'blur(12px)',
          border:        '1px solid rgba(192,192,192,0.15)',
          boxShadow:     '0 4px 20px rgba(0,0,0,0.4)',
        }}>
        {icon.icon}
      </div>
      {/* Label */}
      <span className="font-mono text-[10px] text-center text-white/80 leading-tight px-1 py-0.5 rounded
        group-hover:text-white transition-colors max-w-[80px]"
        style={{
          background:    'rgba(0,0,0,0.55)',
          backdropFilter:'blur(8px)',
          textShadow:    '0 1px 4px rgba(0,0,0,0.8)',
        }}>
        {icon.label}
      </span>
    </div>
  )
}

// ── Main Locker Room ───────────────────────────────────────────────
export default function LockerRoomClient() {
  const [openWindows, setOpenWindows] = useState<
    { icon: DesktopIcon; x: number; y: number }[]
  >([])

  const handleOpen = useCallback((icon: DesktopIcon, clickX: number, clickY: number) => {
    setOpenWindows(prev => {
      // If already open, bring to front
      const exists = prev.find(w => w.icon.id === icon.id)
      if (exists) return [...prev.filter(w => w.icon.id !== icon.id), exists]
      // Open new window, offset from click
      const x = Math.min(clickX - 160, window.innerWidth  - 440)
      const y = Math.min(clickY - 40,  window.innerHeight - 480)
      return [...prev, { icon, x: Math.max(10, x), y: Math.max(60, y) }]
    })
  }, [])

  const handleClose = useCallback((id: string) => {
    setOpenWindows(prev => prev.filter(w => w.icon.id !== id))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#000', cursor: 'default' }}>

      {/* ── Background: Virat photo with dark overlay ── */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/virat-hero.png"
          alt="Virat Kohli"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.22) saturate(0.6)' }}
        />
        {/* Radial vignette */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 40%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)' }} />
        {/* Silver shimmer at top */}
        <div className="absolute top-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(180deg, rgba(192,192,192,0.04) 0%, transparent 100%)' }} />
      </div>

      {/* ── Menu bar (macOS style) ── */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-2"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-6">
          {/* ONE8 logo as apple menu */}
          <span className="font-display text-base" style={{ color: '#C0C0C0', fontFamily: 'var(--font-display)' }}>ONE8</span>
          <span className="font-mono text-[11px] text-white/60">Virat's Locker Room</span>
          <span className="font-mono text-[11px] text-white/30">File</span>
          <span className="font-mono text-[11px] text-white/30">View</span>
          <span className="font-mono text-[11px] text-white/30">Help</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-mono text-[11px] text-white/40">
            {new Date().toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
          </span>
          {/* Back to main site */}
          <a href="/"
            className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded"
            style={{ color: '#C0C0C0', border: '1px solid rgba(192,192,192,0.3)' }}>
            Exit
          </a>
        </div>
      </div>

      {/* ── Hint text ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25">
          Click any icon to explore - Drag to move
        </p>
      </div>

      {/* ── Desktop Icons ── */}
      <div className="absolute inset-0 z-10" style={{ top: '32px' }}>
        {ICONS.map((icon) => (
          <DesktopIconEl
            key={icon.id}
            icon={icon}
            onOpen={handleOpen}
            onDragEnd={() => {}}
          />
        ))}
      </div>

      {/* ── Open Windows ── */}
      <AnimatePresence>
        {openWindows.map(({ icon, x, y }) => (
          <MacWindow
            key={icon.id}
            data={icon.window}
            onClose={() => handleClose(icon.id)}
            initialX={x}
            initialY={y}
          />
        ))}
      </AnimatePresence>

      {/* ── Fan concept disclaimer ── */}
      <div className="absolute bottom-0 left-0 right-0 z-50 text-center py-1.5"
        style={{ background: 'rgba(0,0,0,0.8)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="font-mono text-[10px] text-white/20 tracking-wider">
          Fan-made concept. Not affiliated with Virat Kohli or ONE8. For UI/UX portfolio only.
        </p>
      </div>
    </div>
  )
}
