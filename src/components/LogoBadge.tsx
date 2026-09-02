import { initialsOf } from '../lib/initials'

// Logos that are single-color, white-on-transparent SVGs with the fill
// hardcoded inside the file. An <img> reference can't restyle those from
// the outside, so instead of forcing a dark badge to hide them we render
// them as a CSS mask: the mask uses only the SVG's alpha channel, and the
// visible color comes from `currentColor` (text-ink), which flips with the
// theme — dark mark in light mode, light mark in dark mode.
const MONOCHROME_LOGOS = new Set(['/sunrise_logo.svg', '/swiss_army_logo.svg'])

export default function LogoBadge({
  src,
  name,
  className = '',
}: {
  src?: string
  name: string
  className?: string
}) {
  const isMonochrome = !!src && MONOCHROME_LOGOS.has(src)

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-paper-raised ${className}`}
    >
      {src ? (
        isMonochrome ? (
          <span
            role="img"
            aria-label={name}
            className="h-full w-full p-2 text-ink"
            style={{
              backgroundColor: 'currentColor',
              WebkitMaskImage: `url(${src})`,
              maskImage: `url(${src})`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskOrigin: 'content-box',
              maskOrigin: 'content-box',
              WebkitMaskClip: 'content-box',
              maskClip: 'content-box',
            }}
          />
        ) : (
          <img src={src} alt={name} className="h-full w-full object-contain p-2" />
        )
      ) : (
        <span className="font-mono text-xl font-medium text-ink-faint">{initialsOf(name)}</span>
      )}
    </div>
  )
}
