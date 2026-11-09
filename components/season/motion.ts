import { DIST, DUR, EASE, SCALE_IN, STAGGER, type MotionBuilder } from '@/lib/motion'

/** Season page choreography. Selectors are scoped to SeasonView by useMotion. */
export const buildSeasonMotion: MotionBuilder = (gsap, { full }) => {
  /* ── Hero entrance (all tiers) ── */
  gsap
    .timeline({ delay: 0.2 })
    .fromTo('.season-hero__line', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: EASE.soft })
    .fromTo('.season-hero__number', { opacity: 0, y: DIST.sm }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft }, '-=0.4')
    .fromTo(
      '.season-hero__title',
      { opacity: 0, y: DIST.lg, scale: SCALE_IN },
      { opacity: 1, y: 0, scale: 1, duration: DUR.story * 1.2, ease: EASE.cinematic },
      '-=0.5',
    )
    .fromTo('.season-hero__tagline', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.out }, '-=0.9')
    .fromTo('.season-hero .scroll-cue', { opacity: 0 }, { opacity: 1, duration: DUR.reveal }, '-=0.5')

  gsap.to('.hero-mesh', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: '.season-hero', start: 'top top', end: 'bottom top', scrub: true },
  })

  /* ── Bottle reveal: pinned and scrubbed on desktop, simple reveals on phones ── */
  if (full) {
    gsap
      .timeline({
        defaults: { ease: EASE.soft },
        scrollTrigger: {
          trigger: '.pin-section',
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      .fromTo('.pin-ring--inner', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.8 }, 0)
      .fromTo('.pin-ring--outer', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 1 }, 0.1)
      .fromTo('.pin-bottle', { opacity: 0, scale: 0.6, y: DIST.lg * 2, rotation: -6 }, { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1.3 }, 0.1)
      .fromTo('.pin-name', { opacity: 0, y: DIST.lg, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9 }, 0.4)
      .fromTo('.pin-tagline', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: 0.5 }, 0.6)
      .fromTo('.pin-desc', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.75)
      .fromTo('.pin-note', { opacity: 0, x: -DIST.lg }, { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 }, 0.9)
      .to('.pin-bottle', { rotation: 3, scale: 1.06, duration: 0.8, ease: EASE.inOut }, 1.4)
      .to('.pin-ring--inner', { scale: 1.3, opacity: 0.34, duration: 0.6 }, 1.4)
      .to('.pin-ring--outer', { scale: 1.4, opacity: 0.4, duration: 0.6 }, 1.4)
  } else {
    gsap.fromTo(
      ['.pin-ring--inner', '.pin-ring--outer', '.pin-bottle'],
      { opacity: 0, y: DIST.md },
      {
        opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.out, stagger: STAGGER.card,
        scrollTrigger: { trigger: '.pin-visual', start: 'top 85%', once: true },
      },
    )
    gsap.fromTo(
      ['.pin-name', '.pin-tagline', '.pin-desc', '.pin-note'],
      { opacity: 0, y: DIST.md },
      {
        opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.out, stagger: STAGGER.tight,
        scrollTrigger: { trigger: '.pin-copy', start: 'top 85%', once: true },
      },
    )
  }

  /* ── Notes grid ── */
  gsap.fromTo('.note-card', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
    opacity: 1, y: 0, scale: 1, duration: DUR.story, stagger: STAGGER.card, ease: EASE.out,
    scrollTrigger: { trigger: '.notes', start: 'top 75%', once: true },
  })

  /* ── Story ── */
  const storyTrigger = { trigger: '.story', start: 'top 76%', once: true }
  gsap.fromTo('.story__line', { scaleY: 0 }, { scaleY: 1, duration: DUR.story, ease: EASE.soft, transformOrigin: 'top', scrollTrigger: storyTrigger })
  gsap.fromTo('.story__heading', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.story, ease: EASE.out, scrollTrigger: storyTrigger })
  gsap.fromTo('.story__body', { opacity: 0, y: DIST.md }, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.soft, delay: 0.15, scrollTrigger: storyTrigger })
  gsap.fromTo('.story__craft', { opacity: 0, x: -DIST.sm }, {
    opacity: 1, x: 0, duration: DUR.reveal, ease: EASE.soft,
    scrollTrigger: { trigger: '.story__craft', start: 'top 88%', once: true },
  })

  /* ── Other seasons ── */
  gsap.fromTo('.journey .season-card', { opacity: 0, y: DIST.lg, scale: SCALE_IN }, {
    opacity: 1, y: 0, scale: 1, duration: DUR.reveal, stagger: STAGGER.card, ease: EASE.out,
    scrollTrigger: { trigger: '.journey', start: 'top 80%', once: true },
  })
}
