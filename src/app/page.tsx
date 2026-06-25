'use client'

import { useEffect, useRef, useState } from 'react'
import LoadingScreen from '@/components/sections/LoadingScreen'
import Navbar        from '@/components/layout/Navbar'
import HeroSection   from '@/components/sections/HeroSection'
import JourneySection    from '@/components/sections/JourneySection'
import CollectionSection from '@/components/sections/CollectionSection'
import StatsSection      from '@/components/sections/StatsSection'
import FanExperience     from '@/components/sections/FanExperience'
import ClosingSection    from '@/components/sections/ClosingSection'
import Footer            from '@/components/layout/Footer'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {/* ── Cinematic loading screen ── */}
      {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* ── Main site ── */}
      <div
        className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden={isLoading}
      >
        <Navbar />

        <main>
          {/* 1. Hero – fullscreen immersive */}
          <HeroSection />

          {/* 2. Virat's Journey – storytelling timeline */}
          <JourneySection />

          {/* 3. Signature Collection – product cards */}
          <CollectionSection />

          {/* 4. Performance Stats – cricket scoreboard */}
          <StatsSection />

          {/* 5. Fan Experience – customizer & wallpapers */}
          <FanExperience />

          {/* 6. Closing – emotional finale */}
          <ClosingSection />
        </main>

        <Footer />
      </div>
    </>
  )
}
