import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaTimes, FaPlus, FaTrash, FaSave, FaLock, FaEdit,
  FaBriefcase, FaCode, FaUser, FaChartBar,
} from 'react-icons/fa'
import { profile as defaultProfile }   from '../../data/profile'
import { experience as defaultExp }     from '../../data/experience'
import { projects as defaultProj }      from '../../data/projects'
import { KEYS, saveSection }            from '../../lib/store'

const ADMIN_PASSWORD = 'admin123'

const MONTHS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec',
]

// ── Shared input styles ──────────────────────────────────────
const inp = 'w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/15 transition-all placeholder:text-muted-foreground/50'
const lbl = 'block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1'

// ── Period Picker ────────────────────────────────────────────
// value: { month: 'Jan', year: '2023' } | null (= Present)
function MonthYearPicker({ value, onChange, allowPresent = false, isPresent = false, onPresentChange }) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 15 }, (_, i) => String(currentYear - i))

  return (
    <div className="flex items-center gap-1.5">
      {isPresent ? (
        <span className="flex-1 text-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg py-2 px-3">
          Present
        </span>
      ) : (
        <>
          <select
            value={value?.month || MONTHS[0]}
            onChange={e => onChange({ ...value, month: e.target.value })}
            className={`${inp} flex-1`}
          >
            {MONTHS.map(m => <option key={m}>{m}</option>)}
          </select>
          <select
            value={value?.year || String(currentYear)}
            onChange={e => onChange({ ...value, year: e.target.value })}
            className={`${inp} flex-1`}
          >
            {years.map(y => <option key={y}>{y}</option>)}
          </select>
        </>
      )}
      {allowPresent && (
        <label className="flex items-center gap-1 text-[11px] text-muted-foreground cursor-pointer shrink-0 ml-1">
          <input
            type="checkbox"
            checked={isPresent}
            onChange={e => onPresentChange(e.target.checked)}
            className="rounded accent-primary"
          />
          Now
        </label>
      )}
    </div>
  )
}

// Parse "Jan 2023" → { month: 'Jan', year: '2023' }
function parsePeriodPart(str) {
  if (!str || str.trim().toLowerCase() === 'present') return null
  const parts = str.trim().split(' ')
  if (parts.length === 2) return { month: parts[0], year: parts[1] }
  // fallback: year only
  return { month: 'Jan', year: parts[0] || String(new Date().getFullYear()) }
}

// "Jan 2023 – Present" → { from: {month,year}, toPresent: true, to: null }
function parsePeriod(period) {
  const sep = period.includes('–') ? '–' : '-'
  const [fromStr, toStr] = period.split(sep).map(s => s.trim())
  const toPresent = !toStr || toStr.toLowerCase() === 'present'
  return {
    from: parsePeriodPart(fromStr),
    to: toPresent ? null : parsePeriodPart(toStr),
    toPresent,
  }
}

function formatPeriod(from, to, toPresent) {
  const fromStr = from ? `${from.month} ${from.year}` : ''
  const toStr   = toPresent ? 'Present' : (to ? `${to.month} ${to.year}` : '')
  return `${fromStr} – ${toStr}`
}

// ── Tag Input ────────────────────────────────────────────────
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

