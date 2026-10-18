import { useState } from 'react'
import { site, type Project } from '../config'
import { getRepos, type Repo } from '../lib/github'
import { useAsync } from '../hooks/useAsync'
import { ScrollReveal } from './ScrollReveal'
import { Eyebrow } from './Eyebrow'
import { Background } from './Background'

/* Language dots used to be GitHub's per-language hues (blue for TypeScript,
   yellow for JS, and so on). The palette is strictly neutral now, so every dot
   is the same muted grey — the language name sits beside it, so the legend
   still reads, the card just stops being a colour swatch chart. */

function timeAgo(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 3600) return `${Math.max(1, Math.round(s / 60))}m ago`
  if (s < 86400) return `${Math.round(s / 3600)}h ago`
  if (s < 86400 * 30) return `${Math.round(s / 86400)}d ago`
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

type CardRepo = Repo & { live?: string }

/* Inline monochrome icons (Tabler-style strokes / GitHub mark). */

function GitHubMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  )
}

function ExternalIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  )
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

/* GitHub-repo-style card, adapted from the uiverse "fluffy-eel-29" card into
   the site's strict-monochrome system. Kept: the rounded shell with a header
   (owner / repo + GitHub mark + an external-link action), a tab bar, and a
   scrollable list of rows. Dropped: the original orange/blue accents and the
   animated blur() backdrop — recoloured to the white/grey tokens, and the
   blur layer is omitted so it can't reintroduce the scroll-time blur from
   Phase D. */
function RepoCard({ repo }: { repo: CardRepo }) {
  const [tab, setTab] = useState<'about' | 'details'>('about')
  const tabs = ['about', 'details'] as const
  return (
    <article className="group relative overflow-hidden rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card-hover)] hover:shadow-[0_0_30px_var(--color-accent-glow)]">
      {/* header — mirrors the uiverse top-header + btm-header */}
      <div className="flex flex-col gap-2 border-b border-white/10 bg-[var(--color-bg-elevated)]">
        <div className="flex items-center gap-2 px-3 pt-3">
          <GitHubMark className="h-5 w-5 shrink-0 text-white/90" />
          <span className="text-[13px] font-light text-white/55">{site.githubUser}</span>
          <span className="text-[10px] text-white/35">/</span>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-[13px] font-normal text-white transition-colors hover:text-white hover:underline"
          >
            {repo.name}
          </a>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open repository"
            className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-white/55 outline outline-1 outline-white/15 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <ExternalIcon className="h-4 w-4" />
          </a>
        </div>
        {/* tab bar — active underline recoloured from #e98463 to white */}
        <div className="flex items-center gap-1 px-2.5 text-[13px] text-white">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`relative flex items-center gap-1 px-1 pb-3 pt-1 transition-colors ${
                tab === t
                  ? 'text-white after:absolute after:inset-x-1 after:-bottom-px after:h-0.5 after:bg-white'
                  : 'text-white/45 hover:text-white/80'
              }`}
            >
              {t === 'about' ? 'About' : 'Details'}
            </button>
          ))}
        </div>
      </div>

      {/* content — About shows the description; Details shows a list of rows,
          echoing the uiverse .pr list (green icon -> neutral check) */}
      <div className="p-3">
        {tab === 'about' ? (
          <p className="text-xs leading-relaxed text-[var(--color-text-muted)] line-clamp-4">
            {repo.description || 'No description yet.'}
          </p>
        ) : (
          <div className="flex flex-col gap-px overflow-hidden rounded-md border border-white/10">
            {repo.language && <MetaRow label="Language" value={repo.language} />}
            {repo.stars > 0 && <MetaRow label="Stars" value={`★ ${repo.stars}`} />}
            {repo.updated && <MetaRow label="Updated" value={timeAgo(repo.updated)} />}
            {repo.live && (
              <a
                href={repo.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/[0.02] px-2 py-2 text-xs text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot" />
                <span className="font-medium">Live site</span>
                <span className="ml-auto text-white/40">↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-white/[0.02] px-2 py-2 text-xs">
      <CheckIcon className="h-3.5 w-3.5 shrink-0 text-white/30" />
      <span className="text-white/45">{label}</span>
      <span className="ml-auto text-white/80">{value}</span>
    </div>
  )
}

export function ProjectsSection() {
  const { state } = useAsync(() => getRepos(site.githubUser), [site.githubUser])

  // Curated entries from config.ts fill missing GitHub descriptions and attach
  // live-site URLs by repo name.
  const curated = new Map<string, Project>(site.projects.map((p) => [p.name, p]))
  const repos: CardRepo[] | null =
    state.status === 'ok'
      ? [
          ...state.data.map((r) => {
            const c = curated.get(r.name)
            return { ...r, description: r.description ?? c?.description ?? null, live: c?.live }
          }),
          // Curated projects with no public repo — a private repo can never come
          // back from the API, so without this they render only when the feed
          // errors out. Appended so they follow the live feed, not displace it.
          ...site.projects
            .filter((p) => !state.data.some((r) => r.name === p.name))
            .map((p) => ({
              name: p.name,
              description: p.description,
              url: p.url,
              language: null,
              stars: 0,
              updated: '',
              live: p.live,
            })),
        ]
      : null
  const fallback: CardRepo[] | null =
    state.status === 'error'
      ? site.projects.map((p) => ({
          name: p.name,
          description: p.description,
          url: p.url,
          language: null,
          stars: 0,
          updated: '',
          live: p.live,
        }))
      : null

  return (
    <section className="relative border-t border-[var(--color-border)] px-6 py-24 sm:py-32" id="projects">
      <Background variant="contours" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <ScrollReveal>
          <Eyebrow>projects</Eyebrow>
          <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Open Source
          </h2>
          {repos && (
            <p className="mt-1 text-[11px] text-[var(--color-text-subtle)]">
              live from github.com/{site.githubUser}
            </p>
          )}
        </ScrollReveal>

        {state.status === 'loading' && (
          <ScrollReveal>
            <p className="mt-8 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-warning)] pulse-dot" />
              syncing repos&hellip;
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal stagger={0.08} className="mt-8 grid gap-4 sm:grid-cols-2">
          {(repos ?? fallback)?.map((r) => (
            <RepoCard key={r.name} repo={r} />
          ))}
        </ScrollReveal>

        {state.status === 'error' && (
          <ScrollReveal>
            <p className="mt-4 text-xs text-[var(--color-text-subtle)]">
              GitHub unreachable &mdash; showing cached projects.
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}