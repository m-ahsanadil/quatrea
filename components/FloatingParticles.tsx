'use client'

import { useRef } from 'react'
import { useOffscreenPause } from '@/lib/useOffscreenPause'

interface FloatingParticlesProps {
  color?: string
  count?: number
}

export function FloatingParticles({ color = '#C9A86C', count = 16 }: FloatingParticlesProps) {
  const ref = useRef<HTMLDivElement>(null)
  useOffscreenPause(ref)

  const particles = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 37 + 13) % 100}%`,
    bottom: `${-10 - ((i * 7) % 30)}%`,
    size: 1.5 + (i % 3) * 0.8,
    delay: (i * 1.7) % 12,
    duration: 14 + (i % 6) * 3,
    opacity: 0.16 + (i % 4) * 0.06,
    drift: -30 + (i % 7) * 10,
  }))

  return (
    <div ref={ref} aria-hidden className="ambient decor particle-field">
      {particles.map((p, i) => (
        <div
          key={i}
          className="floating-particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
