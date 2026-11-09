import type { gsap as GsapInstance } from 'gsap'

/**
 * The single motion vocabulary for the site. Personality: luxury — slow, soft,
 * minimal. Durations, easings and distances live here and nowhere else; the
 * CSS counterparts are the --dur-* / --ease-* tokens in styles/tokens.css.
 */
export const DUR = {
  micro: 0.18,
  element: 0.3,
  view: 0.45,
  reveal: 0.9,
  story: 1.2,
} as const

export const EASE = {
  out: 'power3.out',
  soft: 'power2.out',
  cinematic: 'expo.out',
  inOut: 'power2.inOut',
} as const

export const DIST = { sm: 16, md: 28, lg: 48 } as const
export const STAGGER = { tight: 0.06, card: 0.12 } as const
export const SCALE_IN = 0.97

export type Gsap = typeof GsapInstance

export interface MotionTier {
  /** Viewport >= 768px and motion allowed: pinning and scrubbed storytelling. */
  full: boolean
  /** Viewport < 768px and motion allowed: simple one-shot reveals only. */
  lite: boolean
}

/** A page's animation recipe. It runs inside a scoped gsap.matchMedia context. */
export type MotionBuilder = (gsap: Gsap, tier: MotionTier) => void
