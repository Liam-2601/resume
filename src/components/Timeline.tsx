import { useEffect, useRef, type ReactNode } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { roleDuration } from '../lib/experience'

/** Where on screen, as a fraction of the viewport height, the fill and dots follow your scroll. */
const READING_LINE = 0.55

/**
 * A vertical rail whose accent fill grows as you scroll, lighting each
 * `TimelineItem`'s dot as the fill reaches it. The scroll work is done straight on
 * the DOM (one CSS variable + one attribute per item, rAF-throttled) so scrolling
 * never re-renders React.
 */
export function Timeline({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const update = useRef<() => void>(() => {})

  useEffect(() => {
    const root = ref.current
    if (!root) return

    update.current = () => {
      const rail = root.querySelector<HTMLElement>('[data-timeline-rail]')
      if (!rail) return
      const line = window.innerHeight * READING_LINE
      const rect = rail.getBoundingClientRect()
      root.style.setProperty('--timeline-fill', `${Math.min(Math.max(line - rect.top, 0), rect.height)}px`)
      root.querySelectorAll<HTMLElement>('[data-timeline-item]').forEach((item) => {
        const dot = item.querySelector('[data-timeline-dot]')?.getBoundingClientRect()
        if (!dot) return
        const lit = dot.top + dot.height / 2 <= line
        if ((item.dataset.lit === 'true') !== lit) item.dataset.lit = String(lit)
      })
    }

    let frame = 0
    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        update.current()
      })
    }
    update.current()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // fonts and images settling change the layout without any scroll
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(root)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      resizeObserver.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  // items are remounted when the language changes, so re-measure after every render
  useEffect(() => update.current())

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        aria-hidden
        data-timeline-rail
        className="absolute bottom-2 left-0 top-2 w-px -translate-x-1/2 bg-gradient-to-b from-line via-line to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-0 top-2 w-px -translate-x-1/2 bg-accent shadow-[0_0_10px_1px_color-mix(in_oklab,var(--color-accent)_55%,transparent)]"
        style={{ height: 'var(--timeline-fill, 0px)' }}
      />
      {children}
    </div>
  )
}

/**
 * One stop on the rail. The rail's line runs exactly along the content edge, so it sits as far from the
 * left of the page as the cards do from the right; the 12px dots are centred on it and overhang by 6px.
 * `current` adds a pulsing "live" ring for a role that's still ongoing.
 */
export function TimelineItem({ current = false, children }: { current?: boolean; children: ReactNode }) {
  return (
    <div data-timeline-item className="group/item relative pl-4 sm:pl-5">
      <span
        data-timeline-dot
        className="absolute left-0 top-7 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-line bg-paper transition-[background-color,border-color,box-shadow] duration-300 group-data-[lit=true]/item:border-accent group-data-[lit=true]/item:bg-accent group-data-[lit=true]/item:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-accent)_22%,transparent)] motion-reduce:transition-none"
      >
        {current && (
          <span aria-hidden className="absolute -inset-0.5 animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
        )}
      </span>
      {children}
    </div>
  )
}

/** "1 year 2 months" — how long a role lasted (or has lasted so far). */
export function DurationChip({ role }: { role: { from: string; to?: string } }) {
  const { t } = useLanguage()
  const ongoing = !role.to
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[12px] font-semibold ${
        ongoing ? 'bg-accent/15 text-accent-2' : 'border border-line text-ink-soft'
      }`}
    >
      {roleDuration(role, t.experience)
        .map((p) => `${p.value} ${p.unit}`)
        .join(' ')}
    </span>
  )
}
