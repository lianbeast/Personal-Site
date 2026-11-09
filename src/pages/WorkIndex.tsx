import { site } from '../config'
import { Footer } from '../components/Footer'
import { ProjectsSection } from '../components/ProjectsSection'

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
          <h1 className="mt-4 m-0 font-display text-4xl font-medium leading-[1.2] tracking-tight text-[var(--color-accent)] sm:text-5xl lg:text-5xl">
            Everything I&apos;ve built.
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)]">
            Open-source tools, client sites, and personal experiments — each one pushed to GitHub and most with a live preview.
          </p>
        </div>
      </section>

      {/* Live GitHub feed */}
      <ProjectsSection />

      <Footer />
    </div>
  )
}
