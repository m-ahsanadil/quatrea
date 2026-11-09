'use client'

import { useRef } from 'react'
import { useMotion } from '@/hooks/useMotion'
import { SimpleFooter } from '@/components/ui/SimpleFooter'
import { AboutHero } from './AboutHero'
import { Stats } from './Stats'
import { AboutPhilosophy } from './AboutPhilosophy'
import { Methods } from './Methods'
import { Lineup } from './Lineup'
import { AboutCollection } from './AboutCollection'
import { buildAboutMotion } from './motion'

/** The brand story page: composes the sections and owns the page animation scope. */
export function AboutView() {
  const containerRef = useRef<HTMLDivElement>(null)
  useMotion(containerRef, buildAboutMotion)

  return (
    <div ref={containerRef}>
      <AboutHero />
      <Stats />
      <AboutPhilosophy />
      <Methods />
      <Lineup />
      <AboutCollection />
      <SimpleFooter color="#F5F0E8" borderColor="rgba(245,240,232,0.08)" />
    </div>
  )
}
