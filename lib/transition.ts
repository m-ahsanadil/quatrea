/**
 * Bridges a started view transition and the Next.js navigation it wraps:
 * the transition's update callback waits on a promise that RouteEffects
 * resolves once the new route is committed. The timeout guarantees that a
 * navigation which never reports back cannot freeze the page behind a
 * transition: the animation is optional, the navigation is not.
 */
const FALLBACK_MS = 1500

let pending: { resolve: () => void; timer: number } | null = null

export function armNavigation(resolve: () => void): void {
  completeNavigation()
  pending = { resolve, timer: window.setTimeout(completeNavigation, FALLBACK_MS) }
}

export function completeNavigation(): void {
  if (!pending) return
  const { resolve, timer } = pending
  pending = null
  window.clearTimeout(timer)
  resolve()
}
