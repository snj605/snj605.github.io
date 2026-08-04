import React from 'react'
import { motion } from 'framer-motion'
import { ReactTyped } from 'react-typed'
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from 'react-icons/fa'
import { getPortfolioData } from '../data/portfolioData'

export default function Hero() {
  const { hero } = getPortfolioData()

  const socials = [
    { icon: <FaGithub />,   href: hero.social.github,   label: 'GitHub' },
    { icon: <FaLinkedin />, href: hero.social.linkedin, label: 'LinkedIn' },
    { icon: <FaEnvelope />, href: `mailto:${hero.social.email}`, label: 'Email' },
    { icon: <FaTwitter />,  href: hero.social.twitter,  label: 'Twitter' },
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">

          {/* Text */}
          <motion.div className="flex-1"
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>

            <p className="text-primary font-medium mb-2">{hero.greeting}</p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
              {hero.name}
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-[hsl(var(--muted-foreground))]">
              <ReactTyped strings={hero.titles} typeSpeed={50} backSpeed={40} backDelay={2000} loop />
            </h2>

            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-8 max-w-lg">
              {hero.bio}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a href={hero.cvPath} download={hero.cvFileName} className="btn-primary">
                Download Resume
              </a>
              <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-outline">
                Contact Me
              </a>
            </div>

            <div className="flex items-center gap-4 text-lg">
              {socials.filter(s => s.href).map(s => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2 rounded-lg border border-[hsl(var(--border))] hover:border-primary hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div className="flex-shrink-0"
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="relative w-56 h-56 sm:w-72 sm:h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl" />
              {hero.profileImage ? (
                <img src={hero.profileImage} alt={hero.name}
                  className="relative w-full h-full rounded-full object-cover border-4 border-[hsl(var(--border))]" />
              ) : (
                <div className="relative w-full h-full rounded-full border-4 border-[hsl(var(--border))] bg-[hsl(var(--muted))] flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
