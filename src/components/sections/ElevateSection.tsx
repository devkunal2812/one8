'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useAnimationFrame, AnimatePresence } from 'framer-motion'

/* ── Wheel items ───────────────────────────────────────────────── */
const WHEEL_ITEMS = [
  { type: 'image', src: 'https://one8.com/cdn/shop/files/V10015001_03_6d97ac06-93e4-46c0-b7ee-12a9ae14bd22.jpg?v=1781597662', label: 'Cover Drive 18', price: 'Rs.13,999', link: 'https://one8.com/products/cover-drive-18-pro-men-high-performance' },
  { type: 'text',  title: 'CRICKET',  sub: 'Ready',     accent: '#C0C0C0' },
  { type: 'image', src: 'https://one8.com/cdn/shop/files/V10012103_03_6ed3c120-1393-48c7-a8d5-d5ead9eb08eb.jpg?v=1781597511', label: 'Boom Rush', price: 'Rs.9,999', link: 'https://one8.com/products/boom-rush-women-mint-green-classic-white' },
  { type: 'text',  title: 'STREET',   sub: 'Style',      accent: '#E8E8E8' },
  { type: 'image', src: 'https://one8.com/cdn/shop/files/V10021002_03_9c2f28ab-19e7-48e5-bfe5-d40c5f563963.jpg?v=1781598539', label: 'Seam Pavilion', price: 'Rs.6,999', link: 'https://one8.com/products/seam-pavilion-mens-black' },
  { type: 'text',  title: 'ALL-DAY',  sub: 'Comfort',    accent: '#C0C0C0' },
  { type: 'card',  label: 'ONE8',     sub: 'King Edition' },
  { type: 'text',  title: 'BUILT',    sub: 'To Perform', accent: '#E8E8E8' },
]

