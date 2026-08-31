import { site } from '../config'
import { ScrollReveal } from './ScrollReveal'

export function TestimonialsSection() {
  return (
    <section className="relative border-t border-[var(--color-border)] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-subtle)] uppercase">
            social proof
          </p>
          <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
            What people say
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger={0.1} className="mt-12 grid gap-6 sm:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-[0_0_30px_rgba(212,175,55,0.06)]"
            >
              <p className="text-sm leading-relaxed text-[var(--color-text)]">
                {t.quote}
              </p>
              <footer className="mt-4 border-t border-[var(--color-border)] pt-4">
                <p className="text-sm font-medium text-white">{t.author}</p>
                <p className="text-xs text-[var(--color-text-subtle)]">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}