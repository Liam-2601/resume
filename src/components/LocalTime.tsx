import { HOME_TIMEZONE } from '../data/career'
import { useLanguage } from '../i18n/LanguageContext'
import { useMinuteClock, utcOffsetMinutes } from '../lib/localTime'

/** Sun icon from 07:00 to 19:59 in `HOME_TIMEZONE`, moon otherwise. */
const DAY_START = 7
const DAY_END = 20

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  className: 'h-3.5 w-3.5 shrink-0 text-accent-2',
} as const

/**
 * A live clock for where I'm based, with how far that is from the visitor's own time —
 * handy for anyone reaching out from another timezone. Ticks on the minute.
 */
export default function LocalTime() {
  const { locale, t } = useLanguage()
  const { localTime } = t
  const now = useMinuteClock()

  const parts = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23', // 00:05, never 24:05
    timeZone: HOME_TIMEZONE,
  }).formatToParts(now)
  const hours = parts.find((p) => p.type === 'hour')?.value ?? '--'
  const minutes = parts.find((p) => p.type === 'minute')?.value ?? '--'
  const isDay = Number(hours) >= DAY_START && Number(hours) < DAY_END

  // positive: my clock is ahead of the visitor's
  const diff = utcOffsetMinutes(HOME_TIMEZONE, now) - utcOffsetMinutes(undefined, now)
  const apart = (+(Math.abs(diff) / 60).toFixed(2)).toLocaleString(locale)
  const relative =
    diff === 0 ? localTime.same : (diff > 0 ? localTime.ahead : localTime.behind).replace('{h}', apart)

  return (
    <div className="mt-2.5 space-y-0.5">
      <p aria-hidden className="flex items-center gap-1.5 text-sm font-semibold tabular-nums text-ink">
        {isDay ? (
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          <svg {...iconProps}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
          </svg>
        )}
        <span>
          {hours}
          <span className="animate-colon-blink">:</span>
          {minutes}
        </span>
      </p>
      <p aria-hidden className="text-xs text-ink-faint">
        {relative}
      </p>
      <span className="sr-only">{`${localTime.label} ${hours}:${minutes}, ${relative}`}</span>
    </div>
  )
}
