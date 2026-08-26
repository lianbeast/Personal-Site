import type { Article } from '../lib/news'
import { getHN, getRSS } from '../lib/news'
import { site, type FeedKind } from '../config'
import { useAsync } from '../hooks/useAsync'
import { HoloCard } from './HoloCard'

interface NewsCardProps {
  kind: FeedKind
  icon: string
  title: string
  onFocus: (articles: Article[]) => void
}

export function NewsCard({ kind, icon, title, onFocus }: NewsCardProps) {
  const feed = site.feeds[kind]
  const source = kind === 'world' ? 'BBC' : 'Hacker News'
  const fetchFn = kind === 'tech' ? getHN : () => getRSS(feed, source)
  const { state, refresh } = useAsync(fetchFn, [feed])

  return (
    <HoloCard
      icon={icon}
      title={title}
      state={state}
      onRefresh={refresh}
      onFocus={state.status === 'ok' ? () => onFocus(state.data) : undefined}
    >
      {state.status === 'ok' && (
        <div>
          <ul className="space-y-1.5">
            {state.data.slice(0, 3).map((a, i) => (
              <li key={i}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-lg border border-transparent p-2 transition hover:border-cyan-400/30 hover:bg-cyan-400/5"
                >
                  <span className="text-[12px] sm:text-[13px] leading-snug text-slate-200 group-hover:text-cyan-100 line-clamp-2">
                    {a.title}
                  </span>
                  <span className="mt-0.5 block text-[9px] sm:text-[10px] tracking-wider text-cyan-500/80 uppercase">{a.source}</span>
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onFocus(state.data)}
            className="mt-1.5 w-full rounded-lg border border-cyan-400/30 py-1 text-[10px] tracking-[0.15em] text-cyan-300 uppercase transition hover:bg-cyan-400/10"
          >
            view all ▸
          </button>
        </div>
      )}
    </HoloCard>
  )
}
