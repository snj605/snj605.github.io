import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMapMarkerAlt, FaChevronDown, FaTrophy, FaBuilding, FaCalendarAlt } from 'react-icons/fa'
import { experience as defaultExp } from '../data/experience'
import { KEYS } from '../lib/store'

const Experience = () => {
  const [expanded, setExpanded] = useState(0)
  const [data, setData] = useState(() => {
    try { const v = localStorage.getItem(KEYS.experience); return v ? JSON.parse(v) : defaultExp } catch { return defaultExp }
  })

  useEffect(() => {
    const handler = () => {
      try { const v = localStorage.getItem(KEYS.experience); if (v) setData(JSON.parse(v)) } catch {}
    }
    window.addEventListener('pf-updated', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('pf-updated', handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  return (
    <section id="experience" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/5 blur-2xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
      </div>

      <div className="container">
        <motion.div className="mb-16 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-heading">Work Experience</h2>
          <p className="text-muted-foreground text-sm mt-5">Click any role to expand full details.</p>
        </motion.div>

        <div className="relative w-full">
          {/* Timeline line */}
          <motion.div
            className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent"
            initial={{ scaleY: 0, originY: 0 }} whileInView={{ scaleY: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />

          <div className="space-y-5">
            {data.map((exp, i) => {
              const isOpen = expanded === i
              return (
                <motion.div key={i} className="relative pl-14"
                  initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>

                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute left-3 top-5 w-4 h-4 rounded-full border-2 border-background shadow-glow transition-all duration-300 ${isOpen ? 'bg-gradient-to-br from-primary to-accent scale-125' : 'bg-gradient-to-br from-primary/60 to-accent/60'}`}
                    whileHover={{ scale: 1.3 }} />

                  <div className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'ring-1 ring-primary/30 shadow-glow' : 'hover:ring-1 hover:ring-border'}`}>

                    {/* Header */}
                    <button
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 group"
                      onClick={() => setExpanded(isOpen ? -1 : i)}>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3 className="text-base sm:text-lg font-bold text-foreground">{exp.title}</h3>
                          {exp.current && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Current
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
                          <span className="flex items-center gap-1.5 text-primary font-semibold">
                            <FaBuilding size={11} />{exp.company}
                          </span>
                          {exp.location && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <FaMapMarkerAlt size={10} />{exp.location}
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full border border-border/50">
                            <FaCalendarAlt size={9} />{exp.period}
                          </span>
                        </div>
                      </div>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}
                        className="shrink-0 mt-1 text-muted-foreground group-hover:text-primary transition-colors">
                        <FaChevronDown size={14} />
                      </motion.div>
                    </button>

                    {/* Expanded detail */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                          className="overflow-hidden">
                          <div className="px-5 sm:px-6 pb-7 border-t border-border/40 pt-5 space-y-6">

                            {/* Description */}
                            <div className="p-4 rounded-xl bg-muted/30 border border-border/40">
                              <p className="text-sm text-foreground/80 leading-7 tracking-wide">
                                {exp.description}
                              </p>
                            </div>

                            {/* Achievements */}
                            {exp.achievements?.length > 0 && (
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-1.5">
                                  <FaTrophy size={10} className="text-amber-400" /> Key Achievements
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {exp.achievements.map((a, j) => (
                                    <div key={j} className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium bg-amber-500/8 text-amber-400 border border-amber-500/20">
                                      <span className="text-amber-400 shrink-0">✦</span>
                                      <span className="leading-snug">{a}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Responsibilities */}
                            {exp.bullets?.length > 0 && (
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                                  Responsibilities
                                </h4>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                                  {exp.bullets.map((b, j) => (
                                    <motion.li key={j}
                                      className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: j * 0.04 }}>
                                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                                      {b}
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Tags */}
                            {exp.tags?.length > 0 && (
                              <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2.5">
                                  Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {exp.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
