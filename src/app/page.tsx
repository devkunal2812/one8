'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen     from '@/components/sections/LoadingScreen'
import Navbar            from '@/components/layout/Navbar'
import HeroSection       from '@/components/sections/HeroSection'
import JourneySection    from '@/components/sections/JourneySection'
import CollectionSection from '@/components/sections/CollectionSection'
import ElevateSection    from '@/components/sections/ElevateSection'
import StatsSection      from '@/components/sections/StatsSection'
import FanExperience     from '@/components/sections/FanExperience'
import ClosingSection    from '@/components/sections/ClosingSection'
import Footer            from '@/components/layout/Footer'

export default function HomePage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <JourneySection />
          <CollectionSection />
          <ElevateSection />
          <StatsSection />
          <FanExperience />
          <ClosingSection />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
