'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Use our API proxy route - bypasses wikimedia hotlink protection
const VIRAT_PHOTO_SRC = '/images/virat-hero.png'

export default function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const photoRef    = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(photoRef.current, {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(headlineRef.current, {
        opacity: 0, yPercent: -10,
        scrollTrigger: { trigger: sectionRef.current, start: 'center top', end: 'bottom top', scrub: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-king-black" />
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(192,192,192,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 20% 50%, rgba(192,57,43,0.06) 0%, transparent 60%)
          `
        }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{
          backgroundImage: `linear-gradient(rgba(192,192,192,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.9) 100%)' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">

          {/* Photo column */}
          <motion.div
            ref={photoRef}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full lg:order-2 lg:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none lg:w-full"
              style={{ aspectRatio: '4/5' }}>

              {/* Glow ring */}
              <div className="absolute -inset-2 rounded-2xl pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(192,192,192,0.05) 0%, transparent 70%)' }} />

              {/* Silver accent bar */}
              <div className="absolute left-0 top-[10%] bottom-[10%] w-0.5 z-10 rounded-full"
                style={{ background: 'linear-gradient(180deg, transparent, #C0C0C0 40%, #C0C0C0 60%, transparent)' }} />

              {/* Photo frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden"
                style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(192,192,192,0.1)' }}>

                {!imgError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={VIRAT_PHOTO_SRC}
                    alt="Virat Kohli"
                    className="w-full h-full object-cover object-top"
                    onError={() => setImgError(true)}
                    style={{ display: 'block' }}
                  />
                ) : (
                  /* Fallback: cinematic VK monogram */
                  <div className="w-full h-full flex flex-col items-center justify-center"
                    style={{ background: 'linear-gradient(160deg, #111 0%, #0a0a0a 100%)' }}>
                    <div className="font-display text-[8rem] leading-none"
                      style={{ color: '#C0C0C0', fontFamily: 'var(--font-display)', opacity: 0.15 }}>
                      VK
                    </div>
                    <div className="font-mono text-xs uppercase tracking-[0.5em] text-white/30 mt-4">
                      Virat Kohli
                    </div>
                  </div>
                )}

                {/* Overlays */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.85) 100%)' }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, rgba(10,10,10,0.2) 0%, transparent 12%, transparent 88%, rgba(10,10,10,0.2) 100%)' }} />
              </div>

              {/* Floating name card */}
              <div className="absolute bottom-4 left-3 right-3 glass-card-dark px-4 py-3 rounded-xl z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-base sm:text-lg text-white" style={{ fontFamily: 'var(--font-display)' }}>
                      VIRAT KOHLI
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-widest text-white/40">The King of Cricket</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#C0C0C0' }}>ONE8</div>
                    <div className="font-mono text-[9px] text-white/30">Co-founder</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <div ref={headlineRef} className="w-full lg:order-1 lg:w-1/2 flex flex-col gap-5 lg:gap-6">

            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <span className="w-8 h-px" style={{ background: '#C0C0C0' }} />
              <span className="font-mono text-[11px] tracking-[0.4em] uppercase" style={{ color: '#C0C0C0' }}>
                King Edition 2024
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display leading-[0.88] text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
            >
              BUILT
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #C0C0C0, #E8E8E8, #ffffff, #E8E8E8, #C0C0C0)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}>
                FOR THE
              </span>
              <br />
              THRONE.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-white/55 text-base md:text-lg max-w-md leading-relaxed font-light"
            >
              Every step carries the weight of 18,000 runs. Every move echoes a decade of dominance.
              This is not just footwear - it is a statement.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#collection" className="btn-primary px-7 py-3.5 text-sm rounded-sm inline-block">
                Explore Collection
              </a>
              <a href="#journey" className="btn-secondary px-7 py-3.5 text-sm rounded-sm inline-block">
                The Journey
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex gap-6 pt-4 border-t border-white/5"
            >
              {[
                { value: '27K+', label: 'Intl. Runs' },
                { value: '80+',  label: 'Centuries' },
                { value: '#1',   label: 'ICC Ranked' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-display text-xl" style={{ color: '#C0C0C0', fontFamily: 'var(--font-display)' }}>{s.value}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/25">Scroll</span>
        <div className="w-px h-10 animate-pulse"
          style={{ background: 'linear-gradient(180deg, #C0C0C0, transparent)' }} />
      </motion.div>
    </section>
  )
}
