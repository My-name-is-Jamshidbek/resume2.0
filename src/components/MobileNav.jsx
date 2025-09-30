import React from 'react'

/**
 * Mobile bottom navigation bar for quick slide navigation on touch devices.
 * Appears only on small screens (hidden md+).
 */
export default function MobileNav({ current, total, onPrev, onNext, onJump, sections }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe bg-gray-900/70 backdrop-blur-xl border-t border-gray-700/40">
      <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Prev */}
        <button
          onClick={onPrev}
            aria-label="Previous section"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800/70 text-gray-300 enabled:hover:bg-gray-700/70 transition disabled:opacity-30"
          disabled={current === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Dots / Pills - horizontally scrollable if overflow */}
        <div className="flex-1 overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-center gap-2 px-2 min-w-max">
            {sections.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to ${s.title}`}
                onClick={() => onJump(i)}
                className={`group relative flex items-center transition ${
                  i === current ? 'scale-105' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all ${
                    i === current ? 'w-6' : ''
                  }`}
                ></span>
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-gray-400 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          onClick={onNext}
          aria-label="Next section"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800/70 text-gray-300 enabled:hover:bg-gray-700/70 transition disabled:opacity-30"
          disabled={current === total - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}
