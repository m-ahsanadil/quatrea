import { ABOUT_PHILOSOPHY } from '@/content/about'

export function AboutPhilosophy() {
  const [first, second] = ABOUT_PHILOSOPHY.heading

  return (
    <section className="about-reveal m-hide section split">
      <div>
        <p className="about-philosophy__eyebrow eyebrow">{ABOUT_PHILOSOPHY.eyebrow}</p>
        <h2 className="about-philosophy__heading">
          {first}
          <br />
          {second}
        </h2>
      </div>

      <div>
        {ABOUT_PHILOSOPHY.paragraphs.map((paragraph) => (
          <p key={paragraph} className="about-philosophy__text">
            {paragraph}
          </p>
        ))}
        <blockquote className="about-philosophy__quote">{ABOUT_PHILOSOPHY.quote}</blockquote>
      </div>
    </section>
  )
}
