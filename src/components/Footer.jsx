import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { BsTwitterX } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { trackGithubClick, trackLinkedinClick } from '../lib/analytics'

const socials = [
  { icon: <FaLinkedin size={18} />,  href: profile.social.linkedin,  label: 'LinkedIn',  onClick: () => trackLinkedinClick('Footer') },
  { icon: <FaGithub size={18} />,    href: profile.social.github,    label: 'GitHub',    onClick: () => trackGithubClick('Footer') },
  { icon: <FaEnvelope size={18} />,  href: `mailto:${profile.social.email}`, label: 'Email', onClick: null },
  { icon: <FaInstagram size={18} />, href: profile.social.instagram, label: 'Instagram', onClick: null },
  { icon: <BsTwitterX size={16} />,  href: profile.social.x,         label: 'X',         onClick: null },
].filter(s => s.href)

const Footer = () => {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="mt-16 border-t border-border/50 bg-background/80 backdrop-blur">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row gap-10 justify-between">

          {/* Brand */}
          <div className="space-y-3 max-w-xs">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-black shadow-glow">
                {profile.name.charAt(0)}
              </span>
              <span className="font-bold text-base gradient-text-static">{profile.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full Stack Developer passionate about building innovative, scalable, and high-performance web solutions.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 pt-1">
              {socials.map(s => (
                <motion.a key={s.label} href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer" aria-label={s.label} onClick={s.onClick}
                  className="p-2 rounded-lg glass border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.93 }}>
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {['about', 'experience', 'projects', 'skills', 'education', 'contact'].map(id => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)}
                    className="capitalize text-muted-foreground hover:text-primary transition-colors duration-200">
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Let's work together</h4>
            <p className="text-sm text-muted-foreground">Open to new opportunities and collaborations.</p>
            <a href={`mailto:${profile.social.email}`}
              className="btn-glow inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
              <FaEnvelope size={13} /> Say Hello
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} <span className="text-foreground font-medium">{profile.name}</span>. All rights reserved.</p>
          <p>Built with React & Tailwind CSS ✦</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
