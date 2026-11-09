import Link from 'next/link'
import { LINEUP_LINE } from '@/content/about'
import { SEASONS, SEASON_KEYS } from '@/content/seasons'
import { Divider } from '@/components/ui/Divider'
import { PerfumeBottle } from '@/components/ui/PerfumeBottle'

export function Lineup() {
  return (
    <section className="lineup about-reveal m-hide">
      <Divider />
      <p className="lineup__line">{LINEUP_LINE}</p>

      <ul className="lineup__list grid-4">
        {SEASON_KEYS.map((key) => {
          const { perfume, name, colors } = SEASONS[key]
          return (
            <li key={key}>
              <Link href={`/${key}`} className="lineup__link link-muted">
                <PerfumeBottle
                  perfumeName={perfume}
                  seasonName={name}
                  accentColor={colors.accent}
                  className="lineup__bottle"
                  style={{ filter: `drop-shadow(0 8px 24px ${colors.accent}40)` }}
                />
                <span className="lineup__name">{perfume}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
