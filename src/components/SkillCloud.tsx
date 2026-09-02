import { useEffect, useRef, useState, type CSSProperties } from 'react'
import type { SkillGroup } from '../data'
import { useLanguage } from '../i18n/LanguageContext'
import TechIcon from './TechIcon'

export default function SkillCloud({ groups }: { groups: SkillGroup[] }) {
  const { t } = useLanguage()
  const categories = [t.allFilter, ...groups.map((g) => g.label)]
  const [active, setActive] = useState(t.allFilter)

  useEffect(() => {
    setActive(t.allFilter)
  }, [t.allFilter])

  const items =
    active === t.allFilter ? groups.flatMap((g) => g.items) : groups.find((g) => g.label === active)?.items ?? []

  return (
    <div>
      <FilterBar categories={categories} active={active} onChange={setActive} />
      <SkillGrid key={active} items={items} />
    </div>
  )
}

function FilterBar({
  categories,
  active,
  onChange,
}: {
  categories: string[]
  active: string
  onChange: (value: string) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const activeEl = container.querySelector<HTMLButtonElement>(`[data-value="${CSS.escape(active)}"]`)
    if (activeEl) setIndicator({ left: activeEl.offsetLeft, width: activeEl.offsetWidth })
  }, [active])

  return (
    <div
      ref={containerRef}
      className="relative mb-8 flex w-full max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-paper-raised/70 p-1 backdrop-blur"
    >
      <span
        aria-hidden
        className="absolute inset-y-1 rounded-full bg-accent transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ left: indicator.left, width: indicator.width }}
      />
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          data-value={c}
          aria-pressed={active === c}
          onClick={() => onChange(c)}
          className={`relative z-10 shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors duration-200 ${
            active === c ? 'text-accent-ink' : 'text-ink-soft hover:text-ink'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

function SkillGrid({ items }: { items: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-wrap gap-2.5">
      {items.map((item, i) => (
        <SkillChip
          key={item}
          name={item}
          className={shown ? 'animate-chip-pop' : 'opacity-0'}
          style={{ animationDelay: `${i * 35}ms` }}
        />
      ))}
    </div>
  )
}

function SkillChip({
  name,
  className = '',
  style,
}: {
  name: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      style={style}
      className={`group inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised px-3.5 py-2 font-mono text-xs text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-2/50 hover:text-ink hover:shadow-[0_8px_20px_-12px_rgba(0,0,0,0.25)] ${className}`}
    >
      <TechIcon name={name} hoverBrand className="h-4 w-4" />
      {name}
    </span>
  )
}
