'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/lib/portfolioStore'
import { ResumeModal } from '@/components/ui/ResumeModal'

export default function ResumeSection() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const { profile, experience, resumePdfUrl, resumePdfName } = usePortfolioData()

  return (
    <section id="resume" className="relative py-20">
      <div className="container mx-auto px-6 lg:px-16 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="terracotta-card p-8 sm:p-12 border border-border relative overflow-hidden shadow-sm"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Info */}
            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold uppercase tracking-widest text-primary">
                <span>📄 Recruiter Quick Access</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground leading-tight">
                Curriculum Vitae & Verified Credentials
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Directly inspect the authenticated resume of <span className="font-semibold text-foreground">{profile.name}</span>. Featuring {experience.length} enterprise/academic appointments, Master of Technology thesis research in metaheuristic cloud load balancing, and verified production tech stacks.
              </p>

              {/* Quick highlights */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-xs text-muted-foreground pt-1 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  ATS-Optimized Format
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  M.Tech CE (CPI: 7.77)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Spring Boot & Kafka
                </span>
              </div>
            </div>

            {/* Right Action Options: Exactly 2 Ways */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
              {/* Option 1: Structured View */}
              <button
                onClick={() => setIsResumeOpen(true)}
                className="terracotta-btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold shadow-sm hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>1. Structured View</span>
              </button>

              {/* Option 2: Download */}
              <a
                href={resumePdfUrl}
                download={resumePdfName || 'Samir_Joshi_Resume.pdf'}
                className="terracotta-btn-secondary inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all text-center"
              >
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>2. Download Original PDF</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </section>
  )
}
