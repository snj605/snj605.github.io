import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { getPortfolioData } from '../data/portfolioData'

export default function Projects() {
  const { projects } = getPortfolioData()
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? projects : projects.slice(0, 3)

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Things I've built.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p, i) => (
            <motion.div key={i} className="card flex flex-col hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>

              {p.featured && (
                <span className="text-xs text-accent font-medium mb-3">⭐ Featured</span>
              )}

              <h3 className="font-semibold text-lg mb-1">{p.title}</h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">{p.period}</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 flex-1">{p.desc}</p>

              <ul className="space-y-1 mb-4">
                {p.bullets.map((b, j) => (
                  <li key={j} className="text-xs text-[hsl(var(--muted-foreground))] flex gap-2">
                    <span className="text-primary flex-shrink-0">▸</span>{b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                {p.links.code && (
                  <a href={p.links.code} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors">
                    <FaGithub /> Code
                  </a>
                )}
                {p.links.demo && (
                  <a href={p.links.demo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {projects.length > 3 && (
          <div className="text-center mt-10">
            <button onClick={() => setShowAll(s => !s)} className="btn-outline">
              {showAll ? 'Show Less' : `Show All (${projects.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
