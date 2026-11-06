'use client'

import { useEffect } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenisInstance: { destroy: () => void; raf: (t: number) => void; on: (e: string, cb: () => void) => void } | null = null

    const init = async () => {
      const { default: Lenis } = await import('lenis')
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      }) as typeof lenisInstance

      lenisInstance!.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time: number) => {
        lenisInstance?.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)
    }

    init()

    return () => {
      lenisInstance?.destroy()
    }
  }, [])

  return <>{children}</>
}
