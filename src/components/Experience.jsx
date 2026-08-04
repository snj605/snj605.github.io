import React from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase } from 'react-icons/fa'
import { getPortfolioData } from '../data/portfolioData'

export default function Experience() {
  const { experience } = getPortfolioData()

  return (
    <section id="experience" className="section bg-[hsl(var(--muted))]">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">My professional journey so far.</p>
        </motion.div>

        <div className="relative border-l-2 border-[hsl(var(--border))] ml-4 space-y-10">
          {experience.map((exp, i) => (
            <motion.div key={i} className="relative pl-8"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>

              {/* dot */}
              <span className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                <FaBriefcase size={9} className="text-white" />
              </span>

              <div className="card">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{exp.title}</h3>
                    <p className="text-primary text-sm font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] px-2 py-1 rounded-full">
                      {exp.period}
                    </span>
                    {exp.current && (
                      <span className="ml-2 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-1.5 mb-4">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-[hsl(var(--muted-foreground))] flex gap-2">
                      <span className="text-primary mt-1 flex-shrink-0">▸</span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
