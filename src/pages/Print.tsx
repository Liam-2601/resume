import type { ReactNode } from 'react'
import { resumeByLocale } from '../data'
import { useLanguage } from '../i18n/LanguageContext'
import { ui } from '../i18n/ui'
import type { Locale } from '../i18n/types'
import type { Language } from '../data/types'
import { initialsOf } from '../lib/initials'

/**
 * Dedicated CV layout, tuned for A4 print / PDF export.
 * Rendered standalone at /print and captured by scripts/generate-pdf.mjs.
 *
 * Deliberately uses fixed neutral colors instead of the theme tokens from
 * index.css — a PDF has no concept of the viewer's light/dark preference,
 * so this page must render identically no matter what theme the rest of
 * the site is in.
 *
 * Locale: normally follows the site-wide language toggle, but a `?lang=de`
 * (or `?lang=en`) query param always wins — that's what the PDF generation
 * script uses to deterministically produce both cv-en.pdf and cv-de.pdf
 * regardless of whatever locale happens to be stored in the browser.
 */

const INK = '#12262b'
const INK_2 = '#0a5c52'
const ACCENT = '#0e8173'
const SLATE = '#5b6b6e'
const SLATE_FAINT = '#8a9598'

const LANGUAGE_LEVEL_WIDTH: Record<Language['level'], number> = {
  Native: 100,
  Fluent: 85,
  Conversational: 60,
  Basic: 35,
}

function getLocaleOverride(): Locale | null {
  if (typeof window === 'undefined') return null
  const param = new URLSearchParams(window.location.search).get('lang')
  return param === 'de' || param === 'en' ? param : null
}

