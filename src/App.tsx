import { useEffect, useState } from 'react'
import { HeroScene, AboutScene, CapabilitiesScene, ProjectsScene, ContactScene } from './components/NarrativeScenes'
import { NarrativeHUD } from './components/NarrativeHUD'
import { MapRoomSection } from './components/MapRoomSection'
import { ProjectsSection } from './components/ProjectsSection'
import { Footer } from './components/Footer'

// Scroll-narrative landing (opendesign/handoffs/scroll-narrative-landing).
// Five sticky scenes + HUD; map room and live projects stay as normal
// scrolling sections after the descent.
export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [cursorActive, setCursorActive] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, .btn-magnetic')) {
        setCursorActive(true)
      } else {
        setCursorActive(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-bg text-text font-body antialiased">
      <div
        className={`cursor-follower ${cursorActive ? 'active' : ''}`}
        style={{ transform: `translate(${cursorPos.x - 20}px, ${cursorPos.y - 20}px)` }}
      />
      <NarrativeHUD />
      <main className="relative z-10">
        <HeroScene />
        <AboutScene />
        <CapabilitiesScene />
        <ProjectsScene />
        <ContactScene />
      </main>
      <div className="relative z-10">
        <ProjectsSection />
        <MapRoomSection />
        <Footer />
      </div>
    </div>
  )
}
