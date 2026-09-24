import { site } from '../config'
import { useInView } from '../hooks/useInView'
import { motion, useReducedMotion } from 'motion/react'

/* ══ Scroll narrative — spec: opendesign/handoffs/scroll-narrative-landing/README.md
   5 sticky 100dvh scenes, each = background (CSS) + art layer (SVG/CSS) + content. */

/* ── Scene shell: 100dvh sticky scene, bg + art fade in at 50% visibility ── */
function Scene({
  id,
  bg,
  art,
  artClass,
  children,
  active = false,
}: {
  id: string
  bg: string
  art?: React.ReactNode
  artClass?: string
  children: React.ReactNode
  active?: boolean
}) {
  const { ref, visible } = useInView(0.5)
  const on = active || visible
  return (
    <section id={id} ref={ref} className="relative flex h-[100dvh] items-center justify-center overflow-hidden px-6 py-24">
      <div className={`scene-bg ${bg} ${on ? 'active' : ''}`} aria-hidden="true" />
      {(art || artClass) && (
        <div className={`art ${artClass ?? ''} ${on ? 'active' : ''}`} aria-hidden="true">{art}</div>
      )}
      <div className="scene-content relative z-[2] mx-auto w-full max-w-4xl text-center">
        {children}
      </div>
    </section>
  )
}

/* ── Kinetic reveal: spring + blur, alternating side, staggered delay ── */
function KineticReveal({ children, side = 'l', delay = 0 }: {
  children: React.ReactNode
  side?: 'l' | 'r'
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: side === 'l' ? -40 : 40, filter: 'blur(10px)' }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ children }: { children: string }) {
  return (
    <KineticReveal>
      <p className="m-0 mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-subtle)]">
        {children}
      </p>
    </KineticReveal>
  )
}

/* ══ Art layers — signature motif per scene, gold-family strokes ══ */

/* Hero: wireframe planet horizon — graticule crescent + satellite orbits */
function HeroArt() {
  return (
    <svg className="art-hero-svg" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
      <g className="meridian">
        <circle cx="500" cy="500" r="480" />
        <circle cx="500" cy="500" r="380" />
        <circle cx="500" cy="500" r="260" />
        <ellipse cx="500" cy="500" rx="480" ry="160" />
        <ellipse cx="500" cy="500" rx="480" ry="280" />
        <ellipse cx="500" cy="500" rx="480" ry="400" />
      </g>
      <circle className="horizon" cx="500" cy="500" r="480" />
      <path className="orbit-arc" d="M 60 660 A 480 480 0 0 1 940 660" transform="rotate(-18 500 500)" />
      <path className="orbit-arc" d="M 120 560 A 400 400 0 0 1 880 560" transform="rotate(10 500 500)" />
      <circle className="node" cx="212" cy="700" r="3" />
      <circle className="node" cx="830" cy="640" r="2.5" />
      <circle className="node" cx="500" cy="640" r="2" />
    </svg>
  )
}

/* About: concentric transmission rings pulsing from a beacon — CSS only,
   no markup; the gradients live on .art-about in index.css. */

/* Capabilities: circuit traces — orthogonal stepped runs with via dots */
function CapsArt() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
      <g className="trace">
        <path d="M 0 140 H 220 V 240 H 420" />
        <path d="M 1000 90 H 700 V 210 H 520" />
        <path d="M 0 560 H 160 V 470 H 360" />
        <path d="M 1000 610 H 760 V 500 H 600" />
      </g>
      <g className="trace dash">
        <path d="M 300 700 V 560 H 480" />
        <path d="M 640 0 V 120 H 800" />
      </g>
      <g className="via">
        <circle cx="220" cy="140" r="3" /><circle cx="220" cy="240" r="3" /><circle cx="420" cy="240" r="3" />
        <circle cx="700" cy="90" r="3" /><circle cx="700" cy="210" r="3" /><circle cx="520" cy="210" r="3" />
        <circle cx="160" cy="560" r="3" /><circle cx="160" cy="470" r="3" /><circle cx="360" cy="470" r="3" />
        <circle cx="760" cy="610" r="3" /><circle cx="760" cy="500" r="3" /><circle cx="600" cy="500" r="3" />
        <circle cx="300" cy="560" r="3" /><circle cx="480" cy="560" r="3" />
        <circle cx="640" cy="120" r="3" /><circle cx="800" cy="120" r="3" />
      </g>
    </svg>
  )
}

