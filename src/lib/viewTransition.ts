/**
 * Runs a page-wide DOM change inside a View Transition, so everything that
 * changes colour does so together instead of some elements easing and others
 * snapping. Without support — or with reduced motion on — it just runs the change.
 *
 * By default that's the browser's cross-fade. Pass `reveal` (viewport coordinates)
 * to instead expand the new state as a circle from that point, covering the page.
 */
export function withTransition(update: () => void, reveal?: { x: number; y: number }) {
  if (!('startViewTransition' in document) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    update()
    return
  }
  if (!reveal) {
    document.startViewTransition(update)
    return
  }

  // `theme-reveal` (index.css) swaps the cross-fade for our animation and pauses the
  // page's own colour transitions, which would otherwise still be mid-fade inside the circle.
  const root = document.documentElement
  root.classList.add('theme-reveal')
  const transition = document.startViewTransition(update)

  transition.ready
    .then(() => {
      const { x, y } = reveal
      // far enough to reach the corner of the viewport that's furthest from the origin
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
    .catch(() => {
      // skipped (e.g. toggled again mid-reveal): the change still applies, just without the circle
    })
  transition.finished.finally(() => root.classList.remove('theme-reveal'))
}
