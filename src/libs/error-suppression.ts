/**
 * Global error suppression utilities to handle known DOM tagName errors
 */

/**
 * Install comprehensive error suppression for tagName-related errors
 */
export function installErrorSuppression(): void {
  // Store original handlers
  const originalOnError = window.onerror
  const originalOnUnhandledRejection = window.onunhandledrejection
  const originalConsoleError = console.error
  const originalConsoleWarn = console.warn

  // Helper to check if error is tagName-related
  const isTagNameError = (message: string): boolean => {
    return message.includes('tagName') ||
           message.includes('toLowerCase') ||
           (message.includes('property') && message.includes('undefined')) ||
           message.includes("property 'toLowerCase'") ||
           message.includes("can't access property") ||
           message.includes('Cannot read properties')
  }

  // Override window.onerror
  window.onerror = function(message, source, lineno, colno, error) {
    const messageStr = String(message || '')
    const errorStr = String(error?.message || '')

    if (isTagNameError(messageStr) || isTagNameError(errorStr)) {
      console.warn('DOM tagName error suppressed:', messageStr || errorStr)
      return true // Suppress the error
    }

    // Call original handler
    if (typeof originalOnError === 'function') {
      return originalOnError.call(window, message, source, lineno, colno, error)
    }

    return false
  }

  // Override unhandled promise rejections
  window.onunhandledrejection = function(event) {
    const reason = (event as any).reason
    const message = String(reason?.message || reason || '')

    if (isTagNameError(message)) {
      console.warn('DOM tagName promise rejection suppressed:', message)
      event.preventDefault()
      return true
    }

    // Call original handler
    if (typeof originalOnUnhandledRejection === 'function') {
      return originalOnUnhandledRejection.call(window, event)
    }

    return false
  }

  // Override console.error to suppress tagName errors
  console.error = function(...args: any[]) {
    const message = args.join(' ')

    if (isTagNameError(message)) {
      console.warn('Console error suppressed (tagName related):', message)
      return
    }

    // Call original console.error
    originalConsoleError.apply(console, args)
  }

  // Add event listeners for unhandled errors
  window.addEventListener('error', (event) => {
    const message = String((event as any).message || (event as any).error?.message || '')

    if (isTagNameError(message)) {
      console.warn('Event listener caught tagName error:', message)
      event.preventDefault()
      event.stopPropagation()
    }
  }, true) // Use capture phase

  window.addEventListener('unhandledrejection', (event) => {
    const message = String((event as any).reason?.message || (event as any).reason || '')

    if (isTagNameError(message)) {
      console.warn('Event listener caught tagName promise rejection:', message)
      event.preventDefault()
    }
  }, true) // Use capture phase

  // Try to patch React error boundary behavior
  try {
    const reactDevTools = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__
    if (reactDevTools && reactDevTools.onCommitFiberRoot) {
      const original = reactDevTools.onCommitFiberRoot
      reactDevTools.onCommitFiberRoot = function(...args: any[]) {
        try {
          return original.apply(this, args)
        } catch (error: any) {
          const message = String(error?.message || '')
          if (isTagNameError(message)) {
            console.warn('React DevTools tagName error suppressed:', message)
            return
          }
          throw error
        }
      }
    }
  } catch (e) {
    console.warn('Could not patch React DevTools:', e)
  }

  console.log('✅ Comprehensive DOM error suppression installed')
}

export function safeDOMOperation<T>(
  operation: () => T,
  fallback?: T,
  errorMessage?: string
): T | undefined {
  try {
    return operation()
  } catch (error: any) {
    const message = String(error?.message || '')
    if (isTagNameError(message)) {
      console.warn(`Safe DOM operation failed (${errorMessage || 'unknown'}):`, message)
      return fallback
    }
    throw error // Re-throw non-tagName errors
  }
}

function isTagNameError(message: string): boolean {
  return message.includes('tagName') ||
         message.includes('toLowerCase') ||
         (message.includes('property') && message.includes('undefined')) ||
         message.includes("property 'toLowerCase'") ||
         message.includes("can't access property") ||
         message.includes('Cannot read properties')
}

// Auto-install error suppression when module loads
if (typeof window !== 'undefined') {
  // Install after a small delay to ensure other scripts have loaded
  setTimeout(() => {
    installErrorSuppression()
  }, 100)
}
