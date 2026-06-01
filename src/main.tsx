import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import { SolimarPage } from './pages/SolimarPage'

const root = document.getElementById('root')
if (!root) throw new Error('No root element found')

createRoot(root).render(
  <StrictMode>
    <SolimarPage />
  </StrictMode>
)
