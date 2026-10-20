import { site } from '../config'
import { useInView } from '../hooks/useInView'
import { motion, useReducedMotion } from 'motion/react'
import { ProjectPreview } from './ProjectPreview'
import { Eyebrow } from './Eyebrow'

/* ══ Scroll narrative — spec: opendesign/handoffs/scroll-narrative-landing/README.md
   5 sticky 100dvh scenes, each = background (CSS) + art layer (SVG/CSS) + content. */

/* Scene heading and lead, shared by scenes 2–5. One definition each so the
   type scale is edited in one place rather than four. */
const H2 = 'm-0 font-display text-3xl font-medium leading-[1.2] tracking-tight text-[var(--color-accent)] sm:text-4xl lg:text-5xl'
const LEAD = 'mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)]'

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
    // Below lg: min-h + auto height, so a scene taller than the viewport (the
    // projects grid overflows 100dvh at every width under 1024 — 1570px at
    // 390px wide, 1099px at 768) grows the page instead of scrolling inside a
    // 100dvh box. Flex centering a too-tall column inside a fixed box also
    // overflowed it ABOVE the scene — the "Featured work" heading landed
    // inside the capabilities scene. lg+ keeps the fixed 100dvh stage the
    // scroll narrative is built on, where all five scenes fit.
    <section id={id} ref={ref} className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-y-auto overflow-x-hidden px-6 py-24 pb-[calc(6rem+2.75rem)] lg:h-[100dvh] lg:pb-24">
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

/* ── Kinetic reveal: spring + slide, alternating side, staggered delay ──
   Transform and opacity only. An earlier version also animated
   `filter: blur(10px) → blur(0px)`, and filter is the most expensive property
   to animate: every frame of the spring re-rasterised the whole card layer —
   screenshots included — and on many GPUs the layer stays at reduced
   resolution for as long as any filter is live on it. Scrolled at a normal
   pace, the projects grid (whose six cards reveal around the HUD's ~130km
   mark) sat in that state for the full ~1s of springs plus their 0.12–0.42s
   delays: cards visibly blurred and their preview images warped. Opacity +
   slide + a 2% scale gives the same materialise beat for free. */
