import { useEffect, useRef, useState } from 'react'

export interface StageInfo {
  id: string
  label: string
}

/** Apple-style segmented control: a pill that measures and slides to whichever tab is active. */
export default function TabBar({ stages }: { stages: StageInfo[] }) {
  const containerRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(stages[0]?.id)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    const els = stages
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [stages])

  useEffect(() => {
    const measure = () => {
      const container = containerRef.current
      if (!container || !active) return
      const activeEl = container.querySelector<HTMLElement>(`[data-value="${CSS.escape(active)}"]`)
      if (activeEl) setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth })
    }
    measure()
    // re-measure once web fonts finish swapping in, since that can shift label widths
    document.fonts?.ready?.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [active, stages])

  return (
    <nav
      ref={containerRef}
      aria-label="Page sections"
      className="relative hidden items-center rounded-full border border-line/70 bg-paper-raised/70 p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_24px_-16px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:flex"
    >
      <span
        aria-hidden
        className="absolute inset-y-1 rounded-full bg-accent shadow-sm shadow-accent/30 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {stages.map((s) => {
        const isActive = active === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-value={s.id}
            aria-current={isActive ? 'true' : undefined}
            className={`relative z-10 whitespace-nowrap rounded-full px-4 py-2 text-center font-mono text-[13px] uppercase tracking-wide transition-colors duration-200 ${
              isActive ? 'text-accent-ink' : 'text-ink-soft hover:text-ink'
            }`}
          >
            {s.label}
          </a>
        )
      })}
    </nav>
  )
}
