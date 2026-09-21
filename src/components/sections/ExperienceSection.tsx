'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'
import { Card3D } from '@/components/ui/Card3D'
import { Spotlight } from '@/components/ui/Spotlight'

export default function ExperienceSection() {
  const [active, setActive] = useState(0)
  const { experience } = usePortfolioData()

  const safeActive = active < experience.length ? active : 0
  const currentExp = experience[safeActive]

  return (
    <section id="experience" className="relative py-28">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500">
            Work Experience
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-gradient">
            Engineering Career
          </h2>
          <p className="mt-3 text-[var(--text-secondary)] max-w-xl">
            Production microservices, enterprise IoT systems, and academic faculty leadership.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">

          {/* Timeline sidebar */}
          <div className="flex flex-col gap-3">
            {experience.map((exp, i) => (
              <motion.button
                key={exp.id}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative text-left px-4 py-4 rounded-xl border transition-all duration-300 ${
                  safeActive === i
                    ? 'glass-panel border-cyan-400/40 shadow-[0_0_20px_-5px_rgba(56,189,248,0.25)]'
                    : 'border-[var(--border)] hover:border-cyan-400/30 bg-slate-500/5 hover:bg-slate-500/10'
                }`}
              >
                {safeActive === i && (
                  <motion.div
                    layoutId="active-exp-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-xl bg-gradient-to-b from-cyan-400 to-indigo-500"
                  />
                )}
                <div className="flex items-start gap-3 pl-2">
                  <span
                    className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                      exp.current ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{exp.role}</p>
                    <p className="text-xs text-cyan-500 font-medium mt-0.5">{exp.company}</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">{exp.period}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Experience Detail Card */}
          {currentExp && (
            <AnimatePresence mode="wait">
              <motion.div
                key={safeActive}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Spotlight className="h-full rounded-2xl">
                  <Card3D className="h-full">
                    <div className="glass-panel rounded-2xl p-7 h-full flex flex-col gap-5 shadow-lg">
                      {/* Header */}
                      <div>
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <h3 className="text-xl font-bold text-gradient">
                              {currentExp.role}
                            </h3>
                            <p className="text-cyan-500 font-semibold mt-1">
                              {currentExp.company}
                              {currentExp.type && (
                                <span className="ml-2 text-xs text-[var(--text-muted)] font-normal">
                                  · {currentExp.type}
                                </span>
                              )}
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--border)] text-[var(--text-secondary)] bg-slate-500/5">
                            {currentExp.period}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-1">📍 {currentExp.location}</p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {currentExp.description}
                      </p>

                      {/* Metrics strip */}
                      {currentExp.metrics && currentExp.metrics.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-2.5">
                          {currentExp.metrics.map((metric, i) => (
                            <div
                              key={i}
                              className="px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-slate-500/5 flex items-center gap-2.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                              <span className="text-xs font-medium text-[var(--text-primary)]">{metric}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Responsibilities */}
                      <div className="space-y-2.5 pt-1">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-500">
                          Key Deliverables & Architecture
                        </p>
                        <ul className="space-y-2">
                          {currentExp.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border)]">
                        {currentExp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs rounded-lg text-[var(--text-secondary)] border border-[var(--border)] bg-slate-500/5 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                </Spotlight>
              </motion.div>
            </AnimatePresence>
          )}

        </div>
      </div>
    </section>
  )
}
