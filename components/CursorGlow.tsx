'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const glow = glowRef.current
    if (!glow) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.07
      currentY += (targetY - currentY) * 0.07
      glow.style.transform = `translate(${currentX - 250}px, ${currentY - 250}px)`
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,108,0.07) 0%, rgba(201,168,108,0.02) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
    />
  )
}
