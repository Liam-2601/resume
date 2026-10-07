import { useResume } from '../data'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import TabBar, { type StageInfo } from './TabBar'
import SocialLinks from './SocialLinks'
import Signature from './Signature'
import { SHORTCUT_LABEL } from './CommandPalette'
import { useLanguage } from '../i18n/LanguageContext'

export default function Nav({ stages, onOpenPalette }: { stages: StageInfo[]; onOpenPalette: () => void }) {
  const resume = useResume()
  const { t } = useLanguage()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-4 px-6 py-2.5 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#intro" className="flex items-center justify-self-start" aria-label={resume.name}>
          <Signature text={resume.name} textClassName="text-2xl" lineWidth={100} />
        </a>

        <TabBar stages={stages} />

        <div className="flex items-center gap-2 justify-self-end xl:gap-3">
          <SocialLinks />
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label={t.palette.open}
            aria-haspopup="dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center gap-2 rounded-full border border-line text-ink-soft transition-colors hover:border-accent-2 hover:text-accent-2 xl:w-auto xl:px-3"
          >
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
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span aria-hidden className="hidden text-[11px] font-semibold xl:inline">
              {SHORTCUT_LABEL}
            </span>
          </button>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
