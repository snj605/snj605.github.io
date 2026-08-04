import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { ModeToggle } from './theme/mode-toggle'
import { cn } from '../lib/utils'
import { profile } from '../data/profile'
import { trackResumeDownload } from '../lib/analytics'

const navLinks = [
  { label: 'About',          id: 'about' },
  { label: 'Experience',     id: 'experience' },
  { label: 'Projects',       id: 'projects' },
  { label: 'Skills',         id: 'skills' },
  { label: 'Education',      id: 'education' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact',        id: 'contact' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={cn('sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60')}>
      <div className="container">
        <nav className="flex items-center justify-between py-4">
          <button
            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
            onClick={() => scrollToSection('about')}
          >
            {profile.name}
          </button>

          <ul className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(l => (
              <li key={l.id}>
                <a className="hover:text-primary transition-colors" href={`#${l.id}`}
                  onClick={e => { e.preventDefault(); scrollToSection(l.id) }}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={profile.cvPath}
                download={profile.cvFileName}
                onClick={() => trackResumeDownload('Desktop PDF')}
                className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Resume
              </a>
            </li>
            <li><ModeToggle /></li>
          </ul>

          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <button className="text-xl" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4">
            <ul className="flex flex-col gap-3 text-sm">
              {navLinks.map(l => (
                <li key={l.id}>
                  <a className="block hover:text-primary" href={`#${l.id}`}
                    onClick={e => { e.preventDefault(); scrollToSection(l.id) }}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.cvPath}
                  download={profile.cvFileName}
                  onClick={() => trackResumeDownload('Mobile PDF')}
                  className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
