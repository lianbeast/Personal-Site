// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to make the site yours.
//  Every push to main auto-deploys + regenerates the GIF preview.
// ─────────────────────────────────────────────────────────────

export interface Project {
  name: string
  description: string
  url: string
  /**
   * Deployed site URL (e.g. GitHub Pages), shown as a "live" link on project
   * card. Also opts the project into a recorded preview: `npm run
   * record:previews` clips the live URL into /previews/<slug>.mp4 + .jpg on
   * every deploy, where <slug> is this name lowercased with non-alphanumerics
   * dashed (see previewSlug in config.ts). No preview key to maintain.
   */
  live?: string
}

/** Filename stem for a project's recorded preview. Must match scripts/record-project-previews.mjs. */
export const previewSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const site = {
  name: 'Lian Beast',
  tagline: 'Builder · Dreamer · Explorer',
  hero: {
    headline: 'I build things that live on the web.',
    sub: 'Interactive, playful, a little bit extra. Right now I\'m reading about space and chasing the next idea worth building.',
    // Anchor must match a scene id in NarrativeScenes.tsx (s-*).
    cta: { label: 'Get in touch', href: '#s-contact' },
  },

  githubUser: 'lianbeast',
  city: 'San Francisco',

  links: {
    github: 'https://github.com/lianbeast',
    email: 'mailto:lianbeast.905@gmail.com',
  },

  about: {
    intro: "Hi, I'm Lian Beast.",
    body: [
      'I build things that live on the web. Interactive, playful, a little bit extra.',
      "When I'm not shipping code I'm poking at new tools, reading about space, or chasing the next idea worth building.",
    ],
  },

  features: [
    { icon: '<>', title: 'Frontend Engineering', desc: 'React, TypeScript, Next.js. Fast, fluid interfaces.' },
    { icon: '{ }', title: 'Creative Development', desc: 'Three.js, WebGL, GSAP. Motion you can feel.' },
    { icon: '[ ]', title: 'Geospatial & GIS', desc: 'MapLibre, DuckDB-WASM, GeoLibre. Spatial tools that run in the browser.' },
    { icon: '$ ', title: 'Tool Building', desc: 'CLI tools, dev utilities, automation. The kind that actually saves time.' },
    { icon: '[::]', title: 'Full-Stack Apps', desc: 'End-to-end products. Auth, databases, deployment.' },
    { icon: '▶', title: 'Ship & Iterate', desc: 'CI/CD, preview deploys. Pushing to main is routine, not a gamble.' },
  ],

  contact: {
    eyebrow: 'contact',
    headline: "Let's build something together.",
    sub: 'Have an idea, a project, or just want to say hi? Send an email.',
  },

  // Repos I created (source repos, not forks). The live GitHub feed in the
  // projects section is enriched with these descriptions + live-site URLs,
  // and this list doubles as the offline fallback.
  projects: [
    {
      name: 'EliteHuman',
      description: 'Scroll-driven 3D brand site. Four chapters: Body, Mind, Spirit, Apex. Browsable archive of 105 Instagram posts. React Three Fiber, postprocessing, Lenis smooth scroll.',
      url: 'https://github.com/lianbeast/EliteHuman',
      live: 'https://lianbeast.github.io/EliteHuman/',
    },
    {
      name: 'Lian-Arch-Linux-Site',
      description: 'Arch Linux landing page. Particle backdrop, scroll-progress navigation, an in-page terminal that answers real pacman commands. React 19, Vite.',
      url: 'https://github.com/lianbeast/Lian-Arch-Linux-Site',
      live: 'https://lianbeast.github.io/Lian-Arch-Linux-Site/',
    },
    {
      name: 'debian-linux-site',
      description: 'Single-file landing page for Debian 13 "Trixie". Animated Three.js hero, a bash terminal you can actually use, real accessibility. Zero build step.',
      url: 'https://github.com/lianbeast/debian-linux-site',
      live: 'https://lianbeast.github.io/debian-linux-site/',
    },
    {
      name: 'hamna-Henna-Site',
      description: 'Immersive 3D portfolio for a henna artist. Mandala scene with neon wireframes, scroll-driven reveals, a Web Audio tanpura drone. Astro, React Three Fiber.',
      url: 'https://github.com/lianbeast/hamna-Henna-Site',
      live: 'https://lianbeast.github.io/hamna-Henna-Site/',
    },
    {
      name: 'The-Sleep-Etiquette',
      description: 'A sleepwear label. Six pages, a working bag, a coming-soon list. Warm off-white, five fabric colourways, serif and sans. Zero build step.',
      url: 'https://github.com/lianbeast/The-Sleep-Etiquette',
      live: 'https://lianbeast.github.io/The-Sleep-Etiquette/coming-soon.html',
    },
    {
      name: 'Personal-Site',
      description: 'This site. Scroll-narrative landing: five sticky 100dvh scenes, a fixed altitude HUD, SVG art motifs, and a live GitHub projects feed. Deploys to GitHub Pages on every push.',
      url: 'https://github.com/lianbeast/Personal-Site',
      live: 'https://lianbeast.github.io/Personal-Site/',
    },
    {
      // Repo: github.com/lianbeast/resume-website — private, so the public-repo
      // feed can never return it. ProjectsSection appends curated entries the
      // API missed for exactly this case. The repo 404s for visitors, so both
      // links point at the live site.
      name: 'resume-website',
      description: 'Personal resume site. Three.js hero, glass-morphism cards, schema.org Person markup for rich search results.',
      url: 'https://rahid.persipico.com/',
      live: 'https://rahid.persipico.com/',
    },
  ],

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
