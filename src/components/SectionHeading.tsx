export default function SectionHeading({
  index,
  title,
}: {
  index: string
  title: string
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="text-xs text-accent-2">{index}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
    </div>
  )
}
