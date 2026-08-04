import React from 'react'
import { motion } from 'framer-motion'
import { education } from '../data/education'

const Education = () => {
  return (
    <section id="education" className="py-20 sm:py-24">
      <div className="container">
        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-heading">Education</h2>
        </motion.div>

        <div className="space-y-4 max-w-2xl">
          {education.map((edu, i) => (
            <motion.div key={i}
              className="glass glass-hover rounded-2xl p-6 flex gap-4 items-start"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center text-xl flex-shrink-0">
                🎓
              </div>
              <div>
                <h3 className="font-bold text-foreground">{edu.degree}</h3>
                <p className="text-sm text-primary font-medium mt-0.5">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                {edu.extra && (
                  <span className="inline-block mt-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    {edu.extra}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
