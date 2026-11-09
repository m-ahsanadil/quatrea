'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/** Reading-progress hairline. Animates transform only, once per frame. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const bar = barRef.current
      if (!bar) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      bar.style.transform = `scaleX(${progress})`
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  return (
    <div aria-hidden className="scroll-progress decor">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  )
}
