import { site } from '../config'

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6">
      {/* Subtle gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-sky-500/[0.07] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-indigo-500/[0.06] blur-[100px]" />
      </div>

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="fade-in visible mb-6 inline-flex items-center gap-2 rounded-full border var(--color-border) bg-[var(--color-bg-card)] px-4 py-1.5 text-[10px] tracking-widest text-slate-500 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] pulse-dot" />
          open to work
        </div>

        <h1 className="fade-in visible fade-in-delay-1 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {site.hero.headline}
        </h1>

        <p className="fade-in visible fade-in-delay-2 mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
          {site.hero.sub}
        </p>

        <div className="fade-in visible fade-in-delay-3 mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={site.hero.cta.href}
            className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-glow)]"
          >
            {site.hero.cta.label}
          </a>
          <a
            href={site.hero.ctaSecondary.href}
            className="rounded-lg border var(--color-border) bg-[var(--color-bg-card)] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card-hover)] hover:text-white"
          >
            {site.hero.ctaSecondary.label}
          </a>
        </div>

        {/* Social links */}
        <div className="fade-in visible fade-in-delay-3 mt-12 flex items-center justify-center gap-4">
          {[
            { href: site.links.github, label: 'GitHub' },
            { href: site.links.linkedin, label: 'LinkedIn' },
            { href: site.links.x, label: 'X' },
            { href: site.links.email, label: 'Email' },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-xs tracking-wider text-slate-500 transition hover:text-slate-300"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="float flex flex-col items-center gap-2 text-[10px] tracking-widest text-slate-600 uppercase">
          <span>scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </div>
    </section>
  )
}