/**
 * Section eyebrow: the small mono index label above a heading ("01 · about").
 *
 * The styling is shared by every section type — narrative scenes, the live
 * projects list, the map room — so it lives here rather than being re-typed as
 * a class string at each call site. Note the motion wrapper is *not* included:
 * the narrative scenes reveal it with KineticReveal, the scrolled sections use
 * ScrollReveal, and this stays pure markup both can wrap.
 */
export function Eyebrow({ children, className = '' }: { children: string; className?: string }) {
  return (
    <p
      className={`m-0 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-text-subtle)] ${className}`}
    >
      {children}
    </p>
  )
}
