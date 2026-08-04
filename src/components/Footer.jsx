import React from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { profile } from '../data/profile'
import { trackGithubClick, trackLinkedinClick } from '../lib/analytics'

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border bg-foreground/[0.02]">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Full Stack Developer with a passion for creating innovative, scalable, and high-performance solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {['about', 'experience', 'projects', 'skills'].map(id => (
                <li key={id}>
                  <a className="hover:text-primary transition-colors capitalize" href={`#${id}`}>{id}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Connect</h3>
            <ul className="mt-3 flex items-center gap-4">
              {profile.social.linkedin && (
                <li>
                  <a className="hover:text-primary transition-colors" href={profile.social.linkedin}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => trackLinkedinClick('Footer')} aria-label="LinkedIn">
                    <FaLinkedin size={20} />
                  </a>
                </li>
              )}
              {profile.social.github && (
                <li>
                  <a className="hover:text-primary transition-colors" href={profile.social.github}
                    target="_blank" rel="noopener noreferrer"
                    onClick={() => trackGithubClick('Footer')} aria-label="GitHub">
                    <FaGithub size={20} />
                  </a>
                </li>
              )}
              {profile.social.email && (
                <li>
                  <a className="hover:text-primary transition-colors" href={`mailto:${profile.social.email}`} aria-label="Email">
                    <FaEnvelope size={20} />
                  </a>
                </li>
              )}
              {profile.social.instagram && (
                <li>
                  <a className="hover:text-primary transition-colors" href={profile.social.instagram}
                    target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram size={20} />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
