// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to make the site yours.
//  Every push to main auto-deploys + regenerates the GIF preview.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Lian Beast',
  tagline: 'Builder · Dreamer · Explorer',
  hero: {
    headline: 'I build things that live on the web.',
    sub: 'Interactive, playful, and a little bit extra. Currently exploring new tools, reading about space, and chasing the next cool idea.',
    cta: { label: 'View my work', href: '#projects' },
    ctaSecondary: { label: 'Get in touch', href: '#contact' },
  },

  githubUser: 'lianbeast',
  city: 'San Francisco',

  links: {
    github: 'https://github.com/lianbeast',
    linkedin: 'https://www.linkedin.com/',
    x: 'https://x.com/',
    email: 'mailto:you@example.com',
  },

  about: {
    intro: "Hi, I'm Lian Beast.",
    body: [
      'I build things that live on the web — interactive, playful, and a little bit extra.',
      "When I'm not shipping code you'll find me exploring new tools, reading about space, and chasing the next cool idea.",
    ],
  },

  features: [
    { icon: '⚡', title: 'Frontend Engineering', desc: 'React, TypeScript, Next.js — crafting fast, fluid interfaces.' },
    { icon: '🎨', title: 'Creative Development', desc: 'Three.js, WebGL, GSAP — turning static pages into experiences.' },
    { icon: '🗺', title: 'Geospatial & GIS', desc: 'MapLibre, DuckDB-WASM, GeoLibre — browser-native spatial tools.' },
    { icon: '🔧', title: 'Tool Building', desc: 'CLI tools, dev utilities, and automation that save real time.' },
    { icon: '📦', title: 'Full-Stack Apps', desc: 'End-to-end products with auth, databases, and deployment.' },
    { icon: '🚀', title: 'Ship & Iterate', desc: 'CI/CD, preview deploys, and the confidence to push to main.' },
  ],

  testimonials: [
    {
      quote: "Lian's work on our interactive dashboard was exceptional — fast, polished, and delivered ahead of schedule.",
      author: 'Project Client',
      role: 'Startup Founder',
    },
    {
      quote: "The GeoLibre integration was seamless. It just works, and it looks great doing it.",
      author: 'Open Source Collaborator',
      role: 'GIS Engineer',
    },
    {
      quote: "Creative, reliable, and genuinely passionate about the craft. That's rare.",
      author: 'Team Lead',
      role: 'Engineering Manager',
    },
  ],

  projects: [
    {
      name: 'Personal Site',
      description: 'This very page — a clean, dark landing page with live data and a map room.',
      url: 'https://github.com/lianbeast/Personal-Site',
    },
    {
      name: 'Project Two',
      description: 'A short, punchy description of something cool you built.',
      url: 'https://github.com/lianbeast',
    },
    {
      name: 'Project Three',
      description: 'Another thing you\'re proud of. Keep it to one sentence.',
      url: 'https://github.com/lianbeast',
    },
  ],

  feeds: {
    tech: 'hn',
    world: 'https://feeds.bbci.co.uk/news/world/rss.xml',
  },

  geolibre: {
    embedBase: 'https://web.geolibre.app',
    data: 'https://raw.githubusercontent.com/MinnPost/simple-map-d3/master/example-data/world-population.geo.json',
    embedParams: '&layout=compact&panels=none&maponly',
  },
}

export type FeedKind = 'tech' | 'world'
