'use client'

import { motion } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'

const gradeColors: Record<string, string> = {
  'First Class': '#38bdf8',
  'Distinction': '#10b981',
  'First Class with Distinction': '#c084fc',
}

export default function EducationSection() {
  const { education, certifications } = usePortfolioData()

  return (
    <section id="education" className="relative py-28">
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            Academic Foundation
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-foreground">Education</h2>
        </motion.div>

        {/* Education timeline */}
        <div className="relative space-y-6 pl-6">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

          {education.map((edu, i) => {
            const color = gradeColors[edu.grade] ?? '#38bdf8'
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative terracotta-card p-6 border-transparent hover:border-border transition-all duration-300"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[27px] top-6 w-4 h-4 rounded-full border-2"
                  style={{ background: `${color}20`, borderColor: color, boxShadow: `0 0 12px ${color}60` }}
                />

                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="text-sm font-medium mt-1 text-primary">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{edu.details}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
                    >
                      {edu.grade}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1.5">{edu.period}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-6">
            Certifications
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="terracotta-card p-5 border-transparent hover:border-primary/20 transition-all duration-300 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-foreground">{cert.name}</h4>
                  <span className="text-xs text-muted-foreground">{cert.period}</span>
                </div>
                <p className="text-xs text-primary">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground">{cert.skills}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
