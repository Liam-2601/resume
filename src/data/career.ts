/**
 * When the career started (Sunrise apprenticeship, August 2021). The
 * "Experience" counter on the intro stage counts up from this date, so it
 * stays current without ever being edited. Language-independent, hence not
 * part of the per-language résumé files.
 */
export const CAREER_START = new Date(2021, 7, 1)

/**
 * Where the live clock on the "Based in" card tells the time. An IANA zone, not an offset,
 * so daylight saving is handled; language-independent, like CAREER_START.
 */
export const HOME_TIMEZONE = 'Europe/Zurich'
