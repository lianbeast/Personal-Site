# Personal Site Design System

Design tokens and visual language extracted from the personal site at `/home/arch/Applications/Play-Site/Personal-Site`.

## Quick Reference

| Category | Token File | Brand Docs |
|----------|------------|------------|
| Colors, type, spacing, motion, shadows, radii | `tokens/colors_and_type.css` | `brand/style-notes.md` |
| Voice, tone, casing, punctuation | — | `brand/voice-and-tone.md` |

## Token Import

```css
@import './opendesign/design-systems/personal-site/tokens/colors_and_type.css';
```

All tokens defined on `:root`. Raw tokens (e.g. `--bg-1`, `--accent-1`) and semantic tokens (e.g. `--surface-primary`, `--text-primary`, `--h1`, `--card-bg`).

## Visual Identity

- **Canvas**: `#0A0A0A` (near-black)
- **Accent**: `#D4AF37` (gold) — primary actions, globe wireframe, glyphs, links
- **Secondary**: `#A1A1AA` (silver) — 3D ring, subtle glows
- **Typography**: Playfair Display (display) / Inter (body) / JetBrains Mono (UI, code)
- **Backgrounds**: 8 CSS-only GPU textures (stars, nebula, blueprint, noise, contours, space, tech, space+tech) with scroll parallax
- **3D**: Three.js wireframe globe + axis ring + starfield, drag to rotate, respects reduced motion
- **Motion**: GSAP scroll-reveal (0.8s, power3.out), parallax, CSS float/pulse, 300ms base transitions

## Folder Structure

```
opendesign/design-systems/personal-site/
├── SKILL.md                    # Portable skill marker
├── README.md                   # This file
├── tokens/
│   └── colors_and_type.css     # Canonical token file (raw + semantic)
├── brand/
│   ├── voice-and-tone.md       # Writing style, casing, punctuation, microcopy
│   └── style-notes.md          # Visual foundations: color roles, type scale, spacing, motion, backgrounds, iconography, card pattern, layout, a11y
├── assets/
│   ├── logos/                  # (empty — no local logo files)
│   ├── icons/                  # (empty — social icons from simpleicons.org CDN)
│   └── imagery/                # (empty — all backgrounds CSS-generated)
├── fonts/                      # (empty — fonts loaded via Google Fonts)
└── ui-kit-personal-site/       # (future — React component recreations)
```

## Sources Consulted

| File | Purpose |
|------|---------|
| `src/index.css` | Tailwind v4 `@theme` block — all raw color, font, spacing, shadow, radius, transition tokens; background texture classes |
| `src/components/Hero.tsx` | Hero typography, badge, CTA buttons, scroll indicator, social links inline |
| `src/components/AboutSection.tsx` | Section structure, eyebrow, h2, body |
| `src/components/FeaturesSection.tsx` | Feature grid, mono glyphs, Card component usage |
| `src/components/ProjectsSection.tsx` | Repo cards, language colors, live badges, fallback, loading/error states |
| `src/components/TestimonialsSection.tsx` | Quote cards, quote mark decoration |
| `src/components/ContactSection.tsx` | Primary/secondary buttons, stacked social links |
| `src/components/MapRoomSection.tsx` | Iframe embed, tech background, launch link |
| `src/components/Footer.tsx` | Copyright, footer social links, blueprint background |
| `src/components/Card.tsx` | Reusable card pattern (featured/static/hover) |
| `src/components/Eyebrow.tsx` | Eyebrow component (mono, uppercase, tracking) |
| `src/components/SocialLinks.tsx` | Inline/stacked/footer variants, simpleicons CDN |
| `src/components/Background.tsx` | 8 background variants, CSS parallax (scrollY × 0.15), reduced motion |
| `src/components/ScrollReveal.tsx` | GSAP ScrollTrigger reveal (0.8s, power3.out, stagger), Parallax component |
| `src/components/ThreeCanvas.tsx` | Globe, ring, stars, OrbitControls, point light, fog, reduced motion |
| `src/config.ts` | All content: name, tagline, hero, about, features, testimonials, projects, links, feeds, GeoLibre config |
| `src/types/background.ts` | Background variant type + descriptions |

## Confidence & Gaps

### High Confidence
- All color tokens (direct from `@theme` + component usage)
- Typography scale (measured from component classNames)
- Spacing scale (from Tailwind utilities in components)
- Motion tokens (from CSS + GSAP configs + Three.js)
- Background system (complete in CSS + Background component)
- Card pattern (Card component + inline variants)
- Iconography (mono glyphs from config, social from simpleicons CDN)
- Voice/tone (readable from config.ts copy)

### Uncertain / Not Captured
- **Font files**: Not bundled — loaded via Google Fonts. No local `.woff2` to copy.
- **Logo assets**: No logo SVG/PNG in repo. Brand is text-only ("Lian Beast").
- **UI kit components**: Not built — would need React component recreations in `ui-kit-personal-site/`
- **Language color map**: Captured as raw tokens (`--lang-*`), but not semantic
- **RSS/feed integration**: Not part of visual system
- **GeoLibre embed**: External, not styled by this system

### Decisions to Confirm

1. **Design system name**: `personal-site` — matches repo. OK?
2. **Scope**: Tokens + brand docs only (no UI kit components yet). Expand to component kit?
3. **Font bundling**: Keep as Google Fonts references, or download `.woff2` to `fonts/` for offline?
4. **SimpleIcons**: Reference CDN URLs in style-notes, or download SVGs to `assets/icons/`?
5. **3D scene tokens**: Globe/ring colors hardcoded in ThreeCanvas.tsx — captured as raw tokens (`--scene-globe`, `--scene-ring`). Should they be semantic?
6. **Background variants**: 8 variants documented. Are all needed, or prune to core 4?

## Next Steps (if requested)

- Build `ui-kit-personal-site/` with React component recreations (Card, Eyebrow, SocialLinks, Background, ScrollReveal, ThreeCanvas wrapper)
- Create `index.html` showcase page assembling Hero + sections
- Add sample slides if deck template needed
- Download font files for offline `fonts/`
- Download social SVGs to `assets/icons/`