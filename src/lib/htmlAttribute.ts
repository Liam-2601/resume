import { useSyncExternalStore } from 'react'

/**
 * Reads an attribute of `<html>` as React state. Theme and accent live there (set
 * before first paint by the inline script in index.html), so watching the attribute
 * keeps every control in sync without prop drilling.
 */
export function useHtmlAttribute(name: string): string | undefined {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange)
      observer.observe(document.documentElement, { attributes: true, attributeFilter: [name] })
      return () => observer.disconnect()
    },
    () => document.documentElement.getAttribute(name) ?? undefined,
    () => undefined,
  )
}
