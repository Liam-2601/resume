import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.65,0,0.35,1)'

/**
 * A cursive "signature" that draws itself in once, the first time it
 * scrolls into view — a clip-path sweep reveals the text left-to-right,
 * followed by a small flourish underline drawn via stroke-dashoffset.
 * Respects prefers-reduced-motion.
 *
 * With `replayLabel` set it becomes a button that signs again on click. The
 * replay is a Web Animations run layered over the resting (fully drawn) style,
 * so it never has to un-draw first and the original transitions stay untouched.
 */
export default function Signature({
  text,
  className = '',
  textClassName = 'text-3xl',
  lineWidth = 140,
  replayLabel,
}: {
  text: string
  className?: string
  textClassName?: string
  lineWidth?: number
  /** Makes the signature clickable; also its accessible name and hover hint. */
  replayLabel?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const running = useRef<Animation[]>([])
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => running.current.forEach((a) => a.cancel()), [])

  const replay = () => {
    // Not drawn yet (or motion is off): just let the normal reveal happen.
    if (!shown || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    running.current.forEach((a) => a.cancel())
    running.current = [
      textRef.current?.animate(
        [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }],
        { duration: 1100, easing: EASE },
      ),
      // `backwards` keeps the underline hidden through its 0.6s delay
      lineRef.current?.animate([{ strokeDashoffset: lineWidth }, { strokeDashoffset: 0 }], {
        duration: 900,
        delay: 600,
        easing: EASE,
        fill: 'backwards',
      }),
    ].filter((a): a is Animation => !!a)
  }

  const drawing = (
    <>
      <span
        ref={textRef}
        aria-label={text}
        className={`font-signature whitespace-nowrap leading-none text-ink ${textClassName}`}
        style={{
          clipPath: shown ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
          transition: `clip-path 1.1s ${EASE}`,
        }}
      >
        {text}
      </span>
      <svg aria-hidden viewBox={`0 0 ${lineWidth} 8`} width={lineWidth} height={8} className="mt-0.5">
        <line
          ref={lineRef}
          x1="1"
          y1="4"
          x2={lineWidth - 1}
          y2="4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent"
          style={{
            strokeDasharray: lineWidth,
            strokeDashoffset: shown ? 0 : lineWidth,
            transition: `stroke-dashoffset 0.9s ${EASE} 0.6s`,
          }}
        />
      </svg>
    </>
  )

  return (
    <div ref={ref} className={`inline-flex flex-col items-start ${className}`}>
      {replayLabel ? (
        <button
          type="button"
          onClick={replay}
          aria-label={replayLabel}
          className="group relative inline-flex cursor-pointer flex-col items-start"
        >
          {drawing}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-xs text-ink-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            {replayLabel}
          </span>
        </button>
      ) : (
        drawing
      )}
    </div>
  )
}
