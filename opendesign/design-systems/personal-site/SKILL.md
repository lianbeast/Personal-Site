---
name: personal-site
description: Personal site design system — dark minimalist aesthetic with gold accent, CSS-only backgrounds, parallax, globe interaction, mono glyphs + brand SVG icons. Extracted from /home/arch/Applications/Play-Site/Personal-Site.
---

# Personal Site Design System

This design system captures the visual language of the personal site: a dark minimalist portfolio with a Three.js globe, CSS-only background textures, scroll-driven parallax, and mono-glyph UI icons.

## Sources
- Source repo: `/home/arch/Applications/Play-Site/Personal-Site`
- Primary CSS: `src/index.css` (Tailwind v4 @theme tokens)
- Components: `src/components/*.tsx`
- Config: `src/config.ts` (content, links, projects, testimonials)
- 3D: `src/components/ThreeCanvas.tsx` (globe, ring, stars)
- Backgrounds: `src/components/Background.tsx` + `src/index.css` (`.bg-*` classes)

## Token file
Canonical tokens at `tokens/colors_and_type.css` — raw + semantic variables.

## Usage
Import in CSS:
```css
@import './opendesign/design-systems/personal-site/tokens/colors_and_type.css';
```

## Contents
- `tokens/colors_and_type.css` — all color, type, spacing, motion, shadow, radius tokens
- `brand/voice-and-tone.md` — writing style, casing, punctuation
- `brand/style-notes.md` — visual foundations, backgrounds, motion, iconography
- `assets/` — copied brand assets (icons, logos if any)
- `fonts/` — font files (not bundled; loaded via Google Fonts / system)
- `ui-kit-personal-site/` — React component recreations (future)