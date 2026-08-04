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
  const [menuOpen, setMenuOpen]   = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [activeId, setActiveId]   = useState('about')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers = []
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled
        ? 'glass border-b border-white/10 shadow-lg'
        : 'bg-background/80 backdrop-blur border-b border-border/50'
    )}>
      <div className="container">
        <nav className="flex items-center justify-between py-3.5">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('about')}
            className="group flex items-center gap-2 text-base font-bold tracking-tight hover:text-primary transition-colors duration-200"
          >
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-black shadow-glow">
              {profile.name.charAt(0)}
            </span>
            <span className="hidden sm:block">{profile.name}</span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 text-sm">
            {navLinks.map(l => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={e => { e.preventDefault(); scrollToSection(l.id) }}
                  className={cn(
                    'relative px-3 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/8',
                    activeId === l.id
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'text-muted-foreground'
                  )}
                >
                  {l.label}
                  {activeId === l.id && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </a>
              </li>
            ))}
            <li className="ml-2">
              <a
                href={profile.cvPath}
                download={profile.cvFileName}
                onClick={() => trackResumeDownload('Desktop PDF')}
                className="btn-glow inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Resume ↓
              </a>
            </li>
            <li><ModeToggle /></li>
          </ul>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <div className="container py-4">
            <ul className="flex flex-col gap-1 text-sm">
              {navLinks.map(l => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={e => { e.preventDefault(); scrollToSection(l.id) }}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
                      activeId === l.id
                        ? 'text-primary font-semibold bg-primary/10'
                        : 'hover:text-primary hover:bg-primary/5'
                    )}
                  >
                    {activeId === l.id && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={profile.cvPath}
                  download={profile.cvFileName}
                  onClick={() => trackResumeDownload('Mobile PDF')}
                  className="btn-glow flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                >
                  Download Resume ↓
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
