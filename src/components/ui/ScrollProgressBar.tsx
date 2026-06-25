'use client'

import { useEffect, useState } from 'react'

/**
 * ScrollProgressBar
 * A thin gold bar at the top of the viewport that fills as the user scrolls.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #C0C0C0, #E8E8E8)',
          boxShadow: '0 0 8px rgba(201,168,76,0.8)',
        }}
      />
    </div>
  )
}
