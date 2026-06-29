'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?:    'sm' | 'md' | 'lg'
  href?:    string
  children: React.ReactNode
}

export default function GoldButton({
  variant  = 'primary',
  size     = 'md',
  href,
  children,
  className,
  onClick,
  ...props
}: GoldButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  // Ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el   = btnRef.current!
    const rect = el.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top

    const ripple       = document.createElement('span')
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.25);
      width: 4px; height: 4px;
      left: ${x}px; top: ${y}px;
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s linear forwards;
      pointer-events: none;
    `
    el.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)

    if (onClick) (onClick as React.MouseEventHandler<HTMLButtonElement>)(e as React.MouseEvent<HTMLButtonElement>)
  }

  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-8 py-3.5 text-sm',
    lg: 'px-12 py-5 text-base',
  }[size]

  const variantClasses = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    ghost:     'bg-transparent text-white/55 hover:text-white border border-transparent hover:border-white/30 transition-all duration-300',
  }[variant]

  const baseClass = cn(
    'relative overflow-hidden rounded-sm font-semibold tracking-[0.1em] uppercase inline-block',
    sizeClasses,
    variantClasses,
    className
  )

  if (href) {
    return (
      <a href={href} className={baseClass} onClick={handleClick as React.MouseEventHandler<HTMLAnchorElement>}
        ref={btnRef as React.RefObject<HTMLAnchorElement>}>
        {children}
      </a>
    )
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      className={baseClass}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}
