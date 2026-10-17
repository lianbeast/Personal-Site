import { useEffect, useRef, useState } from 'react'
import { previewSlug } from '../config'

/**
 * A recorded clip of the real deployed site — mp4 with a first-frame poster.
 * Regenerated on every deploy by scripts/record-project-previews.mjs, so the
 * card can't show something the live site no longer looks like.
 *
 * Plain CSS, no JS animation loop: the poster is an <img> the browser paints
 * immediately, the <video> is preload="none" so it costs nothing until the
 * card scrolls near, and the clip is a background-image swap on hover. That
 * also means it degrades to a still image under prefers-reduced-motion,
 * because there is no motion to disable — the poster simply stays.
 */
export function ProjectPreview({
  name,
  live,
  className = '',
}: {
  name: string
  live?: string
  className?: string
}) {
  const video = useRef<HTMLVideoElement>(null)
  const stopTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  // Unmounting with a pending stop would pause a video mid-unmount.
  // Every hook runs before the early return below: `failed` flips at runtime
  // (async img decode error), and a conditional return between hooks — the
  // shape this file used to have for `!live` — throws "rendered fewer hooks
  // than expected" the moment a poster fails.
  useEffect(() => () => clearTimeout(stopTimer.current), [])

  // Two ways a card ends up with no clip: the project has no live URL (the
  // recorder never ran for it), or the poster 404s (recorder skipped it, or a
  // deploy lost the file — that's how resume-website broke: it has a live URL
  // but no recorded asset). Either way, render a monogram tile instead of
  // returning null — a null preview collapsed the card's media area and left
  // no-preview repos a third shorter than their neighbours in the grid.
  if (!live || failed) {
    const words = name.split(/[^a-zA-Z0-9]+/).filter(Boolean)
    const initials = (
      words.length > 1 ? words.slice(0, 2).map((w) => w[0]) : [name.slice(0, 2)]
    )
      .join('')
      .toUpperCase()
    return (
      <div
        className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[var(--color-bg-elevated)] ${className}`}
      >
        <span className="font-mono text-lg font-light tracking-[0.25em] text-[var(--color-text-subtle)]">
          {initials}
        </span>
      </div>
    )
  }
  const slug = previewSlug(name)
  const mp4 = `${import.meta.env.BASE_URL}previews/${slug}.mp4`
  const poster = `${import.meta.env.BASE_URL}previews/${slug}.jpg`

  // Pause on a delay, not on the event. Smooth-scroll and the card's entry
  // spring both carry the page under a stationary cursor, so a leave can fire
  // within milliseconds of the enter and the clip would start and stop dead.
  // Re-checking after a beat catches a re-entry and ignores the artefact; a
  // genuine exit is imperceptible a moment later.
  const start = () => {
    clearTimeout(stopTimer.current)
    video.current?.play().catch(() => {})
  }
  const stop = () => {
    clearTimeout(stopTimer.current)
    stopTimer.current = setTimeout(() => {
      const v = video.current
      if (!v) return
      v.pause()
      v.currentTime = 0
    }, 200)
  }

  return (
    <div
      // Mouse-only by design. Keyboard and touch users get the poster, which
      // is the accessible representation: it carries the alt text, and the
      // clip is decorative (aria-hidden, no controls). Focus handlers here
      // would never fire anyway — focus lands on the card's ancestor link and
      // React propagates focus upward, not down into this div.
      className={`group/prev relative overflow-hidden bg-[var(--color-bg-elevated)] ${className}`}
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      <img
        src={poster}
        alt={`${name} — screenshot of the live site`}
        loading={name === 'Personal-Site' ? 'eager' : 'lazy'}
        fetchPriority={name === 'Personal-Site' ? 'high' : 'auto'}
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
      <video
        ref={video}
        src={mp4}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        onCanPlay={() => setReady(true)}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: ready ? undefined : 0 }}
      />
      {/* Hover affordance only — hidden from AT, the card link carries the name. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 font-mono text-[9px] tracking-widest text-white/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/prev:opacity-100"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] pulse-dot" />
        LIVE
      </span>
    </div>
  )
}
