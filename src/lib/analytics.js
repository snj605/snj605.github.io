const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''
const isProd = import.meta.env.PROD

export const initGA = () => {
  if (!isProd || !GA_MEASUREMENT_ID) return
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID)
  }
}

export const trackPageView = (path) => {
  const cleanPath = path || window.location.pathname + window.location.search
  if (!isProd || !GA_MEASUREMENT_ID) return
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: cleanPath,
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

export const trackEvent = (action, params = {}) => {
  if (!isProd || !GA_MEASUREMENT_ID) return
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, params)
  }
}

export const trackResumeDownload = (format = 'PDF') =>
  trackEvent('resume_download', { event_category: 'engagement', event_label: `Resume Downloaded (${format})` })

export const trackGithubClick = (location = 'general') =>
  trackEvent('github_click', { event_category: 'social', event_label: `GitHub Profile Clicked from ${location}` })

export const trackLinkedinClick = (location = 'general') =>
  trackEvent('linkedin_click', { event_category: 'social', event_label: `LinkedIn Profile Clicked from ${location}` })

export const trackContactSubmit = (email = 'anonymous') =>
  trackEvent('contact_submit', { event_category: 'contact', event_label: 'Contact Form Submitted Successfully', contact_email: email })