// ── Bullet List ──────────────────────────────────────────────
function BulletList({ bullets, onChange }) {
  return (
    <div className="space-y-2">
      {bullets.map((b, i) => (
        <div key={i} className="flex gap-2">
          <input value={b} onChange={e => { const n = [...bullets]; n[i] = e.target.value; onChange(n) }}
            className={`${inp} flex-1 text-xs`} placeholder={`Point ${i + 1}`} />
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

// ── Experience Editor ────────────────────────────────────────
function ExperienceEditor({ data, onChange }) {
  const update = (i, field, val) => {
    const n = [...data]; n[i] = { ...n[i], [field]: val }; onChange(n)
  }

  const updatePeriod = (i, from, to, toPresent) => {
    update(i, 'period', formatPeriod(from, to, toPresent))
    update(i, 'current', toPresent)
  }

  const addNew = () => onChange([...data, {
    title: '', company: '', location: '', period: 'Jan 2024 – Present',
    current: true, description: '', bullets: [], achievements: [], tags: [],
  }])

  return (
    <div className="space-y-4">
      {data.map((exp, i) => {
        const { from, to, toPresent } = parsePeriod(exp.period || '')
        return (
          <div key={i} className="glass rounded-xl p-4 space-y-3 border border-border/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Experience #{i + 1}</span>
              <button onClick={() => onChange(data.filter((_, j) => j !== i))}
                className="p-1.5 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-muted-foreground transition-colors">
                <FaTrash size={11} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div><label className={lbl}>Job Title</label><input className={inp} value={exp.title} onChange={e => update(i, 'title', e.target.value)} /></div>
              <div><label className={lbl}>Company</label><input className={inp} value={exp.company} onChange={e => update(i, 'company', e.target.value)} /></div>
              <div className="col-span-2"><label className={lbl}>Location</label><input className={inp} value={exp.location} onChange={e => update(i, 'location', e.target.value)} /></div>
            </div>

            {/* Period pickers */}
            <div className="space-y-2">
              <label className={lbl}>Period</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">From</p>
                  <MonthYearPicker
                    value={from}
                    onChange={val => updatePeriod(i, val, to, toPresent)}
                  />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground mb-1">To</p>
                  <MonthYearPicker
                    value={to}
                    onChange={val => updatePeriod(i, from, val, false)}
                    allowPresent
                    isPresent={toPresent}
                    onPresentChange={checked => updatePeriod(i, from, to, checked)}
                  />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Preview: <span className="text-foreground font-medium">{exp.period}</span>
              </p>
            </div>

            <div><label className={lbl}>Description</label><textarea className={`${inp} resize-none`} rows={3} value={exp.description} onChange={e => update(i, 'description', e.target.value)} /></div>
            <div><label className={lbl}>Responsibilities</label><BulletList bullets={exp.bullets || []} onChange={v => update(i, 'bullets', v)} /></div>
            <div><label className={lbl}>Key Achievements</label><BulletList bullets={exp.achievements || []} onChange={v => update(i, 'achievements', v)} /></div>
            <div><label className={lbl}>Tech Stack</label><TagInput tags={exp.tags || []} onChange={v => update(i, 'tags', v)} /></div>
          </div>
        )
      })}
      <button onClick={addNew} className="w-full py-2.5 rounded-xl border-2 border-dashed border-primary/30 text-primary text-sm hover:border-primary/60 hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
        <FaPlus size={12} /> Add Experience
      </button>
    </div>
  )
}

// ── Project Editor ───────────────────────────────────────────
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
            <div><label className={lbl}>Project Title</label><input className={inp} value={proj.title} onChange={e => update(i, 'title', e.target.value)} /></div>
            <div><label className={lbl}>Period / Year</label><input className={inp} value={proj.period} onChange={e => update(i, 'period', e.target.value)} placeholder="e.g. 2024 or Jan–Jun 2024" /></div>
            <div>
              <label className={lbl}>Status</label>
              <select className={inp} value={proj.status} onChange={e => update(i, 'status', e.target.value)}>
                <option>Completed</option><option>In Progress</option><option>Archived</option>
              </select>
            </div>
            <div><label className={lbl}>Your Role</label><input className={inp} value={proj.role} onChange={e => update(i, 'role', e.target.value)} /></div>
          </div>
          <div><label className={lbl}>Description</label><textarea className={`${inp} resize-none`} rows={3} value={proj.description} onChange={e => update(i, 'description', e.target.value)} /></div>
          <div><label className={lbl}>Key Features</label><BulletList bullets={proj.bullets || []} onChange={v => update(i, 'bullets', v)} /></div>
          <div><label className={lbl}>Tech Stack</label><TagInput tags={proj.tags || []} onChange={v => update(i, 'tags', v)} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className={lbl}>GitHub URL</label><input className={inp} value={proj.links?.code || ''} onChange={e => updateLink(i, 'code', e.target.value)} placeholder="https://github.com/..." /></div>
            <div><label className={lbl}>Live Demo URL</label><input className={inp} value={proj.links?.demo || ''} onChange={e => updateLink(i, 'demo', e.target.value)} placeholder="https://..." /></div>
          </div>
        </div>
      ))}
      <button onClick={addNew} className="w-full py-2.5 rounded-xl border-2 border-dashed border-accent/30 text-accent text-sm hover:border-accent/60 hover:bg-accent/5 transition-all flex items-center justify-center gap-2">
        <FaPlus size={12} /> Add Project
      </button>
    </div>
  )
}

