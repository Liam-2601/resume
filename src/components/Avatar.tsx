import { useEffect, useRef, type PointerEvent } from 'react'
import { initialsOf } from '../lib/initials'

/** How far the portrait turns towards the pointer at its edge, in degrees. */
const MAX_TILT = 8
const TILT_VARS = ['--tilt-x', '--tilt-y', '--nx', '--ny', '--glare-x', '--glare-y']

const clamp = (value: number) => Math.min(1, Math.max(-1, value))

/**
 * The profile portrait. With a mouse or pen it turns slightly to face the pointer, a soft glare
 * follows it, and the photo shifts a touch inside its frame for depth. It's a decoration only:
 * touch input and `prefers-reduced-motion` skip it, and it never changes the layout.
 *
 * Pointer tracking lives on the outer wrapper, which doesn't move, so the rotating frame
 * can't make the hover area flicker at its edges. Everything is written straight to CSS
 * variables, once per animation frame — no React state, no re-renders.
 */
export default function Avatar({
  src,
  name,
  className = '',
}: {
  src?: string
  name: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)
  const pointer = useRef<{ x: number; y: number } | null>(null)

  const reset = () => {
    cancelAnimationFrame(frame.current)
    frame.current = 0
    pointer.current = null
    const el = ref.current
    if (!el) return
    el.dataset.active = 'false'
    TILT_VARS.forEach((name) => el.style.removeProperty(name))
  }

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const apply = () => {
    frame.current = 0
    const el = ref.current
    if (!el || !pointer.current) return
    const rect = el.getBoundingClientRect()
    const nx = clamp(((pointer.current.x - rect.left) / rect.width) * 2 - 1)
    const ny = clamp(((pointer.current.y - rect.top) / rect.height) * 2 - 1)
    el.style.setProperty('--tilt-x', `${(-ny * MAX_TILT).toFixed(2)}deg`) // pointer below → face turns down
    el.style.setProperty('--tilt-y', `${(nx * MAX_TILT).toFixed(2)}deg`) // pointer right → face turns right
    el.style.setProperty('--nx', nx.toFixed(3))
    el.style.setProperty('--ny', ny.toFixed(3))
    el.style.setProperty('--glare-x', `${(((nx + 1) / 2) * 100).toFixed(1)}%`)
    el.style.setProperty('--glare-y', `${(((ny + 1) / 2) * 100).toFixed(1)}%`)
    el.dataset.active = 'true'
  }

  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    pointer.current = { x: e.clientX, y: e.clientY }
    if (!frame.current) frame.current = requestAnimationFrame(apply)
  }

  return (
    <div
      ref={ref}
      data-active="false"
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      className={`group relative [perspective:800px] ${className}`}
    >
      <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-accent-2/20 to-transparent blur-2xl" />
      <div className="relative aspect-square w-full overflow-hidden rounded-[28%] border border-line/80 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.25)] transition-transform duration-700 ease-out [transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))] group-data-[active=true]:duration-150 motion-reduce:transition-none">
        {src ? (
          <img
            src={src}
            alt={name}
            style={{ translate: 'calc(var(--nx, 0) * -5px) calc(var(--ny, 0) * -5px)' }}
            className="h-full w-full scale-100 object-cover transition-[scale,translate] duration-700 ease-out group-data-[active=true]:scale-[1.08] group-data-[active=true]:duration-150 motion-reduce:transition-none"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent to-accent-2 text-[2.75rem] font-bold text-accent-ink">
            {initialsOf(name)}
          </div>
        )}
        {/* the glare: a soft highlight under the pointer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-data-[active=true]:opacity-100 motion-reduce:hidden"
          style={{
            background:
              'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgb(255 255 255 / 0.3), transparent 58%)',
          }}
        />
      </div>
    </div>
  )
}
