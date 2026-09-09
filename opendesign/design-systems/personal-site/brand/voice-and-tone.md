# Voice & Tone — Personal Site

## Brand Voice
**Builder · Dreamer · Explorer** — technical depth with wonder. Not corporate. Not overly casual. Precise but warm.

## Principles

| Dimension | Approach |
|-----------|----------|
| **Technical depth** | Show the craft. Name the tools (React Three Fiber, GeoLibre, DuckDB-WASM). Assume reader knows code. |
| **Wonder** | Space metaphors (Map Room, orbit, globe, nebula). Small delighters (pulse dot, float, parallax). |
| **Conciseness** | Short sentences. One idea per line. No fluff. |
| **Humility** | "open for commissions" not "hire me". "Let's build something together" not "Contact us for solutions". |
| **Person-first** | "I build" not "We deliver". First person throughout. |

## Casing Rules

| Element | Case | Example |
|---------|------|---------|
| Eyebrow / section labels | UPPERCASE + tracking-wide (0.3em) | `ABOUT`, `WHAT I DO`, `PROJECTS` |
| Headlines (h1, h2) | Sentence case | `I build things live on web.` |
| Body copy | Sentence case | `When I'm not shipping code...` |
| Button labels | Title Case | `View my work`, `Get in touch`, `Send me an email` |
| Feature icons (mono glyphs) | As typed in config | `<>`, `{ }`, `[ ]` |
| Social labels in footer | Title Case | `GitHub`, `LinkedIn`, `X`, `Email` |

## Punctuation

- **No periods** in eyebrow labels, button labels, social links
- **Periods** in body paragraphs, testimonials, descriptions
- **Ellipsis** (`…`) for truncated descriptions (`line-clamp-2`)
- **En dash** (`–`) for ranges in tech stack (not used currently)
- **Ampersands** in hero CTA row (`&` not used; "and" preferred)

## Numeric Formatting

| Type | Format | Example |
|------|--------|---------|
| Stars count | Raw number | `★ 247` |
| Time ago | Relative, rounded | `2h ago`, `5d ago`, `Jan 15` |
| Version numbers | SemVer as-is | `v0.1.0` |
| Stats in hero | Not used | — |

## Emoji Policy

- **Inline UI emoji**: None in copy. Feature cards use mono glyphs (`<>`, `{ }`, `[ ]`).
- **Pulse dot**: CSS-animated `div` (gold), not emoji.
- **External link indicator**: `↗` (U+2197) on repo card titles.
- **Decorative quote mark**: CSS `::before` with `"` in Playfair Display, gold, 0.08 opacity.
- **Never**: emoji as feature card icons, emoji in body text.

## Microcopy Patterns

| Context | Pattern |
|---------|---------|
| Loading | `syncing repos…` + warning pulse dot |
| Error | `GitHub unreachable — showing cached projects.` |
| Empty state | Not present (fallback to config projects) |
| External link | `Launch GeoLibre →` (right arrow entity) |
| Live badge | `live site` + gold pulse dot |
| Year in footer | Dynamic: `© {new Date().getFullYear()} {site.name}` |

## What the Brand Does NOT Say

- "Cutting-edge", "best-in-class", "industry-leading", "seamless", "robust"
- "We" (unless quoting testimonials)
- Marketing superlatives
- Passive voice