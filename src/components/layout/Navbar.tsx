'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Story',      href: '#journey'        },
  { label: 'Collection', href: '#collection'      },
  { label: 'Stats',      href: '#stats'           },
  { label: 'Experience', href: '#fan-experience'  },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      // Active section detection
      const sections = ['journey','collection','stats','fan-experience']
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        padding:       scrolled ? '10px 0' : '18px 0',
        background:    scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter:scrolled ? 'blur(20px)' : 'none',
        borderBottom:  scrolled ? '1px solid rgba(192,192,192,0.08)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-display text-2xl tracking-widest text-gold-shimmer"
            style={{ fontFamily:'var(--font-display)', backgroundSize:'200% auto', animation:'shimmer 3s linear infinite' }}>
            ONE8
          </span>
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] mt-1" style={{ color:'rgba(192,192,192,0.5)' }}>
            King Edition
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.replace('#','')
            return (
              <li key={link.href}>
                <a href={link.href}
                  className="relative font-mono text-sm tracking-[0.1em] uppercase transition-colors duration-300"
                  style={{ color: isActive ? '#C0C0C0' : 'rgba(255,255,255,0.55)' }}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                    style={{ width: isActive ? '100%' : '0', background:'#C0C0C0' }} />
                </a>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/locker-room"
            className="font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-sm transition-all duration-200"
            style={{ color:'#C0C0C0', border:'1px solid rgba(192,192,192,0.25)' }}
            onMouseEnter={e=>(e.currentTarget.style.background='rgba(192,192,192,0.08)')}
            onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
          >
            Locker Room
          </a>
          <a href="#collection" className="btn-primary px-5 py-2.5 text-xs rounded-sm">
            Shop Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className="w-5 h-px transition-all duration-300" style={{ background:'#C0C0C0', transform: menuOpen ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
          <span className="w-5 h-px transition-all duration-300" style={{ background:'#C0C0C0', opacity: menuOpen ? 0 : 1 }} />
          <span className="w-5 h-px transition-all duration-300" style={{ background:'#C0C0C0', transform: menuOpen ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity:0, height:0 }}
            animate={{ opacity:1, height:'auto' }}
            exit={{ opacity:0, height:0 }}
            className="md:hidden glass-card-dark mx-4 mt-2 rounded-xl overflow-hidden"
          >
            <ul className="flex flex-col p-5 gap-4">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href}
                    className="font-mono text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="flex gap-3 mt-2">
                <a href="/locker-room" className="btn-secondary flex-1 py-3 text-xs rounded-sm text-center">Locker Room</a>
                <a href="#collection" className="btn-primary flex-1 py-3 text-xs rounded-sm text-center">Shop Now</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
