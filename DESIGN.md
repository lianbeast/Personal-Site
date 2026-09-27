# Personal-Site: Design Doc

**Status:** Implemented. This doc describes the site as it ships, derived from `src/`.

## Understanding

A personal landing page. A rotating 3D wireframe globe sits at the center of a full-screen scene; holographic cards orbit around it showing live weather, world news, and tech news. Below the hero, a scroll-narrative descent walks through About, Capabilities, Projects, and Contact as five sticky scenes. A Map Room and a live GitHub feed sit as normal scrolling sections after the descent.

## Scene and layout

The page is one full-screen Three.js canvas (`react-three-fiber`) on a dark space background.

- **Core (center):** the name and tagline, enveloped by a slowly rotating wireframe globe with a gold edge glow.
- **Orbiting cards:** fixed orbital slots with gentle sinusoidal bobbing. Weather, world news, tech news. Each renders its own loading, error, and offline fallback so one failing API never breaks the page.
- **Descent:** five sticky 100dvh scenes (hero, about, capabilities, projects, contact). Each scene is background (CSS) plus an art layer (SVG or CSS) plus content. Scenes fade in at 50% visibility.
- **HUD:** a fixed depth meter on the left (ALT readout, fills as you scroll; reads "ground" at the bottom) and a progress rail on the right (five dots, active one highlighted).
- **After the descent:** Map Room, then live GitHub projects, then the footer.

## Interactions

- Drag to rotate the globe.
- Hover a card to lift it.
- Click any card to zoom into focus mode.
- Pause orbit: freeze the carousel, drag cards anywhere to rearrange, resume to start orbiting again.
- Custom cursor follower: a 40px gold ring that follows the mouse and expands to 80px over interactive elements.
- Magnetic buttons (`btn-magnetic`) and tactile click scaling (`btn-tactile`).
- Smooth scroll, scroll-triggered fade-ins, and a glass-refractive card treatment.
- Respects `prefers-reduced-motion`: art fades in without drifting or breathing, transitions collapse to 0.01ms.

## Data sources (all free)

| Source | Purpose | Key needed? |
|---|---|---|
| Open-Meteo | Weather (current + conditions, imperial units) | No |
| BigDataCloud | Reverse geocode (friendly city name for geolocation) | No |
| rss2json | World news (BBC) and tech news (Hacker News) | No |
| GitHub API | Most recently pushed public repos | No |

**CORS handling:** RSS feeds are fetched through a server-side proxy endpoint (`/api/rss?feed=...`) so the browser never hits CORS. RSS parsed with `fast-xml-parser`.

## Stack

- Vite + React + TypeScript
- `three` + `@react-three/fiber` + `@react-three/drei`
- Tailwind CSS for the 2D overlay UI (loading, error states)
- `fast-xml-parser` (server side of the RSS proxy)
- `gsap` (ScrollTrigger reveals), `motion` / framer (kinetic reveals)

## Architecture

```
src/
  App.tsx                # Canvas + scene composition + 2D overlay shell
  main.tsx               # Entry
  config.ts              # Single source of truth: name, tagline, links, projects, feeds
  index.css               # Design tokens + all CSS (backgrounds, art, HUD, cursor)
  components/
    NarrativeScenes.tsx  # 5 sticky 100dvh scenes + SVG art motifs
    NarrativeHUD.tsx     # Depth meter + scene rail
    Background.tsx       # Parallax background variants
    MapRoomSection.tsx   # GeoLibre iframe embed
    ProjectsSection.tsx  # Live GitHub repos
    ProjectPreview.tsx   # Recorded mp4 + poster previews
    ScrollReveal.tsx     # gsap ScrollTrigger reveal
    Footer.tsx
  hooks/
    useAsync.ts          # Generic async hook with refresh
    useInView.ts         # IntersectionObserver wrapper
  lib/github.ts          # Typed GitHub API client
```

**Data flow:** On load (and every 10 min / on refresh), fetch weather and each RSS feed independently. Each card renders its own loading / error / offline fallback so one failing API never breaks the page.

## Assumptions

- News feeds default to **Hacker News + The Verge** (user did not select; changeable in `config.ts`).
- Everything personal lives in `src/config.ts`. Edit, push, done.
- Pure frontend + free APIs; no backend, database, or auth; must degrade gracefully when APIs fail.

## Deployment and preview workflow

- **Host:** GitHub Pages (`https://lianbeast.github.io/Personal-Site/`), auto-deploy on every push to `main` via a GitHub Actions workflow (`actions/deploy-pages`). Vite `base: '/Personal-Site/'`.
- **Live GIF preview:** A GitHub Action records the deployed page (~8s of the 3D animation) with Playwright, stitches frames into `preview.gif` (gifenc), and commits it back with `[skip ci]` so the README always shows the current look. One-time repo setting needed: Settings → Pages → Source = **GitHub Actions**.

## Open questions

1. Name + tagline text? *(placeholder until provided)*
2. Weather city? *(placeholder until provided)*
3. Social URLs (GitHub, LinkedIn, X, email)? *(placeholder until provided)*
4. 3–4 featured projects + links? *(placeholder until provided)*
5. Confirm news feeds (default: Hacker News + The Verge)? *(confirmed by default)*