import type { Language } from '../data'
import { useLanguage } from '../i18n/LanguageContext'

const LEVELS: Language['level'][] = ['Basic', 'Conversational', 'Fluent', 'Native']

export default function Languages({ items }: { items: Language[] }) {
  const { t } = useLanguage()

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((lang) => {
        const strength = LEVELS.indexOf(lang.level) + 1
        return (
          <div key={lang.name} className="rounded-2xl border border-line bg-paper-raised p-4">
            <p className="text-sm font-semibold text-ink">{lang.name}</p>
            <div className="mt-2.5 flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                {t.languageLevels[lang.level]}
              </span>
              <div className="flex gap-1" aria-hidden>
                {LEVELS.map((level) => (
                  <span
                    key={level}
                    className={`h-1.5 w-4 rounded-full ${
                      LEVELS.indexOf(level) < strength ? 'bg-accent' : 'bg-line'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
