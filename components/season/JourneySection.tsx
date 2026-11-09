import { SEASONS, SEASON_KEYS, type SeasonKey } from '@/content/seasons'
import { SeasonCard } from '@/components/ui/SeasonCard'

/** Links to the three other seasons. */
export function JourneySection({ current }: { current: SeasonKey }) {
  return (
    <section className="journey section">
      <h2 className="journey__title eyebrow">Continue the Journey</h2>
      <div className="grid-3">
        {SEASON_KEYS.filter((key) => key !== current).map((key) => (
          <SeasonCard key={key} season={SEASONS[key]} variant="compact" className="m-hide" />
        ))}
      </div>
    </section>
  )
}
