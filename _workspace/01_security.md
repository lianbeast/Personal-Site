# Security Review

## Scope
Modified/new components: ContactSection, FeaturesSection, Hero, ThreeCanvas, Card, Eyebrow, SocialLinks

## Findings

### Critical
None

### Important

**1. SocialLinks: External links missing `rel="noopener noreferrer"` in footer variant**
- File: `src/components/SocialLinks.tsx:58-71`
- Footer variant (line 58-71) renders links without `rel="noopener noreferrer"` for non-mailto links
- Inline variant (line 25-26) correctly includes it
- Stacked variant (line 44-45) correctly includes it
- Risk: `window.opener` access on external sites — minor but should be consistent
- Fix: Add `target={href.startsWith('mailto') ? undefined : '_blank'}` and `rel="noopener noreferrer"` to footer variant

**2. ThreeCanvas: No Content Security Policy considerations for WebGL**
- File: `src/components/ThreeCanvas.tsx`
- WebGL canvas runs in-page; if CSP blocks `script-src 'self'`, inline workers or shaders may fail
- Not a vulnerability but a deployment consideration — ensure CSP allows WebGL contexts
- Current setup: `gl={{ alpha: true }}` — no obvious shader injection vectors

**3. ProjectsSection: GitHub API fetch without rate limit handling**
- File: `src/lib/github.ts:21-27`
- Uses unauthenticated `api.github.com` — 60 req/hour limit per IP
- If deployed to shared hosting/CDN, may hit limits
- Fallback to `site.projects` in config handles failure gracefully (ProjectsSection.tsx:65)
- Recommendation: Add caching or authenticated requests for production

### Suggestions

**4. config.ts: Placeholder links expose template structure**
- File: `src/config.ts:19-24`
- `linkedin`, `x`, `email` use placeholder URLs
- Not a security issue but information disclosure if deployed as-is
- Ensure real values replace placeholders before production deploy

**5. No input validation needed — no user inputs in reviewed components**
- All components are static display components
- No forms, no query params, no user-generated content
- XSS surface: minimal (only `dangerouslySetInnerHTML` absent, good)

**6. Dependency audit: Check GSAP, Three.js, React Three Fiber for CVEs**
- `gsap@^3.15.0` — check for known issues
- `@react-three/fiber@^9.1.0`, `@react-three/drei@^10.0.0`, `three@^0.178.0` — recent versions, generally safe
- Run `npm audit` periodically

### Strengths

- **No eval/dangerouslySetInnerHTML**: Clean React patterns throughout
- **External links properly secured**: Inline/stacked variants use `noopener noreferrer`
- **No secrets in code**: Config only contains public links
- **HTTPS enforced**: All external URLs use HTTPS (except mailto:)
- **CORS-safe API calls**: GitHub API is CORS-enabled, no proxy needed

## Security Score: 9/10
Minor inconsistency in SocialLinks footer variant is the only real finding. No vulnerabilities in reviewed code.