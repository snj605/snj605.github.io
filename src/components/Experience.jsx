import React from 'react'
import { motion } from 'framer-motion'
import { experience } from '../data/experience'

const Experience = () => {
  return (
    <section id="experience" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-primary/5 blur-2xl"
          animate={{ x: [0,-25,0], y: [0,25,0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-10 left-10 w-36 h-36 rounded-full bg-accent/5 blur-xl"
          animate={{ x: [0,30,0], y: [0,-30,0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
      </div>

      <div className="container">
        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-heading">Work Experience</h2>
        </motion.div>

        <div className="relative max-w-3xl">
          {/* Timeline line */}
          <motion.div
            className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent"
            initial={{ scaleY: 0, originY: 0 }} whileInView={{ scaleY: 1 }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div key={i} className="relative pl-14"
                initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}>

                {/* Timeline dot */}
                <motion.div
                  className="absolute left-3 top-5 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background shadow-glow"
                  initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.12 + 0.2 }}
                  whileHover={{ scale: 1.3 }}
                />

                {/* Card */}
                <motion.div
                  className="glass glass-hover rounded-2xl p-6 noise relative"
                  whileHover={{ boxShadow: '0 20px 48px rgba(0,0,0,0.18), 0 0 0 1px hsl(var(--primary)/0.2)' }}>

                  {/* Current badge */}
                  {exp.current && (
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Current
                    </span>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4 pr-20">
                    <div>
                      <h3 className="text-base font-bold text-foreground">{exp.title}</h3>
                      <p className="text-sm text-primary font-medium mt-0.5">{exp.company}</p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground bg-muted/60 px-3 py-1 rounded-full border border-border/50 self-start">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, j) => (
                      <motion.li key={j}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.1 + j * 0.04 }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                        {bullet}
                      </motion.li>
                    ))}
                  </ul>

                  {exp.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
