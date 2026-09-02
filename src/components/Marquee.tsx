import TechIcon from './TechIcon'

export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items]
  return (
    <div
      aria-hidden
      className="group relative overflow-hidden border-y border-line bg-paper-raised/40 py-3"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent" />
      <div className="animate-marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {loop.map((item, i) => (
          <span key={i} className="flex items-center gap-2.5 font-mono text-sm text-ink-faint">
            <TechIcon name={item} className="h-4 w-4" />
            {item}
            <span className="pl-7 text-accent-2">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
