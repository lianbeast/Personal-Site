# Architecture Review

## Scope
Modified/new components: ContactSection, FeaturesSection, Hero, ThreeCanvas, Card, Eyebrow, SocialLinks

## Findings

### Critical
None

### Important

**1. ThreeCanvas: Tight coupling to Three.js scene graph structure**
- File: `src/components/ThreeCanvas.tsx`
- The Globe and Ring components are co-located but tightly bound to specific Three.js patterns
- Consider extracting scene primitives to a separate file if reused elsewhere
- Current approach: acceptable for single-use, but limits testability

**2. Background component: String-based variant matching**
- File: `src/components/Background.tsx:21`
- Uses `variantClasses[variant] || ''` with no TypeScript exhaustiveness check
- If `BackgroundVariant` type expands, missing entries silently fall back to empty string
- Recommendation: Use `Record<BackgroundVariant, string>` with explicit exhaustiveness (already done) but add runtime assertion or test

**3. SocialLinks: Hardcoded ITEMS array couples component to config shape**
- File: `src/components/SocialLinks.tsx:10-15`
- ITEMS array maps directly to `site.links` but duplicates key names
- If config adds/removes links, both places must be updated
- Recommendation: Derive ITEMS from `site.links` dynamically, or accept items as prop

### Suggestions

**4. ScrollReveal: GSAP context cleanup pattern is correct but could leak if children change**
- File: `src/components/ScrollReveal.tsx:32-56`
- `gsap.context(() => {...}, containerRef)` with `ctx.revert()` in cleanup is correct
- However, dependency array includes all animation params — changing any triggers full teardown/recreate
- Consider memoizing children or using `useMemo` for static configs

**5. Card component: Good separation but `featured`/`static` boolean flags could become enum**
- File: `src/components/Card.tsx:6-8`
- Two booleans create 4 states (2^2), some combinations may be invalid
- Consider `variant: 'default' | 'featured' | 'static' | 'featured-static'` if more states emerge

### Strengths

- **Clear component boundaries**: Each component has single responsibility
- **TypeScript usage**: Proper interfaces, no `any`, good generic usage in `useAsync`
- **Config-driven content**: `config.ts` centralizes all copy/data — excellent for maintenance
- **CSS-variable theming**: Consistent use of `var(--color-*)` throughout — enables easy theming
- **Accessibility**: `aria-hidden`, `rel="noopener noreferrer"`, semantic HTML used correctly
- **Reduced motion support**: `usePrefersReducedMotion` hook in ThreeCanvas respects user preference
- **Code splitting ready**: All components are standalone with no circular dependencies

## Architecture Score: 8.5/10
Well-structured for a personal site. Minor coupling issues in SocialLinks/Background are the main concerns.