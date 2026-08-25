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

/** Public repos for a user, most recently pushed first (api.github.com is CORS-enabled). */
export async function getRepos(user: string, limit = 8): Promise<Repo[]> {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=${limit}&type=source`,
  )
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
  const data: GitHubRepo[] = await res.json()
  return data
    .filter((r) => !r.fork)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      updated: r.pushed_at,
    }))
}
