'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'

/* ── Wheel items: mix of real ONE8 product photos + text cards ───── */
const WHEEL_ITEMS = [
  { type: 'image', src: 'https://one8.com/cdn/shop/files/V10015001_03_6d97ac06-93e4-46c0-b7ee-12a9ae14bd22.jpg?v=1781597662', label: 'Cover Drive 18' },
  { type: 'text',  title: 'CRICKET',  sub: 'Ready',     accent: '#C0C0C0' },
  { type: 'image', src: 'https://one8.com/cdn/shop/files/V10012103_03_6ed3c120-1393-48c7-a8d5-d5ead9eb08eb.jpg?v=1781597511', label: 'Boom Rush' },
  { type: 'text',  title: 'STREET',   sub: 'Style',      accent: '#E8E8E8' },
  { type: 'image', src: 'https://one8.com/cdn/shop/files/V10021002_03_9c2f28ab-19e7-48e5-bfe5-d40c5f563963.jpg?v=1781598539', label: 'Seam Pavilion' },
  { type: 'text',  title: 'ALL-DAY',  sub: 'Comfort',    accent: '#C0C0C0' },
  { type: 'card',  label: 'ONE8',     sub: 'King Edition' },
  { type: 'text',  title: 'BUILT',    sub: 'To Perform', accent: '#E8E8E8' },
]

/* ── Single wheel card, positioned via rotateY + translateZ ──────── */
function WheelCard({ item, angle, radius }: {
  item: typeof WHEEL_ITEMS[0]
  angle: number
  radius: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: 140, height: 180,
        marginLeft: -70, marginTop: -90,
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
      }}
    >
      <div
        className="w-full h-full rounded-2xl overflow-hidden relative"
        style={{
          boxShadow: '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(192,192,192,0.12)',
          background: '#0d0d0f',
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

/* ── Wheel carousel ─────────────────────────────────────────────── */
function WheelCarousel() {
  const rotation = useRef(0)
  const wheelRef  = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart  = useRef(0)
  const dragRotStart = useRef(0)
  const [autoSpin, setAutoSpin] = useState(true)

  const n      = WHEEL_ITEMS.length
  const radius = 230
  const angleStep = 360 / n

  useAnimationFrame((_, delta) => {
    if (!autoSpin || isDragging) return
    rotation.current += (delta / 1000) * 9 // degrees/sec
    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotateY(${rotation.current}deg)`
    }
  })

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    setAutoSpin(false)
    dragStart.current = e.clientX
    dragRotStart.current = rotation.current
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const delta = e.clientX - dragStart.current
    rotation.current = dragRotStart.current + delta * 0.35
    if (wheelRef.current) wheelRef.current.style.transform = `rotateY(${rotation.current}deg)`
  }
  const onPointerUp = () => {
    setIsDragging(false)
    setTimeout(() => setAutoSpin(true), 1500) // resume auto-spin after a pause
  }

  return (
    <div
      className="relative w-full select-none cursor-grab active:cursor-grabbing"
      style={{ height: 420, perspective: '1400px' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div
        ref={wheelRef}
        style={{
          position: 'absolute', inset: 0,
          transformStyle: 'preserve-3d',
          transform: 'rotateY(0deg)',
        }}
      >
        {WHEEL_ITEMS.map((item, i) => (
          <WheelCard key={i} item={item} angle={i * angleStep} radius={radius} />
        ))}
      </div>
    </div>
  )
}

/* ── Main section ───────────────────────────────────────────────── */
export default function ElevateSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#08080a' }}>
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #0D0D0F 0%, transparent 100%)' }} />

      <div className="section-padding">
        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
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

          {/* Wheel carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-3xl mx-auto"
          >
            {/* Silver ambient glow */}
            <div className="absolute -inset-10 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 60% at center, rgba(192,192,192,0.07) 0%, transparent 70%)' }} />

            <WheelCarousel />

            {/* Caption */}
            <div className="flex items-center justify-between mt-2 px-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                ONE8 Collection - Drag to Explore
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#C0C0C0' }}>
                Auto-rotating
              </span>
            </div>
          </motion.div>

          {/* Feature chips */}
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, #0A0A0A 0%, transparent 100%)' }} />
    </section>
  )
}
