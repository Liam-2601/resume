import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useResume } from '../data'
import { CAREER_START } from '../data/career'
import { useLanguage } from '../i18n/LanguageContext'
import { ACCENTS, setAccent, useAccent, type Accent } from '../lib/accent'
import { copyText } from '../lib/clipboard'
import { searchCommands, type Searchable } from '../lib/commandSearch'
import { elapsedParts } from '../lib/experience'
import { jumpTo } from '../lib/jumpTo'
import { toggleTheme, useTheme } from '../lib/theme'
import type { StageInfo } from './TabBar'

/** Shown on the nav button — ⌘K on Apple devices, Ctrl K elsewhere. */
export const SHORTCUT_LABEL =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl K'

/** Résumé content only shows up once you start typing, and never floods the list. */
const MIN_CONTENT_QUERY = 2
const MAX_CONTENT_RESULTS = 12

/** Matches the 0.16s exit animation in index.css. */
const EXIT_MS = 160

interface Command extends Searchable {
  /** Becomes a DOM id, so keep it to letters, digits and dashes. */
  id: string
  /** Muted text on the right of the row. */
  hint?: string
  /** Hidden until you search (résumé content, accent colours). */
  searchOnly?: boolean
  /** Draws this accent's colour dot before the label. */
  swatch?: Accent
  /** Instead of running, fills the search box with this text — a way into a group of hidden results. */
  fill?: string
  /** Return text to show it in the menu and keep it open; return nothing to close. */
  run: () => string | void | Promise<string | void>
}

const kbdClass =
  'rounded-md border border-line bg-paper px-1.5 py-0.5 font-sans text-[12px] font-semibold leading-none text-ink-faint'

function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

/**
 * ⌘K / Ctrl+K command menu. Browse it for navigation and actions, type to
 * search the résumé itself (jobs, projects, certifications, education and
 * skills — jumping straight to the card), or run a terminal-style command.
 * Mounted only while open, so every open starts with a clean query.
 */
export default function CommandPalette({
  open,
  onOpenChange,
  stages,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  stages: StageInfo[]
}) {
  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  // Stay mounted for the exit animation, then unmount. Each open gets a new
  // `session` key, so reopening mid-exit still starts from a clean query.
  const [mounted, setMounted] = useState(open)
  const [wasOpen, setWasOpen] = useState(open)
  const [session, setSession] = useState(0)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setSession(session + 1)
  }

  useEffect(() => {
    if (open) {
      setMounted(true)
      return
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setMounted(false), reduceMotion ? 0 : EXIT_MS)
    return () => window.clearTimeout(timer)
  }, [open])

  if (!open && !mounted) return null
  return <PaletteDialog key={session} open={open} stages={stages} onClose={() => onOpenChange(false)} />
}

