import { site } from '../config'
import { FadeIn } from './FadeIn'

export function AboutSection() {
  return (
    <section className="relative px-6 py-24 sm:py-32" id="about">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
            about
          </p>
        </FadeIn>

        <FadeIn delay={1}>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {site.about.intro}
          </h2>
        </FadeIn>

        <FadeIn delay={2}>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-400">
            {site.about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}