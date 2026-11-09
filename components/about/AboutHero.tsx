import { ABOUT_HERO } from '@/content/about'
import { FloatingParticles } from '@/components/ambient/FloatingParticles'

export function AboutHero() {
  const [first, second] = ABOUT_HERO.lines

  return (
    <section className="about-hero screen">
      <div aria-hidden className="about-hero__glow decor" />
      <FloatingParticles color="#C9A86C" count={12} />

      <div className="about-hero__inner">
        <div className="about-hero__line m-sx" />
        <p className="about-hero__eyebrow eyebrow m-hide">{ABOUT_HERO.eyebrow}</p>
        <h1 className="about-hero__title m-hide">
          {first}
          <br />
          {second}
          <br />
          <em>{ABOUT_HERO.accent}</em>
        </h1>
      </div>
    </section>
  )
}