function KineticReveal({ children, side = 'l', delay = 0, className = '' }: {
  children: React.ReactNode
  side?: 'l' | 'r'
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: side === 'l' ? -40 : 40, scale: 0.98 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
    >
      {children}
    </motion.div>
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
          <h1 className="m-0 text-balance font-display text-4xl font-medium leading-[1.2] tracking-tight text-[var(--color-accent)] sm:text-5xl md:text-6xl lg:text-7xl">
            {site.hero.headline}
          </h1>        </KineticReveal>
        <KineticReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
            {site.hero.sub}
          </p>
        </KineticReveal>
        <KineticReveal delay={0.3}>
          <div className="mt-10">
            <a
              href={site.hero.cta.href}
              className="btn-tactile btn-magnetic inline-block rounded-md bg-[var(--color-accent)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] no-underline transition-all duration-300 hover:bg-[var(--color-accent-hover)] hover:shadow-glow"
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
        <KineticReveal>
          <Eyebrow>01 · about</Eyebrow>
        </KineticReveal>
        <KineticReveal delay={0.1}>
          <h2 className={H2}>
            {site.about.intro}
          </h2>
        </KineticReveal>
        <KineticReveal delay={0.2}>
          <p className={LEAD}>
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
        <KineticReveal>
          <Eyebrow>02 · what i do</Eyebrow>
        </KineticReveal>
        <KineticReveal delay={0.1}>
          <h2 className={H2}>
            Capabilities
          </h2>
        </KineticReveal>
        <div className="mt-8 grid grid-cols-2 gap-3 text-left sm:mt-16 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {site.features.map((f, i) => {
            return (
              <KineticReveal key={f.title} side={i % 2 === 0 ? 'l' : 'r'} delay={0.15 + i * 0.1} className="h-full">
                <div className="group relative h-full rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-4 transition-colors duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-card-hover)] hover:shadow-[0_0_30px_rgba(255,255,255,0.06)] sm:p-6">
                  <span className="font-mono text-xl font-light text-[var(--color-accent)] sm:text-2xl">{f.icon}</span>
                  <h3 className="mt-2 font-display text-sm font-medium tracking-wide text-[var(--color-accent)] sm:mt-4">{f.title}</h3>
                  <p className="m-0 mt-1.5 text-[13px] leading-snug text-[var(--color-text-muted)] sm:mt-2 sm:text-sm sm:leading-relaxed">{f.desc}</p>
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
  // Six in the scene, the rest behind /work. Ten rows in a 100dvh sticky box
  // overflowed by 431px, so the heading sat off-screen and the list began
  // mid-row.
  const featured = site.projects.slice(0, 6)
  return (
    <Scene id="s-projects" bg="bg-contours" art={<ProjArt />}>
      <div className="relative z-20 flex flex-col items-center">
        <KineticReveal>
          <Eyebrow>03 · projects</Eyebrow>
        </KineticReveal>
        <KineticReveal delay={0.1}>
          <h2 className={H2}>
            Featured work
          </h2>
        </KineticReveal>
        <div className="mt-10 grid w-full grid-cols-1 gap-3 text-left sm:mt-12 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
          {featured.map((p, i) => (
            <KineticReveal key={p.name} side={i % 2 === 0 ? 'l' : 'r'} delay={0.12 + i * 0.06}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-3 rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-card)] p-3 text-left no-underline transition-colors duration-300 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card-hover)]"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[10px] bg-[var(--color-bg-elevated)]">
                  <ProjectPreview name={p.name} live={p.live} className="h-full w-full" />
                </div>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="flex items-start justify-between gap-2">
                    <span className="m-0 font-display text-[15px] font-medium leading-snug text-[var(--color-accent)]">
                      {p.name}
                    </span>
                    <span className="shrink-0 pt-0.5 text-sm text-[var(--color-text-subtle)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden="true">
                      →
                    </span>
                  </span>
                  <span className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-[var(--color-text-muted)]">
                    {p.description}
                  </span>
                </span>
              </a>
            </KineticReveal>
          ))}
        </div>
        {/* All-projects link sits tight: at 1440 the grid + margin pushed the
            scene 5px past its 100dvh box, making the sticky scene scrollable.
            A scene with even 1px of internal overflow turns into a scroll
            container, and wheel events over it chain instead of scrolling the
            page — a visible hitch right at the projects/capabilities boundary. */}
        <KineticReveal delay={0.5}>
          <a
            href={`${import.meta.env.BASE_URL}work`}
            className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] no-underline transition-colors duration-300 hover:text-white"
          >
            All {site.projects.length} projects
            <span aria-hidden="true">→</span>
          </a>
        </KineticReveal>
      </div>
    </Scene>
  )
}

export function ContactScene() {
  return (
    <Scene id="s-contact" bg="bg-stars" art={<ContactArt />}>
      <div className="relative z-20 flex flex-col items-center">
        <KineticReveal>
          <Eyebrow>04 · contact</Eyebrow>
        </KineticReveal>
        <KineticReveal delay={0.1}>
          <h2 className={H2}>
            {site.contact.headline}
          </h2>
        </KineticReveal>
        <KineticReveal delay={0.2}>
          <p className={LEAD}>
            {site.contact.sub}
          </p>
        </KineticReveal>
        <KineticReveal delay={0.3}>
          <div className="mt-16">
            <a
              href={site.links.email}
              className="btn-tactile btn-magnetic group relative inline-flex items-center gap-3 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-medium tracking-wide text-[var(--color-text-inverse)] no-underline transition-all duration-500 hover:bg-[var(--color-accent-hover)] hover:shadow-glow"
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
