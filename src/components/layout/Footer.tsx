'use client'

import { motion } from 'framer-motion'

const LINKS = {
  Explore:   ['Collection', 'The Journey', 'Stats', 'Fan Experience'],
  Connect:   ['Instagram', 'Twitter / X', 'YouTube', 'Newsletter'],
  Legal:     ['Fan Disclaimer', 'Privacy Policy', 'Terms of Use'],
}

export default function Footer() {
  return (
    <footer className="relative bg-king-black pt-16 pb-24"
      style={{ borderTop: '1px solid rgba(192,192,192,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div
              className="font-display text-4xl text-gold-shimmer mb-1"
              style={{ fontFamily: 'var(--font-display)', backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}
            >
              ONE8
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] mb-6"
              style={{ color: 'rgba(192,192,192,0.5)' }}>
              King Edition
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              A fan-made tribute to Virat Kohli's extraordinary journey from Delhi's streets to cricket's pinnacle.
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              {[
                { label: 'IG', href: 'https://www.instagram.com/virat.kohli/' },
                { label: 'TW', href: 'https://twitter.com/imVkohli' },
                { label: 'YT', href: 'https://www.youtube.com/@ViratKohli' },
                { label: 'FB', href: 'https://www.facebook.com/virat.kohli' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[9px] transition-all duration-300"
                  style={{
                    border: '1px solid rgba(192,192,192,0.2)',
                    color: 'rgba(192,192,192,0.5)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#C0C0C0'
                    ;(e.currentTarget as HTMLElement).style.color = '#C0C0C0'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(192,192,192,0.2)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(192,192,192,0.5)'
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] mb-6"
                style={{ color: '#C0C0C0' }}>
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-white/40 font-light transition-colors duration-200"
                      onMouseEnter={e => (e.currentTarget.style.color = '#C0C0C0')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Silver divider */}
        <div className="w-full h-px mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(192,192,192,0.3), transparent)' }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/25">
            2024 ONE8 Fan Concept - Built for UI/UX Portfolio
          </p>
          <p className="font-mono text-[10px] text-white/20 text-center md:text-right max-w-xs leading-relaxed">
            Not affiliated with Virat Kohli, ONE8 brand, or PUMA India.
            All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
