import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: 1 | 2 | 3
}

export function FadeIn({ children, className = '', delay }: FadeInProps) {
  const { ref, visible } = useInView()
  const delayClass = delay ? `fade-in-delay-${delay}` : ''
  return (
    <div ref={ref} className={`fade-in ${visible ? 'visible' : ''} ${delayClass} ${className}`}>
      {children}
    </div>
  )
}
