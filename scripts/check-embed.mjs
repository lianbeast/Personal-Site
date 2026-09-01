// Temp check: serve dist/, open the page, verify the GeoLibre iframe URL and load state.
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.gif': 'image/gif', '.png': 'image/png', '.svg': 'image/svg+xml' }
const root = 'dist'
const server = createServer(async (req, res) => {
  let p = req.url.split('?')[0]
  if (p === '/') p = '/index.html'
  try {
    const body = await readFile(join(root, p))
    res.writeHead(200, { 'content-type': MIME[extname(p)] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404); res.end('nf')
  }
})
await new Promise((r) => server.listen(4599, r))

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const pageErrors = []
page.on('pageerror', (e) => pageErrors.push('site: ' + String(e).slice(0, 150)))

await page.goto('http://localhost:4173/Personal-Site/', { waitUntil: 'networkidle', timeout: 30000 })

const iframeInfo = await page.evaluate(() => {
  const f = document.querySelector('iframe[title="GeoLibre map"]')
  if (!f) return null
  return { src: f.src, visible: !!(f.offsetWidth && f.offsetHeight) }
})
if (!iframeInfo) { console.error('FAIL: iframe not found'); process.exit(1) }
console.log('iframe src:', iframeInfo.src)
console.log('iframe visible:', iframeInfo.visible)

const u = new URL(iframeInfo.src)
const dataCount = u.searchParams.getAll('data').length
const styleCount = u.searchParams.getAll('style').length
console.log('data params:', dataCount, '| style params:', styleCount)
console.log('layout:', u.searchParams.get('layout'), '| panels:', u.searchParams.get('panels'))

// Scroll the map room into view so the lazy iframe starts loading, then wait for it.
await page.evaluate(() => document.querySelector('#map-room')?.scrollIntoView())
const frameHandle = await page.waitForSelector('iframe[title="GeoLibre map"]', { timeout: 10000 })
const frame = await frameHandle.contentFrame()
let innerOk = false
if (frame) {
  try {
    await frame.waitForSelector('canvas, video, img, [class*="map"]', { timeout: 30000 })
    innerOk = true
  } catch { /* cross-origin frame content may be unreadable; fall back to network check */ }
}
console.log('frame content reachable (canvas/map node):', innerOk)

// Check that the browser actually issued requests to web.geolibre.app
const geoRequests = []
page.on('request', (r) => { if (r.url().includes('geolibre.app')) geoRequests.push(r.url().slice(0, 120)) })
await page.waitForTimeout(8000)
console.log('requests to geolibre.app observed:', geoRequests.length ? geoRequests.slice(0, 3) : '(none captured after scroll)')

console.log('site page errors:', pageErrors.length ? pageErrors : 'none')
await browser.close()
server.close()
