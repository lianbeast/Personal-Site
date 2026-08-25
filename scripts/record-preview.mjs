// Records the live site into preview.gif (Playwright + gifenc).
// Usage: node scripts/record-preview.mjs [url] [outFile]
// Env: PREVIEW_URL, PREVIEW_OUT, PLAYWRIGHT_CHANNEL (e.g. "chrome")
import { chromium } from 'playwright'
import gifenc from 'gifenc'
const { GIFEncoder, quantize, applyPalette } = gifenc
import { PNG } from 'pngjs'
import { writeFile } from 'node:fs/promises'

const url = process.env.PREVIEW_URL || process.argv[2] || 'http://localhost:4173/'
const out = process.env.PREVIEW_OUT || process.argv[3] || 'preview.gif'
const channel = process.env.PLAYWRIGHT_CHANNEL || undefined

const FPS = 8
const DURATION = 6
const WIDTH = 800
const HEIGHT = 500
const FRAMES = FPS * DURATION
const DELAY = 1000 / FPS

const browser = await chromium.launch({ channel })
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
})

// Wait for the server to come up (CI deploy can lag a few seconds).
let ok = false
for (let i = 0; i < 30; i++) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })
    ok = true
    break
  } catch {
    await new Promise((r) => setTimeout(r, 2000))
  }
}
if (!ok) throw new Error(`Could not load ${url}`)

// Surface page errors so a broken deploy is caught in CI.
const pageErrors = []
page.on('pageerror', (e) => pageErrors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && pageErrors.push(m.text()))

await page.waitForSelector('canvas', { timeout: 30000 })
await new Promise((r) => setTimeout(r, 1500)) // let the scene settle

const pngs = []
for (let i = 0; i < FRAMES; i++) {
  pngs.push(await page.screenshot({ type: 'png' }))
  await new Promise((r) => setTimeout(r, DELAY))
}
await browser.close()

const gif = GIFEncoder()
for (const buf of pngs) {
  const { data, width, height } = PNG.sync.read(buf)
  // rgb444 = 4 bits/channel → far fewer distinct colors → much smaller GIF
  const palette = quantize(data, 256, { format: 'rgb444' })
  const index = applyPalette(data, palette)
  gif.writeFrame(index, width, height, { palette, delay: DELAY })
}
gif.finish()

const bytes = gif.bytes()
await writeFile(out, Buffer.from(bytes))
console.log(`wrote ${out} (${(bytes.length / 1024).toFixed(0)} KB, ${FRAMES} frames @ ${FPS}fps)`)
if (pageErrors.length) {
  console.warn(`⚠ ${pageErrors.length} page error(s):`)
  for (const e of pageErrors.slice(0, 5)) console.warn('  -', e.slice(0, 200))
} else {
  console.log('no page errors ✓')
}
