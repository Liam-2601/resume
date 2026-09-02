import type { ReactNode } from 'react'

export default function Stage({
  id,
  children,
  className = '',
  contentClassName = '',
}: {
  id: string
  children: ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <section
      id={id}
      className={`stage relative flex min-h-screen scroll-mt-16 flex-col justify-center px-6 py-20 ${className}`}
    >
      <div className={`mx-auto w-full max-w-4xl ${contentClassName}`}>{children}</div>
    </section>
  )
}
