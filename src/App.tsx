import { Hero } from './components/Hero'
import { AboutSection } from './components/Sections'
import { FeaturesSection } from './components/FeaturesSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { MapRoomSection } from './components/MapRoomSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { ThreeCanvas } from './components/ThreeCanvas'

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-text font-body antialiased">
      <ThreeCanvas />
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <FeaturesSection />
        <MapRoomSection />
        <TestimonialsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}
