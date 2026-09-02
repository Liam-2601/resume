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
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-paper-raised ${className}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-contain p-2" />
      ) : (
        <span className="font-mono text-xl font-medium text-ink-faint">{initialsOf(name)}</span>
      )}
    </div>
  )
}
