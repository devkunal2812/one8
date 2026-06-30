'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ElevateSection() {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const sectionRef  = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Multiple event fallbacks - different browsers fire different events
    const markLoaded = () => setLoaded(true)
    video.addEventListener('loadeddata',   markLoaded)
    video.addEventListener('loadedmetadata', markLoaded)
    video.addEventListener('canplay',      markLoaded)
    video.addEventListener('canplaythrough', markLoaded)

    // If video is already ready (cached) when this runs
    if (video.readyState >= 2) markLoaded()

    // Safety net - never show skeleton forever
    const safety = setTimeout(markLoaded, 3000)

    // Auto-play when in view, pause when out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(video)

    return () => {
      observer.disconnect()
      clearTimeout(safety)
      video.removeEventListener('loadeddata',   markLoaded)
      video.removeEventListener('loadedmetadata', markLoaded)
      video.removeEventListener('canplay',      markLoaded)
      video.removeEventListener('canplaythrough', markLoaded)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#08080a' }}
    >
      {/* Top fade from previous section */}
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
            className="text-center mb-14"
          >
            <span className="font-mono text-xs tracking-[0.5em] uppercase block mb-4" style={{ color: '#C0C0C0' }}>
              Everyday Performance
            </span>
            <h2
              className="font-display leading-none text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
            >
              ELEVATE YOUR{' '}
              <span style={{
                background: 'linear-gradient(90deg, #C0C0C0, #E8E8E8, #C0C0C0)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
              }}>
                EVERYDAY
              </span>
            </h2>
            <p className="text-white/40 text-sm mt-4 max-w-lg mx-auto">
              From the crease to the street — built to move with you through every part of the day.
            </p>
          </motion.div>

          {/* Video showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative max-w-2xl mx-auto"
          >
            {/* Silver glow behind video */}
            <div className="absolute -inset-6 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 60% at center, rgba(192,192,192,0.08) 0%, transparent 70%)' }} />

            {/* Video frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(192,192,192,0.1)',
                background: '#0a0a0a',
              }}
            >
              {/* Loading skeleton */}
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10"
                  style={{ background: '#0a0a0a', aspectRatio: '1/1', maxHeight: '70vh', margin: '0 auto' }}>
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white/10 animate-spin"
                      style={{ borderTopColor: '#C0C0C0' }} />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">Loading</span>
                  </div>
                </div>
              )}

              <video
                ref={videoRef}
                src="/videos/animo-wheel-carousel-2160p(1).mp4"
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-auto block"
                style={{ aspectRatio: '1/1', objectFit: 'contain', background: '#0a0a0a', maxHeight: '70vh', margin: '0 auto' }}
              />

              {/* Subtle overlay for cohesion with theme */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 70%, rgba(8,8,10,0.4) 100%)' }} />
            </div>

            {/* Caption strip */}
            <div className="flex items-center justify-between mt-4 px-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                ONE8 Collection - Motion Showcase
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#C0C0C0' }}>
                Auto-play
              </span>
            </div>
          </motion.div>

          {/* Feature chips below video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {['Cricket Ready', 'Street Style', 'All-Day Comfort', 'Performance Engineered'].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider"
                style={{
                  border: '1px solid rgba(192,192,192,0.2)',
                  color: 'rgba(192,192,192,0.7)',
                  background: 'rgba(192,192,192,0.03)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(0deg, #0A0A0A 0%, transparent 100%)' }} />
    </section>
  )
}
