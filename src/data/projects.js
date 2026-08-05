export const projects = [
  {
    title: 'E-Commerce Platform',
    period: '2024',
    status: 'Completed',
    role: 'Full Stack Developer',
    description:
      'A production-ready full-stack e-commerce platform with a complete shopping experience — product catalog, cart management, user authentication, and Stripe payment processing. Built with a focus on performance, security, and scalability to handle real-world traffic.',
    bullets: [
      'React frontend with Tailwind CSS, responsive design, and optimized Core Web Vitals.',
      'Node.js/Express backend with JWT authentication and role-based access control.',
      'MongoDB for data persistence with indexed queries for fast product search.',
      'Stripe payment gateway integration with webhook handling for order fulfillment.',
      'Redis caching layer reducing database load by 60% on high-traffic endpoints.',
      'Deployed on AWS EC2 with Nginx reverse proxy and SSL termination.',
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'AWS', 'Tailwind'],
    links: { code: 'https://github.com/snj605', demo: null },
  },
  {
    title: 'Task Management App',
    period: '2023',
    status: 'Completed',
    role: 'Full Stack Developer',
    description:
      'A real-time collaborative task management application inspired by Trello. Teams can create boards, manage tasks with drag-and-drop, assign members, set deadlines, and see live updates — all without refreshing the page.',
    bullets: [
      'React DnD for intuitive drag-and-drop task organization across columns.',
      'WebSocket (Socket.io) for real-time collaboration — changes sync instantly.',
      'JWT-based authentication with refresh token rotation for security.',
      'PostgreSQL with Prisma ORM for reliable relational data storage.',
      'Email notifications via SendGrid for task assignments and deadlines.',
      'Mobile-responsive design with offline support via service workers.',
    ],
    tags: ['React', 'Node.js', 'WebSocket', 'PostgreSQL', 'Prisma', 'SendGrid'],
    links: { code: 'https://github.com/snj605', demo: null },
  },
  {
    title: 'Weather Dashboard',
    period: '2023',
    status: 'Completed',
    role: 'Frontend Developer',
    description:
      'An interactive weather dashboard providing real-time conditions and 7-day forecasts for any city worldwide. Features beautiful data visualizations, location detection, and a polished UI with dark/light mode support.',
    bullets: [
      'OpenWeatherMap API integration with error handling and loading states.',
      'Chart.js for interactive temperature, humidity, and precipitation charts.',
      'Geolocation API for automatic current location detection.',
      'Responsive design with smooth dark/light mode toggle.',
      'API response caching with localStorage to reduce rate limiting.',
      'Search history with recent cities stored in browser storage.',
    ],
    tags: ['React', 'Chart.js', 'OpenWeatherMap API', 'Geolocation', 'CSS'],
    links: { code: 'https://github.com/snj605', demo: null },
  },
]
