import fs from 'fs'
import path from 'path'
import os from 'os'

const cwd = process.cwd()
const downloadsDir = path.join(os.homedir(), 'Downloads')
const rootFile = path.join(cwd, 'samir_portfolio_data.json')

let sourceFile = null
if (fs.existsSync(rootFile)) {
  sourceFile = rootFile
} else {
  const downloadFiles = fs.readdirSync(downloadsDir)
    .filter(f => f.startsWith('samir_portfolio_data') && f.endsWith('.json'))
    .map(f => ({ file: path.join(downloadsDir, f), time: fs.statSync(path.join(downloadsDir, f)).mtimeMs }))
    .sort((a, b) => b.time - a.time)

  if (downloadFiles.length > 0) {
    sourceFile = downloadFiles[0].file
  }
}

if (!sourceFile) {
  console.error('❌ No exported samir_portfolio_data.json found in project root or Downloads folder.')
  console.log('👉 Please click "Export JSON" in the Admin Panel (http://localhost:3000/admin), then run this command again.')
  process.exit(1)
}

console.log(`📂 Found exported data at: ${sourceFile}`)
const raw = fs.readFileSync(sourceFile, 'utf8')
const data = JSON.parse(raw)

const portfolioTsPath = path.join(cwd, 'src', 'data', 'portfolio.ts')

// Format portfolioData export object
const formattedCode = `export interface ProfileData {
  name: string
  headline: string
  subtitles: string[]
  bio: string[]
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  avatar: string
  stats: { value: string; label: string; detail?: string }[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  type?: string
  location: string
  period: string
  current: boolean
  description: string
  bullets: string[]
  metrics: string[]
  techStack: string[]
}

export interface ProjectItem {
  id: string
  title: string
  category: 'Enterprise Microservices' | 'Distributed & AI' | 'Cloud Optimization' | 'Mobile & IoT'
  period: string
  role: string
  description: string
  architectureHighlights: string[]
  bullets: string[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  status?: 'live' | 'dev' | 'research'
}

export interface SkillCategory {
  title: string
  description: string
  skills: { name: string; level?: string; highlight?: boolean }[]
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  grade: string
  details: string
}

export const portfolioData = ${JSON.stringify({
  profile: data.profile,
  experience: data.experience,
  projects: data.projects,
  skills: data.skills,
  education: data.education,
}, null, 2)}
`

fs.writeFileSync(portfolioTsPath, formattedCode, 'utf8')
console.log('✅ Successfully synced admin data to src/data/portfolio.ts!')
