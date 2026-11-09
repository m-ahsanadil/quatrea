'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { getScroller } from '@/lib/scroll'
import { completeNavigation } from '@/lib/transition'

/**
 * On client-side navigation: reset the smooth scroller to the top, move
 * keyboard focus to the new page's content so it is never stranded on a link
 * from the previous view, then release any view transition waiting for the
 * new route. (Next's route announcer reads the new title.)
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
    completeNavigation()
  }, [pathname])

  return null
}
