import Link from 'next/link'
import type { Season } from '@/content/seasons'

interface SeasonCardProps {
  season: Season
  /** `tall` is the portrait collection card; `compact` is the padded link card. */
  variant: 'tall' | 'compact'
  className?: string
}

/** One link card per season, used on Home, the season pages and About. */
export function SeasonCard({ season, variant, className = '' }: SeasonCardProps) {
  const { key, name, perfume, number, colors } = season

  return (
    <Link
      href={`/${key}`}
      aria-label={variant === 'tall' ? `Explore ${name} — ${perfume}` : undefined}
      className={`season-card season-card--${variant} luxury-card ${className}`.trim()}
      style={{ background: colors.cardGradient }}
    >
      <span
        aria-hidden
        className="season-card__glow card-glow decor"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 70%, ${colors.accent}40 0%, transparent 70%)` }}
      />
      <span aria-hidden className="season-card__shade decor" />
      <span aria-hidden className="season-card__watermark decor">
        {number}
      </span>

      <span className="season-card__body">
        <span className="eyebrow season-card__eyebrow">No. {number}</span>
        <h3 className="season-card__name">{name}</h3>
        <span className="season-card__perfume">{perfume}</span>
        <span aria-hidden className="season-card__rule" />
        <span className="eyebrow season-card__cta">Discover →</span>
      </span>
    </Link>
  )
}
