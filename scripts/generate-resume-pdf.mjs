import { jsPDF } from 'jspdf'
import fs from 'fs'
import path from 'path'

const doc = new jsPDF({
  unit: 'pt',
  format: 'a4',
})

const pageWidth = doc.internal.pageSize.getWidth()
const pageHeight = doc.internal.pageSize.getHeight()
const margin = 40
const contentWidth = pageWidth - margin * 2

// Color palette
const primary = [14, 116, 144]   // cyan/teal
const dark = [15, 23, 42]        // slate-900
const muted = [100, 116, 139]    // slate-500
const body = [51, 65, 85]        // slate-700
const line = [226, 232, 240]     // slate-200

let y = margin

// Header
doc.setFont('helvetica', 'bold')
doc.setFontSize(22)
doc.setTextColor(...dark)
doc.text('SAMIR JOSHI', margin, y)

y += 18
doc.setFontSize(11)
doc.setFont('helvetica', 'bold')
doc.setTextColor(...primary)
doc.text('JAVA BACKEND SOFTWARE ENGINEER · SPRING BOOT & KAFKA SPECIALIST', margin, y)

y += 15
doc.setFont('helvetica', 'normal')
doc.setFontSize(9)
doc.setTextColor(...muted)
const contactLine = 'Rajkot, Gujarat, India  |  +91 7069380063  |  samirjoshi605@gmail.com  |  linkedin.com/in/samir-joshi-a6965b1a5  |  github.com/snj605'
doc.text(contactLine, margin, y)

y += 10
doc.setDrawColor(...line)
doc.setLineWidth(1)
doc.line(margin, y, pageWidth - margin, y)

// Section helper
function drawSectionHeading(title) {
  y += 18
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...primary)
  doc.text(title.toUpperCase(), margin, y)
  y += 4
  doc.setDrawColor(...primary)
  doc.setLineWidth(1)
  doc.line(margin, y, margin + 80, y)
  y += 10
}

// Professional Summary
drawSectionHeading('Professional Summary')
doc.setFont('helvetica', 'normal')
doc.setFontSize(9)
doc.setTextColor(...body)
const summaryText = 'Results-driven Java Backend Software Engineer with enterprise experience architecting decoupled Spring Boot 3 microservices, high-throughput IoT telemetry streaming pipelines with Apache Kafka, and cloud-native distributed systems. Ex-Assistant Professor at Atmiya University with a Master of Technology (M.Tech) in Computer Engineering. Published researcher in metaheuristic cloud scheduling (PSO-WOA) with proven expertise in low-latency REST APIs, multi-database tuning (MySQL, PostgreSQL, Redis), and Spring Security (JWT/RBAC).'
const splitSummary = doc.splitTextToSize(summaryText, contentWidth)
doc.text(splitSummary, margin, y)
y += splitSummary.length * 12

// Technical Skills
drawSectionHeading('Technical Skills')
const skills = [
  ['Languages:', 'Java (17/21), Kotlin, SQL, Python, Dart, TypeScript, C/C++'],
  ['Backend & Frameworks:', 'Spring Boot 3, Spring Data JPA, Spring Security (JWT/RBAC), Spring Cloud, Hibernate ORM, RESTful APIs'],
  ['Messaging & Streaming:', 'Apache Kafka, Event-Driven Architecture, Dead-Letter Queues (DLQ), WebSockets, Redis Pub/Sub'],
  ['Databases & Caching:', 'PostgreSQL, MySQL, Redis, MongoDB, Connection Pool Optimization (HikariCP)'],
  ['Cloud & DevOps:', 'Docker, Docker Compose, Microsoft Azure, Git, GitHub Actions, CI/CD, Linux, Maven, Gradle'],
  ['Testing & Observability:', 'JUnit 5, Mockito, Postman, OpenTelemetry, Zipkin, Resilience4j, Circuit Breaking'],
]

skills.forEach(([cat, list]) => {
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8.5)
  doc.setTextColor(...dark)
  doc.text(cat, margin, y)
  
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(...body)
  const offset = 140
  const split = doc.splitTextToSize(list, contentWidth - offset)
  doc.text(split, margin + offset, y)
  y += split.length * 11 + 2
})

// Experience
drawSectionHeading('Work Experience')

