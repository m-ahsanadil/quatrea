'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { armNavigation } from '@/lib/transition'

/**
 * Wraps plain internal link clicks in a view transition (circular reveal from
 * the click point, styled in globals.css). Everything else falls through to
 * normal navigation: unsupported browsers, reduced motion, modified clicks,
 * new tabs, downloads, external links, same-page links, and back/forward.
 * A pointer press or key press while a transition runs skips it.
 */
export function PageTransitions() {
  const router = useRouter()

  useEffect(() => {
    if (typeof document.startViewTransition !== 'function') return

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    let active: ViewTransition | null = null

    const skip = () => active?.skipTransition()

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        calm.matches
      ) {
        return
      }

      const target = event.target instanceof Element ? event.target : null
      const anchor = target?.closest<HTMLAnchorElement>('a[href]')
      if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return

      event.preventDefault()

      // Keyboard activation reports no pointer position: start from the link itself.
      const box = anchor.getBoundingClientRect()
      const x = event.clientX || box.left + box.width / 2
      const y = event.clientY || box.top + box.height / 2
      document.documentElement.style.setProperty('--vt-x', `${x}px`)
      document.documentElement.style.setProperty('--vt-y', `${y}px`)

      skip()
      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            armNavigation(resolve)
            router.push(url.pathname + url.search + url.hash)
          }),
      )
      active = transition
      void transition.ready.catch(() => undefined)
      void transition.finished
        .catch(() => undefined)
        .finally(() => {
          if (active === transition) active = null
        })
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('pointerdown', skip, true)
    document.addEventListener('keydown', skip, true)

    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('pointerdown', skip, true)
      document.removeEventListener('keydown', skip, true)
      skip()
    }
  }, [router])

  return null
}
