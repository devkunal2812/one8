'use client'

import { useEffect, useRef } from 'react'

/**
 * CustomCursor
 * A two-part cursor: small gold dot + larger tracking ring.
 * Expands on hover over interactive elements.
 */
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current!
    const ring = ringRef.current!

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    // Smooth ring follow
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      requestAnimationFrame(animateRing)
    }
    animateRing()

    // Expand on interactive elements
    const onEnter = () => {
      ring.style.width  = '60px'
      ring.style.height = '60px'
      ring.style.borderColor = 'rgba(201,168,76,0.9)'
      ring.style.background  = 'rgba(201,168,76,0.05)'
    }
    const onLeave = () => {
      ring.style.width  = '40px'
      ring.style.height = '40px'
      ring.style.borderColor = 'rgba(201,168,76,0.6)'
      ring.style.background  = 'transparent'
    }

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block"
        style={{ transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease' }}
      />
    </>
  )
}
