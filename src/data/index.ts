import type { Locale } from '../i18n/types'
import { useLanguage } from '../i18n/LanguageContext'
import { resumeEn } from './resume.en'
import { resumeDe } from './resume.de'
import type { Resume } from './types'

export const resumeByLocale: Record<Locale, Resume> = {
  en: resumeEn,
  de: resumeDe,
}

/** The résumé content for the currently selected language. */
export function useResume(): Resume {
  const { locale } = useLanguage()
  return resumeByLocale[locale]
}

export * from './types'
