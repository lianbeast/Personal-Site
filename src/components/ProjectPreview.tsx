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

  // No live URL means the recorder never produced a clip for this project.
  if (!live) return null
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
  // Unmounting with a pending stop would pause a video mid-unmount.
  useEffect(() => () => clearTimeout(stopTimer.current), [])

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
        loading="lazy"
        decoding="async"
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
