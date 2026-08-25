import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Globe() {
  const reduced = useReducedMotion()
  const wire = useRef<THREE.Mesh>(null)
  const shell = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (reduced) return
    if (wire.current) wire.current.rotation.y += delta * 0.08
    if (shell.current) shell.current.rotation.y -= delta * 0.05
    if (ring.current) ring.current.rotation.z += delta * 0.15
  })

  return (
    <group>
      {/* faint solid core */}
      <mesh>
        <sphereGeometry args={[2.55, 32, 32]} />
        <meshBasicMaterial color="#0e7490" transparent opacity={0.14} />
      </mesh>

      {/* main wireframe globe */}
      <mesh ref={wire}>
        <sphereGeometry args={[2.6, 36, 36]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.45} />
      </mesh>

      {/* slow counter-rotating outer shell */}
      <mesh ref={shell}>
        <sphereGeometry args={[2.95, 24, 24]} />
        <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.12} />
      </mesh>

      {/* equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.15, 0.015, 8, 120]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
      </mesh>

      {/* tilted slow-spinning ring */}
      <mesh ref={ring} rotation={[Math.PI / 2.35, 0.4, 0]}>
        <torusGeometry args={[3.65, 0.008, 8, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </mesh>

      {/* holographic dust */}
      <Sparkles count={40} scale={[9, 5, 9]} size={1.5} speed={0.35} opacity={0.45} color="#67e8f9" />
    </group>
  )
}
