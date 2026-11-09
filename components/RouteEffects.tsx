'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { getScroller } from '@/lib/scroll'

/**
 * On client-side navigation: reset the smooth scroller to the top and move
 * keyboard focus to the new page's content, so focus is never stranded on a
 * link from the previous view. (Next's route announcer reads the new title.)
 */
export function RouteEffects() {
  const pathname = usePathname()
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    getScroller()?.scrollTo(0, { immediate: true, force: true })
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname])

  return null
}