/* Projects: constellation — gold nodes joined by thin sight-lines */
function ProjArt() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
      <g className="line">
        <path d="M 120 120 L 300 210 L 520 140 L 760 240" />
        <path d="M 80 420 L 260 330 L 520 140" />
        <path d="M 300 210 L 380 480 L 640 560" />
        <path d="M 760 240 L 900 400 L 640 560" />
        <path d="M 380 480 L 200 620" />
        <path d="M 900 400 L 820 640 L 640 560" />
      </g>
      <g className="star">
        <circle cx="120" cy="120" r="3.5" /><circle cx="80" cy="420" r="3.5" />
        <circle cx="380" cy="480" r="4" /><circle cx="200" cy="620" r="3" />
        <circle cx="820" cy="640" r="3.5" /><circle cx="900" cy="400" r="4" />
        <circle cx="640" cy="560" r="3" />
      </g>
      <g className="star bright">
        <circle cx="300" cy="210" r="5" /><circle cx="520" cy="140" r="5.5" />
        <circle cx="760" cy="240" r="5" /><circle cx="260" cy="330" r="4.5" />
      </g>
    </svg>
  )
}

/* Contact: landing pad — descent guide, crosshair, double-circle target */
function ContactArt() {
  return (
    <svg viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice">
      <line className="guide" x1="500" y1="0" x2="500" y2="280" />
      <g className="cross">
        <line x1="430" y1="350" x2="570" y2="350" />
        <line x1="500" y1="280" x2="500" y2="420" />
      </g>
      <circle className="pad" cx="500" cy="350" r="46" />
      <circle className="pad" cx="500" cy="350" r="72" opacity=".5" />
      <g className="guide">
        <line x1="60" y1="60" x2="140" y2="60" /><line x1="60" y1="60" x2="60" y2="140" />
        <line x1="940" y1="60" x2="860" y2="60" /><line x1="940" y1="60" x2="940" y2="140" />
        <line x1="60" y1="640" x2="140" y2="640" /><line x1="60" y1="640" x2="60" y2="560" />
        <line x1="940" y1="640" x2="860" y2="640" /><line x1="940" y1="640" x2="940" y2="560" />
      </g>
    </svg>
  )
}

/* ══ The five scenes ══ */

export function HeroScene() {
  return (
    <Scene id="s-hero" bg="bg-space-tech" art={<HeroArt />} active>
      <div className="relative z-20 flex flex-col items-center">
        <KineticReveal>
          <span className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-5 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] pulse-dot" />
            open for commissions
          </span>
        </KineticReveal>
        <KineticReveal delay={0.1}>
          <h1 className="m-0 font-display text-4xl font-medium leading-[1.2] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {site.hero.headline}
          </h1>
        </KineticReveal>
        <KineticReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
            {site.hero.sub}
          </p>
        </KineticReveal>
        <KineticReveal delay={0.3}>
          <div className="mt-10">
            <a
              href={site.hero.cta.href}
              className="btn-tactile btn-magnetic inline-block rounded-md bg-[var(--color-accent)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-inverse)] no-underline transition-all duration-300 hover:bg-[var(--color-accent-hover)] hover:shadow-glow"
            >
              {site.hero.cta.label}
            </a>
          </div>
        </KineticReveal>
      </div>
    </Scene>
  )
}

export function AboutScene() {
  return (
    <Scene id="s-about" bg="bg-nebula" artClass="art-about">
      <div className="relative z-20 flex flex-col items-center">
        <Eyebrow>01 · about</Eyebrow>
        <KineticReveal delay={0.1}>
          <h2 className="m-0 font-display text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {site.about.intro}
          </h2>
        </KineticReveal>
        <KineticReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)]">
            {site.about.body.join(' ')}
          </p>
        </KineticReveal>
      </div>
    </Scene>
  )
}

