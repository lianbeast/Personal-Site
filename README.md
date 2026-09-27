# Personal-Site: Mission Control

A personal landing page built around a rotating 3D wireframe globe. Lian Beast sits at the core. Live weather, world news, and tech news orbit around it.

![Live preview](preview.gif)

**Live site:** https://lianbeast.github.io/Personal-Site/

## Features

- Rotating 3D wireframe globe (Three.js, react-three-fiber). Drag to spin.
- Weather. Autodetects the visitor's location (imperial °F/mph), falls back to a configured city. Open-Meteo, free, no API key.
- Tech news. Hacker News top stories.
- World news. BBC headlines via rss2json.
- Live GitHub projects. Most recently pushed public repos, pulled from the GitHub API.
- Map Room. GeoLibre embedded with map-only chrome, pan and zoom, 1,000+ geoprocessing tools, everything running locally in the browser.
- Identity core with social links, plus About and Projects sections.
- Click any card to zoom into focus mode.
- Pause orbit. Freeze the carousel, drag cards anywhere to rearrange, resume to start orbiting again.

## Development

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck + production build
npm run preview    # serve the production build
```

## Deploy and the live GIF loop

Every push to `main`:

1. `deploy.yml` builds and deploys the site to GitHub Pages.
2. `preview-gif.yml` records the deployed page (about 8 seconds of the 3D animation) with Playwright, stitches it into `preview.gif`, and commits it back so this README always shows the current look.

One-time repo setting: **Settings → Pages → Source: GitHub Actions**.

## Make it yours

Everything personal lives in [`src/config.ts`](src/config.ts): name, tagline, city, social links, about text, and projects. Edit, push, done.

To record the GIF locally: `npm run record:preview -- http://localhost:4173/`
