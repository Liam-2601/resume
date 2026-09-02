import type { CSSProperties } from 'react'
import { getTechIcon } from '../lib/techIcons'
import { getSoftSkillIcon } from '../lib/softSkillIcons'

export default function TechIcon({
  name,
  className = 'h-3.5 w-3.5',
  hoverBrand = false,
}: {
  name: string
  className?: string
  /** Reveal the tech's real brand color on hover (parent must have the `group` class). */
  hoverBrand?: boolean
}) {
  const icon = getTechIcon(name)
  if (icon) {
    const brandStyle = hoverBrand ? ({ '--brand': `#${icon.hex}` } as CSSProperties) : undefined
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
        style={brandStyle}
        className={`shrink-0 transition-colors duration-300 ${hoverBrand ? 'group-hover:text-[var(--brand)]' : ''} ${className}`}
      >
        <path d={icon.path} />
      </svg>
    )
  }

  // Not a recognized tech/brand name — try the generic soft-skill icon set
  // (communication, teamwork, leadership, etc.) before giving up.
  const softIcon = getSoftSkillIcon(name)
  if (softIcon) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={`shrink-0 ${className}`}
      >
        {softIcon}
      </svg>
    )
  }

  return null
}
