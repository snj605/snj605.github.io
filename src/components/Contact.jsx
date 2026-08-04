import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { getPortfolioData } from '../data/portfolioData'

export default function Contact() {
  const { contact } = getPortfolioData()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const links = [
    { icon: <FaEnvelope />, label: contact.email, href: `mailto:${contact.email}` },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: contact.linkedin },
    { icon: <FaGithub />,   label: 'GitHub',   href: contact.github },
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Let's work together or just say hi.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
              I'm open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!
            </p>
            <div className="space-y-3">
              {links.filter(l => l.href).map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                  <span className="text-primary">{l.icon}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="space-y-4">
            {[
              { name: 'name',    type: 'text',  placeholder: 'Your Name' },
              { name: 'email',   type: 'email', placeholder: 'Your Email' },
            ].map(f => (
              <input key={f.name} type={f.type} placeholder={f.placeholder} required
                value={form[f.name]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-sm focus:outline-none focus:border-primary transition-colors" />
            ))}
            <textarea placeholder="Your Message" rows={5} required
              value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center">
              {status === 'sending' ? 'Sending…' : status === 'sent' ? '✅ Message Sent!' : 'Send Message'}
            </button>
            {status === 'error' && <p className="text-red-500 text-xs">Something went wrong. Please try again.</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
