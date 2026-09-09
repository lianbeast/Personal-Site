import { site } from '../config'
import { useInView } from '../hooks/useInView'

/* ── Scene shell: 100dvh sticky scene, bg fades in at 50% visibility ── */
function Scene({
  id,
  bg,
  children,
  active = false,
}: {
  id: string
  bg: string
  children: React.ReactNode
  active?: boolean
}) {
  const { ref, visible } = useInView(0.5)
  const on = active || visible
  return (
    <section id={id} ref={ref} className="relative flex h-[100dvh] items-center justify-center overflow-hidden px-6 py-24">
      <div className={`scene-bg ${bg} ${on ? 'active' : ''}`} aria-hidden="true" />
      <div className={`scene-content relative z-[2] mx-auto w-full max-w-4xl text-center ${on ? 'in' : ''}`}>
        {children}
      </div>
    </section>
  )
}

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="m-0 mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-subtle)]">
      {children}
    </p>
  )
}

/* ── scrub-in helper: alternates sides per index ── */
function scrub(side: 'l' | 'r') {
  return side === 'l' ? 'scrub-l' : 'scrub-r'
}

/* ══ The five scenes (art layers stripped — first-pass look) ══ */

export function HeroScene() {
  return (
    <Scene id="s-hero" bg="bg-space-tech" active>
      <span className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] pulse-dot" />
        open for commissions
      </span>
      <h1 className="m-0 font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {site.hero.headline}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
        {site.hero.sub}
      </p>
    </Scene>
  )
}

export function AboutScene() {
  return (
    <Scene id="s-about" bg="bg-nebula">
      <Eyebrow>01 · about</Eyebrow>
      <h2 className="m-0 font-display text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {site.about.intro}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)]">
        {site.about.body.join(' ')}
      </p>
    </Scene>
  )
}

export function CapabilitiesScene() {
  return (
    <Scene id="s-capabilities" bg="bg-blueprint">
      <Eyebrow>02 · what i do</Eyebrow>
      <h2 className="m-0 font-display text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
        Capabilities
      </h2>
      <div className="mt-12 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-3">
        {site.features.map((f, i) => (
          <div key={f.title} className={`card-hover ${scrub(i % 2 === 0 ? 'l' : 'r')} rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5`}>
            <span className="font-mono text-2xl font-light text-[var(--color-accent)]">{f.icon}</span>
            <h3 className="mt-3 font-display text-sm font-medium tracking-wide text-white">{f.title}</h3>
            <p className="m-0 mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{f.desc}</p>
          </div>
        ))}
      </div>
    </Scene>
  )
}

export function ProjectsScene() {
  return (
    <Scene id="s-projects" bg="bg-contours">
      <Eyebrow>03 · projects</Eyebrow>
      <h2 className="m-0 font-display text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
        Featured work
      </h2>
      <div className="mt-12">
        {site.projects.map((p, i) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 border-b border-[var(--color-border)] py-5 text-left no-underline ${scrub(i % 2 === 1 ? 'l' : 'r')}`}
          >
            <span className="font-mono text-[11px] text-[var(--color-text-subtle)]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>
              <span className="m-0 font-display text-lg font-medium text-white">{p.name}</span>
              <span className="m-0 mt-1 block text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                {p.description}
              </span>
            </span>
            <span className="text-base text-[var(--color-accent)] opacity-0 transition-all duration-150 group-hover:translate-x-1 group-hover:opacity-100">
              →
            </span>
          </a>
        ))}
      </div>
    </Scene>
  )
}

export function ContactScene() {
  return (
    <Scene id="s-contact" bg="bg-stars">
      <Eyebrow>04 · contact</Eyebrow>
      <h2 className="m-0 font-display text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {site.contact.headline}
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)]">
        {site.contact.sub}
      </p>
      <div className="mt-12">
        <a
          href={site.links.email}
          className="inline-block rounded-md bg-[var(--color-accent)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] no-underline transition-all duration-300 hover:bg-[var(--color-accent-hover)] hover:shadow-glow"
        >
          Send me an email
        </a>
      </div>
    </Scene>
  )
}
