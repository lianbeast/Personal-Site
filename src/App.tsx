import { Hero } from './components/Hero'
import { AboutSection } from './components/Sections'
import { FeaturesSection } from './components/FeaturesSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { MapRoomSection } from './components/MapRoomSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-300">
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <MapRoomSection />
      <TestimonialsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
