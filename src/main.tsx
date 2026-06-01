import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/globals.css'
import './i18n'
import { App } from './App'
import { AdminPage } from './pages/AdminPage'
import { siteConfig } from './config/restaurant.config'

const root = document.getElementById('root')
if (!root) throw new Error('No se encontró el elemento #root en index.html')

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<App config={siteConfig} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)
