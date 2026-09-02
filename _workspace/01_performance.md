# Performance Review

## Scope
Modified/new components: ContactSection, FeaturesSection, Hero, ThreeCanvas, Card, Eyebrow, SocialLinks

## Findings

### Critical
None

### Important

**1. ThreeCanvas: Creates new Three.js scene on every render without memoization**
- File: `src/components/ThreeCanvas.tsx:53-99`
- Component returns new `<Canvas>` with new `<Globe>`, `<Ring>`, `<Stars>`, `<OrbitControls>` on every render
- React Three Fiber handles this via reconciliation, but no `React.memo` on child components
- Globe/Ring/Stars re-create geometries/materials on each parent render
- Fix: Wrap `Globe`, `Ring` in `React.memo` or move outside component (already at module level, good)
- Note: `<Canvas>` itself is a context provider — children are recreated but Fiber diffs efficiently

**2. ThreeCanvas: Stars count changes based on reduced motion — causes remount**
- File: `src/components/ThreeCanvas.tsx:75-83`
- `count={reduced.current ? 600 : 1800}` — `reduced.current` is a ref, not state
- When `reduced.current` changes, React doesn't re-render; Stars count stays at initial value
- `usePrefersReducedMotion` returns a ref, not state — component won't re-render on preference change
- Fix: Use `useState` + `useEffect` to trigger re-render, or accept `reduced` as prop from parent state

**3. ThreeCanvas: `dpr={[1, 2]}` renders at 2x on high-DPI — costly for WebGL**
- File: `src/components/ThreeCanvas.tsx:63`
- Renders at 2x device pixel ratio on retina displays
- For a background decorative canvas, this doubles GPU work
- Consider `dpr={[1, 1.5]}` or `dpr={Math.min(window.devicePixelRatio, 1.5)}` for balance
- Current: acceptable for modern GPUs, but impacts battery on mobile

**4. ScrollReveal: GSAP creates ScrollTrigger for each container — potential accumulation**
- File: `src/components/ScrollReveal.tsx:32-56`
- Each `ScrollReveal` instance creates a `gsap.context` with ScrollTrigger
- Multiple sections (Hero, Features, Projects, Testimonials, Contact) = 5+ triggers
- ScrollTrigger handles cleanup via `ctx.revert()` — correct
- Performance: negligible on desktop, check mobile scroll performance

**5. Background: CSS-only textures are performant — good**
- File: `src/index.css:164-270`
- All backgrounds use CSS gradients/SVG data URIs — no JS runtime cost
- GPU-accelerated via compositor
- No performance concerns

### Suggestions

**6. FeaturesSection: Maps over `site.features` creating Card components — fine for 6 items**
- File: `src/components/FeaturesSection.tsx:19-30`
- 6 features × Card = trivial render cost
- No virtualization needed

**7. Hero: Static content with SocialLinks — no performance issues**
- File: `src/components/Hero.tsx`
- All static, no animations except GSAP ScrollReveal
- ThreeCanvas is separate fixed background

**8. ContactSection: Static content — no performance issues**
- File: `src/components/ContactSection.tsx`
- Simple markup, no heavy operations

**9. Card/Eyebrow/SocialLinks: Trivial components — zero concerns**
- Pure presentational, no hooks, no heavy computation

### Strengths

- **CSS-first backgrounds**: Zero JS cost for visual effects
- **Reduced motion respected**: ThreeCanvas adapts star count (though ref issue above)
- **Low-power WebGL preference**: `powerPreference: 'low-power'` in Canvas config
- **Code splitting ready**: Vite + React 19 enables automatic chunking
- **No unnecessary re-renders**: Components are mostly static, minimal state

## Performance Score: 8/10
Main issues: ThreeCanvas DPR setting and reduced-motion ref not triggering re-render. Both are minor optimizations.