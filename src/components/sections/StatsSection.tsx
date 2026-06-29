'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// SVG icons - no emojis
const ICONS = {
  bat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M3 21l10-10M9.5 5.5l9 9-4 4-9-9 1-5 3 1z"/>
      <circle cx="19" cy="5" r="2"/>
    </svg>
  ),
  century: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9 12h6M12 9v6"/>
    </svg>
  ),
  stadium: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <ellipse cx="12" cy="17" rx="9" ry="3"/>
      <path d="M3 17V7a9 3 0 0118 0v10"/>
      <path d="M3 12a9 3 0 0018 0"/>
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M2 19h20M4 19L2 8l5 4 5-7 5 7 5-4-2 11z"/>
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M8 21h8M12 17v4M7 4H4v3a5 5 0 005 5h6a5 5 0 005-5V4h-3"/>
      <path d="M7 4h10v4a5 5 0 01-10 0V4z"/>
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M13 2L4.5 13.5H12L11 22l8.5-11.5H12L13 2z"/>
    </svg>
  ),
}

const STATS = [
  { value: 27289, label: 'International Runs',      suffix: '',  prefix: '',  icon: 'bat',     color: '#C0C0C0' },
  { value: 80,    label: 'International Centuries',  suffix: '+', prefix: '',  icon: 'century', color: '#E8E8E8' },
  { value: 254,   label: 'Test Matches',             suffix: '',  prefix: '',  icon: 'stadium', color: '#C0C0C0' },
  { value: 1,     label: 'ICC Ranking',              suffix: '',  prefix: '#', icon: 'crown',   color: '#C0392B' },
  { value: 5,     label: 'IPL Titles as Captain',    suffix: '',  prefix: '',  icon: 'trophy',  color: '#C0C0C0' },
  { value: 18,    label: 'Years of Dominance',       suffix: '+', prefix: '',  icon: 'bolt',    color: '#E8E8E8' },
]

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const [count,   setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          const duration = 2000
          const start    = Date.now()
          const target   = stat.value
          const easeOut  = (t: number) => 1 - Math.pow(1 - t, 3)
          const tick = () => {
            const elapsed  = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            setCount(Math.round(easeOut(progress) * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started, stat.value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 md:p-8 flex flex-col items-center text-center group relative overflow-hidden"
    >
      {/* SVG Icon */}
      <div className="mb-4" style={{ color: stat.color }}>
        {ICONS[stat.icon as keyof typeof ICONS]}
      </div>

      {/* Counter */}
      <div className="flex items-baseline gap-1 mb-2">
        {stat.prefix && (
          <span className="font-display text-3xl" style={{ color: stat.color, fontFamily: 'var(--font-display)' }}>
            {stat.prefix}
          </span>
        )}
        <span
          className="font-display tabular-nums" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}
          style={{ color: stat.color, fontFamily: 'var(--font-display)', textShadow: `0 0 30px ${stat.color}40` }}
        >
          {count.toLocaleString('en-IN')}
        </span>
        {stat.suffix && (
          <span className="font-display text-3xl" style={{ color: stat.color, fontFamily: 'var(--font-display)' }}>
            {stat.suffix}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/50 leading-relaxed">
        {stat.label}
      </span>

      {/* Bottom glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section id="stats" className="section-padding relative overflow-hidden" style={{ background: '#0A0A0A' }}>
      {/* Background grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(192,192,192,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,192,192,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,192,192,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Scoreboard header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 glass-card px-6 py-2 mb-8">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#C0392B" }} />
            <span className="font-mono text-xs tracking-widest uppercase text-white/60">Live Career Stats</span>
          </div>
          <h2 className="font-display text-[3.5rem] md:text-[5.5rem] text-white leading-none"
            style={{ fontFamily: 'var(--font-display)' }}>
            BY THE{' '}
            <span className="text-gold-shimmer" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
              NUMBERS
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
            Stats don't lie. Neither does greatness.
          </p>
        </motion.div>

        {/* Scoreboard frame */}
        <div className="border border-king-silver/15 rounded-2xl p-1 bg-king-dark/40" style={{ borderColor: 'rgba(192,192,192,0.15)' }}>
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "rgba(192,57,43,0.7)" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: 'rgba(192,192,192,0.7)' }} />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
              Virat Kohli - Career Overview
            </span>
            <span className="font-mono text-xs text-white/30">2024</span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {STATS.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>

        {/* Fitness row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: 'Body Fat %',        value: '10%', sub: 'Peak athlete' },
            { label: 'Diet: Plant-based', value: '100%', sub: 'Since 2018' },
            { label: 'Gym Sessions/Week', value: '6',   sub: 'No off days' },
          ].map((f) => (
            <div key={f.label} className="glass-card px-6 py-4 flex items-center gap-4">
              <div className="w-1 h-12 rounded-full" style={{ background: 'linear-gradient(180deg, #C0C0C0, transparent)' }} />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">{f.label}</div>
                <div className="font-display text-2xl mt-1" style={{ color: '#C0C0C0', fontFamily: 'var(--font-display)' }}>{f.value}</div>
                <div className="font-mono text-[10px] text-white/30">{f.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
