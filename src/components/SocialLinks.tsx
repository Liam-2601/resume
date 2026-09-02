import { useResume } from '../data'

const iconButtonClass =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-accent-2 hover:text-accent-2'

export default function SocialLinks({ className = '' }: { className?: string }) {
  const resume = useResume()
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a
        href={resume.links.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className={iconButtonClass}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-4 w-4">
          <rect x="2" y="9" width="4" height="12" rx="1" />
          <circle cx="4" cy="4" r="2.2" />
          <path d="M9 9h4v2.2c.7-1.5 2.3-2.5 4.3-2.5 4 0 5.2 2.4 5.2 6.1V21h-4.4v-5.4c0-1.6-.6-2.7-2-2.7-1.4 0-2.1 1-2.1 2.7V21H9Z" />
        </svg>
      </a>
      <a href={`mailto:${resume.email}`} aria-label="Email" className={iconButtonClass}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="h-4 w-4"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      </a>
    </div>
  )
}
