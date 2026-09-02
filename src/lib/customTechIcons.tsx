import type { ReactNode } from 'react'

/**
 * Filled brand-style icons for techs with no glyph in `simple-icons` (Amazon
 * had AWS's logo pulled from that library over trademark concerns; Java's
 * coffee-cup mark and Axum's have never been added). Kept generic enough to
 * avoid reproducing a trademarked logo, but distinct and colorable like the
 * simple-icons set — same fill/hoverBrand contract as `getTechIcon`.
 */
const ICONS: Record<string, { node: ReactNode; hex: string }> = {
  aws: {
    hex: 'FF9900',
    node: (
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96Z" />
    ),
  },
  java: {
    hex: 'F89820',
    node: (
      <>
        <path d="M4 9h12v7a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9Z" />
        <path
          d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M3 21h14a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2Z" />
        <path
          d="M8 3c0 1-1 1-1 2s1 1 1 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M12 3c0 1-1 1-1 2s1 1 1 2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  axum: {
    hex: '38BDF8',
    node: (
      <>
        <circle cx="5" cy="12" r="2.2" />
        <circle cx="19" cy="6" r="2.2" />
        <circle cx="19" cy="18" r="2.2" />
        <path
          d="M7 12h6M13 12l4.5-4.7M13 12l4.5 4.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  'ci/cd': {
    hex: '2088FF',
    node: (
      <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8Zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3Z" />
    ),
  },
}

const ALIASES: Record<string, string> = {
  cicd: 'ci/cd',
  'ci cd': 'ci/cd',
  'ci-cd': 'ci/cd',
  'continuous integration': 'ci/cd',
  'continuous integration/continuous deployment': 'ci/cd',
}

export function getCustomTechIcon(label: string): { node: ReactNode; hex: string } | undefined {
  const key = label.trim().toLowerCase()
  return ICONS[ALIASES[key] ?? key]
}
