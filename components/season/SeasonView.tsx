'use client'

import { useRef } from 'react'
import { SEASONS, type SeasonKey } from '@/content/seasons'
import { useMotion } from '@/hooks/useMotion'
import { SimpleFooter } from '@/components/ui/SimpleFooter'
import { SeasonHero } from './SeasonHero'
import { BottleReveal } from './BottleReveal'
import { NotesSection } from './NotesSection'
import { StorySection } from './StorySection'
import { JourneySection } from './JourneySection'
import { buildSeasonMotion } from './motion'

/** One perfume's page: composes the sections and owns the page animation scope. */
export function SeasonView({ seasonKey }: { seasonKey: SeasonKey }) {
  const season = SEASONS[seasonKey]
  const containerRef = useRef<HTMLDivElement>(null)
  const { bg, fg, accent, accentText } = season.colors

  useMotion(containerRef, buildSeasonMotion, [seasonKey])

  return (
    <div
      ref={containerRef}
      className="screen"
      style={{
        backgroundColor: bg,
        color: fg,
        ['--season-accent' as string]: accent,
        ['--accent-text' as string]: accentText,
        ['--focus' as string]: accentText,
      }}
    >
      <SeasonHero season={season} />
      <BottleReveal season={season} />
      <NotesSection season={season} />
      <StorySection season={season} />
      <JourneySection current={seasonKey} />
      <SimpleFooter color={fg} borderColor={`${accent}1a`} />
    </div>
  )
}
