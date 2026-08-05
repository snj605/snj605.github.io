import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaPlus, FaTrash, FaSave, FaLock, FaEdit, FaBriefcase, FaCode, FaUser, FaTools, FaGraduationCap, FaCertificate, FaUpload, FaFilePdf, FaTimes } from 'react-icons/fa'
import { profile as defaultProfile } from '../data/profile'
import { experience as defaultExp } from '../data/experience'
import { projects as defaultProj } from '../data/projects'
import { skills as defaultSkills } from '../data/skills'
import { education as defaultEdu } from '../data/education'
import { certifications as defaultCerts } from '../data/certifications'
import { KEYS, saveSection, resetAll } from '../lib/store'

const ADMIN_PASSWORD = 'admin123'

// ── Reusable inputs ──────────────────────────────────────────
function Field({ label, children }) {
  return <div><label className="admin-label">{label}</label>{children}</div>
}

function Input({ value, onChange, placeholder, type = 'text' }) {
  return <input type={type} className="admin-input" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
}

function Textarea({ value, onChange, rows = 3 }) {
  return <textarea className="admin-input resize-none" rows={rows} value={value || ''} onChange={e => onChange(e.target.value)} />
}

function TagInput({ tags, onChange }) {
  const [input, setInput] = useState('')
  const add = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault()
      if (!tags.includes(input.trim())) onChange([...tags, input.trim()])
      setInput('')
    }
  }
  return (
    <div className="flex flex-wrap gap-1.5 p-2 rounded-lg border border-border/60 bg-muted/30 min-h-[40px]">
      {tags.map((t, i) => (
        <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-primary/15 text-primary border border-primary/25">
          {t}
          <button type="button" onClick={() => onChange(tags.filter((_, j) => j !== i))} className="hover:text-red-400">×</button>
        </span>
      ))}
      <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={add}
        placeholder="Type & press Enter"
        className="flex-1 min-w-[120px] bg-transparent text-xs outline-none text-foreground placeholder:text-muted-foreground" />
    </div>
  )
}

function BulletList({ bullets, onChange }) {
  return (
    <div className="space-y-2">
      {bullets.map((b, i) => (
        <div key={i} className="flex gap-2">
          <input value={b} onChange={e => { const n = [...bullets]; n[i] = e.target.value; onChange(n) }}
            className="flex-1 admin-input text-xs" placeholder={`Point ${i + 1}`} />
          <button type="button" onClick={() => onChange(bullets.filter((_, j) => j !== i))}
            className="p-1.5 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-muted-foreground transition-colors">
            <FaTrash size={10} />
          </button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...bullets, ''])}
        className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors">
        <FaPlus size={10} /> Add point
      </button>
    </div>
  )
}

function ImagePreview({ src }) {
  if (!src) return null
  return <img src={src} alt="preview" className="mt-2 h-16 w-16 rounded-lg object-cover border border-border/40" onError={e => e.target.style.display = 'none'} />
}

// Converts a file to base64 data URL
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Upload button for images — sets value to base64 data URL
function ImageUpload({ value, onChange, label = 'Upload Image' }) {
  const ref = useRef()
  const handle = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const b64 = await toBase64(file)
    onChange(b64)
    e.target.value = ''
  }
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <button type="button" onClick={() => ref.current.click()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-primary/40 text-xs text-primary hover:bg-primary/5 transition-colors">
          <FaUpload size={10} /> {label}
        </button>
        {value && (
          <button type="button" onClick={() => onChange('')} className="text-xs text-red-400 hover:text-red-500 transition-colors flex items-center gap-1">
            <FaTimes size={10} /> Remove
          </button>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
      {value && <img src={value} alt="preview" className="h-16 w-16 rounded-lg object-cover border border-border/40" />}
    </div>
  )
}

// Upload button for PDF resume
function ResumeUpload({ value, onChange }) {
  const ref = useRef()
  const handle = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const b64 = await toBase64(file)
    onChange(b64)
    e.target.value = ''
  }
  return (
    <div className="flex gap-2 items-center">
      <button type="button" onClick={() => ref.current.click()}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-primary/40 text-xs text-primary hover:bg-primary/5 transition-colors">
        <FaFilePdf size={10} /> Upload PDF Resume
      </button>
      {value && (
        <>
          <span className="text-xs text-emerald-400 flex items-center gap-1">✓ Resume uploaded</span>
          <button type="button" onClick={() => onChange(null)} className="text-xs text-red-400 hover:text-red-500 transition-colors flex items-center gap-1">
            <FaTimes size={10} /> Remove
          </button>
        </>
      )}
      <input ref={ref} type="file" accept="application/pdf" className="hidden" onChange={handle} />
    </div>
  )
}

