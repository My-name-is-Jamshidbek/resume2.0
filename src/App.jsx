import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import HelpOverlay from './components/HelpOverlay'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef(null)
  const sectionsRef = useRef([])
  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const underlineRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const sections = [
    { 
      id: 'hero', 
      component: Hero, 
      title: 'Welcome',
      subtitle: 'Full-Stack Developer & Creative Technologist'
    },
    { 
      id: 'about', 
      component: About, 
      title: 'About Me',
      subtitle: 'Passionate developer crafting digital experiences'
    },
    { 
      id: 'skills', 
      component: Skills, 
      title: 'Skills & Expertise',
      subtitle: 'Technologies and tools I use to bring ideas to life'
    },
    { 
      id: 'experience', 
      component: Experience, 
      title: 'Experience',
      subtitle: 'My journey through the world of web development'
    },
    { 
      id: 'projects', 
      component: Projects, 
      title: 'Projects',
      subtitle: 'Featured work & creative experiments'
    },
    { 
      id: 'contact', 
      component: Contact, 
      title: 'Contact',
      subtitle: 'Let\'s build something amazing together'
    }
  ]

  // Initialize section positions once
  useEffect(() => {
    sectionsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.set(el, { y: i === 0 ? '0%' : '100%', opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 10 : 1 })
    })
  }, [])

  // Handle header visibility when currentSlide changes
  useEffect(() => {
    if (!headerRef.current) return
    
    if (currentSlide === 0) {
      // Hide header on hero page
      gsap.set(headerRef.current, { opacity: 0, visibility: 'hidden' })
    } else {
      // Show header on other pages
      gsap.set(headerRef.current, { visibility: 'visible' })
    }
  }, [currentSlide])

  // Animate header text when slide changes (between non-hero pages)
  const animateHeaderText = (newSlide) => {
    if (!titleRef.current || !subtitleRef.current) return

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // Exit animation
    tl.to([subtitleRef.current, titleRef.current], {
      opacity: 0,
      y: -15,
      duration: 0.25,
      stagger: 0.05,
      ease: 'power2.in'
    })
    .to(underlineRef.current, { scaleX: 0, duration: 0.2, ease: 'power2.in' }, '<')
    .call(() => setCurrentSlide(newSlide))
    // Prepare new state
    .add(() => {
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 25 })
      gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: 'center center' })
    })
    // Enter animation
    .to(titleRef.current, { opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)' })
    .to(underlineRef.current, { scaleX: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4 }, '-=0.25')
  }

  // Special animation for Hero to About transition
  const animateHeroToAbout = () => {
    if (!headerRef.current || !titleRef.current || !subtitleRef.current) return
    
    // Set initial state for dramatic entrance - completely hidden
    gsap.set(headerRef.current, { 
      opacity: 0, 
      scale: 0.8, 
      y: -50,
      rotationX: -15
    })
    gsap.set([titleRef.current, subtitleRef.current], { 
      opacity: 0, 
      y: 30,
      scale: 0.9 
    })
    
    // Create dramatic entrance timeline
    const tl = gsap.timeline()
    
    // Animate header container with elastic effect
    tl.to(headerRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    // Animate title with bounce
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.4)'
    }, '-=0.4')
    // Animate subtitle with slight delay
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.3')
    // Add subtle glow effect
    .to(headerRef.current, {
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.2')
    .to(headerRef.current, {
      boxShadow: '0 0 15px rgba(59, 130, 246, 0.1)',
      duration: 0.6,
      ease: 'power2.out'
    })
  }

  const goToSlide = (target) => {
    if (target === currentSlide || target < 0 || target >= sections.length || isAnimating) return
    const fromEl = sectionsRef.current[currentSlide]
    const toEl = sectionsRef.current[target]
    if (!fromEl || !toEl) return
    setIsAnimating(true)
    const forward = target > currentSlide
    
    // Determine header animation type
    const fromHero = currentSlide === 0 && target !== 0
    const toHero = currentSlide !== 0 && target === 0
    const betweenPages = currentSlide !== 0 && target !== 0
    
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentSlide(target)
        setIsAnimating(false)
        // notify components
        window.dispatchEvent(new CustomEvent('slideEnter', { detail: { index: target, id: sections[target].id } }))
      }
    })
    
    // Handle header animations
    if (fromHero) {
      // Coming from hero - header will appear after slide change
      tl.call(() => setCurrentSlide(target), 0.4)
        .fromTo(headerRef.current, 
          { opacity: 0, y: -30, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
          0.5
        )
    } else if (toHero) {
      // Going to hero - animate header out first
      if (headerRef.current) {
        tl.to(headerRef.current, {
          opacity: 0,
          y: -30,
          scale: 0.9,
          duration: 0.4,
          ease: 'power2.in'
        }, 0)
      }
    } else if (betweenPages) {
      // Between non-hero pages - animate text change
      tl.add(() => animateHeaderText(target), 0.15)
    }
    
    // Main slide transition
    tl.set(toEl, { y: forward ? '100%' : '-100%', opacity: 1, zIndex: 20 })
      .to(toEl, { y: '0%', duration: 0.8, ease: 'power2.inOut' })
      .to(fromEl, { y: forward ? '-100%' : '100%', duration: 0.8, ease: 'power2.inOut' }, '<')
      .set(fromEl, { opacity: 0, zIndex: 1 })
      .set(toEl, { zIndex: 10 })
  }

  // Input handlers
  useEffect(() => {
    let touchStartY = 0

    const wheelHandler = (e) => {
      const scrollContainer = e.target.closest('.slide-scroll')
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer
        const atTop = scrollTop <= 0
        const atBottom = scrollTop + clientHeight >= scrollHeight - 1
        // Allow internal scroll if not at boundary
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          return // let native scroll happen
        }
      }
      e.preventDefault()
      if (isAnimating) return
      const dir = e.deltaY > 0 ? 1 : -1
      goToSlide(currentSlide + dir)
    }
    const keyHandler = (e) => {
      if (isAnimating) return
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // space forward
          e.preventDefault(); goToSlide(currentSlide + 1); break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault(); goToSlide(currentSlide - 1); break
        case 'Home':
          e.preventDefault(); goToSlide(0); break
        case 'End':
          e.preventDefault(); goToSlide(sections.length - 1); break
        default: break
      }
    }
    const touchStart = (e) => { touchStartY = e.changedTouches[0].screenY }
    const touchEnd = (e) => {
      if (isAnimating) return
      const dy = touchStartY - e.changedTouches[0].screenY
      if (Math.abs(dy) > 50) {
        goToSlide(currentSlide + (dy > 0 ? 1 : -1))
      }
    }

    window.addEventListener('wheel', wheelHandler, { passive: false })
    window.addEventListener('keydown', keyHandler)
    window.addEventListener('touchstart', touchStart, { passive: true })
    window.addEventListener('touchend', touchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', wheelHandler)
      window.removeEventListener('keydown', keyHandler)
      window.removeEventListener('touchstart', touchStart)
      window.removeEventListener('touchend', touchEnd)
    }
  }, [currentSlide, isAnimating, sections.length])

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Global Pinned Header - stays stationary, only text changes - Hidden on Hero page */}
      {currentSlide !== 0 && (
        <div ref={headerRef} className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="glass-effect bg-gray-900/80 backdrop-blur-lg rounded-2xl px-8 py-4 border border-gray-700/50 shadow-2xl">
            <div className="text-center">
              <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-2">
                <span className="gradient-text">{sections[currentSlide]?.title}</span>
              </h2>
              <div ref={underlineRef} className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-2 scale-x-100"></div>
              <p ref={subtitleRef} className="text-lg text-gray-300 max-w-xl mx-auto">
                {sections[currentSlide]?.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {sections.map((s, i) => {
        const C = s.component
        return (
          <div
            key={s.id}
            ref={el => sectionsRef.current[i] = el}
            className="fixed inset-0 w-full h-full"
          >
            <div className="slide-scroll w-full h-full overflow-y-auto overscroll-contain">
              <C slideIndex={i} />
            </div>
          </div>
        )
      })}

      {/* Simple slide indicator (optional) */}
      <div className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full glass-effect text-xs tracking-wide">
        {currentSlide + 1} / {sections.length}
      </div>

      <HelpOverlay />
    </div>
  )
}

export default App
