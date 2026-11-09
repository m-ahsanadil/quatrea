'use client'

import { useEffect, type RefObject } from 'react'
import type { gsap as GsapType } from 'gsap'

/**
 * The single motion system for the site. Personality: luxury — slow, soft,
 * minimal. Durations, easings and distances live here and nowhere else.
 * (CSS counterparts are the --dur-* / --ease-* tokens in globals.css.)
 */
export const DUR = {
  micro: 0.18,
  element: 0.3,
  view: 0.45,
  reveal: 0.9,
  story: 1.2,
} as const

export const EASE = {
  out: 'power3.out',
  soft: 'power2.out',
  cinematic: 'expo.out',
  inOut: 'power2.inOut',
} as const

export const DIST = { sm: 16, md: 28, lg: 48 } as const
export const STAGGER = { tight: 0.06, card: 0.12 } as const
export const SCALE_IN = 0.97

export interface MotionTier {
  /** Viewport >= 768px and motion allowed: pinning and scrubbed storytelling. */
  full: boolean
  /** Viewport < 768px and motion allowed: simple one-shot reveals only. */
  lite: boolean
}

type Gsap = typeof GsapType

const ROOT_CLASS = 'motion-ok'
const READY_CLASS = 'motion-ready'
const FAILED_CLASS = 'motion-failed'

/**
 * Runs `build` inside a gsap.matchMedia scope so that:
 *  - nothing is animated when the visitor prefers reduced motion, and the
 *    content-hiding `.motion-ok` class is removed so everything is visible;
 *  - a change of the reduced-motion or viewport preference while the page is
 *    open reverts every tween and re-runs the right tier;
 *  - unmounting reverts all tweens, ScrollTriggers and inline styles.
 * If the animation runtime cannot load, content is revealed instead of
 * staying hidden.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  build: (gsap: Gsap, tier: MotionTier) => void,
  deps: ReadonlyArray<unknown> = [],
): void {
  useEffect(() => {
    const root = document.documentElement
    let cancelled = false
    let mm: { revert: () => void } | null = null

    const reveal = () => root.classList.remove(ROOT_CLASS)

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled || !scope.current) return
      if (root.classList.contains(FAILED_CLASS)) return

      gsap.registerPlugin(ScrollTrigger)

      const match = gsap.matchMedia()
      mm = match
      match.add(
        {
          full: '(prefers-reduced-motion: no-preference) and (min-width: 768px)',
          lite: '(prefers-reduced-motion: no-preference) and (max-width: 767px)',
          // matchMedia only calls back while some condition matches, so reduced
          // motion needs its own entry to be able to reveal content live.
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { full, lite } = context.conditions as { full: boolean; lite: boolean }
          if (!full && !lite) {
            reveal()
            return
          }
          root.classList.add(ROOT_CLASS)
          build(gsap, { full, lite })
          root.classList.add(READY_CLASS)
        },
        scope.current,
      )
    }

    init().catch(reveal)

    return () => {
      cancelled = true
      mm?.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
