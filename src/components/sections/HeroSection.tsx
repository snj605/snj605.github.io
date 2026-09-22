'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'
import { Typewriter } from '@/components/ui/Typewriter'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { ResumeModal } from '@/components/ui/ResumeModal'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: "easeOut" as const,
    },
  }),
}

export default function HeroSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const { profile, resumePdfUrl, resumePdfName } = usePortfolioData()

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 bg-background text-foreground"
    >
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Core Pitch (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Status Indicator */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-secondary/20 text-xs font-semibold text-primary"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span>Available for Backend / Distributed Systems Roles</span>
            </motion.div>

            {/* Candidate Name & Title */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-none text-foreground">
                {profile.name}
              </h1>
              <div className="h-8 flex items-center">
                <span className="text-xl sm:text-2xl font-serif text-primary">
                  <Typewriter
                    phrases={profile.subtitles}
                    typingSpeed={60}
                    pauseMs={2200}
                  />
                </span>
              </div>
            </motion.div>

            {/* Subtitle Badges */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="flex flex-wrap gap-2 pt-2"
            >
              {['Spring Boot 3', 'Apache Kafka', 'Microservices', 'M.Tech CE', 'PostgreSQL', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-medium terracotta-tag"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Summary Bio */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl font-sans"
            >
              {profile.bio[0]}
            </motion.p>

            {/* Animated Counters / Metrics */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4"
            >
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="terracotta-card p-4 flex flex-col items-center text-center gap-1 shadow-sm"
                >
                  <AnimatedCounter
                    value={stat.value}
                    className="text-2xl sm:text-3xl font-display font-bold text-primary"
                  />
                  <span className="text-xs text-muted-foreground font-medium leading-tight uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons: Resume View/Download, Contact, Projects */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={5}
              className="flex flex-wrap items-center gap-4 pt-6"
            >
              <button
                onClick={() => setIsResumeOpen(true)}
                className="terracotta-btn-primary group"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Structured View
              </button>

              <a
                href={resumePdfUrl}
                download={resumePdfName || 'Samir_Joshi_Resume.pdf'}
                className="terracotta-btn-secondary"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1 px-2"
              >
                Projects <span className="text-xl leading-none">↓</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={6}
              className="flex items-center gap-4 pt-4 border-t border-border mt-6"
            >
              {[
                { label: 'GitHub', href: profile.github },
                { label: 'LinkedIn', href: profile.linkedin },
                { label: 'Email', href: `mailto:${profile.email}` },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <span className="text-sm text-muted-foreground ml-auto hidden sm:block">📍 {profile.location}</span>
            </motion.div>
          </div>

          {/* Right Column: Display Picture (DP) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
              className="relative w-full max-w-sm"
            >
              <div className="terracotta-card p-4 shadow-xl">
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden group">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </section>
  )
}
