'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScrollProvider
 * Wraps the app with Lenis smooth scrolling.
 * Integrates with GSAP ScrollTrigger via requestAnimationFrame.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration:   1.4,
      easing:     (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
    })

    lenisRef.current = lenis

    // Expose to window so GSAP ScrollTrigger can use it
    ;(window as typeof window & { lenis: Lenis }).lenis = lenis

    // RAF loop
    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
