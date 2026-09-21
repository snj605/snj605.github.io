'use client'

import { useState, useEffect } from 'react'
import { portfolioData as defaultData, ProfileData, ExperienceItem, ProjectItem, SkillCategory, EducationItem } from '@/data/portfolio'

export interface CertificationItem {
  name: string
  issuer: string
  period: string
  skills: string
}

export interface FullPortfolioData {
  profile: ProfileData
  experience: ExperienceItem[]
  projects: ProjectItem[]
  skills: SkillCategory[]
  education: EducationItem[]
  certifications: CertificationItem[]
  resumePdfUrl: string
  resumePdfName: string
}

const STORAGE_KEY = 'pf_portfolio_data_v2'
const DEFAULT_RESUME_URL = '/Samir_Joshi_Resume.pdf'
const DEFAULT_RESUME_NAME = 'Samir_Joshi_Resume.pdf'

export function getStoredPortfolio(): FullPortfolioData {
  if (typeof window === 'undefined') {
    return {
      ...defaultData,
      resumePdfUrl: DEFAULT_RESUME_URL,
      resumePdfName: DEFAULT_RESUME_NAME,
    }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        ...defaultData,
        resumePdfUrl: DEFAULT_RESUME_URL,
        resumePdfName: DEFAULT_RESUME_NAME,
      }
    }
    const parsed = JSON.parse(raw)
    return {
      profile: { ...defaultData.profile, ...parsed.profile },
      experience: parsed.experience || defaultData.experience,
      projects: parsed.projects || defaultData.projects,
      skills: parsed.skills || defaultData.skills,
      education: parsed.education || defaultData.education,
      certifications: parsed.certifications || defaultData.certifications,
      resumePdfUrl: parsed.resumePdfUrl || DEFAULT_RESUME_URL,
      resumePdfName: parsed.resumePdfName || DEFAULT_RESUME_NAME,
    }
  } catch (e) {
    console.warn('Failed to read portfolio from storage:', e)
    return {
      ...defaultData,
      resumePdfUrl: DEFAULT_RESUME_URL,
      resumePdfName: DEFAULT_RESUME_NAME,
    }
  }
}

export function saveStoredPortfolio(data: FullPortfolioData): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    window.dispatchEvent(new CustomEvent('pf-updated', { detail: data }))
  } catch (e) {
    console.error('Failed to save portfolio to storage:', e)
    throw e
  }
}

export function resetStoredPortfolio(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  const fresh = {
    ...defaultData,
    resumePdfUrl: DEFAULT_RESUME_URL,
    resumePdfName: DEFAULT_RESUME_NAME,
  }
  window.dispatchEvent(new CustomEvent('pf-updated', { detail: fresh }))
}

export function usePortfolioData(): FullPortfolioData {
  const [data, setData] = useState<FullPortfolioData>(() => ({
    ...defaultData,
    resumePdfUrl: DEFAULT_RESUME_URL,
    resumePdfName: DEFAULT_RESUME_NAME,
  }))

  useEffect(() => {
    // Initial client-side load
    setData(getStoredPortfolio())

    const handleUpdate = () => {
      setData(getStoredPortfolio())
    }

    window.addEventListener('pf-updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      window.removeEventListener('pf-updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  return data
}