export function CapabilitiesScene() {
  return (
    <Scene id="s-capabilities" bg="bg-blueprint" art={<CapsArt />}>
      <div className="relative z-20 flex flex-col items-center">
        <Eyebrow>02 · what i do</Eyebrow>
        <KineticReveal delay={0.1}>
          <h2 className="m-0 font-display text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Capabilities
          </h2>
        </KineticReveal>
        <div className="mt-16 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-3">
          {site.features.map((f, i) => {
            const images = [
              'https://images.unsplash.com/photo-1550745165-9bc1495deeae?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1518770660439-463645ebecf4?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1504384308090-c894fdbe537e?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1460925895917-afbe65ae8364?q=80&w=800&auto=format&fit=crop',
            ]
            return (
              <KineticReveal key={f.title} side={i % 2 === 0 ? 'l' : 'r'} delay={0.15 + i * 0.1}>
                <div className="group relative">
                  {/* Outer shell (double-bezel) */}
                  <div className="card-shell rounded-[2rem] border border-white/10 bg-white/5 p-2 transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/10">
                    {/* Inner core */}
                    <div className="glass-refract relative overflow-hidden rounded-[calc(2rem-0.5rem)] bg-[var(--color-bg-card)] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:-translate-y-1">
                      <div className="absolute inset-0 z-0 opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:opacity-30">
                        <img src={images[i % images.length]} alt="" className="h-full w-full object-cover grayscale" />
                      </div>
                      <div className="relative z-10">
                        <span className="font-mono text-2xl font-light text-[var(--color-accent)]">{f.icon}</span>
                        <h3 className="mt-4 font-display text-sm font-medium tracking-wide text-white">{f.title}</h3>
                        <p className="m-0 mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </KineticReveal>
            )
          })}
        </div>
      </div>
    </Scene>
  )
}

export function ProjectsScene() {
  return (
    <Scene id="s-projects" bg="bg-contours" art={<ProjArt />}>
      <div className="relative z-20 flex flex-col items-center">
        <Eyebrow>03 · projects</Eyebrow>
        <KineticReveal delay={0.1}>
          <h2 className="m-0 font-display text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
            Featured work
          </h2>
        </KineticReveal>
        <div className="mt-12 w-full">
          {site.projects.map((p, i) => (
            <KineticReveal key={p.name} side={i % 2 === 1 ? 'l' : 'r'} delay={0.15 + i * 0.1}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-[var(--color-border)] py-8 text-left no-underline transition-all duration-500 hover:bg-white/[0.02]"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-zinc-800 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2">
                  <img
                    src={`https://picsum.photos/seed/project-${i}/160/160`}
                    alt={p.name}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                </div>
                <span className="relative z-10">
                  <span className="m-0 font-display text-xl font-medium text-white transition-colors duration-300 group-hover:text-[var(--color-accent)]">{p.name}</span>
                  <span className="m-0 mt-1 block text-[14px] leading-relaxed text-[var(--color-text-muted)] transition-colors duration-300 group-hover:text-white/80">
                    {p.description}
                  </span>
                </span>
                <span className="text-xl text-[var(--color-accent)] opacity-40 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 group-focus-within:translate-x-2 group-focus-within:opacity-100">
                  →
                </span>
              </a>
            </KineticReveal>
          ))}
        </div>
      </div>
    </Scene>
  )
}

export function ContactScene() {
  return (
    <Scene id="s-contact" bg="bg-stars" art={<ContactArt />}>
      <div className="relative z-20 flex flex-col items-center">
        <Eyebrow>04 · contact</Eyebrow>
        <KineticReveal delay={0.1}>
          <h2 className="m-0 font-display text-3xl font-medium leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {site.contact.headline}
          </h2>
        </KineticReveal>
        <KineticReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)]">
            {site.contact.sub}
          </p>
        </KineticReveal>
        <KineticReveal delay={0.3}>
          <div className="mt-16">
            <a
              href={site.links.email}
              className="btn-tactile btn-magnetic group relative inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-medium tracking-wide text-[var(--color-inverse)] no-underline transition-all duration-500 hover:bg-[var(--color-accent-hover)] hover:shadow-glow"
            >
              <span className="relative z-10">Send me an email</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-all duration-500 group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <span className="text-xs">↗</span>
              </span>
            </a>
          </div>
        </KineticReveal>
      </div>
    </Scene>
  )
}
