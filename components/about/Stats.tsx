import { STATS } from '@/content/about'

export function Stats() {
  return (
    <section className="stats">
      <ul className="stats__list grid-4">
        {STATS.map(({ value, label }) => (
          <li key={label} className="stats__item m-hide">
            <div className="stats__value">{value}</div>
            <div className="stats__label eyebrow">{label}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
