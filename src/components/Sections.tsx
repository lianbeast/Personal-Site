import { site } from '../config'
import { getRepos, type Repo } from '../lib/github'
import { useAsync } from '../hooks/useAsync'

export function AboutSection() {
  return (
    <section className="relative border-t border-cyan-400/15 bg-slate-950 px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="font-display text-[10px] sm:text-[11px] font-bold tracking-[0.25em] sm:tracking-[0.35em] text-cyan-400 uppercase">
          // about
        </p>
        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4 text-[13px] sm:text-[15px] leading-relaxed text-slate-300">
          {site.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00add8',
  Rust: '#dea584',
  Swift: '#f05138',
  Kotlin: '#a97bff',
  C: '#555555',
  'C++': '#f34b7d',
  Java: '#b07219',
  Ruby: '#701516',
  Shell: '#89e051',
  Dockerfile: '#384d54',
}

function timeAgo(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m ago`
  if (s < 86400) return `${Math.round(s / 3600)}h ago`
  if (s < 86400 * 30) return `${Math.round(s / 86400)}d ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function RepoCard({ repo }: { repo: Repo }) {
  const color = LANG_COLORS[repo.language ?? ''] ?? '#67e8f9'
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="scanlines group relative rounded-2xl border border-cyan-400/25 bg-slate-950/80 p-4 sm:p-5 panel-glow transition hover:border-cyan-300/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
    >
      <h3 className="font-display text-sm font-bold tracking-wider text-cyan-200 transition group-hover:text-white">
        {repo.name} <span className="text-cyan-500">↗</span>
      </h3>
      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slate-400">
        {repo.description || 'No description yet.'}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-cyan-200/60">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && <span>⭐ {repo.stars}</span>}
        <span className="ml-auto text-cyan-200/40">updated {timeAgo(repo.updated)}</span>
      </div>
    </a>
  )
}

export function ProjectsSection() {
  const { state } = useAsync(() => getRepos(site.githubUser), [site.githubUser])
  const repos = state.status === 'ok' ? state.data : null
  const fallback = state.status === 'error' ? site.projects : null

  return (
    <section className="relative border-t border-cyan-400/15 bg-slate-950 px-4 sm:px-6 pb-16 sm:pb-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-baseline justify-between gap-2 sm:gap-4">
          <p className="font-display text-[10px] sm:text-[11px] font-bold tracking-[0.25em] sm:tracking-[0.35em] text-cyan-400 uppercase">
            // projects
          </p>
          {repos && (
            <p className="text-[9px] sm:text-[10px] tracking-wider text-cyan-200/40 uppercase">
              live from github.com/{site.githubUser}
            </p>
          )}
        </div>

        {state.status === 'loading' && (
          <p className="mt-6 flex items-center gap-2 text-[13px] text-cyan-200/60">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 pulse-dot" />
            syncing repos from GitHub…
          </p>
        )}

        <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {repos?.map((r) => (
            <RepoCard key={r.name} repo={r} />
          ))}
          {fallback?.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="scanlines group relative rounded-2xl border border-cyan-400/25 bg-slate-950/80 p-4 sm:p-5 panel-glow transition hover:border-cyan-300/60 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
            >
              <h3 className="font-display text-sm font-bold tracking-wider text-cyan-200 transition group-hover:text-white">
                {p.name} <span className="text-cyan-500">↗</span>
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-400">{p.description}</p>
            </a>
          ))}
        </div>

        {state.status === 'error' && (
          <p className="mt-4 text-[11px] text-cyan-200/40">
            GitHub unreachable — showing cached projects.
          </p>
        )}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-cyan-400/15 bg-slate-950 px-4 sm:px-6 py-6 sm:py-8 text-center">
      <p className="text-[10px] tracking-[0.3em] text-cyan-200/40 uppercase">
        {site.name} · mission control · orbiting since forever
      </p>
    </footer>
  )
}
