import { site } from '../config'
import { ScrollReveal } from './ScrollReveal'
import { Background } from './Background'

export function AboutSection() {
  return (
    <section className="relative px-6 py-24 sm:py-32" id="about">
      <Background variant="contours" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-subtle)] uppercase">
            about
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
            {site.about.intro}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text-muted)]">
            {site.about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}