# Scroll Narrative Landing — Personal Site

## Overview

Replace the site's current landing (hero + React Three Fiber globe canvas with a standard scrolled column of sections below it) with a **sticky-scene scroll narrative**: five full-viewport scenes that the visitor descends through, each with its own CSS-only background texture, scrub-in content motion, a fixed left-side "depth/altitude" meter, and a fixed right-side progress rail. The result reads as a controlled descent from orbit to ground level while keeping the existing React + Vite + Tailwind v4 architecture.

## About design files

The HTML file in this bundle (`scroll-narrative.html`) is a **design reference, not production code — do not copy it into the codebase**. Your task is to recreate the design inside the existing React/TypeScript codebase (`src/`), using its established patterns: Tailwind utility classes, CSS custom properties from `src/index.css` (`@theme` block), the `ScrollReveal` component, and the `Background` component with its variant map. The JS in the prototype is plain-DOM; port the logic into React hooks (`useEffect` + refs, or IntersectionObserver hooks) following the conventions in `src/hooks/`.

## Fidelity

**High-fidelity — recreate exactly.** Every measurement, color, easing curve, and animation timing in this README is authoritative. Where this README and the HTML file disagree, this README wins.

The three other prototype variants in `opendesign/mockups/site-interactions-prototype/` (globe-walkthrough, focus-mode) are **not part of this handoff** — they remain as exploratory templates only.

## Screens / views

One page, five scenes. Each scene is a `<section>` with `height: 100vh` (use `100dvh` in production for mobile URL-bar correctness), `display: flex; align-items: center; justify-content: center`, `position: relative`, `overflow: hidden`, content max-width 896px (`max-w-4xl`), horizontal padding 24px.

### Scene 1 — Hero (`#s-hero`)

- **Layout:** centered column. Badge pill → h1 → lead paragraph.
- **Badge pill:** inline-flex, align-items center, gap 12px, border `1px solid var(--color-border)`, background `var(--color-bg-card)`, border-radius 9999px, padding `8px 20px`, font: JetBrains Mono 10px, letter-spacing 0.3em, uppercase, color `#A1A1AA`. Contains a 6px gold pulse dot (see Motion).
- **Text:** "open for commissions" (lowercase in prototype; keep site voice — no period).
- **h1:** Playfair Display 500, `clamp(36px, 7vw, 72px)`, line-height 1.05, color `#FFFFFF`, letter-spacing -0.02em, margin-top 32px. Copy: "I build things live on web." (from `site.hero.headline` in `src/config.ts` — do not hardcode).
- **Lead:** Inter 300, 16px, line-height 1.625, color `#A1A1AA`, max-width 36rem, margin 24px auto 0. Copy: `site.hero.sub`.
- **Background:** tech grid (see Backgrounds, variant `spaceTech` equivalent) — active on load.
- **No scroll cue needed** — the depth meter communicates descent.

### Scene 2 — About (`#s-about`)

- **Layout:** centered column. Eyebrow → h2 → lead.
- **Eyebrow:** "01 · about" — JetBrains Mono 10px, letter-spacing 0.3em, uppercase, color `#71717A`, margin-bottom 16px.
- **h2:** Playfair Display 500, `clamp(30px, 5vw, 48px)`, line-height 1.2, color `#FFFFFF`. Copy: `site.about.intro` ("Hi, I'm Lian Beast.").
- **Lead:** Inter 300, 16px/1.625, `#A1A1AA`. Copy: `site.about.body` joined.
- **Background:** nebula wisps.

### Scene 3 — Capabilities (`#s-capabilities`)

- **Layout:** centered column, then a 3-column card grid below (1 column < 900px).
- **Eyebrow:** "02 · what i do".
- **h2:** same style as scene 2. Copy: "Capabilities".
- **Grid:** `display: grid; gap: 24px; margin-top: 48px`; ≥900px: `repeat(3, 1fr)`. Left-aligned text inside cards.
- **Cards** (6 in production, from `site.features` — prototype shows 3): background `var(--color-bg-card)`, border `1px solid var(--color-border)`, border-radius 16px, padding 24px. On hover: border-color `#D4AF37`, background `var(--color-bg-card-hover)`, box-shadow `0 0 30px rgba(212,175,55,0.06)` — 300ms all, 150ms border-color.
- **Card content:** mono glyph (JetBrains Mono 300, 24px, `#D4AF37` — values from `site.features[].icon` like `<>`, `{ }`, `[ ]`) → title (Playfair Display 500, 14px, `#FFFFFF`, margin 12px 0 8px, letter-spacing 0.05em) → description (Inter 400, 14px, line-height 1.6, `#A1A1AA`).
- **Scrub motion:** cards slide in from alternating sides — first from left (`translateX(-60px)`), second from right (`translateX(60px)`), third from left, etc. See Motion.
- **Background:** blueprint grid.

