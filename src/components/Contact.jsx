import React, { useState } from 'react'
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { profile } from '../data/profile'
import { trackContactSubmit, trackGithubClick, trackLinkedinClick } from '../lib/analytics'

const contactLinks = (p) => [
  { icon: <FaEnvelope className="text-primary" />, label: p.social.email, href: `mailto:${p.social.email}`, onClick: null },
  { icon: <FaLinkedin className="text-primary" />, label: p.social.linkedin?.replace('https://', ''), href: p.social.linkedin, onClick: () => trackLinkedinClick('Contact') },
  { icon: <FaGithub className="text-primary" />,   label: p.social.github?.replace('https://', ''),   href: p.social.github,   onClick: () => trackGithubClick('Contact') },
].filter(l => l.href)

const inputCls = 'w-full rounded-xl border border-border/60 bg-background/60 px-4 py-2.5 text-sm outline-none transition-all duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch(`https://formsubmit.co/${profile.social.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        trackContactSubmit(form.email)
        toast.success('Message sent! I\'ll get back to you soon. 🎉', { position: 'top-right', autoClose: 5000 })
        setForm({ name: '', email: '', message: '' })
      } else throw new Error()
    } catch {
      toast.error('Something went wrong. Please try again.', { position: 'top-right', autoClose: 5000 })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-primary/8 blur-3xl"
          animate={{ x: [0,20,0], y: [0,-20,0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-accent/6 blur-2xl"
          animate={{ x: [0,-15,0], y: [0,15,0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
      </div>

      <div className="container">
        <motion.div className="mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="section-heading">Contact Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h3 className="text-xl font-bold mb-2">Get In Touch</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat. I'm always open to new ideas!
            </p>
            <div className="space-y-3">
              {contactLinks(profile).map(l => (
                <motion.a key={l.label} href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer" onClick={l.onClick}
                  className="flex items-center gap-3 p-3 rounded-xl glass border border-border/50 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200 text-sm group"
                  whileHover={{ x: 4 }}>
                  <span className="text-base">{l.icon}</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors truncate">{l.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <ToastContainer theme="dark" />
            <form onSubmit={handleSubmit} className="glass rounded-2xl border border-border/50 p-6 space-y-4">
              {[
                { id: 'name',  label: 'Name',  type: 'text',  placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map(f => (
                <div key={f.id}>
                  <label htmlFor={f.id} className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                    {f.label}
                  </label>
                  <input type={f.type} id={f.id} name={f.id}
                    className={inputCls} value={form[f.id]}
                    onChange={handleChange} required placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
                  Message
                </label>
                <textarea id="message" name="message" rows={5}
                  className={`${inputCls} resize-none`}
                  value={form.message} onChange={handleChange}
                  required placeholder="Tell me about your project or idea..." />
              </div>
              <motion.button type="submit" disabled={sending}
                className="btn-glow w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: sending ? 1 : 1.01 }} whileTap={{ scale: 0.98 }}>
                {sending ? (
                  <><span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> Sending…</>
                ) : 'Send Message →'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
