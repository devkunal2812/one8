'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ClosingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const bgRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax bg
      gsap.to(bgRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end:   'bottom top',
          scrub: true,
        },
      })

      // Text reveal
      gsap.fromTo('.closing-word',
        { opacity: 0, y: 80, rotateX: -20 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 1.0,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* ── Background gradient field ── */}
      <div ref={bgRef} className="absolute inset-[-20%] z-0 pointer-events-none">
        {/* Deep cinematic atmosphere */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 100%, rgba(201,168,76,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60%  60% at 20% 50%,  rgba(192,57,43,0.10)  0%, transparent 50%),
            radial-gradient(ellipse 60%  60% at 80% 50%,  rgba(201,168,76,0.08) 0%, transparent 50%),
            #0A0A0A
          `
        }} />

        {/* Particle dots (CSS only, lightweight) */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width:     `${Math.random() * 3 + 1}px`,
              height:    `${Math.random() * 3 + 1}px`,
              left:      `${Math.random() * 100}%`,
              top:       `${Math.random() * 100}%`,
              background: '#C0C0C0',
              opacity:   Math.random() * 0.4 + 0.1,
              animation: `particleFly ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-king-gold" />
          <span className="font-mono text-xs tracking-[0.5em] uppercase text-king-gold">
            The Final Word
          </span>
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-king-gold" />
        </motion.div>

        {/* Main headline  -  word by word reveal */}
        <div
          ref={textRef}
          className="overflow-hidden"
          style={{ perspective: '800px' }}
        >
          <h2
            className="font-display leading-[0.9] mb-8"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            }}
          >
            {['GREATNESS', "ISN'T", 'GIVEN.'].map((word, i) => (
              <span key={i} className="closing-word inline-block mr-[0.15em] text-king-white opacity-0">
                {word}
              </span>
            ))}
            <br />
            {["IT'S"].map((word, i) => (
              <span key={i} className="closing-word inline-block mr-[0.15em] text-king-white opacity-0">
                {word}
              </span>
            ))}
            {['EARNED.'].map((word, i) => (
              <span
                key={i}
                className="closing-word inline-block opacity-0"
                style={{
                  background: 'linear-gradient(135deg, #C0C0C0, #E8E8E8, #C0C0C0)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'shimmer 3s linear infinite',
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="text-king-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light"
        >
          Every run scored at 4 AM. Every sprint when the body said stop.
          Every century when it mattered most. This is not luck.
          This is <em className="text-king-gold not-italic font-medium">Virat Kohli</em>.
        </motion.p>

        {/* CTA cluster */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#collection" className="btn-primary px-10 py-4 text-sm rounded-sm inline-block">
            Shop The Collection
          </a>
          <a href="#hero" className="btn-secondary px-10 py-4 text-sm rounded-sm inline-block">
            Back to Top
          </a>
        </motion.div>

        {/* ONE8 large watermark */}
        <div
          className="mt-20 font-display text-[18vw] select-none pointer-events-none"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'rgba(201,168,76,0.03)',
            lineHeight: 1,
            letterSpacing: '0.1em',
          }}
        >
          ONE8
        </div>
      </div>
    </section>
  )
}
