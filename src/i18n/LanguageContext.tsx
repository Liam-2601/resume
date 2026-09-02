import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LOCALES, type Locale } from './types'
import { ui } from './ui'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (typeof ui)['en']
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  try {
    const stored = localStorage.getItem('locale')
    if (stored && LOCALES.includes(stored as Locale)) return stored as Locale
  } catch {
    // ignore (private browsing / storage disabled)
  }
  return navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      localStorage.setItem('locale', locale)
    } catch {
      // ignore
    }
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({ locale, setLocale: setLocaleState, t: ui[locale] }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
