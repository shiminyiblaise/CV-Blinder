/**
 * Error handler specifically for Radix UI components
 * This helps catch and handle common DOM-related errors from Radix components
 */

// Store original console.error to avoid infinite loops
const originalConsoleError = console.error

/**
 * Setup error handling for Radix UI components
 */
export function setupRadixErrorHandler(): void {
  // Override console.error to catch and handle Radix-related errors
  console.error = (...args: any[]) => {
    try {
      const errorMessage = args.join(' ')

      // Check for tagName-related errors - more comprehensive checking
      if (String(errorMessage).includes('tagName') || 
          String(errorMessage).includes('toLowerCase') ||
          (String(errorMessage).includes('undefined') && String(errorMessage).includes('property')) ||
          String(errorMessage).includes("property 'toLowerCase'")) {
        console.warn('DOM operation warning (tagName/toLowerCase error suppressed):', errorMessage)
        return // Don't propagate this error
      }

      // Check for other common Radix errors
      if (String(errorMessage).toLowerCase().includes('radix')) {
        console.warn('Radix error caught:', errorMessage)
      }

      // Call original console.error for other errors
      originalConsoleError.apply(console, args)
    } catch (e) {
      // If our error handler itself throws, log to original console
      originalConsoleError('Error in radix error handler:', e)
    }
  }

  // Add specific error handling for React DevTools hooking point if available
  try {
    const originalReactError = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__?.onCommitFiberRoot
    if (originalReactError) {
      (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = function(...args: any[]) {
        try {
          return originalReactError.apply(this, args)
        } catch (error: any) {
          if (error && error.message && String(error.message).includes('tagName')) {
            console.warn('React DevTools tagName error caught and handled:', error)
            return
          }
          throw error
        }
      }
    }
  } catch (e) {
    originalConsoleError('Failed to patch React DevTools hook:', e)
  }

  // Also provide a global onerror fallback to suppress known tagName errors
  try {
    const prevOnError = window.onerror
    // @ts-ignore
    window.onerror = function(message, source, lineno, colno, error) {
      try {
        if (error && error.message && String(error.message).includes('tagName')) {
          console.warn('Radix global onerror caught tagName error', error)
          return true
        }
      } catch (e) {
        originalConsoleError('Error inside radix global onerror handler:', e)
      }

      if (typeof prevOnError === 'function') {
        // @ts-ignore
        return prevOnError(message, source, lineno, colno, error)
      }
      return false
    }
  } catch (e) {
    originalConsoleError('Failed to install radix onerror handler:', e)
  }
}

/**
 * Safely render Radix components with error handling
 */
export function safeRadixRender<T>(
  component: () => T,
  fallback?: T
): T | null {
  try {
    return component()
  } catch (error: any) {
    if (error && error.message && String(error.message).includes('tagName')) {
      console.warn('Radix component render error caught:', error)
      return fallback || null
    }
    throw error
  }
}