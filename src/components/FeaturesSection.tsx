import { site } from '../config'
import { ScrollReveal } from './ScrollReveal'
import { Background } from './Background'

export function FeaturesSection() {
  return (
    <section className="relative border-t border-[var(--color-border)] px-6 py-24 sm:py-32">
      <Background variant="blueprint" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <ScrollReveal stagger={0.1} className="text-center">
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-subtle)] uppercase">
            what i do
          </p>
          <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
            Capabilities
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-card-hover)] hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]"
            >
              <div className="text-3xl font-light">{f.icon}</div>
              <h3 className="mt-4 font-display text-sm font-medium tracking-wider text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {f.desc}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}