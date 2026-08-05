import { profile as defaultProfile } from '../data/profile'
import { experience as defaultExp } from '../data/experience'
import { projects as defaultProj } from '../data/projects'
import { skills as defaultSkills } from '../data/skills'
import { education as defaultEdu } from '../data/education'
import { certifications as defaultCerts } from '../data/certifications'

export const KEYS = {
  profile:        'pf_profile',
  experience:     'pf_experience',
  projects:       'pf_projects',
  skills:         'pf_skills',
  education:      'pf_education',
  certifications: 'pf_certifications',
  resume:         'pf_resume',
}

const read = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}

export const getPortfolioData = () => ({
  profile:        read(KEYS.profile,        defaultProfile),
  experience:     read(KEYS.experience,     defaultExp),
  projects:       read(KEYS.projects,       defaultProj),
  skills:         read(KEYS.skills,         defaultSkills),
  education:      read(KEYS.education,      defaultEdu),
  certifications: read(KEYS.certifications, defaultCerts),
})

export const saveSection = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    window.dispatchEvent(new CustomEvent('pf-updated', { detail: { key } }))
  } catch (e) {
    console.error('Save failed for', key, e)
    throw e
  }
}

export const resetAll = () => {
  Object.values(KEYS).forEach(k => localStorage.removeItem(k))
  window.dispatchEvent(new CustomEvent('pf-updated', { detail: { key: 'all' } }))
}

export const getResume = () => localStorage.getItem(KEYS.resume) || null
