import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:4173/Personal-Site/'
const channel = process.env.PLAYWRIGHT_CHANNEL || undefined

const browser = await chromium.launch({ channel })
const page = await browser.newPage({ viewport: { width: 375, height: 667 } })
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
await page.waitForSelector('canvas', { timeout: 30000 })
await new Promise((r) => setTimeout(r, 5000))

const report = await page.evaluate(() => {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const canvas = document.querySelector('canvas')
  const c = canvas ? canvas.getBoundingClientRect() : null
  const cards = [...document.querySelectorAll('.scanlines')]
    .filter((el) => el.querySelector('h3') && !el.querySelector('h3')?.textContent?.includes('↗'))
    .map((el) => {
      const r = el.getBoundingClientRect()
      return {
        title: el.querySelector('h3')?.textContent,
        visible: r.right > 0 && r.left < vw && r.bottom > 0 && r.top < vh,
        w: Math.round(r.width),
      }
    })
  const name = document.querySelector('h1')?.textContent
  const pauseBtn = !!document.querySelector('[aria-label="Pause orbit"]')
  return { viewport: `${vw}x${vh}`, canvas: c ? { w: Math.round(c.width), h: Math.round(c.height) } : null, name, cards, pauseBtn }
})

await browser.close()

console.log(JSON.stringify(report, null, 2))
const allVisible = report.cards.every((c) => c.visible)
const allSmall = report.cards.every((c) => c.w < 300)
console.log(`all visible: ${allVisible} | cards <300px: ${allSmall} | canvas: ${report.canvas?.w}x${report.canvas?.h} | name: ${report.name} | pause btn: ${report.pauseBtn}`)
if (!allVisible) { console.error('✗ some cards off-screen on mobile'); process.exit(1) }
if (!report.pauseBtn) { console.error('✗ pause button missing on mobile'); process.exit(1) }
console.log('mobile OK ✓')
