import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { elapsedParts } from '../lib/experience'

const COUNT_UP_MS = 1800

export default function ExperienceCounter({ since, className = '' }: { since: Date; className?: string }) {
  const { locale, t } = useLanguage()
  const { experience } = t
  const ref = useRef<HTMLDivElement>(null)
  // 0 → 1 while counting up; the shown numbers are scaled by it.
  const [progress, setProgress] = useState(0)

  // Units are chosen from the final values so "year" never flips to "years" mid-count.
  const parts = useMemo(() => elapsedParts(since, experience), [since, experience])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(1)
      return
    }

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const startedAt = performance.now()
        const tick = (now: number) => {
          const linear = Math.min((now - startedAt) / COUNT_UP_MS, 1)
          setProgress(1 - Math.pow(1 - linear, 4)) // ease-out quart
          if (linear < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  const sinceLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(since)

  return (
    <div ref={ref} className={`rounded-2xl border border-line bg-paper-raised p-3.5 ${className}`}>
      <p className="text-[11px] uppercase tracking-wide text-accent-2">{experience.label}</p>
      <p className="sr-only">{parts.map((p) => `${p.value} ${p.unit}`).join(' ')}</p>
      <p aria-hidden className="mt-1.5 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-ink">
        {parts.map((p) => (
          <span key={p.unit} className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold leading-none tabular-nums">{Math.round(progress * p.value)}</span>
            <span className="text-sm text-ink-soft">{p.unit}</span>
          </span>
        ))}
      </p>
      <p className="mt-2 text-xs text-ink-faint">
        {experience.since} {sinceLabel}
      </p>
    </div>
  )
}
