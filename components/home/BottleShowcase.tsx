'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { SEASONS, SEASON_KEYS } from '@/content/seasons'
import { useOffscreenPause } from '@/hooks/useOffscreenPause'
import { PerfumeBottle } from '@/components/ui/PerfumeBottle'

export function BottleShowcase() {
  const ref = useRef<HTMLElement>(null)
  useOffscreenPause(ref)

  return (
    <section ref={ref} className="showcase ambient">
      <div aria-hidden className="showcase__halo decor" />
      <ul className="showcase__list grid-4">
        {SEASON_KEYS.map((key) => {
          const { perfume, name, colors } = SEASONS[key]
          return (
            <li key={key} className="showcase__item">
              <Link href={`/${key}`} className="showcase__link m-hide gradient-border-card luxury-card">
                <span className="showcase__bottle-wrap">
                  <span
                    aria-hidden
                    className="showcase__orb breathing-orb decor"
                    style={{ background: `radial-gradient(circle, ${colors.accent}26 0%, transparent 70%)` }}
                  />
                  <PerfumeBottle
                    perfumeName={perfume}
                    seasonName={name}
                    accentColor={colors.accent}
                    className="showcase__bottle"
                    style={{ filter: `drop-shadow(0 12px 28px ${colors.accent}40)` }}
                  />
                </span>
                <span className="showcase__perfume">{perfume}</span>
                <span className="showcase__season eyebrow" style={{ color: colors.accent }}>
                  {name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
