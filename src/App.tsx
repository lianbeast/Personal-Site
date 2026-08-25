import { useEffect, useState, type ReactNode } from 'react'
import type { Article } from './lib/news'
import type { Weather } from './lib/weather'
import { Scene } from './components/Scene'
import { FocusModal } from './components/FocusModal'
import { AboutSection, Footer, ProjectsSection } from './components/Sections'

interface FocusState {
  title: string
  icon: string
  body: ReactNode
}

function WeatherDetail({ w }: { w: Weather }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-display text-6xl font-black text-white holo-glow">{w.temperature}°</div>
          <p className="mt-1 text-sm text-cyan-200/80">
            {w.description} · {w.city}
          </p>
        </div>
        <div className="text-7xl">{w.icon}</div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        {[
          ['💧 Humidity', `${w.humidity}%`],
          ['🌬 Wind', `${w.wind} mph`],
          ['🌡 Code', String(w.code)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3">
            <p className="text-[10px] tracking-wider text-cyan-400/80 uppercase">{label}</p>
            <p className="mt-1 font-display text-lg font-bold text-cyan-100">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function NewsDetail({ articles }: { articles: Article[] }) {
  return (
    <ul className="space-y-3">
      {articles.map((a, i) => (
        <li key={i}>
          <a
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl border border-transparent p-3 transition hover:border-cyan-400/30 hover:bg-cyan-400/5"
          >
            <span className="text-sm leading-snug text-slate-200 group-hover:text-cyan-100">{a.title}</span>
            <span className="mt-1 block text-[10px] tracking-wider text-cyan-500/80 uppercase">
              {a.source} · open ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const [focus, setFocus] = useState<FocusState | null>(null)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const openWeather = (w: Weather) =>
    setFocus({ title: 'Weather', icon: '🌤️', body: <WeatherDetail w={w} /> })

  const openNews = (kind: 'tech' | 'world', articles: Article[]) =>
    setFocus({
      title: kind === 'tech' ? 'Tech News' : 'World News',
      icon: kind === 'tech' ? '⚡' : '📰',
      body: <NewsDetail articles={articles} />,
    })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* ── 3D hero ─────────────────────────────────── */}
      <div className="relative h-[100dvh]">
        <Scene onFocusWeather={openWeather} onFocusNews={openNews} />

        {/* HUD header */}
        <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-5">
          <div>
            <p className="font-display text-[10px] font-bold tracking-[0.35em] text-cyan-400">
              MISSION CONTROL
            </p>
            <p className="mt-1 flex items-center gap-2 text-[11px] text-cyan-200/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
              systems online · {now.toLocaleTimeString()}
            </p>
          </div>
          <div className="text-right text-[10px] leading-relaxed tracking-[0.2em] text-cyan-200/50 uppercase">
            <p>live from orbit</p>
            <p>{now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
        </header>

        {/* HUD hint */}
        <p className="pointer-events-none absolute inset-x-0 bottom-5 z-20 text-center text-[10px] tracking-[0.25em] text-cyan-200/50 uppercase">
          ◉ drag to rotate · click a card to zoom
        </p>

        <FocusModal
          open={focus !== null}
          title={focus?.title ?? ''}
          icon={focus?.icon ?? ''}
          onClose={() => setFocus(null)}
        >
          {focus?.body}
        </FocusModal>
      </div>

      {/* ── content sections ────────────────────────── */}
      <AboutSection />
      <ProjectsSection />
      <Footer />
    </div>
  )
}
