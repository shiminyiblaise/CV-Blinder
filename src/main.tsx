import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'
import { setupDOMErrorHandler } from './libs/dom-utils'
import { setupRadixErrorHandler } from './libs/radix-error-handler'
import './libs/error-suppression' // Auto-installs comprehensive error suppression
import { ErrorBoundary } from './components/ErrorBoundary'

// Setup global DOM error handler to prevent tagName errors
setupDOMErrorHandler()
setupRadixErrorHandler()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Toaster position="top-right" />
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
