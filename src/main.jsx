import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme/theme-provider'
import App from './App'
import AdminPage from './pages/AdminPage'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
)
