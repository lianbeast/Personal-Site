// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to make the site yours.
//  Every push to main auto-deploys + regenerates the GIF preview.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Lian Beast',
  tagline: 'Builder · Dreamer · Explorer',
  // GitHub username used for the live projects feed (public repos, by recency).
  githubUser: 'lianbeast',
  // Fallback city used when the visitor denies location access (weather is otherwise autodetected).
  city: 'San Francisco',

  links: {
    github: 'https://github.com/lianbeast',
    linkedin: 'https://www.linkedin.com/',
    x: 'https://x.com/',
    email: 'mailto:you@example.com',
  },

  about: [
    'I build things that live on the web — interactive, playful, and a little bit extra.',
    'When I’m not shipping code you’ll find me exploring new tools, reading about space, and chasing the next cool idea.',
  ],

  projects: [
    {
      name: 'Personal Site',
      description: 'This very page — a 3D mission-control landing page with live data.',
      url: 'https://github.com/lianbeast/Personal-Site',
    },
    {
      name: 'Project Two',
      description: 'A short, punchy description of something cool you built.',
      url: 'https://github.com/lianbeast',
    },
    {
      name: 'Project Three',
      description: 'Another thing you’re proud of. Keep it to one sentence.',
      url: 'https://github.com/lianbeast',
    },
  ],

  feeds: {
    // tech uses Hacker News' CORS-enabled API (no proxy needed)
    tech: 'hn',
    // world uses an RSS feed via a free CORS proxy
    world: 'https://feeds.bbci.co.uk/news/world/rss.xml',
  },

  // GeoLibre — full browser GIS embedded in the Map Room section.
  // data can be a public .geojson / .geoparquet / COG URL (optional).
  // layout=compact + panels=none + maponly = chrome-free, map-only embed.
  geolibre: {
    embedBase: 'https://web.geolibre.app',
    // Set a hosted dataset to preload, or leave null for the default basemap.
    data: null as string | null,
    embedParams: '&layout=compact&panels=none&maponly',
  },
}

export type FeedKind = 'tech' | 'world'
