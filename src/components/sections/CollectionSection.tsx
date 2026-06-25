'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

// Real ONE8 products fetched from one8.com
const PRODUCTS = [
  {
    id:       'sonic-leap',
    name:     'Sonic Leap',
    subtitle: 'Badminton / Court',
    price:    '₹7,999',
    tag:      'Bestseller',
    tagColor: '#C0C0C0',
    image:    'https://one8.com/cdn/shop/files/V10015403_03.jpg?v=1781959219',
    link:     'https://one8.com/products/sonic-leap-open-air-century-blue',
    colors:   ['#1a3a5c', '#C0C0C0', '#0a0a0a'],
    description: 'Designed for elite badminton players. Mid-foot stabiliser for lateral support. Sonic Foam for impact absorption. Sonic Grip herringbone outsole for multidirectional traction.',
    specs: ['Sonic Foam Cushioning', 'Mid-foot Stabiliser', 'Herringbone Outsole', 'Engineered Mesh Upper'],
  },
  {
    id:       '25-hour-pro',
    name:     '25 Hour Pro',
    subtitle: 'Lifestyle / Active',
    price:    '₹8,999',
    tag:      'New Drop',
    tagColor: '#C0392B',
    image:    'https://one8.com/cdn/shop/files/V10019001_03.jpg?v=1781959639',
    link:     'https://one8.com/products/25-hour-classic-black-sonic-blue',
    colors:   ['#0a0a0a', '#1a3a5c', '#2a2a2a'],
    description: 'Laceless silhouette with stretch knitted upper that adapts to the foot. Activ8 pod for stability. Adaptive cushioning heel to toe. Sonic Grip outsole. Built to wear through the day and beyond.',
    specs: ['Stretch Knit Upper', 'Activ8 Pod', 'Laceless Design', 'Sonic Grip Outsole'],
  },
  {
    id:       'pro-load',
    name:     'ProLoad',
    subtitle: 'Gym / Training',
    price:    '₹8,999',
    tag:      'Fan Pick',
    tagColor: '#4B5563',
    image:    'https://one8.com/cdn/shop/files/V10015807_03.jpg?v=1781959492',
    link:     'https://one8.com/products/pro-load-track-sand',
    colors:   ['#d4c5a9', '#C0C0C0', '#2a2a2a'],
    description: 'Designed for the gym. PWRLock+ stabiliser at the heel. Midfoot Rubber Wrap for lateral hold. Sonic Grip outsole with harder heel compound. The ultimate gym shoe for the everyday athlete.',
    specs: ['PWRLock+ Heel Stabiliser', 'Midfoot Rubber Wrap', 'Ghillie Lacing', 'Hard-compound Heel Grip'],
  },
]

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const [activeColor, setActiveColor] = useState(0)
  const [rotAngle, setRotAngle]       = useState(0)
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
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="product-card glass-card overflow-hidden group relative flex flex-col"
    >
      {/* Tag */}
      <div
        className="absolute top-4 left-4 z-20 px-3 py-1 rounded-sm font-mono text-[10px] tracking-widest uppercase font-semibold"
        style={{ background: product.tagColor, color: product.tagColor === '#C0C0C0' ? '#0A0A0A' : '#ffffff' }}
      >
        {product.tag}
      </div>

      {/* Shoe image - real ONE8 CDN photo */}
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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/80 via-transparent to-transparent pointer-events-none" />
        {/* Rotate hint */}
        <div className="absolute bottom-2 right-3 font-mono text-[9px] text-white/30 tracking-widest pointer-events-none">
          DRAG TO ROTATE
        </div>
        {/* Subtle silver glow behind shoe */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 50% 60%, rgba(192,192,192,0.06) 0%, transparent 70%)` }} />
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Title + price */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/40">{product.subtitle}</div>
            <h3 className="font-display text-3xl text-white mt-1" style={{ fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h3>
          </div>
          <div className="font-display text-2xl" style={{ color: '#C0C0C0', fontFamily: 'var(--font-display)' }}>
            {product.price}
          </div>
        </div>

        {/* Description */}
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
                  background:  c,
                  borderColor: activeColor === i ? '#C0C0C0' : 'rgba(255,255,255,0.1)',
                  boxShadow:   activeColor === i ? '0 0 8px rgba(192,192,192,0.5)' : 'none',
                }}
                aria-label={`Color option ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Spec chips */}
        <div className="flex flex-wrap gap-2">
          {product.specs.map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-wider text-white/40 border border-white/10">
              {s}
            </span>
          ))}
        </div>

        {/* Buy button */}
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
            <span className="text-gold-shimmer" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite' }}>
              COLLECTION
            </span>
          </h2>
          <p className="text-white/40 text-sm mt-4 max-w-md mx-auto">
            Three silhouettes. One obsession. Crafted for those who refuse to be ordinary.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <p className="text-center font-mono text-[10px] text-white/20 mt-8 tracking-wider">
          * Fan concept project. Product data sourced from one8.com. Visit one8.com for official purchase.
        </p>
      </div>
    </section>
  )
}
