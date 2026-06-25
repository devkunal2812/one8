'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

// Public domain / free-use Virat Kohli photo from Wikimedia Commons
const VIRAT_PHOTO = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Virat_Kohli_in_2012_ODI_series.jpg/800px-Virat_Kohli_in_2012_ODI_series.jpg'

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const bgRef       = useRef<HTMLDivElement>(null)
  const photoRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on photo - moves slower than scroll
      gsap.to(photoRef.current, {
        yPercent: 15,
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
        yPercent: -15,
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
      {/* ── Background gradients ── */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-king-black" />
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(192,192,192,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 20% 50%,  rgba(192,57,43,0.06) 0%,  transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 50%,  rgba(192,192,192,0.04) 0%, transparent 60%)
          `
        }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `
            linear-gradient(rgba(192,192,192,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192,192,192,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
        {/* Vignette */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.85) 100%)' }} />
      </div>

      {/* ── Content grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-28 pb-16">

        {/* Left: Text */}
        <div ref={headlineRef} className="flex flex-col gap-6">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span className="w-10 h-px" style={{ background: '#C0C0C0' }} />
            <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: '#C0C0C0' }}>
              King Edition 2024
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-[5rem] md:text-[7rem] lg:text-[8rem] leading-[0.88] text-white"
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
            className="text-white/60 text-base md:text-lg max-w-md leading-relaxed font-light"
          >
            Every step carries the weight of 18,000 runs. Every move echoes a decade of dominance.
            This is not just footwear - it is a statement.
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

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="flex gap-6 mt-4"
          >
            {[
              { value: '27K+', label: 'Intl. Runs' },
              { value: '80+',  label: 'Centuries' },
              { value: '#1',   label: 'ICC Ranked' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-display text-2xl" style={{ color: '#C0C0C0', fontFamily: 'var(--font-display)' }}>{s.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Virat Kohli photo */}
        <motion.div
          ref={photoRef}
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative h-[480px] md:h-[580px] w-full flex items-end justify-center"
        >
          {/* Silver ring glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-96 rounded-full border opacity-10 animate-pulse"
              style={{ borderColor: '#C0C0C0', boxShadow: '0 0 80px rgba(192,192,192,0.15)' }} />
          </div>

          {/* Photo container with cinematic mask */}
          <div className="relative w-full h-full max-w-sm mx-auto">
            {/* Silver accent line left */}
            <div className="absolute left-0 top-[10%] bottom-[10%] w-0.5 z-20"
              style={{ background: 'linear-gradient(180deg, transparent, #C0C0C0, transparent)' }} />

            {/* Photo */}
            <div className="relative w-full h-full overflow-hidden rounded-2xl"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(192,192,192,0.1)' }}>
              <Image
                src={VIRAT_PHOTO}
                alt="Virat Kohli - Cricket Legend"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Bottom gradient fade into page */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.8) 100%)' }} />
              {/* Side vignettes */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, rgba(10,10,10,0.3) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.3) 100%)' }} />
            </div>

            {/* Floating info card */}
            <div className="absolute bottom-6 left-4 right-4 glass-card p-4 z-20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-xl text-white" style={{ fontFamily: 'var(--font-display)' }}>VIRAT KOHLI</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mt-0.5">The King of Cricket</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#C0C0C0' }}>ONE8</div>
                  <div className="font-mono text-[10px] text-white/30">Co-founder</div>
                </div>
              </div>
            </div>
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
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">Scroll</span>
        <div className="w-px h-12 animate-pulse"
          style={{ background: 'linear-gradient(180deg, #C0C0C0, transparent)' }} />
      </motion.div>
    </section>
  )
}
