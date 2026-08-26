import { site } from '../config'
import { FadeIn } from './FadeIn'

export function FeaturesSection() {
  return (
    <section className="relative border-t border-white/[0.06] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="font-mono text-xs tracking-widest text-sky-400/80 uppercase">
            // what i do
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Capabilities
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.features.map((f, i) => (
            <FadeIn key={f.title} delay={(i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 3) as 1 | 2 | 3}>
              <div className="card-hover group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]">
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-4 font-display text-sm font-semibold tracking-wide text-white">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
