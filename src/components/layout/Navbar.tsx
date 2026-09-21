'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'
import { useTheme } from '@/components/ui/ThemeProvider'
import { ResumeModal } from '@/components/ui/ResumeModal'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about')
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { profile } = usePortfolioData()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler that prevents changing the URL hash in address bar
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Active section tracking (visual indicator only, does not alter URL)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-25% 0px -40% 0px', threshold: 0.1 }
    )
    navItems.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Permanent Fixed Header (Visible in every section, never scrolls away) */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-3 transition-all duration-300">
        <nav
          className={`mx-auto max-w-5xl glass-panel border border-[var(--border)] rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between transition-shadow duration-300 ${
            isScrolled ? 'shadow-2xl shadow-cyan-500/5 bg-[var(--surface)]/90 backdrop-blur-xl' : 'shadow-lg'
          }`}
        >
          {/* Logo & Avatar */}
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/40 relative shrink-0">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-gradient-cyan">
                {profile.name}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono hidden sm:inline">
                Backend Engineer
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map(({ label, href }) => {
              const isActive = activeSection === href.replace('#', '')
              return (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 ${
                      isActive ? 'text-cyan-400' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-nav"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: 'rgba(56,189,248,0.12)',
                          border: '1px solid rgba(56,189,248,0.25)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right Action Controls: Theme Switcher & Resume (Admin link removed) */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            {mounted && (
              <button
                onClick={toggle}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-2 rounded-xl glass-panel glass-panel-hover text-[var(--text-primary)] hover:text-amber-400 border border-[var(--border)] transition-all duration-300 flex items-center justify-center shadow-sm"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4 text-amber-300 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}

            {/* Resume Action Pill */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white btn-white-text transition-all duration-200 hover:scale-105 shadow-sm"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                boxShadow: '0 0 16px -3px rgba(14, 165, 233, 0.45)',
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Global Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  )
}
