import { useHtmlAttribute } from './htmlAttribute'
import { withTransition } from './viewTransition'

export type Theme = 'light' | 'dark'

/** The theme lives on `<html data-theme>`, set before first paint by the inline script in index.html. */
export function useTheme(): Theme {
  return useHtmlAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

/** Where the switch should radiate from: the nav toggle, however the change was triggered. */
function revealOrigin() {
  const rect = document.querySelector('[data-theme-toggle]')?.getBoundingClientRect()
  return rect
    ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    : { x: window.innerWidth, y: 0 }
}

export function toggleTheme() {
  const root = document.documentElement
  const next: Theme = root.dataset.theme === 'dark' ? 'light' : 'dark'
  withTransition(() => {
    root.dataset.theme = next
  }, revealOrigin())
  try {
    localStorage.setItem('theme', next)
  } catch {
    // ignore (private browsing / storage disabled)
  }
}
