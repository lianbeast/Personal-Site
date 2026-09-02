import { site } from '../config'
import { ScrollReveal } from './ScrollReveal'
import { Background } from './Background'
import { Eyebrow } from './Eyebrow'
import { Card } from './Card'

export function FeaturesSection() {
  return (
    <section className="relative border-t border-[var(--color-border)] px-6 py-20 sm:py-28">
      <Background variant="blueprint" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <ScrollReveal stagger={0.1} className="text-center">
          <Eyebrow>what i do</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
            Capabilities
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger={0.08} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.features.map((f) => (
            <Card key={f.title} featured>
              <div className="text-3xl font-light">{f.icon}</div>
              <h3 className="mt-4 font-display text-sm font-medium tracking-wider text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {f.desc}
              </p>
            </Card>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}