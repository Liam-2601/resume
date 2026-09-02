import type { ReactNode } from 'react'

/** Generic outline icons for common soft-skill / non-technical résumé terms. */
const ICONS: Record<string, ReactNode> = {
  communication: (
    <path d="M21 11.5c0 4.14-4.03 7.5-9 7.5-1.06 0-2.08-.15-3.02-.44L3 21l1.6-4.35C3.6 15.4 3 13.5 3 11.5 3 7.36 7.03 4 12 4s9 3.36 9 7.5Z" />
  ),
  teamwork: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16.5" cy="9.5" r="2.5" />
      <path d="M2 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
      <path d="M15 14.8a4 4 0 0 1 6.5 3.2v1" />
    </>
  ),
  'problem solving': (
    <>
      <path d="M9.5 18h5" />
      <path d="M10 21h4" />
      <path d="M12 3a6.3 6.3 0 0 0-4.2 11c.6.55 1 1.34 1 2.17V16h6.4v-.13c0-.83.4-1.62 1-2.17A6.3 6.3 0 0 0 12 3Z" />
    </>
  ),
  'critical thinking': (
    <>
      <path d="M9.5 18h5" />
      <path d="M10 21h4" />
      <path d="M12 3a6.3 6.3 0 0 0-4.2 11c.6.55 1 1.34 1 2.17V16h6.4v-.13c0-.83.4-1.62 1-2.17A6.3 6.3 0 0 0 12 3Z" />
    </>
  ),
  adaptability: (
    <>
      <path d="M21 12a9 9 0 1 1-2.6-6.35" />
      <path d="M21 3v6h-6" />
    </>
  ),
  flexibility: (
    <>
      <path d="M21 12a9 9 0 1 1-2.6-6.35" />
      <path d="M21 3v6h-6" />
    </>
  ),
  leadership: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4h14l-3.5 4L19 12H5" />
    </>
  ),
  'time management': (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 1.5" />
      <path d="M9 2h6" />
    </>
  ),
  creativity: (
    <>
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="3" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="21" y2="12" />
      <line x1="5.6" y1="5.6" x2="8.4" y2="8.4" />
      <line x1="15.6" y1="15.6" x2="18.4" y2="18.4" />
      <line x1="18.4" y1="5.6" x2="15.6" y2="8.4" />
      <line x1="8.4" y1="15.6" x2="5.6" y2="18.4" />
    </>
  ),
  empathy: (
    <path d="M20.8 8.7c0 4.4-8.8 10.4-8.8 10.4S3.2 13.1 3.2 8.7a4.6 4.6 0 0 1 8.8-1.85A4.6 4.6 0 0 1 20.8 8.7Z" />
  ),
  discipline: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  resilience: (
    <path d="M12 3c1.5 3 4.5 4.5 4.5 9a4.5 4.5 0 0 1-9 0c0-1.5.7-2.5 1.5-3.5.3 1 .8 1.5 1.5 1.5-.3-2.5.5-4.5 1.5-7Z" />
  ),
  mentoring: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-1a6 6 0 0 1 6-6h.5" />
      <path d="m16 14 2 2 4-4" />
    </>
  ),
  organization: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <line x1="8.5" y1="11" x2="15.5" y2="11" />
      <line x1="8.5" y1="15" x2="15.5" y2="15" />
    </>
  ),
  'public speaking': (
    <>
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
      <path d="M19 11a7 7 0 0 1-14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </>
  ),
  presentation: (
    <>
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
      <path d="M19 11a7 7 0 0 1-14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </>
  ),
}

const ALIASES: Record<string, string> = {
  collaboration: 'teamwork',
  'team work': 'teamwork',
  teamworking: 'teamwork',
  'problem-solving': 'problem solving',
  'analytical thinking': 'critical thinking',
  'adaptability & flexibility': 'adaptability',
  'time-management': 'time management',
  // German terms, so icons still resolve when the résumé content is localized.
  kommunikation: 'communication',
  teamarbeit: 'teamwork',
  teamfähigkeit: 'teamwork',
  zusammenarbeit: 'teamwork',
  problemlösung: 'problem solving',
  'kritisches denken': 'critical thinking',
  anpassungsfähigkeit: 'adaptability',
  flexibilität: 'adaptability',
  führung: 'leadership',
  führungskompetenz: 'leadership',
  zeitmanagement: 'time management',
  kreativität: 'creativity',
  empathie: 'empathy',
  disziplin: 'discipline',
  resilienz: 'resilience',
  mentoring: 'mentoring',
  organisation: 'organization',
  präsentation: 'presentation',
}

export function getSoftSkillIcon(label: string): ReactNode | undefined {
  const key = label.trim().toLowerCase()
  return ICONS[ALIASES[key] ?? key]
}
