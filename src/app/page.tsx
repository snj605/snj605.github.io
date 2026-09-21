import { AuroraBackground } from '@/components/ui/AuroraBackground'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import { SkillsTicker } from '@/components/ui/SkillsTicker'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import SkillsSection from '@/components/sections/SkillsSection'
import EducationSection from '@/components/sections/EducationSection'
import ResumeSection from '@/components/sections/ResumeSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Layer 0 — animated aurora background across the full page */}
      <AuroraBackground />

      {/* Layer 1 — sticky nav with theme switcher & resume launcher */}
      <Navbar />

      {/* Layer 2 — page sections */}
      <HeroSection />
      
      {/* Live skill ticker marquee */}
      <SkillsTicker />

      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      
      {/* Recruiter-focused resume review & direct download section */}
      <ResumeSection />

      <ContactSection />
    </main>
  )
}
