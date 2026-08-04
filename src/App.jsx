import React, { Suspense, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Header from './components/Header'
import About from './components/About'
import Footer from './components/Footer'
import { SkeletonGrid } from './components/ui/skeleton'
import { initGA, trackPageView } from './lib/analytics'
import { profile } from './data/profile'

const Experience     = React.lazy(() => import('./components/Experience'))
const Blog           = React.lazy(() => import('./components/Blog'))
const Projects       = React.lazy(() => import('./components/Projects'))
const Skills         = React.lazy(() => import('./components/Skills'))
const Education      = React.lazy(() => import('./components/Education'))
const Certifications = React.lazy(() => import('./components/Certifications'))
const Contact        = React.lazy(() => import('./components/Contact'))

function App() {
  useEffect(() => {
    initGA()
    trackPageView()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{profile.name} — Full Stack Developer | React, Node.js</title>
        <meta name="description" content={`${profile.name} — Full Stack Developer building modern web applications with React, Node.js, and various technologies.`} />
        <meta name="keywords" content={`${profile.name}, Full Stack Developer, React Developer, Node.js, Web Developer, Portfolio`} />
        <meta name="author" content={profile.name} />
        <meta property="og:title" content={`${profile.name} — Full Stack Developer`} />
        <meta property="og:description" content="Full Stack Developer specializing in React, Node.js, and modern web technologies." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Header />
      <div className="main-content">
        <About />
        <Suspense fallback={<div className="container py-16"><SkeletonGrid count={6} /></div>}>
          <Blog />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Certifications />
          <Contact />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}

export default App
