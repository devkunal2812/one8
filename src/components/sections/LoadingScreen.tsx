'use client'

import { useEffect, useRef, useState } from 'react'

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase]         = useState<'dark'|'particles'|'lights'|'text'|'done'>('dark')
  const [lightsOn,  setLightsOn]  = useState(0)
  const [textAlpha, setTextAlpha] = useState(0)

  /* particle canvas */
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    let active = true

    interface P { x:number; y:number; vx:number; vy:number; r:number; a:number; life:number }
    const pts: P[] = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 60,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 1.4 + 0.4),
      r: Math.random() * 2 + 0.5,
      a: Math.random() * 0.7 + 0.2,
      life: Math.random(),
    }))

    const draw = () => {
      if (!active) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.life -= 0.0025
        if (p.y < -10 || p.life <= 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 5
          p.life = 1
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192,192,192,${p.a * p.life})`
        ctx.fill()
      })
      requestAnimationFrame(draw)
    }
    draw()
    return () => { active = false }
  }, [])

  /* phase timeline */
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase('particles'), 300),
      setTimeout(() => setPhase('lights'), 1200),
      setTimeout(() => {
        let l = 0
        const iv = setInterval(() => { l = Math.min(l + 0.03, 1); setLightsOn(l); if (l >= 1) clearInterval(iv) }, 25)
      }, 1200),
      setTimeout(() => {
        setPhase('text')
        let a = 0
        const iv = setInterval(() => { a = Math.min(a + 0.04, 1); setTextAlpha(a); if (a >= 1) clearInterval(iv) }, 20)
      }, 2400),
      setTimeout(() => setPhase('done'), 3900),
      setTimeout(() => onComplete(), 4500),
    ]
    return () => t.forEach(clearTimeout)
  }, [onComplete])

  if (phase === 'done') return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060608]"
      style={{ opacity: phase === 'done' ? 0 : 1, transition: 'opacity 0.6s ease' }}>

      {/* particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* stadium lights */}
      {phase !== 'dark' && (
        <div className="absolute inset-0 pointer-events-none" style={{
          opacity: lightsOn * 0.3,
          background: `
            radial-gradient(ellipse 55% 35% at 18% 0%, rgba(192,192,192,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 55% 35% at 82% 0%, rgba(192,192,192,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 35% 25% at 50% 0%, rgba(255,255,255,0.3) 0%, transparent 55%)
          `,
        }} />
      )}

      {/* center */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* ONE8 wordmark */}
        <div
          className="font-display tracking-[0.45em] text-white"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem,10vw,6rem)',
            opacity: phase === 'dark' ? 0 : Math.min(lightsOn * 2, 1),
            transition: 'opacity 0.4s ease',
            textShadow: `0 0 ${lightsOn * 70}px rgba(192,192,192,${lightsOn * 0.7}), 0 0 ${lightsOn * 140}px rgba(192,192,192,${lightsOn * 0.3})`,
          }}
        >
          ONE8
        </div>

        {/* tagline */}
        <div className="font-mono text-sm md:text-base uppercase tracking-[0.55em] text-white/80"
          style={{ opacity: textAlpha }}>
          Greatness Awaits.
        </div>

        {/* progress bar */}
        <div className="w-40 h-px mt-3 rounded-full overflow-hidden" style={{ background: 'rgba(192,192,192,0.15)' }}>
          <div className="h-full rounded-full transition-none"
            style={{
              width: `${lightsOn * 100}%`,
              background: 'linear-gradient(90deg, #C0C0C0, #E8E8E8)',
              boxShadow: '0 0 10px rgba(192,192,192,0.9)',
            }} />
        </div>
      </div>
    </div>
  )
}
