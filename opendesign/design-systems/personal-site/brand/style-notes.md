# Visual Foundations — Personal Site

## Color System

### Roles (not swatches)

| Role | Token | Value | Usage |
|------|-------|-------|-------|
| Canvas | `--surface-primary` | `#0A0A0A` | Page background, Three.js canvas bg |
| Elevated | `--surface-elevated` | `#121212` | Not used directly; available for modals |
| Card | `--surface-card` | `rgba(255,255,255,0.01)` | All content cards (projects, testimonials, features) |
| Card hover | `--surface-card-hover` | `rgba(255,255,255,0.03)` | Hover state on interactive cards |
| Primary text | `--text-primary` | `#E5E5E5` | Body copy, descriptions |
| Muted text | `--text-muted` | `#A1A1AA` | Secondary info (repo meta, timestamps) |
| Subtle text | `--text-subtle` | `#71717A` | Eyebrows, labels, footers |
| Heading | `--text-heading` | `#FFFFFF` | All h1–h3 |
| Accent | `--accent-1` | `#D4AF37` | Primary actions, globe wireframe, glyphs, links, pulse dots |
| Accent hover | `--accent-1-hover` | `#C5A02C` | Button hover, link hover |
| Accent glow | `--accent-1-glow` | `rgba(212,175,55,0.15)` | Shadow glow on primary buttons, card hover |
| Secondary accent | `--accent-2` | `#A1A1AA` | Ring in 3D scene, secondary glows |
| Border subtle | `--border-subtle` | `rgba(255,255,255,0.04)` | All card borders, section dividers |
| Border hover | `--border-hover` | `rgba(255,255,255,0.10)` | Card hover, focus states |
| Selection | `--surface-selection` | `rgba(212,175,55,0.08)` | `::selection` background |

### 3D Scene Colors (hardcoded in ThreeCanvas.tsx)

| Element | Value | Notes |
|---------|-------|-------|
| Globe wireframe | `#D4AF37` | opacity 0.32, slow rotation |
| Axis ring | `#A1A1AA` | opacity 0.45, torus geometry |
| Point light | `#D4AF37` | intensity 0.5, position [6,6,6] |
| Fog | `#0A0A0A` | near 6, far 14 |
| Stars | `#FFFFFF` | 1800 count, saturation 0, fade, speed 0.2 |

### Background Texture System (CSS-only, GPU-accelerated)

All in `src/index.css` as `.bg-*` utility classes:

| Variant | Class | Composition | Used In |
|---------|-------|-------------|---------|
| Star Field | `.bg-stars` | Radial gradients (white + gold tint), 850×250 repeat, opacity 0.4 | `TestimonialsSection` |
| Nebula Wisps | `.bg-nebula` | 3 elliptical radials (purple/blue/pink) | `AboutSection` |
| Blueprint Grid | `.bg-blueprint` | Cyan grid 40×40, opacity 0.03 | `FeaturesSection`, `Footer` |
| Film Grain | `.bg-noise` | `::after` with data-URI noise SVG, opacity 0.03 | Not currently used |
| Topographic | `.bg-contours` | Gold conic gradients, 400×400 repeat | `ProjectsSection` |
| Space | `.bg-space` | `--bg-1` + nebula `::before` | `ContactSection` |
| Tech Image | `.bg-tech-image` | Gold grid + cyan/gold radials | `MapRoomSection` |
| Space + Tech | `.bg-space-tech` | Stars + nebula + tech grid (layered `::before`/`::after`) | `Hero` |

**Background switching**: `Background` component takes `variant` prop, renders absolute inset div with parallax (`translateY = scrollY * 0.15`, rAF-throttled). Respects `prefers-reduced-motion`.

## Typography

### Font Stack
- **Display**: Playfair Display (serif) — headings, quotes
- **Body**: Inter — all body copy, UI labels
- **Mono**: JetBrains Mono — eyebrows, feature glyphs, code snippets, timestamps

Loaded via Google Fonts (not bundled).

