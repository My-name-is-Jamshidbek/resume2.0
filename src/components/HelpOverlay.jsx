import React, { useState, useEffect } from 'react'
import gsap from 'gsap'

export default function HelpOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShownInitial, setHasShownInitial] = useState(() => {
    // Check if help has been shown before
    return localStorage.getItem('help-overlay-shown') === 'true'
  })

  useEffect(() => {
    // Show help overlay initially for 4 seconds on first visit
    console.log('HelpOverlay mount - hasShownInitial:', hasShownInitial)
    if (!hasShownInitial) {
      console.log('Showing help overlay for first time')
      setIsVisible(true)
      const timer = setTimeout(() => {
        console.log('Auto-hiding help overlay')
        setIsVisible(false)
        setHasShownInitial(true)
        localStorage.setItem('help-overlay-shown', 'true')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [hasShownInitial])

  useEffect(() => {
    // Listen for 'h' key to toggle help
    const handleKeyDown = (e) => {
      if (e.key === 'h' || e.key === 'H') {
        setIsVisible(!isVisible)
      }
      if (e.key === 'Escape') {
        setIsVisible(false)
      }
      // Debug: Reset help overlay state with Ctrl+Shift+H
      if (e.ctrlKey && e.shiftKey && (e.key === 'h' || e.key === 'H')) {
        localStorage.removeItem('help-overlay-shown')
        setHasShownInitial(false)
        console.log('Help overlay state reset')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="glass-effect text-slate-300 hover:text-slate-100 px-3 py-2 rounded-lg text-sm transition-all duration-300"
        >
          Press H for help
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="glass-card rounded-2xl p-8 max-w-md mx-4 text-slate-100">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold gradient-text mb-2">Navigation Help</h3>
          <p className="text-slate-300 text-sm">Master the presentation controls</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-emerald-400">Keyboard</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>↑ ↓</span>
                  <span className="text-slate-300">Navigate slides</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Space</span>
                  <span className="text-slate-300">Next slide</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Home</span>
                  <span className="text-slate-300">First slide</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>End</span>
                  <span className="text-slate-300">Last slide</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-cyan-400">Mouse & Touch</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Scroll</span>
                  <span className="text-slate-300">Navigate slides</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Swipe</span>
                  <span className="text-slate-300">Touch navigation</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dots</span>
                  <span className="text-slate-300">Jump to slide</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-600 pt-4">
            <div className="text-xs text-slate-400 space-y-1">
              <div>Press <kbd className="bg-slate-700/50 px-1 rounded">H</kbd> to toggle this help</div>
              <div>Press <kbd className="bg-slate-700/50 px-1 rounded">Esc</kbd> to close</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsVisible(false)}
            className="px-6 py-2 accent-gradient rounded-lg font-medium text-white hover:shadow-lg transition-all duration-300"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
