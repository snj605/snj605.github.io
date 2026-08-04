import React from 'react'
import { motion } from 'framer-motion'
import { skills } from '../data/skills'

const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/8 blur-2xl"
          animate={{ x: [0,20,0], y: [0,-20,0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-accent/8 blur-2xl"
          animate={{ x: [0,-30,0], y: [0,30,0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      </div>

      <div className="container">
        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-heading">Technical Skills</h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {skills.map((cat, i) => (
            <motion.div key={i}
              className="glass glass-hover rounded-2xl p-6 noise relative"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>

              {/* Accent dot */}
              <motion.div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent opacity-70"
                animate={{ scale: [1,1.25,1] }} transition={{ duration: 2.5, repeat: Infinity }} />

              <h3 className="text-sm font-bold mb-5 relative pb-3">
                <span className="gradient-text">{cat.title}</span>
                <motion.div className="absolute left-0 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }} whileInView={{ width: '100%' }}
                  viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3 }} />
              </h3>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {cat.items.map((skill, j) => (
                  <motion.div key={j} className="group flex flex-col items-center gap-1.5"
                    initial={{ opacity: 0, scale: 0.75 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 + j * 0.04 }}
                    whileHover={{ scale: 1.12, y: -3 }} whileTap={{ scale: 0.95 }}>

                    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-background/60 border border-border/50 group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-glow">
                      {/* Glow on hover */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/15 group-hover:to-accent/10 transition-all duration-300" />
                      <motion.img
                        src={skill.icon} alt={skill.name}
                        className="relative w-7 h-7 object-contain"
                        loading="lazy"
                        whileHover={{ rotate: [0, -8, 8, 0] }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-[10px] text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
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

export default Skills
