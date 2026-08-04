import React from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { projects } from '../data/projects'

const Projects = () => {
  return (
    <section id="projects" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute top-20 right-10 w-56 h-56 rounded-full bg-accent/6 blur-3xl"
          animate={{ x: [0,30,0], y: [0,-30,0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-primary/6 blur-2xl"
          animate={{ x: [0,-20,0], y: [0,20,0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
      </div>

      <div className="container">
        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-heading">Projects</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((proj, idx) => (
            <motion.div key={idx}
              className="group glass glass-hover rounded-2xl p-6 flex flex-col noise relative"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: idx * 0.1 }}>

              {/* Accent corner dot */}
              <motion.div
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow"
                animate={{ scale: [1,1.35,1], opacity: [0.7,1,0.7] }}
                transition={{ duration: 3, repeat: Infinity }} />

              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground leading-snug">{proj.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{proj.period}</p>
                  </div>
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <motion.button
                        className="shrink-0 inline-flex h-7 items-center rounded-lg border border-border/60 px-2.5 text-[11px] font-medium bg-muted/40 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-200"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        Details
                      </motion.button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-md z-50" />
                      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 glass rounded-2xl border border-white/15 p-6 shadow-2xl focus:outline-none">
                        <Dialog.Title className="text-lg font-bold gradient-text-static mb-1">{proj.title}</Dialog.Title>
                        <Dialog.Description className="text-xs text-muted-foreground mb-4">{proj.period}</Dialog.Description>
                        <ul className="space-y-2.5 mb-5">
                          {proj.bullets.map((b, i) => (
                            <motion.li key={i} className="flex items-start gap-2 text-sm text-muted-foreground"
                              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              {b}
                            </motion.li>
                          ))}
                        </ul>
                        {proj.tags && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                          </div>
                        )}
                        <div className="flex gap-2">
                          {proj.links.code && (
                            <a href={proj.links.code} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium hover:bg-primary/10 hover:border-primary/40 transition-all">
                              <FaGithub /> View Code
                            </a>
                          )}
                          {proj.links.demo && (
                            <a href={proj.links.demo} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                              <FaExternalLinkAlt /> Live Demo
                            </a>
                          )}
                        </div>
                        <Dialog.Close asChild>
                          <motion.button
                            className="absolute right-3 top-3 w-7 h-7 flex items-center justify-center rounded-lg border border-border/50 hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
                            whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                            ×
                          </motion.button>
                        </Dialog.Close>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>

                <ul className="space-y-2 mb-4 flex-1">
                  {proj.bullets.slice(0, 2).map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/70 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                {proj.tags && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}

                <div className="flex gap-2 mt-auto pt-2 border-t border-border/30">
                  {proj.links.code && (
                    <a href={proj.links.code} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <FaGithub size={12} /> Code
                    </a>
                  )}
                  {proj.links.demo && (
                    <a href={proj.links.demo} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <FaExternalLinkAlt size={11} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
