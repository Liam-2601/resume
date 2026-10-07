import { useLanguage } from '../i18n/LanguageContext'
import { ACCENTS, setAccent, useAccent } from '../lib/accent'

/** A row of colour dots that recolours the whole site. The choice is remembered. */
export default function AccentPicker({ className = '' }: { className?: string }) {
  const { t } = useLanguage()
  const active = useAccent()

  return (
    <div role="group" aria-label={t.accent.label} className={`flex items-center ${className}`}>
      {ACCENTS.map((accent) => {
        const name = t.accent.names[accent]
        const isActive = accent === active
        return (
          <button
            key={accent}
            type="button"
            title={name}
            aria-label={name}
            aria-pressed={isActive}
            onClick={() => setAccent(accent)}
            className="group rounded-full p-1.5"
          >
            <span
              data-accent={accent}
              className={`accent-swatch block h-3.5 w-3.5 rounded-full transition-transform duration-200 group-hover:scale-125 ${
                isActive ? 'ring-2 ring-ink-soft ring-offset-2 ring-offset-paper' : ''
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
