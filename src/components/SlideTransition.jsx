import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SlideTransition({ isTransitioning, direction }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isTransitioning && overlayRef.current) {
      const tl = gsap.timeline()
      
      // Create slide transition effect
      tl.set(overlayRef.current, {
        scaleX: 0,
        transformOrigin: direction === 'down' ? 'left center' : 'right center'
      })
      .to(overlayRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.inOut"
      })
      .to(overlayRef.current, {
        scaleX: 0,
        transformOrigin: direction === 'down' ? 'right center' : 'left center',
        duration: 0.4,
        ease: "power2.inOut"
      })
    }
  }, [isTransitioning, direction])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-gradient-to-r from-blue-600 to-purple-600 z-40 pointer-events-none"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}
