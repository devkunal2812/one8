'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const PRODUCTS = [
  {
    id: 'king-i',
    name: 'King I',
    subtitle: 'The Origin',
    price: '₹12,999',
    tag: 'Bestseller',
    tagColor: '#C9A84C',
    colors: ['#111111', '#C9A84C', '#C0392B'],
    description: 'Where the legacy began. Engineered for the striker who never looks back.',
    specs: ['Carbon Fiber Shank', 'React Foam Midsole', 'Grip-Lock Outsole'],
  },
  {
    id: 'king-ii',
    name: 'King II',
    subtitle: 'The Evolution',
    price: '₹14,999',
    tag: 'New Drop',
    tagColor: '#C0392B',
    colors: ['#1a1a2e', '#E8C97A', '#ffffff'],
    description: 'Second-generation dominance. Lighter. Faster. More aggressive.',
    specs: ['Hyperflex Upper', 'Gold Stitch Detail', 'Ultra Grip Base'],
  },
  {
    id: 'king-iii',
    name: 'King III',
    subtitle: 'The Apex',
    price: '₹17,499',
    tag: 'Limited',
    tagColor: '#8B5CF6',
    colors: ['#0a0a0a', '#d4af37', '#1a1a1a'],
    description: 'The pinnacle. 24K Gold detailing. Only 1800 pairs. Ever.',
    specs: ['24K Gold Accents', 'Full-grain Leather', 'Hand-crafted Upper'],
  },
]

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [activeColor, setActiveColor] = useState(0)
  const [viewing360, setViewing360]   = useState(false)
  const [rotAngle,   setRotAngle]     = useState(0)
  const dragStart = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStart.current = e.clientX
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart.current === null) return
    const delta = e.clientX - dragStart.current
    setRotAngle(prev => prev + delta * 0.5)
    dragStart.current = e.clientX
  }
  const handleMouseUp = () => { dragStart.current = null }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="product-card glass-card overflow-hidden group relative"
    >
      {/* Tag */}
      <div
        className="absolute top-4 left-4 z-20 px-3 py-1 rounded-sm font-mono text-[10px] tracking-widest uppercase text-king-black font-semibold"
        style={{ background: product.tagColor }}
      >
        {product.tag}
      </div>

      {/* Image / 360 viewer area */}
      <div
        className="relative h-52 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ background: `radial-gradient(ellipse at center, ${product.colors[activeColor]}33 0%, transparent 70%)` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Simulated shoe silhouette */}
        <div
          className="relative transition-all duration-300"
          style={{ transform: `rotateY(${rotAngle}deg)` }}
        >
          <svg width="220" height="110" viewBox="0 0 220 110" fill="none">
            {/* Sole */}
            <ellipse cx="108" cy="95" rx="95" ry="12" fill={product.colors[activeColor]} opacity="0.9"/>
            {/* Midsole */}
            <rect x="20" y="78" width="185" height="14" rx="7" fill="#C9A84C" opacity="0.8"/>
            {/* Upper */}
            <path d="M20 78 Q40 40 80 32 Q120 22 160 30 Q190 36 200 50 L200 78 Z"
              fill={product.colors[activeColor]} opacity="0.95"/>
            {/* Toe */}
            <ellipse cx="195" cy="64" rx="18" ry="14" fill={product.colors[activeColor]}/>
            {/* Laces */}
            <line x1="90" y1="34" x2="90" y2="75" stroke="#E8C97A" strokeWidth="2" strokeDasharray="4 4"/>
            <line x1="110" y1="31" x2="110" y2="75" stroke="#E8C97A" strokeWidth="2" strokeDasharray="4 4"/>
            <line x1="130" y1="30" x2="130" y2="75" stroke="#E8C97A" strokeWidth="2" strokeDasharray="4 4"/>
            <line x1="150" y1="31" x2="150" y2="75" stroke="#E8C97A" strokeWidth="2" strokeDasharray="4 4"/>
            {/* ONE8 text */}
            <text x="50" y="68" fontFamily="monospace" fontSize="11" fill="#C9A84C" opacity="0.9">ONE8</text>
          </svg>
        </div>

        {/* 360 hint */}
        <div className="absolute bottom-2 right-3 font-mono text-[9px] text-king-white/30 tracking-widest">
          ↔ DRAG TO ROTATE
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-4">
        {/* Title row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-king-gold">{product.subtitle}</div>
            <h3 className="font-display text-3xl text-king-white mt-1" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h3>
          </div>
          <span className="font-display text-2xl text-king-gold" style={{ fontFamily: 'var(--font-display)' }}>
            {product.price}
          </span>
        </div>

        {/* Description */}
        <p className="text-king-white/50 text-sm leading-relaxed">{product.description}</p>

        {/* Color picker */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-king-white/30">Color</span>
          <div className="flex gap-2">
            {product.colors.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveColor(i)}
                className="w-5 h-5 rounded-full border-2 transition-all duration-200"
                style={{
                  background:   c,
                  borderColor:  activeColor === i ? '#C9A84C' : 'transparent',
                  boxShadow:    activeColor === i ? '0 0 8px rgba(201,168,76,0.5)' : 'none',
                }}
                aria-label={`Color ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-2">
          {product.specs.map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-wider text-king-gold/70 border border-king-gold/20">
              {s}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button className="btn-primary w-full py-3.5 text-sm rounded-sm mt-1">
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}

export default function CollectionSection() {
  return (
    <section id="collection" className="section-padding overflow-hidden bg-king-dark">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[0.5em] uppercase text-king-gold block mb-4">
            Signature Line
          </span>
          <h2 className="font-display text-[3.5rem] md:text-[5.5rem] text-king-white leading-none"
            style={{ fontFamily: 'var(--font-display)' }}>
            THE{' '}
            <span className="text-gold-shimmer" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
              COLLECTION
            </span>
          </h2>
          <p className="text-king-white/40 text-sm mt-4 max-w-md mx-auto">
            Three silhouettes. One obsession. Crafted for those who refuse to be ordinary.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
