import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { ModeToggle } from './theme/mode-toggle'
import { cn } from '../lib/utils'
import { profile as defaultProfile } from '../data/profile'
import { trackResumeDownload } from '../lib/analytics'
import { KEYS, getResume } from '../lib/store'

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
  const [profile, setProfile]     = useState(() => {
    try { const v = localStorage.getItem(KEYS.profile); return v ? JSON.parse(v) : defaultProfile } catch { return defaultProfile }
  })
  const [resumeBlob, setResumeBlob] = useState(() => getResume())

  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.key === KEYS.profile || e.detail?.key === 'all') {
        try { const v = localStorage.getItem(KEYS.profile); if (v) setProfile(JSON.parse(v)) } catch {}
      }
      if (e.detail?.key === KEYS.resume || e.detail?.key === 'all') setResumeBlob(getResume())
    }
    window.addEventListener('pf-updated', handler)
    return () => window.removeEventListener('pf-updated', handler)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = []
    let mutObs = null

    const attach = () => {
      observers.forEach(o => o.disconnect())
      observers.length = 0
      let allFound = true
      navLinks.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) { allFound = false; return }
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
          { rootMargin: '-30% 0px -60% 0px' }
        )
        obs.observe(el)
        observers.push(obs)
      })
      if (allFound && mutObs) { mutObs.disconnect(); mutObs = null }
    }

    attach()

    // retry until all lazy-loaded sections are in the DOM
    mutObs = new MutationObserver(attach)
    mutObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      observers.forEach(o => o.disconnect())
      mutObs?.disconnect()
    }
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  // close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header className={cn(
      'sticky top-0 z-50 transition-all duration-300',
      scrolled ? 'glass border-b border-white/10 shadow-lg' : 'bg-background/80 backdrop-blur border-b border-border/50'
    )}>
      <div className="container">
        <nav className="flex items-center justify-between py-3">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('about')}
            className="group flex items-center gap-2 text-base font-bold tracking-tight hover:text-primary transition-colors duration-200 shrink-0"
          >
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-black shadow-glow">
              {profile.name.charAt(0)}
            </span>
            <span className="hidden sm:block">{profile.name}</span>
          </button>

          {/* Desktop nav — hidden below lg */}
          <ul className="hidden lg:flex items-center gap-0.5 text-sm">
            {navLinks.map(l => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={e => { e.preventDefault(); scrollToSection(l.id) }}
                  className={cn(
                    'relative px-2.5 py-1.5 rounded-md transition-all duration-200 hover:text-primary hover:bg-primary/8 whitespace-nowrap',
                    activeId === l.id ? 'text-primary font-semibold bg-primary/10' : 'text-muted-foreground'
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
                href={resumeBlob || profile.cvPath}
                download={profile.cvFileName}
                onClick={() => trackResumeDownload('Desktop PDF')}
                className="btn-glow inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Resume ↓
              </a>
            </li>
            <li><ModeToggle /></li>
          </ul>

          {/* Mobile / tablet right side */}
          <div className="lg:hidden flex items-center gap-2">
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

      {/* Mobile / tablet menu */}
      {menuOpen && (
        <div className="lg:hidden glass border-t border-white/10">
          <div className="container py-3">
            <ul className="flex flex-col gap-0.5 text-sm">
              {navLinks.map(l => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={e => { e.preventDefault(); scrollToSection(l.id) }}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors',
                      activeId === l.id ? 'text-primary font-semibold bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    )}
                  >
                    {activeId === l.id && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 px-1">
                <a
                  href={profile.cvPath}
                  download={profile.cvFileName}
                  onClick={() => { trackResumeDownload('Mobile PDF'); setMenuOpen(false) }}
                  className="btn-glow flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
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
