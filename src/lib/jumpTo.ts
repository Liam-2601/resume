/**
 * Where a command-menu result should take you:
 *  - `section`: a top-level stage (`#experience`), scrolled to the top like the nav does
 *  - `card`: one card by element id — centred, then pulsed so you can see where you landed
 *  - `skill`: a skill chip by name — falls back to the skills section if it's filtered out
 */
export type JumpTarget = { section: string } | { card: string } | { skill: string }

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function resolve(target: JumpTarget): { el: HTMLElement; highlight: boolean } | null {
  if ('section' in target) {
    const el = document.getElementById(target.section)
    return el && { el, highlight: false }
  }
  if ('card' in target) {
    const el = document.getElementById(target.card)
    return el && { el, highlight: true }
  }
  const chip = Array.from(document.querySelectorAll<HTMLElement>('[data-skill]')).find(
    (el) => el.dataset.skill === target.skill,
  )
  if (chip) return { el: chip, highlight: true }
  const section = document.getElementById('skills')
  return section && { el: section, highlight: false }
}

/** Calls `done` once `el` has stopped moving — i.e. the (smooth) scroll has arrived. */
function whenScrollSettled(el: HTMLElement, done: () => void) {
  let last = el.getBoundingClientRect().top
  let still = 0
  let frames = 0
  const tick = () => {
    const top = el.getBoundingClientRect().top
    still = Math.abs(top - last) < 0.5 ? still + 1 : 0
    last = top
    frames += 1
    // ~100ms without movement (after a short head start), or give up after ~2.5s
    if ((still >= 6 && frames >= 8) || frames > 150) done()
    else requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/**
 * Resolves once the page's own finite animations touching `el` — a chip's
 * pop-in, a card's fade-in via its wrapper — have finished, so the pulse isn't
 * played on something still half transparent. Capped, in case one never ends.
 */
function whenAnimationsDone(el: HTMLElement): Promise<void> {
  const running = document.getAnimations().filter((a) => {
    const effect = a.effect as KeyframeEffect | null
    const target = effect?.target
    return !!target && (target.contains(el) || el.contains(target)) && effect.getComputedTiming().iterations !== Infinity
  })
  const finished = Promise.allSettled(running.map((a) => a.finished))
  const cap = new Promise((resolve) => setTimeout(resolve, 1500))
  return Promise.race([finished, cap]).then(() => undefined)
}

/**
 * An accent ring that swells and fades. Uses the Web Animations API rather
 * than a CSS class so it can't clash with an element's own `animation`
 * (skill chips pop in with one) and nothing needs cleaning up afterwards.
 */
function pulse(el: HTMLElement) {
  if (reducedMotion()) return
  const ring = (alpha: number, spread: number) =>
    `0 0 0 ${spread}px color-mix(in oklab, var(--color-accent) ${alpha}%, transparent)`
  el.animate(
    [{ boxShadow: ring(80, 0) }, { boxShadow: ring(45, 6), offset: 0.35 }, { boxShadow: ring(0, 14) }],
    { duration: 1400, easing: 'ease-out' },
  )
}

export function jumpTo(target: JumpTarget) {
  const found = resolve(target)
  if (!found) return
  const { el, highlight } = found
  // no `behavior`, so the page's own scroll-behavior (smooth, or auto under reduced motion) applies
  el.scrollIntoView({ block: highlight ? 'center' : 'start' })
  if (highlight) whenScrollSettled(el, () => void whenAnimationsDone(el).then(() => pulse(el)))
}
