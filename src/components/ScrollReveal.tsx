'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'motion/react'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  triggerHook?: number
  delay?: number
  duration?: number
  y?: number
  opacity?: number
  stagger?: number
}

export function ScrollReveal({
  children,
  className = '',
  triggerHook = 0.85,
  delay = 0,
  duration = 0.8,
  y = 40,
  opacity = 0,
  stagger = 0.1
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    // Reduced motion: skip the tween entirely and leave the children in their
    // natural (fully visible) state. Bailing before gsap.set matters — that
    // set is what hides them, so a bail after it would strand content at
    // opacity 0. Motion here is decoration; the content is the message.
    if (reduced) return

    const ctx = gsap.context(() => {
      const elements = containerRef.current?.querySelectorAll('[data-reveal]')
      if (!elements?.length) return

      gsap.set(elements, { opacity, y })

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top ${triggerHook * 100}%`,
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [triggerHook, delay, duration, y, opacity, stagger, reduced])

  return (
    <div ref={containerRef} className={className}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<Record<string, unknown>>, { 'data-reveal': true } as Record<string, unknown>)
          : child
      )}
    </div>
  )
}
