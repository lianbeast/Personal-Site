// Records each project in src/config.ts into public/previews/<slug>.mp4 + .jpg.
// Usage: node scripts/record-project-previews.mjs
// Env: PREVIEW_WIDTH, PREVIEW_HEIGHT, PREVIEW_FPS, PREVIEW_DURATION, PREVIEW_SCROLL
//
// A card-sized clip of the real deployed site: fade in, then a short scroll so
// the motion reads as "this is a live page", not a slideshow. Re-run on deploy
// like preview.gif is, so the cards can never drift from the actual sites.
import { chromium } from 'playwright'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'

import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { PNG } from 'pngjs'

const run = promisify(execFile)
const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'previews')

// Write only when the bytes differ. Encoders aren't byte-reproducible, so this
// is the only way to tell "site changed" from "re-encode jitter" — and an
// unchanged site must leave an empty `git diff` so CI skips the commit loop.
const writeIfChanged = async (path, buf) => {
  try {
    if ((await readFile(path)).equals(buf)) return false
  } catch {
    /* missing — fall through to write */
  }
  await writeFile(path, buf)
  return true
}

const WIDTH = Number(process.env.PREVIEW_WIDTH || 640)
const HEIGHT = Number(process.env.PREVIEW_HEIGHT || 400)
const FPS = Number(process.env.PREVIEW_FPS || 12)
const DURATION = Number(process.env.PREVIEW_DURATION || 4) // seconds
const FRAMES = Math.round(FPS * DURATION)
const SCROLL = Number(process.env.PREVIEW_SCROLL || 260) // px of scroll across the clip

// Read the project list straight out of config.ts so adding a project to the
// site is the only step needed — no second list to keep in sync.
// Matches one object literal at a time ([^}]* can't leave the braces), so the
// top-level `name: 'Lian Beast'` in `site` can never pair up with a project's
// `live:` 80 lines below it.
async function readProjects() {
  const src = await readFile(join(root, 'src', 'config.ts'), 'utf8')
  const out = []
  const re = /\{\s*name:\s*'([^']+)'([^}]*?)\}/g
  for (let m; (m = re.exec(src)); ) {
    const live = /live:\s*'([^']+)'/.exec(m[2])
    if (live) out.push({ name: m[1], live: live[1] })
  }
  return out
}

// ffmpeg is NOT on the GitHub runner image — preview-gif.yml installs it via apt.
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg'
await mkdir(outDir, { recursive: true })

const projects = await readProjects()
if (!projects.length) throw new Error('no projects with a live: URL found in src/config.ts')
console.log(`recording ${projects.length} project preview(s) at ${WIDTH}x${HEIGHT} @ ${FPS}fps`)

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
})

const problems = []
const frames = Buffer.alloc(WIDTH * HEIGHT * 4 * FRAMES)
const perFrame = WIDTH * HEIGHT * 4
const tmp = join(outDir, '.frames')
await mkdir(tmp, { recursive: true })

for (const { name, live } of projects) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const errors = []
  const onError = (e) => errors.push(String(e).slice(0, 200))
  const onConsole = (m) => m.type() === 'error' && onError(m.text())
  page.on('pageerror', onError)
  page.on('console', onConsole)

  // CI deploy can lag behind the push that triggered us.
  let loaded = false
  for (let i = 0; i < 30 && !loaded; i++) {
    try {
      await page.goto(live, { waitUntil: 'networkidle', timeout: 20000 })
      loaded = true
    } catch {
      await new Promise((r) => setTimeout(r, 2000))
    }
  }
  if (!loaded) {
    problems.push(`${name}: could not load ${live}`)
    page.off('pageerror', onError)
    page.off('console', onConsole)
    continue
  }

  await page.waitForSelector('h1, h2', { timeout: 30000 }).catch(() => {})
  await new Promise((r) => setTimeout(r, 2500)) // fonts, hero animations, texture layers

  // Start at the top of the real page, not wherever the last project left us.
  await page.evaluate(() => window.scrollTo(0, 0))
  await new Promise((r) => setTimeout(r, 600))

  for (let i = 0; i < FRAMES; i++) {
    // Ease-out scroll: fast at first, settling at the end.
    const p = i / (FRAMES - 1)
    const eased = 1 - Math.pow(1 - p, 2)
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(SCROLL * eased))
    // Hold the first beat still so the poster frame reads as a real page.
    const hold = i < Math.round(FRAMES * 0.35) ? 260 : 1000 / FPS
    await new Promise((r) => setTimeout(r, hold))
    const buf = await page.screenshot({ type: 'png' })
    const { data } = PNG.sync.read(buf)
    data.copy(frames, i * perFrame)
  }

  page.off('pageerror', onError)
  page.off('console', onConsole)
  if (errors.length) problems.push(`${name}: ${errors.length} page error(s) — ${errors[0]}`)

  // Raw frames -> h264 mp4 (yuv420p, faststart so it can stream/loop).
  // Encoded into tmp, then published with writeIfChanged: x264 isn't
  // byte-reproducible, so writing straight to outDir would dirty the tree on
  // every run and the CI job would commit a new preview forever.
  const raw = join(tmp, `${slug}.rgba`)
  await writeFile(raw, frames.subarray(0, perFrame * FRAMES))
  const mp4 = join(tmp, `${slug}.mp4`)
  await run(FFMPEG, [
    '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba',
    '-s', `${WIDTH}x${HEIGHT}`, '-r', String(FPS), '-i', raw,
    '-an',
    '-c:v', 'libx264', '-profile:v', 'main', '-pix_fmt', 'yuv420p',
    '-crf', '28', '-preset', 'slow', '-movflags', '+faststart',
    mp4,
  ])

  // Poster = first frame (the held, unscrolled hero).
  const poster = join(tmp, `${slug}.jpg`)
  await run(FFMPEG, [
    '-y', '-f', 'rawvideo', '-pix_fmt', 'rgba',
    '-s', `${WIDTH}x${HEIGHT}`, '-r', String(FPS), '-i', raw,
    '-frames:v', '1', '-q:v', '4', poster,
  ])

  const changed = []
  for (const f of [`${slug}.mp4`, `${slug}.jpg`]) {
    if (await writeIfChanged(join(outDir, f), await readFile(join(tmp, f)))) changed.push(f)
  }
  const { size: mp4Size } = await stat(mp4)
  const { size: jpgSize } = await stat(poster)
  const tag = changed.length === 2 ? '↑' : changed.length ? '~' : '='
  console.log(`  ${tag} ${slug}: ${(mp4Size / 1024).toFixed(0)} KB mp4 + ${(jpgSize / 1024).toFixed(0)} KB jpg`)
}

await browser.close()
await run('rm', ['-rf', tmp])

if (problems.length) {
  console.warn(`\n⚠ ${problems.length} problem(s):`)
  for (const p of problems) console.warn(`  - ${p}`)
  // Non-fatal: a dead third-party site should not block the deploy. Existing
  // assets for that project are left untouched.
} else {
  console.log('all project previews recorded ✓')
}
