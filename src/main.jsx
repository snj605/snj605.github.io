import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme-provider'
import App from './App'
import './styles/index.css'

const AdminPage = import.meta.env.DEV
  ? React.lazy(() => import('./pages/AdminPage'))
  : null

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />} />
            {import.meta.env.DEV && AdminPage && (
              <Route path="/admin" element={<React.Suspense fallback={null}><AdminPage /></React.Suspense>} />
            )}
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
)
