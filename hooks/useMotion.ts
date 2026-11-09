'use client'

import { useEffect, type RefObject } from 'react'
import type { MotionBuilder } from '@/lib/motion'

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
  build: MotionBuilder,
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
