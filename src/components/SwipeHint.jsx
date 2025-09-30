import React, { useEffect, useState } from 'react'

/**
 * Displays a small swipe hint for first-time mobile users.
 * Persists dismissal in localStorage.
 */
export default function SwipeHint() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show on touch devices & small screens
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (!isTouch || window.innerWidth >= 768) return
    const dismissed = localStorage.getItem('swipe-hint-dismissed')
    if (!dismissed) {
      setTimeout(() => setVisible(true), 1200)
      // Auto-hide after 8s
      setTimeout(() => setVisible(false), 9000)
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    localStorage.setItem('swipe-hint-dismissed', '1')
  }

  if (!visible) return null
  return (
    <div className="md:hidden fixed left-1/2 -translate-x-1/2 bottom-24 z-40">
      <div className="relative group select-none" onClick={dismiss} role="status" aria-label="Swipe up or down to navigate">
        <div className="px-4 py-2 rounded-full glass-effect backdrop-blur-xl border border-gray-700/60 shadow-lg flex items-center gap-2 text-xs text-gray-200 animate-fade-in-up">
          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-4 4m4-4l4 4" /></svg>
          <span className="font-medium tracking-wide">Swipe up / down</span>
          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m0 0l4-4m-4 4l-4-4" /></svg>
          <button aria-label="Dismiss" className="ml-1 text-gray-400 hover:text-gray-200 transition" onClick={dismiss}>
            ×
          </button>
        </div>
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl opacity-70 group-hover:opacity-100 transition" />
      </div>
    </div>
  )
}
