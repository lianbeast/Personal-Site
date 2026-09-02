# Unified Code Review Report

**Target:** Modified/new React components in Personal Site  
**Files Reviewed:** ContactSection, FeaturesSection, Hero, ThreeCanvas, Card, Eyebrow, SocialLinks, Background, ScrollReveal, config, hooks, lib  
**Review Date:** 2026-09-02

---

## Executive Summary

| Dimension | Score | Status |
|-----------|-------|--------|
| Architecture | 8.5/10 | ✅ Good |
| Security | 9/10 | ✅ Strong |
| Performance | 8/10 | ✅ Good |
| Style | 8.5/10 | ✅ Good |
| **Overall** | **8.5/10** | **Production-ready with minor fixes** |

The codebase is well-structured for a personal portfolio site. No critical issues found. Four important findings and several suggestions across dimensions.

---

## Critical Findings (Must Fix Before Merge)

**None** — No blocking issues.

---

## Important Findings (Should Fix)

### 1. Security: SocialLinks footer variant missing `rel="noopener noreferrer"`
**File:** `src/components/SocialLinks.tsx:58-71`  
**Severity:** Important  
**Impact:** External links in footer variant lack `noopener noreferrer`, allowing `window.opener` access.  
**Fix:** Add `target={href.startsWith('mailto') ? undefined : '_blank'}` and `rel="noopener noreferrer"` to footer variant links (matching inline/stacked variants).

### 2. Architecture/Style: SocialLinks hardcoded ITEMS duplicates config
**Files:** `src/components/SocialLinks.tsx:10-15`, `src/config.ts:19-24`  
**Severity:** Important  
**Impact:** Link configuration duplicated — changes to `site.links` require updates in two places.  
**Fix:** Derive ITEMS from `site.links` dynamically:
```typescript
const ITEMS = Object.entries(site.links).map(([key, href]) => ({
  key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
  href,
})) as const
```

### 3. Style: ContactSection hardcoded strings not in config
**File:** `src/components/ContactSection.tsx:12-20`  
**Severity:** Important  
**Impact:** "contact", headline, subtext not centralized — inconsistent with Hero/Features/Projects/Testimonials.  
**Fix:** Add `contact` section to `config.ts` and reference it.

### 4. Performance: ThreeCanvas reduced-motion ref doesn't trigger re-render
**File:** `src/components/ThreeCanvas.tsx:22, 78`  
**Severity:** Important  
**Impact:** `usePrefersReducedMotion` returns a ref; when preference changes, star count (600 vs 1800) doesn't update.  
**Fix:** Convert hook to return state:
```typescript
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}
```

---

## Suggestions (Nice to Have)

### Architecture
- **Background variant exhaustiveness**: Add runtime assertion or test for `BackgroundVariant` coverage in `Background.tsx:21`
- **Card variant enum**: Consider `variant: 'default' | 'featured' | 'static'` instead of two booleans if more states emerge
- **ScrollReveal memoization**: Memoize animation config to avoid unnecessary GSAP context teardown/recreate

### Performance
- **ThreeCanvas DPR**: Consider `dpr={[1, 1.5]}` or `Math.min(window.devicePixelRatio, 1.5)` for battery savings on mobile
- **ThreeCanvas memoization**: Wrap `Globe`, `Ring` in `React.memo` (though Fiber reconciles efficiently)

### Security
- **GitHub API rate limits**: Add caching or authenticated requests for production deployment
- **Config placeholders**: Replace placeholder LinkedIn/X/email URLs before production
- **Dependency audit**: Run `npm audit` periodically for GSAP, Three.js, React Three Fiber

### Style
- **ThreeCanvas import ordering**: Group React imports together, then third-party alphabetically
- **Consistent config usage**: Ensure all sections follow the config-driven pattern

---

## Strengths (What's Done Well)

✅ **Component boundaries** — Single responsibility, clean composition (Hero→SocialLinks, Features→Card+Eyebrow)  
✅ **TypeScript discipline** — No `any`, proper generics, discriminated unions, exhaustiveness where applicable  
✅ **Config-driven content** — Almost all copy centralized in `config.ts` (except ContactSection)  
✅ **CSS-variable theming** — Consistent `var(--color-*)` usage enables easy theming/dark mode  
✅ **Accessibility** — Semantic HTML, `aria-hidden` on decorative elements, proper `rel` on external links  
✅ **Reduced motion support** — Hook pattern respects `prefers-reduced-motion` (fix ref issue above)  
✅ **CSS-first backgrounds** — Zero JS cost, GPU-accelerated via compositor  
✅ **Low-power WebGL** — `powerPreference: 'low-power'` set on Canvas  
✅ **Code splitting ready** — Vite + React 19, no circular dependencies  
✅ **Error boundaries** — ProjectsSection gracefully falls back to config projects on API failure  
✅ **Documentation** — Inline comments explain non-obvious decisions (e.g., Hero line 5)

---

## Recommended Fix Priority

1. **SocialLinks footer `noopener`** (Security) — 5 min fix
2. **ContactSection → config** (Style/Architecture) — 10 min fix
3. **SocialLinks dynamic ITEMS** (Architecture) — 10 min fix
4. **ThreeCanvas reduced-motion state** (Performance) — 10 min fix
5. **ThreeCanvas DPR optimization** (Performance) — 5 min fix
6. **Background exhaustiveness test** (Architecture) — 15 min
7. **GitHub API caching** (Security) — 30 min (optional, fallback exists)
8. **Config placeholder replacement** (Security) — 5 min (pre-deploy)

---

## Files to Modify

| File | Changes Needed |
|------|----------------|
| `src/components/SocialLinks.tsx` | Fix footer variant rel, derive ITEMS from config |
| `src/components/ContactSection.tsx` | Move strings to config |
| `src/config.ts` | Add contact section, verify all links |
| `src/components/ThreeCanvas.tsx` | Fix usePrefersReducedMotion to use state, adjust DPR |
| `src/components/Background.tsx` | Add exhaustiveness test (optional) |
| `src/components/Card.tsx` | Consider variant enum (future) |

---

## Verification Checklist

- [ ] All external links have `rel="noopener noreferrer"` (all variants)
- [ ] ContactSection uses config for all strings
- [ ] SocialLinks derives links from config dynamically
- [ ] ThreeCanvas re-renders on reduced-motion change
- [ ] ThreeCanvas DPR capped at 1.5x
- [ ] Config placeholders replaced with real URLs
- [ ] `npm audit` passes (no high/critical CVEs)
- [ ] Build passes: `npm run build`
- [ ] Preview works: `npm run preview`

---

*Report generated by multi-agent code review harness (architecture, security, performance, style reviewers)*