function PaletteDialog({ open, stages, onClose }: { open: boolean; stages: StageInfo[]; onClose: () => void }) {
  const resume = useResume()
  const { locale, setLocale, t } = useLanguage()
  const theme = useTheme()
  const accent = useAccent()
  const { palette } = t

  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [opener] = useState(() => document.activeElement as HTMLElement | null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [message, setMessage] = useState<string | null>(null)

  // Focus the input on open; hand focus back to whatever opened us as soon as it closes.
  useEffect(() => {
    if (open) inputRef.current?.focus()
    else opener?.focus?.({ preventScroll: true })
  }, [open, opener])

  // Keep the page behind from scrolling while the menu is up. Setting `overflow: hidden`
  // on the body would do it, but that removes the scrollbar and shifts the whole page
  // sideways — so block the scroll gestures instead and leave the scrollbar alone.
  // (Touch is handled in CSS: `touch-none` here, `touch-pan-y` on the scrollable parts.)
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay || !open) return
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return // pinch-zoom
      const scroller = (e.target as HTMLElement).closest<HTMLElement>('[data-scrollable]')
      if (!scroller || scroller.scrollHeight <= scroller.clientHeight) e.preventDefault()
    }
    overlay.addEventListener('wheel', onWheel, { passive: false })
    return () => overlay.removeEventListener('wheel', onWheel)
  }, [open])

  const commands = useMemo<Command[]>(() => {
    const sinceLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(CAREER_START)
    const { kinds } = palette

    const navigate: Command[] = stages.map((s) => ({
      id: `go-${s.id}`,
      group: palette.navigate,
      label: `${palette.goTo} ${s.label}`,
      keywords: s.id,
      run: () => jumpTo({ section: s.id }),
    }))

    const actions: Command[] = [
      {
        id: 'theme',
        group: palette.actions,
        label: theme === 'dark' ? palette.lightMode : palette.darkMode,
        keywords: 'theme dark light mode',
        run: toggleTheme,
      },
      {
        id: 'accent',
        group: palette.actions,
        label: palette.changeAccent,
        keywords: 'color colour theme farbe',
        fill: palette.accentPrefix,
        run: () => undefined,
      },
      {
        id: 'language',
        group: palette.actions,
        label: locale === 'en' ? palette.switchToGerman : palette.switchToEnglish,
        keywords: 'language english german deutsch englisch sprache',
        run: () => setLocale(locale === 'en' ? 'de' : 'en'),
      },
      {
        id: 'cv',
        group: palette.actions,
        label: t.downloadCv,
        keywords: 'cv resume pdf download lebenslauf',
        run: () => {
          const a = document.createElement('a')
          a.href = `/cv-${locale}.pdf`
          a.download = ''
          a.click()
        },
      },
      {
        id: 'copy-email',
        group: palette.actions,
        label: palette.copyEmail,
        keywords: 'mail clipboard',
        run: async () => {
          return (await copyText(resume.email))
            ? `${palette.copied}: ${resume.email}`
            : `${palette.copyFailed} ${resume.email}`
        },
      },
      {
        id: 'send-email',
        group: palette.actions,
        label: palette.sendEmail,
        keywords: 'mail contact kontakt',
        run: () => {
          window.location.href = `mailto:${resume.email}`
        },
      },
      {
        id: 'linkedin',
        group: palette.actions,
        label: palette.openLinkedIn,
        keywords: 'social profile',
        run: () => {
          window.open(resume.links.linkedin, '_blank', 'noopener,noreferrer')
        },
      },
    ]

    const terminal: Command[] = [
      {
        id: 'whoami',
        group: palette.terminal,
        label: 'whoami',
        hint: palette.whoamiHint,
        run: () => `${resume.name} — ${resume.title} · ${resume.location}`,
      },
      {
        id: 'uptime',
        group: palette.terminal,
        label: 'uptime',
        hint: palette.uptimeHint,
        run: () =>
          `${elapsedParts(CAREER_START, t.experience)
            .map((p) => `${p.value} ${p.unit}`)
            .join(', ')} · ${t.experience.since} ${sinceLabel}`,
      },
    ]

    const accents: Command[] = ACCENTS.map((a) => ({
      id: `accent-${a}`,
      group: palette.actions,
      label: `${palette.accentPrefix}: ${t.accent.names[a]}`,
      keywords: 'color colour theme farbe',
      hint: a === accent ? '✓' : undefined,
      swatch: a,
      searchOnly: true,
      run: () => setAccent(a),
    }))

    // The résumé itself. Each result jumps to its card; ids match the ones set in Home.tsx.
    const content: Command[] = [
      ...resume.experience.map((job, i) => ({
        id: `job-${i}`,
        group: kinds.work,
        label: job.role,
        detail: job.company,
        hint: kinds.work,
        tags: job.stack,
        body: [...job.highlights, job.location, job.start, job.end].join(' '),
        searchOnly: true,
        run: () => jumpTo({ card: `experience-${i}` }),
      })),
      ...resume.projects.map((project, i) => ({
        id: `project-${i}`,
        group: kinds.project,
        label: project.name,
        hint: kinds.project,
        tags: project.stack,
        body: project.description,
        searchOnly: true,
        run: () => jumpTo({ card: `project-${i}` }),
      })),
      ...resume.certifications.map((cert, i) => ({
        id: `cert-${i}`,
        group: kinds.cert,
        label: cert.name,
        detail: cert.issuer,
        hint: kinds.cert,
        body: cert.date,
        searchOnly: true,
        run: () => jumpTo({ card: `cert-${i}` }),
      })),
      ...resume.education.map((ed, i) => ({
        id: `education-${i}`,
        group: kinds.education,
        label: ed.degree,
        detail: ed.school,
        hint: kinds.education,
        body: [ed.location, ed.detail, ed.grade, ed.start, ed.end].filter(Boolean).join(' '),
        searchOnly: true,
        run: () => jumpTo({ card: `education-${i}` }),
      })),
      ...Array.from(
        new Map(resume.skills.flatMap((g) => g.items.map((item) => [item, g.label] as const))).entries(),
      ).map(([item, groupLabel], i) => ({
        id: `skill-${i}`,
        group: kinds.skill,
        label: item,
        detail: groupLabel,
        hint: kinds.skill,
        searchOnly: true,
        run: () => jumpTo({ skill: item }),
      })),
    ]

    return [...navigate, ...actions, ...terminal, ...accents, ...content]
  }, [stages, palette, locale, setLocale, theme, accent, resume, t])

  const results = useMemo(() => {
    const searching = query.trim().length >= MIN_CONTENT_QUERY
    const pool = searching ? commands : commands.filter((c) => !c.searchOnly)
    let contentShown = 0
    return searchCommands(pool, query).filter(({ item }) => !item.searchOnly || ++contentShown <= MAX_CONTENT_RESULTS)
  }, [commands, query])

  const current = Math.min(active, results.length - 1)
  const activeId = results[current] ? `palette-option-${results[current].item.id}` : undefined

  useEffect(() => {
    if (activeId) document.getElementById(activeId)?.scrollIntoView({ block: 'nearest' })
  }, [activeId])

  const run = async (command: Command) => {
    if (command.fill !== undefined) {
      setQuery(command.fill)
      setActive(0)
      setMessage(null)
      inputRef.current?.focus()
      return
    }
    const result = await command.run()
    if (result === undefined) onClose()
    else setMessage(result)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        onClose()
        break
      case 'ArrowDown':
        e.preventDefault()
        setActive(results.length ? (current + 1) % results.length : 0)
        break
      case 'ArrowUp':
        e.preventDefault()
        setActive(results.length ? (current - 1 + results.length) % results.length : 0)
        break
      case 'Enter':
        e.preventDefault()
        if (results[current]) void run(results[current].item)
        break
      case 'Tab': // the input is the only stop — keep focus inside the dialog
        e.preventDefault()
        break
    }
  }

  return (
    <div
      ref={overlayRef}
      data-state={open ? 'open' : 'closed'}
      className={`fixed inset-0 z-[70] flex touch-none items-start justify-center px-4 pt-[12vh] sm:pt-[15vh] ${
        open ? '' : 'pointer-events-none'
      }`}
      onKeyDown={onKeyDown}
    >
      <div aria-hidden className="palette-backdrop absolute inset-0" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={palette.title}
        className="palette-panel relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-2xl shadow-black/30"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="h-5 w-5 shrink-0 text-ink-faint" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
              setMessage(null)
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label={palette.title}
            placeholder={palette.placeholder}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="no-focus-ring h-14 min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-ink-faint"
          />
          <kbd className={kbdClass}>esc</kbd>
        </div>

        {message && (
          <p role="status" className="border-b border-line bg-accent-soft px-4 py-3 text-sm text-ink">
            {message}
          </p>
        )}

        <ul
          id="palette-list"
          role="listbox"
          aria-label={palette.title}
          // keep focus in the input when clicking rows
          onMouseDown={(e) => e.preventDefault()}
          data-scrollable
          className="max-h-[min(24rem,55vh)] touch-pan-y overflow-y-auto overscroll-contain p-2"
        >
          {results.length === 0 && <li className="px-3 py-8 text-center text-sm text-ink-faint">{palette.empty}</li>}
          {results.map(({ item: command, matchedTags }, i) => {
            const showHeading = !query && command.group !== results[i - 1]?.item.group
            const isActive = i === current
            const detail = [command.detail, matchedTags.length > 0 && `${palette.uses} ${matchedTags.join(', ')}`]
              .filter(Boolean)
              .join(' · ')
            return (
              <li key={command.id} role="presentation">
                {showHeading && (
                  <p
                    aria-hidden
                    className={`px-3 pb-1 text-[11px] uppercase tracking-wide text-accent-2 ${i === 0 ? 'pt-1' : 'pt-3'}`}
                  >
                    {command.group}
                  </p>
                )}
                <div
                  id={`palette-option-${command.id}`}
                  role="option"
                  aria-selected={isActive}
                  onMouseMove={() => setActive(i)}
                  onClick={() => void run(command)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm ${
                    isActive ? 'bg-accent/15 text-ink' : 'text-ink-soft'
                  }`}
                >
                  <span className="min-w-0 truncate">
                    {command.swatch && (
                      <span
                        aria-hidden
                        data-accent={command.swatch}
                        className="accent-swatch mr-2.5 inline-block h-2.5 w-2.5 rounded-full align-middle"
                      />
                    )}
                    {command.label}
                    {detail && <span className="ml-2 text-xs text-ink-faint">{detail}</span>}
                  </span>
                  {command.hint && <span className="shrink-0 text-xs text-ink-faint">{command.hint}</span>}
                </div>
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-ink-faint sm:flex">
          <span className="flex items-center gap-1.5">
            <kbd className={kbdClass}>↑↓</kbd> {palette.hintNavigate}
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className={kbdClass}>↵</kbd> {palette.hintSelect}
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className={kbdClass}>esc</kbd> {palette.hintClose}
          </span>
        </div>
      </div>
    </div>
  )
}