function Card({ label, color = 'primary', onDelete, children }) {
  return (
    <div className="glass rounded-xl p-4 space-y-3 border border-border/40">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold uppercase tracking-widest text-${color}`}>{label}</span>
        {onDelete && <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-muted-foreground transition-colors"><FaTrash size={11} /></button>}
      </div>
      {children}
    </div>
  )
}

// ── Section Editors ──────────────────────────────────────────

function ProfileEditor({ data, onChange, resume, onResumeChange }) {
  const set = (field, val) => onChange({ ...data, [field]: val })
  const setSocial = (field, val) => onChange({ ...data, social: { ...data.social, [field]: val } })
  const setBio = (i, val) => { const n = [...data.bio]; n[i] = val; onChange({ ...data, bio: n }) }

  return (
    <div className="space-y-4">
      <Card label="Basic Info">
        <div className="grid grid-cols-2 gap-2">
          <Field label="Full Name"><Input value={data.name} onChange={v => set('name', v)} /></Field>
          <Field label="CV File Name (for download)"><Input value={data.cvFileName} onChange={v => set('cvFileName', v)} /></Field>
        </div>
        <Field label="Profile Photo">
          <ImageUpload value={data.image} onChange={v => set('image', v)} label="Upload Photo" />
          <p className="text-[10px] text-muted-foreground mt-1">Or paste a URL:</p>
          <Input value={data.image?.startsWith('data:') ? '' : data.image} onChange={v => set('image', v)} placeholder="https://..." />
        </Field>
        <Field label="Resume / CV (PDF)">
          <ResumeUpload value={resume} onChange={onResumeChange} />
          <p className="text-[10px] text-muted-foreground mt-1">Or set a URL path (fallback):</p>
          <Input value={data.cvPath} onChange={v => set('cvPath', v)} placeholder="/resume.pdf" />
        </Field>
      </Card>

      <Card label="Titles (Typed Animation)">
        <BulletList bullets={data.titles || []} onChange={v => onChange({ ...data, titles: v })} />
      </Card>

      <Card label="Bio Paragraphs">
        <div className="space-y-2">
          {(data.bio || []).map((b, i) => (
            <div key={i} className="flex gap-2">
              <textarea value={b} onChange={e => setBio(i, e.target.value)}
                className="flex-1 admin-input text-xs resize-none" rows={2} placeholder={`Paragraph ${i + 1}`} />
              <button type="button" onClick={() => onChange({ ...data, bio: data.bio.filter((_, j) => j !== i) })}
                className="p-1.5 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-muted-foreground transition-colors self-start mt-1">
                <FaTrash size={10} />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => onChange({ ...data, bio: [...(data.bio || []), ''] })}
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors">
            <FaPlus size={10} /> Add paragraph
          </button>
        </div>
      </Card>

      <Card label="Social Links">
        <div className="grid grid-cols-2 gap-2">
          {['email', 'linkedin', 'github', 'x', 'instagram'].map(k => (
            <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}>
              <Input value={data.social?.[k]} onChange={v => setSocial(k, v)} placeholder={k === 'email' ? 'you@email.com' : 'https://...'} />
            </Field>
          ))}
        </div>
      </Card>
    </div>
  )
}

function ExperienceEditor({ data, onChange }) {
  const update = (i, field, val) => { const n = [...data]; n[i] = { ...n[i], [field]: val }; onChange(n) }
  const addNew = () => onChange([...data, { title: '', company: '', location: '', period: '', current: false, description: '', bullets: [], achievements: [], tags: [] }])
  return (
    <div className="space-y-4">
      {data.map((exp, i) => (
        <Card key={i} label={`Experience #${i + 1}`} onDelete={() => onChange(data.filter((_, j) => j !== i))}>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Job Title"><Input value={exp.title} onChange={v => update(i, 'title', v)} /></Field>
            <Field label="Company"><Input value={exp.company} onChange={v => update(i, 'company', v)} /></Field>
            <Field label="Location"><Input value={exp.location} onChange={v => update(i, 'location', v)} /></Field>
            <Field label="Period"><Input value={exp.period} onChange={v => update(i, 'period', v)} /></Field>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id={`cur-${i}`} checked={exp.current} onChange={e => update(i, 'current', e.target.checked)} className="rounded" />
            <label htmlFor={`cur-${i}`} className="text-xs text-muted-foreground">Currently working here</label>
          </div>
          <Field label="Description"><Textarea value={exp.description} onChange={v => update(i, 'description', v)} /></Field>
          <Field label="Responsibilities"><BulletList bullets={exp.bullets || []} onChange={v => update(i, 'bullets', v)} /></Field>
          <Field label="Key Achievements"><BulletList bullets={exp.achievements || []} onChange={v => update(i, 'achievements', v)} /></Field>
          <Field label="Tech Stack (Enter to add)"><TagInput tags={exp.tags || []} onChange={v => update(i, 'tags', v)} /></Field>
        </Card>
      ))}
      <button onClick={addNew} className="w-full py-2.5 rounded-xl border-2 border-dashed border-primary/30 text-primary text-sm hover:border-primary/60 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
        <FaPlus size={12} /> Add Experience
      </button>
    </div>
  )
}