### Scene 4 — Projects (`#s-projects`)

- **Layout:** centered column, then project rows.
- **Eyebrow:** "03 · projects". h2: "Featured work".
- **Rows** (from `site.projects`): `display: grid; grid-template-columns: auto 1fr auto; gap: 20px; align-items: baseline; padding: 20px 0; border-bottom: 1px solid var(--color-border)`.
- **Row number:** JetBrains Mono 11px, `#71717A` ("01", "02", …).
- **Row title:** Playfair Display 500, 18px, `#FFFFFF`. Row description: Inter 400, 13px, line-height 1.6, `#A1A1AA`.
- **Row arrow:** `→` in `#D4AF37`, 16px, opacity 0 → 1 + `translateX(4px)` on row hover, 150ms.
- **Scrub:** rows alternate left/right slide-in.
- **Background:** topographic contours.
- **Note:** production keeps the existing live GitHub feed enrichment in `ProjectsSection.tsx` — this scene replaces layout only, not data flow.

### Scene 5 — Contact (`#s-contact`)

- **Eyebrow:** "04 · contact". h2: `site.contact.headline`. Lead: `site.contact.sub`.
- **Primary button:** `site.links.email` — background `#D4AF37`, color `#0A0A0A`, Inter 500 14px, padding `14px 32px`, border-radius 8px. Hover: background `#C5A02C`, box-shadow `0 0 30px rgba(212,175,55,0.15)`, 300ms. Existing `ContactSection` pattern.
- **Background:** star field.

## Fixed HUD elements

### Depth meter (left side)

- Position: `fixed; left: 24px; top: 50%; transform: translateY(-50%)`. Mobile (≤640px): `left: 16px; top: auto; bottom: 88px; transform: none`.
- Font: JetBrains Mono 10px, `#71717A`. The altitude value in `#D4AF37`.
- Structure: "ALT" label → vertical 1px bar (height 96px, background `rgba(255,255,255,0.1)`, gold fill scaled by scroll progress via `transform: scaleY(0→1)`, `transform-origin: top`) → value.
- Value logic: `p = scrollY / (scrollHeight - innerHeight)`; altitude = `round(400 - p*396)` km, displayed "103km"; at p=1 display "ground".
- rAF-throttle the scroll handler (existing pattern in `Background.tsx`).

### Progress rail (right side)

- Position: `fixed; right: 24px; top: 50%; transform: translateY(-50%)`. Mobile (≤640px): `right: 16px; bottom: 88px`.
- 8px dots (12px mobile), gap 20px (16px mobile), `border-radius: 50%`, `border: 1px solid #71717A`, transparent background. Links to scene anchors (`#s-hero` … `#s-contact`), each `aria-label` named.
- Active dot (scene ≥50% visible): background + border `#D4AF37`, box-shadow `0 0 12px rgba(212,175,55,0.15)`.
- Mobile dots: 12px (≥44px spacing effectively via 16px gaps + size; bump to 12px).

## Backgrounds

All CSS-only, GPU-accelerated, defined as variant classes. Reuse the existing `Background` component (`src/components/Background.tsx`) — extend its `variantClasses` map if needed; the parallax behavior (`translateY = scrollY * 0.15`, rAF-throttled, respects `prefers-reduced-motion`) already matches. Each scene's background cross-fades in when the scene is ≥50% visible (`opacity 0 → 1`, 600ms, `cubic-bezier(0.16,1,0.3,1)`).

| Scene | Variant | Recipe (exact) |
|---|---|---|
| Hero | tech grid | `radial-gradient(circle 20% 30%, rgba(212,175,55,0.05) 0%, 50%)`, `radial-gradient(circle 80% 70%, rgba(245,213,71,0.04) 0%, 40%)`, `linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px)`, `linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)`; sizes `400px 400px, 500px 500px, 60px 60px, 60px 60px` |
| About | nebula | `radial-gradient(ellipse 20% 30%, rgba(99,60,130,0.08) 0%, 70%)`, `radial-gradient(ellipse 80% 60%, rgba(30,60,120,0.06) 0%, 70%)`, `radial-gradient(ellipse 50% 80%, rgba(150,50,100,0.04) 0%, 70%)` |
| Capabilities | blueprint | `linear-gradient(rgba(245,213,71,0.03) 1px, transparent 1px)`, `linear-gradient(90deg, rgba(245,213,71,0.03) 1px, transparent 1px)`, `radial-gradient(circle 50% 50%, rgba(245,213,71,0.04) 0%, 45%)`, `radial-gradient(circle 0% 100%, rgba(212,175,55,0.04) 0%, 45%)`; sizes `40px 40px, 40px 40px, 600px 600px, 700px 700px` |
| Projects | contours | SVG data-URI, 400×400 tile, gold `#D4AF37` bezier contour lines at opacities 0.08/0.06/0.06/0.04, stroke-width 0.5 (copy verbatim from `scroll-narrative.html` `.bg-contours`) |
| Contact | stars | 6-point radial-gradient star tile, 850×250, incl. three gold-tinted stars `rgba(212,175,55,0.8/0.6)`, overall opacity 0.4 when active |

