import { site } from '../config'
import { ScrollReveal } from './ScrollReveal'
import { Background } from './Background'

export function ContactSection() {
  return (
    <section className="relative border-t border-[var(--color-border)] px-6 py-24 sm:py-32" id="contact">
      <Background variant="noise" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <ScrollReveal>
          <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-subtle)] uppercase">
            contact
          </p>
          <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Let&apos;s build something together.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
            Got an idea, a project, or just want to say hi? I&apos;m always open to new conversations and collaborations.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={site.links.email}
              className="rounded-md bg-[var(--color-accent)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] transition-all duration-300 hover:bg-[var(--color-accent-hover)] hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] w-full sm:w-auto"
            >
              Send me an email
            </a>
            <p className="text-xs text-[var(--color-text-subtle)]">
              or find me on{' '}
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">GitHub</a>{' '}
              &middot;{' '}
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">LinkedIn</a>{' '}
              &middot;{' '}
              <a href={site.links.x} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors">X</a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}