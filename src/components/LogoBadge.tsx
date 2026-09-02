import { initialsOf } from '../lib/initials'

export default function LogoBadge({
  src,
  name,
  className = '',
}: {
  src?: string
  name: string
  className?: string
}) {
  return (
    // Fixed dark chip regardless of site theme — not `bg-paper-raised`/`border-line`.
    // Several logos (Sunrise, Swiss Armed Forces) are white-on-transparent SVGs with
    // the fill hardcoded inside the file, which an <img> reference can't restyle from
    // the outside. A theme-following light background would make those invisible in
    // light mode, so the badge always gets a dark backdrop instead.
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#333333] ${className}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-contain p-2" />
      ) : (
        <span className="font-mono text-xl font-medium text-white/70">{initialsOf(name)}</span>
      )}
    </div>
  )
}
