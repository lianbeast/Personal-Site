export interface Article {
  title: string
  url: string
  source: string
}

interface HNItem {
  id: number
  title?: string
  url?: string
}

/** Hacker News top stories — CORS-enabled Firebase API, no proxy needed. */
export async function getHN(): Promise<Article[]> {
  const ids: number[] = await (await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')).json()
  const items: HNItem[] = await Promise.all(
    ids.slice(0, 8).map((id) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((r) => r.json()),
    ),
  )
  return items
    .filter((i) => i?.title)
    .map((i) => ({
      title: i.title!,
      url: i.url || `https://news.ycombinator.com/item?id=${i.id}`,
      source: 'Hacker News',
    }))
}

/** Fetch an RSS feed with a CORS-safe path: rss2json (native CORS) → allorigins passthrough. */
export async function getRSS(feedUrl: string, source: string): Promise<Article[]> {
  // rss2json is CORS-enabled and returns JSON — no proxy needed.
  const r2j = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`)
  if (r2j.ok) {
    const data = await r2j.json()
    const items = data?.items
    if (Array.isArray(items) && items.length > 0) {
      return items
        .filter((it) => it?.title)
        .slice(0, 8)
        .map((it) => ({ title: it.title, url: it.link || '#', source }))
    }
  }

  // Fallback: raw passthrough proxy, parse the XML ourselves.
  const raw = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`)
  const xml = await raw.text()
  const doc = new DOMParser().parseFromString(xml, 'text/xml')
  const items = Array.from(doc.querySelectorAll('item')).slice(0, 8)
  const parsed = items
    .map((el) => ({
      title: el.querySelector('title')?.textContent?.trim() ?? '',
      url: el.querySelector('link')?.textContent?.trim() ?? '#',
      source,
    }))
    .filter((a) => a.title.length > 0)
  if (parsed.length === 0) throw new Error('empty feed')
  return parsed
}
