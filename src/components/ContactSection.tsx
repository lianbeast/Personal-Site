import { site } from '../config'
import { FadeIn } from './FadeIn'

export function ContactSection() {
  return (
    <section className="relative border-t var(--color-border) px-6 py-24 sm:py-32" id="contact">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
            contact
          </p>
        </FadeIn>

        <FadeIn delay={1}>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Let&apos;s build something together.
          </h2>
        </FadeIn>

        <FadeIn delay={2}>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            Got an idea, a project, or just want to say hi? I&apos;m always open to new conversations and collaborations.
          </p>
        </FadeIn>

        <FadeIn delay={3}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href={site.links.email}
              className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-glow)] w-full sm:w-auto"
            >
              Send me an email
            </a>
            <p className="text-xs text-slate-500">
              or find me on{' '}
              <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">GitHub</a>{' '}
              &middot;{' '}
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">LinkedIn</a>{' '}
              &middot;{' '}
              <a href={site.links.x} target="_blank" rel="noopener noreferrer" className="font-mono text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">X</a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}