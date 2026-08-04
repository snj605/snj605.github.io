import React, { useState } from 'react'
import ReactCardFlip from 'react-card-flip'
import { FaGithub } from 'react-icons/fa'
import { FaAws } from 'react-icons/fa'
import { certifications } from '../data/certifications'

const Certifications = () => {
  const [flipped, setFlipped] = useState({})
  const toggle = (i) => setFlipped(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-24 bg-foreground/[0.02]">
      <div className="container text-center">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Certifications</h2>
          <p className="mt-2 text-muted-foreground">Recognized achievements in the field of technology.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((cert, i) => (
            <ReactCardFlip key={i} isFlipped={!!flipped[i]} flipDirection="horizontal">
              {/* Front */}
              <div className="rounded-md border border-border bg-card p-6 shadow-sm cursor-pointer" onClick={() => toggle(i)}>
                {cert.icon === 'aws'
                  ? <FaAws size={40} className="mx-auto mb-3 text-[#FF9900]" />
                  : <FaGithub size={40} className="mx-auto mb-3 text-foreground" />
                }
                <h3 className="text-lg font-semibold">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">Issued By: {cert.issuer}</p>
                <p className="text-sm text-muted-foreground">{cert.period}</p>
                {cert.link && cert.link !== '#' && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-3 text-primary font-medium"
                    onClick={e => e.stopPropagation()}>
                    View Certificate
                  </a>
                )}
              </div>

              {/* Back */}
              <div
                className={`rounded-md border border-border p-4 text-white cursor-pointer ${cert.icon === 'aws' ? 'bg-[#FF9900]' : 'bg-foreground'}`}
                onClick={() => toggle(i)}>
                {cert.image
                  ? <img src={cert.image} alt={cert.name} className="w-full h-auto rounded-md" loading="lazy" />
                  : <div className="h-40 flex items-center justify-center text-4xl">🏅</div>
                }
              </div>
            </ReactCardFlip>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
