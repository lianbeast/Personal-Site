// QA check: verifies the 3D scene renders, cards are on-screen, and live data loaded.
// Usage: node scripts/check-layout.mjs [url]
import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:4173/Personal-Site/'
const channel = process.env.PLAYWRIGHT_CHANNEL || undefined

const browser = await chromium.launch({ channel })
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForSelector('canvas', { timeout: 30000 })
await new Promise((r) => setTimeout(r, 6000)) // let feeds load + orbit settle

const report = await page.evaluate(() => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const canvas = document.querySelector('canvas')
  const c = canvas ? canvas.getBoundingClientRect() : null
  // Only orbit cards (inside the 300px holo shell) count for visibility.
  const cards = [...document.querySelectorAll('.w-\\[300px\\]')].map((el) => {
    const r = el.getBoundingClientRect()
    return {
      title: el.querySelector('h3')?.textContent,
      visible: r.right > 0 && r.left < vw && r.bottom > 0 && r.top < vh,
    }
  })
  const cardTexts = [...document.querySelectorAll('.w-\\[300px\\]')].map((el) =>
    (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 70),
  )
  return {
    viewport: `${vw}x${vh}`,
    canvas: c ? { w: Math.round(c.width), h: Math.round(c.height) } : null,
    name: document.querySelector('h1')?.textContent,
    cards,
    cardTexts,
  }
})

await browser.close()

console.log(JSON.stringify(report, null, 2))
const stuck = report.cardTexts.some((t) => /acquiring feed|signal lost/i.test(t))
const offscreen = report.cards.some((c) => !c.visible)
if (stuck) {
  console.error('✗ some cards did not load live data')
  process.exit(1)
}
if (offscreen) {
  console.error('✗ some cards are off-screen')
  process.exit(1)
}
if (!report.canvas || report.canvas.w < 300 || report.canvas.h < 300) {
  console.error('✗ canvas missing or tiny')
  process.exit(1)
}
console.log('layout OK ✓')
