// ─── Product Types ────────────────────────────────────────────────
export interface ProductColorway {
  name:    string
  upper:   string
  midsole: string
  sole:    string
  laces:   string
}

export interface Product {
  id:          string
  name:        string
  subtitle:    string
  price:       string
  tag:         string
  tagColor:    string
  colors:      string[]
  colorways?:  ProductColorway[]
  description: string
  specs:       string[]
  imageUrl?:   string
}

// ─── Journey / Timeline ───────────────────────────────────────────
export interface JourneyChapter {
  id:      string
  number:  string
  title:   string
  year:    string
  quote:   string
  body:    string
  accent:  string
  align:   'left' | 'right'
}

// ─── Stats ────────────────────────────────────────────────────────
export interface StatItem {
  value:   number
  label:   string
  suffix:  string
  prefix:  string
  icon:    string
  color:   string
}

// ─── Wallpaper ────────────────────────────────────────────────────
export interface WallpaperConfig {
  quote:    string
  colorway: ProductColorway
  width?:   number
  height?:  number
}

// ─── Animation helpers ────────────────────────────────────────────
export type EasingFn = (t: number) => number

export interface ScrollTriggerConfig {
  trigger: string | HTMLElement
  start:   string
  end?:    string
  scrub?:  boolean | number
}
