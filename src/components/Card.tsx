import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Larger padding + featured shadow. Default: false. */
  featured?: boolean
  /** Removes hover lift. Useful inside grids that scroll-reveal. */
  static?: boolean
}

export function Card({ children, className = '', featured = false, static: isStatic = false, ...rest }: CardProps) {
  const padding = featured ? 'p-6' : 'p-5'
  const hover = isStatic
    ? ''
    : 'transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-bg-card-hover)] hover:shadow-[0_0_30px_rgba(212,175,55,0.06)]'
  return (
    <div
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] ${padding} ${hover} ${className}`}
      {...rest}
    >
      {children}
   </div>
  )
}
