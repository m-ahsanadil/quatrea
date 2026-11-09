import type Lenis from 'lenis'

/**
 * Holds the one smooth-scroll instance so other components (mobile menu,
 * route changes) can pause or reset it without owning it.
 */
let instance: Lenis | null = null

export function setScroller(next: Lenis | null): void {
  instance = next
}

export function getScroller(): Lenis | null {
  return instance
}
