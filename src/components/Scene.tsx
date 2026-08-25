import { Canvas } from '@react-three/fiber'
import { Html, Stars } from '@react-three/drei'
import { site } from '../config'
import type { Article } from '../lib/news'
import type { Weather } from '../lib/weather'
import { Globe } from './Globe'
import { SocialOrbit } from './SocialOrbit'
import { OrbitingCard } from './OrbitingCard'
import { WeatherCard } from './WeatherCard'
import { NewsCard } from './NewsCard'
import { GithubIcon, LinkedinIcon, MailIcon, XIcon } from './icons'

interface SceneProps {
  paused: boolean
  onFocusWeather: (w: Weather) => void
  onFocusNews: (kind: 'tech' | 'world', articles: Article[]) => void
}

function Identity() {
  const chips = [
    { href: site.links.github, label: 'GitHub', Icon: GithubIcon },
    { href: site.links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { href: site.links.x, label: 'X', Icon: XIcon },
    { href: site.links.email, label: 'Email', Icon: MailIcon },
  ]
  return (
    <Html position={[0, -4.35, 0]} center zIndexRange={[30, 0]} style={{ pointerEvents: 'auto', textAlign: 'center' }}>
      <div className="flex flex-col items-center gap-2 select-none">
        <h1 className="font-display text-3xl font-black tracking-[0.2em] text-white holo-glow">{site.name}</h1>
        <p className="text-[11px] tracking-[0.3em] text-cyan-200/80 uppercase">{site.tagline}</p>
        <div className="mt-2 flex gap-3">
          {chips.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="rounded-full border border-cyan-400/30 bg-slate-950/70 p-2 text-cyan-300 transition hover:border-cyan-300 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </Html>
  )
}

export function Scene({ paused, onFocusWeather, onFocusNews }: SceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 11], fov: 50 }} dpr={[1, 1.75]} gl={{ antialias: true }}>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 18, 42]} />
      <Stars radius={60} depth={40} count={900} factor={4} fade speed={0.6} />

      <Globe />
      <SocialOrbit />
      <Identity />

      <OrbitingCard paused={paused} radius={6.4} height={2.2} speed={0.12} phase={0.6}>
        <WeatherCard onFocus={onFocusWeather} />
      </OrbitingCard>

      <OrbitingCard paused={paused} radius={6.9} height={0.3} speed={-0.1} phase={2.4}>
        <NewsCard kind="world" icon="📰" title="World News" onFocus={(a) => onFocusNews('world', a)} />
      </OrbitingCard>

      <OrbitingCard paused={paused} radius={6.1} height={-2.0} speed={0.14} phase={4.2}>
        <NewsCard kind="tech" icon="⚡" title="Tech News" onFocus={(a) => onFocusNews('tech', a)} />
      </OrbitingCard>
    </Canvas>
  )
}
