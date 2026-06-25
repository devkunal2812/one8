'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Dynamically import 3D to avoid SSR issues
const Shoe3D = dynamic(() => import('@/components/3d/Shoe3D'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const bgRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end:   'bottom top',
          scrub: true,
        },
      })

      // Headline fade out on scroll
      gsap.to(headlineRef.current, {
        opacity: 0,
        yPercent: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center top',
          end:   'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background: gradient + imaginary stadium glow ── */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-king-black" />
        {/* Stadium-inspired radial glow */}
        <div className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,0.12) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 20% 50%,  rgba(192,57,43,0.08) 0%,  transparent 60%),
              radial-gradient(ellipse 50% 40% at 80% 50%,  rgba(201,168,76,0.06) 0%, transparent 60%)
            `
          }}
        />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.9) 100%)' }}
        />
      </div>

      {/* ── Content grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 pb-16">

        {/* Left: Text */}
        <div ref={headlineRef} className="flex flex-col gap-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span className="w-10 h-px bg-king-gold" />
            <span className="font-mono text-xs tracking-[0.4em] uppercase text-king-gold">
              King Edition 2024
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-[5rem] md:text-[7rem] lg:text-[8rem] leading-[0.88] text-king-white"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            BUILT
            <br />
            <span className="text-gold-shimmer" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
              FOR THE
            </span>
            <br />
            THRONE.
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-king-white/60 text-base md:text-lg max-w-md leading-relaxed font-light"
          >
            Every step carries the weight of 18,000 runs. Every move echoes a decade of dominance.
            This is not just footwear — it is a statement.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <a href="#collection" className="btn-primary px-8 py-4 text-sm rounded-sm inline-block">
              Explore Collection
            </a>
            <a href="#journey" className="btn-secondary px-8 py-4 text-sm rounded-sm inline-block">
              The Journey
            </a>
          </motion.div>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex gap-6 mt-4"
          >
            {[
              { value: '254', label: 'Intl. Tests' },
              { value: '80+', label: 'Centuries' },
              { value: '#1',  label: 'ICC Ranking' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-display text-2xl text-king-gold">{s.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-king-white/40">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Sneaker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative h-[400px] md:h-[520px] w-full"
        >
          {/* Gold ring glow behind shoe */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full border border-king-gold/10 animate-pulse-gold" />
            <div className="absolute w-60 h-60 rounded-full border border-king-gold/05" />
          </div>
          <Shoe3D />

          {/* Floating label */}
          <div className="absolute bottom-8 right-8 glass-card px-4 py-2 text-right">
            <div className="font-mono text-[10px] uppercase tracking-widest text-king-gold">ONE8 × King</div>
            <div className="text-xs text-king-white/60 mt-0.5">Rotate to explore</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-king-white/30">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-king-gold/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
