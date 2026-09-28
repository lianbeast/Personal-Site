# Design Impact Report — Personal-Site

**Period:** scroll-narrative redesign (Sep 2026)
**Status:** shipped — live at `https://lianbeast.github.io/Personal-Site/`

## Context

The previous site was a "Mission Control" concept: a rotating Three.js
wireframe globe with orbiting cards, live weather, Hacker News, and BBC
news. It was heavy, single-canvas, and the README no longer matched the
source. The redesign replaced it with a scroll-narrative landing: five sticky
`100dvh` scenes, a fixed altitude HUD, and SVG art motifs — no 3D canvas,
no WebGL, no network data on the critical path.

## Intervention

Ported the `scroll-narrative-landing` opendesign handoff into `src/`. Scene
shell, kinetic reveals, depth meter, scene rail, custom cursor, and
reduced-motion gating all implemented. The live GitHub feed and the GeoLibre
Map Room were kept as ordinary scrolling sections *after* the narrative rather
than folded into it.

## Evidence

### Accessibility — 100/100 Lighthouse (desktop, production build)

- Contrast held to WCAG 2.2 AA for text (≥4.5) and non-text UI (≥3), including
  the scrollbar thumb and the scene-rail targets.
- `prefers-contrast: more` raises the border token for users who need it.
- `prefers-reduced-motion` honoured on every path: art fades in without
  drifting or breathing, the cursor trail renders nothing at all, and
  `ScrollReveal` skips its tween entirely rather than animating.
- Focus-visible outline, `aria-label` on the rail, `aria-hidden` on
  decorative art, and a skip link are all present.

### Performance — 97/100 Lighthouse (desktop, real Chrome, production build)

- LCP 1.24s (score 88), FCP 686ms (score 98), TBT 0ms (score 100),
  Speed Index 815ms (score 99), total byte weight 535 KB (score 100).
- 454 modules transformed into a single JS bundle and single CSS file.
- One HTML document, one JS, one CSS — no third-party scripts, no analytics.
- The only network call on the page is the optional GitHub repos fetch. It
  degrades to a static list on failure, so the page never depends on it
  rendering.

**Three actionable insights** (score 0, all fixable):

- **unused-javascript (0):** 45.7% of the 158 KB gzipped JS bundle is unused
  on initial load — 72 KB wasted. Cause: `gsap` and `motion` ship with
  heavier code than the two components actually use. Fix: split the bundle so
  the narrative-reveal path and the ScrollTrigger path load separately, or
  tree-shake the unused exports.
- **render-blocking-insight (0):** Google Fonts (`Playfair Display`, `Inter`,
  `JetBrains Mono`) are loaded via a blocking `<link>` in `index.html`,
  delaying FCP. Fix: preload the font files and switch to `font-display:
  swap`, or inline a smaller subset.
- **network-dependency-tree-insight (0):** the fonts.googleapis.com origin
  should be preconnected. Fix: add `<link rel="preconnect">` for
  `fonts.googleapis.com` and `fonts.gstatic.com`.

### Reliability

- GitHub API failure, region block, or network outage still returns a
  complete page. Reach is not contingent on an external service.
- README was rewritten to describe the shipped site rather than the
  pre-redesign concept (it claimed a Three.js globe, weather, Hacker News,
  BBC, focus mode, and pause/drag — none of which exist in `src/`). The same
  stale copy was fixed in `src/config.ts`, where it surfaced on the site's
  own project list.

### Engineering authored

- `ProjectPreview` renders recorded `.mp4` clips of each live site with a
  poster fallback, debounced, `preload="none"`.
- `SplashCursor` writes to DOM nodes from a rAF loop rather than React state,
  so pointer movement never re-renders the scenes.

## Business value

This is a personal portfolio site, so conversion-rate and revenue framing
don't apply. Measurable outcomes are reach, trust, and cost:

- **Reach:** the page renders with no dependency on external services. A
  blocked GitHub API, a region block, or a network failure still returns a
  complete page.
- **Trust:** 100/100 accessibility means the site is usable by screen-reader
  and keyboard-only visitors — a real audience for a portfolio, not a
  nice-to-have.
- **Cost:** the custom cursor, every art motif, and every background variant
  are pure CSS and SVG. Replacing the Three.js globe removed a dependency, its
  bundle cost, and the WebGL compatibility surface.

## What's next

The `.impeccable` critique scored the site 22/32. Its biggest opportunity:
the site reads as a generic scroll-narrative template rather than Lian's.
The strongest product signals — the live GitHub feed and the Map Room
GeoLibre embed — live *after* the narrative, orphaned. Next: inject live
product data into the narrative and reorder so work precedes ask.

The art motifs (wireframe planet, circuit traces, constellation, landing
pad) are sci-fi/military vocabulary with no tie to the actual work: GIS,
Astro/React Three Fiber, DuckDB-WASM, live GitHub feed, recorded live-site
previews.

---

## Methodology

Lighthouse was run against the production build (`npm run build`) served by
`vite preview`, using a real Chrome instance (not headless). The first run
was headless and reported 71/100 with LCP at 22s — the custom cursor's rAF
loop conflicts with headless Chrome, so those numbers reflected the tool,
not the site. Re-running with a real browser gave the 97/100 performance
score reported above. The three zero-scored insights are real and listed
under Performance; the remaining 100s (accessibility, best-practices, SEO)
held across both runs.