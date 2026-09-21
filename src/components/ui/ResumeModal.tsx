'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { profile, experience, education, skills, resumePdfUrl, resumePdfName } = usePortfolioData()

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          style={{ background: 'rgba(3, 7, 18, 0.82)', backdropFilter: 'blur(16px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel border border-[var(--border)] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400/40 relative shrink-0">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                    {profile.name}
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-semibold border border-cyan-500/30">
                      Structured View (Live Auto-Sync)
                    </span>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {profile.headline} · M.Tech (Computer Engineering)
                  </p>
                </div>
              </div>

              {/* Action Buttons: Download PDF & Close */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Download PDF button */}
                <a
                  href={resumePdfUrl}
                  download={resumePdfName || 'Samir_Joshi_Resume.pdf'}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white btn-white-text transition-all shadow-md hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                    boxShadow: '0 0 15px -3px rgba(14, 165, 233, 0.4)',
                  }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Original PDF</span>
                </a>

                {/* Close modal */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-slate-500/10 transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body: Pure Structured View */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[var(--bg-secondary)]">
              <div className="max-w-3xl mx-auto glass-panel border border-[var(--border)] rounded-xl p-6 sm:p-10 shadow-xl space-y-8 text-[var(--text-secondary)]">
                {/* Resume Header */}
                <div className="border-b border-[var(--border)] pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">{profile.name}</h1>
                    <p className="text-cyan-500 font-semibold text-sm mt-1">{profile.headline}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] mt-2">
                      <span>📍 {profile.location}</span>
                      <span>✉ {profile.email}</span>
                      <span>📞 {profile.phone}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 border border-[var(--border)] text-xs text-[var(--text-primary)] transition-colors"
                    >
                      GitHub ↗
                    </a>
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-500 transition-colors"
                    >
                      LinkedIn ↗
                    </a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-2">
                  <h2 className="text-xs uppercase tracking-widest font-bold text-cyan-500">Professional Summary</h2>
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                    {profile.bio.join(' ')}
                  </p>
                </div>

                {/* Core Technical Competencies */}
                <div className="space-y-3">
                  <h2 className="text-xs uppercase tracking-widest font-bold text-cyan-500">Core Technical Competencies</h2>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    {skills.map((cat) => (
                      <div key={cat.title} className="p-3 rounded-lg bg-slate-500/5 border border-[var(--border)]">
                        <span className="font-semibold text-[var(--text-primary)] block mb-1">{cat.title}:</span>
                        <span className="text-[var(--text-secondary)]">
                          {cat.skills.map((s) => s.name).join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Work Experience */}
                <div className="space-y-5">
                  <h2 className="text-xs uppercase tracking-widest font-bold text-cyan-500">Work Experience</h2>
                  <div className="space-y-6">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-cyan-500/40 pl-4 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h3 className="text-sm font-bold text-[var(--text-primary)]">{exp.role}</h3>
                          <span className="text-xs text-cyan-500 font-mono font-medium">{exp.period}</span>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] font-medium">
                          {exp.company} · {exp.location}
                        </p>
                        <ul className="space-y-1.5 text-xs text-[var(--text-primary)] list-disc list-outside ml-3">
                          {exp.bullets.map((bullet, idx) => (
                            <li key={idx} className="leading-relaxed">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education & Academic Research */}
                <div className="space-y-4">
                  <h2 className="text-xs uppercase tracking-widest font-bold text-cyan-500">Education & Academic Research</h2>
                  <div className="space-y-4">
                    {education.map((edu, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-500/5 border border-[var(--border)] space-y-1 text-xs">
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-[var(--text-primary)] text-sm">{edu.degree}</span>
                          <span className="text-cyan-500 font-mono font-medium">{edu.period}</span>
                        </div>
                        <p className="text-[var(--text-secondary)] font-medium">{edu.institution} — <span className="text-emerald-500 font-semibold">{edu.grade}</span></p>
                        <p className="text-[var(--text-secondary)] text-xs">{edu.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Download Footer in document */}
                <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
                  <span>Structured View auto-synchronized with portfolio data</span>
                  <a
                    href={resumePdfUrl}
                    download={resumePdfName || 'Samir_Joshi_Resume.pdf'}
                    className="text-cyan-500 hover:text-cyan-400 underline underline-offset-4 flex items-center gap-1 font-semibold"
                  >
                    Download Resume PDF file →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
