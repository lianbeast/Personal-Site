# Personal-Site: Design Doc

**Status:** Implemented. This doc describes the site as it ships, derived from `src/`.

## Understanding

A personal landing page built as a scroll narrative. Five sticky, full-viewport scenes read as a controlled descent from orbit to ground: hero, about, capabilities, projects, contact. A fixed HUD tracks the descent — an altitude readout on the left, a scene rail on the right. After the descent come two normal scrolling sections (live GitHub projects, then a Map Room embedding GeoLibre) and a footer.

Everything renders from CSS and SVG. There is no 3D canvas, no WebGL, and no network data on the critical path — the only fetch is an optional GitHub repos call for the projects section, which degrades to a static list when it fails.

## Scene and layout

Five `<section>` elements, each `100dvh` and `position: sticky`, stacked so exactly one fills the viewport at a time. Each scene is three layers:

1. **Background** — a CSS-only texture from `Background.tsx` (star field, nebula, blueprint, contours, noise, and variants), parallaxed at 15% of scroll.
2. **Art** — an SVG or CSS motif per scene (hero rings, about beacon, capability grid, project contours, contact orbit), fading in at 50% visibility.
3. **Content** — centered column, `max-w-4xl`, 24px gutters.

Sections after the descent are ordinary flow content: `ProjectsSection` (live GitHub feed), `MapRoomSection` (GeoLibre iframe), `Footer`.

**HUD** (`NarrativeHUD.tsx`, fixed):
- *Depth meter* (left): "ALT" label, a bar that fills with scroll progress, and a readout that interpolates 400km → "ground". Progress is measured against the narrative's own extent (`main`'s offsetTop + height), not document height, so the descent reads 0–100% and then stops.
- *Scene rail* (right): five anchor dots, the active one filled gold. Each anchor is a 24×24 hit target (WCAG 2.5.8) with the visible 8px dot drawn by `::before`. On mobile the whole HUD collapses into a single fixed bottom bar.

## Interactions

- Smooth scroll (`scroll-behavior: smooth`); scene content animates in with scrub motion as each scene becomes active.
- Custom cursor follower: a 40px gold ring that trails the pointer and grows to 80px over interactive elements.
- Magnetic buttons (`btn-magnetic`) and tactile click scaling (`btn-tactile`).
- Capability cards lift and glow on hover; project cards show a recorded clip of the live site on hover.
- **Reduced motion** (`prefers-reduced-motion: reduce`) is honoured on every path: art fades in without drifting or breathing, the cursor follower is hidden outright, and `ScrollReveal` skips its tween entirely rather than animating.

## Data sources

| Source | Purpose | Key needed? |
|---|---|---|
| GitHub API | Most recently pushed public repos (projects section only) | No |
| GeoLibre embed | The Map Room iframe, or a shared GeoLibre project | No |

The only network call on the page is the optional GitHub repos fetch. If it fails, the section falls back to the static `site.projects` list in `config.ts` — the page never depends on it rendering.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`), with design tokens declared in an `@theme` block in `index.css`
- `gsap` + ScrollTrigger — `ScrollReveal` for the scrolled sections
- `motion` (framer) — `KineticReveal` for the narrative scenes, plus `useReducedMotion`

There is no `three`, no `react-three-fiber`, and no Tailwind-config file; tokens are CSS-native.

## Architecture

```
src/
  App.tsx                # Scene composition + HUD + sections
  main.tsx               # Entry
  config.ts              # Single source of truth: name, tagline, links, about,
                         #   features, contact, projects, geolibre
  index.css              # @theme tokens + all CSS (backgrounds, art, HUD, cursor)
  components/
    NarrativeScenes.tsx  # 5 sticky 100dvh scenes + SVG art motifs
    NarrativeHUD.tsx     # Depth meter + scene rail
    Background.tsx       # Parallax background variants
    ProjectsSection.tsx  # Live GitHub repos (+ static fallback)
    ProjectPreview.tsx   # Recorded mp4 + poster previews
    MapRoomSection.tsx   # GeoLibre iframe embed
    ScrollReveal.tsx     # gsap ScrollTrigger reveal
    Eyebrow.tsx          # Shared section index label
    Footer.tsx
  hooks/
    useAsync.ts          # Generic async hook with refresh
    useInView.ts         # IntersectionObserver wrapper
  lib/github.ts          # Typed GitHub API client
```

**Data flow:** the GitHub feed is fetched through `useAsync`, which owns loading / error / success state and a refresh path. On failure the projects section renders the static `site.projects` list instead, so a failed API never breaks the page.

## Design system

- **Tokens** live in the `@theme` block in `index.css` (colors, fonts, transitions) plus semantic aliases. The extracted, human-readable copy of the palette and type scale is `opendesign/design-systems/personal-site/tokens/colors_and_type.css`; it is **derived from** `index.css`, which is the source of truth.
- **Cards** share one treatment: 16px radius, `--color-border`, `--color-bg-card`, gold border + soft glow on hover.
- **Contrast** is held to WCAG 2.2 AA for text (≥4.5) and non-text UI (≥3), including the scrollbar thumb and the scene-rail targets. `prefers-contrast: more` raises the border token for users who need it.

## Assumptions

- Everything personal lives in `src/config.ts`. Edit, push, done.
- Pure frontend; the only external data is the optional GitHub feed.
- GitHub Pages is the host, so there is no server side — nothing may assume one.

## Deployment and preview workflow

- **Host:** GitHub Pages (`https://lianbeast.github.io/Personal-Site/`), auto-deploy on every push to `main` via a GitHub Actions workflow (`actions/deploy-pages`). Vite `base: '/Personal-Site/'`.
- **Live GIF preview:** A GitHub Action records the deployed page with Playwright, stitches frames into `preview.gif` (gifenc), and commits it back with `[skip ci]` so the README always shows the current look. It chains off the deploy workflow via `workflow_run`.
- **Project previews:** a second recorder clips each `site.projects[].live` URL into `public/previews/<slug>.mp4` + `.jpg` on every deploy, where the slug is the project name lowercased and dashed (`previewSlug` in `config.ts`). One-time repo setting: Settings → Pages → Source = **GitHub Actions**.

## Open questions

None outstanding. Earlier placeholders (name, tagline, weather city, social URLs, featured projects) are all resolved in `config.ts`; the news and weather features the original concept described were dropped in the scroll-narrative rewrite and are no longer part of the site.
