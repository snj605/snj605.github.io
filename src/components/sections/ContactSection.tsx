'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const { profile } = usePortfolioData()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard API fails
    }
  }

  return (
    <section id="contact" className="relative py-32">
      {/* Ambient glow blob */}
      <div className="absolute inset-0 pointer-events-none bg-background/50" />

      <div className="relative container mx-auto px-6 lg:px-16 max-w-3xl text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Let's Build Together
          </span>
          <h2 className="text-4xl sm:text-6xl font-display font-bold text-foreground leading-tight">
            Ready to Collaborate?
          </h2>
          <p className="text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
            I'm actively seeking backend engineering positions where I can architect
            scalable microservices, drive system design, and ship high-impact products.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {/* Email */}
          <button
            onClick={copyEmail}
            className="terracotta-card p-5 border-transparent hover:border-border transition-all duration-300 space-y-2 group text-left shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-primary block">
              Email Address
            </span>
            <p className="text-xs font-semibold text-foreground truncate">
              {profile.email}
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">
              {copied ? '✓ Copied to clipboard!' : 'Click to copy email'}
            </p>
          </button>

          {/* LinkedIn */}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="terracotta-card p-5 border-transparent hover:border-border transition-all duration-300 space-y-2 group text-left shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-secondary block">
              LinkedIn Profile
            </span>
            <p className="text-xs font-semibold text-foreground truncate">
              samir-joshi-a6965b1a5
            </p>
            <p className="text-[10px] text-[var(--text-muted)] group-hover:text-primary transition-colors">
              Connect on LinkedIn ↗
            </p>
          </a>

          {/* Location */}
          <div className="terracotta-card p-5 border-transparent shadow-sm space-y-2 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-primary block">
              Location
            </span>
            <p className="text-xs font-semibold text-foreground truncate">
              {profile.location}
            </p>
            <p className="text-[10px] text-[var(--text-muted)]">
              Open to Remote & Relocation
            </p>
          </div>
        </motion.div>

        {/* Big CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex justify-center pt-4"
        >
          <a
            href={`mailto:${profile.email}?subject=Backend Engineering Opportunity&body=Hi Samir,`}
            className="terracotta-btn-primary relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold overflow-hidden group shadow-md"
          >
            <span className="relative z-10">Send a Message</span>
            <span className="text-sm">→</span>
          </a>
        </motion.div>

        {/* Footer line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xs text-[var(--text-muted)] pt-8 border-t border-[var(--border)] space-y-2"
        >
          <p>
            Built with Next.js 15 · React Three Fiber · Tailwind CSS v4 · Motion
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px]">
            <span>© {new Date().getFullYear()} {profile.name} · {profile.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