function ProjectEditor({ data, onChange }) {
  const update = (i, field, val) => { const n = [...data]; n[i] = { ...n[i], [field]: val }; onChange(n) }
  const updateLink = (i, key, val) => { const n = [...data]; n[i] = { ...n[i], links: { ...n[i].links, [key]: val } }; onChange(n) }
  const addNew = () => onChange([...data, { title: '', period: '', status: 'Completed', role: '', description: '', bullets: [], tags: [], links: { code: '', demo: '' } }])
  return (
    <div className="space-y-4">
      {data.map((proj, i) => (
        <Card key={i} label={`Project #${i + 1}`} color="accent" onDelete={() => onChange(data.filter((_, j) => j !== i))}>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Project Title"><Input value={proj.title} onChange={v => update(i, 'title', v)} /></Field>
            <Field label="Period / Year"><Input value={proj.period} onChange={v => update(i, 'period', v)} /></Field>
            <Field label="Status">
              <select className="admin-input" value={proj.status} onChange={e => update(i, 'status', e.target.value)}>
                <option>Completed</option><option>In Progress</option><option>Archived</option>
              </select>
            </Field>
            <Field label="Your Role"><Input value={proj.role} onChange={v => update(i, 'role', v)} /></Field>
          </div>
          <Field label="Description"><Textarea value={proj.description} onChange={v => update(i, 'description', v)} /></Field>
          <Field label="Key Features"><BulletList bullets={proj.bullets || []} onChange={v => update(i, 'bullets', v)} /></Field>
          <Field label="Tech Stack (Enter to add)"><TagInput tags={proj.tags || []} onChange={v => update(i, 'tags', v)} /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="GitHub URL"><Input value={proj.links?.code} onChange={v => updateLink(i, 'code', v)} placeholder="https://github.com/..." /></Field>
            <Field label="Live Demo URL"><Input value={proj.links?.demo} onChange={v => updateLink(i, 'demo', v)} placeholder="https://..." /></Field>
          </div>
        </Card>
      ))}
      <button onClick={addNew} className="w-full py-2.5 rounded-xl border-2 border-dashed border-accent/30 text-accent text-sm hover:border-accent/60 hover:bg-accent/5 transition-all flex items-center justify-center gap-2">
        <FaPlus size={12} /> Add Project
      </button>
    </div>
  )
}

function SkillsEditor({ data, onChange }) {
  const updateGroup = (gi, field, val) => { const n = [...data]; n[gi] = { ...n[gi], [field]: val }; onChange(n) }
  const updateItem = (gi, ii, field, val) => { const n = [...data]; n[gi].items[ii] = { ...n[gi].items[ii], [field]: val }; onChange(n) }
  const addItem = (gi) => { const n = [...data]; n[gi].items.push({ name: '', icon: '' }); onChange(n) }
  const removeItem = (gi, ii) => { const n = [...data]; n[gi].items = n[gi].items.filter((_, j) => j !== ii); onChange(n) }
  const addGroup = () => onChange([...data, { title: '', items: [] }])
  return (
    <div className="space-y-4">
      {data.map((group, gi) => (
        <Card key={gi} label={`Skill Group #${gi + 1}`} color="primary" onDelete={() => onChange(data.filter((_, j) => j !== gi))}>
          <Field label="Group Title"><Input value={group.title} onChange={v => updateGroup(gi, 'title', v)} placeholder="e.g. Frontend" /></Field>
          <label className="admin-label mt-2 block">Skills</label>
          <div className="space-y-2">
            {group.items.map((item, ii) => (
              <div key={ii} className="space-y-1 p-2 rounded-lg bg-muted/20 border border-border/30">
                <div className="flex gap-2 items-center">
                  <Input value={item.name} onChange={v => updateItem(gi, ii, 'name', v)} placeholder="Skill name" />
                  <button onClick={() => removeItem(gi, ii)} className="p-1.5 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-muted-foreground transition-colors shrink-0">
                    <FaTrash size={10} />
                  </button>
                </div>
                <ImageUpload value={item.icon} onChange={v => updateItem(gi, ii, 'icon', v)} label="Upload Icon" />
                <Input value={item.icon?.startsWith('data:') ? '' : item.icon} onChange={v => updateItem(gi, ii, 'icon', v)} placeholder="Or paste icon URL (devicons CDN, etc.)" />
              </div>
            ))}
            <button onClick={() => addItem(gi)} className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors">
              <FaPlus size={10} /> Add skill
            </button>
          </div>
        </Card>
      ))}
      <button onClick={addGroup} className="w-full py-2.5 rounded-xl border-2 border-dashed border-primary/30 text-primary text-sm hover:border-primary/60 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
        <FaPlus size={12} /> Add Skill Group
      </button>
    </div>
  )
}

