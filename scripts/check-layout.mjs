// QA check: verifies the 3D scene renders, cards are on-screen, live data
// loaded, and the hover-to-pause carousel freeze works.
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
  // Orbit cards are scanline panels with a h3 title inside the 3D scene.
  // Exclude project cards (they have '↗' in the title and live outside the hero).
  const cards = [...document.querySelectorAll('.scanlines')].filter(
    (el) => el.querySelector('h3') && !el.querySelector('h3')?.textContent?.includes('↗'),
  ).map((el) => {
    const r = el.getBoundingClientRect()
    return {
      title: el.querySelector('h3')?.textContent,
      visible: r.right > 0 && r.left < vw && r.bottom > 0 && r.top < vh,
    }
  })
  const cardTexts = [...document.querySelectorAll('.scanlines')].filter(
    (el) => el.querySelector('h3') && !el.querySelector('h3')?.textContent?.includes('↗'),
  ).map((el) =>
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

// Hover-to-pause: a card's screen position must freeze while hovered, then
// resume moving after the mouse leaves. Try each card in case one is
// currently occluded behind the planet (pointer-events disabled).
const cards = page.locator('.scanlines').filter({ has: page.locator('h3') })
const count = await cards.count()
let hoverFroze = false
let hoverResumed = false
for (let i = 0; i < count && !(hoverFroze && hoverResumed); i++) {
  const b = await cards.nth(i).boundingBox()
  if (!b) continue
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2)
  await new Promise((r) => setTimeout(r, 200))
  const h1 = await cards.nth(i).boundingBox().then((bb) => Math.round(bb.x + bb.width / 2))
  await new Promise((r) => setTimeout(r, 2500))
  const h2 = await cards.nth(i).boundingBox().then((bb) => Math.round(bb.x + bb.width / 2))
  await page.mouse.move(0, 0)
  const u1 = await cards.nth(i).boundingBox().then((bb) => Math.round(bb.x + bb.width / 2))
  await new Promise((r) => setTimeout(r, 2500))
  const u2 = await cards.nth(i).boundingBox().then((bb) => Math.round(bb.x + bb.width / 2))
  hoverFroze = Math.abs(h2 - h1) < 3
  hoverResumed = Math.abs(u2 - u1) > 3
  if (hoverFroze && hoverResumed) break
}

// ── Pause control ────────────────────────────────────────────────
await page.click('[aria-label="Pause orbit"]')
await new Promise((r) => setTimeout(r, 300))
const cardX = async (n) => {
  const b = await cards.nth(n).boundingBox()
  return b ? Math.round(b.x + b.width / 2) : 0
}
const visibleCard = async () => {
  for (let i = 0; i < count; i++) {
    const pe = await cards.nth(i).evaluate((el) => getComputedStyle(el).pointerEvents)
    if (pe === 'auto' && (await cards.nth(i).boundingBox())) return i
  }
  return -1
}

// Paused: cards must hold still.
const vi = await visibleCard()
let pauseFroze = false
if (vi >= 0) {
  const p1 = await cardX(vi)
  await new Promise((r) => setTimeout(r, 2500))
  const p2 = await cardX(vi)
  pauseFroze = Math.abs(p2 - p1) < 3
}

// Paused: dragging a card must move it to a new spot.
let dragMoved = false
if (vi >= 0) {
  const b = await cards.nth(vi).boundingBox()
  await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2)
  await page.mouse.down()
  await page.mouse.move(b.x + b.width / 2 + 90, b.y + b.height / 2, { steps: 6 })
  await page.mouse.up()
  const d0 = await cardX(vi)
  dragMoved = Math.abs(d0 - Math.round(b.x + b.width / 2)) > 30
}

// Resumed: cards must orbit again.
await page.click('[aria-label="Resume orbit"]')
await new Promise((r) => setTimeout(r, 300))
let resumeMoved = false
if (vi >= 0) {
  const r1 = await cardX(vi)
  await new Promise((r) => setTimeout(r, 2500))
  const r2 = await cardX(vi)
  resumeMoved = Math.abs(r2 - r1) > 3
}

// ── Map Room section ─────────────────────────────────────────────
// Verify the GeoLibre embed section exists and its iframe target is a
// live GeoLibre URL. The heavy GIS iframe itself isn't driven (too slow).
await page.evaluate(() =>
  document.getElementById('map-room')?.scrollIntoView(),
)
await new Promise((r) => setTimeout(r, 800))
const mapRoom = await page.evaluate(() => {
  const section = document.getElementById('map-room')
  const frame = document.querySelector('#map-room iframe')
  const r = section ? section.getBoundingClientRect() : null
  return {
    present: !!section,
    inViewport: !!r && r.height > 300 && r.width > 300,
    iframe: frame?.getAttribute('src') || null,
  }
})

await browser.close()

console.log(JSON.stringify(report, null, 2))
const stuck = report.cardTexts.some((t) => /acquiring feed|signal lost/i.test(t))
const offscreen = report.cards.some((c) => !c.visible)
console.log(
  `hover: ${hoverFroze ? 'frozen ✓' : 'MOVED ✗'}/${hoverResumed ? 'moving ✓' : 'STUCK ✗'} | ` +
    `pause: ${pauseFroze ? 'frozen ✓' : 'MOVED ✗'} | ` +
    `drag: ${dragMoved ? 'moved ✓' : 'STUCK ✗'} | ` +
    `resume: ${resumeMoved ? 'moving ✓' : 'STUCK ✗'}`,
)
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
if (!hoverFroze || !hoverResumed || !pauseFroze || !dragMoved || !resumeMoved) {
  console.error('✗ carousel controls not working')
  process.exit(1)
}
const mapOk =
  mapRoom.present &&
  mapRoom.inViewport &&
  !!mapRoom.iframe &&
  /web\.geolibre\.app/.test(mapRoom.iframe)
if (!mapOk) {
  console.error(
    `✗ map room broken (present=${mapRoom.present} inView=${mapRoom.inViewport} iframe=${mapRoom.iframe})`,
  )
  process.exit(1)
}
console.log(`map room: section ✓ iframe: ${mapRoom.iframe}`)
console.log('layout OK ✓')
