// ── SAMIR JOSHI — PORTFOLIO DATA ─────────────────────────────────────────────
// Edit this file to update all portfolio content, OR use /admin panel

export const defaultData = {
  meta: {
    title: 'Samir Joshi — Full Stack Developer | React, Node.js',
    description:
      'Full Stack Developer building modern web applications with React, Node.js, and various technologies.',
    author: 'Samir Joshi',
    siteUrl: 'https://samirjoshi.dev',
    keywords:
      'Samir Joshi, Full Stack Developer, React Developer, Node.js, Web Developer, Portfolio',
  },

  hero: {
    greeting: "Hi, I'm",
    name: 'Samir Joshi',
    titles: [
      'Full Stack Developer',
      'React Developer',
      'Node.js Developer',
      'Software Engineer',
    ],
    bio: 'Passionate Full Stack Developer with experience building modern, responsive web applications. I love turning ideas into clean, efficient code.',
    social: {
      github: 'https://github.com/samirjoshi',
      linkedin: 'https://linkedin.com/in/samir-joshi',
      email: 'samir.joshi@example.com',
      twitter: 'https://x.com/samirjoshi',
    },
    cvPath: '/resume.pdf',
    cvFileName: 'Samir_Joshi_Resume.pdf',
    profileImage: '',
  },

  about: {
    bio: [
      'Full Stack Developer with hands-on experience building modern web applications using React, Node.js, and various databases.',
      'Focused on writing clean, maintainable code and delivering responsive, user-friendly interfaces backed by scalable APIs.',
      'Continuously learning new technologies and best practices to stay current with the ever-evolving web ecosystem.',
    ],
    highlights: [
      { icon: '⚛️', label: 'Frontend', detail: 'React, TypeScript, Tailwind' },
      { icon: '🟢', label: 'Backend', detail: 'Node.js, Express, REST APIs' },
      { icon: '🗄️', label: 'Databases', detail: 'MongoDB, PostgreSQL, MySQL' },
      { icon: '🛠️', label: 'Tools', detail: 'Git, Docker, VS Code' },
    ],
  },

  experience: [
    {
      title: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      period: 'Jun 2023 – Present',
      current: true,
      bullets: [
        'Developed and maintained full-stack web applications using React and Node.js.',
        'Built RESTful APIs and integrated third-party services for enhanced functionality.',
        'Collaborated with cross-functional teams to design and implement new features.',
        'Improved application performance through code optimization and caching strategies.',
      ],
      tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
    },
    {
      title: 'Web Developer Intern',
      company: 'Digital Agency',
      location: 'Remote',
      period: 'Jan 2023 – May 2023',
      current: false,
      bullets: [
        'Built responsive client websites using React, JavaScript, and CSS.',
        'Implemented pixel-perfect designs across different devices and browsers.',
        'Gained experience with Git workflows and collaborative development.',
      ],
      tags: ['React', 'JavaScript', 'CSS', 'Git'],
    },
  ],

  skills: [
    {
      category: 'Frontend',
      items: [
        { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
        { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      ],
    },
    {
      category: 'Databases',
      items: [
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      ],
    },
    {
      category: 'Tools & DevOps',
      items: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
      ],
    },
  ],

  projects: [
    {
      title: 'E-Commerce Platform',
      period: '2024',
      desc: 'Full-stack e-commerce app with product catalog, cart, and Stripe payment integration.',
      bullets: [
        'React frontend with Tailwind CSS and responsive design.',
        'Node.js/Express backend with JWT authentication.',
        'MongoDB for data persistence with optimized queries.',
        'Stripe payment gateway integration.',
      ],
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind'],
      links: { code: 'https://github.com/samirjoshi', demo: null },
      featured: true,
    },
    {
      title: 'Task Management App',
      period: '2023',
      desc: 'Collaborative task manager with real-time updates and drag-and-drop functionality.',
      bullets: [
        'React DnD for drag-and-drop task organization.',
        'WebSocket for real-time collaboration.',
        'JWT-based authentication and authorization.',
        'PostgreSQL for reliable data storage.',
      ],
      tags: ['React', 'Node.js', 'WebSocket', 'PostgreSQL'],
      links: { code: 'https://github.com/samirjoshi', demo: null },
      featured: true,
    },
    {
      title: 'Weather Dashboard',
      period: '2023',
      desc: 'Weather app with 5-day forecasts, interactive charts, and dark/light mode.',
      bullets: [
        'OpenWeatherMap API integration.',
        'Chart.js for temperature and precipitation visualization.',
        'Responsive design with dark/light mode toggle.',
        'API response caching to reduce rate limiting.',
      ],
      tags: ['React', 'Chart.js', 'API Integration'],
      links: { code: 'https://github.com/samirjoshi', demo: null },
      featured: false,
    },
  ],

  certifications: [
    {
      id: 1,
      name: 'Web Development Bootcamp',
      issuer: 'Online Learning Platform',
      period: '2023',
      link: '#',
      image: '',
    },
    {
      id: 2,
      name: 'React Developer Certification',
      issuer: 'Course Provider',
      period: '2023',
      link: '#',
      image: '',
    },
  ],

  education: [
    {
      degree: "Bachelor's in Computer Science",
      institution: 'University of Technology',
      location: '',
      period: '2019 – 2023',
      grade: '',
      icon: '🎓',
    },
  ],

  contact: {
    email: 'samir.joshi@example.com',
    phone: '',
    whatsapp: '',
    linkedin: 'https://linkedin.com/in/samir-joshi',
    github: 'https://github.com/samirjoshi',
    formspreeId: 'YOUR_FORMSPREE_ID',
  },

  footer: {
    name: 'Samir Joshi',
    year: new Date().getFullYear(),
  },
};

export function getPortfolioData() {
  try {
    const saved = localStorage.getItem('sjPortfolio');
    if (saved) return { ...defaultData, ...JSON.parse(saved) };
  } catch {}
  return defaultData;
}

export function savePortfolioData(data) {
  localStorage.setItem('sjPortfolio', JSON.stringify(data));
}
