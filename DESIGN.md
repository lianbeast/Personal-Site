# Personal Site — Design Doc

**Status:** Validated concept (pre-implementation)
**Concept:** "Mission Control" — a 3D holographic landing page
**Style:** Sci-fi hologram

---

## Understanding Summary

- **What:** A personal landing page where a rotating 3D globe sits at the center of a full-screen scene, with holographic cards orbiting it showing live weather, world news, and tech news — plus the visitor's identity content (name, tagline, links, projects, about-me).
- **Why:** A personal page that is both a portfolio and a live "dashboard" of what's happening in the world — memorable and informative.
- **Who:** Visitors to the user's personal site (recruiters, collaborators, curious friends).
- **Key constraints:** Pure frontend + free APIs; no backend, database, or auth; must degrade gracefully when APIs fail.
- **Non-goals:** No CMS, no user accounts, no comments, no heavy backend — all personal content is static config.

---

## Scene & Layout

Full-screen Three.js canvas (`react-three-fiber`), dark space background:

- **Core (center):** Glowing 3D name text + tagline, enveloped by a slowly rotating wireframe globe with cyan edge glow.
- **Orbiting holographic cards** (fixed orbital slots, gentle sinusoidal bobbing):
  - 🌤 **Weather card** — live conditions for the user's city with animated 3D condition (sun / rain particles / clouds).
  - 📰 **World news card** — top headlines, latest first.
  - ⚡ **Tech news card** — latest tech stories.
- **Social orbit:** GitHub / LinkedIn / X / email as clickable glowing icons orbiting the globe.
- **About-me card:** compact floating holo-panel.
- **Project spotlight:** card listing 3–4 featured projects with links.

## Interactions

- **Drag** to rotate the globe.
- **Hover** a card → it expands; **scroll** zooms into "focus mode" on that feed.
- **Click** social icons → open links.
- Respect `prefers-reduced-motion`; clamp device pixel ratio for performance.

## Data Sources (all free)

| Source | Purpose | Key needed? |
|---|---|---|
| [Open-Meteo](https://open-meteo.com) | Weather (current + conditions) | No |
| Hacker News / The Verge RSS | Tech news | No |
| BBC / Reuters RSS | World news | No |

**CORS handling:** RSS feeds are fetched through a tiny server-side proxy endpoint (`/api/rss?feed=...`) so the browser never hits CORS. RSS parsed with `fast-xml-parser`.

## Stack

- Vite + React + TypeScript
- `three` + `@react-three/fiber` + `@react-three/drei`
- Tailwind CSS for the 2D overlay UI (loading, error states)
- `fast-xml-parser` (server side of the RSS proxy)
- Deployable to Vercel / Netlify / Cloudflare Pages as a static site

## Architecture

```
src/
  App.tsx            # Canvas + scene composition + 2D overlay shell
  components/
    Globe.tsx        # wireframe globe + drag rotation
    IdentityCore.tsx # glowing name/tagline 3D text
    SocialOrbit.tsx  # orbiting link icons
    OrbitingCard.tsx # generic floating holo-card shell
    WeatherCard.tsx  # Open-Meteo data + 3D condition
    NewsCard.tsx     # RSS headlines (reused for world + tech)
    AboutCard.tsx    # about-me blurb
    ProjectsCard.tsx # featured projects
  lib/
    weather.ts       # Open-Meteo client
    news.ts          # RSS fetch + parse client
  config.ts          # name, tagline, links, projects, city, feeds
server/
  rss-proxy.ts       # /api/rss?feed=...  (or Vite plugin in dev)
```

**Data flow:** On load (and every 10 min / on refresh), fetch weather + each RSS feed independently. Each card renders its own loading / error / offline fallback so one failing API never breaks the page.

## Assumptions

- News feeds default to **Hacker News + The Verge** (user did not select; changeable in `config.ts`).
- Weather city, name/tagline, social URLs, and featured projects will be supplied at build time (placeholders OK initially).
- Static hosting, no SSR.

## Decision Log

| Decision | Chosen | Alternatives | Why |
|---|---|---|---|
| Concept | Mission Control globe | My Universe, Holo-Desk | User pick |
| Visual style | Sci-fi hologram | Minimal glass, Playful neon | User pick |
| Personal content | All four (name, links, projects, about) | Subsets | User pick |
| Weather API | Open-Meteo | WeatherAPI, OpenWeather | Free, keyless, CORS-friendly |
| News delivery | RSS via server proxy | NewsAPI (needs key), client-side fetch (CORS) | Free + reliable |

## Deployment & Preview Workflow (decided)

- **Host:** GitHub Pages (`https://lianbeast.github.io/Personal-Site/`), auto-deploy on every push to `main` via a GitHub Actions workflow (`actions/deploy-pages`). Vite `base: '/Personal-Site/'`.
- **Live GIF preview:** A GitHub Action records the deployed page (~8s of the 3D animation) with Playwright, stitches frames into `preview.gif` (gifenc), and commits it back with `[skip ci]` so the README always shows the current look. One-time repo setting needed: Settings → Pages → Source = **GitHub Actions**.
- **CORS note (static hosting):** GitHub Pages has no server side, so the RSS proxy from the earlier design is replaced with a client-side strategy — Hacker News uses its CORS-enabled Firebase API; BBC world news goes through rss2json (native CORS, JSON) with an allorigins XML passthrough as fallback. Open-Meteo is already CORS-friendly.
- Every change: commit + push to `main` (per user request), which triggers deploy → GIF refresh.

## Open Questions (for build time)

1. Name + tagline text? *(placeholder until provided)*
2. Weather city? *(placeholder until provided)*
3. Social URLs (GitHub, LinkedIn, X, email)? *(placeholder until provided)*
4. 3–4 featured projects + links? *(placeholder until provided)*
5. Confirm news feeds (default: Hacker News + The Verge)? *(confirmed by default)*
