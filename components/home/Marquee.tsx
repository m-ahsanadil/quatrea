'use client'

import { useRef } from 'react'
import { MARQUEE_TEXT } from '@/content/home'
import { useOffscreenPause } from '@/hooks/useOffscreenPause'

const COPIES = 4

/** Decorative ticker: the perfume names appear as real text elsewhere. */
export function Marquee() {
  const ref = useRef<HTMLElement>(null)
  useOffscreenPause(ref)

  return (
    <section ref={ref} aria-hidden className="marquee ambient m-hide">
      <div className="marquee-track">
        {Array.from({ length: COPIES }, (_, index) => (
          <span key={index} className="marquee__text">
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </section>
  )
}
