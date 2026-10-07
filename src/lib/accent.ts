import { useHtmlAttribute } from './htmlAttribute'
import { withTransition } from './viewTransition'

/**
 * Accent presets. The colours themselves live in index.css (`[data-accent=…]`),
 * each with a light and a dark variant checked for contrast; this list is just
 * the ids, in display order. `teal` is the default (no `data-accent` set until chosen).
 */
export const ACCENTS = ['teal', 'blue', 'violet', 'rose', 'orange'] as const
export type Accent = (typeof ACCENTS)[number]

const isAccent = (value: string | undefined): value is Accent => ACCENTS.includes(value as Accent)

export function useAccent(): Accent {
  const value = useHtmlAttribute('data-accent')
  return isAccent(value) ? value : 'teal'
}

export function setAccent(accent: Accent) {
  withTransition(() => {
    document.documentElement.dataset.accent = accent
  })
  try {
    localStorage.setItem('accent', accent)
  } catch {
    // ignore (private browsing / storage disabled)
  }
}
