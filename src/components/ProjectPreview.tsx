export default function ProjectPreview({ src, name }: { src?: string; name: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <div className="flex items-center gap-1.5 border-b border-line bg-paper px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-ink-faint/40" />
        <span className="h-2 w-2 rounded-full bg-ink-faint/40" />
        <span className="h-2 w-2 rounded-full bg-ink-faint/40" />
      </div>
      <div className="relative aspect-video w-full overflow-hidden bg-paper">
        {src ? (
          <img src={src} alt={`${name} preview`} className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent-soft via-paper to-accent-2-soft">
            <div aria-hidden className="absolute inset-0 bg-dot-grid" />
            <span className="relative rounded-full border border-line bg-paper-raised/80 px-3 py-1 font-mono text-xs text-ink-faint backdrop-blur">
              {'</>'} preview
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
