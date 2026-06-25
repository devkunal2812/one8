import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ONE8 King Edition Palette
        'king-black':    '#0A0A0A',
        'king-dark':     '#111111',
        'king-gold':     '#C0C0C0',
        'king-gold-lt':  '#E8E8E8',
        'king-red':      '#C0392B',
        'king-white':    '#F5F5F0',
        'king-gray':     '#2A2A2A',
        'king-gray-lt':  '#3D3D3D',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      fontSize: {
        '10xl': ['10rem',  { lineHeight: '0.9' }],
        '12xl': ['12rem',  { lineHeight: '0.85' }],
        '15xl': ['15rem',  { lineHeight: '0.8' }],
      },
      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #C0C0C0 100%)',
        'dark-gradient':    'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        'radial-gold':      'radial-gradient(ellipse at center, rgba(192,192,192,0.15) 0%, transparent 70%)',
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'pulse-gold':    'pulseGold 2s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'counter':       'counter 2s ease-out forwards',
        'particle-rise': 'particleRise 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(192,192,192,0.3)' },
          '50%':      { boxShadow: '0 0 60px rgba(192,192,192,0.8)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        particleRise: {
          '0%':   { transform: 'translateY(0) scale(1)',   opacity: '0' },
          '20%':  { opacity: '1' },
          '80%':  { opacity: '0.5' },
          '100%': { transform: 'translateY(-100px) scale(0)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}

export default config
