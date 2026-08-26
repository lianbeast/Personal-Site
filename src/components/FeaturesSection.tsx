import { site } from '../config'
import { FadeIn } from './FadeIn'

export function FeaturesSection() {
  return (
    <section className="relative border-t var(--color-border) px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
            what i do
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Capabilities
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.features.map((f, i) => (
            <FadeIn key={f.title} delay={(i % 3 === 0 ? 1 : i % 3 === 1 ? 2 : 3) as 1 | 2 | 3}>
              <div className="card-hover group rounded-xl border var(--color-border) bg-[var(--color-bg-card)] p-6 transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card-hover)]">
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