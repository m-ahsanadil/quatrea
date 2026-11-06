'use client'

interface FloatingParticlesProps {
  color?: string
  count?: number
}

export function FloatingParticles({ color = '#C9A86C', count = 35 }: FloatingParticlesProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    left: `${(i * 37 + 13) % 100}%`,
    bottom: `${-10 - (i * 7) % 30}%`,
    size: 1.5 + (i % 3) * 0.8,
    delay: (i * 1.7) % 12,
    duration: 14 + (i % 6) * 3,
    opacity: 0.12 + (i % 4) * 0.06,
    drift: -30 + (i % 7) * 10,
  }))

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="floating-particle"
          style={{
            position: 'absolute',
            left: p.left,
            bottom: p.bottom,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            boxShadow: `0 0 ${p.size * 3}px ${color}`,
            opacity: p.opacity,
            animationName: 'particleFloat',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
