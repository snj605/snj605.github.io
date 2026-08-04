import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'
import { ReactTyped } from 'react-typed'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { trackGithubClick, trackLinkedinClick } from '../lib/analytics'

const About = () => {
  return (
    <section id="about" className="container py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400/5 to-blue-500/5 rounded-full blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text */}
        <motion.div className="flex-1"
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            {profile.name}
          </motion.h1>
          <motion.h3
            className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <ReactTyped
              strings={profile.titles}
              typeSpeed={50} backSpeed={50} backDelay={2000} loop
              className="typed-text bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent"
            />
          </motion.h3>
          {profile.bio.map((p, i) => (
            <motion.p key={i}
              className="mt-3 text-muted-foreground text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}>
              {p}
            </motion.p>
          ))}
        </motion.div>

        {/* Image + Socials */}
        <motion.div className="flex-1 w-full flex flex-col items-center gap-4"
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="relative group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg blur-lg opacity-20"
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-primary to-purple-500 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-500">
              {profile.image ? (
                <motion.img
                  src={profile.image} alt={profile.name}
                  className="w-full h-auto" loading="lazy"
                  whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center text-8xl bg-gradient-to-br from-muted to-card">
                  👨‍💻
                </div>
              )}
            </div>
          </div>

          <motion.div className="flex items-center gap-4 text-xl"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
            {[
              { href: `mailto:${profile.social.email}`, icon: <FaEnvelope />, label: 'Email', onClick: null },
              { href: profile.social.linkedin, icon: <FaLinkedin />, label: 'LinkedIn', onClick: () => trackLinkedinClick('About Section') },
              { href: profile.social.github, icon: <FaGithub />, label: 'GitHub', onClick: () => trackGithubClick('About Section') },
              { href: profile.social.x, icon: <BsTwitterX />, label: 'X', onClick: null },
              { href: profile.social.instagram, icon: <FaInstagram />, label: 'Instagram', onClick: null },
            ].filter(s => s.href).map(s => (
              <motion.a key={s.label} href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer" aria-label={s.label}
                onClick={s.onClick}
                className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 hover:from-primary/20 hover:to-purple-500/20 transition-all duration-300 hover:scale-110 border border-border/50"
                whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                {s.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
