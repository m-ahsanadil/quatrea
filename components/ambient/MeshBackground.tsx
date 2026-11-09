'use client'

import { useRef } from 'react'
import { useOffscreenPause } from '@/hooks/useOffscreenPause'

interface Orb {
  background: string
  left?: string
  top?: string
}

interface MeshBackgroundProps {
  orbs: Orb[]
  className?: string
}

/**
 * Slow-drifting colour fields. The orbs are plain radial gradients (no blur
 * filter, which would be re-rendered every frame while they move) and pause
 * while their section is off screen.
 */
export function MeshBackground({ orbs, className = '' }: MeshBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  useOffscreenPause(ref)

  return (
    <div ref={ref} aria-hidden className={`mesh-bg ambient decor ${className}`.trim()}>
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="mesh-orb"
          style={{ background: orb.background, left: orb.left, top: orb.top }}
        />
      ))}
    </div>
  )
}
