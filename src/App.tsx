import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HeroScene, AboutScene, CapabilitiesScene, ProjectsScene, ContactScene } from './components/NarrativeScenes'
import { NarrativeHUD } from './components/NarrativeHUD'
import { MapRoomSection } from './components/MapRoomSection'
import { ProjectsSection } from './components/ProjectsSection'
import { SplashCursor } from './components/SplashCursor'
import { Footer } from './components/Footer'
import { WorkIndexPage } from './pages/WorkIndex'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/work" element={<WorkIndexPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function MainLayout() {
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
