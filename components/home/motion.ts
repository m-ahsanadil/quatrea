import { DIST, DUR, EASE, SCALE_IN, STAGGER, type MotionBuilder } from '@/lib/motion'

/** Home page choreography. Selectors are scoped to HomeView by useMotion. */
export const buildHomeMotion: MotionBuilder = (gsap) => {
  /* ── Hero entrance ── */
  gsap
    .timeline({ delay: 0.3 })
    .fromTo('.hero__ornament', { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: EASE.soft })
    .fromTo('.hero__eyebrow', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.4')
    .fromTo(
      '.hero__letter',
      { yPercent: 110, opacity: 0, rotateX: 40 },
      { yPercent: 0, opacity: 1, rotateX: 0, duration: DUR.story, ease: EASE.cinematic, stagger: 0.03 },
      '-=0.5',
    )
    .fromTo('.hero__divider', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: DUR.reveal, ease: EASE.soft }, '-=0.6')
    .fromTo('.hero__tagline', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.5')
    .fromTo('.hero__cta', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.6')
    .fromTo('.hero .scroll-cue__line', { scaleY: 0 }, { scaleY: 1, duration: DUR.story, ease: EASE.soft, transformOrigin: 'top' }, '-=0.6')

  /* ── Hero parallax ── */
  gsap.to('.hero-mesh', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  })
  gsap.to('.hero__content', {
    yPercent: 30,
    opacity: 0,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '65% top', scrub: true },
  })

  /* ── Marquee ── */
  gsap.fromTo('.marquee', { opacity: 0 }, {
    opacity: 1, duration: DUR.story, ease: EASE.soft,
    scrollTrigger: { trigger: '.marquee', start: 'top 92%', once: true },
  })

  /* ── Cinematic quote ── */
  const quoteTrigger = { trigger: '.quote', start: 'top 78%', once: true }
  gsap.fromTo('.quote__rule', { scaleX: 0 }, { scaleX: 1, duration: DUR.story * 1.2, ease: EASE.soft, scrollTrigger: quoteTrigger })
  gsap.fromTo(['.quote__text', '.quote__attribution'], { opacity: 0, y: DIST.md }, {
    opacity: 1, y: 0, duration: DUR.story, ease: EASE.out, stagger: STAGGER.card, scrollTrigger: quoteTrigger,
  })

  /* ── Season cards ── */
  gsap.fromTo('.collection .season-card', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
    opacity: 1, y: 0, scale: 1, duration: DUR.story, stagger: STAGGER.card, ease: EASE.cinematic,
    scrollTrigger: { trigger: '.collection__grid', start: 'top 85%', once: true },
  })

  /* ── Bottles ── */
  gsap.fromTo('.showcase__link', { opacity: 0, y: DIST.lg }, {
    opacity: 1, y: 0, duration: DUR.reveal, stagger: STAGGER.card, ease: EASE.out,
    scrollTrigger: { trigger: '.showcase', start: 'top 78%', once: true },
  })

  /* ── Philosophy ── */
  const philosophyTrigger = { trigger: '.philosophy', start: 'top 76%', once: true }
  gsap.fromTo('.philosophy__rule', { scaleX: 0 }, { scaleX: 1, duration: DUR.story, ease: EASE.soft, scrollTrigger: philosophyTrigger })
  gsap.fromTo('.philosophy__heading', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.story, ease: EASE.out, scrollTrigger: philosophyTrigger })
  gsap.fromTo('.philosophy__text', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft, delay: 0.15, scrollTrigger: philosophyTrigger })
  gsap.fromTo('.philosophy .text-link', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft, delay: 0.3, scrollTrigger: philosophyTrigger })
}
