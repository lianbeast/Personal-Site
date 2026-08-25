import { useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface OrbitingCardProps {
  radius: number
  height: number
  speed: number
  phase: number
  children: ReactNode
}

export function OrbitingCard({ radius, height, speed, phase, children }: OrbitingCardProps) {
  const reduced = useReducedMotion()
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime * speed + phase
    const bob = reduced ? 0 : Math.sin(state.clock.elapsedTime * 1.1 + phase) * 0.12
    group.current.position.set(Math.cos(t) * radius, height + bob, Math.sin(t) * radius)
  })

  return (
    <group ref={group}>
      <Html center distanceFactor={10} zIndexRange={[40, 0]} style={{ pointerEvents: 'auto', width: 300 }}>
        {children}
      </Html>
    </group>
  )
}
