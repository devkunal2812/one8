'use client'

import { motion } from 'framer-motion'

const LINKS = {
  Explore:   ['Collection', 'The Journey', 'Stats', 'Fan Experience'],
  Connect:   ['Instagram', 'Twitter / X', 'YouTube', 'Newsletter'],
  Legal:     ['Fan Disclaimer', 'Privacy Policy', 'Terms of Use'],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-king-gold/10 bg-king-black pt-16 pb-24">
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
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-king-gold/50 mb-6">
              King Edition
            </div>
            <p className="text-king-white/40 text-sm leading-relaxed max-w-xs">
              A fan-made tribute to Virat Kohli's extraordinary journey from Delhi's streets to cricket's pinnacle.
            </p>
            {/* Social icons row */}
            <div className="flex gap-4 mt-6">
              {['IG', 'TW', 'YT', 'FB'].map((s) => (
                <button
                  key={s}
                  className="w-8 h-8 rounded-full border border-king-gold/20 flex items-center justify-center font-mono text-[9px] text-king-gold/50 hover:border-king-gold hover:text-king-gold transition-all duration-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-king-gold mb-6">
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-king-white/40 hover:text-king-gold transition-colors duration-200 font-light"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="gold-divider mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-king-white/25">
            © 2024 ONE8 Fan Concept · Built for UI/UX Portfolio
          </p>
          <p className="font-mono text-[10px] text-king-white/20 text-center md:text-right max-w-xs leading-relaxed">
            Not affiliated with Virat Kohli, ONE8 brand, or PUMA India.
            All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
