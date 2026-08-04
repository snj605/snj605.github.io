import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { FaAws, FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { certifications } from '../data/certifications'

const Certifications = () => {
  const [flipped, setFlipped] = useState({})
  const toggle = (i) => setFlipped(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <section id="certifications" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/6 blur-2xl"
          animate={{ x: [0,-20,0], y: [0,20,0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <div className="container">
        <motion.div className="mb-4"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-heading">Certifications</h2>
        </motion.div>
        <motion.p className="text-muted-foreground text-sm mb-12"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Click a card to flip and see the badge.
        </motion.p>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.1 }}>
              <ReactCardFlip isFlipped={!!flipped[i]} flipDirection="horizontal">
                {/* Front */}
                <div
                  className="glass rounded-2xl p-6 cursor-pointer border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
                  onClick={() => toggle(i)}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 border border-primary/20 flex items-center justify-center">
                      {cert.icon === 'aws'
                        ? <FaAws size={28} className="text-[#FF9900]" />
                        : <FaGithub size={28} className="text-foreground" />
                      }
                    </div>
                    <div>
                      <h3 className="font-bold text-sm leading-snug">{cert.name}</h3>
                      <p className="text-xs text-primary font-medium mt-1">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cert.period}</p>
                    </div>
                    {cert.link && cert.link !== '#' && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                        onClick={e => e.stopPropagation()}>
                        View Certificate →
                      </a>
                    )}
                    <span className="text-[10px] text-muted-foreground/60 mt-1">Click to flip</span>
                  </div>
                </div>

                {/* Back */}
                <div
                  className={`rounded-2xl p-4 cursor-pointer border transition-all duration-300 hover:-translate-y-1 ${cert.icon === 'aws' ? 'bg-[#FF9900] border-[#FF9900]/50' : 'bg-foreground/90 border-foreground/20'}`}
                  onClick={() => toggle(i)}>
                  {cert.image
                    ? <img src={cert.image} alt={cert.name} className="w-full h-auto rounded-xl" loading="lazy" />
                    : (
                      <div className="h-40 flex flex-col items-center justify-center gap-2 text-white/80">
                        <span className="text-4xl">🏅</span>
                        <span className="text-xs">Add image in certifications.js</span>
                      </div>
                    )
                  }
                  <p className="text-center text-xs text-white/60 mt-2">Click to flip back</p>
                </div>
              </ReactCardFlip>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
