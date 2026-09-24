import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:4173/Personal-Site/'
const channel = process.env.PLAYWRIGHT_CHANNEL || undefined

const browser = await chromium.launch({ channel })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
await new Promise((r) => setTimeout(r, 3000))

const report = await page.evaluate(() => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const sections = [...document.querySelectorAll('section')].map((s) => {
    const r = s.getBoundingClientRect()
    return {
      id: s.id || s.querySelector('p')?.textContent?.trim()?.slice(0, 30) || 'unknown',
      top: Math.round(r.top),
      height: Math.round(r.height),
    }
  })
  // Only one h1 exists (hero scene) — the old sr-only one in index.html was removed.
  const h1 = document.querySelector('#s-hero h1')?.textContent
  // Hero CTA: read it, then assert its href resolves to a real element. Checking
  // the href value itself would re-introduce the drift this check is meant to catch.
  const ctaEl = document.querySelector('#s-hero a[href^="#"]')
  const cta = ctaEl?.textContent
  const ctaResolves = !!ctaEl && !!document.querySelector(ctaEl.getAttribute('href'))
  const contact = document.querySelector('a[href*="mailto"]')?.textContent
  const footer = document.querySelector('footer')?.textContent?.trim()?.slice(0, 50)
  const mapIframe = document.querySelector('#map-room iframe')?.getAttribute('src')
  return { viewport: `${vw}x${vh}`, title: document.title, h1, cta, ctaResolves, contact, footer, sections, mapIframe }
})

await browser.close()

console.log(JSON.stringify(report, null, 2))
const checks = [
  ['title', report.title?.includes('Lian Beast')],
  ['h1', report.h1?.includes('build things')],
  // Resolves, not just present: a CTA pointing at a renamed anchor is a dead link.
  ['cta', !!report.cta && report.ctaResolves],
  ['contact', !!report.contact],
  ['footer', !!report.footer],
  ['sections ≥ 6', report.sections.length >= 6],
  ['map room', !!report.mapIframe],
]
let ok = true
for (const [name, pass] of checks) {
  console.log(`  ${pass ? '✓' : '✗'} ${name}`)
  if (!pass) ok = false
}
if (!ok) { console.error('✗ redesign check failed'); process.exit(1) }
console.log('redesign OK ✓')
