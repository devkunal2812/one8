'use client'

import { useEffect, useRef } from 'react'

/**
 * CustomCursor
 * Silver dot + tracking ring. Works on all pointer devices.
 * Uses direct transform instead of state to avoid React re-render lag.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only on non-touch devices
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Show cursors (hidden by default in CSS)
    dot.style.opacity  = '1'
    ring.style.opacity = '1'

    let mouseX = window.innerWidth  / 2
    let mouseY = window.innerHeight / 2
    let ringX  = mouseX
    let ringY  = mouseY
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Dot follows instantly
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    // Ring follows with lerp
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.12)
      ringY = lerp(ringY, mouseY, 0.12)
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      rafId = requestAnimationFrame(animateRing)
    }
    rafId = requestAnimationFrame(animateRing)

    // Expand ring on interactive elements
    const expand = () => {
      ring.style.width       = '56px'
      ring.style.height      = '56px'
      ring.style.borderColor = 'rgba(192,192,192,0.9)'
      ring.style.background  = 'rgba(192,192,192,0.06)'
      dot.style.transform    = dot.style.transform + ' scale(1.5)'
    }
    const shrink = () => {
      ring.style.width       = '40px'
      ring.style.height      = '40px'
      ring.style.borderColor = 'rgba(192,192,192,0.5)'
      ring.style.background  = 'transparent'
    }

    // Use event delegation on document instead of querying all elements
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [role="button"], input, select, textarea')) expand()
    }
    const onLeave = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, [role="button"], input, select, textarea')) shrink()
    }

    // Hide default cursor on body
    document.body.style.cursor = 'none'

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseover',  onEnter,  { passive: true })
    document.addEventListener('mouseout',   onLeave,  { passive: true })

    return () => {
      document.body.style.cursor = ''
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover',  onEnter)
      document.removeEventListener('mouseout',   onLeave)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="hidden md:block"
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '8px',
          height:          '8px',
          borderRadius:    '50%',
          background:      '#C0C0C0',
          pointerEvents:   'none',
          zIndex:          99999,
          opacity:         0,
          willChange:      'transform',
          transition:      'transform 0.05s linear',
          mixBlendMode:    'difference',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="hidden md:block"
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           '40px',
          height:          '40px',
          borderRadius:    '50%',
          border:          '1px solid rgba(192,192,192,0.5)',
          pointerEvents:   'none',
          zIndex:          99998,
          opacity:         0,
          willChange:      'transform',
          transition:      'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        }}
      />
    </>
  )
}
