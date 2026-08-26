import { site } from '../config'
import { FadeIn } from './FadeIn'

export function ContactSection() {
  return (
    <section className="relative border-t border-white/[0.06] px-6 py-24 sm:py-32" id="contact">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="font-mono text-xs tracking-widest text-sky-400/80 uppercase">
            // contact
          </p>
        </FadeIn>

        <FadeIn delay={1}>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Let's build something together.
          </h2>
        </FadeIn>

        <FadeIn delay={2}>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            Got an idea, a project, or just want to say hi? I'm always open to new conversations and collaborations.
          </p>
        </FadeIn>

        <FadeIn delay={3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={site.links.email}
              className="rounded-lg bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]"
            >
              Send me an email
            </a>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              GitHub ↗
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            >
              LinkedIn ↗
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
