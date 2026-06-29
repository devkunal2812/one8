'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el  = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    // Listen on both scroll and Lenis scroll
    window.addEventListener('scroll', update, { passive: true })
    // Also hook into Lenis if available
    const interval = setInterval(() => {
      const lenis = (window as any).lenis
      if (lenis) {
        clearInterval(interval)
        lenis.on('scroll', ({ progress: p }: { progress: number }) => {
          setProgress(p * 100)
        })
      }
    }, 500)
    return () => {
      window.removeEventListener('scroll', update)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[9000] h-[2px] pointer-events-none">
      <div
        className="h-full transition-none will-change-transform"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #C0C0C0, #E8E8E8, #fff)',
          boxShadow: '0 0 6px rgba(192,192,192,0.8)',
        }}
      />
    </div>
  )
}
