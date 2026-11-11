'use client'

import { useEffect } from 'react'
import { setScroller } from '@/lib/scroll'

/**
 * Lenis smooth scroll driven by the GSAP ticker. It is only active while the
 * visitor has not asked for reduced motion; native scrolling is used
 * otherwise, and the preference is followed live.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    let teardown: (() => void) | null = null
    let generation = 0

    const stop = () => {
      generation += 1
      teardown?.()
      teardown = null
    }

    const start = async () => {
      const mine = ++generation
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (mine !== generation || calm.matches) return

      gsap.registerPlugin(ScrollTrigger)

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      const onTick = (time: number) => lenis.raf(time * 1000)

      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(onTick)
      gsap.ticker.lagSmoothing(0)
      setScroller(lenis)

      void document.fonts?.ready.then(() => {
        if (mine === generation) ScrollTrigger.refresh()
      })

      // Lenis only smooths the wheel; route the scrolling keys through it too
      // so they glide instead of jumping. Anything that needs the key itself
      // (form fields, buttons, links, a stopped scroller) is left native.
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return
        if (lenis.isStopped) return
        const target = event.target as HTMLElement | null
        if (target?.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]')) return
        if (event.key === ' ' && target?.closest('button, a[href], summary, [role="button"]')) return

        const page = window.innerHeight * 0.85
        let next: number
        switch (event.key) {
          case 'ArrowDown': next = lenis.scroll + 100; break
          case 'ArrowUp': next = lenis.scroll - 100; break
          case 'PageDown': next = lenis.scroll + page; break
          case 'PageUp': next = lenis.scroll - page; break
          case ' ': next = lenis.scroll + (event.shiftKey ? -page : page); break
          case 'Home': next = 0; break
          case 'End': next = lenis.limit; break
          default: return
        }
        event.preventDefault()
        const distance = Math.abs(next - lenis.scroll)
        lenis.scrollTo(Math.max(0, Math.min(lenis.limit, next)), {
          duration: Math.min(1.6, 0.5 + distance / 3000),
        })
      }
      window.addEventListener('keydown', onKeyDown)

      teardown = () => {
        window.removeEventListener('keydown', onKeyDown)
        gsap.ticker.remove(onTick)
        gsap.ticker.lagSmoothing(500, 33)
        setScroller(null)
        lenis.destroy()
      }
    }

    const onPreferenceChange = () => {
      stop()
      if (!calm.matches) void start()
    }

    calm.addEventListener('change', onPreferenceChange)
    if (!calm.matches) void start()

    return () => {
      calm.removeEventListener('change', onPreferenceChange)
      stop()
    }
  }, [])

  return <>{children}</>
}
