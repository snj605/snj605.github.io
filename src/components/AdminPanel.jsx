import React, { useState } from 'react'
import { getPortfolioData, savePortfolioData, defaultData } from '../data/portfolioData'

const PASS = 'admin123'

const inp = {
  background: 'transparent', border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8, color: 'inherit', padding: '7px 12px', width: '100%',
  marginBottom: 8, fontSize: 13, outline: 'none',
}
const card = {
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 12, padding: 16, marginBottom: 14,
}
const btnPrimary = { background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 18px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }
const btnDanger  = { background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '4px 12px', cursor: 'pointer', fontSize: 12 }
const btnAdd     = { background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 8, padding: '5px 14px', cursor: 'pointer', fontSize: 12 }

const TABS = ['Hero', 'About', 'Experience', 'Skills', 'Projects', 'Certifications', 'Education', 'Contact', 'Footer']

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw]         = useState('')
  const [err, setErr]       = useState('')
  const [data, setData]     = useState(getPortfolioData())
  const [tab, setTab]       = useState('Hero')
  const [saved, setSaved]   = useState(false)

  const login = () => pw === PASS ? (setAuthed(true), setErr('')) : setErr('Wrong password.')
  const save  = () => { savePortfolioData(data); setSaved(true); setTimeout(() => setSaved(false), 2500) }
  const reset = () => { if (window.confirm('Reset all to defaults?')) { savePortfolioData(defaultData); setData({ ...defaultData }) } }

  const set = (path, val) => {
    const keys = path.split('.')
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      let o = next
      for (let i = 0; i < keys.length - 1; i++) o = o[keys[i]]
      o[keys[keys.length - 1]] = val
      return next
    })
  }

  const setArr = (path, idx, field, val) => {
    const keys = path.split('.')
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      let arr = next
      for (const k of keys) arr = arr[k]
      if (field !== null) arr[idx][field] = val; else arr[idx] = val
      return next
    })
  }

  const addItem = (path, tpl) => {
    const keys = path.split('.')
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      let arr = next
      for (const k of keys) arr = arr[k]
      arr.push({ ...tpl })
      return next
    })
  }

  const removeItem = (path, idx) => {
    const keys = path.split('.')
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      let arr = next
      for (const k of keys) arr = arr[k]
      arr.splice(idx, 1)
      return next
    })
  }

  const get = (path) => path.split('.').reduce((o, k) => o?.[k], data) ?? ''

  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: '#f1f5f9' }}>
      <div style={{ ...card, width: 320, textAlign: 'center', padding: 32 }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🔐</div>
        <h2 style={{ marginBottom: 20, color: '#3b82f6' }}>Admin Login</h2>
        <input type="password" placeholder="Password" value={pw}
          onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} style={inp} />
        {err && <p style={{ color: '#ef4444', fontSize: 12, marginBottom: 8 }}>{err}</p>}
        <button style={{ ...btnPrimary, width: '100%', padding: 11 }} onClick={login}>Login</button>
        <p style={{ marginTop: 12, fontSize: 11, opacity: 0.4 }}>Default: admin123</p>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', padding: '20px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h2 style={{ margin: 0, color: '#3b82f6' }}>⚙️ Portfolio Admin</h2>
            <p style={{ margin: 0, opacity: 0.4, fontSize: 12 }}>Edit your portfolio content</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button style={btnPrimary} onClick={save}>{saved ? '✅ Saved!' : '💾 Save'}</button>
            <button style={{ ...btnDanger, padding: '7px 16px' }} onClick={reset}>↺ Reset</button>
            <a href="/" style={{ ...btnAdd, padding: '7px 16px', textDecoration: 'none', display: 'inline-block' }}>← Portfolio</a>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '5px 14px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', fontSize: 12, fontWeight: tab === t ? 600 : 400,
              background: tab === t ? '#3b82f6' : 'transparent', color: tab === t ? '#fff' : '#94a3b8',
            }}>{t}</button>
          ))}
        </div>

        {/* ── HERO ── */}
        {tab === 'Hero' && <div style={card}>
          <h4 style={{ color: '#3b82f6', marginBottom: 16 }}>Hero Section</h4>
          {[['Greeting', 'hero.greeting'], ['Full Name', 'hero.name'], ['Bio', 'hero.bio'],
            ['GitHub URL', 'hero.social.github'], ['LinkedIn URL', 'hero.social.linkedin'],
            ['Email', 'hero.social.email'], ['Twitter URL', 'hero.social.twitter'],
            ['CV Path', 'hero.cvPath'], ['CV Filename', 'hero.cvFileName'], ['Profile Image URL', 'hero.profileImage'],
          ].map(([lbl, path]) => (
            <div key={path}><label style={{ fontSize: 11, opacity: 0.5 }}>{lbl}</label>
              {lbl === 'Bio'
                ? <textarea rows={3} style={inp} value={get(path)} onChange={e => set(path, e.target.value)} />
                : <input style={inp} value={get(path)} onChange={e => set(path, e.target.value)} />}
            </div>
          ))}
          <h5 style={{ color: '#60a5fa', marginTop: 16, marginBottom: 8 }}>Typing Titles</h5>
          {data.hero.titles.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <input style={{ ...inp, marginBottom: 0, flex: 1 }} value={t} onChange={e => setArr('hero.titles', i, null, e.target.value)} />
              <button style={btnDanger} onClick={() => removeItem('hero.titles', i)}>✕</button>
            </div>
          ))}
          <button style={btnAdd} onClick={() => addItem('hero.titles', 'New Title')}>+ Add Title</button>
        </div>}

        {/* ── ABOUT ── */}
        {tab === 'About' && <div style={card}>
          <h4 style={{ color: '#3b82f6', marginBottom: 16 }}>About Section</h4>
          <h5 style={{ color: '#60a5fa', marginBottom: 8 }}>Bio Paragraphs</h5>
          {data.about.bio.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <textarea rows={2} style={{ ...inp, marginBottom: 0, flex: 1 }} value={p} onChange={e => setArr('about.bio', i, null, e.target.value)} />
              <button style={btnDanger} onClick={() => removeItem('about.bio', i)}>✕</button>
            </div>
          ))}
          <button style={btnAdd} onClick={() => addItem('about.bio', 'New paragraph.')}>+ Add Paragraph</button>
          <h5 style={{ color: '#60a5fa', marginTop: 16, marginBottom: 8 }}>Highlights</h5>
          {data.about.highlights.map((h, i) => (
            <div key={i} style={{ ...card, padding: 12, marginBottom: 8 }}>
              {[['Icon (emoji)', 'icon'], ['Label', 'label'], ['Detail', 'detail']].map(([lbl, f]) => (
                <div key={f}><label style={{ fontSize: 11, opacity: 0.5 }}>{lbl}</label>
                  <input style={inp} value={h[f]} onChange={e => setArr('about.highlights', i, f, e.target.value)} /></div>
              ))}
              <button style={btnDanger} onClick={() => removeItem('about.highlights', i)}>Remove</button>
            </div>
          ))}
          <button style={btnAdd} onClick={() => addItem('about.highlights', { icon: '⚡', label: 'Skill', detail: 'Detail' })}>+ Add Highlight</button>
        </div>}

        {/* ── EXPERIENCE ── */}
        {tab === 'Experience' && <div style={card}>
          <h4 style={{ color: '#3b82f6', marginBottom: 16 }}>Work Experience</h4>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ ...card, padding: 14, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <strong style={{ color: '#60a5fa' }}>{exp.title || `Experience ${i + 1}`}</strong>
                <button style={btnDanger} onClick={() => removeItem('experience', i)}>Remove</button>
              </div>
              {[['Job Title', 'title'], ['Company', 'company'], ['Location', 'location'], ['Period', 'period']].map(([lbl, f]) => (
                <div key={f}><label style={{ fontSize: 11, opacity: 0.5 }}>{lbl}</label>
                  <input style={inp} value={exp[f] || ''} onChange={e => setArr('experience', i, f, e.target.value)} /></div>
              ))}
              <label style={{ fontSize: 11, opacity: 0.5 }}>Current Role?</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={exp.current ? 'yes' : 'no'} onChange={e => setArr('experience', i, 'current', e.target.value === 'yes')}>
                <option value="yes">Yes</option><option value="no">No</option>
              </select>
              <label style={{ fontSize: 11, opacity: 0.5 }}>Tags (comma separated)</label>
              <input style={inp} value={(exp.tags || []).join(', ')} onChange={e => setArr('experience', i, 'tags', e.target.value.split(',').map(t => t.trim()))} />
              <label style={{ fontSize: 11, opacity: 0.5 }}>Bullet Points (one per line)</label>
              <textarea rows={5} style={inp} value={(exp.bullets || []).join('\n')} onChange={e => setArr('experience', i, 'bullets', e.target.value.split('\n'))} />
            </div>
          ))}
          <button style={btnAdd} onClick={() => addItem('experience', { title: 'Developer', company: 'Company', location: '', period: '2024 – Present', current: false, bullets: ['Achievement 1'], tags: ['React'] })}>+ Add Experience</button>
        </div>}

        {/* ── SKILLS ── */}
        {tab === 'Skills' && <div style={card}>
          <h4 style={{ color: '#3b82f6', marginBottom: 16 }}>Skills</h4>
          {data.skills.map((cat, i) => (
            <div key={i} style={{ ...card, padding: 14, marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <input style={{ ...inp, marginBottom: 0, flex: 1 }} placeholder="Category Name" value={cat.category} onChange={e => setArr('skills', i, 'category', e.target.value)} />
                <button style={btnDanger} onClick={() => removeItem('skills', i)}>✕</button>
              </div>
              {cat.items.map((s, j) => (
                <div key={j} style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
                  <input style={{ ...inp, marginBottom: 0, flex: 1 }} placeholder="Name" value={s.name} onChange={e => { const next = JSON.parse(JSON.stringify(data)); next.skills[i].items[j].name = e.target.value; setData(next) }} />
                  <input style={{ ...inp, marginBottom: 0, flex: 3 }} placeholder="Icon URL" value={s.icon} onChange={e => { const next = JSON.parse(JSON.stringify(data)); next.skills[i].items[j].icon = e.target.value; setData(next) }} />
                  {s.icon && <img src={s.icon} alt={s.name} style={{ width: 28, height: 28, objectFit: 'contain', borderRadius: 4 }} />}
                  <button style={btnDanger} onClick={() => { const next = JSON.parse(JSON.stringify(data)); next.skills[i].items.splice(j, 1); setData(next) }}>✕</button>
                </div>
              ))}
              <button style={btnAdd} onClick={() => { const next = JSON.parse(JSON.stringify(data)); next.skills[i].items.push({ name: 'New', icon: '' }); setData(next) }}>+ Add Skill</button>
            </div>
          ))}
          <button style={btnAdd} onClick={() => addItem('skills', { category: 'New Category', items: [] })}>+ Add Category</button>
        </div>}

        {/* ── PROJECTS ── */}
        {tab === 'Projects' && <div style={card}>
          <h4 style={{ color: '#3b82f6', marginBottom: 16 }}>Projects</h4>
          {data.projects.map((p, i) => (
            <div key={i} style={{ ...card, padding: 14, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <strong style={{ color: '#60a5fa' }}>{p.title || `Project ${i + 1}`}</strong>
                <button style={btnDanger} onClick={() => removeItem('projects', i)}>Remove</button>
              </div>
              {[['Title', 'title'], ['Period', 'period'], ['Description', 'desc'], ['GitHub Link', 'links.code'], ['Demo Link', 'links.demo']].map(([lbl, f]) => (
                <div key={f}><label style={{ fontSize: 11, opacity: 0.5 }}>{lbl}</label>
                  {lbl === 'Description'
                    ? <textarea rows={2} style={inp} value={p[f] || ''} onChange={e => setArr('projects', i, f, e.target.value)} />
                    : <input style={inp} value={f.includes('.') ? (p.links?.[f.split('.')[1]] || '') : (p[f] || '')}
                        onChange={e => { const next = JSON.parse(JSON.stringify(data)); if (f.includes('.')) { const [a, b] = f.split('.'); next.projects[i][a][b] = e.target.value } else next.projects[i][f] = e.target.value; setData(next) }} />}
                </div>
              ))}
              <label style={{ fontSize: 11, opacity: 0.5 }}>Featured?</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={p.featured ? 'yes' : 'no'} onChange={e => setArr('projects', i, 'featured', e.target.value === 'yes')}>
                <option value="yes">Yes</option><option value="no">No</option>
              </select>
              <label style={{ fontSize: 11, opacity: 0.5 }}>Tags (comma separated)</label>
              <input style={inp} value={(p.tags || []).join(', ')} onChange={e => setArr('projects', i, 'tags', e.target.value.split(',').map(t => t.trim()))} />
              <label style={{ fontSize: 11, opacity: 0.5 }}>Bullet Points (one per line)</label>
              <textarea rows={4} style={inp} value={(p.bullets || []).join('\n')} onChange={e => setArr('projects', i, 'bullets', e.target.value.split('\n'))} />
            </div>
          ))}
          <button style={btnAdd} onClick={() => addItem('projects', { title: 'New Project', period: '2024', desc: 'Description.', bullets: ['Feature 1'], tags: ['React'], links: { code: '', demo: null }, featured: false })}>+ Add Project</button>
        </div>}

        {/* ── CERTIFICATIONS ── */}
        {tab === 'Certifications' && <div style={card}>
          <h4 style={{ color: '#3b82f6', marginBottom: 16 }}>Certifications</h4>
          {data.certifications.map((c, i) => (
            <div key={i} style={{ ...card, padding: 14, marginBottom: 12 }}>
              {[['Name', 'name'], ['Issuer', 'issuer'], ['Period', 'period'], ['Link', 'link'], ['Image URL', 'image']].map(([lbl, f]) => (
                <div key={f}><label style={{ fontSize: 11, opacity: 0.5 }}>{lbl}</label>
                  <input style={inp} value={c[f] || ''} onChange={e => setArr('certifications', i, f, e.target.value)} /></div>
              ))}
              <button style={btnDanger} onClick={() => removeItem('certifications', i)}>Remove</button>
            </div>
          ))}
          <button style={btnAdd} onClick={() => addItem('certifications', { id: Date.now(), name: 'New Cert', issuer: 'Issuer', period: '2024', link: '', image: '' })}>+ Add Certification</button>
        </div>}

        {/* ── EDUCATION ── */}
        {tab === 'Education' && <div style={card}>
          <h4 style={{ color: '#3b82f6', marginBottom: 16 }}>Education</h4>
          {data.education.map((e, i) => (
            <div key={i} style={{ ...card, padding: 14, marginBottom: 12 }}>
              {[['Degree', 'degree'], ['Institution', 'institution'], ['Location', 'location'], ['Period', 'period'], ['Grade', 'grade'], ['Icon (emoji)', 'icon']].map(([lbl, f]) => (
                <div key={f}><label style={{ fontSize: 11, opacity: 0.5 }}>{lbl}</label>
                  <input style={inp} value={e[f] || ''} onChange={ev => setArr('education', i, f, ev.target.value)} /></div>
              ))}
              <button style={btnDanger} onClick={() => removeItem('education', i)}>Remove</button>
            </div>
          ))}
          <button style={btnAdd} onClick={() => addItem('education', { degree: 'Degree', institution: 'University', location: '', period: '2019-2023', grade: '', icon: '🎓' })}>+ Add Education</button>
        </div>}

        {/* ── CONTACT ── */}
        {tab === 'Contact' && <div style={card}>
          <h4 style={{ color: '#3b82f6', marginBottom: 16 }}>Contact Info</h4>
          {[['Email', 'contact.email'], ['Phone', 'contact.phone'], ['WhatsApp (digits only)', 'contact.whatsapp'],
            ['LinkedIn URL', 'contact.linkedin'], ['GitHub URL', 'contact.github'],
            ['Formspree ID', 'contact.formspreeId']].map(([lbl, path]) => (
            <div key={path}><label style={{ fontSize: 11, opacity: 0.5 }}>{lbl}</label>
              <input style={inp} value={get(path)} onChange={e => set(path, e.target.value)} /></div>
          ))}
          <p style={{ fontSize: 11, opacity: 0.4, marginTop: 8 }}>Get a free Formspree ID at <a href="https://formspree.io" target="_blank" rel="noreferrer" style={{ color: '#60a5fa' }}>formspree.io</a></p>
        </div>}

        {/* ── FOOTER ── */}
        {tab === 'Footer' && <div style={card}>
          <h4 style={{ color: '#3b82f6', marginBottom: 16 }}>Footer</h4>
          {[['Your Name', 'footer.name'], ['Year', 'footer.year']].map(([lbl, path]) => (
            <div key={path}><label style={{ fontSize: 11, opacity: 0.5 }}>{lbl}</label>
              <input style={inp} value={get(path)} onChange={e => set(path, e.target.value)} /></div>
          ))}
        </div>}

        <div style={{ textAlign: 'center', marginTop: 32, paddingBottom: 40 }}>
          <button style={{ ...btnPrimary, padding: '11px 40px', fontSize: 15 }} onClick={save}>
            {saved ? '✅ All Changes Saved!' : '💾 Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
