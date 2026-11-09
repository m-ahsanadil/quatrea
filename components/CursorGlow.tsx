'use client'

import { useEffect, useRef } from 'react'

const HALF_SIZE = 250
const SETTLE_MS = 110

/**
 * Soft light that trails a fine pointer. The animation loop only runs while
 * the glow is still catching up, advances by elapsed time (so it feels the
 * same on 60 and 144 Hz screens), and is off for touch and reduced motion.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')

    let enabled = false
    let raf = 0
    let last = 0
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let seen = false

    const frame = (now: number) => {
      const dt = Math.min(now - last, 64)
      last = now
      const k = 1 - Math.exp(-dt / SETTLE_MS)
      x += (targetX - x) * k
      y += (targetY - y) * k
      glow.style.transform = `translate3d(${x - HALF_SIZE}px, ${y - HALF_SIZE}px, 0)`

      if (Math.abs(targetX - x) < 0.3 && Math.abs(targetY - y) < 0.3) {
        raf = 0
        glow.style.willChange = 'auto'
        return
      }
      raf = requestAnimationFrame(frame)
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      if (!seen) {
        seen = true
        x = targetX
        y = targetY
        glow.style.opacity = '1'
      }
      if (!raf) {
        last = performance.now()
        glow.style.willChange = 'transform'
        raf = requestAnimationFrame(frame)
      }
    }

    const enable = () => {
      if (enabled) return
      enabled = true
      window.addEventListener('pointermove', onMove, { passive: true })
    }

    const disable = () => {
      if (!enabled) return
      enabled = false
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
      raf = 0
      seen = false
      glow.style.opacity = '0'
      glow.style.willChange = 'auto'
    }

    const sync = () => (finePointer.matches && !calm.matches ? enable() : disable())

    sync()
    finePointer.addEventListener('change', sync)
    calm.addEventListener('change', sync)

    return () => {
      disable()
      finePointer.removeEventListener('change', sync)
      calm.removeEventListener('change', sync)
    }
  }, [])

  return <div ref={glowRef} aria-hidden className="cursor-glow decor" />
}
