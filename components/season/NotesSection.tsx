import type { Season } from '@/content/seasons'

const LAYERS = ['top', 'heart', 'base'] as const

export function NotesSection({ season }: { season: Season }) {
  return (
    <section className="notes section">
      <div className="notes__head">
        <h2 className="eyebrow">Fragrance Composition</h2>
        <p className="notes__caption">Three layers, one story</p>
      </div>

      <div className="notes__grid">
        {LAYERS.map((layer, index) => (
          <div key={layer} className="note-card m-hide gradient-border-card">
            <span aria-hidden className="note-card__bar" />
            <span aria-hidden className="note-card__index">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="note-card__title eyebrow">{layer} notes</h3>
            {season.notes[layer].map((note) => (
              <p key={note} className="note-card__item">
                {note}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
