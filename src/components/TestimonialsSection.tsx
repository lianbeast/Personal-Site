import { site } from '../config'
import { FadeIn } from './FadeIn'

export function TestimonialsSection() {
  return (
    <section className="relative border-t var(--color-border) px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
            social proof
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            What people say
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {site.testimonials.map((t, i) => (
            <FadeIn key={i} delay={(i === 0 ? 1 : i === 1 ? 2 : 3) as 1 | 2 | 3}>
              <blockquote className="card-hover quote-mark rounded-xl border var(--color-border) bg-[var(--color-bg-card)] p-6">
                <p className="text-sm leading-relaxed text-slate-300">
                  {t.quote}
                </p>
                <footer className="mt-4 border-t var(--color-border) pt-4">
                  <p className="text-sm font-medium text-white">{t.author}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}