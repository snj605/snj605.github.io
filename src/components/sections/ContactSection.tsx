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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 90%, rgba(56,189,248,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative container mx-auto px-6 lg:px-16 max-w-3xl text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-500">
            Let's Build Together
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-gradient leading-tight">
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
            className="glass-panel rounded-2xl p-5 border border-[var(--border)] hover:border-cyan-400/30 transition-all duration-300 space-y-2 group text-left"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 block">
              Email Address
            </span>
            <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
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
            className="glass-panel rounded-2xl p-5 border border-[var(--border)] hover:border-cyan-400/30 transition-all duration-300 space-y-2 group text-left"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 block">
              LinkedIn Profile
            </span>
            <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
              samir-joshi-a6965b1a5
            </p>
            <p className="text-[10px] text-[var(--text-muted)] group-hover:text-cyan-500 transition-colors">
              Connect on LinkedIn ↗
            </p>
          </a>

          {/* Location */}
          <div className="glass-panel rounded-2xl p-5 border border-[var(--border)] space-y-2 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 block">
              Location
            </span>
            <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
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
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold overflow-hidden group btn-white-text"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #6366f1 60%, #c084fc 100%)',
              boxShadow: '0 0 60px -10px rgba(99,102,241,0.5), 0 0 30px -5px rgba(56,189,248,0.3)',
            }}
          >
            <span className="relative z-10 text-white btn-white-text">Send a Message</span>
            <span className="text-white btn-white-text text-sm">→</span>

            {/* Shimmer */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
                transform: 'skewX(-15deg)',
              }}
            />
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
