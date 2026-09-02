import { useResume } from '../data'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import TabBar, { type StageInfo } from './TabBar'
import SocialLinks from './SocialLinks'
import Signature from './Signature'

export default function Nav({ stages }: { stages: StageInfo[] }) {
  const resume = useResume()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-4 px-6 py-2.5 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#intro" className="flex items-center justify-self-start" aria-label={resume.name}>
          <Signature text={resume.name} textClassName="text-2xl" lineWidth={100} />
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
