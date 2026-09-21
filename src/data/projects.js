export const projects = [
  {
    title: 'JobPilot – AI-Powered Job Search Platform',
    period: 'Apr 2026 – Jul 2026',
    status: 'Completed',
    role: 'Lead Backend & Systems Designer',
    description:
      'An event-driven modular monolith built on an Apache Kafka event bus integrating job ingestion, automated resume tailoring, application tracking, and an intelligent API gateway with an Angular progressive web app frontend.',
    bullets: [
      'Engineered decoupled service domains (Job Ingestion, Resume Tailoring, Apply Service, Tracking, API Gateway) communicating via Kafka event topics.',
      'Integrated external AI LLM APIs to automatically parse job descriptions, generate tailored resume summaries, and score match compatibility.',
      'Deployed Kafka consumer groups with idempotent message handlers and dead-letter queues (DLQ) to ensure zero data loss during high ingestion spikes.',
      'Constructed a mobile-first Angular PWA frontend with offline-first service worker caching and real-time application status updates.',
      'Implemented JWT stateless authentication, Redis caching for active job listings, and Spring Data JPA with PostgreSQL persistence.',
    ],
    tags: ['Java', 'Spring Boot', 'Apache Kafka', 'Angular PWA', 'PostgreSQL', 'Redis', 'AI APIs', 'Docker'],
    links: { code: 'https://github.com/snj605', demo: null },
  },
  {
    title: 'IoT ERP & Machinery Telemetry Engine',
    period: 'May 2025 – Present',
    status: 'Completed',
    role: 'Java Backend Architect',
    description:
      'A production enterprise SaaS platform spanning 4–6 decoupled Spring Boot microservices managing industrial manufacturing operations, inventory control, and real-time telemetry streaming for IoT-connected vending machines.',
    bullets: [
      'Architected 4–6 decoupled microservices (Auth, Inventory, Telemetry Ingestion, Diagnostics, Alerting) built on Spring Boot 3.',
      'Engineered high-throughput automated telemetry pipelines using Apache Kafka event brokers for real-time mechanical health monitoring.',
      'Developed 50+ RESTful API endpoints secured via Spring Security, stateless JWT authentication, and granular Role-Based Access Control (RBAC).',
      'Designed normalized schemas across MySQL and PostgreSQL, optimizing indexes to sustain heavy transaction volumes with sub-millisecond query latencies.',
      'Enabled field engineers to diagnose mechanical anomalies and trigger remote firmware/calibration commands through a centralized portal.',
    ],
    tags: ['Java', 'Spring Boot', 'Microservices', 'Apache Kafka', 'Spring Security', 'JWT', 'MySQL', 'PostgreSQL'],
    links: { code: 'https://github.com/snj605', demo: null },
  },
  {
    title: 'Enhanced Optimization Model (EOM) – Cloud Load Balancer',
    period: 'May 2024 – Apr 2025',
    status: 'Completed',
    role: 'M.Tech Research Lead',
    description:
      'A hybrid metaheuristic optimization algorithm (PSO-WOA) implemented on Azure and evaluated using Java CloudSim and SimPy for intelligent Virtual Machine load balancing across heterogeneous cloud computing environments.',
    bullets: [
      'Formulated a hybrid Particle Swarm Optimization & Whale Optimization Algorithm (PSO-WOA) to solve multi-objective cloud VM scheduling problems.',
      'Modeled heterogeneous data center architectures in Java CloudSim, running extensive benchmark workload simulations against standard FCFS and Round Robin.',
      'Achieved an 18% reduction in overall makespan and a 12% improvement in average CPU utilization across heterogeneous VM clusters.',
      'Published empirical findings and statistical evaluations as part of M.Tech thesis research at Atmiya University.',
    ],
    tags: ['Java', 'CloudSim', 'SimPy', 'Azure', 'Cloud Computing', 'Optimization Algorithms', 'Metaheuristics'],
    links: { code: 'https://github.com/snj605', demo: null },
  },
  {
    title: 'Spring Cloud Microservices Enterprise Starter',
    period: '2024',
    status: 'Completed',
    role: 'Backend Architect',
    description:
      'A comprehensive enterprise-grade microservices blueprint featuring Spring Cloud Gateway, Service Discovery, centralized configuration, distributed tracing, and fault-tolerance resilience patterns.',
    bullets: [
      'Configured Spring Cloud Gateway with custom pre/post filters for global JWT authentication, dynamic routing, and Redis rate limiting.',
      'Integrated Resilience4j circuit breakers, bulkheads, and retry mechanisms to prevent cascading failures across downstream microservices.',
      'Configured OpenTelemetry and Zipkin distributed tracing across all service boundaries with centralized logging.',
      'Packaged with multi-stage Dockerfiles and Docker Compose for one-command local orchestration and testing.',
    ],
    tags: ['Spring Cloud', 'Spring Boot', 'Resilience4j', 'Redis', 'Docker Compose', 'Microservices', 'Distributed Tracing'],
    links: { code: 'https://github.com/snj605', demo: null },
  },
  {
    title: 'Mobile Fitness Tracking & Activity Monitoring System',
    period: '2022 – 2023',
    status: 'Completed',
    role: 'Full Stack & Mobile Developer',
    description:
      'A mobile-based activity monitoring and personal fitness tracking ecosystem featuring real-time workout logging, geolocation-based run tracking, and cloud data synchronization.',
    bullets: [
      'Engineered cross-platform mobile application using Flutter with clean BLoC architecture for predictable state management.',
      'Integrated Firebase Authentication and Firestore for real-time user profile, workout, and metric synchronization.',
      'Implemented background GPS tracking with smoothing algorithms for accurate distance, speed, and caloric burn computations.',
    ],
    tags: ['Flutter', 'Firebase', 'Dart', 'Mobile Development', 'REST APIs', 'Geolocation'],
    links: { code: 'https://github.com/snj605', demo: null },
  },
]

