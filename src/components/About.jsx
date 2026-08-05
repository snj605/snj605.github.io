import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'
import { ReactTyped } from 'react-typed'
import { motion } from 'framer-motion'
import { profile as defaultProfile } from '../data/profile'
import { trackGithubClick, trackLinkedinClick } from '../lib/analytics'
import { getResume, KEYS } from '../lib/store'

const makeSocials = (p) => [
  { href: `mailto:${p.social.email}`,  icon: <FaEnvelope />,  label: 'Email',     color: 'from-rose-500 to-pink-500',    onClick: null },
  { href: p.social.linkedin,           icon: <FaLinkedin />,  label: 'LinkedIn',  color: 'from-blue-500 to-blue-600',    onClick: () => trackLinkedinClick('About') },
  { href: p.social.github,             icon: <FaGithub />,    label: 'GitHub',    color: 'from-gray-600 to-gray-800',    onClick: () => trackGithubClick('About') },
  { href: p.social.x,                  icon: <BsTwitterX />,  label: 'X',         color: 'from-sky-400 to-sky-600',      onClick: null },
  { href: p.social.instagram,          icon: <FaInstagram />, label: 'Instagram', color: 'from-fuchsia-500 to-pink-600', onClick: null },
].filter(s => s.href)

const About = () => {
  const [profile, setProfile] = React.useState(() => {
    try { const v = localStorage.getItem(KEYS.profile); return v ? JSON.parse(v) : defaultProfile } catch { return defaultProfile }
  })
  const [resumeBlob, setResumeBlob] = React.useState(() => getResume())

  React.useEffect(() => {
    const handler = (e) => {
      if (e.detail?.key === KEYS.profile || e.detail?.key === 'all') {
        try { const v = localStorage.getItem(KEYS.profile); if (v) setProfile(JSON.parse(v)) } catch {}
      }
      if (e.detail?.key === KEYS.resume || e.detail?.key === 'all') setResumeBlob(getResume())
    }
    window.addEventListener('pf-updated', handler)
    return () => window.removeEventListener('pf-updated', handler)
  }, [])

  return (
    <section id="about" className="w-full py-16 sm:py-24 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{ x: [0,40,0], y: [0,-30,0], scale: [1,1.15,1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
          animate={{ x: [0,-30,0], y: [0,30,0], scale: [1,0.85,1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }} />
        <motion.div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-primary/5 blur-2xl"
          animate={{ x: [0,20,0], y: [0,20,0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      </div>

      <div className="container">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 lg:gap-16 max-w-6xl mx-auto">

        {/* ── Text side ── */}
        <motion.div className="flex-1 min-w-0 max-w-xl space-y-5"
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>

          {/* Availability badge */}
          <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-muted-foreground border border-border/60"
            initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-ring" />
            Available for opportunities
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <span className="gradient-text-static">{profile.name}</span>
          </motion.h1>

          <motion.div className="text-xl sm:text-2xl font-semibold"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <ReactTyped
              strings={profile.titles}
              typeSpeed={50} backSpeed={40} backDelay={2200} loop
              className="gradient-text"
            />
          </motion.div>

          <div className="space-y-3">
            {profile.bio.map((p, i) => (
              <motion.p key={i} className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}>
                {p}
              </motion.p>
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div className="flex flex-wrap gap-3 pt-2"
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}>
            <a href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-glow inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
              Get In Touch →
            </a>
            <a
              href={resumeBlob || profile.cvPath}
              download={profile.cvFileName || 'Resume.pdf'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-border/60 text-sm font-medium hover:border-primary/40 transition-all duration-200">
              Download CV ↓
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div className="flex items-center gap-2 pt-1"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ delay: 0.6 }}>
            {makeSocials(profile).map(s => (
              <motion.a key={s.label} href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer" aria-label={s.label}
                onClick={s.onClick}
                className="group relative p-2.5 rounded-xl glass border border-border/50 hover:border-primary/40 transition-all duration-200"
                whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.93 }}>
                <span className={`absolute inset-0 rounded-xl bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-15 transition-opacity duration-200`} />
                <span className="relative text-muted-foreground group-hover:text-foreground transition-colors text-base">
                  {s.icon}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Image side ── */}
        <motion.div className="flex-shrink-0 flex flex-col items-center gap-5"
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>

          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 blur-2xl" />
            {/* Floating dots */}
            <motion.div className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow"
              animate={{ scale: [1,1.4,1], opacity: [0.8,1,0.8] }}
              transition={{ duration: 2.2, repeat: Infinity }} />
            <motion.div className="absolute -bottom-3 -left-3 w-3 h-3 rounded-full bg-gradient-to-br from-accent to-pink-500"
              animate={{ scale: [1,1.3,1], opacity: [0.6,0.9,0.6] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: 1 }} />
            <motion.div className="absolute top-1/2 -right-5 w-2 h-2 rounded-full bg-primary/60"
              animate={{ y: [-4,4,-4] }} transition={{ duration: 3, repeat: Infinity }} />

            {/* Photo card */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-2xl glass border border-white/20 overflow-hidden shadow-glass-dark">
              {profile.image ? (
                <motion.img src={profile.image} alt={profile.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }} transition={{ duration: 0.4 }} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-muted via-card to-muted">
                  <span className="text-7xl animate-float">👨💻</span>
                  <span className="text-xs text-muted-foreground">Add your photo in profile.js</span>
                </div>
              )}
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Stats row */}
          <motion.div className="flex gap-3"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.5 }}>
            {[
              { value: '2+', label: 'Years Exp.' },
              { value: '10+', label: 'Projects' },
              { value: '5+', label: 'Technologies' },
            ].map(stat => (
              <div key={stat.label} className="glass border border-border/50 rounded-xl px-4 py-2.5 text-center min-w-[72px]">
                <div className="text-lg font-black gradient-text">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  )
}

export default About
