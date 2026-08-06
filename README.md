# Samir Joshi — Portfolio

Personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **React Typed** — typing effect
- **React Icons** — icons
- **React Helmet Async** — SEO meta tags
- **Formspree** — contact form

## 📁 Project Structure

```
src/
├── components/       # All UI sections
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx
│   ├── Skills.jsx
│   ├── Education.jsx
│   ├── Certifications.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── AdminPanel.jsx
├── data/
│   └── portfolioData.js   # ← Edit all content here
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

## ✏️ Customization

All portfolio content lives in `src/data/portfolioData.js`. Edit that file to update your name, bio, projects, skills, etc.

Or use the built-in admin panel at `/admin` (default password: `admin123`).

## 🛠️ Development

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
```

## 🌐 Deploy to GitHub Pages

1. Set `base` in `vite.config.js` to your repo name if deploying to `username.github.io/repo-name`
2. Run `npm run build`
3. Push the `dist/` folder or use GitHub Actions

## 📬 Contact Form

Get a free Formspree ID at [formspree.io](https://formspree.io) and update `contact.formspreeId` in `portfolioData.js`.
