'use client'

import { useRef } from 'react'
import { useMotion } from '@/hooks/useMotion'
import { Hero } from './Hero'
import { Marquee } from './Marquee'
import { CinematicQuote } from './CinematicQuote'
import { Collection } from './Collection'
import { BottleShowcase } from './BottleShowcase'
import { Philosophy } from './Philosophy'
import { HomeFooter } from './HomeFooter'
import { buildHomeMotion } from './motion'

/** The landing page: composes the sections and owns the page animation scope. */
export function HomeView() {
  const containerRef = useRef<HTMLDivElement>(null)
  useMotion(containerRef, buildHomeMotion)

  return (
    <div ref={containerRef}>
      <Hero />
      <Marquee />
      <CinematicQuote />
      <Collection />
      <BottleShowcase />
      <Philosophy />
      <HomeFooter />
    </div>
  )
}
