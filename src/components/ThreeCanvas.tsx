import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function SceneObject() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#D4AF37"
          speed={2}
          distort={0.3}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  )
}

export const ThreeCanvas = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-[#0A0A0A]">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#0A0A0A']} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#D4AF37" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A1A1AA" />
        <SceneObject />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      </Canvas>
    </div>
  )
}
