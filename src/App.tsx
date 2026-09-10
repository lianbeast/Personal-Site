import { HeroScene, AboutScene, CapabilitiesScene, ProjectsScene, ContactScene } from './components/NarrativeScenes'
import { NarrativeHUD } from './components/NarrativeHUD'
import { TestimonialsSection } from './components/TestimonialsSection'
import { MapRoomSection } from './components/MapRoomSection'
import { ProjectsSection } from './components/ProjectsSection'
import { Footer } from './components/Footer'

// Scroll-narrative landing (opendesign/handoffs/scroll-narrative-landing).
// Five sticky scenes + HUD; map room, live projects and testimonials stay
// as normal scrolling sections after the descent.
export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-text font-body antialiased">
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
        <TestimonialsSection />
        <Footer />
      </div>
    </div>
  )
}