**Color change from current site:** the blueprint grid and tech-grid radial spot currently use cyan `rgba(0,180,216,…)`. Per user decision they become **yellow** `rgba(245,213,71,…)` at the same alpha levels. Apply this in `src/index.css` variant classes too if the whole site adopts the narrative backgrounds.

## Foreground art layers (NEW — second pass)

Every scene additionally carries a **signature SVG/CSS art layer** sitting between background and content (`position:absolute; inset:0; pointer-events:none; z-index:1`). It fades in with the scene (`opacity 0→1`, 900ms, same trigger). All strokes gold-family; the point is a recognizable per-scene motif, not decoration noise. Copy each layer's markup verbatim from `scroll-narrative.html` (`data-art` divs) — the exact coordinates below are the source of truth.

### Hero — wireframe planet horizon
SVG 1000×1000 `viewBox`, `preserveAspectRatio="xMidYMid slice"`, positioned `left:50%; bottom:-42vmin; width/height:110vmin`, `translateX(-50%)`.
- Meridian group (`.meridian`, stroke `#D4AF37`, opacity 0.14, width 1): circles r=480/380/260 at (500,500); ellipses rx=480 ry=160/280/400.
- Horizon circle r=480 (`.horizon`, stroke `#D4AF37`, opacity 0.25, width 1.2).
- Two orbit arcs (`.orbit-arc`, stroke `#A1A1AA`, opacity 0.22, dasharray `2 7`): `M 60 660 A 480 480 0 0 1 940 660` rotated -18° about center; `M 120 560 A 400 400 0 0 1 880 560` rotated 10°.
- Three gold nodes (`.node`, fill `#D4AF37`, opacity 0.6): circles r=3 at (212,700), r=2.5 at (830,640), r=2 at (500,640).
- Animation (non-reduced): `hero-drift` — rotate 0→2deg alternating, 24s ease-in-out infinite; keep `translateX(-50%)` in both keyframes.

### About — transmission rings
Pure CSS, no SVG: `radial-gradient(circle 1px at 50% 46%, rgba(212,175,55,0.9) 0%, transparent 100%)` (beacon point) over `repeating-radial-gradient(circle at 50% 46%, transparent 0 118px, rgba(212,175,55,0.05) 118px 119px, transparent 119px 178px, rgba(212,175,55,0.04) 178px 179px, transparent 179px 268px, rgba(212,175,55,0.03) 268px 269px)` (concentric rings). Animation: `beacon-breathe` — layer opacity 0.7↔1, 7s ease-in-out infinite. Center sits at 46% viewport height, just above the copy.

### Capabilities — circuit traces
SVG 1000×700, full-bleed (`inset:0; width/height:100%`), `slice`.
- Solid traces (`.trace`, stroke `rgba(212,175,55,0.10)`, width 1): `M 0 140 H 220 V 240 H 420`; `M 1000 90 H 700 V 210 H 520`; `M 0 560 H 160 V 470 H 360`; `M 1000 610 H 760 V 500 H 600`.
- Dashed traces (`.dash`, dasharray `1 6`, same stroke): `M 300 700 V 560 H 480`; `M 640 0 V 120 H 800`.
- Via dots (`.via`, fill `rgba(245,213,71,0.14)`): 16 circles r=3 at every trace vertex (coordinates in prototype).
- Static — no animation.

### Projects — constellation
SVG 1000×700, full-bleed, `slice`.
- Sight-lines (`.line`, stroke `rgba(212,175,55,0.07)`, width 1): seven paths connecting the star nodes (exact `d` values in prototype).
- Regular stars (`.star`, fill `rgba(212,175,55,0.35)`, r 3–4): 7 nodes.
- Bright stars (`.star.bright`, fill `rgba(212,175,55,0.7)`, r 4.5–5.5): 4 nodes at (300,210), (520,140), (760,240), (260,330).
- Static — no animation.

### Contact — landing pad
SVG 1000×700, full-bleed, `slice`.
- Descent guide (`.guide`, stroke `rgba(212,175,55,0.12)`, width 1, dasharray `3 9`): vertical line (500,0)→(500,280); four corner range-mark L-shapes inset 60px from each corner (140px arms).
- Crosshair (`.cross`, stroke `rgba(212,175,55,0.18)`): horizontal (430,350)→(570,350), vertical (500,280)→(500,420).
- Pad circles (`.pad`, stroke `rgba(212,175,55,0.25)`, width 1.2, fill none): r=46 and r=72 (inner opacity 1, outer 0.5) centered (500,350).
- Static — no animation. Content button sits visually as the "landing" the guide points to.