/* ── Single wheel card ─────────────────────────────────────────── */
function WheelCard({ item, angle, radius, rotationRef, onSelect }: {
  item: typeof WHEEL_ITEMS[0]
  angle: number
  radius: number
  rotationRef: React.MutableRefObject<number>
  onSelect: (item: typeof WHEEL_ITEMS[0]) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  /* live-update scale/opacity based on facing-camera proximity */
  useAnimationFrame(() => {
    if (!cardRef.current) return
    const total = (rotationRef.current + angle) % 360
    const norm  = ((total % 360) + 360) % 360
    // distance from "front" (0deg) — 0 = facing camera, 180 = facing away
    const dist  = Math.min(norm, 360 - norm) // 0..180
    const facing = 1 - dist / 180            // 1 = front, 0 = back

    const scale   = 0.62 + facing * 0.5       // 0.62 .. 1.12
    const opacity = 0.28 + facing * 0.72      // 0.28 .. 1.0
    const z       = Math.round(facing * 100)

    cardRef.current.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale})`
    cardRef.current.style.opacity   = `${opacity}`
    cardRef.current.style.zIndex    = `${z}`
    cardRef.current.style.filter    = facing > 0.8 ? 'none' : `brightness(${0.55 + facing * 0.45})`
  })

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 140, height: 180,
        marginLeft: -70, marginTop: -90,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        cursor: 'pointer',
        transition: 'box-shadow 0.25s ease',
      }}
    >
      <div
        className="w-full h-full rounded-2xl overflow-hidden relative"
        style={{
          boxShadow: hovered
            ? '0 20px 50px rgba(0,0,0,0.6), 0 0 0 2px rgba(192,192,192,0.5)'
            : '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(192,192,192,0.12)',
          background: '#0d0d0f',
          transition: 'box-shadow 0.25s ease',
        }}
      >
        {item.type === 'image' && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.label} className="w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.75) 100%)' }} />
            <div className="absolute bottom-2 left-2 right-2">
              <span className="font-mono text-[8px] uppercase tracking-wider text-white/85">{item.label}</span>
            </div>
          </>
        )}
        {item.type === 'text' && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1 px-2 text-center"
            style={{ background: 'linear-gradient(160deg, #141416 0%, #0a0a0b 100%)' }}>
            <span className="font-display leading-none" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: item.accent }}>
              {item.title}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">{item.sub}</span>
          </div>
        )}
        {item.type === 'card' && (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: 'linear-gradient(160deg, rgba(192,192,192,0.1) 0%, #0a0a0b 100%)', border: '1px solid rgba(192,192,192,0.15)' }}>
            <span className="font-display leading-none" style={{
              fontFamily: 'var(--font-display)', fontSize: '2rem',
              background: 'linear-gradient(90deg,#C0C0C0,#E8E8E8,#C0C0C0)', backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}>
              {item.label}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">{item.sub}</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Product focus modal ───────────────────────────────────────── */
function FocusModal({ item, onClose }: { item: typeof WHEEL_ITEMS[0] | null; onClose: () => void }) {
  if (!item) return null
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-6"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 20 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ background: '#0d0d0f', border: '1px solid rgba(192,192,192,0.15)', boxShadow: '0 30px 80px rgba(0,0,0,0.7)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
        >
          ✕
        </button>

        {item.type === 'image' ? (
          <>
            <div style={{ aspectRatio: '1/1' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl text-white mb-1" style={{ fontFamily: 'var(--font-display)' }}>{item.label}</h3>
              <p className="font-mono text-sm mb-4" style={{ color: '#C0C0C0' }}>{item.price}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer"
                className="btn-primary w-full py-3 text-sm rounded-sm text-center block">
                Buy on ONE8.com
              </a>
            </div>
          </>
        ) : (
          <div className="p-12 flex flex-col items-center justify-center gap-2 text-center" style={{ aspectRatio: '1/1' }}>
            <span className="font-display text-4xl" style={{ fontFamily: 'var(--font-display)', color: '#C0C0C0' }}>
              {item.title ?? item.label}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">{item.sub}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ── Wheel carousel ────────────────────────────────────────────── */
function WheelCarousel() {
  const rotation = useRef(0)
  const velocity  = useRef(0.18) // deg per frame baseline auto-spin
  const wheelRef  = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused,   setIsPaused]   = useState(false)
  const dragStart      = useRef(0)
  const dragRotStart   = useRef(0)
  const lastDragX       = useRef(0)
  const lastDragTime     = useRef(0)
  const dragVelocity     = useRef(0)
  const [selected, setSelected] = useState<typeof WHEEL_ITEMS[0] | null>(null)

  const n      = WHEEL_ITEMS.length
  const radius = 230
  const angleStep = 360 / n

  useAnimationFrame((_, delta) => {
    if (isDragging || isPaused) return
    // Inertia decay after drag release
    if (Math.abs(dragVelocity.current) > 0.01) {
      rotation.current += dragVelocity.current
      dragVelocity.current *= 0.94 // friction
    } else {
      rotation.current += velocity.current * (delta / 16.67)
    }
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotateY(${rotation.current}deg)`
    }
  })

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragVelocity.current = 0
    dragStart.current = e.clientX
    dragRotStart.current = rotation.current
    lastDragX.current = e.clientX
    lastDragTime.current = performance.now()
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const delta = e.clientX - dragStart.current
    rotation.current = dragRotStart.current + delta * 0.4
    if (wheelRef.current) wheelRef.current.style.transform = `rotateY(${rotation.current}deg)`

    const now = performance.now()
    const dt  = now - lastDragTime.current
    if (dt > 0) {
      const dx = e.clientX - lastDragX.current
      dragVelocity.current = (dx * 0.4) * (16.67 / dt) // normalize to ~frame velocity
    }
    lastDragX.current = e.clientX
    lastDragTime.current = now
  }
  const onPointerUp = () => {
    setIsDragging(false)
    // let inertia play out, useAnimationFrame already handles decay
  }

  return (
    <>
      <div
        className="relative w-full select-none"
        style={{ height: 420, perspective: '1400px', cursor: isDragging ? 'grabbing' : 'grab' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={wheelRef}
          style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d', transform: 'rotateY(0deg)' }}
        >
          {WHEEL_ITEMS.map((item, i) => (
            <WheelCard
              key={i}
              item={item}
              angle={i * angleStep}
              radius={radius}
              rotationRef={rotation}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* Pause indicator */}
        <AnimatePresence>
          {isPaused && !isDragging && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute top-2 right-2 px-2.5 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider pointer-events-none"
              style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(192,192,192,0.8)', border: '1px solid rgba(192,192,192,0.2)' }}
            >
              Paused
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && <FocusModal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  )
}

/* ── Main section ──────────────────────────────────────────────── */
export default function ElevateSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#08080a' }}>
      <div className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #0D0D0F 0%, transparent 100%)' }} />

      <div className="section-padding">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-mono text-xs tracking-[0.5em] uppercase block mb-4" style={{ color: '#C0C0C0' }}>
              Everyday Performance
            </span>
            <h2 className="font-display leading-none text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
              ELEVATE YOUR{' '}
              <span style={{
                background: 'linear-gradient(90deg, #C0C0C0, #E8E8E8, #C0C0C0)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}>
                EVERYDAY
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-lg mx-auto">
              From the crease to the street - built to move with you through every part of the day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="absolute -inset-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 60% at center, rgba(192,192,192,0.07) 0%, transparent 70%)' }} />

            <WheelCarousel />

            <div className="flex items-center justify-between mt-2 px-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                ONE8 Collection - Drag or Hover to Pause
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#C0C0C0' }}>
                Click for Details
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {['Cricket Ready', 'Street Style', 'All-Day Comfort', 'Performance Engineered'].map((tag) => (
              <span key={tag}
                className="px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider"
                style={{ border: '1px solid rgba(192,192,192,0.2)', color: 'rgba(192,192,192,0.7)', background: 'rgba(192,192,192,0.03)' }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, #0A0A0A 0%, transparent 100%)' }} />
    </section>
  )
}
