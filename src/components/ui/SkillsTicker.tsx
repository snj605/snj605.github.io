'use client'

const skills = [
  'Java 17/21', 'Spring Boot 3', 'Apache Kafka', 'Microservices', 'PostgreSQL',
  'MySQL', 'Spring Security', 'JWT + RBAC', 'Docker', 'Azure', 'Redis',
  'WebSockets', 'REST APIs', 'Hibernate', 'Event-Driven Arch', 'Cloud Optimization',
  'Distributed Systems', 'DLQ Patterns', 'Git & CI/CD', 'Linux', 'Flutter',
]

export function SkillsTicker() {
  // Duplicate so the animation loops seamlessly
  const items = [...skills, ...skills]

  return (
    <div className="relative py-6 overflow-hidden">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
      />

      <div className="ticker-track">
        {items.map((skill, i) => (
          <span
            key={i}
            className="mx-4 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap bg-card border border-border"
            style={{
              color: i % 4 === 0 ? 'hsl(var(--primary))' : i % 4 === 1 ? 'hsl(var(--secondary))' : i % 4 === 2 ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
