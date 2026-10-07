import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { copyText } from '../lib/clipboard'
import { useToast } from './Toast'

/**
 * Copies the email address and confirms it twice: a toast, and the icon turning into a tick.
 * Styling comes from the caller, so it can sit inside a pill or a split button.
 */
export default function CopyEmailButton({ email, className = '' }: { email: string; className?: string }) {
  const { t } = useLanguage()
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onClick = async () => {
    const ok = await copyText(email)
    showToast(ok ? `${t.copy.done}: ${email}` : `${t.copy.failed} ${email}`, ok ? 'success' : 'error')
    window.clearTimeout(timer.current)
    setCopied(ok)
    if (ok) timer.current = window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button type="button" onClick={onClick} aria-label={t.copy.button} title={t.copy.button} className={className}>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        {copied ? (
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        ) : (
          <>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" />
          </>
        )}
      </svg>
    </button>
  )
}
