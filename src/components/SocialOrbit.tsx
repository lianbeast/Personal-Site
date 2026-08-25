import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

const DOTS = Array.from({ length: 12 }, (_, i) => ({
  angle: (i / 12) * Math.PI * 2,
  radius: 2.9 + (i % 3) * 0.35,
  height: -1.8 + (i % 5) * 0.9,
  size: 0.02 + (i % 3) * 0.015,
}))

/** Decorative glow dots orbiting the globe (the real links live in the identity bar). */
export function SocialOrbit() {
  const reduced = useReducedMotion()
  const group = useRef<THREE.Group>(null)

  const positions = useMemo(
    () => DOTS.map((d) => new THREE.Vector3(Math.cos(d.angle) * d.radius, d.height, Math.sin(d.angle) * d.radius)),
    [],
  )

  useFrame((_, delta) => {
    if (reduced || !group.current) return
    group.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={group}>
      {DOTS.map((d, i) => (
        <mesh key={i} position={positions[i]}>
          <sphereGeometry args={[d.size, 8, 8]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}
