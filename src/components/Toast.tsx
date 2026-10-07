import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type Tone = 'success' | 'error'
interface ToastState {
  id: number
  message: string
  tone: Tone
  closing: boolean
}

const VISIBLE_MS = 2200
/** Matches the exit animation in index.css. */
const EXIT_MS = 200

const ToastContext = createContext<{ showToast: (message: string, tone?: Tone) => void } | null>(null)

/** One toast at a time: showing another replaces it and restarts the timer. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
  }

  const showToast = useCallback((message: string, tone: Tone = 'success') => {
    clearTimers()
    setToast((prev) => ({ id: (prev?.id ?? 0) + 1, message, tone, closing: false }))
    timers.current = [
      window.setTimeout(() => setToast((t) => t && { ...t, closing: true }), VISIBLE_MS),
      window.setTimeout(() => setToast(null), VISIBLE_MS + EXIT_MS),
    ]
  }, [])

  useEffect(() => clearTimers, [])
  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* the spoken version: a live region that is always in the DOM, so changes get announced */}
      <div key={toast?.id} role="status" aria-live="polite" className="sr-only">
        {toast && !toast.closing ? toast.message : ''}
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
        {toast && (
          <div
            key={toast.id}
            aria-hidden
            data-state={toast.closing ? 'closed' : 'open'}
            className="toast flex max-w-full items-center gap-2.5 rounded-full border border-line bg-paper-raised py-2.5 pl-3.5 pr-5 text-sm font-medium text-ink shadow-lg shadow-black/15"
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                toast.tone === 'success' ? 'bg-accent text-accent-ink' : 'bg-ink-faint text-paper'
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                {toast.tone === 'success' ? <path d="m5 12.5 4.5 4.5L19 7.5" /> : <path d="M12 7v6m0 4h.01" />}
              </svg>
            </span>
            <span className="min-w-0 truncate">{toast.message}</span>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
