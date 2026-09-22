'use client'

import { motion } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'
import { BentoGrid, BentoCard } from '@/components/ui/BentoGrid'

const categoryAccents: Record<string, string> = {
  'Backend & Frameworks': '#38bdf8',
  'Messaging & Event-Driven': '#818cf8',
  'Databases & Storage': '#10b981',
  'Cloud, DevOps & Systems': '#c084fc',
}

export default function SkillsSection() {
  const { skills } = usePortfolioData()

  return (
    <section id="skills" className="relative py-28">
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">
            Technical Arsenal
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-foreground">
            Skills & Expertise
          </h2>
          <p className="mt-3 text-[var(--text-secondary)] max-w-xl">
            Enterprise Java ecosystem, distributed messaging, multi-database engineering, and cloud infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((category, ci) => {
            const accent = categoryAccents[category.title] ?? '#38bdf8'
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1, duration: 0.5 }}
                className="terracotta-card p-6 space-y-4 shadow-sm hover:border-primary/40 transition-all duration-300"
                style={{
                  borderColor: `var(--border)`,
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                {/* Skills pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, si) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.08 + si * 0.04 }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-default ${
                        skill.highlight
                          ? 'text-foreground border border-primary/30'
                          : 'text-muted-foreground border border-border bg-card hover:text-foreground'
                      }`}
                      style={
                        skill.highlight
                          ? {
                              background: `${accent}15`,
                              borderColor: `${accent}35`,
                              color: accent,
                            }
                          : undefined
                      }
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Architecture Bento — core metrics highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <BentoGrid>
            {[
              { label: 'Apache Kafka', detail: 'Producers · Consumers · DLQ', accent: '#818cf8', col: 1, row: 1 },
              { label: 'Spring Boot 3', detail: 'Spring Security · Data JPA · REST', accent: '#38bdf8', col: 1, row: 1 },
              { label: '50+ APIs Shipped', detail: 'JWT Auth · RBAC · Swagger Docs', accent: '#10b981', col: 1, row: 1 },
            ].map((item) => (
              <BentoCard key={item.label} colSpan={1} rowSpan={1}>
                <div className="flex flex-col justify-between h-full">
                  <div
                    className="text-3xl font-display font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    {item.label}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              </BentoCard>
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  )
}