**Reduced motion:** all art layers still fade in (0.01ms transition clamp makes it instant) but drift/breathe keyframe animations are skipped — gate both behind `@media (prefers-reduced-motion: no-preference)`.

## Motion

All easing: `cubic-bezier(0.16, 1, 0.3, 1)` (`--transition-*` tokens already define this).

| Effect | Spec |
|---|---|
| Scene background fade-in | opacity 0→1, 600ms, on scene ≥50% visible (IntersectionObserver, threshold 0.5) |
| Scene content scrub-in | opacity 0→1 + translateX(∓60px→0), 800ms, same trigger; cards/rows alternate sides; keep `.in` state once entered (one-way, not scrub-linked) |
| Pulse dot | opacity 1↔0.5, 2.5s ease-in-out infinite |
| Card/row hover | border + background + shadow, 300ms (border-color 150ms) |
| Row arrow | opacity 0→1 + translateX(4px), 150ms |
| Depth bar | `scaleY(p)` on scroll, rAF-throttled |

**`prefers-reduced-motion: reduce`:** all animation/transition durations clamp to 0.01ms; scrub elements render at final state (opacity 1, no translate); parallax listener skips. Follow the existing `usePrefersReducedMotion` pattern in `ThreeCanvas.tsx`.

**Removal:** the fixed Three.js canvas (`ThreeCanvas.tsx`) and its globe/ring/stars are dropped from the landing. Keep the component file for potential reuse; remove its import from `App.tsx`. This removes the three/react-three-fiber runtime cost from the page.

## Design tokens

```
--color-bg:            #0A0A0A        page background
--color-bg-elevated:   #121212        focus overlay panel (unused here)
--color-bg-card:       rgba(255,255,255,0.01)
--color-bg-card-hover: rgba(255,255,255,0.03)
--color-border:        rgba(255,255,255,0.04)
--color-border-hover:  rgba(255,255,255,0.10)
--color-text:          #E5E5E5        body (lead uses muted below)
--color-text-muted:    #A1A1AA        lead paragraphs, descriptions
--color-text-subtle:   #71717A        eyebrows, numbers, ALT label
--color-text-inverse:  #0A0A0A        text on gold buttons
--color-accent:        #D4AF37        gold — buttons, glyphs, dots, arrows, altitude value
--color-accent-hover:  #C5A02C
--color-accent-glow:   rgba(212,175,55,0.15)
--color-accent-subtle: rgba(212,175,55,0.08)
```

Type: Playfair Display 500 (headings, `#FFFFFF`), Inter 300 body / 400 UI / 500 buttons, JetBrains Mono 10px eyebrows (tracking 0.3em uppercase), 11px numbers, 24px 300 glyphs (gold).

Spacing: section content max-width 896px; scene padding 96px top / 24px sides; heading→grid 48px; grid gap 24px; card padding 24px (prototype uses 24; existing site cards use 20 — match existing `Card` component's 20px if reused).

Radii: cards 16px, buttons 8px, pills/dots 9999px.

Shadows: card hover `0 0 30px rgba(212,175,55,0.06)`; button hover `0 0 30px rgba(212,175,55,0.15)`; rail dot glow `0 0 12px rgba(212,175,55,0.15)`.

## Assets

No images, no icon files, no font files. Fonts load from Google Fonts (already in the site). Backgrounds are pure CSS/SVG-data-URI. Mono glyphs come from `site.features[].icon` config. Brand SVG social icons (simpleicons) are NOT used in this landing design.

## Files

| File | Corresponds to |
|---|---|
| `scroll-narrative.html` | Full-page design reference for all five scenes + HUD + motion (self-contained; open in browser) |
| `colors_and_type.css` | Design-system token reference (source of truth for values; matches `src/index.css` `@theme`) |

## Implementation notes

- `100dvh` for scene heights (prototype uses 100vh — fix for mobile URL bar).
- Keep `ScrollReveal` for content reveal if its behavior (0.8s, y 40px) is preserved; the scrub translateX alternation is new — add a direction prop or new hook rather than duplicating.
- The map room section (`#map-room`) is not part of the five scenes. Either insert it as a sixth scene between Projects and Contact (same pattern, `bg-tech-image` variant, "03.5 · map room" eyebrow renumbering to 04/05) or keep it as a normal scrolling section after the narrative — implementer's choice, flag in PR.
- Nav: prototype has none. Keep the site's existing header if present, or add minimal fixed nav matching the rail anchors. Flag in PR.
- Footer: existing `Footer` component stays after scene 5.
