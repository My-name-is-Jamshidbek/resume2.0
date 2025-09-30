import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function SlideNavigation({ sections, currentSlide, onNavigate, isScrolling }) {
  const navRef = useRef(null)

  useEffect(() => {
    // Animate navigation dots
    gsap.fromTo('.nav-dot',
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: "back.out(1.7)",
        delay: 1 
      }
    )
  }, [])

  useEffect(() => {
    // Update active dot animation
    gsap.to('.nav-dot', {
      scale: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      duration: 0.3
    })
    
    gsap.to(`.nav-dot[data-index="${currentSlide}"]`, {
      scale: 1.2,
      backgroundColor: '#3b82f6',
      duration: 0.3,
      ease: "back.out(1.7)"
    })
  }, [currentSlide])

  return (
    <nav 
      ref={navRef}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col space-y-4"
    >
      {sections.map((section, index) => (
        <div key={section.id} className="relative group">
          <button
            onClick={() => !isScrolling && onNavigate(index)}
            className={`nav-dot w-3 h-3 rounded-full border-2 border-white/30 transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-blue-500 border-blue-500 scale-110' 
                : 'bg-white/20 hover:bg-white/40'
            } ${isScrolling ? 'pointer-events-none' : ''}`}
            data-index={index}
            aria-label={`Go to ${section.title} section`}
            disabled={isScrolling}
          />
          
          {/* Tooltip */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
            {section.title}
            <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/80 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
          </div>
        </div>
      ))}
      
      {/* Navigation instructions */}
      <div className="mt-8 text-center">
        <div className="text-white/60 text-xs space-y-1">
          <div>↑↓ Arrow keys</div>
          <div>Mouse wheel</div>
          <div>Touch swipe</div>
        </div>
      </div>
    </nav>
  )
}
