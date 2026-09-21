'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'
import { Typewriter } from '@/components/ui/Typewriter'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { ResumeModal } from '@/components/ui/ResumeModal'
import Scene from '@/components/3d/Scene'

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
}

export default function HeroSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { profile, resumePdfUrl, resumePdfName } = usePortfolioData()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* ── 3D Canvas Hero Background ── */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {mounted && <Scene />}
      </div>

      {/* ── Adaptive Gradient Overlay for Text Readability (Light & Dark) ── */}
      <div
        className="absolute inset-0 pointer-events-none hero-overlay"
        style={{ zIndex: 2 }}
      />

      {/* ── Hero Main Content ── */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio & Core Pitch (7 cols) */}
          <div className="lg:col-span-7 space-y-6">

            {/* Status Indicator */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-400/30 text-xs font-semibold text-cyan-300"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span>Available for Backend / Distributed Systems Roles</span>
            </motion.div>

            {/* Candidate Name & Title */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="space-y-2"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-gradient">
                {profile.name}
              </h1>
              <div className="h-8 flex items-center">
                <span className="text-xl sm:text-2xl font-bold text-gradient-cyan">
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
              className="flex flex-wrap gap-2 pt-1"
            >
              {['Spring Boot 3', 'Apache Kafka', 'Microservices', 'M.Tech CE', 'PostgreSQL', 'Docker'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-medium text-slate-300 glass-panel border border-white/10"
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
              className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl"
            >
              {profile.bio[0]}
            </motion.p>

            {/* Animated Counters / Metrics */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-panel rounded-xl p-3.5 border border-white/10 flex flex-col items-center text-center gap-0.5"
                >
                  <AnimatedCounter
                    value={stat.value}
                    className="text-2xl sm:text-3xl font-black text-gradient-cyan"
                  />
                  <span className="text-[11px] text-slate-400 font-medium leading-tight">
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
              className="flex flex-wrap items-center gap-3 pt-3"
            >
              {/* Option 1: Show Resume Modal (Structured View) */}
              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white btn-white-text shadow-xl transition-all duration-200 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
                  boxShadow: '0 0 25px -4px rgba(14, 165, 233, 0.6)',
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>Structured View</span>
              </button>

              {/* Option 2: Direct Download PDF */}
              <a
                href={resumePdfUrl}
                download={resumePdfName || 'Samir_Joshi_Resume.pdf'}
                className="glass-panel glass-panel-hover inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-300 border border-white/15 transition-all"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download PDF</span>
              </a>

              {/* View Projects */}
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="glass-panel glass-panel-hover inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white border border-white/10"
              >
                <span>Projects</span>
                <span>↓</span>
              </a>
            </motion.div>

            {/* Social / Direct Connect Links */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={6}
              className="flex items-center gap-3 pt-2"
            >
              {[
                { label: 'GitHub', href: profile.github, icon: '⬡' },
                { label: 'LinkedIn', href: profile.linkedin, icon: '💼' },
                { label: 'Email', href: `mailto:${profile.email}`, icon: '✉' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="glass-panel glass-panel-hover px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-cyan-300 border border-white/10 flex items-center gap-1.5 transition-colors"
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
              <span className="text-xs text-slate-400">📍 {profile.location}</span>
            </motion.div>
          </div>

          {/* Right Column: Display Picture (DP) & Interactive Candidate Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-sm"
            >
              {/* Glowing Background Ring */}
              <div
                className="absolute -inset-2 rounded-3xl opacity-75 blur-xl transition duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.45), rgba(99, 102, 241, 0.35), rgba(192, 132, 252, 0.3))',
                }}
              />

              {/* Main Profile Card */}
              <div className="relative glass-panel rounded-2xl p-6 border border-white/20 shadow-2xl space-y-5 backdrop-blur-xl">
                {/* Photo container */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden border-2 border-cyan-400/30 shadow-inner group">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Glass overlay badge on photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/20 flex items-center justify-between btn-white-text">
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">{profile.name}</p>
                      <p className="text-[10px] text-cyan-300">Spring Boot & Kafka Engineer</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-semibold text-emerald-300">
                      M.Tech
                    </span>
                  </div>
                </div>

                {/* Quick Facts Strip */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs py-1 border-b border-white/10">
                    <span className="text-slate-400">Current Role:</span>
                    <span className="font-semibold text-slate-100">Java Backend Developer</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-white/10">
                    <span className="text-slate-400">Company:</span>
                    <span className="font-semibold text-slate-100">Bhakti Enterprise</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-white/10">
                    <span className="text-slate-400">Education:</span>
                    <span className="font-semibold text-slate-100">M.Tech (Computer Eng)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="text-slate-400">Core Architecture:</span>
                    <span className="font-semibold text-cyan-400">Kafka & Microservices</span>
                  </div>
                </div>

                {/* Dual Resume Trigger Pill */}
                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center text-white bg-cyan-500/90 hover:bg-cyan-500 transition-colors shadow-sm btn-white-text"
                  >
                    Structured View
                  </button>
                  <a
                    href={resumePdfUrl}
                    download={resumePdfName || 'Samir_Joshi_Resume.pdf'}
                    className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-center text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-[10px] text-slate-400 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-[1px] h-6 bg-gradient-to-b from-cyan-400/60 to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.div>
    </section>
  )
}
