import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'
import { getPortfolioData } from '../data/portfolioData'

const navLinks = [
  { label: 'About',          id: 'about' },
  { label: 'Experience',     id: 'experience' },
  { label: 'Projects',       id: 'projects' },
  { label: 'Skills',         id: 'skills' },
  { label: 'Education',      id: 'education' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Contact',        id: 'contact' },
]

export default function Header() {
  const { hero } = getPortfolioData()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setDark(d => !d)
  }

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-background/80 backdrop-blur transition-shadow ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          <button onClick={() => scrollTo('about')} className="text-base font-semibold hover:text-primary transition-colors">
            {hero.name}
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-5 text-sm">
            {navLinks.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id) }}
                  className="hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={hero.cvPath} download={hero.cvFileName}
                className="btn-outline text-xs px-3 py-1.5">
                Resume
              </a>
            </li>
            <li>
              <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors" aria-label="Toggle theme">
                {dark ? <FaSun size={15} /> : <FaMoon size={15} />}
              </button>
            </li>
          </ul>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors" aria-label="Toggle theme">
              {dark ? <FaSun size={15} /> : <FaMoon size={15} />}
            </button>
            <button onClick={() => setMenuOpen(o => !o)} className="p-2" aria-label="Toggle menu">
              {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[hsl(var(--border))] bg-background">
          <ul className="container py-4 flex flex-col gap-3 text-sm">
            {navLinks.map(l => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id) }}
                  className="block hover:text-primary transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={hero.cvPath} download={hero.cvFileName} className="btn-outline text-xs px-3 py-1.5">
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