// Job 1
doc.setFont('helvetica', 'bold')
doc.setFontSize(10)
doc.setTextColor(...dark)
doc.text('Java Backend Developer (Contract Engagement)', margin, y)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...muted)
doc.text('05/2025 – Present | Rajkot, India', pageWidth - margin, y, { align: 'right' })

y += 12
doc.setFont('helvetica', 'italic')
doc.setFontSize(9)
doc.setTextColor(...primary)
doc.text('Bhakti Enterprise — Industrial IoT & ERP Cloud Platform', margin, y)

y += 12
doc.setFont('helvetica', 'normal')
doc.setFontSize(8.5)
doc.setTextColor(...body)
const bhaktiBullets = [
  'Architected enterprise SaaS across 4-6 decoupled Spring Boot microservices for inventory, manufacturing, and IoT smart vending machines.',
  'Engineered real-time telemetry streaming pipeline with Apache Kafka ingesting machinery heartbeat metrics for automated field diagnostics.',
  'Developed and secured 50+ RESTful endpoints using Spring Security, stateless JWT authentication, and role-based access control (RBAC).',
  'Designed normalized schemas and composite indexes across MySQL and PostgreSQL, achieving sub-millisecond query execution under load.',
  'Containerized services using Docker and orchestrated development environments with Docker Compose.',
]
bhaktiBullets.forEach((bullet) => {
  doc.text('•', margin + 4, y)
  const bSplit = doc.splitTextToSize(bullet, contentWidth - 18)
  doc.text(bSplit, margin + 14, y)
  y += bSplit.length * 10.5 + 2
})

y += 4
// Job 2
doc.setFont('helvetica', 'bold')
doc.setFontSize(10)
doc.setTextColor(...dark)
doc.text('Assistant Professor', margin, y)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...muted)
doc.text('06/2024 – 04/2025 | Rajkot, India', pageWidth - margin, y, { align: 'right' })

y += 12
doc.setFont('helvetica', 'italic')
doc.setFontSize(9)
doc.setTextColor(...primary)
doc.text('Atmiya University — Faculty of Engineering & Technology', margin, y)

y += 12
doc.setFont('helvetica', 'normal')
doc.setFontSize(8.5)
doc.setTextColor(...body)
const profBullets = [
  'Formulated and gained Board of Studies approval for curriculum in Advanced Web Technologies (Advanced Java) and AngularJS.',
  'Delivered lectures and hands-on code laboratories in Core Java, Multithreading, Concurrency, and Microservices design to 100+ engineers.',
  'Conducted intensive faculty seminars on design patterns, clean architecture, and distributed system design.',
]
profBullets.forEach((bullet) => {
  doc.text('•', margin + 4, y)
  const bSplit = doc.splitTextToSize(bullet, contentWidth - 18)
  doc.text(bSplit, margin + 14, y)
  y += bSplit.length * 10.5 + 2
})

// Education
drawSectionHeading('Education & Research')

doc.setFont('helvetica', 'bold')
doc.setFontSize(9.5)
doc.setTextColor(...dark)
doc.text('M.Tech in Computer Engineering (CPI: 7.77 / First Class with Distinction)', margin, y)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...muted)
doc.text('2023 – 2025', pageWidth - margin, y, { align: 'right' })

y += 11
doc.setFont('helvetica', 'normal')
doc.setFontSize(8.5)
doc.setTextColor(...body)
doc.text('Atmiya University · Thesis: Enhanced Optimization Model (EOM) — Cloud VM Scheduling via PSO-WOA (18% makespan reduction)', margin, y)

y += 14
doc.setFont('helvetica', 'bold')
doc.setFontSize(9.5)
doc.setTextColor(...dark)
doc.text('B.E. in Computer Engineering (CPI: 7.58)', margin, y)
doc.setFont('helvetica', 'normal')
doc.setTextColor(...muted)
doc.text('2019 – 2023', pageWidth - margin, y, { align: 'right' })

y += 11
doc.setFont('helvetica', 'normal')
doc.setFontSize(8.5)
doc.setTextColor(...body)
doc.text('Gujarat Technological University (GTU) · B.H. Gardi College of Engineering & Technology', margin, y)

// Output
const outPath = path.resolve('public', 'Samir_Joshi_Resume.pdf')
const pdfBytes = doc.output('arraybuffer')
fs.writeFileSync(outPath, Buffer.from(pdfBytes))
console.log('Resume PDF generated successfully at:', outPath)
