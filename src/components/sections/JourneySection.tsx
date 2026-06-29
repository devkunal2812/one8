'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  {
    id:      'dream',
    number:  '01',
    title:   'The Dream',
    year:    '1999',
    quote:   'I just wanted to play cricket. That was my only dream.',
    body:    'A boy from Uttam Nagar, Delhi  -  who lost his father during a Ranji match and walked back to the crease and scored 90. That night taught him what hunger truly means.',
    accent:  '#C0C0C0',
    align:   'left',
  },
  {
    id:      'grind',
    number:  '02',
    title:   'The Grind',
    year:    '2008–2012',
    quote:   'When you work hard and dedicate yourself, you\'ll get results.',
    body:    'From a chubby kid mocked at nets to the fittest cricketer on the planet. He rewrote his body, his diet, his entire identity  -  and became the gold standard of athletic discipline in Indian sport.',
    accent:  '#C0C0C0',
    align:   'right',
  },
  {
    id:      'champion',
    number:  '03',
    title:   'The Champion',
    year:    '2013–2019',
    quote:   'Self-belief and hard work will always earn you success.',
    body:    'ICC Player of the Year. ICC Cricketer of the Decade. Records that once seemed unreachable, broken like glass. The world stopped debating potential and started witnessing greatness.',
    accent:  '#C0C0C0',
    align:   'left',
  },
  {
    id:      'legacy',
    number:  '04',
    title:   'The Legacy',
    year:    '2020–Now',
    quote:   'My passion for the game is not going to die.',
    body:    'Beyond centuries and rankings  -  a movement. ONE8, philanthropy, fitness culture. He is no longer just a cricketer; he is a generation\'s north star.',
    accent:  '#E8E8E8',
    align:   'right',
  },
]

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section heading
      gsap.fromTo('.journey-heading',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.journey-heading', start: 'top 80%' },
        }
      )

      // Animate each card
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        const fromX = i % 2 === 0 ? -80 : 80

        gsap.fromTo(card,
          { opacity: 0, x: fromX, scale: 0.95 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end:   'top 40%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        // Year stamp counter
        gsap.fromTo(card.querySelector('.chapter-number'),
          { opacity: 0, scale: 1.5 },
          {
            opacity: 0.08, scale: 1,
            duration: 1,
            scrollTrigger: { trigger: card, start: 'top 75%' },
          }
        )
      })

      // Timeline line draw
      gsap.fromTo('.timeline-line',
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end:   'bottom 60%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative section-padding overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0D0D0D 50%, #0A0A0A 100%)' }}
    >
      {/* Background text watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-display text-[25vw] font-bold select-none"
          style={{ color: 'rgba(192,192,192,0.02)', letterSpacing: '-0.05em' }}
        >
          KING
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="journey-heading text-center mb-20">
          <span className="font-mono text-xs tracking-[0.5em] uppercase text-white/55 block mb-4">
            The Story
          </span>
          <h2 className="font-display text-[4rem] md:text-[6rem] text-white leading-none"
            style={{ fontFamily: 'var(--font-display)' }}>
            VIRAT'S
            <br />
            <span className="text-gold-shimmer" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
              JOURNEY
            </span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center spine line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-king-gray-lt/40" />
            <div
              className="timeline-line absolute inset-0"
              style={{ background: 'linear-gradient(180deg, #C0C0C0, rgba(192,192,192,0.2))' }}
            />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-16 lg:gap-24">
            {CHAPTERS.map((ch, i) => (
              <div
                key={ch.id}
                ref={(el) => { cardsRef.current[i] = el }}
                className={`relative lg:w-[46%] ${ch.align === 'right' ? 'lg:ml-auto' : ''}`}
              >
                {/* Timeline dot */}
                <div
                  className="hidden lg:block absolute top-8 w-3 h-3 rounded-full border-2 border-white/30 bg-[#0A0A0A]"
                  style={{
                    [ch.align === 'right' ? 'left' : 'right']: '-7.5%',
                    boxShadow: `0 0 12px ${ch.accent}`,
                  }}
                />

                {/* Card */}
                <div className="glass-card p-8 md:p-10 relative overflow-hidden group">
                  {/* Big chapter number watermark */}
                  <span
                    className="chapter-number absolute -top-4 -right-2 font-display text-[8rem] select-none pointer-events-none opacity-0"
                    style={{ color: ch.accent, fontFamily: 'var(--font-display)', lineHeight: 1 }}
                  >
                    {ch.number}
                  </span>

                  {/* Top row */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div>
                      <span className="font-mono text-xs tracking-[0.4em] uppercase text-white/55 block mb-1">
                        Chapter {ch.number}
                      </span>
                      <h3 className="font-display text-4xl md:text-5xl text-white"
                        style={{ fontFamily: 'var(--font-display)' }}>
                        {ch.title}
                      </h3>
                    </div>
                    <span className="font-mono text-sm text-white/30 mt-2">{ch.year}</span>
                  </div>

                  {/* Gold divider */}
                  <div className="w-12 h-px mb-6 relative z-10" style={{ background: ch.accent }} />

                  {/* Quote */}
                  <blockquote className="text-white/80 text-lg italic leading-relaxed mb-4 relative z-10 border-l-2 pl-4"
                    style={{ borderColor: ch.accent }}>
                    "{ch.quote}"
                  </blockquote>

                  {/* Body */}
                  <p className="text-white/50 text-sm leading-relaxed relative z-10">
                    {ch.body}
                  </p>

                  {/* Hover accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-700"
                    style={{ background: `linear-gradient(90deg, ${ch.accent}, transparent)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
