# ONE8 – The King Edition 👑

> **Fan-made concept website** inspired by Virat Kohli's journey, energy, and ONE8 brand.
> Built for UI/UX portfolio purposes only. Not affiliated with Virat Kohli or ONE8.

---

## ✨ Features

| Section | What's Inside |
|---|---|
| **Loading Screen** | Particle field, stadium lights ramp-up, "Greatness Awaits." text reveal |
| **Hero** | Fullscreen cinematic BG, 3D rotating sneaker (React Three Fiber), parallax |
| **Virat's Journey** | 4-chapter storytelling timeline with GSAP ScrollTrigger animations |
| **Signature Collection** | 3 product cards, drag-to-rotate 360° SVG viewer, color picker |
| **Performance Stats** | Cricket scoreboard UI, animated count-up counters |
| **Fan Experience** | 6-colorway shoe customizer + save favorites + wallpaper generator |
| **Closing Section** | Word-by-word GSAP reveal, emotional finale |

---

## 🛠 Tech Stack

- **Next.js 14** – App Router, TypeScript
- **Tailwind CSS** – Custom ONE8 design tokens
- **Framer Motion** – Entrance animations, page transitions
- **GSAP + ScrollTrigger** – Scroll-driven animations, parallax, timeline reveals
- **React Three Fiber / Three.js** – 3D sneaker viewer in Hero
- **Lenis** – Butter-smooth scroll

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, cursor, scroll, SEO
│   └── page.tsx            # Page composition – all sections assembled
├── components/
│   ├── 3d/
│   │   └── Shoe3D.tsx      # React Three Fiber 3D sneaker canvas
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav with mobile hamburger
│   │   ├── Footer.tsx      # Footer with links and disclaimer
│   │   └── SmoothScrollProvider.tsx  # Lenis wrapper
│   ├── sections/
│   │   ├── LoadingScreen.tsx    # Cinematic loading
│   │   ├── HeroSection.tsx      # Fullscreen hero + 3D shoe
│   │   ├── JourneySection.tsx   # Timeline storytelling
│   │   ├── CollectionSection.tsx # Product cards + 360 viewer
│   │   ├── StatsSection.tsx     # Cricket scoreboard + counters
│   │   ├── FanExperience.tsx    # Customizer + wallpaper gen
│   │   └── ClosingSection.tsx   # Emotional finale
│   └── ui/
│       ├── CustomCursor.tsx     # Gold dot + ring cursor
│       ├── GoldButton.tsx       # Reusable CTA button
│       ├── ScrollProgressBar.tsx # Gold scroll indicator
│       └── SectionHeading.tsx   # Reusable heading block
├── hooks/
│   └── useAnimations.ts    # useGSAPContext, useMouseParallax, useCountUp
├── lib/
│   └── utils.ts            # cn(), easing, mapRange, canvas helpers
├── styles/
│   └── globals.css         # Tailwind + custom properties + animations
└── types/
    └── index.ts            # Shared TypeScript interfaces
```

---

## 🎨 Design Tokens

| Token | Value | Usage |
|---|---|---|
| `king-black` | `#0A0A0A` | Primary background |
| `king-gold` | `#C9A84C` | Accent, CTAs, highlights |
| `king-gold-lt` | `#E8C97A` | Gold shimmer highlight |
| `king-red` | `#C0392B` | Danger, passion accents |
| `king-white` | `#F5F5F0` | Body text |

---

## 🔄 Upgrading the 3D Shoe

The current 3D shoe is a **geometric proxy** built from Three.js primitives.

To use a real shoe GLB model:

```tsx
// In src/components/3d/Shoe3D.tsx
import { useGLTF } from '@react-three/drei'

function SneakerModel() {
  const { scene } = useGLTF('/models/one8-shoe.glb')
  return <primitive object={scene} />
}
```

Place your `.glb` at `public/models/one8-shoe.glb`.

---

## 📸 Adding Real Images

Replace placeholder gradients with actual photos:

```tsx
import Image from 'next/image'

<Image
  src="/images/virat-hero.jpg"   // place in public/images/
  alt="Virat Kohli"
  fill
  className="object-cover"
  priority
/>
```

---

## 📋 Lighthouse Targets

| Metric | Target |
|---|---|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 90+ |

---

## ⚠️ Fan Project Disclaimer

This is a **non-commercial fan concept** created solely to demonstrate frontend and UI/UX development skills.

- Not affiliated with Virat Kohli, ONE8, or PUMA India
- All brand names and trademarks belong to their respective owners
- No products are sold or monetized through this site
- Real assets (photos, logos) must be replaced with officially licensed versions before any commercial use

---

*Built with ❤️ and a lot of chai — for the love of the game and great design.*
