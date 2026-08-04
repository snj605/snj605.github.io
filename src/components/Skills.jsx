import React from 'react'
import { motion } from 'framer-motion'
import { getPortfolioData } from '../data/portfolioData'

export default function Skills() {
  const { skills } = getPortfolioData()

  return (
    <section id="skills" className="section bg-[hsl(var(--muted))]">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">Technologies I work with.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((cat, i) => (
            <motion.div key={i} className="card"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <h3 className="font-semibold text-sm text-primary mb-4">{cat.category}</h3>
              <div className="grid grid-cols-3 gap-3">
                {cat.items.map((skill, j) => (
                  <motion.div key={j} className="flex flex-col items-center gap-1.5 group"
                    whileHover={{ scale: 1.05 }}>
                    <div className="w-10 h-10 rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))] flex items-center justify-center p-1.5 group-hover:border-primary transition-colors">
                      {skill.icon ? (
                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-lg">🔧</span>
                      )}
                    </div>
                    <span className="text-[10px] text-center text-[hsl(var(--muted-foreground))] leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
