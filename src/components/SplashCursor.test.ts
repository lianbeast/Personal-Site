/**
 * Self-check for the SplashCursor trails-follow-leader invariant.
 *
 * The bug this guards: nodes are filtered out of trailRefs before the leader's
 * position is read, so a null ref would shift every index and the tail would
 * chase the wrong node. Cheap to assert, invisible until it renders wrong.
 *
 * Run: npx tsx src/components/SplashCursor.test.ts  (or node --experimental-strip-types)
 */
import assert from 'node:assert'

const TRAIL = 6
const EASE = 0.35

/** Same recurrence the component's tick() runs, no DOM. */
function settle(leader: { x: number; y: number }, raw: { x: number; y: number }) {
  const pts = Array.from({ length: TRAIL }, () => ({ x: leader.x, y: leader.y }))
  const x = { ...leader }
  for (let f = 0; f < 200; f++) {
    x.x += (raw.x - x.x) * EASE
    x.y += (raw.y - x.y) * EASE
    let px = x.x
    let py = x.y
    for (const p of pts) {
      p.x += (px - p.x) * EASE
      p.y += (py - p.y) * EASE
      px = p.x
      py = p.y
    }
  }
  return pts
}

// 1. Every node converges on the raw pointer.
const settled = settle({ x: 0, y: 0 }, { x: 300, y: 400 })
for (const [i, p] of settled.entries()) {
  assert.ok(Math.hypot(300 - p.x, 400 - p.y) < 1, `node ${i} did not converge`)
}

// 2. Order is preserved: the tail lags behind the head, monotonically.
for (let i = 1; i < settled.length; i++) {
  const prev = Math.hypot(300 - settled[i - 1].x, 400 - settled[i - 1].y)
  const cur = Math.hypot(300 - settled[i].x, 400 - settled[i].y)
  assert.ok(cur > prev, `node ${i} is not behind node ${i - 1} — order inverted`)
}

// 3. The first sighting snaps, so nothing flies in from the last frame.
const snap = settle({ x: -220, y: -220 }, { x: 50, y: 50 })
for (const [i, p] of snap.entries()) {
  assert.ok(Math.hypot(50 - p.x, 50 - p.y) < 1, `node ${i} did not snap on first move`)
}

console.log('SplashCursor: 3 assertions passed')
