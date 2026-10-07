/** `YYYY-MM` → the first of that month (local time). */
function parseMonth(value: string) {
  const [year, month] = value.split('-').map(Number)
  return new Date(year, month - 1, 1)
}

export interface ExperienceUnits {
  year: string
  years: string
  month: string
  months: string
}

export interface ElapsedPart {
  value: number
  unit: string
}

/**
 * Whole calendar time elapsed since `since`, as display parts — e.g.
 * `[{ 5, 'years' }, { 2, 'months' }]`. A zero part is dropped, but there is
 * always at least one (a brand-new start date reads "0 months").
 */
export function elapsedParts(since: Date, units: ExperienceUnits, now = new Date()): ElapsedPart[] {
  const raw = (now.getFullYear() - since.getFullYear()) * 12 + (now.getMonth() - since.getMonth())
  const total = Math.max(0, now.getDate() < since.getDate() ? raw - 1 : raw)
  const years = Math.floor(total / 12)
  const months = total % 12

  return [
    { value: years, unit: years === 1 ? units.year : units.years },
    { value: months, unit: months === 1 ? units.month : units.months },
  ].filter((part, i) => part.value > 0 || (i === 1 && years === 0))
}

/**
 * How long a role lasted: whole months from its `from` month to its `to` month, or to
 * today when it's ongoing (`to` left out) — Aug 2021 → Aug 2025 reads "4 years".
 */
export function roleDuration(role: { from: string; to?: string }, units: ExperienceUnits): ElapsedPart[] {
  return elapsedParts(parseMonth(role.from), units, role.to ? parseMonth(role.to) : new Date())
}
