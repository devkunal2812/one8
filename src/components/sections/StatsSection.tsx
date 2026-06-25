'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STATS = [
  { value: 27289, label: 'International Runs',   suffix: '',  prefix: '',  icon: '🏏', color: '#C9A84C' },
  { value: 80,    label: 'International Centuries', suffix: '+', prefix: '',  icon: '💯', color: '#E8C97A' },
  { value: 254,   label: 'Test Matches',          suffix: '',  prefix: '',  icon: '🏟️', color: '#C9A84C' },
  { value: 1,     label: 'ICC Ranking',            suffix: '',  prefix: '#', icon: '👑', color: '#C0392B' },
  { value: 5,     label: 'IPL Titles (RCB Captain)', suffix: '', prefix: '',  icon: '🏆', color: '#C9A84C' },
  { value: 18,    label: 'Years of Dominance',    suffix: '+', prefix: '',  icon: '⚡', color: '#E8C97A' },
]

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          // Animate counter
          const duration   = 2000
          const start      = Date.now()
          const target     = stat.value
          const easeOut    = (t: number) => 1 - Math.pow(1 - t, 3)

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
      {/* Icon */}
      <span className="text-3xl mb-4 block" role="img" aria-label={stat.label}>
        {stat.icon}
      </span>

      {/* Counter */}
      <div className="flex items-baseline gap-1 mb-2">
        {stat.prefix && (
          <span className="font-display text-3xl" style={{ color: stat.color, fontFamily: 'var(--font-display)' }}>
            {stat.prefix}
          </span>
        )}
        <span
          className="font-display text-5xl md:text-6xl tabular-nums"
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
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-king-white/50 leading-relaxed">
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
      {/* Background: scoreboard grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Radial gold glow at center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
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
            <span className="w-2 h-2 rounded-full bg-king-red animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-king-white/60">Live Career Stats</span>
          </div>
          <h2 className="font-display text-[3.5rem] md:text-[5.5rem] text-king-white leading-none"
            style={{ fontFamily: 'var(--font-display)' }}>
            BY THE{' '}
            <span className="text-gold-shimmer" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
              NUMBERS
            </span>
          </h2>
          <p className="text-king-white/40 text-sm mt-4 max-w-md mx-auto">
            Stats don't lie. Neither does greatness.
          </p>
        </motion.div>

        {/* Scoreboard frame */}
        <div className="border border-king-gold/15 rounded-2xl p-1 bg-king-dark/40">
          {/* Scoreboard header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-king-gold/10">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-king-red/70" />
              <span className="w-3 h-3 rounded-full bg-king-gold/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="font-mono text-xs tracking-widest text-king-white/30 uppercase">
              Virat Kohli — Career Overview
            </span>
            <span className="font-mono text-xs text-king-gold/50">2024</span>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {STATS.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </div>
        </div>

        {/* Fitness achievements row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { label: 'Body Fat %',         value: '10%',   sub: 'Peak athlete' },
            { label: 'Diet: Plant-based',  value: '100%',  sub: 'Since 2018' },
            { label: 'Gym Sessions/Week',  value: '6',     sub: 'No off days' },
          ].map((f) => (
            <div key={f.label} className="glass-card px-6 py-4 flex items-center gap-4">
              <div className="w-1 h-12 rounded-full" style={{ background: 'linear-gradient(180deg, #C9A84C, transparent)' }} />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-king-white/40">{f.label}</div>
                <div className="font-display text-2xl text-king-gold mt-1" style={{ fontFamily: 'var(--font-display)' }}>{f.value}</div>
                <div className="font-mono text-[10px] text-king-white/30">{f.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
