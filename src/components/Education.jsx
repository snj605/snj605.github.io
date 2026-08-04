import React from 'react'
import { motion } from 'framer-motion'
import { getPortfolioData } from '../data/portfolioData'

export default function Education() {
  const { education } = getPortfolioData()

  return (
    <section id="education" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">My academic background.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
          {education.map((edu, i) => (
            <motion.div key={i} className="card flex gap-4"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <span className="text-3xl flex-shrink-0">{edu.icon}</span>
              <div>
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-primary text-sm">{edu.institution}</p>
                {edu.location && <p className="text-xs text-[hsl(var(--muted-foreground))]">{edu.location}</p>}
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{edu.period}</p>
                {edu.grade && <p className="text-xs text-green-500 mt-1">{edu.grade}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
