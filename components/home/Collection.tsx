import { COLLECTION } from '@/content/home'
import { SEASONS, SEASON_KEYS } from '@/content/seasons'
import { SeasonCard } from '@/components/ui/SeasonCard'

export function Collection() {
  return (
    <section className="collection">
      <div className="collection__head">
        <div>
          <p className="collection__eyebrow eyebrow">{COLLECTION.eyebrow}</p>
          <h2 className="collection__title">{COLLECTION.heading}</h2>
        </div>
        <p className="collection__note">{COLLECTION.note}</p>
      </div>

      <div className="collection__grid">
        {SEASON_KEYS.map((key) => (
          <SeasonCard key={key} season={SEASONS[key]} variant="tall" className="m-hide" />
        ))}
      </div>
    </section>
  )
}
