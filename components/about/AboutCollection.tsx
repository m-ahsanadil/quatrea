import { ABOUT_COLLECTION } from '@/content/about'
import { SEASONS, SEASON_KEYS } from '@/content/seasons'
import { SeasonCard } from '@/components/ui/SeasonCard'

export function AboutCollection() {
  return (
    <section className="about-collection section">
      <div className="about-collection__head">
        <p className="about-collection__eyebrow eyebrow">{ABOUT_COLLECTION.eyebrow}</p>
        <h2 className="about-collection__title">{ABOUT_COLLECTION.heading}</h2>
      </div>

      <div className="about-collection__grid">
        {SEASON_KEYS.map((key) => (
          <SeasonCard key={key} season={SEASONS[key]} variant="compact" className="m-hide" />
        ))}
      </div>
    </section>
  )
}
