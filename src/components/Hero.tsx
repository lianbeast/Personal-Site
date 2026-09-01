import { site } from '../config'
import { Background } from './Background'

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      <Background variant="spaceTech" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0A0A0A_75%)]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-2 text-[10px] tracking-[0.3em] text-[var(--color-text-muted)] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] pulse-dot"></span>
          open for commissions
        </div>

        <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {site.hero.headline}
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg font-light">
          {site.hero.sub}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href={site.hero.cta.href}
            className="group relative overflow-hidden rounded-md bg-[var(--color-accent)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-300 hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]"
          >
            <span className="relative z-10">{site.hero.cta.label}</span>
          </a>
          <a
            href={site.hero.ctaSecondary.href}
            className="rounded-md border border-[var(--color-border)] bg-transparent px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-text)] transition-all duration-300 hover:border-[var(--color-border-hover)] hover:text-white"
          >
            {site.hero.ctaSecondary.label}
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {[
            { href: site.links.github, label: 'GitHub' },
            { href: site.links.linkedin, label: 'LinkedIn' },
            { href: site.links.x, label: 'X' },
            { href: site.links.email, label: 'Email' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.25em] text-[var(--color-text-subtle)] uppercase transition-colors duration-300 hover:text-[var(--color-accent)]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 tracking-[0.3em] text-[var(--color-text-subtle)] text-[10px] uppercase">
        <span>scroll</span>
        <div className="h-12 w-px bg-gradient-to-b from-[var(--color-accent)] to-transparent"></div>
      </div>
    </section>
  )
}