// ── Stats Editor ─────────────────────────────────────────────
function StatsEditor({ data, onChange }) {
  const update = (i, field, val) => {
    const n = [...data]; n[i] = { ...n[i], [field]: val }; onChange(n)
  }
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground">
        These stats appear below your profile photo on the About section.
      </p>
      {data.map((stat, i) => (
        <div key={i} className="glass rounded-xl p-4 border border-border/40 flex items-center gap-3">
          <div className="flex-1">
            <label className={lbl}>Value</label>
            <input className={inp} value={stat.value} onChange={e => update(i, 'value', e.target.value)} placeholder="e.g. 2+" />
          </div>
          <div className="flex-1">
            <label className={lbl}>Label</label>
            <input className={inp} value={stat.label} onChange={e => update(i, 'label', e.target.value)} placeholder="e.g. Years Exp." />
          </div>
          <button onClick={() => onChange(data.filter((_, j) => j !== i))}
            className="mt-4 p-1.5 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-muted-foreground transition-colors shrink-0">
            <FaTrash size={11} />
          </button>
        </div>
      ))}

      {/* Live preview */}
      <div className="flex gap-2 pt-1">
        {data.map((stat, i) => (
          <div key={i} className="glass border border-border/50 rounded-xl px-4 py-2.5 text-center min-w-[72px]">
            <div className="text-base font-black gradient-text">{stat.value || '—'}</div>
            <div className="text-[10px] text-muted-foreground leading-tight">{stat.label || '—'}</div>
          </div>
        ))}
      </div>

      <button onClick={() => onChange([...data, { value: '', label: '' }])}
        className="w-full py-2.5 rounded-xl border-2 border-dashed border-border/40 text-muted-foreground text-sm hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-2">
        <FaPlus size={12} /> Add Stat
      </button>
    </div>
  )
}

// ── Main AdminPanel ──────────────────────────────────────────
const TABS = [
  { id: 'experience', label: 'Experience', icon: FaBriefcase },
  { id: 'projects',   label: 'Projects',   icon: FaCode },
  { id: 'stats',      label: 'Stats',      icon: FaChartBar },
]

export default function AdminPanel({ onDataChange }) {
  const [open, setOpen]       = useState(false)
  const [authed, setAuthed]   = useState(false)
  const [pw, setPw]           = useState('')
  const [pwError, setPwError] = useState(false)
  const [tab, setTab]         = useState('experience')
  const [saved, setSaved]     = useState(false)

  const [expData,   setExpData]   = useState(null)
  const [projData,  setProjData]  = useState(null)
  const [statsData, setStatsData] = useState(null)

  useEffect(() => {
    if (!open || !authed) return
    const se = localStorage.getItem(KEYS.experience)
    const sp = localStorage.getItem(KEYS.projects)
    const sv = localStorage.getItem(KEYS.profile)
    setExpData(se ? JSON.parse(se) : defaultExp)
    setProjData(sp ? JSON.parse(sp) : defaultProj)
    const prof = sv ? JSON.parse(sv) : defaultProfile
    setStatsData(prof.stats || defaultProfile.stats || [])
  }, [open, authed])

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(false) }
    else setPwError(true)
  }

  const handleSave = () => {
    saveSection(KEYS.experience, expData)
    saveSection(KEYS.projects, projData)

    // Merge stats into profile
    const existing = localStorage.getItem(KEYS.profile)
    const prof = existing ? JSON.parse(existing) : { ...defaultProfile }
    prof.stats = statsData
    saveSection(KEYS.profile, prof)

    onDataChange?.({ experience: expData, projects: projData })
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (!window.confirm('Reset all changes to defaults?')) return
    localStorage.removeItem(KEYS.experience)
    localStorage.removeItem(KEYS.projects)
    const existing = localStorage.getItem(KEYS.profile)
    if (existing) {
      const prof = JSON.parse(existing)
      delete prof.stats
      localStorage.setItem(KEYS.profile, JSON.stringify(prof))
    }
    window.dispatchEvent(new CustomEvent('pf-updated', { detail: { key: 'all' } }))
    setExpData([...defaultExp])
    setProjData([...defaultProj])
    setStatsData(defaultProfile.stats || [])
  }

  return (
    <>
      {/* FAB */}
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
            {/* Backdrop */}
            <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />

            {/* Drawer */}
            <motion.div
              className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl glass border-l border-white/10 shadow-2xl flex flex-col"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              {/* Header */}
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

              {/* Login */}
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
                      className={`${inp} text-center ${pwError ? 'border-red-500/60' : ''}`} />
                    {pwError && <p className="text-xs text-red-400">Incorrect password</p>}
                    <button onClick={handleLogin} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                      Unlock
                    </button>
                    <p className="text-[10px] text-muted-foreground">Default: admin123</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex gap-1 px-6 pt-4 shrink-0">
                    {TABS.map(({ id, label, icon: Icon }) => (
                      <button key={id} onClick={() => setTab(id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${tab === id ? 'bg-primary/15 text-primary border border-primary/25' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                        <Icon size={11} /> {label}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    {tab === 'experience' && expData   && <ExperienceEditor data={expData}   onChange={setExpData} />}
                    {tab === 'projects'   && projData  && <ProjectEditor    data={projData}  onChange={setProjData} />}
                    {tab === 'stats'      && statsData && <StatsEditor      data={statsData} onChange={setStatsData} />}
                  </div>

                  {/* Footer */}
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
