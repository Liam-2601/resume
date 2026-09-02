// Generates public/cv-en.pdf and public/cv-de.pdf from the /print route,
// using the exact same content as the web page (src/data/resume.en.ts /
// resume.de.ts). Run with: npm run pdf
import { createServer } from 'vite'
import puppeteer from 'puppeteer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const LOCALES = ['en', 'de']

async function main() {
  const server = await createServer({ root, server: { port: 0 } })
  await server.listen()
  const address = server.httpServer?.address()
  const port = typeof address === 'object' && address ? address.port : 5173

  const browser = await puppeteer.launch({ headless: true })
  try {
    for (const locale of LOCALES) {
      const outFile = path.join(root, 'public', `cv-${locale}.pdf`)
      const url = `http://localhost:${port}/print?lang=${locale}`

      const page = await browser.newPage()
      await page.goto(url, { waitUntil: 'networkidle0' })
      await page.emulateMediaType('print')
      await page.pdf({
        path: outFile,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: false,
        margin: { top: '0mm', bottom: '0mm', left: '0mm', right: '0mm' },
      })
      await page.close()
      console.log(`CV written to ${path.relative(root, outFile)}`)
    }
  } finally {
    await browser.close()
    await server.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
