/**
 * DOM utility functions with safe element access
 */

/**
 * Safely get the tag name of an element
 * @param element - The DOM element
 * @returns The lowercase tag name or null if element is invalid
 */
export function safeGetTagName(element: Element | null | undefined): string | null {
  if (!element) {
    return null
  }
  
  // More comprehensive tagName checks
  if (!('tagName' in element)) {
    return null
  }
  
  if (element.tagName === undefined || element.tagName === null) {
    return null
  }
  
  if (typeof element.tagName !== 'string') {
    return null
  }

  try {
    return element.tagName.toLowerCase()
  } catch (error) {
    console.warn('Error accessing element.tagName:', error)
    return null
  }
}

/**
 * Safely check if an element has a specific tag name
 * @param element - The DOM element
 * @param tagName - The tag name to check (case insensitive)
 * @returns True if the element has the specified tag name
 */
export function hasTagName(element: Element | null | undefined, tagName: string): boolean {
  const elementTagName = safeGetTagName(element)
  return elementTagName === tagName.toLowerCase()
}

/**
 * Safely access element properties with null checks
 * @param element - The DOM element
 * @param callback - Function to execute with the element
 * @returns The result of the callback or null if element is invalid
 */
export function safeElementAccess<T>(
  element: Element | null | undefined,
  callback: (element: Element) => T
): T | null {
  if (!element) {
    return null
  }

  try {
    return callback(element)
  } catch (error) {
    console.warn('Error accessing element:', error)
    return null
  }
}

/**
 * Global error handler for DOM-related errors
 */
export function setupDOMErrorHandler(): void {
  // Add global error handler for unhandled DOM errors
  window.addEventListener('error', (event) => {
    try {
      if (event.error && event.error.message &&
          event.error.message.includes('tagName') &&
          event.error.message.includes('undefined')) {
        console.warn('DOM tagName error caught and handled:', event.error)
        event.preventDefault() // Prevent the error from propagating
      }
    } catch (e) {
      // swallow any handler errors
      console.warn('Error in DOM error handler:', e)
    }
  })

  // Add unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    try {
      const reason = (event && (event.reason || event)) as any
      if (reason && reason.message &&
          reason.message.includes('tagName') &&
          reason.message.includes('undefined')) {
        console.warn('DOM tagName promise rejection caught and handled:', reason)
        event.preventDefault && event.preventDefault() // Prevent the error from propagating
      }
    } catch (e) {
      console.warn('Error in unhandledrejection handler:', e)
    }
  })

  // Also set legacy window.onerror and onunhandledrejection fallbacks
  try {
    const prevOnError = window.onerror
    // @ts-ignore - assign to global
    window.onerror = function(message, source, lineno, colno, error) {
      try {
        if (error && error.message && String(error.message).includes('tagName')) {
          console.warn('Global onerror caught tagName error', error)
          return true // Suppress default handling
        }
      } catch (e) {
        console.warn('Error inside global onerror handler:', e)
      }

      if (typeof prevOnError === 'function') {
        // @ts-ignore
        return prevOnError(message, source, lineno, colno, error)
      }
      return false
    }

    const prevUnhandled = (window as any).onunhandledrejection
    // @ts-ignore
    window.onunhandledrejection = function(event) {
      try {
        const reason = event && (event.reason || event)
        if (reason && reason.message && String(reason.message).includes('tagName')) {
          console.warn('Global onunhandledrejection caught tagName error', reason)
          event.preventDefault && event.preventDefault()
          return true
        }
      } catch (e) {
        console.warn('Error inside global onunhandledrejection handler:', e)
      }

      if (typeof prevUnhandled === 'function') {
        return prevUnhandled(event)
      }
      return false
    }
  } catch (e) {
    console.warn('Failed to install legacy error handlers:', e)
  }
}