function EducationEditor({ data, onChange }) {
  const update = (i, field, val) => { const n = [...data]; n[i] = { ...n[i], [field]: val }; onChange(n) }
  const addNew = () => onChange([...data, { degree: '', institution: '', period: '', extra: '', logo: '' }])
  return (
    <div className="space-y-4">
      {data.map((edu, i) => (
        <Card key={i} label={`Education #${i + 1}`} onDelete={() => onChange(data.filter((_, j) => j !== i))}>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Degree"><Input value={edu.degree} onChange={v => update(i, 'degree', v)} /></Field>
            <Field label="Institution"><Input value={edu.institution} onChange={v => update(i, 'institution', v)} /></Field>
            <Field label="Period"><Input value={edu.period} onChange={v => update(i, 'period', v)} /></Field>
            <Field label="Extra (CGPA, etc.)"><Input value={edu.extra} onChange={v => update(i, 'extra', v)} /></Field>
          </div>
          <Field label="Institution Logo">
            <ImageUpload value={edu.logo} onChange={v => update(i, 'logo', v)} label="Upload Logo" />
            <Input value={edu.logo?.startsWith('data:') ? '' : edu.logo} onChange={v => update(i, 'logo', v)} placeholder="Or paste URL" />
          </Field>
        </Card>
      ))}
      <button onClick={addNew} className="w-full py-2.5 rounded-xl border-2 border-dashed border-primary/30 text-primary text-sm hover:border-primary/60 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
        <FaPlus size={12} /> Add Education
      </button>
    </div>
  )
}

