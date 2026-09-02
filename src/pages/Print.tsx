import type { ReactNode } from 'react'
import { resumeByLocale } from '../data'
import { useLanguage } from '../i18n/LanguageContext'
import { ui } from '../i18n/ui'
import type { Locale } from '../i18n/types'
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

const ACCENT = '#0e8173'
const ACCENT_2 = '#0a5c52'

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
    <div className="mx-auto min-h-screen max-w-[210mm] bg-white p-[14mm] font-sans text-[10.5pt] leading-snug text-neutral-900 print:p-0">
      <header className="mb-6 flex items-start justify-between gap-6 border-b-2 border-neutral-900 pb-4">
        <div>
          <h1 className="text-[24pt] font-semibold tracking-tight">{resume.name}</h1>
          <p className="mt-1 font-mono text-[10pt]" style={{ color: ACCENT }}>
            {resume.title}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[9pt] text-neutral-500">
            <span>{resume.location}</span>
            <span>{resume.email}</span>
            {resume.phone && <span>{resume.phone}</span>}
            <span>{resume.links.linkedin.replace('https://www.', '')}</span>
          </div>
        </div>

        <div className="h-[26mm] w-[26mm] shrink-0 overflow-hidden rounded-2xl border border-neutral-200">
          {resume.photo ? (
            <img src={resume.photo} alt={resume.name} className="h-full w-full object-cover" />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center font-display text-[18pt] font-normal text-white"
              style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_2})` }}
            >
              {initialsOf(resume.name)}
            </div>
          )}
        </div>
      </header>

      <section className="mb-5">
        <p className="text-[10pt] leading-relaxed text-neutral-600">{resume.summary}</p>
      </section>

      <Section title={t.print.experience}>
        <div className="space-y-4">
          {resume.experience.map((job) => (
            <div key={`${job.company}-${job.role}`} className="break-inside-avoid">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[11pt] font-semibold">
                  {job.role} — {job.company}
                </h3>
                <span className="whitespace-nowrap font-mono text-[8.5pt] text-neutral-400">
                  {job.start} – {job.end}
                </span>
              </div>
              <p className="text-[9pt] text-neutral-400">{job.location}</p>
              <ul className="mt-1.5 list-disc space-y-0.5 pl-4">
                {job.highlights.map((h) => (
                  <li key={h} className="text-[9.5pt] leading-snug text-neutral-600">
                    {h}
                  </li>
                ))}
              </ul>
              {job.stack && job.stack.length > 0 && (
                <p className="mt-1 font-mono text-[8.5pt] text-neutral-400">{job.stack.join(' · ')}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {resume.projects.length > 0 && (
        <Section title={t.print.projects}>
          <div className="space-y-2">
            {resume.projects.map((p) => (
              <div key={p.name} className="break-inside-avoid">
                <h3 className="text-[10pt] font-semibold">{p.name}</h3>
                <p className="text-[9.5pt] text-neutral-600">{p.description}</p>
                <p className="font-mono text-[8.5pt] text-neutral-400">{p.stack.join(' · ')}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title={t.print.skills}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          {resume.skills.map((group) => (
            <p key={group.label} className="text-[9.5pt]">
              <span className="font-semibold">{group.label}: </span>
              <span className="text-neutral-600">{group.items.join(', ')}</span>
            </p>
          ))}
        </div>
      </Section>

      {resume.languages.length > 0 && (
        <Section title={t.print.languages}>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
            {resume.languages.map((lang) => (
              <p key={lang.name} className="text-[9.5pt]">
                <span className="font-semibold">{lang.name}</span>
                <span className="text-neutral-500"> — {t.languageLevels[lang.level]}</span>
              </p>
            ))}
          </div>
        </Section>
      )}

      {resume.certifications.length > 0 && (
        <Section title={t.print.certifications}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {resume.certifications.map((cert) => (
              <p key={cert.name} className="text-[9.5pt]">
                <span className="font-semibold">{cert.name}</span>
                <span className="text-neutral-500"> — {cert.issuer}, {cert.date}</span>
              </p>
            ))}
          </div>
        </Section>
      )}

      <Section title={t.print.education}>
        <div className="space-y-2">
          {resume.education.map((ed) => (
            <div key={`${ed.school}-${ed.degree}`} className="break-inside-avoid">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[10pt] font-semibold">{ed.degree}</h3>
                <span className="whitespace-nowrap font-mono text-[8.5pt] text-neutral-400">
                  {ed.start} – {ed.end}
                </span>
              </div>
              <p className="text-[9pt] text-neutral-600">
                {ed.school} · {ed.location}
              </p>
              {ed.detail && <p className="text-[9pt] text-neutral-400">{ed.detail}</p>}
              {ed.grade && (
                <p className="text-[9pt] text-neutral-400">
                  {t.gradeLabel}: {ed.grade}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-5 break-inside-avoid">
      <h2 className="mb-2 border-b border-neutral-200 pb-1 font-mono text-[9.5pt] font-semibold uppercase tracking-wider text-neutral-900">
        {title}
      </h2>
      {children}
    </section>
  )
}
