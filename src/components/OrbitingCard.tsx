import { useRef, useState, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Planet silhouette radius (equator ring). Cards fade out as the planet
// blocks them from the camera so they never draw on top of it.
const GLOBE_RADIUS = 3.2
const FADE_BAND = 0.9

interface OrbitingCardProps {
  radius: number
  height: number
  speed: number
  phase: number
  children: ReactNode
}

export function OrbitingCard({ radius, height, speed, phase, children }: OrbitingCardProps) {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const group = useRef<THREE.Group>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const angle = useRef(phase)

  useFrame((state) => {
    const g = group.current
    if (!g) return

    // Freeze the card in place while hovered (or reduced motion) so its
    // content can be read while the rest of the carousel keeps moving.
    if (!reduced && !hovered) {
      angle.current = state.clock.elapsedTime * speed + phase
    }
    const t = angle.current
    const bob = reduced || hovered ? 0 : Math.sin(state.clock.elapsedTime * 1.1 + phase) * 0.08

    const x = Math.cos(t) * radius
    const z = Math.sin(t) * radius
    const y = height + bob
    g.position.set(x, y, z)

    // Distance from the camera→card ray to the planet's center (camera at
    // [0, 0, 11]). Fade smoothly as the planet occludes the card.
    const dx = x
    const dy = y
    const dz = z - 11
    const len2 = dx * dx + dy * dy + dz * dz
    const s = len2 > 0 ? THREE.MathUtils.clamp(-(11 * dz) / len2, 0, 1) : 0
    const closest = Math.sqrt((s * dx) ** 2 + (s * dy) ** 2 + (11 + s * dz) ** 2)
    const alpha = THREE.MathUtils.clamp((closest - GLOBE_RADIUS) / FADE_BAND, 0, 1)

    g.visible = alpha > 0.01
    const el = overlay.current
    if (el) {
      el.style.opacity = String(alpha)
      el.style.pointerEvents = alpha > 0.5 ? 'auto' : 'none'
    }
  })

  return (
    <group ref={group}>
      <Html center distanceFactor={10} zIndexRange={[40, 0]} style={{ pointerEvents: 'none', width: 340 }}>
        <div
          ref={overlay}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ pointerEvents: 'auto' }}
        >
          {children}
        </div>
      </Html>
    </group>
  )
}
