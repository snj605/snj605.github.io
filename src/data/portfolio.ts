export interface ProfileData {
  name: string
  headline: string
  subtitles: string[]
  bio: string[]
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  avatar: string
  stats: { value: string; label: string; detail?: string }[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  type?: string
  location: string
  period: string
  current: boolean
  description: string
  bullets: string[]
  metrics: string[]
  techStack: string[]
}

export interface ProjectItem {
  id: string
  title: string
  category: 'Enterprise Microservices' | 'Distributed & AI' | 'Cloud Optimization' | 'Mobile & IoT'
  period: string
  role: string
  description: string
  architectureHighlights: string[]
  bullets: string[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  status?: 'live' | 'dev' | 'research'
}

export interface SkillCategory {
  title: string
  description: string
  skills: { name: string; level?: string; highlight?: boolean }[]
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  grade: string
  details: string
}

export const portfolioData = {
  profile: {
    name: 'Samir Joshi',
    headline: 'Java Backend Software Engineer',
    subtitles: [
      'Spring Boot & Microservices Specialist',
      'Apache Kafka & Event-Driven Systems',
      'IoT Telemetry & Distributed Architecture',
      'M.Tech Researcher · Cloud Optimization',
      'Ex-Assistant Professor · Atmiya University',
    ],
    bio: [
      'Results-driven Java Backend Software Engineer with hands-on enterprise experience architecting decoupled Spring Boot microservices, high-throughput IoT telemetry streaming pipelines, and fault-tolerant event-driven systems.',
      'Backed by 1 year of academic instruction at Atmiya University designing approved curricula for Advanced Java, Concurrency, and Microservices. Proven expertise across Spring Boot, Apache Kafka, RESTful APIs, and multi-database optimization (MySQL, PostgreSQL, MongoDB).',
      'Obsessed with clean code architecture, sub-millisecond query optimization, and engineering resilient backend systems that scale under real-world load.',
    ],
    email: 'samirjoshi605@gmail.com',
    phone: '+91 7069380063',
    location: 'Rajkot, Gujarat, India',
    linkedin: 'https://linkedin.com/in/samir-joshi-a6965b1a5',
    github: 'https://github.com/snj605',
    avatar: '/samir_dp.png',
    stats: [
      { value: '4–6', label: 'Microservices Architected', detail: 'Spring Boot 3 SaaS in production' },
      { value: '50+', label: 'RESTful Endpoints', detail: 'Spring Security + JWT + RBAC' },
      { value: '18%', label: 'Makespan Reduction', detail: 'M.Tech Thesis PSO-WOA algorithm' },
      { value: '100+', label: 'Engineers Mentored', detail: 'Advanced Java & Microservices labs' },
    ],
  } as ProfileData,

  experience: [
    {
      id: 'bhakti-enterprise',
      role: 'Java Backend Developer (Contract Engagement)',
      company: 'Bhakti Enterprise',
      type: 'Contract',
      location: 'Rajkot, Gujarat, India',
      period: '05/2025 – Present',
      current: true,
      description:
        'Architected and deployed an industrial enterprise SaaS platform supporting manufacturing workflows, inventory control, and real-time telemetry streaming for IoT-connected smart vending machines.',
      bullets: [
        'Architected an enterprise SaaS system across 4–6 decoupled Spring Boot microservices for manufacturing, inventory control, and IoT-connected vending machines.',
        'Engineered automated telemetry workflows streaming real-time diagnostic reports over the internet, allowing field engineers to resolve mechanical errors via a centralized web UI.',
        'Built and documented 50+ RESTful API endpoints secured via Spring Security, stateless JWT authentication, and fine-grained RBAC.',
        'Deployed Apache Kafka event brokers for high-throughput, non-blocking asynchronous transactions, ensuring real-time uptime monitoring for machinery and notification dispatches.',
        'Designed normalized MySQL and PostgreSQL schemas, writing tuned queries and composite indexes to minimize latency under heavy transaction volumes.',
      ],
      metrics: [
        '4-6 Decoupled Microservices',
        '50+ Production REST APIs',
        'Sub-millisecond DB Query Latency',
        'Zero-Loss Kafka Event Brokers',
      ],
      techStack: ['Java 17/21', 'Spring Boot 3', 'Apache Kafka', 'Spring Security', 'JWT', 'PostgreSQL', 'MySQL', 'Docker'],
    },
    {
      id: 'atmiya-university',
      role: 'Assistant Professor',
      company: 'Atmiya University',
      type: 'Academic Faculty',
      location: 'Rajkot, Gujarat, India',
      period: '06/2024 – 04/2025',
      current: false,
      description:
        'Led academic curriculum modernization and delivered rigorous technical instruction covering enterprise Java, concurrent programming, and distributed microservices architecture.',
      bullets: [
        "Formally designed syllabi for Advanced Web Technologies (Advanced Java) and AngularJS, approved by the university's Board of Studies.",
        'Delivered lectures and hands-on laboratory sessions covering Core/Advanced Java, Multithreading, Concurrency, and RESTful API design.',
        'Conducted vacation seminars and workshops on microservices architecture, design patterns, and clean code principles.',
        'Managed physical computing lab infrastructure, coordinating practical sessions across Java, AngularJS, Android, Flutter, and AI subjects.',
      ],
      metrics: [
        'Board of Studies Approved Syllabi',
        '100+ Students Instructed & Mentored',
        '5 Tech Stack Labs Managed',
      ],
      techStack: ['Core Java', 'Advanced Java', 'Multithreading', 'Microservices', 'RESTful API Design', 'AngularJS'],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: 'jobpilot',
      title: 'JobPilot – AI-Powered Job Search Platform',
      category: 'Distributed & AI',
      period: '04/2026 – 07/2026',
      role: 'Lead Systems Architect & Backend Engineer',
      description:
        'A scalable event-driven modular monolith built upon an Apache Kafka event bus. Seamlessly coordinates job ingestion, automated resume tailoring, application tracking, and an intelligent API gateway with a mobile-first Angular PWA.',
      architectureHighlights: [
        'Kafka Event Bus with partitioned topics for job ingestion, tailor-service, and apply-dispatch',
        'External AI LLM Integration for real-time resume tailoring & match-scoring',
        'Dead-Letter Queue (DLQ) pattern with idempotent consumers for zero ingestion drop',
      ],
      bullets: [
        'Designed a modular monolith on a Kafka event bus (job ingestion, resume-tailor, apply-service, tracking, API gateway) with a mobile-first Angular PWA frontend.',
        'Integrated external AI APIs for automated resume tailoring, keyword match evaluation, and personalized application submissions.',
        'Configured consumer groups with backpressure management, handling peak bursts without API throttling.',
        'Implemented JWT stateless authorization and cached frequent job queries in Redis for sub-10ms response times.',
      ],
      tags: ['Java', 'Spring Boot', 'Apache Kafka', 'Angular PWA', 'PostgreSQL', 'Redis', 'AI APIs', 'Docker'],
      githubUrl: 'https://github.com/snj605/jobpilot-ai',
      liveUrl: 'https://snj605.github.io',
      status: 'live',
    },
    {
      id: 'iot-erp-telemetry',
      title: 'IoT ERP & Machinery Telemetry Engine',
      category: 'Enterprise Microservices',
      period: '05/2025 – Present',
      role: 'Java Backend Architect',
      description:
        'Production microservices backend powering real-time diagnostic reporting and automated telemetry workflows for smart industrial hardware and IoT vending machines.',
      architectureHighlights: [
        'Spring Cloud Gateway with token validation and dynamic route dispatching',
        'Apache Kafka event streaming pipeline ingesting machinery heartbeat telemetry',
        'Dual-Database model: PostgreSQL for transactional ERP, MySQL for time-series logs',
      ],
      bullets: [
        'Engineered decoupled microservices handling Inventory, Order Dispatch, Machine Health, and Field Diagnostics.',
        'Implemented fine-grained RBAC with Spring Security and stateless JWT token rotation.',
        'Optimized database connection pools and indexes to ensure sub-millisecond query execution under load.',
      ],
      tags: ['Java', 'Spring Boot 3', 'Apache Kafka', 'Spring Security', 'JWT', 'PostgreSQL', 'MySQL', 'Microservices'],
      githubUrl: 'https://github.com/snj605/iot-telemetry-engine',
      liveUrl: 'https://snj605.github.io',
      status: 'live',
    },
    {
      id: 'eom-cloud-balancer',
      title: 'Enhanced Optimization Model (EOM) — Cloud VM Scheduler',
      category: 'Cloud Optimization',
      period: '05/2024 – 04/2025',
      role: 'M.Tech Thesis Researcher & Developer',
      description:
        'Novel hybrid metaheuristic algorithm (PSO-WOA) for optimal Virtual Machine load balancing in heterogeneous cloud environments, implemented on Azure and validated via Java CloudSim.',
      architectureHighlights: [
        'Hybrid Particle Swarm & Whale Optimization Algorithm (PSO-WOA)',
        'Extensive benchmark simulations against FCFS, Round Robin, and pure PSO',
        'Azure Cloud deployment & Java CloudSim discrete event simulation engine',
      ],
      bullets: [
        'Formulated a hybrid metaheuristic scheduling model balancing compute, memory, and bandwidth constraints across heterogeneous VMs.',
        'Achieved an 18% reduction in overall makespan and 12% improvement in average CPU utilization.',
        'Validated algorithmic convergence through statistical hypothesis testing across 1,000+ benchmark task runs.',
      ],
      tags: ['Java', 'CloudSim', 'SimPy', 'Azure', 'Metaheuristics', 'Cloud Computing', 'PSO-WOA'],
      githubUrl: 'https://github.com/snj605/eom-cloud-vm-scheduler',
      status: 'research',
    },
    {
      id: 'notification-engine',
      title: 'Real-Time Notification & Alert Engine',
      category: 'Distributed & AI',
      period: '2025',
      role: 'Backend Engineer',
      description:
        'High-throughput, multi-channel notification dispatch engine supporting WebSocket push, email, and SMS delivery with guaranteed at-least-once delivery semantics via Kafka + Redis PubSub.',
      architectureHighlights: [
        'Kafka consumer groups with per-channel topic partitioning and priority queues',
        'Redis PubSub for sub-50ms WebSocket fan-out to connected browser clients',
        'Outbox pattern + idempotency keys to guarantee exactly-once email dispatch',
      ],
      bullets: [
        'Designed multi-tenant notification routing with per-user preference management.',
        'Implemented exponential backoff retry logic with DLQ escalation for failed deliveries.',
        'Built React admin dashboard for real-time delivery status monitoring.',
      ],
      tags: ['Java', 'Spring Boot', 'Kafka', 'WebSocket', 'Redis', 'SMTP', 'PostgreSQL'],
      githubUrl: 'https://github.com/snj605/realtime-notification-engine',
      liveUrl: 'https://snj605.github.io',
      status: 'live',
    },
    {
      id: 'spring-cloud-starter',
      title: 'Spring Cloud Microservices Enterprise Blueprint',
      category: 'Enterprise Microservices',
      period: '2024',
      role: 'Backend Architect',
      description:
        'Production-ready enterprise distributed system template featuring Spring Cloud Gateway, Resilience4j circuit breaking, distributed tracing, and centralized configuration.',
      architectureHighlights: [
        'Spring Cloud Gateway with custom rate-limiting filters',
        'Resilience4j Circuit Breakers, Bulkheads, and Retry strategies',
        'OpenTelemetry & Zipkin distributed tracing across all service hops',
      ],
      bullets: [
        'Built a complete reference architecture for resilient microservice deployments.',
        'Packaged with multi-container Docker Compose setup for local orchestration.',
      ],
      tags: ['Spring Cloud', 'Spring Boot', 'Resilience4j', 'Redis', 'Docker Compose', 'Distributed Tracing'],
      githubUrl: 'https://github.com/snj605/spring-cloud-microservices-blueprint',
      status: 'dev',
    },
    {
      id: 'fitness-tracker',
      title: 'Mobile-Based Fitness & Activity Monitoring System',
      category: 'Mobile & IoT',
      period: '2022 – 2023',
      role: 'Full Stack & Mobile Developer',
      description:
        'B.E. Capstone project implementing mobile-based workout tracking, GPS trajectory logging, and real-time cloud data synchronization.',
      architectureHighlights: [
        'Flutter BLoC architecture for reactive state management',
        'Firebase real-time cloud synchronization & authentication',
        'Background GPS trajectory smoothing for distance & calorie computation',
      ],
      bullets: [
        'Developed native Android/iOS mobile application with Flutter and Firebase backend.',
        'Implemented background location tracking with battery-conscious polling intervals.',
      ],
      tags: ['Flutter', 'Firebase', 'Dart', 'Geolocation', 'REST APIs'],
      githubUrl: 'https://github.com/snj605/flutter-fitness-tracker',
      liveUrl: 'https://snj605.github.io',
      status: 'live',
    },
  ] as ProjectItem[],

  skills: [
    {
      title: 'Backend & Frameworks',
      description: 'Enterprise Java ecosystem & distributed services',
      skills: [
        { name: 'Java (17/21)', highlight: true },
        { name: 'Spring Boot 3', highlight: true },
        { name: 'Spring Data JPA', highlight: true },
        { name: 'Spring Security (JWT/RBAC)', highlight: true },
        { name: 'Microservices Architecture', highlight: true },
        { name: 'RESTful API Design', highlight: true },
        { name: 'Hibernate / ORM' },
        { name: 'Kotlin' },
      ],
    },
    {
      title: 'Messaging & Event-Driven',
      description: 'High-throughput streaming & async brokers',
      skills: [
        { name: 'Apache Kafka', highlight: true },
        { name: 'Kafka Producers/Consumers', highlight: true },
        { name: 'Event-Driven Architecture', highlight: true },
        { name: 'Dead-Letter Queues (DLQ)' },
        { name: 'WebSockets' },
        { name: 'Redis PubSub' },
      ],
    },
    {
      title: 'Databases & Storage',
      description: 'Schema modeling, indexing & optimization',
      skills: [
        { name: 'PostgreSQL', highlight: true },
        { name: 'MySQL', highlight: true },
        { name: 'MongoDB' },
        { name: 'Firebase Firestore' },
        { name: 'Query Optimization & Indexing', highlight: true },
        { name: 'Redis Caching', highlight: true },
      ],
    },
    {
      title: 'Cloud, DevOps & Systems',
      description: 'Infrastructure, virtualization & pipelines',
      skills: [
        { name: 'Docker', highlight: true },
        { name: 'Azure', highlight: true },
        { name: 'AWS' },
        { name: 'GCP' },
        { name: 'Git & GitHub Actions', highlight: true },
        { name: 'CI/CD Fundamentals' },
        { name: 'Java CloudSim' },
        { name: 'Linux / Shell Scripting' },
      ],
    },
  ] as SkillCategory[],

  education: [
    {
      degree: 'M.Tech in Computer Engineering (Software Engineering)',
      institution: 'Atmiya University, Rajkot',
      period: '2023 – 2025',
      grade: 'First Class',
      details: 'Thesis: Hybrid Metaheuristic Approach for Optimal Load Balancing in Heterogeneous Cloud Environments (PSO-WOA algorithm). 18% makespan reduction vs baselines.',
    },
    {
      degree: 'B.E. in Computer Engineering',
      institution: 'Marwadi Education Foundation',
      period: '2020 – 2023',
      grade: 'Distinction',
      details: 'Capstone Project: Mobile-Based Fitness Tracking and Activity Monitoring System (Flutter & Firebase).',
    },
    {
      degree: 'Diploma in Computer Engineering',
      institution: 'Atmiya Institute of Tech. & Sci. For Diploma Studies',
      period: '2017 – 2020',
      grade: 'First Class with Distinction',
      details: 'Comprehensive foundations in C/C++, Data Structures, OOP, Database Systems, and Network Architecture.',
    },
  ] as EducationItem[],

  certifications: [
    {
      name: 'Artificial Intelligence',
      issuer: 'Great Learning',
      period: '02/2025 – 04/2025',
      skills: 'Machine Learning, Neural Networks, AI APIs',
    },
    {
      name: 'Enterprise Java & Spring Boot Architecture',
      issuer: 'Advanced Backend Engineering',
      period: '2024',
      skills: 'Microservices, Kafka, Spring Security, Cloud Deployment',
    },
  ],

  achievements: [
    {
      icon: '🏆',
      title: 'M.Tech Thesis — Board Approved',
      detail: 'PSO-WOA hybrid algorithm accepted & published. 18% makespan reduction, 12% CPU improvement over baselines.',
      year: '2025',
    },
    {
      icon: '📚',
      title: 'University Board of Studies',
      detail: 'Designed and got formal approval for Advanced Java & AngularJS syllabi at Atmiya University.',
      year: '2024',
    },
    {
      icon: '⚡',
      title: 'Production IoT Platform Shipped',
      detail: 'Delivered full enterprise SaaS for industrial IoT vending machines at Bhakti Enterprise — 4-6 microservices, 50+ APIs.',
      year: '2025',
    },
    {
      icon: '🎓',
      title: '100+ Students Mentored',
      detail: 'Delivered lectures and lab sessions in Advanced Java, Microservices, and AI for 2 semesters.',
      year: '2024',
    },
  ],
}
