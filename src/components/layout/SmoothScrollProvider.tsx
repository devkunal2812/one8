'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Disable Lenis on touch/mobile devices — native scroll is better
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis({
      duration:        1.2,
      easing:          (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:     true,
      wheelMultiplier: 1.0,
    })

    lenisRef.current = lenis
    ;(window as typeof window & { lenis: Lenis }).lenis = lenis

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
