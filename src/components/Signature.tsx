import { useEffect, useRef, useState } from 'react'

/**
 * A cursive "signature" that draws itself in once, the first time it
 * scrolls into view — a clip-path sweep reveals the text left-to-right,
 * followed by a small flourish underline drawn via stroke-dashoffset.
 * Plays once per mount; respects prefers-reduced-motion.
 */
export default function Signature({
  text,
  className = '',
  textClassName = 'text-3xl',
  lineWidth = 140,
}: {
  text: string
  className?: string
  textClassName?: string
  lineWidth?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
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

  return (
    <div ref={ref} className={`inline-flex flex-col items-start ${className}`}>
      <span
        aria-label={text}
        className={`font-signature whitespace-nowrap leading-none text-ink ${textClassName}`}
        style={{
          clipPath: shown ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
          transition: 'clip-path 1.1s cubic-bezier(0.65,0,0.35,1)',
        }}
      >
        {text}
      </span>
      <svg
        aria-hidden
        viewBox={`0 0 ${lineWidth} 8`}
        width={lineWidth}
        height={8}
        className="mt-0.5"
      >
        <line
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
            transition: 'stroke-dashoffset 0.9s cubic-bezier(0.65,0,0.35,1) 0.6s',
          }}
        />
      </svg>
    </div>
  )
}