function CertificationsEditor({ data, onChange }) {
  const update = (i, field, val) => { const n = [...data]; n[i] = { ...n[i], [field]: val }; onChange(n) }
  const addNew = () => onChange([...data, { name: '', issuer: '', period: '', link: '', image: '' }])
  return (
    <div className="space-y-4">
      {data.map((cert, i) => (
        <Card key={i} label={`Certification #${i + 1}`} color="accent" onDelete={() => onChange(data.filter((_, j) => j !== i))}>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Certificate Name"><Input value={cert.name} onChange={v => update(i, 'name', v)} /></Field>
            <Field label="Issuer"><Input value={cert.issuer} onChange={v => update(i, 'issuer', v)} /></Field>
            <Field label="Period / Year"><Input value={cert.period} onChange={v => update(i, 'period', v)} /></Field>
            <Field label="Certificate Link"><Input value={cert.link} onChange={v => update(i, 'link', v)} placeholder="https://..." /></Field>
          </div>
          <Field label="Badge / Certificate Image">
            <ImageUpload value={cert.image} onChange={v => update(i, 'image', v)} label="Upload Badge" />
            <Input value={cert.image?.startsWith('data:') ? '' : cert.image} onChange={v => update(i, 'image', v)} placeholder="Or paste image URL" />
          </Field>
        </Card>
      ))}
      <button onClick={addNew} className="w-full py-2.5 rounded-xl border-2 border-dashed border-accent/30 text-accent text-sm hover:border-accent/60 hover:bg-accent/5 transition-all flex items-center justify-center gap-2">
        <FaPlus size={12} /> Add Certification
      </button>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────────────

const TABS = [
  { id: 'profile',        label: 'Profile',        icon: FaUser },
  { id: 'experience',     label: 'Experience',      icon: FaBriefcase },
  { id: 'projects',       label: 'Projects',        icon: FaCode },
  { id: 'skills',         label: 'Skills',          icon: FaTools },
  { id: 'education',      label: 'Education',       icon: FaGraduationCap },
  { id: 'certifications', label: 'Certifications',  icon: FaCertificate },
]

export default function AdminPage() {
  const [authed, setAuthed]   = useState(false)
  const [pw, setPw]           = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab]         = useState('profile')
  const [saved, setSaved]     = useState(false)
  const [saveError, setSaveError] = useState('')

  const [profileData, setProfileData]   = useState(null)
  const [expData, setExpData]           = useState(null)
  const [projData, setProjData]         = useState(null)
  const [skillsData, setSkillsData]     = useState(null)
  const [eduData, setEduData]           = useState(null)
  const [certsData, setCertsData]       = useState(null)
  const [resume, setResume]             = useState(null)

  useEffect(() => {
    if (!authed) return
    const load = (key, fallback) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback } catch { return fallback } }
    setProfileData(load(KEYS.profile, defaultProfile))
    setExpData(load(KEYS.experience, defaultExp))
    setProjData(load(KEYS.projects, defaultProj))
    setSkillsData(load(KEYS.skills, defaultSkills))
    setEduData(load(KEYS.education, defaultEdu))
    setCertsData(load(KEYS.certifications, defaultCerts))
    setResume(localStorage.getItem(KEYS.resume) || null)
  }, [authed])

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else setPwError(true)
  }

  const handleSave = () => {
    setSaveError('')
    const sections = [
      [KEYS.profile, profileData],
      [KEYS.experience, expData],
      [KEYS.projects, projData],
      [KEYS.skills, skillsData],
      [KEYS.education, eduData],
      [KEYS.certifications, certsData],
    ]
    try {
      sections.forEach(([key, data]) => saveSection(key, data))
      if (resume) {
        localStorage.setItem(KEYS.resume, resume)
        window.dispatchEvent(new CustomEvent('pf-updated', { detail: { key: KEYS.resume } }))
      } else {
        localStorage.removeItem(KEYS.resume)
        window.dispatchEvent(new CustomEvent('pf-updated', { detail: { key: KEYS.resume } }))
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) {
      if (e?.name === 'QuotaExceededError' || e?.code === 22) {
        setSaveError('Storage full! Uploaded images are too large. Use URLs instead of uploading large files.')
      } else {
        setSaveError('Save failed: ' + (e?.message || 'Unknown error'))
      }
    }
  }

  const handleReset = () => { resetAll(); window.location.reload() }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-xs space-y-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/25 flex items-center justify-center mx-auto">
            <FaLock size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">Admin Access</h3>
            <p className="text-xs text-muted-foreground mt-1">Enter password to continue</p>
          </div>
          <input type="password" value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Password"
            className={`admin-input text-center ${pwError ? 'border-red-500/60' : ''}`} />
          {pwError && <p className="text-xs text-red-400">Incorrect password</p>}
          <button onClick={handleLogin} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
            Unlock
          </button>
          <p className="text-[10px] text-muted-foreground">Default: admin123</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <FaEdit size={12} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Portfolio Admin</h2>
            <p className="text-[10px] text-muted-foreground">Full content editor</p>
          </div>
        </div>
        <a href="/#/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">← Back to portfolio</a>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 px-6 pt-4 shrink-0">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${tab === id ? 'bg-primary/15 text-primary border border-primary/25' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
            <Icon size={11} /> {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 max-w-3xl w-full mx-auto">
        {tab === 'profile'        && profileData && <ProfileEditor        data={profileData}  onChange={setProfileData} resume={resume} onResumeChange={setResume} />}
        {tab === 'experience'     && expData     && <ExperienceEditor     data={expData}      onChange={setExpData} />}
        {tab === 'projects'       && projData    && <ProjectEditor        data={projData}     onChange={setProjData} />}
        {tab === 'skills'         && skillsData  && <SkillsEditor         data={skillsData}   onChange={setSkillsData} />}
        {tab === 'education'      && eduData     && <EducationEditor      data={eduData}      onChange={setEduData} />}
        {tab === 'certifications' && certsData   && <CertificationsEditor data={certsData}    onChange={setCertsData} />}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border/40 flex items-center justify-between gap-3 max-w-3xl w-full mx-auto shrink-0">
        <button onClick={handleReset} className="text-xs text-muted-foreground hover:text-red-400 transition-colors">
          Reset all to defaults
        </button>
        <motion.button onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          whileTap={{ scale: 0.97 }}>
          <FaSave size={12} />
          {saved ? '✓ Saved!' : 'Save All Changes'}
        </motion.button>
      </div>
    </div>
  )
}
