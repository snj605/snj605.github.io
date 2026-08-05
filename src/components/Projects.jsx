import React, { useState, useEffect } from 'react'
import { FaGithub, FaExternalLinkAlt, FaUser, FaCheckCircle, FaClock, FaArchive } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { projects as defaultProj } from '../data/projects'
import { KEYS } from '../lib/store'

const statusConfig = {
  Completed:   { icon: FaCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  'In Progress': { icon: FaClock,       color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
  Archived:    { icon: FaArchive,      color: 'text-muted-foreground', bg: 'bg-muted/40 border-border/40' },
}

function DetailModal({ proj, onClose }) {
  const status = statusConfig[proj.status] || statusConfig.Completed
  const StatusIcon = status.icon

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}>
        <motion.div
          className="relative w-full max-w-2xl glass rounded-2xl border border-white/15 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          onClick={e => e.stopPropagation()}>

          {/* Modal header */}
          <div className="px-6 pt-6 pb-4 border-b border-border/40 shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold gradient-text-static leading-tight">{proj.title}</h2>
                <div className="flex flex-wrap items-center gap-2.5 mt-2">
                  <span className="text-xs text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full border border-border/50">
                    {proj.period}
                  </span>
                  {proj.role && (
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <FaUser size={9} />{proj.role}
                    </span>
                  )}
                  {proj.status && (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.bg} ${status.color}`}>
                      <StatusIcon size={10} />{proj.status}
                    </span>
                  )}
                </div>
              </div>
              <motion.button onClick={onClose}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-xl border border-border/50 hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                ×
              </motion.button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto flex-1 px-6 py-5 space-y-6">

            {/* Full description */}
            <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
              <p className="text-sm text-foreground/80 leading-7 tracking-wide">
                {proj.description}
              </p>
            </div>

            {/* Feature bullets */}
            {proj.bullets?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Key Features & Implementation
                </h4>
                <ul className="space-y-2.5">
                  {proj.bullets.map((b, i) => (
                    <motion.li key={i}
                      className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}>
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech stack */}
            {proj.tags?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2.5">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            )}
          </div>

          {/* Footer links */}
          <div className="px-6 py-4 border-t border-border/40 flex gap-2.5 shrink-0">
            {proj.links?.code && (
              <a href={proj.links.code} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border/60 px-4 py-2 text-xs font-semibold hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all">
                <FaGithub size={13} /> View Code
              </a>
            )}
            {proj.links?.demo && (
              <a href={proj.links.demo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-glow">
                <FaExternalLinkAlt size={11} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const Projects = () => {
  const [selected, setSelected] = useState(null)
  const [data, setData] = useState(() => {
    try { const v = localStorage.getItem(KEYS.projects); return v ? JSON.parse(v) : defaultProj } catch { return defaultProj }
  })

  useEffect(() => {
    const handler = () => {
      try { const v = localStorage.getItem(KEYS.projects); if (v) setData(JSON.parse(v)) } catch {}
    }
    window.addEventListener('pf-updated', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('pf-updated', handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  return (
    <section id="projects" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-accent/6 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-primary/6 blur-2xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
      </div>

      <div className="container">
        <motion.div className="mb-16 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-heading">Projects</h2>
          <p className="text-muted-foreground text-sm mt-5">Click Details to see full project breakdown.</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 max-w-6xl mx-auto">
          {data.map((proj, idx) => {
            const status = statusConfig[proj.status] || statusConfig.Completed
            const StatusIcon = status.icon
            return (
              <motion.div key={idx}
                className="group glass glass-hover rounded-2xl p-6 flex flex-col noise relative"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: idx * 0.1 }}>

                <motion.div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }} />

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground leading-snug">{proj.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-muted-foreground">{proj.period}</p>
                        {proj.status && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${status.bg} ${status.color}`}>
                            <StatusIcon size={8} />{proj.status}
                          </span>
                        )}
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setSelected(proj)}
                      className="shrink-0 inline-flex h-7 items-center rounded-lg border border-border/60 px-2.5 text-[11px] font-semibold bg-muted/40 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-200"
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      Details
                    </motion.button>
                  </div>

                  {/* Short description */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                    {proj.description}
                  </p>

                  {proj.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                      {proj.tags.length > 4 && <span className="tag">+{proj.tags.length - 4}</span>}
                    </div>
                  )}

                  <div className="flex gap-3 mt-auto pt-3 border-t border-border/30">
                    {proj.links?.code && (
                      <a href={proj.links.code} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <FaGithub size={12} /> Code
                      </a>
                    )}
                    {proj.links?.demo && (
                      <a href={proj.links.demo} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <FaExternalLinkAlt size={11} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {selected && <DetailModal proj={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

export default Projects