### Scale (actual component usage)

| Token | Size/Line | Weight | Tracking | Used For |
|-------|-----------|--------|----------|----------|
| `--h1` | clamp(36px,7vw,72px)/1.05 | 500 | tight | Hero headline |
| `--h2` | clamp(24px,4vw,30px)/1.3 | 500 | tight | Section h2 (About, Projects, Contact, Map Room) |
| `--h2-lg` | clamp(30px,5vw,48px)/1.2 | 500 | tight | Capabilities h2 |
| `--h3` | 14px/1.4 | 500 | 0.05em | Feature card titles, RepoCard names |
| `--body` | 16px/1.625 | 300 | normal | Hero sub, About paragraphs, testimonials |
| `--body-sm` | 14px/1.625 | 400 | normal | Feature descriptions, button labels |
| `--caption` | 11px/1.5 | 400 | normal | Repo meta, sync status |
| `--eyebrow` | 10px/1.4 | 400 | 0.3em uppercase | All section labels, social inline, footer copyright |
| `--glyph` | 24px | 300 | normal | Feature card mono icons (`<>`, `{ }`, `[ ]`) |

### Usage Rules
- Headings: Display font, pure white (`#FFFFFF`), never accent color
- Body: Inter light (300) for hero/intro, regular (400) for UI
- Eyebrows: Always uppercase, mono, tracking 0.3em, subtle color
- Links: Accent gold, hover to accent-hover
- Buttons: Primary = accent bg + inverse text; Secondary = transparent + border

## Spacing

Scale from Tailwind utilities observed in components:
- Section vertical padding: `py-24` (96px) → `py-32` (128px) on ≥640px
- Container max-width: `max-w-4xl` (896px) for content, `max-w-3xl` (768px) for narrow
- Card padding: `p-5` (20px) default, `p-6` (24px) featured
- Gaps: `gap-4` (16px), `gap-6` (24px), `gap-8` (32px)
- Eyebrow→heading: `mt-4` (16px)
- Heading→body: `mt-6` (24px) or `mt-8` (32px)
- Section→grid: `mt-12` (48px)

## Motion

### Transitions
- **Fast** (150ms): border color, text color on hover
- **Base** (300ms): transform, box-shadow, background on card hover; button transitions
- **Slow** (500ms): Not used in components; reserved

Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo) — all CSS transitions.

### Scroll-Reveal (GSAP)
- Trigger: element top at 85% viewport
- Animation: `opacity 0→1`, `y 40px→0`, duration 0.8s, ease `power3.out`
- Stagger: 0.08–0.1s per item in grids
- Toggle: `play none none reverse` (reverses on scroll up)

### Parallax (GSAP)
- Background layers: `yPercent = speed * 100`, scrub 1, speed default 0.3
- CSS parallax (Background component): `translateY = scrollY * 0.15`, rAF

### Ambient Animations (CSS)
- **Float**: `translateY 0→-8px→0`, 4s ease-in-out infinite
- **Pulse dot**: `opacity 1→0.5→1`, 2.5s ease-in-out infinite (gold dot on hero badge, live badges, sync status)

### Three.js Motion
- Globe rotation: `y += 0.02 * delta`, `x += 0.008 * delta` (slow drift)
- OrbitControls: drag to rotate, damping 0.08, no autoRotate, zoom/pan disabled
- Stars: slow drift `speed={0.2}`, fade

