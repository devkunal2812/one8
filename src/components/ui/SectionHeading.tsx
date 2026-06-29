'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow:   string
  title:     string           // plain part
  highlight: string           // gold-shimmer part
  subtitle?: string
  align?:    'left' | 'center' | 'right'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const alignClass = {
    left:   'text-left items-start',
    center: 'text-center items-center',
    right:  'text-right items-end',
  }[align]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn('flex flex-col gap-4', alignClass, className)}
    >
      {/* Eyebrow */}
      <div className="flex items-center gap-3">
        {align !== 'right' && <span className="w-8 h-px bg-white/40" />}
        <span className="font-mono text-xs tracking-[0.5em] uppercase text-white/60">
          {eyebrow}
        </span>
        {align !== 'left' && <span className="w-8 h-px bg-white/40" />}
      </div>

      {/* Headline */}
      <h2
        className="font-display leading-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.8rem, 7vw, 6rem)',
        }}
      >
        <span className="text-white">{title} </span>
        <span
          className="text-gold-shimmer"
          style={{
            backgroundSize: '200% auto',
            animation: 'shimmer 3s linear infinite',
          }}
        >
          {highlight}
        </span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-white/40 text-sm md:text-base max-w-md leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
