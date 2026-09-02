import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

function usePrefersReducedMotion() {
  const ref = useRef(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { ref.current = mq.matches }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return ref
}

// Slow-drifting wireframe sphere. The motion comes from the camera;
// the mesh itself stays near-still so text never pulses under your eye.
function Globe() {
  const ref = useRef<THREE.Mesh>(null)
  const reduced = usePrefersReducedMotion()

  useFrame((_, delta) => {
    if (!ref.current || reduced.current) return
    ref.current.rotation.y += delta * 0.02
    ref.current.rotation.x += delta * 0.008
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2, 32, 24]} />
      <meshBasicMaterial
        color="#D4AF37"
        wireframe
        transparent
        opacity={0.32}
      />
    </mesh>
  )
}

// Static concentric ring to give the sphere a "holder" / axis reference
function Ring() {
  return (
    <mesh rotation={[Math.PI / 2.2, 0.15, 0]}>
      <torusGeometry args={[2.4, 0.0022, 8, 160]} />
      <meshBasicMaterial color="#A1A1AA" transparent opacity={0.45} />
    </mesh>
  )
}

export function ThreeCanvas() {
  const reduced = usePrefersReducedMotion()

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
      data-testid="three-canvas"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0.2, 5.2], fov: 44 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ pointerEvents: 'none', background: 'transparent' }}
      >
        <color attach="background" args={['#0A0A0A']} />
        <fog attach="fog" args={['#0A0A0A', 6, 14]} />
        <ambientLight intensity={0.12} />
        <pointLight position={[6, 6, 6]} intensity={0.5} color="#D4AF37" />

        <Globe />
        <Ring />
        <Stars
          radius={50}
          depth={20}
          count={reduced.current ? 600 : 1800}
          factor={2.4}
          saturation={0}
          fade
          speed={0.2}
        />

        {/* Drag to nudge the camera. No autoRotate — the page should sit still. */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.3}
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI * 0.66}
          minAzimuthAngle={-0.9}
          maxAzimuthAngle={0.9}
        />
      </Canvas>
    </div>
  )
}