### Reduced Motion
All motion respects `prefers-reduced-motion: reduce`:
- CSS: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }` (implied)
- GSAP: checks `matchMedia`, skips ScrollTrigger/Parallax
- Background: skips parallax listener
- Three.js: skips globe rotation, reduces star count 1800→600

## Borders & Radii

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Not used |
| `--radius-md` | 8px | Buttons (rounded-md) |
| `--radius-lg` | 12px | Not used |
| `--radius-xl` | 16px | All cards (rounded-xl), section containers |
| `--radius-full` | 9999px | Hero badge pill, pulse dots |

Border width: 1px (Tailwind `border`). Color: `--border-subtle` default, `--border-hover` on hover, `--accent-1` on active hover.

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card` | `0 4px 20px rgba(0,0,0,0.5)` | Default card elevation |
| `--shadow-card-hover` | `0 8px 30px rgba(0,0,0,0.7)` | Not directly used; hover uses custom glow |
| `--shadow-glow` | `0 0 30px rgba(212,175,55,0.15)` | Primary button hover |
| `--shadow-glow-secondary` | `0 0 30px rgba(161,161,170,0.15)` | Not used |
| **Card hover** | `0 0 30px rgba(212,175,55,0.06)` | Custom inline on `.card-hover:hover`, RepoCard, testimonials |

## Iconography

### Mono Glyphs (feature cards, from config)
- `<>` — Frontend Engineering
- `{ }` — Creative Development
- `[ ]` — Geospatial & GIS
- Rendered in JetBrains Mono, 24px, light, gold (`--accent-1`)

### Social Icons (simpleicons.org CDN)
| Platform | SimpleIcons slug | Color |
|----------|------------------|-------|
| GitHub | `github` | `#FFFFFF` (opacity 0.7) |
| LinkedIn | `linkedin` | `#FFFFFF` |
| X | `x` | `#FFFFFF` |
| Email | `maildotru` | `#FFFFFF` |

Inline variant: 16×16 (`h-4 w-4`), footer: same size.
Hover: text color transitions to accent.

### Decorative Elements
- **Pulse dot**: CSS `div`, 6×6 (`h-1.5 w-1.5`), rounded-full, gold bg, `pulse-dot` animation
- **Scroll indicator**: 1px wide vertical gradient `bg-gradient-to-b from-[var(--color-accent)] to-transparent`, height 48px (`h-12`)
- **Quote mark**: CSS `::before`, Playfair Display, 4em, gold, opacity 0.08, negative margin
- **External link arrow**: `↗` (U+2197) on repo card titles
- **Launch arrow**: `→` (`&rarr;`) on Map Room "Launch GeoLibre"

## Card Pattern

```tsx
// Base card (Card component)
<div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
  {/* featured: p-6 */}
</div>

// Interactive card (Card component with hover, or inline in RepoCard/testimonials)
<div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5
  transition-all duration-300
  hover:border-[var(--color-accent)]
  hover:bg-[var(--color-bg-card-hover)]
  hover:shadow-[0_0_30px_rgba(212,175,55,0.06)]">
</div>

// Static card (no hover lift)
<div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5">
</div>
```

## Layout Grid

- Hero: centered, `max-w-4xl`, `px-6`, full viewport height (`min-h-[100dvh]`)
- Sections: `px-6`, `max-w-4xl` (content), `max-w-3xl` (narrow: About, Contact)
- Grids:
  - Features: `grid gap-6 sm:grid-cols-2 lg:grid-cols-3`
  - Testimonials: `grid gap-6 sm:grid-cols-3`
  - Projects: `grid gap-4 sm:grid-cols-2`
- Footer: `flex sm:flex-row`, centered, `gap-4`

## Accessibility Notes

- All background layers: `aria-hidden="true"`, `pointer-events: none`
- Three.js canvas: `pointer-events: none`, `aria-hidden="true"`, fixed `-z-10`
- Focus visible: Not explicitly styled; relies on browser default + border hover
- `prefers-reduced-motion` respected throughout
- Semantic HTML: `section`, `header`, `footer`, `blockquote`, `article` (repo cards)
- Images: social icons have `alt="" aria-hidden="true"`, `loading="lazy"`
- Iframe: `title="GeoLibre map"`, `allow="fullscreen; geolocation"`

## What's NOT in This System (intentionally)

- No form components (no forms on site)
- No modal/dialog patterns
- No navigation bar (single-page scroll)
- No table components
- No tooltip/popover
- No avatar/badge/chip components
- No pagination
- No data visualization beyond repo language dots