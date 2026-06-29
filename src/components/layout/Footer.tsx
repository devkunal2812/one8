'use client'

import { motion } from 'framer-motion'

const LINKS = {
  Explore: ['Collection','The Journey','Stats','King\'s Lab','Locker Room'],
  Connect: ['Instagram','Twitter / X','YouTube','Newsletter'],
  Legal:   ['Fan Disclaimer','Privacy Policy','Terms of Use'],
}

const SOCIAL = [
  { label:'IG', href:'https://www.instagram.com/virat.kohli/' },
  { label:'TW', href:'https://twitter.com/imVkohli' },
  { label:'YT', href:'https://www.youtube.com/@ViratKohli' },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#060608] pt-16 pb-10"
      style={{ borderTop:'1px solid rgba(192,192,192,0.07)' }}>
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-display text-4xl mb-1"
              style={{ fontFamily:'var(--font-display)', background:'linear-gradient(90deg,#C0C0C0,#E8E8E8,#C0C0C0)', backgroundSize:'200% auto', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', animation:'shimmer 3s linear infinite' }}>
              ONE8
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] mb-5" style={{ color:'rgba(192,192,192,0.45)' }}>
              King Edition
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mb-6">
              A fan-made tribute to Virat Kohli's extraordinary journey from Delhi's streets to cricket's throne.
            </p>
            <div className="flex gap-3">
              {SOCIAL.map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-[10px] transition-all duration-250"
                  style={{ border:'1px solid rgba(192,192,192,0.18)', color:'rgba(192,192,192,0.45)' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#C0C0C0';(e.currentTarget as HTMLElement).style.color='#C0C0C0'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(192,192,192,0.18)';(e.currentTarget as HTMLElement).style.color='rgba(192,192,192,0.45)'}}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] mb-5" style={{ color:'#C0C0C0' }}>
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a href={item==='Locker Room'?'/locker-room':'#'}
                      className="text-sm text-white/35 font-light transition-colors duration-200 hover:text-white/70">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-7" style={{ background:'linear-gradient(90deg,transparent,rgba(192,192,192,0.2),transparent)' }}/>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">
            2024 ONE8 Fan Concept - UI/UX Portfolio Project
          </p>
          <p className="font-mono text-[10px] text-white/15 text-center md:text-right max-w-sm leading-relaxed">
            Not affiliated with Virat Kohli, ONE8 or PUMA India.
            All trademarks belong to their respective owners.
          </p>
        </div>

        {/* ONE8 watermark */}
        <div className="text-center mt-10 font-display select-none pointer-events-none"
          style={{ fontFamily:'var(--font-display)', fontSize:'clamp(4rem,12vw,9rem)', color:'rgba(192,192,192,0.025)', lineHeight:1, letterSpacing:'0.1em' }}>
          ONE8
        </div>
      </div>
    </footer>
  )
}
