import { site } from '../config'

export function AboutSection() {
  return (
    <section className="relative border-t border-cyan-400/15 bg-slate-950 px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-display text-[11px] font-bold tracking-[0.35em] text-cyan-400 uppercase">
          // about
        </p>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-300">
          {site.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProjectsSection() {
  return (
    <section className="relative border-t border-cyan-400/15 bg-slate-950 px-6 pb-24">
      <div className="mx-auto max-w-3xl">
        <p className="font-display text-[11px] font-bold tracking-[0.35em] text-cyan-400 uppercase">
          // projects
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {site.projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="scanlines group relative rounded-2xl border border-cyan-400/25 bg-slate-950/80 p-5 panel-glow transition hover:border-cyan-300/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
            >
              <h3 className="font-display text-sm font-bold tracking-wider text-cyan-200 transition group-hover:text-white">
                {p.name} <span className="text-cyan-500">↗</span>
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{p.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-cyan-400/15 bg-slate-950 px-6 py-8 text-center">
      <p className="text-[10px] tracking-[0.3em] text-cyan-200/40 uppercase">
        {site.name} · mission control · orbiting since forever
      </p>
    </footer>
  )
}
