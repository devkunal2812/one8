import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useGSAPContext
 * Safely creates a GSAP context scoped to a ref, cleaned up on unmount.
 */
export function useGSAPContext<T extends HTMLElement>(
  callback: (ctx: gsap.Context) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(callback, ref)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps])

  return ref
}

/**
 * useMouseParallax
 * Returns an element ref; on mousemove within the container,
 * child elements with data-depth="0.3" will move at that multiplied depth.
 */
export function useMouseParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const layers = el.querySelectorAll<HTMLElement>('[data-depth]')

    const onMove = (e: MouseEvent) => {
      const rect   = el.getBoundingClientRect()
      const cx     = rect.left + rect.width  / 2
      const cy     = rect.top  + rect.height / 2
      const dx     = (e.clientX - cx) / (rect.width  / 2)  // -1 to 1
      const dy     = (e.clientY - cy) / (rect.height / 2)  // -1 to 1

      layers.forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth ?? '0.1')
        gsap.to(layer, {
          x: dx * depth * 30,
          y: dy * depth * 20,
          duration: 0.6,
          ease: 'power2.out',
        })
      })
    }

    const onLeave = () => {
      layers.forEach((layer) => {
        gsap.to(layer, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' })
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return ref
}

/**
 * useCountUp
 * Animates a number from 0 to `target` when the element enters the viewport.
 */
export function useCountUp(target: number, duration = 2000) {
  const ref   = useRef<HTMLSpanElement>(null)
  const fired = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          const start    = Date.now()
          const easeOut  = (t: number) => 1 - Math.pow(1 - t, 3)

          const tick = () => {
            const t = Math.min((Date.now() - start) / duration, 1)
            el.textContent = Math.round(easeOut(t) * target).toLocaleString('en-IN')
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return ref
}

/**
 * useScrollProgress
 * Returns a 0–1 value representing how far the user has scrolled the page.
 */
export function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return progress
}
