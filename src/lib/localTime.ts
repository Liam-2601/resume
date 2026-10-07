import { useEffect, useState } from 'react'

/**
 * A timezone's offset from UTC at `date`, in minutes — e.g. Zürich in summer is +120. Read from
 * Intl rather than hard-coded, so daylight saving (which the US and Europe switch on different
 * dates) is always right. `undefined` means the visitor's own timezone.
 */
export function utcOffsetMinutes(timeZone: string | undefined, date: Date): number {
  const name =
    new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
      .formatToParts(date)
      .find((part) => part.type === 'timeZoneName')?.value ?? 'GMT'
  const match = name.match(/GMT([+−-])(\d{1,2})(?::(\d{2}))?/) // some engines print a real minus sign
  if (!match) return 0 // plain "GMT" is UTC
  return (match[1] === '+' ? 1 : -1) * (Number(match[2]) * 60 + Number(match[3] ?? 0))
}

/** The current time, refreshed on every minute boundary (and when the tab comes back to the foreground). */
export function useMinuteClock(): Date {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timer = 0
    const schedule = () => {
      timer = window.setTimeout(() => {
        setNow(new Date())
        schedule()
      }, 60_000 - (Date.now() % 60_000) + 50)
    }
    const onVisible = () => {
      if (document.visibilityState === 'visible') setNow(new Date())
    }
    schedule()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return now
}
