import { DIST, DUR, EASE, SCALE_IN, STAGGER, type MotionBuilder } from '@/lib/motion'

/** About page choreography. Selectors are scoped to AboutView by useMotion. */
export const buildAboutMotion: MotionBuilder = (gsap) => {
  gsap
    .timeline({ delay: 0.2 })
    .fromTo('.about-hero__line', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: EASE.soft })
    .fromTo('.about-hero__eyebrow', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.4')
    .fromTo(
      '.about-hero__title',
      { opacity: 0, y: DIST.lg, scale: SCALE_IN },
      { opacity: 1, y: 0, scale: 1, duration: DUR.story * 1.2, ease: EASE.cinematic },
      '-=0.5',
    )

  gsap.utils.toArray<Element>('.about-reveal').forEach((section) => {
    gsap.fromTo(section, { opacity: 0, y: DIST.md }, {
      opacity: 1, y: 0, duration: DUR.story, ease: EASE.out,
      scrollTrigger: { trigger: section, start: 'top 82%', once: true },
    })
  })

  gsap.fromTo('.method-card', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
    opacity: 1, y: 0, scale: 1, stagger: STAGGER.card, duration: DUR.reveal, ease: EASE.out,
    scrollTrigger: { trigger: '.methods__grid', start: 'top 80%', once: true },
  })

  gsap.fromTo('.about-collection .season-card', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
    opacity: 1, y: 0, scale: 1, stagger: STAGGER.card, duration: DUR.reveal, ease: EASE.out,
    scrollTrigger: { trigger: '.about-collection__grid', start: 'top 80%', once: true },
  })

  gsap.fromTo('.stats__item', { opacity: 0, y: DIST.sm }, {
    opacity: 1, y: 0, stagger: STAGGER.card, duration: DUR.reveal, ease: EASE.soft,
    scrollTrigger: { trigger: '.stats', start: 'top 85%', once: true },
  })
}
