import { useRef, type HTMLAttributes, type ReactNode } from 'react'

export default function GlowCard({
  children,
  className = '',
  ...rest
}: { children: ReactNode; className?: string } & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
        el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
      }}
      className={`spotlight-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
