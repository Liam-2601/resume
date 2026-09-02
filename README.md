# Liam Gleeson — Résumé

A minimalist, single-page résumé built with React, TypeScript, Vite, and Tailwind CSS,
plus a print-optimized `/print` route that generates a matching CV PDF via Puppeteer.
Available in English and German, switchable via the language toggle in the nav.

## Editing content

Content lives in **two files**, one per language:
[`src/data/resume.en.ts`](src/data/resume.en.ts) and
[`src/data/resume.de.ts`](src/data/resume.de.ts). They're independent, plain-TypeScript
copies (not derived from one another) sharing the same shape defined in
[`src/data/types.ts`](src/data/types.ts) — `// TODO` comments mark placeholder values.
Edit whichever language's file you need, save, and both the web page and the generated
PDF for that language update automatically.

Non-résumé UI text (nav labels, section headings, button copy) lives separately in
[`src/i18n/ui.ts`](src/i18n/ui.ts), also as an English/German dictionary.

## Commands

```bash
npm install       # install dependencies (first time only)
npm run dev        # start the dev server at http://localhost:5173
npm run build       # type-check and build the production site to dist/
npm run preview      # serve the production build locally
npm run pdf         # regenerate public/cv-en.pdf and public/cv-de.pdf
```

Run `npm run pdf` any time you edit either `resume.en.ts` or `resume.de.ts` and want
updated CV downloads — it boots a local Vite server, renders `/print?lang=en` and
`/print?lang=de` in headless Chrome, and writes `public/cv-en.pdf` / `public/cv-de.pdf`.
The site's "Download CV" button links to whichever file matches the current language
toggle.

**`public/cv-en.pdf` and `public/cv-de.pdf` are committed to the repo** — they're
build inputs, not build outputs. The production build (`npm run build`, what
Cloudflare runs) never regenerates them, since generating them needs Puppeteer to
launch an actual Chromium instance, and Puppeteer's Chromium download is blocked by
Cloudflare's build environment (postinstall scripts are gated there). So: **run
`npm run pdf` locally and commit the two PDF files every time the résumé content
changes** — otherwise the live "Download CV" button keeps serving the old (or a
missing) file.

## Adding images

The profile photo, company/school logos, project screenshots, and certification
badges all work the same way: leave the field empty and a generated placeholder
(monogram badge, gradient preview, or icon) is shown instead; drop a real file
anywhere under `public/` and point the field at it (e.g. `/photo.jpg`,
`/logos/acme.png`, `/projects/my-app.png`) to swap it in. Image fields aren't
translated — set them once in `resume.en.ts` and copy the same path into
`resume.de.ts`. Relevant fields:

- `photo` — profile photo (`Avatar`)
- `experience[].logo` / `education[].logo` — company/institution logo (`LogoBadge`)
- `projects[].image` — project screenshot, shown in a browser-style frame (`ProjectPreview`)
- `certifications[].badge` — credential badge image (`LogoBadge`)

The print CV intentionally stays photo-only (no logos/screenshots) to keep it lean
and ATS-friendly.

## Structure

- `src/data/types.ts` — shared TypeScript shape for the résumé content
- `src/data/resume.en.ts` / `resume.de.ts` — the actual content, one file per language
- `src/data/index.ts` — combines both into `resumeByLocale` + the `useResume()` hook
- `src/i18n/` — language context/toggle plumbing (`LanguageContext.tsx`) and the UI string dictionary (`ui.ts`)
- `src/pages/Home.tsx` — the web page (hero, experience, projects, skills, education)
- `src/pages/Print.tsx` — the dense, print-formatted CV layout used to generate the PDF
- `src/components/` — small shared pieces (nav, section headings, tags, language toggle)
- `scripts/generate-pdf.mjs` — the Puppeteer script behind `npm run pdf`

## Deploying

`npm run build` outputs a static site in `dist/` — deploy it to any static host
(Cloudflare, Vercel, Netlify, GitHub Pages, S3, etc.). Currently deployed via
Cloudflare Workers (`wrangler deploy`, auto-configured for SPA asset serving).
Run `npm run pdf` and commit the result before pushing if `public/cv-en.pdf` /
`public/cv-de.pdf` need to be refreshed (see above — they're committed, not
generated at deploy time).
