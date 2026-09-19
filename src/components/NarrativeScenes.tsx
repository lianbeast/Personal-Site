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
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1486406146988-2767ca1b8fb1?q=80&w=2070&auto=format&fit=crop"
          alt="Architectural Space"
          className="h-full w-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      </div>
      <span className="relative z-10 mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] pulse-dot" />
        open for commissions
      </span>
      <h1 className="relative z-10 m-0 font-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {site.hero.headline}
      </h1>
      <p className="relative z-10 mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
        {site.hero.sub}
      </p>
      <div className="relative z-10 mt-10">
        <a
          href="#s-contact"
          className="btn-tactile inline-block rounded-md bg-[var(--color-accent)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] no-underline transition-all duration-300 hover:bg-[var(--color-accent-hover)] hover:shadow-glow"
        >
          Get in touch
        </a>
      </div>
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
      <div className="mt-16 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
        {site.features.map((f, i) => {
          const images = [
            "https://images.unsplash.com/photo-1550745165-9bc1495deeae?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1518770660439-463645ebecf4?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504384308090-c894fdbe537e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afbe65ae8364?q=80&w=800&auto=format&fit=crop",
          ];
          const img = images[i % images.length];
          return (
            <div key={f.title} className={`group relative ${scrub(i % 2 === 0 ? 'l' : 'r')}`}>
              {/* Outer Shell (Double-Bezel) */}
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-2 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                {/* Inner Core */}
                <div className="relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[var(--color-bg-card)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform duration-500 group-hover:translate-y-[-4px]">
                  <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30">
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>
                  <div className="relative z-10">
                    <span className="font-mono text-2xl font-light text-[var(--color-accent)]">{f.icon}</span>
                    <h3 className="mt-4 font-display text-sm font-medium tracking-wide text-white">{f.title}</h3>
                    <p className="m-0 mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{f.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
            className={`group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-[var(--color-border)] py-6 text-left no-underline transition-colors duration-300 hover:bg-white/[0.02] ${scrub(i % 2 === 1 ? 'l' : 'r')}`}
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-zinc-800 shadow-sm">
              <img
                src={`https://picsum.photos/seed/project-${i}/160/160`}
                alt={p.name}
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <span>
              <span className="m-0 font-display text-lg font-medium text-white">{p.name}</span>
              <span className="m-0 mt-1 block text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                {p.description}
              </span>
            </span>
            <span className="text-base text-[var(--color-accent)] opacity-60 transition-all duration-150 group-hover:translate-x-1 group-hover:opacity-100 group-focus-within:translate-x-1 group-focus-within:opacity-100">
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
      <div className="mt-16">
        <a
          href={site.links.email}
          className="group relative btn-tactile inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] no-underline transition-all duration-500 hover:bg-[var(--color-accent-hover)] hover:shadow-glow"
        >
          <span>Send me an email</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-all duration-500 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <span className="text-xs">↗</span>
          </span>
        </a>
      </div>
    </Scene>
  )
}
