'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Real ONE8 products — data fetched directly from one8.com
const PRODUCTS = [
  {
    id:       'cover-drive-18-pro',
    name:     'Cover Drive 18 Pro',
    subtitle: 'Cricket / High Performance',
    price:    '₹13,999',
    tag:      'Virat\'s Pick',
    tagColor: '#C0C0C0',
    tagText:  '#0A0A0A',
    image:    'https://one8.com/cdn/shop/files/V10015001_03_6d97ac06-93e4-46c0-b7ee-12a9ae14bd22.jpg?v=1781597662',
    link:     'https://one8.com/products/cover-drive-18-pro-men-high-performance',
    colors:   ['#1a1a1a', '#C0C0C0', '#C0392B'],
    description: 'Co-created with Virat Kohli. Breathable mono mesh upper with synthetic overlays for toe protection. PWR+LCK heel-lock collar. TPU shank for torsional rigidity at the crease.',
    specs: ['PWR+LCK Heel Lock', 'TPU Boom Shank', 'Mono Mesh Upper', 'Cricket Spike Outsole'],
  },
  {
    id:       'boom-rush-women',
    name:     'Boom Rush',
    subtitle: 'Women / Hybrid Training',
    price:    '₹9,999',
    tag:      'New Drop',
    tagColor: '#C0392B',
    tagText:  '#ffffff',
    image:    'https://one8.com/cdn/shop/files/V10012103_03_6ed3c120-1393-48c7-a8d5-d5ead9eb08eb.jpg?v=1781597511',
    link:     'https://one8.com/products/boom-rush-women-mint-green-classic-white',
    colors:   ['#a8e6cf', '#ffffff', '#1a1a1a'],
    description: 'Built for the hybrid athlete. Highly responsive Boom Foam midsole propels you forward. Sonic Grip outsole for advanced traction. Engineered to dominate running and workouts both.',
    specs: ['Boom Foam Midsole', 'Sonic Grip Outsole', 'Multi-activity Trainer', 'Women\'s Fit'],
  },
  {
    id:       'seam-pavilion',
    name:     'Seam Pavilion',
    subtitle: 'Men / Lifestyle Sneaker',
    price:    '₹6,999',
    tag:      'Bestseller',
    tagColor: '#4B5563',
    tagText:  '#ffffff',
    image:    'https://one8.com/cdn/shop/files/V10021002_03_9c2f28ab-19e7-48e5-bfe5-d40c5f563963.jpg?v=1781598539',
    link:     'https://one8.com/products/seam-pavilion-mens-black',
    colors:   ['#0a0a0a', '#2a2a2a', '#C0C0C0'],
    description: 'A modern classic inspired by retro cricket shoes of the 70s and 80s. Laceless in build, refined in finish. Made for stylishly stepping in and out of your everyday.',
    specs: ['Laceless Design', 'Retro Cricket Inspired', 'Premium Finish', 'All-day Comfort'],
  },
]

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [activeColor, setActiveColor] = useState(0)
  const [rotAngle, setRotAngle] = useState(0)
  const dragStart = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent) => { dragStart.current = e.clientX }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStart.current === null) return
    setRotAngle(prev => prev + (e.clientX - dragStart.current!) * 0.25)
    dragStart.current = e.clientX
  }
  const handleMouseUp = () => { dragStart.current = null }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="product-card glass-card overflow-hidden group relative flex flex-col"
    >
      {/* Tag */}
      <div
        className="absolute top-4 left-4 z-20 px-3 py-1 rounded-sm font-mono text-[10px] tracking-widest uppercase font-semibold"
        style={{ background: product.tagColor, color: product.tagText }}
      >
        {product.tag}
      </div>

      {/* Shoe image */}
      <div
        className="relative h-56 overflow-hidden cursor-grab active:cursor-grabbing bg-[#0f0f0f]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="w-full h-full"
          style={{ transform: `perspective(800px) rotateY(${rotAngle * 0.04}deg)` }}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/70 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(192,192,192,0.05) 0%, transparent 70%)' }} />
        <div className="absolute bottom-2 right-3 font-mono text-[9px] text-white/25 tracking-widest pointer-events-none">
          DRAG TO ROTATE
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40">{product.subtitle}</div>
            <h3 className="font-display text-2xl text-white mt-1" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h3>
          </div>
          <div className="font-display text-xl" style={{ color: '#C0C0C0', fontFamily: 'var(--font-display)' }}>
            {product.price}
          </div>
        </div>

        <p className="text-white/50 text-sm leading-relaxed flex-1">{product.description}</p>

        {/* Color swatches */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">Color</span>
          <div className="flex gap-2">
            {product.colors.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveColor(i)}
                className="w-5 h-5 rounded-full border-2 transition-all duration-200"
                style={{
                  background: c,
                  borderColor: activeColor === i ? '#C0C0C0' : 'rgba(255,255,255,0.1)',
                  boxShadow: activeColor === i ? '0 0 8px rgba(192,192,192,0.5)' : 'none',
                }}
                aria-label={`Color ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-2">
          {product.specs.map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-wider text-white/40 border border-white/10">
              {s}
            </span>
          ))}
        </div>

        <a
          href={product.link}
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
            Official Products
          </span>
          <h2 className="font-display text-[3.5rem] md:text-[5.5rem] text-white leading-none"
            style={{ fontFamily: 'var(--font-display)' }}>
            THE{' '}
            <span style={{
              background: 'linear-gradient(90deg, #C0C0C0, #E8E8E8, #C0C0C0)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}>
              COLLECTION
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
            Three silhouettes. One obsession. Crafted for those who refuse to be ordinary.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* Show More button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-3 mt-12"
        >
          <a
            href="https://one8.com/collections/shoes"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-10 py-4 text-sm rounded-sm inline-flex items-center gap-3 group"
          >
            <span>View Full Collection</span>
            {/* Arrow SVG */}
            <svg
              viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            >
              <path d="M4 10h12M11 5l5 5-5 5" />
            </svg>
          </a>
          <p className="font-mono text-[10px] text-white/20 tracking-wider">
            20+ styles available on one8.com
          </p>
        </motion.div>

        <p className="text-center font-mono text-[10px] text-white/15 mt-6 tracking-wider">
          Fan concept project. Product data sourced from one8.com. Visit one8.com for official purchase.
        </p>
      </div>
    </section>
  )
}
