import TechIcon from './TechIcon'

export default function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-raised px-2.5 py-1 font-mono text-[11px] leading-none text-ink-soft transition-colors hover:border-accent-2/50 hover:text-accent-2">
      <TechIcon name={children} className="h-3 w-3" />
      {children}
    </span>
  )
}
