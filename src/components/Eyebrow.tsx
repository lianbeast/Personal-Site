import type { ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  className?: string
}

export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-[10px] tracking-[0.3em] text-[var(--color-text-subtle)] uppercase ${className}`}
    >
      {children}
   </p>
  )
}
