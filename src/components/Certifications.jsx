import React from 'react'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { getPortfolioData } from '../data/portfolioData'

export default function Certifications() {
  const { certifications } = getPortfolioData()

  return (
    <section id="certifications" className="section bg-[hsl(var(--muted))]">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Credentials and achievements.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <motion.div key={cert.id} className="card flex gap-4 items-start"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
              {cert.image ? (
                <img src={cert.image} alt={cert.name} className="w-14 h-14 object-contain rounded-lg flex-shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl">
                  🏅
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-snug">{cert.name}</h3>
                <p className="text-primary text-xs mt-0.5">{cert.issuer}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{cert.period}</p>
                {cert.link && cert.link !== '#' && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1.5">
                    View <FaExternalLinkAlt size={9} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