export default function Print() {
  const { locale: contextLocale } = useLanguage()
  const locale = getLocaleOverride() ?? contextLocale
  const resume = resumeByLocale[locale]
  const t = ui[locale]

  return (
    <div
      className="mx-auto flex min-h-screen w-[210mm] font-sans text-[10pt] leading-snug print:min-h-0"
      style={{ color: INK }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Sidebar                                                          */}
      {/* ---------------------------------------------------------------- */}
      <aside
        className="flex w-[68mm] shrink-0 flex-col gap-5 px-6 py-6 text-white"
        style={{ background: `linear-gradient(160deg, ${INK}, ${INK_2})` }}
      >
        <div className="flex justify-center">
          <div className="h-[28mm] w-[28mm] shrink-0 overflow-hidden rounded-full border-4 border-white/20 shadow-lg">
            {resume.photo ? (
              <img src={resume.photo} alt={resume.name} className="h-full w-full object-cover" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center font-display text-[18pt] font-normal text-white"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              >
                {initialsOf(resume.name)}
              </div>
            )}
          </div>
        </div>

        <SidebarSection title={t.print.contact}>
          <ul className="space-y-2">
            <li className="flex items-start gap-2.5">
              <ContactIcon kind="location" />
              <span className="text-[9pt] leading-snug text-white/80">{resume.location}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ContactIcon kind="mail" />
              <span className="text-[9pt] leading-snug break-all text-white/80">{resume.email}</span>
            </li>
            {resume.phone && (
              <li className="flex items-start gap-2.5">
                <ContactIcon kind="phone" />
                <span className="text-[9pt] leading-snug text-white/80">{resume.phone}</span>
              </li>
            )}
            <li className="flex items-start gap-2.5">
              <ContactIcon kind="linkedin" />
              <span className="text-[9pt] leading-snug break-all text-white/80">
                {resume.links.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
            </li>
          </ul>
        </SidebarSection>

        <SidebarSection title={t.print.profile}>
          <p className="text-[9pt] leading-relaxed text-white/75">{resume.summary}</p>
        </SidebarSection>

        <SidebarSection title={t.print.skills}>
          <div className="space-y-2">
            {resume.skills.map((group) => (
              <div key={group.label}>
                <p className="text-[8.5pt] font-semibold tracking-wide text-white/90">{group.label}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full px-2 py-0.5 text-[8pt] text-white/85"
                      style={{ background: 'rgba(255,255,255,0.12)' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SidebarSection>

        {resume.languages.length > 0 && (
          <SidebarSection title={t.print.languages}>
            <div className="space-y-2">
              {resume.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[8.5pt] font-medium text-white/90">{lang.name}</span>
                    <span className="text-[7.5pt] text-white/55">{t.languageLevels[lang.level]}</span>
                  </div>
                  <div className="mt-1 h-[3px] w-full rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${LANGUAGE_LEVEL_WIDTH[lang.level]}%`, background: '#6fd6c6' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SidebarSection>
        )}
      </aside>

      {/* ---------------------------------------------------------------- */}
      {/* Main column                                                      */}
      {/* ---------------------------------------------------------------- */}
      <main className="flex-1 bg-white">
        <header
          className="px-8 py-4 text-white"
          style={{ background: `linear-gradient(100deg, ${INK}, ${INK_2})` }}
        >
          <h1 className="text-[22pt] font-semibold tracking-tight">{resume.name}</h1>
          <p className="mt-1 font-mono text-[10.5pt] tracking-wide" style={{ color: '#8fe0d2' }}>
            {resume.title}
          </p>
        </header>

        <div className="px-8 py-3">
          <Section title={t.print.experience} accent={ACCENT}>
            <div className="space-y-2">
              {resume.experience.map((job) => (
                <div key={`${job.company}-${job.role}`} className="break-inside-avoid">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[10.5pt] font-semibold">
                      {job.role} — {job.company}
                    </h3>
                    <span className="whitespace-nowrap font-mono text-[8pt]" style={{ color: SLATE_FAINT }}>
                      {job.start} – {job.end}
                    </span>
                  </div>
                  <p className="text-[8.5pt]" style={{ color: SLATE_FAINT }}>
                    {job.location}
                  </p>
                  <ul className="mt-1 space-y-0.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-[9pt] leading-snug" style={{ color: SLATE }}>
                        <span className="mt-[5px] h-[3px] w-[3px] shrink-0 rounded-full" style={{ background: ACCENT }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {job.stack && job.stack.length > 0 && (
                    <p className="mt-1 font-mono text-[8pt]" style={{ color: SLATE_FAINT }}>
                      {job.stack.join(' · ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {resume.projects.length > 0 && (
            <Section title={t.print.projects} accent={ACCENT}>
              <div className="space-y-2">
                {resume.projects.map((p) => (
                  <div key={p.name} className="break-inside-avoid">
                    <h3 className="text-[9.5pt] font-semibold">{p.name}</h3>
                    <p className="text-[9pt]" style={{ color: SLATE }}>
                      {p.description}
                    </p>
                    <p className="font-mono text-[8pt]" style={{ color: SLATE_FAINT }}>
                      {p.stack.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          <Section title={t.print.education} accent={ACCENT}>
            <div className="space-y-2">
              {resume.education.map((ed) => (
                <div key={`${ed.school}-${ed.degree}`} className="break-inside-avoid">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[9.5pt] font-semibold">{ed.degree}</h3>
                    <span className="whitespace-nowrap font-mono text-[8pt]" style={{ color: SLATE_FAINT }}>
                      {ed.start} – {ed.end}
                    </span>
                  </div>
                  <p className="text-[8.5pt]" style={{ color: SLATE }}>
                    {ed.school} · {ed.location}
                  </p>
                  {ed.detail && (
                    <p className="text-[8.5pt]" style={{ color: SLATE_FAINT }}>
                      {ed.detail}
                    </p>
                  )}
                  {ed.grade && (
                    <p className="text-[8.5pt]" style={{ color: SLATE_FAINT }}>
                      {t.gradeLabel}: {ed.grade}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {resume.certifications.length > 0 && (
            <Section title={t.print.certifications} accent={ACCENT}>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {resume.certifications.map((cert) => (
                  <p key={cert.name} className="text-[8.5pt]">
                    <span className="font-semibold">{cert.name}</span>
                    <span style={{ color: SLATE_FAINT }}>
                      {' '}
                      — {cert.issuer}, {cert.date}
                    </span>
                  </p>
                ))}
              </div>
            </Section>
          )}
        </div>
      </main>
    </div>
  )
}

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-[9pt] font-semibold tracking-[0.12em] text-white uppercase">{title}</h2>
      <div className="h-px w-8" style={{ background: '#6fd6c6' }} />
      <div className="mt-2.5">{children}</div>
    </section>
  )
}

function Section({ title, accent, children }: { title: string; accent: string; children: ReactNode }) {
  return (
    <section className="mb-3 break-inside-avoid">
      <h2
        className="mb-1.5 flex items-center gap-2 text-[9.5pt] font-semibold tracking-[0.1em] uppercase"
        style={{ color: INK }}
      >
        <span className="h-[10px] w-[3px] rounded-full" style={{ background: accent }} />
        {title}
      </h2>
      {children}
    </section>
  )
}

function ContactIcon({ kind }: { kind: 'location' | 'mail' | 'phone' | 'linkedin' }) {
  const common = {
    viewBox: '0 0 24 24',
    'aria-hidden': true,
    className: 'mt-[1px] h-3.5 w-3.5 shrink-0 text-white/70',
  } as const

  switch (kind) {
    case 'location':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
          <circle cx="12" cy="9.5" r="2.3" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2Z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...common} fill="currentColor">
          <rect x="2" y="9" width="4" height="12" rx="1" />
          <circle cx="4" cy="4" r="2.2" />
          <path d="M9 9h4v2.2c.7-1.5 2.3-2.5 4.3-2.5 4 0 5.2 2.4 5.2 6.1V21h-4.4v-5.4c0-1.6-.6-2.7-2-2.7-1.4 0-2.1 1-2.1 2.7V21H9Z" />
        </svg>
      )
  }
}
