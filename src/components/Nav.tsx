import { useResume } from '../data'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import TabBar, { type StageInfo } from './TabBar'
import SocialLinks from './SocialLinks'

export default function Nav({ stages }: { stages: StageInfo[] }) {
  const resume = useResume()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-4 px-6 py-3.5 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#intro" className="flex items-center gap-2.5 justify-self-start">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink font-mono text-[11px] font-semibold text-paper">
            LG
          </span>
          <span className="hidden font-medium text-ink sm:inline">{resume.name}</span>
        </a>

        <TabBar stages={stages} />

        <div className="flex items-center gap-3 justify-self-end">
          <SocialLinks />
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
