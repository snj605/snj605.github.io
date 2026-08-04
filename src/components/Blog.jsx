import React from 'react'
import { profile } from '../data/profile'

const Blog = () => {
  return (
    <section id="blog" className="sr-only" aria-hidden="false">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Biography & Insights</h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            An in-depth look at {profile.name}'s career, technical expertise, and software engineering philosophy.
          </p>
        </div>

        <article className="prose prose-invert max-w-none rounded-2xl border border-border bg-card p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <header className="mb-8 pb-6 border-b border-border/50">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
              Who is {profile.name}? The Journey of a Full Stack Developer
            </h1>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span><strong>Author:</strong> {profile.name}</span>
              <span>•</span>
              <span><strong>Role:</strong> Full Stack Developer</span>
            </div>
          </header>

          <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Who is {profile.name}?</h2>
              <p>
                <strong>{profile.name}</strong> is a professional <strong>Full Stack Developer</strong> specializing in
                React, Node.js, and modern web technologies. With hands-on experience building production-grade applications,
                he delivers clean, maintainable code and responsive user interfaces backed by scalable APIs.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Technical Stack</h2>
              <ul className="list-disc list-inside space-y-1 pl-2 text-sm sm:text-base">
                <li><strong>Frontend:</strong> React.js, TypeScript, Tailwind CSS, HTML5, CSS3.</li>
                <li><strong>Backend:</strong> Node.js, Express.js, RESTful APIs.</li>
                <li><strong>Databases:</strong> MongoDB, PostgreSQL, MySQL.</li>
                <li><strong>Tools:</strong> Git, Docker, VS Code, Postman.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">How to Connect</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mt-2">
                <div className="p-3 rounded-lg border border-border bg-card/50">
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${profile.social.email}`} className="text-primary hover:underline">
                    {profile.social.email}
                  </a>
                </div>
                <div className="p-3 rounded-lg border border-border bg-card/50">
                  <strong>LinkedIn:</strong>{' '}
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {profile.social.linkedin.replace('https://', '')}
                  </a>
                </div>
                <div className="p-3 rounded-lg border border-border bg-card/50">
                  <strong>GitHub:</strong>{' '}
                  <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {profile.social.github.replace('https://', '')}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Blog
