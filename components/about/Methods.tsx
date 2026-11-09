import { METHODS } from '@/content/about'

export function Methods() {
  return (
    <section className="methods about-reveal m-hide section">
      <div className="methods__head">
        <p className="methods__eyebrow eyebrow">{METHODS.eyebrow}</p>
        <h2 className="methods__title">{METHODS.heading}</h2>
      </div>

      <div className="methods__grid">
        {METHODS.items.map(({ number, title, body }) => (
          <div key={title} className="method-card m-hide">
            <span aria-hidden className="method-card__number">
              {number}
            </span>
            <span aria-hidden className="method-card__bar" />
            <h3 className="method-card__title">{title}</h3>
            <p className="method-card__body">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
