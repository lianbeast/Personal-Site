'use client'

import React from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  /** How far into the viewport the trigger must be before reveal fires (0–1). */
  triggerHook?: number
  /** Delay before the first child starts (seconds). */
  delay?: number
  /** Duration of each child's reveal tween (seconds). */
  duration?: number
  /** Vertical offset at rest (px) — content slides up from this distance. */
  y?: number
  /** Opacity at rest. Set < 1 to fade in instead of slide. */
  opacity?: number
  /** Delay between consecutive children (seconds). */
  stagger?: number
}

/**
 * A single-reveal wrapper — children are revealed once when they enter the
 * viewport, then stay visible. `triggerHook` defaults to 0.85 so the reveal
 * fires near the top of the viewport rather than waiting for the element to
 * be fully on screen.
 *
 * Under prefers-reduced-motion the component renders children immediately
 * at full opacity — no tween, no spring, no requestAnimationFrame.
 *
 * Stagger is implemented with `initial` + `whileInView` + `transition:
 * { delay: index * stagger }`. A separate effect would race the spring
 * timeline against the stagger; the transition approach keeps both
 * properties declarative.
 */
export function ScrollReveal({
  children,
  className = '',
  triggerHook = 0.85,
  delay = 0,
  duration = 0.8,
  y = 40,
  opacity = 0,
  stagger = 0.1,
}: ScrollRevealProps) {
  const reduced = useReducedMotion()

  // Motion children must be wrapped in a single motion element for transition
  // delays to stack properly. Using a plain div and cloning children loses the
  // per-child transition delay.
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child

        return (
          <motion.div
            key={index}
            // `initial` must match the pre-animation state for `whileInView`
            // to animate from it. Without explicit `initial`, motion reuses
            // the current rendered state and the tween may be skipped.
            initial={reduced ? { opacity: 1 } : { opacity, y }}
            whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: triggerHook }}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: 'easeOut',
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}
