import { useInView } from '../hooks/useInView'
import { Footer } from '../components/Footer'
import { Background } from '../components/Background'

/* ── Featured showcase — editorial full-bleed sections ─────────────────────
   Three hero projects laid out as full-viewport chapters with parallax-like
   typography and a single neutral accent thread tying them together.
   ─────────────────────────────────────────────────────────────────────────── */

interface ProjectChapter {
  slug: string
  name: string
  tagline: string
  description: string
  url: string
  live?: string
  accent: string
  meta: string
}

const CHAPTERS: ProjectChapter[] = [
  {
    slug: 'graphify',
    name: 'graphify',
    tagline: 'Turn codebases into living maps.',
    description:
      'A knowledge graph engine that runs locally — AST parsing, semantic extraction, community detection, no vector store. Drop any folder, get a queryable graph with an honest audit trail.',
    url: 'https://github.com/lianbeast/graphify',
    live: 'https://www.graphify.com',
    accent: '#F5F5F5',
    meta: 'Python · CLI & Web',
  },
  {
    slug: 'github-repos',
    name: 'GitHub-Repos',
    tagline: 'Your entire public repo history, reimagined.',
    description:
      'A self-contained, responsive browser for all of your GitHub repositories. Search, filter by language or type, sort, and save favorites — without API limits or sign-in walls.',
    url: 'https://github.com/lianbeast/GitHub-Repos',
    accent: '#A1A1A1',
    meta: 'HTML · Vanilla JS',
  },
  {
    slug: 'spider-man',
    name: 'Spider-Man',
    tagline: 'One page. One canvas. Six acts.',
    description:
      'A scroll film built on a single sticky stage across 2200 vh. Every value is a pure function of scroll position — no React re-renders, no springs, no lerp. Scrubbing backwards resolves to exactly the frame scrubbing forwards produced.',
    url: 'https://github.com/lianbeast/Spider-Man',
    accent: '#F5F5F5',
    meta: 'JavaScript · React Three Fiber',
  },
]

function ProjectHero({ chapter, index }: { chapter: ProjectChapter; index: number }) {
  const { ref, visible } = useInView(0.3)
  const isLive = !!chapter.live

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end pb-24 px-6 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Subtle background grain */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <Background variant="stars" />
      </div>

      {/* Large decorative number */}
      <span
        className="absolute top-12 right-6 font-mono text-[120px] sm:text-[180px] font-bold leading-none select-none pointer-events-none"
        style={{
          color: 'transparent',
          WebkitTextStroke: `1px rgba(255,255,255,${visible ? 0.15 : 0})`,
          transition: 'color 0.8s ease, -webkit-text-stroke-color 0.8s ease',
        }}
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Content */}
      <div
        className="relative z-10 max-w-4xl mx-auto w-full"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          transitionDelay: `${index * 80}ms`,
        }}
      >
        {/* Eyebrow */}
        <p
          className="font-mono text-[10px] uppercase tracking-[0.35em] mb-6"
          style={{ color: chapter.accent }}
        >
          {chapter.meta}
        </p>

        {/* Title */}
        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight text-[var(--color-accent)] mb-8">
          {chapter.name}
        </h2>

        {/* Tagline */}
        <p className="font-display text-xl sm:text-2xl font-medium leading-snug text-white/90 max-w-xl mb-6">
          {chapter.tagline}
        </p>

        {/* Description */}
        <p className="text-base font-light leading-relaxed text-[var(--color-text-muted)] max-w-lg mb-10">
          {chapter.description}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={chapter.live ?? chapter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-text-inverse)] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            {isLive ? 'Visit site' : 'View source'}
            <span className="text-base" aria-hidden="true">↗</span>
          </a>
          {!isLive && (
            <a
              href={chapter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-subtle)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {isLive && (
            <a
              href={chapter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text-subtle)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Source
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 h-px w-16 sm:w-24"
        style={{
          background: `linear-gradient(to right, ${chapter.accent}, transparent)`,
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.4s',
        }}
        aria-hidden="true"
      />
    </section>
  )
}

export function ShowcasePage() {
  return (
    <div className="relative bg-bg text-text font-body antialiased">
      {/* Nav bar */}
      <div className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a
            href={import.meta.env.BASE_URL}
            className="font-display text-sm font-medium text-white transition-colors hover:text-[var(--color-accent)]"
          >
            ← Back
          </a>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-subtle)]">
            featured
          </span>
        </div>
      </div>

      {/* Chapter 1: graphify */}
      <ProjectHero chapter={CHAPTERS[0]} index={0} />

      {/* Chapter 2: GitHub-Repos */}
      <ProjectHero chapter={CHAPTERS[1]} index={1} />

      {/* Chapter 3: Spider-Man */}
      <ProjectHero chapter={CHAPTERS[2]} index={2} />

      <Footer />
    </div>
  )
}
