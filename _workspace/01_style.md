# Style Review

## Scope
Modified/new components: ContactSection, FeaturesSection, Hero, ThreeCanvas, Card, Eyebrow, SocialLinks

## Findings

### Critical
None

### Important

**1. ThreeCanvas: Inconsistent import ordering**
- File: `src/components/ThreeCanvas.tsx:1-4`
- Imports: `useEffect`, `useRef` from React, then `@react-three/fiber`, `@react-three/drei`, `three`
- Standard: React imports first, then third-party, then local
- Current: React imports split (line 1 and 4 has `import * as THREE from 'three'`)
- Fix: Group React imports together, then third-party alphabetically

**2. ContactSection: Hardcoded strings in JSX instead of config**
- File: `src/components/ContactSection.tsx:12-20`
- "contact", "Let's build something together.", "Got an idea..." — not in `config.ts`
- Other sections (Hero, Features, Projects, Testimonials) use `site` config
- Inconsistency: ContactSection should follow same pattern for maintainability
- Recommendation: Add `contact` section to `config.ts`

**3. SocialLinks: Duplicate link configuration**
- File: `src/components/SocialLinks.tsx:10-15` vs `src/config.ts:19-24`
- ITEMS array duplicates `site.links` keys and URLs
- Violates DRY — if config changes, component must also change
- Fix: Derive ITEMS from `site.links` dynamically

### Suggestions

**4. FeaturesSection: Good use of new Card/Eyebrow components**
- File: `src/components/FeaturesSection.tsx:5, 21`
- Imports and uses `Card` and `Eyebrow` — consistent with component library approach
- `Card featured` prop used appropriately
- No style issues

**5. Hero: Good extraction of SocialLinks**
- File: `src/components/Hero.tsx:3, 44`
- Uses shared `SocialLinks` component with `variant="inline"`
- Comment on line 5 documents the pattern — good practice

**6. Card: Clean component API with sensible defaults**
- File: `src/components/Card.tsx`
- `featured` and `static` boolean props with defaults
- Spreads `...rest` for flexibility
- Uses CSS variables for theming — consistent
- Minor: `static` is reserved word, aliased as `isStatic` — correct

**7. Eyebrow: Minimal, focused component**
- File: `src/components/Eyebrow.tsx`
- Single purpose: styled eyebrow text
- Accepts `className` for overrides
- Good example of atomic component

**8. SocialLinks: Three variants handled clearly**
- File: `src/components/SocialLinks.tsx`
- `inline`, `stacked`, `footer` variants with distinct rendering
- Type-safe `Variant` union type
- Good: `as const` on ITEMS array for literal types

**9. Consistent formatting across all files**
- 2-space indentation, trailing commas, consistent quote style
- No obvious Prettier/ESLint violations
- TypeScript interfaces use PascalCase, props interfaces end in `Props`

**10. CSS variable usage consistent**
- All components use `var(--color-*)` tokens
- No hardcoded colors in component JSX
- Background variants map to CSS classes cleanly

### Strengths

- **Component composition**: Hero uses SocialLinks, Features uses Card+Eyebrow — good reuse
- **TypeScript discipline**: No `any`, proper generics, discriminated unions where needed
- **Config-driven**: Almost all copy in `config.ts` (except ContactSection)
- **Accessibility**: Semantic HTML, `aria-hidden` on decorative backgrounds, proper link rels
- **Reduced motion**: Hook pattern in ThreeCanvas is reusable
- **Documentation**: Inline comments explain non-obvious decisions (e.g., Hero line 5)

## Style Score: 8.5/10
Main issues: ContactSection not using config, SocialLinks duplicating config, minor import ordering. Otherwise clean, consistent codebase.