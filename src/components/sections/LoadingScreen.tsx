'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  onComplete: () => void
}

/**
 * LoadingScreen
 * Cinematic black screen → particle field → stadium lights gradually on → "Greatness Awaits."
 */
export default function LoadingScreen({ onComplete }: Props) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase]   = useState<'dark' | 'particles' | 'lights' | 'text' | 'exit'>('dark')
  const [textOpacity, setTextOpacity] = useState(0)
  const [lightsOn,    setLightsOn]    = useState(0) // 0–1

  // ── Particle system ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    interface Particle {
      x: number; y: number
      vx: number; vy: number
      size: number; opacity: number; life: number
    }

    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x:       Math.random() * canvas.width,
      y:       canvas.height + Math.random() * 100,
      vx:      (Math.random() - 0.5) * 0.6,
      vy:      -(Math.random() * 1.5 + 0.5),
      size:    Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      life:    Math.random(),
    }))

    let active = true

    const draw = () => {
      if (!active) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x    += p.vx
        p.y    += p.vy
        p.life  -= 0.003

        if (p.y < -20 || p.life <= 0) {
          p.x      = Math.random() * canvas.width
          p.y      = canvas.height + 10
          p.life   = 1
          p.vx     = (Math.random() - 0.5) * 0.6
          p.vy     = -(Math.random() * 1.5 + 0.5)
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192,192,192,${p.opacity * p.life})`
        ctx.fill()
      }

      requestAnimationFrame(draw)
    }

    draw()
    return () => { active = false }
  }, [])

  // ── Phase timeline ───────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('particles'), 400)
    const t2 = setTimeout(() => setPhase('lights'),    1600)
    // Lights ramp up
    const t3 = setTimeout(() => {
      let l = 0
      const ramp = setInterval(() => {
        l = Math.min(l + 0.04, 1)
        setLightsOn(l)
        if (l >= 1) clearInterval(ramp)
      }, 30)
    }, 1600)
    const t4 = setTimeout(() => {
      setPhase('text')
      setTextOpacity(0)
      let o = 0
      const fade = setInterval(() => {
        o = Math.min(o + 0.04, 1)
        setTextOpacity(o)
        if (o >= 1) clearInterval(fade)
      }, 25)
    }, 2600)
    const t5 = setTimeout(() => setPhase('exit'), 4200)
    const t6 = setTimeout(() => onComplete(),     5000)

    return () => [t1,t2,t3,t4,t5,t6].forEach(clearTimeout)
  }, [onComplete])

  if (phase === 'exit') return null  // unmount after fade

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        background: '#0A0A0A',
        opacity:    1,
        transition: 'opacity 0.8s ease',
      }}
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Stadium light rays */}
      {phase !== 'dark' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: lightsOn * 0.35,
            background: `
              radial-gradient(ellipse 60% 40% at 15% 0%,  rgba(192,192,192,0.5) 0%, transparent 70%),
              radial-gradient(ellipse 60% 40% at 85% 0%,  rgba(192,192,192,0.5) 0%, transparent 70%),
              radial-gradient(ellipse 40% 30% at 50% 0%,  rgba(255,240,200,0.3) 0%, transparent 60%)
            `,
            transition: 'opacity 0.1s linear',
          }}
        />
      )}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* ONE8 logomark */}
        <div
          className="font-display text-6xl md:text-8xl tracking-[0.4em] text-king-gold"
          style={{
            opacity:    phase === 'dark' ? 0 : Math.min(lightsOn * 2, 1),
            transition: 'opacity 0.5s ease',
            textShadow: `0 0 ${lightsOn * 60}px rgba(192,192,192,${lightsOn * 0.8})`,
          }}
        >
          ONE8
        </div>

        {/* Tagline */}
        <div
          className="font-mono text-sm md:text-base tracking-[0.6em] uppercase text-king-white"
          style={{ opacity: textOpacity, transition: 'none', letterSpacing: '0.6em' }}
        >
          Greatness Awaits.
        </div>

        {/* Loading bar */}
        <div className="w-48 h-px bg-king-gray mt-4 overflow-hidden">
          <div
            className="h-full bg-king-gold"
            style={{
              width:      `${lightsOn * 100}%`,
              transition: 'width 0.1s linear',
              boxShadow:  '0 0 8px rgba(192,192,192,0.8)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
