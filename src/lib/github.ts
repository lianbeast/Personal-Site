export interface Repo {
  name: string
  description: string | null
  url: string
  language: string | null
  stars: number
  updated: string
}

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  pushed_at: string
  fork: boolean
}

/** Public non-fork repos for a user, most recently pushed first (api.github.com is CORS-enabled).
 *  Paginates because a burst of recently-pushed forks can fill an entire page. */
export async function getRepos(user: string, limit = 12): Promise<Repo[]> {
  const repos: Repo[] = []
  for (let page = 1; page <= 3; page++) {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=100&page=${page}`,
    )
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const data: GitHubRepo[] = await res.json()
    repos.push(
      ...data
        .filter((r) => !r.fork)
        .map((r) => ({
          name: r.name,
          description: r.description,
          url: r.html_url,
          language: r.language,
          stars: r.stargazers_count,
          updated: r.pushed_at,
        })),
    )
    if (repos.length >= limit || data.length < 100) break
  }
  return repos.slice(0, limit)
}
