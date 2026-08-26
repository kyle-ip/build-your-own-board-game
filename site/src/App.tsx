import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { InstallPage } from './pages/InstallPage'
import { HandbookPage } from './pages/HandbookPage'
import { WalkthroughPage } from './pages/WalkthroughPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="install" element={<InstallPage />} />
        <Route path="handbook" element={<HandbookPage />} />
        <Route path="walkthrough" element={<WalkthroughPage />} />
        <Route path="example" element={<Navigate to="/walkthrough" replace />} />
        <Route path="guide" element={<Navigate to="/handbook" replace />} />
        <Route path="workshop" element={<Navigate to="/handbook" replace />} />
        <Route path="campaign" element={<Navigate to="/handbook" replace />} />
        <Route path="campaign/:sessionId" element={<Navigate to="/handbook" replace />} />
      </Route>
    </Routes>
  )
}
