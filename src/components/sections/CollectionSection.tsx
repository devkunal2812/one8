'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Real ONE8 shoes with actual product images from one8.com / public sources
const PRODUCTS = [
  {
    id:       'one8-pace',
    name:     'ONE8 Pace',
    subtitle: 'Running',
    price:    '₹3,999',
    mrp:      '₹5,999',
    tag:      'Bestseller',
    tagColor: '#C0C0C0',
    image:    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    colors:   ['#111111', '#C0C0C0', '#C0392B'],
    description: 'Lightweight mesh upper with responsive cushioning. Built for speed on every surface.',
    specs: ['Mesh Upper', 'EVA Midsole', 'Rubber Outsole'],
  },
  {
    id:       'one8-court',
    name:     'ONE8 Court',
    subtitle: 'Training',
    price:    '₹4,499',
    mrp:      '₹6,499',
    tag:      'New Drop',
    tagColor: '#C0392B',
    image:    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    colors:   ['#1a1a2e', '#E8E8E8', '#ffffff'],
    description: 'Court-ready silhouette with lateral support. Dominate every training session.',
    specs: ['Lateral Support', 'Non-marking Sole', 'Padded Collar'],
  },
  {
    id:       'one8-street',
    name:     'ONE8 Street',
    subtitle: 'Lifestyle',
    price:    '₹4,999',
    mrp:      '₹7,499',
    tag:      'Limited',
    tagColor: '#6B7280',
    image:    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    colors:   ['#0a0a0a', '#C0C0C0', '#1a1a1a'],
    description: 'Where the cricket ground meets the street. Premium leather upper, everyday comfort.',
    specs: ['Premium Leather', 'Memory Foam Insole', 'Cupsole Construction'],
  },
]

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [activeColor, setActiveColor] = useState(0)
  const [rotAngle,    setRotAngle]    = useState(0)
  const dragStart = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => { dragStart.current = e.clientX }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart.current === null) return
    setRotAngle(prev => prev + (e.clientX - dragStart.current!) * 0.3)
    dragStart.current = e.clientX
  }
  const handleMouseUp = () => { dragStart.current = null }

  // Discount %
  const mrpNum   = parseInt(product.mrp.replace(/[₹,]/g, ''))
  const priceNum = parseInt(product.price.replace(/[₹,]/g, ''))
  const discount = Math.round(((mrpNum - priceNum) / mrpNum) * 100)

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
        className="absolute top-4 left-4 z-20 px-3 py-1 rounded-sm font-mono text-[10px] tracking-widest uppercase font-semibold"
        style={{ background: product.tagColor, color: product.tagColor === '#C0C0C0' ? '#0A0A0A' : '#ffffff' }}
      >
        {product.tag}
      </div>

      {/* Discount badge */}
      <div className="absolute top-4 right-4 z-20 px-2 py-1 rounded-sm font-mono text-[10px] font-bold text-white"
        style={{ background: '#C0392B' }}>
        -{discount}%
      </div>

      {/* Shoe image */}
      <div
        className="relative h-52 overflow-hidden cursor-grab active:cursor-grabbing bg-king-black"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="w-full h-full transition-all duration-300"
          style={{ transform: `perspective(600px) rotateY(${rotAngle * 0.05}deg) scale(1.02)` }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-king-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-2 right-3 font-mono text-[9px] text-king-white/40 tracking-widest">
          DRAG TO ROTATE
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-4">
        {/* Title row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-king-white/40">{product.subtitle}</div>
            <h3 className="font-display text-3xl text-king-white mt-1" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <div className="font-display text-2xl" style={{ color: '#C0C0C0', fontFamily: 'var(--font-display)' }}>
              {product.price}
            </div>
            <div className="font-mono text-xs text-king-white/30 line-through">{product.mrp}</div>
          </div>
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
                  background:  c,
                  borderColor: activeColor === i ? '#C0C0C0' : 'transparent',
                  boxShadow:   activeColor === i ? '0 0 8px rgba(192,192,192,0.5)' : 'none',
                }}
                aria-label={`Color ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-2">
          {product.specs.map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-wider text-king-white/50 border border-white/10">
              {s}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://one8.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full py-3.5 text-sm rounded-sm mt-1 text-center block"
        >
          Buy on ONE8.com
        </a>
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
          <span className="font-mono text-xs tracking-[0.5em] uppercase block mb-4" style={{ color: '#C0C0C0' }}>
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

        {/* Disclaimer */}
        <p className="text-center font-mono text-[10px] text-king-white/20 mt-8 tracking-wider">
          * Fan concept project. Prices are approximate. Visit one8.com for official products.
        </p>
      </div>
    </section>
  )
}
