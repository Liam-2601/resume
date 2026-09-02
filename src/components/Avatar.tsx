import { initialsOf } from '../lib/initials'

export default function Avatar({
  src,
  name,
  className = '',
}: {
  src?: string
  name: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-accent-2/20 to-transparent blur-2xl" />
      <div className="aspect-square w-full overflow-hidden rounded-[28%] border border-line/80 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.25)]">
        {src ? (
          <img src={src} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent to-accent-2 font-display text-[2.75rem] font-normal text-accent-ink">
            {initialsOf(name)}
          </div>
        )}
      </div>
    </div>
  )
}
