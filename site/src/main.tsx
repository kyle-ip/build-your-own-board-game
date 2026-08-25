import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './i18n'
import './index.css'
import App from './App'
import { ScrollToTop } from './components/ScrollToTop'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ScrollToTop />
      <App />
    </HashRouter>
  </StrictMode>,
)
