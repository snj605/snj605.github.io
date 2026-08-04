import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import { getPortfolioData } from './data/portfolioData'

const Experience     = React.lazy(() => import('./components/Experience'))
const Projects       = React.lazy(() => import('./components/Projects'))
const Skills         = React.lazy(() => import('./components/Skills'))
const Education      = React.lazy(() => import('./components/Education'))
const Certifications = React.lazy(() => import('./components/Certifications'))
const Contact        = React.lazy(() => import('./components/Contact'))

const Loader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
)

function Portfolio() {
  const { meta } = getPortfolioData()

  useEffect(() => {
    // default to dark mode
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords"    content={meta.keywords} />
        <meta name="author"      content={meta.author} />
        <meta property="og:title"       content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={meta.siteUrl} />
        <link rel="canonical"           href={meta.siteUrl} />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<Loader />}>
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Certifications />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"      element={<Portfolio />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
