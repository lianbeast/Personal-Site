'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

  useEffect(() => {
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
  }, [triggerHook, delay, duration, y, opacity, stagger])

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

interface ParallaxProps {
  children: React.ReactNode
  className?: string
  speed?: number
  yPercent?: number
}

export function Parallax({ children, className = '', speed = 0.3, yPercent = 0 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return

      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [speed, yPercent])

  return <div ref={ref} className={className}>{children}</div>
}