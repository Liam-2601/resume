export default function SectionHeading({
  index,
  title,
}: {
  index: string
  title: string
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="font-mono text-xs text-accent-2">{index}</span>
      <h2 className="font-display text-2xl font-normal tracking-tight text-ink">{title}</h2>
      <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
    </div>
  )
}
