import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from 'sonner'
// import blink from './blink/client'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CVProcessor from './pages/CVProcessor'
import TemplateManager from './pages/TemplateManager'
import Settings from './pages/Settings'
import Pricing from './pages/Pricing'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<LandingPage user={user} />} />
          <Route path="/pricing" element={<Pricing />} />
          {user && (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/process" element={<CVProcessor />} />
              <Route path="/templates" element={<TemplateManager />} />
              <Route path="/settings" element={<Settings />} />
            </>
          )}
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App