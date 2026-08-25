import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Planet silhouette radius (equator ring). Cards fade out as the planet
// blocks them from the camera so they never draw on top of it.
const GLOBE_RADIUS = 3.2
const FADE_BAND = 0.9
// Camera sits at [0, 0, 11] with fov 50 — used to map screen drags to world space.
const CAMERA_Z = 11
const FOV_HALF = THREE.MathUtils.degToRad(25)
// Minimum pointer movement (px) before a press counts as a drag instead of a click.
const DRAG_THRESHOLD = 4

interface DragStart {
  sx: number
  sy: number
  wx: number
  wy: number
  wz: number
  scale: number // world units per screen px at the card's depth
}

interface OrbitingCardProps {
  radius: number
  height: number
  speed: number
  phase: number
  paused: boolean
  children: ReactNode
}

export function OrbitingCard({ radius, height, speed, phase, paused, children }: OrbitingCardProps) {
  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)
  const group = useRef<THREE.Group>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const angle = useRef(phase)
  const placed = useRef<THREE.Vector3 | null>(null)
  const down = useRef<DragStart | null>(null)

  // When the orbit resumes, forget any manually-placed position.
  useEffect(() => {
    if (!paused) placed.current = null
  }, [paused])

  const startDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!paused || !group.current) return
    const canvas = document.querySelector('canvas')
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const p = group.current.position
    const focal = rect.height / 2 / Math.tan(FOV_HALF)
    down.current = {
      sx: e.clientX,
      sy: e.clientY,
      wx: p.x,
      wy: p.y,
      wz: p.z,
      scale: (CAMERA_Z - p.z) / focal,
    }
    ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  }

  const moveDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = down.current
    if (!d) return
    if (!dragging) {
      // A click (no real movement) should still activate links/buttons.
      if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < DRAG_THRESHOLD) return
      setDragging(true)
    }
    placed.current = new THREE.Vector3(
      d.wx + (e.clientX - d.sx) * d.scale,
      d.wy - (e.clientY - d.sy) * d.scale,
      d.wz,
    )
  }

  const endDrag = () => {
    down.current = null
    setDragging(false)
  }

  useFrame((state) => {
    const g = group.current
    if (!g) return

    if (!reduced && !hovered && !paused && !dragging) {
      angle.current = state.clock.elapsedTime * speed + phase
    }
    const t = angle.current

    let x: number
    let y: number
    let z: number
    if (placed.current) {
      x = placed.current.x
      y = placed.current.y
      z = placed.current.z
    } else {
      const bob =
        reduced || hovered || paused || dragging ? 0 : Math.sin(state.clock.elapsedTime * 1.1 + phase) * 0.08
      x = Math.cos(t) * radius
      z = Math.sin(t) * radius
      y = height + bob
    }
    g.position.set(x, y, z)

    // Distance from the camera→card ray to the planet's center; fade the
    // card out as the planet occludes it.
    const dx = x
    const dy = y
    const dz = z - CAMERA_Z
    const len2 = dx * dx + dy * dy + dz * dz
    const s = len2 > 0 ? THREE.MathUtils.clamp(-(CAMERA_Z * dz) / len2, 0, 1) : 0
    const closest = Math.sqrt((s * dx) ** 2 + (s * dy) ** 2 + (CAMERA_Z + s * dz) ** 2)
    const alpha = THREE.MathUtils.clamp((closest - GLOBE_RADIUS) / FADE_BAND, 0, 1)

    g.visible = alpha > 0.01
    const el = overlay.current
    if (el) {
      el.style.opacity = String(alpha)
      // Keep events flowing mid-drag even if the card fades behind the planet.
      el.style.pointerEvents = alpha > 0.5 || dragging ? 'auto' : 'none'
    }
  })

  return (
    <group ref={group}>
      <Html center distanceFactor={10} zIndexRange={[40, 0]} style={{ pointerEvents: 'none', width: 340 }}>
        <div
          ref={overlay}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          style={{
            pointerEvents: 'auto',
            cursor: paused ? (dragging ? 'grabbing' : 'grab') : 'default',
            touchAction: 'none',
            userSelect: 'none',
          }}
        >
          {children}
        </div>
      </Html>
    </group>
  )
}
