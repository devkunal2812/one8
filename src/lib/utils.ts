import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Cubic ease-out (t = 0–1) */
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/** Cubic ease-in-out */
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

/** Exponential ease-out (Lenis default) */
export const easeOutExpo = (t: number) =>
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

/** Clamp a number between min and max */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

/** Map a number from one range to another */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)

/** Format a number to Indian locale string */
export const formatIN = (n: number) => n.toLocaleString('en-IN')

/** Delay promise */
export const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

/** Random float between min and max */
export const randFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min

/** Random int between min and max (inclusive) */
export const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

/**
 * Draw a gold-shimmer gradient text on canvas.
 * Pass the canvas context, text, x, y, and font string.
 */
export function drawGoldText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font = 'bold 48px serif'
) {
  ctx.save()
  ctx.font = font
  ctx.textAlign = 'center'

  const width = ctx.measureText(text).width
  const grad  = ctx.createLinearGradient(x - width / 2, 0, x + width / 2, 0)
  grad.addColorStop(0,   '#C9A84C')
  grad.addColorStop(0.5, '#E8C97A')
  grad.addColorStop(1,   '#C9A84C')

  ctx.fillStyle = grad
  ctx.fillText(text, x, y)
  ctx.restore()
}
