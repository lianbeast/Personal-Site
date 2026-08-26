import { site } from '../config'
import { getRepos, type Repo } from '../lib/github'
import { useAsync } from '../hooks/useAsync'
import { FadeIn } from './FadeIn'

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
      className="card-hover group block rounded-xl border var(--color-border) bg-[var(--color-bg-card)] p-5 transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card-hover)]"
    >
      <h3 className="font-display text-sm font-semibold tracking-wide text-white transition group-hover:text-[var(--color-accent)]">
        {repo.name} <span className="text-slate-500">↗</span>
      </h3>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
        {repo.description || 'No description yet.'}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {repo.language}
          </span>
        )}
        {repo.stars > 0 && <span>⭐ {repo.stars}</span>}
        <span className="ml-auto">{timeAgo(repo.updated)}</span>
      </div>
    </a>
  )
}

export function ProjectsSection() {
  const { state } = useAsync(() => getRepos(site.githubUser), [site.githubUser])
  const repos = state.status === 'ok' ? state.data : null
  const fallback = state.status === 'error' ? site.projects : null

  return (
    <section className="relative border-t var(--color-border) px-6 py-24 sm:py-32" id="projects">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                projects
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Open Source
              </h2>
              {repos && (
                <p className="mt-1 text-[11px] text-slate-500">
                  live from github.com/{site.githubUser}
                </p>
              )}
            </div>
          </div>
        </FadeIn>

        {state.status === 'loading' && (
          <FadeIn>
            <p className="mt-8 flex items-center gap-2 text-sm text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-warning)] pulse-dot" />
              syncing repos&hellip;
            </p>
          </FadeIn>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {repos?.map((r, i) => (
            <FadeIn key={r.name} delay={(i % 2 === 0 ? 1 : 2) as 1 | 2}>
              <RepoCard repo={r} />
            </FadeIn>
          ))}
          {fallback?.map((p, i) => (
            <FadeIn key={p.name} delay={(i % 2 === 0 ? 1 : 2) as 1 | 2}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group block rounded-xl border var(--color-border) bg-[var(--color-bg-card)] p-5 transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card-hover)]"
              >
                <h3 className="font-display text-sm font-semibold tracking-wide text-white transition group-hover:text-[var(--color-accent)]">
                  {p.name} <span className="text-slate-500">↗</span>
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{p.description}</p>
              </a>
            </FadeIn>
          ))}
        </div>

        {state.status === 'error' && (
          <FadeIn>
            <p className="mt-4 text-xs text-slate-500">
              GitHub unreachable &mdash; showing cached projects.
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  )
}