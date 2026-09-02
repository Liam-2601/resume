import { useResume } from '../data'
import { useLanguage } from '../i18n/LanguageContext'
import Nav from '../components/Nav'
import Stage from '../components/Stage'
import SectionHeading from '../components/SectionHeading'
import Tag from '../components/Tag'
import Avatar from '../components/Avatar'
import Reveal from '../components/Reveal'
import GlowCard from '../components/GlowCard'
import Marquee from '../components/Marquee'
import LogoBadge from '../components/LogoBadge'
import ProjectPreview from '../components/ProjectPreview'
import SkillCloud from '../components/SkillCloud'
import Languages from '../components/Languages'
import Signature from '../components/Signature'

export default function Home() {
  const resume = useResume()
  const { locale, t } = useLanguage()

  const STAGES = [
    { id: 'intro', label: t.stages.intro },
    { id: 'experience', label: t.stages.work },
    { id: 'projects', label: t.stages.projects },
    { id: 'skills', label: t.stages.skills },
    { id: 'certifications', label: t.stages.certs },
    { id: 'education', label: t.stages.education },
    { id: 'contact', label: t.stages.contact },
  ]

  const allSkills = resume.skills.flatMap((g) => g.items)

  return (
    <div className="relative min-h-screen bg-paper font-sans text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-ink"
      >
        {t.skipToContent}
      </a>
      <Nav stages={STAGES} />

      <main id="main-content" tabIndex={-1} className="pt-16 focus:outline-none">
        {/* Stage — Intro + About */}
        <Stage id="intro" className="items-center">
          <div aria-hidden className="absolute inset-0 -z-10 bg-dot-grid" />
          <div
            aria-hidden
            className="absolute left-1/4 top-1/4 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute bottom-0 right-[10%] -z-10 h-64 w-64 rounded-full bg-accent-2/20 blur-[110px]"
          />

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,20rem)_1fr]">
            <div className="animate-fade-up mx-auto flex w-full max-w-xs flex-col items-center gap-6 lg:mx-0 lg:max-w-none lg:items-start">
              <Avatar src={resume.photo || undefined} name={resume.name} className="w-40 sm:w-48" />
              <div className="grid w-full grid-cols-2 gap-3">
                {resume.about.facts.map((f) => (
                  <div key={f.label} className="rounded-2xl border border-line bg-paper-raised p-3.5">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-accent-2">{f.label}</p>
                    <p className="mt-1 text-sm text-ink">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-line bg-paper-raised/70 px-3 py-1 font-mono text-xs text-accent-2 [animation-delay:80ms]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-2" />
                {resume.title}
              </p>

              <h1 className="animate-fade-up mt-5 font-display text-5xl font-normal leading-[1.05] tracking-tight text-ink [animation-delay:140ms] sm:text-6xl">
                {resume.name}
              </h1>

              <p className="animate-fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft [animation-delay:200ms] sm:text-lg lg:mx-0">
                {resume.summary}
              </p>

              <Reveal delay={120} className="mx-auto mt-6 max-w-xl space-y-4 lg:mx-0">
                {resume.about.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-ink-soft sm:text-base">
                    {p}
                  </p>
                ))}
              </Reveal>

              <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 text-sm [animation-delay:260ms] lg:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-ink-soft">
                  {resume.location}
                </span>
                <a
                  href={`mailto:${resume.email}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-ink-soft transition-colors hover:border-accent-2 hover:text-accent-2"
                >
                  {resume.email}
                </a>
                <a
                  href={resume.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-ink-soft transition-colors hover:border-accent-2 hover:text-accent-2"
                >
                  LinkedIn ↗
                </a>
              </div>

              <div className="animate-fade-up mx-auto mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:300ms] lg:mx-0 lg:justify-start">
                <a
                  href={`/cv-${locale}.pdf`}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink shadow-sm shadow-accent/30 transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-4 w-4">
                    <path d="M12 4v11m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                  </svg>
                  {t.downloadCv}
                </a>
                <a
                  href={`mailto:${resume.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-accent-2 hover:text-accent-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="h-4 w-4"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  {t.contactMe}
                </a>
              </div>
            </div>
          </div>

          <a
            href="#experience"
            aria-label={t.scrollToExperience}
            className="animate-bounce-y absolute bottom-10 left-1/2 -translate-x-1/2 text-ink-faint transition-colors hover:text-accent-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </Stage>

        <Marquee items={allSkills} />

        {/* Stage — Experience */}
        <Stage id="experience">
          <SectionHeading index={t.sectionIndex.work} title={t.headings.work} />
          <div className="relative space-y-6">
            <div className="absolute left-4 top-2 bottom-2 w-px -translate-x-1/2 bg-gradient-to-b from-accent via-line to-transparent sm:left-5" />
            {resume.experience.map((job, i) => (
              <Reveal key={`${job.company}-${job.role}`} delay={i * 90}>
                <div className="relative pl-8 sm:pl-10">
                  <span className="absolute left-4 top-7 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-paper sm:left-5" />
                  <GlowCard className="rounded-2xl border border-line bg-paper-raised p-6">
                  <div className="flex items-start gap-4">
                    <LogoBadge src={job.logo} name={job.company} className="h-16 w-16" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold text-ink">
                          {job.role}
                          <span className="mx-2 text-ink-faint">·</span>
                          {job.companyUrl ? (
                            <a href={job.companyUrl} target="_blank" rel="noreferrer" className="text-accent-2 hover:underline">
                              {job.company}
                            </a>
                          ) : (
                            <span className="text-ink-soft">{job.company}</span>
                          )}
                        </h3>
                        <span className="font-mono text-xs text-ink-faint">
                          {job.start} — {job.end}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-ink-faint">{job.location}</p>
                    </div>
                  </div>
                  <ul className="mt-4 space-y-1.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {job.stack && job.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </div>
                  )}
                  </GlowCard>
                </div>
              </Reveal>
            ))}
          </div>
        </Stage>

        {/* Stage — Projects */}
        {resume.projects.length > 0 && (
          <Stage id="projects">
            <SectionHeading index={t.sectionIndex.projects} title={t.headings.projects} />
            <div className="grid gap-5 sm:grid-cols-2">
              {resume.projects.map((p, i) => (
                <Reveal key={p.name} delay={i * 90}>
                  <GlowCard className="h-full overflow-hidden rounded-2xl border border-line bg-paper-raised">
                    <ProjectPreview src={p.image} name={p.name} />
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-ink">
                        {p.url ? (
                          <a href={p.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent-2">
                            {p.name} ↗
                          </a>
                        ) : (
                          p.name
                        )}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <Tag key={s}>{s}</Tag>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </Stage>
        )}

        {/* Stage — Skills */}
        <Stage id="skills">
          <SectionHeading index={t.sectionIndex.skills} title={t.headings.skills} />
          <SkillCloud groups={resume.skills} />

          {resume.languages.length > 0 && (
            <Reveal className="mt-10">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-accent-2">
                {t.languagesISpeak}
              </h3>
              <Languages items={resume.languages} />
            </Reveal>
          )}
        </Stage>

        {/* Stage — Certifications */}
        {resume.certifications.length > 0 && (
          <Stage id="certifications">
            <SectionHeading index={t.sectionIndex.certs} title={t.headings.certifications} />
            <div className="grid gap-5 sm:grid-cols-2">
              {resume.certifications.map((cert, i) => (
                <Reveal key={cert.name} delay={i * 90}>
                  <GlowCard className="flex items-start gap-4 rounded-2xl border border-line bg-paper-raised p-5">
                    {cert.badge ? (
                      <LogoBadge src={cert.badge} name={cert.name} className="h-16 w-16" />
                    ) : (
                      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-2 text-accent-ink">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-7 w-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" />
                        </svg>
                      </span>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-ink">
                        {cert.url ? (
                          <a href={cert.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent-2">
                            {cert.name} ↗
                          </a>
                        ) : (
                          cert.name
                        )}
                      </h3>
                      <p className="mt-0.5 text-sm text-ink-soft">{cert.issuer}</p>
                      <p className="mt-1 font-mono text-xs text-ink-faint">{cert.date}</p>
                    </div>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </Stage>
        )}

        {/* Stage — Education */}
        <Stage id="education">
          <SectionHeading index={t.sectionIndex.education} title={t.headings.education} />
          <div className="space-y-6">
            {resume.education.map((ed, i) => (
              <Reveal key={`${ed.school}-${ed.degree}`} delay={i * 90}>
                <GlowCard className="flex items-start gap-4 rounded-2xl border border-line bg-paper-raised p-6">
                  <LogoBadge src={ed.logo} name={ed.school} className="h-16 w-16" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold text-ink">{ed.degree}</h3>
                      <span className="font-mono text-xs text-ink-faint">
                        {ed.start} — {ed.end}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-ink-soft">
                      {ed.school} · {ed.location}
                    </p>
                    {ed.detail && <p className="mt-1 text-sm text-ink-faint">{ed.detail}</p>}
                    {ed.grade && (
                      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[11px] text-accent-2">
                        {t.gradeLabel}: {ed.grade}
                      </span>
                    )}
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </Stage>

        {/* Stage — Contact */}
        <Stage id="contact" className="items-center text-center" contentClassName="flex flex-col items-center">
          <div aria-hidden className="absolute inset-0 -z-10 bg-dot-grid" />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2/20 blur-[120px]"
          />
          <p className="font-mono text-xs uppercase tracking-wide text-accent-2">{t.sectionIndex.contact}</p>
          <h2 className="mt-4 font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl">
            {t.letsBuildSomething}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{t.openToOpportunities}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${resume.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink shadow-sm shadow-accent/30 transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              {resume.email}
            </a>
            <a
              href={resume.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-accent-2 hover:text-accent-2"
            >
              LinkedIn ↗
            </a>
          </div>

          <Signature text={resume.name} textClassName="text-5xl" lineWidth={220} className="mt-20" />

          <footer className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-line pt-6 text-xs text-ink-faint">
            <p>
              © {new Date().getFullYear()} {resume.name}
            </p>
            <span aria-hidden>·</span>
            <p className="font-mono">{t.footerBuiltWith}</p>
          </footer>
        </Stage>
      </main>
    </div>
  )
}
