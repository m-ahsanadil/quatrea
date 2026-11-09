'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Sets data-offscreen="true" on the element while it is outside the viewport,
 * so CSS can pause its infinite animations (see globals.css). Ambient loops
 * keep costing CPU/GPU and battery even when nobody can see them.
 */
export function useOffscreenPause(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.offscreen = entry.isIntersecting ? 'false' : 'true'
      },
      { rootMargin: '80px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}
