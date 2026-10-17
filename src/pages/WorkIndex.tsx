import { useState } from 'react'
import { site, type Project } from '../config'
import { Footer } from '../components/Footer'

/* ── Work Index page ─────────────────────────────────────────────────────────
   A dense grid of every project the creator has built. Card layout inspired
   by the site's existing aesthetic: rounded-2xl cards, gold accent on hover,
   video preview on hover (where a clip exists), and a sticky glassmorphism
   top bar with a link back to the main narrative.
   ─────────────────────────────────────────────────────────────────────────── */

interface CardProps {
  project: Project
  index: number
}

function ProjectCard({ project, index }: CardProps) {
  const slug = (project.name ?? '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const isSelf = project.name === 'Personal-Site'
  const hasPreview = !!project.live
  // resume-website has a live URL but no recorded clip — the poster 404s and
  // the browser paints the alt text inside a broken frame. Falling back to the
  // same "no clip" tile the source-only projects use keeps the grid uniform.
  const [previewFailed, setPreviewFailed] = useState(false)
  const showMedia = hasPreview && !previewFailed

  return (
    <a
      href={project.live ?? project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-card-hover)] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Video / image preview */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-[var(--color-bg-elevated)]">
        {showMedia && (
          <>
            <img
              src={`${import.meta.env.BASE_URL}previews/${slug}.jpg`}
              alt={`${project.name} — live site screenshot`}
              loading="lazy"
              decoding="async"
              onError={() => setPreviewFailed(true)}
              className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <video
              src={`${import.meta.env.BASE_URL}previews/${slug}.mp4`}
              poster={`${import.meta.env.BASE_URL}previews/${slug}.jpg`}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              onPlay={(e) => { (e.target as HTMLVideoElement).currentTime = 0 }}
            />
          </>
        )}
        {!showMedia && (
          <div className="flex h-full w-full items-center justify-center text-[var(--color-text-subtle)]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
        )}
        {/* LIVE badge */}
        {hasPreview && (
          <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 font-mono text-[9px] tracking-widest text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            LIVE
          </span>
        )}
        {isSelf && (
          <span className="absolute left-2 top-2 rounded-full bg-[var(--color-accent)] px-2 py-1 font-mono text-[9px] tracking-widest text-[var(--color-text-inverse)]">
            THIS
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-sm font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-[var(--color-accent)]">
          {project.name}
          {!isSelf && <span className="ml-1.5 text-[var(--color-text-subtle)]">↗</span>}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
          {project.description}
        </p>
        <div className="mt-auto pt-3 flex items-center gap-3 text-[11px] text-[var(--color-text-subtle)]">
          <span className="font-mono">GitHub</span>
          <span>·</span>
          {hasPreview && <span className="flex items-center gap-1 text-[var(--color-accent)]">Live demo</span>}
          {!hasPreview && <span>Source only</span>}
        </div>
      </div>
    </a>
  )
}

export function WorkIndexPage() {
  const projects = site.projects

  return (
    <div className="relative min-h-screen bg-bg text-text font-body antialiased">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <a href={import.meta.env.BASE_URL} className="font-display text-sm font-medium text-white transition-colors hover:text-[var(--color-accent)]">
            ← Back
          </a>
          <a href={`${import.meta.env.BASE_URL}featured`} className="font-display text-sm font-medium text-white transition-colors hover:text-[var(--color-accent)]">
            Featured
          </a>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-subtle)]">
            {projects.length} projects
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="px-6 pt-20 pb-12">
        <div className="mx-auto max-w-4xl">
          <p className="m-0 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-subtle)]">
            work index
          </p>
          <h1 className="mt-4 m-0 font-display text-4xl font-medium leading-[1.2] tracking-tight text-white sm:text-5xl lg:text-5xl">
            Everything I&apos;ve built.
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)]">
            Open-source tools, client sites, and personal experiments — each one pushed to GitHub and most with a live preview.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
