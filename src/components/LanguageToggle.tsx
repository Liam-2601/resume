import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage()
  const other = locale === 'en' ? 'de' : 'en'

  return (
    <button
      type="button"
      onClick={() => setLocale(other)}
      aria-label={`Switch to ${other === 'de' ? 'German' : 'English'}`}
      className="flex h-8 min-w-8 items-center justify-center rounded-full border border-line px-2 font-mono text-[11px] font-semibold uppercase text-ink-soft transition-colors hover:border-accent-2 hover:text-accent-2"
    >
      {locale}
    </button>
  )
}
