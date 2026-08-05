import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaPlus, FaTrash, FaSave, FaLock, FaEdit, FaBriefcase, FaCode } from 'react-icons/fa'
import { experience as defaultExp } from '../../data/experience'
import { projects as defaultProj } from '../../data/projects'
import { KEYS, saveSection } from '../../lib/store'

const ADMIN_PASSWORD = 'admin123'

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
          <button type="button" onClick={() => onChange(tags.filter((_, j) => j !== i))} className="hover:text-red-400 transition-colors">×</button>
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

function ExperienceEditor({ data, onChange }) {
  const update = (i, field, val) => { const n = [...data]; n[i] = { ...n[i], [field]: val }; onChange(n) }
  const addNew = () => onChange([...data, { title: '', company: '', location: '', period: '', current: false, description: '', bullets: [], achievements: [], tags: [] }])
  return (
    <div className="space-y-4">
      {data.map((exp, i) => (
        <div key={i} className="glass rounded-xl p-4 space-y-3 border border-border/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Experience #{i + 1}</span>
            <button onClick={() => onChange(data.filter((_, j) => j !== i))} className="p-1.5 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-muted-foreground transition-colors"><FaTrash size={11} /></button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="admin-label">Job Title</label><input className="admin-input" value={exp.title} onChange={e => update(i, 'title', e.target.value)} /></div>
            <div><label className="admin-label">Company</label><input className="admin-input" value={exp.company} onChange={e => update(i, 'company', e.target.value)} /></div>
            <div><label className="admin-label">Location</label><input className="admin-input" value={exp.location} onChange={e => update(i, 'location', e.target.value)} /></div>
            <div><label className="admin-label">Period</label><input className="admin-input" value={exp.period} onChange={e => update(i, 'period', e.target.value)} /></div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id={`cur-${i}`} checked={exp.current} onChange={e => update(i, 'current', e.target.checked)} className="rounded" />
            <label htmlFor={`cur-${i}`} className="text-xs text-muted-foreground">Currently working here</label>
          </div>
          <div><label className="admin-label">Description</label><textarea className="admin-input resize-none" rows={3} value={exp.description} onChange={e => update(i, 'description', e.target.value)} /></div>
          <div><label className="admin-label">Responsibilities</label><BulletList bullets={exp.bullets || []} onChange={v => update(i, 'bullets', v)} /></div>
          <div><label className="admin-label">Key Achievements</label><BulletList bullets={exp.achievements || []} onChange={v => update(i, 'achievements', v)} /></div>
          <div><label className="admin-label">Tech Stack (Enter to add)</label><TagInput tags={exp.tags || []} onChange={v => update(i, 'tags', v)} /></div>
        </div>
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
        <div key={i} className="glass rounded-xl p-4 space-y-3 border border-border/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">Project #{i + 1}</span>
            <button onClick={() => onChange(data.filter((_, j) => j !== i))} className="p-1.5 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-muted-foreground transition-colors"><FaTrash size={11} /></button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="admin-label">Project Title</label><input className="admin-input" value={proj.title} onChange={e => update(i, 'title', e.target.value)} /></div>
            <div><label className="admin-label">Period / Year</label><input className="admin-input" value={proj.period} onChange={e => update(i, 'period', e.target.value)} /></div>
            <div>
              <label className="admin-label">Status</label>
              <select className="admin-input" value={proj.status} onChange={e => update(i, 'status', e.target.value)}>
                <option>Completed</option><option>In Progress</option><option>Archived</option>
              </select>
            </div>
            <div><label className="admin-label">Your Role</label><input className="admin-input" value={proj.role} onChange={e => update(i, 'role', e.target.value)} /></div>
          </div>
          <div><label className="admin-label">Description</label><textarea className="admin-input resize-none" rows={3} value={proj.description} onChange={e => update(i, 'description', e.target.value)} /></div>
          <div><label className="admin-label">Key Features</label><BulletList bullets={proj.bullets || []} onChange={v => update(i, 'bullets', v)} /></div>
          <div><label className="admin-label">Tech Stack (Enter to add)</label><TagInput tags={proj.tags || []} onChange={v => update(i, 'tags', v)} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className="admin-label">GitHub URL</label><input className="admin-input" value={proj.links?.code || ''} onChange={e => updateLink(i, 'code', e.target.value)} placeholder="https://github.com/..." /></div>
            <div><label className="admin-label">Live Demo URL</label><input className="admin-input" value={proj.links?.demo || ''} onChange={e => updateLink(i, 'demo', e.target.value)} placeholder="https://..." /></div>
          </div>
        </div>
      ))}
      <button onClick={addNew} className="w-full py-2.5 rounded-xl border-2 border-dashed border-accent/30 text-accent text-sm hover:border-accent/60 hover:bg-accent/5 transition-all flex items-center justify-center gap-2">
        <FaPlus size={12} /> Add Project
      </button>
    </div>
  )
}

export default function AdminPanel({ onDataChange }) {
  const [open, setOpen]     = useState(false)
  const [authed, setAuthed] = useState(false)
  const [pw, setPw]         = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab]       = useState('experience')
  const [saved, setSaved]   = useState(false)
  const [expData, setExpData]   = useState(null)
  const [projData, setProjData] = useState(null)

  useEffect(() => {
    if (open && authed) {
      const se = localStorage.getItem(KEYS.experience)
      const sp = localStorage.getItem(KEYS.projects)
      setExpData(se ? JSON.parse(se) : defaultExp)
      setProjData(sp ? JSON.parse(sp) : defaultProj)
    }
  }, [open, authed])

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else setPwError(true)
  }

  const handleSave = () => {
    saveSection(KEYS.experience, expData)
    saveSection(KEYS.projects, projData)
    onDataChange?.({ experience: expData, projects: projData })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    localStorage.removeItem(KEYS.experience)
    localStorage.removeItem(KEYS.projects)
    window.location.reload()
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow flex items-center justify-center text-primary-foreground"
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        title="Admin Panel"
      >
        <FaEdit size={14} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />

            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl glass border-l border-white/10 shadow-2xl flex flex-col"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <FaEdit size={12} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-foreground">Portfolio Admin</h2>
                    <p className="text-[10px] text-muted-foreground">Edit your content live</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-colors">
                  <FaTimes size={14} />
                </button>
              </div>

              {!authed ? (
                <div className="flex-1 flex items-center justify-center p-8">
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
                    <p className="text-[10px] text-muted-foreground">Default password: admin123</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-1 px-6 pt-4 shrink-0">
                    {[{ id: 'experience', label: 'Experience', icon: FaBriefcase }, { id: 'projects', label: 'Projects', icon: FaCode }].map(({ id, label, icon: Icon }) => (
                      <button key={id} onClick={() => setTab(id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tab === id ? 'bg-primary/15 text-primary border border-primary/25' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                        <Icon size={11} /> {label}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    {tab === 'experience' && expData && <ExperienceEditor data={expData} onChange={setExpData} />}
                    {tab === 'projects'   && projData && <ProjectEditor   data={projData} onChange={setProjData} />}
                  </div>

                  <div className="px-6 py-4 border-t border-border/40 flex items-center justify-between gap-3 shrink-0">
                    <button onClick={handleReset} className="text-xs text-muted-foreground hover:text-red-400 transition-colors">
                      Reset to defaults
                    </button>
                    <motion.button onClick={handleSave}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-glow"
                      whileTap={{ scale: 0.97 }}>
                      <FaSave size={12} />
                      {saved ? '✓ Saved!' : 'Save Changes'}
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
