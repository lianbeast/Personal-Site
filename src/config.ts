// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to make the site yours.
//  Every push to main auto-deploys + regenerates the GIF preview.
// ─────────────────────────────────────────────────────────────

export interface Project {
  name: string
  description: string
  url: string
  /** Deployed site URL (e.g. GitHub Pages), shown as a "live" link on project cards. */
  live?: string
}

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
    { icon: '<>', title: 'Frontend Engineering', desc: 'React, TypeScript, Next.js — crafting fast, fluid interfaces.' },
    { icon: '{ }', title: 'Creative Development', desc: 'Three.js, WebGL, GSAP — turning static pages into experiences.' },
    { icon: '[ ]', title: 'Geospatial & GIS', desc: 'MapLibre, DuckDB-WASM, GeoLibre — browser-native spatial tools.' },
    { icon: '$ ', title: 'Tool Building', desc: 'CLI tools, dev utilities, and automation that save real time.' },
    { icon: '[::]', title: 'Full-Stack Apps', desc: 'End-to-end products with auth, databases, and deployment.' },
    { icon: '▶', title: 'Ship & Iterate', desc: 'CI/CD, preview deploys, and the confidence to push to main.' },
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

  contact: {
    eyebrow: 'contact',
    headline: "Let's build something together.",
    sub: 'Got an idea, a project, or just want to say hi? I\'m always open to new conversations and collaborations.',
  },

  // Repos I created (source repos, not forks). The live GitHub feed in the
  // projects section is enriched with these descriptions + live-site URLs,
  // and this list doubles as the offline fallback.
  projects: [
    {
      name: 'EliteHuman',
      description: 'Scroll-driven 3D brand site — Body → Mind → Spirit → Apex — with a browsable archive of 105 Instagram posts. React Three Fiber, postprocessing, and Lenis smooth scroll.',
      url: 'https://github.com/lianbeast/EliteHuman',
      live: 'https://lianbeast.github.io/EliteHuman/',
    },
    {
      name: 'Lian-Arch-Linux-Site',
      description: 'Arch Linux scroll landing page — particle backdrop, scroll-progress nav, and an in-page terminal that answers real pacman commands. React 19 + Vite.',
      url: 'https://github.com/lianbeast/Lian-Arch-Linux-Site',
      live: 'https://lianbeast.github.io/Lian-Arch-Linux-Site/',
    },
    {
      name: 'debian-linux-site',
      description: 'Cosmic single-file landing page for Debian 13 "Trixie" — animated Three.js hero, an actually interactive bash terminal, and first-class accessibility. Zero build step.',
      url: 'https://github.com/lianbeast/debian-linux-site',
      live: 'https://lianbeast.github.io/debian-linux-site/',
    },
    {
      name: 'hamna-Henna-Site',
      description: 'Immersive 3D portfolio for a henna artist — mandala scene with neon wireframes, scroll-driven reveals, and a Web Audio tanpura drone. Astro + React Three Fiber.',
      url: 'https://github.com/lianbeast/hamna-Henna-Site',
      live: 'https://lianbeast.github.io/hamna-Henna-Site/',
    },
    {
      name: 'Personal-Site',
      description: 'This site — interactive 3D portfolio with React Three Fiber, GSAP, and a live GitHub feed, deployed to GitHub Pages on every push.',
      url: 'https://github.com/lianbeast/Personal-Site',
      live: 'https://lianbeast.github.io/Personal-Site/',
    },
  ],

  feeds: {
    tech: 'hn',
    world: 'https://feeds.bbci.co.uk/news/world/rss.xml',
  },

  geolibre: {
    embedBase: 'https://web.geolibre.app',
    // Shared project from GeoLibre's Project → Share
    // (e.g. https://share.geolibre.app/<you>/<project>.geolibre.json).
    // When set, the embed loads THIS instead of the raw datasets below —
    // layers, styles, basemaps and display plugins all come from the project.
    projectUrl: '',
    // Fallback: stacked raw datasets (repeated data= params; style must sit
    // at the SAME position as its dataset, empty '' = default styling).
    // All URLs need CORS; PMTiles/COG also need HTTP byte-range support.
    datasets: [
      {
        label: 'World population',
        url: 'https://raw.githubusercontent.com/MinnPost/simple-map-d3/master/example-data/world-population.geo.json',
        style: '',
      },
      {
        label: 'Places (GeoLibre sample)',
        url: 'https://assets.geolibre.app/data/places.geojson',
        style: 'https://assets.geolibre.app/data/sample.style.json',
      },
      {
        label: 'Multi-layer sample (parks + counties)',
        url: 'https://assets.geolibre.app/data/multiple-layers.zip',
        style: 'https://assets.geolibre.app/data/multiple-layers.style.json',
      },
      {
        label: 'Building count (H3, GeoParquet)',
        url: 'https://data.source.coop/giswqs/opengeos/building_count_h3.parquet',
        style: 'https://assets.geolibre.app/data/sample.style.json',
      },
      {
        label: 'Digital elevation model (COG)',
        url: 'https://data.source.coop/giswqs/opengeos/dem.tif',
        style: 'https://assets.geolibre.app/data/dem.style.json',
      },
    ],
    embedParams: '&layout=compact&panels=collapsed',
    // Short feature list shown under the map embed.
    features: [
      { icon: '🗂', label: 'Vector & raster layers', desc: 'GeoJSON, PMTiles, COG, GeoParquet' },
      { icon: '🧮', label: 'Geoprocessing', desc: '1,000+ local analysis tools' },
      { icon: '🎨', label: 'Live styling', desc: 'Per-layer colors, sizes, opacity' },
      { icon: '🔒', label: 'Private by default', desc: 'Everything runs in your browser' },
    ],
  },
}

export type FeedKind = 'tech' | 'world'
