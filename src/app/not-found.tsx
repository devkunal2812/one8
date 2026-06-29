'use client'

import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-6"
      style={{ background: '#060608' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(192,192,192,0.05) 0%, transparent 70%)',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* 404 */}
        <div className="font-display leading-none select-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(7rem, 20vw, 14rem)',
            background: 'linear-gradient(135deg, #C0C0C0, #E8E8E8, #C0C0C0)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 3s linear infinite',
          }}>
          404
        </div>

        {/* ONE8 bar */}
        <div className="font-mono text-xs uppercase tracking-[0.5em] text-white/30">
          ONE8 - King Edition
        </div>

        {/* Message */}
        <h1 className="font-display text-white mt-2" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          PAGE NOT FOUND
        </h1>
        <p className="text-white/40 text-sm leading-relaxed max-w-sm">
          Even the king takes a wrong turn sometimes. This page doesn't exist, but greatness awaits elsewhere.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <a href="/" className="btn-primary px-8 py-3.5 text-sm rounded-sm">
            Back to Home
          </a>
          <a href="/locker-room" className="btn-secondary px-8 py-3.5 text-sm rounded-sm">
            Locker Room
          </a>
        </div>
      </motion.div>

      {/* Watermark */}
      <div className="absolute bottom-12 font-display select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 14vw, 10rem)', color: 'rgba(192,192,192,0.025)', lineHeight: 1 }}>
        ONE8
      </div>
    </div>
  )
}
