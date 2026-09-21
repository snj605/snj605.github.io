'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'
import { ProjectItem } from '@/data/portfolio'
import { Card3D } from '@/components/ui/Card3D'
import { Spotlight } from '@/components/ui/Spotlight'

const categoryColors: Record<string, { pill: string; dot: string }> = {
  'Enterprise Microservices': { pill: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500', dot: 'bg-cyan-400' },
  'Distributed & AI': { pill: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-500', dot: 'bg-indigo-400' },
  'Cloud Optimization': { pill: 'bg-violet-500/10 border-violet-500/30 text-violet-500', dot: 'bg-violet-400' },
  'Mobile & IoT': { pill: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500', dot: 'bg-emerald-400' },
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState<null | ProjectItem>(null)
  const { projects } = usePortfolioData()

  return (
    <section id="projects" className="relative py-28">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 mb-3">
            <span>⚡ Architecture & Engineering</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-gradient">Featured Systems & Projects</h2>
          <p className="mt-3 text-[var(--text-secondary)] max-w-2xl text-base">
            Scalable microservices, distributed streaming architectures, and research-backed optimization algorithms engineered with production reliability.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((proj, i) => {
            const colors = categoryColors[proj.category] ?? categoryColors['Enterprise Microservices']
            const hasGit = Boolean(proj.githubUrl)
            const hasLive = Boolean(proj.liveUrl)

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Spotlight className="h-full rounded-2xl">
                  <Card3D className="h-full">
                    <div
                      onClick={() => setSelected(proj)}
                      className="glass-panel rounded-2xl p-6 h-full flex flex-col justify-between cursor-pointer group hover:border-cyan-400/40 transition-all duration-300 shadow-md"
                    >
                      <div className="space-y-4">
                        {/* Category & Status Pill */}
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border ${colors.pill}`}>
                            {proj.category}
                          </span>
                          <span className="text-xs text-[var(--text-muted)] font-mono">{proj.period}</span>
                        </div>

                        {/* Title & Role */}
                        <div>
                          <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-cyan-500 transition-colors leading-snug">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-cyan-500 font-medium mt-1">{proj.role}</p>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>

                        {/* Architectural Highlights */}
                        <div className="space-y-1.5 pt-1">
                          {proj.architectureHighlights.slice(0, 2).map((h, j) => (
                            <div key={j} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {proj.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-[10px] rounded-md text-[var(--text-secondary)] border border-[var(--border)] bg-slate-500/5 font-mono">
                              {tag}
                            </span>
                          ))}
                          {proj.tags.length > 4 && (
                            <span className="text-[10px] text-[var(--text-muted)] py-0.5 font-mono">+{proj.tags.length - 4}</span>
                          )}
                        </div>
                      </div>

                      {/* Action Links & Modal Trigger */}
                      <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between gap-2">
                        {/* Dynamic Action Buttons: Git, Live Demo, or Both */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {hasLive && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white btn-white-text bg-cyan-500 hover:bg-cyan-600 shadow-sm transition-all"
                            >
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                              </span>
                              Live Demo ↗
                            </a>
                          )}

                          {hasGit && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-primary)] hover:text-cyan-500 bg-slate-500/10 hover:bg-slate-500/20 border border-[var(--border)] transition-colors"
                            >
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                              </svg>
                              Source
                            </a>
                          )}
                        </div>

                        <span className="text-[11px] text-[var(--text-muted)] group-hover:text-cyan-500 transition-colors">
                          Details →
                        </span>
                      </div>
                    </div>
                  </Card3D>
                </Spotlight>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Project Detail Deep-Dive Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(3,7,18,0.82)', backdropFilter: 'blur(16px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-2xl border border-[var(--border)] w-full max-w-2xl max-h-[88vh] overflow-y-auto p-7 space-y-6 shadow-2xl bg-[var(--bg)]"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${categoryColors[selected.category]?.pill ?? ''}`}>
                    {selected.category}
                  </span>
                  <h3 className="mt-3 text-2xl font-black text-gradient">{selected.title}</h3>
                  <p className="text-sm text-cyan-500 mt-1 font-medium">{selected.role} · {selected.period}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-slate-500/10 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selected.description}</p>

              {/* Architecture Highlights */}
              <div>
                <p className="text-[11px] uppercase tracking-widest text-cyan-500 font-bold mb-3">
                  Architecture & Design Patterns
                </p>
                <ul className="space-y-2">
                  {selected.architectureHighlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Engineering Implementation */}
              <div>
                <p className="text-[11px] uppercase tracking-widest text-indigo-500 font-bold mb-3">
                  Implementation Details
                </p>
                <ul className="space-y-2">
                  {selected.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border)]">
                {selected.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs rounded-lg text-[var(--text-secondary)] border border-[var(--border)] bg-slate-500/5 font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Dual Action Links */}
              <div className="flex items-center gap-3 pt-2">
                {selected.liveUrl && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white btn-white-text shadow-lg transition-transform hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                      boxShadow: '0 0 20px -3px rgba(14, 165, 233, 0.5)',
                    }}
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    Launch Live Demo ↗
                  </a>
                )}

                {selected.githubUrl && (
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[var(--text-primary)] hover:text-cyan-500 bg-slate-500/10 hover:bg-slate-500/20 border border-[var(--border)] transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    Source Code on GitHub ⬡
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
