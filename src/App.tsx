import { HeroScene, AboutScene, CapabilitiesScene, ProjectsScene, ContactScene } from './components/NarrativeScenes'
import { NarrativeHUD } from './components/NarrativeHUD'
import { MapRoomSection } from './components/MapRoomSection'
import { ProjectsSection } from './components/ProjectsSection'
import { SplashCursor } from './components/SplashCursor'
import { Footer } from './components/Footer'

// Scroll-narrative landing (opendesign/handoffs/scroll-narrative-landing).
// Five sticky scenes + HUD; map room and live projects stay as normal
// scrolling sections after the descent.
export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-text font-body antialiased">
      <SplashCursor />
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
