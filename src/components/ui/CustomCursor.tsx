'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Disable completely on touch/mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.opacity  = '1'
    ring.style.opacity = '1'
    document.body.style.cursor = 'none'

    let mouseX = window.innerWidth  / 2
    let mouseY = window.innerHeight / 2
    let ringX  = mouseX
    let ringY  = mouseY
    let rafId: number
    let isHovering = false

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.1)
      ringY = lerp(ringY, mouseY, 0.1)
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, label'
    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(INTERACTIVE)) {
        if (isHovering) return
        isHovering = true
        ring.style.width        = '48px'
        ring.style.height       = '48px'
        ring.style.borderColor  = 'rgba(192,192,192,0.85)'
        dot.style.opacity       = '0.5'
      }
    }
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(INTERACTIVE)) {
        isHovering = false
        ring.style.width       = '36px'
        ring.style.height      = '36px'
        ring.style.borderColor = 'rgba(192,192,192,0.45)'
        dot.style.opacity      = '1'
      }
    }

    window.addEventListener('mousemove',  onMouseMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout',  onMouseOut,  { passive: true })

    return () => {
      document.body.style.cursor = ''
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove',  onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout',  onMouseOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="hidden md:block"
        style={{ position:'fixed', top:0, left:0, width:8, height:8, borderRadius:'50%', background:'#E8E8E8', pointerEvents:'none', zIndex:99999, opacity:0, willChange:'transform' }} />
      <div ref={ringRef} className="hidden md:block"
        style={{ position:'fixed', top:0, left:0, width:36, height:36, borderRadius:'50%', border:'1px solid rgba(192,192,192,0.45)', pointerEvents:'none', zIndex:99998, opacity:0, willChange:'transform', transition:'width 0.25s ease, height 0.25s ease, border-color 0.25s ease' }} />
    </>
  )
}
