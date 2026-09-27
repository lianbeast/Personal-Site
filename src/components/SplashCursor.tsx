import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

/** Trail nodes behind the ring. Each follows the one ahead of it, so the tail
 *  lags further back the lower the index. */
const TRAIL = 6
/** Fraction of the remaining gap closed per frame, per node. Higher snaps
 *  harder; below ~0.2 the tail visibly drags. */
const EASE = 0.35
const MAX_GAP = 220 // beyond this the ring is treated as a fresh sighting

/**
 * Gold splash cursor: a ring that grows over interactive elements, trailing a
 * short ribbon that blooms with pointer speed.
 *
 * No React state — the rAF loop writes transforms straight onto these nodes.
 * The follower this replaces called setState on every mousemove, re-rendering
 * the whole app (all five narrative scenes included) on each event; here only
 * these few nodes change.
 *
 * No WebGL and no new dependency: the ribbon is six divs. Renders nothing at
 * all under prefers-reduced-motion, where a pointer trail is decoration by
 * definition — same call the previous follower made.
 */
export function SplashCursor() {
  const reduced = useReducedMotion()
  const ringRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (reduced) return
    const ring = ringRef.current
    if (!ring) return
    const trail = trailRefs.current.filter((n): n is HTMLSpanElement => n !== null)
    if (trail.length !== TRAIL) return

    let x = -MAX_GAP
    let y = -MAX_GAP
    let tx = x // raw pointer
    let ty = y
    const points = trail.map(() => ({ x, y }))
    let seen = false
    let overLink = false
    let frame = 0

    const move = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (seen) return
      // First sighting: snap the whole ribbon to the pointer, otherwise it
      // flies in from wherever the last frame left it (top-left on load).
      seen = true
      x = tx
      y = ty
      for (const p of points) {
        p.x = tx
        p.y = ty
      }
      ring.style.opacity = '1'
    }

    const over = (e: MouseEvent) => {
      overLink = !!(e.target as HTMLElement).closest('a, button, .btn-magnetic')
    }

    const leave = () => {
      seen = false
      ring.style.opacity = '0'
      for (const n of trail) n.style.opacity = '0'
    }

    const tick = () => {
      // Distance still to close is a speed proxy: it peaks mid-move and
      // decays as the ring catches up, so the bloom is a swoosh, not a pulse.
      const gap = Math.hypot(tx - x, ty - y)
      const speed = Math.min(1, gap / 90)
      x += (tx - x) * EASE
      y += (ty - y) * EASE

      const grow = overLink ? 2 : 1
      ring.style.transform = `translate3d(${x - 20}px, ${y - 20}px, 0) scale(${grow + speed * 0.3})`

      let px = x
      let py = y
      for (let i = 0; i < trail.length; i++) {
        const p = points[i]
        p.x += (px - p.x) * EASE
        p.y += (py - p.y) * EASE
        px = p.x
        py = p.y
        const size = 10 - i
        const s = trail[i].style
        s.width = `${size}px`
        s.height = `${size}px`
        s.transform = `translate3d(${p.x - size / 2}px, ${p.y - size / 2}px, 0)`
        s.opacity = seen ? String((0.5 - i * 0.07) * (0.35 + speed * 0.65)) : '0'
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    document.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
    }
  }, [reduced])

  if (reduced) return null

  return (
    // Purely decorative: the real cursor is untouched, and every interactive
    // element keeps its own focus ring, so there is nothing for AT to miss.
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {Array.from({ length: TRAIL }, (_, i) => (
        <span
          key={i}
          ref={(n) => {
            trailRefs.current[i] = n
          }}
          className="absolute left-0 top-0 rounded-full bg-[var(--color-accent)] opacity-0 will-change-transform"
        />
      ))}
      <div
        ref={ringRef}
        className="splash-ring absolute left-0 top-0 opacity-0 will-change-transform"
      />
    </div>
  )
}
