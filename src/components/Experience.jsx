import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const experiences = [
  {
    period: '2021 - 2022',
    title: 'Junior Backend Developer',
    company: 'AMUSOFT LTD',
    description: 'Developed robust backend services using Django framework. Focused on API development, database design, and server-side functionality for various client projects.',
    achievements: [
      'Built 5+ Django REST APIs',
      'Optimized database queries',
      'Implemented authentication systems'
    ],
    tech: ['Django', 'Python', 'PostgreSQL', 'REST APIs']
  },
  {
    period: '2022 - 2023',
    title: 'Web & IoT Developer',
    company: 'CITRON R&D Lab',
    description: 'Worked on cutting-edge web and IoT projects focusing on smart home sensor integration. Designed embedded systems and connected device solutions.',
    achievements: [
      'Developed smart home sensor systems',
      'Built IoT communication protocols',
      'Designed connected device architectures'
    ],
    tech: ['C++', 'Arduino', 'Raspberry Pi', 'Django', 'MQTT']
  },
  {
    period: '2023 - 2024',
    title: 'Backend Developer',
    company: 'UBTUIT (University)',
    description: 'Developed web applications and backend services using Laravel and Django. Collaborated with university departments to create institutional web solutions.',
    achievements: [
      'Built 3+ web applications',
      'Implemented university management systems',
      'Mentored junior developers'
    ],
    tech: ['Laravel', 'Django', 'PHP', 'Python', 'MySQL']
  },
  {
    period: '2024 - 2026',
    title: 'Mobile Developer',
    company: 'AMUSOFT LTD',
    description: 'Specialized in mobile app development across iOS and Android platforms. Built 3 production Kotlin apps and 2 Flutter applications with focus on performance and UX.',
    achievements: [
      'Shipped 3 Kotlin Android apps',
      'Developed 2 cross-platform Flutter apps',
      'Improved app ratings to 4.7+ stars'
    ],
    tech: ['Kotlin', 'Flutter', 'Java', 'Firebase', 'Android Studio']
  },
  {
    period: '2025 - Present',
    title: 'Team Lead & Mobile Developer',
    company: 'RANCH University',
    description: 'Leading IT laboratory team and developing university projects. Architecting and implementing comprehensive solutions across web, Android, and iOS platforms.',
    achievements: [
      'Leading team of developers',
      'Delivered 4 major projects',
      'Mentoring junior developers'
    ],
    tech: ['Kotlin', 'Flutter', 'Laravel', 'Django', 'Firebase'],
    isCurrent: true
  }
]

const Experience = ({ slideIndex }) => {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const experienceItemRefs = useRef([])
  const autoScrollIntervalRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [direction, setDirection] = useState('down')
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(100) // reserved for future UI ring

  // Entrance / reveal animations with reduced motion support
  useLayoutEffect(() => {
    const container = sectionRef.current
    if (!container) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = () => {
      let ctx = gsap.context(() => {
        if (!reduceMotion) {
          gsap.set('.timeline-line', { scaleY: 0 })
          gsap.set('.timeline-item', { opacity: 0 })
            gsap.set('.timeline-dot', { scale: 0 })
          gsap.set('.tech-badge', { opacity: 0, scale: 0.8 })
          const tl = gsap.timeline()
          tl.to('.timeline-line', { scaleY: 1, duration: 1.1, ease: 'power3.inOut' })
          tl.to(gsap.utils.toArray('.timeline-item'), { opacity: 1, stagger: 0.18, duration: 0.55, ease: 'power2.out' }, '-=0.8')
          tl.to(gsap.utils.toArray('.timeline-dot'), { scale: 1, stagger: 0.14, duration: 0.45, ease: 'back.out(1.7)' }, '-=0.9')
          tl.to(gsap.utils.toArray('.tech-badge'), { opacity: 1, scale: 1, stagger: 0.012, duration: 0.25, ease: 'power1.out' }, '-=0.35')
        } else {
          gsap.set(['.timeline-line','.timeline-item','.timeline-dot','.tech-badge'], { opacity: 1, scale: 1, clearProps: 'all' })
        }
      }, sectionRef)
      return ctx
    }
    let ctx = run()
    const handler = (e) => { if (e.detail.index === slideIndex) { ctx.revert(); setTimeout(() => { ctx = run() }, 30) } }
    window.addEventListener('slideEnter', handler)
    return () => { window.removeEventListener('slideEnter', handler); ctx && ctx.revert() }
  }, [slideIndex])

  // Scroll to a specific experience item
  const scrollToItem = (index) => {
    if (!experienceItemRefs.current[index]) return
    const itemEl = experienceItemRefs.current[index]
    const container = sectionRef.current?.querySelector('.h-full')
    if (!container) return
    const offset = 80
    const scrollTarget = itemEl.offsetTop - offset
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    gsap.to(container, {
      scrollTo: { y: scrollTarget, autoKill: false },
      duration: reduceMotion ? 0 : 0.8,
      ease: 'power2.inOut',
      onComplete: () => setActiveItemIndex(index)
    })
    // highlight changes
    gsap.to(experienceItemRefs.current, { opacity: 0.7, scale: 0.98, duration: 0.35 })
    gsap.to(experienceItemRefs.current[index], { opacity: 1, scale: 1, duration: 0.35 })
    setProgress(100)
    setActiveItemIndex(index)
  }

  // Auto-scroll logic
  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current)
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
    setProgress(100)
    const intervalDuration = 5000
    const updateFrequency = 50
    const decrementAmount = (updateFrequency / intervalDuration) * 100
    progressIntervalRef.current = setInterval(() => {
      if (!isPaused) setProgress(p => Math.max(p - decrementAmount, 0))
    }, updateFrequency)
    autoScrollIntervalRef.current = setInterval(() => {
      if (isPaused) return
      setProgress(100)
      let next = activeItemIndex
      if (direction === 'down') {
        if (next < experiences.length - 1) next++
        else { setDirection('up'); next-- }
      } else {
        if (next > 0) next--
        else { setDirection('down'); next++ }
      }
      scrollToItem(next)
    }, intervalDuration)
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)
    const init = setTimeout(() => { scrollToItem(0); startAutoScroll() }, 400)
    return () => { clearTimeout(init); if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current); if (progressIntervalRef.current) clearInterval(progressIntervalRef.current) }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.detail.index === slideIndex) setTimeout(() => startAutoScroll(), 400) }
    window.addEventListener('slideEnter', handler)
    if (slideIndex !== undefined) startAutoScroll()
    return () => window.removeEventListener('slideEnter', handler)
  }, [direction, slideIndex, isPaused])

  const handleMouseEnter = () => {}
  const handleMouseLeave = () => {}

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full h-full text-white/90 backdrop-blur-[2px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full overflow-y-auto">
        <div className="container-custom px-4 sm:px-6 py-10 max-w-5xl mx-auto">
          <div className="pt-24 mb-8 md:mb-10" />
          <div ref={timelineRef} className="relative mx-auto max-w-4xl px-1">
            <div className="absolute md:left-1/2 left-4 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-700">
              <div className="timeline-line h-full w-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 origin-top" />
            </div>
            <div className="relative z-10">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  ref={el => experienceItemRefs.current[index] = el}
                  className={`timeline-item mb-12 md:mb-16 transition-all duration-300 pl-14 md:pl-0 ${activeItemIndex === index ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}
                >
                  <div className={`flex items-start ${index % 2 === 0 ? 'md:flex-row flex-col' : 'md:flex-row-reverse flex-col'}`}>
                    <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                      <div className={`glass-effect rounded-xl md:rounded-2xl p-5 md:p-6 hover:bg-white/10 transition-all duration-300 group relative ${index % 2 === 0 ? 'md:border-r-4' : 'md:border-l-4'} ${exp.isCurrent ? 'border-emerald-500/70 bg-gradient-to-br from-slate-800/80 to-emerald-900/20' : 'border-blue-500/70'} shadow-xl`}>
                        <div className="absolute md:hidden -left-10 top-6 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                        <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${exp.isCurrent ? 'text-emerald-400 bg-emerald-400/20 font-semibold' : 'text-blue-400 bg-blue-400/10'}`}>
                            {exp.period}{exp.isCurrent && ' • Current'}
                          </span>
                        </div>
                        <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 ${exp.isCurrent ? 'text-emerald-300' : 'group-hover:text-blue-400'}`}>{exp.title}</h3>
                        <h4 className="text-lg font-medium text-purple-400 mb-3">{exp.company}</h4>
                        <p className="text-gray-300 mb-4 leading-relaxed text-sm md:text-base">{exp.description}</p>
                        <div className="mb-4">
                          <h5 className="text-sm font-semibold text-gray-200 mb-2">Key Achievements:</h5>
                          <ul className="space-y-1">
                            {exp.achievements.map((ach, idx) => (
                              <li key={idx} className={`text-sm text-gray-400 flex items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>{index % 2 === 0 && ach}<div className={`w-1.5 h-1.5 bg-green-500 rounded-full ${index % 2 === 0 ? 'ml-2' : 'mr-2'}`} />{index % 2 !== 0 && ach}</li>
                            ))}
                          </ul>
                        </div>
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
                          {exp.tech.map((tech, idx) => (
                            <span key={idx} className="tech-badge text-[10px] md:text-xs font-medium bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md hover:bg-gray-600/50 transition-colors">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="md:w-[10%] md:flex md:flex-col md:items-center relative">
                      <div className={`timeline-dot w-6 h-6 md:w-7 md:h-7 rounded-full border-4 border-gray-900 z-10 mt-4 md:mt-6 flex items-center justify-center md:static absolute -left-0 top-6 -ml-3 md:ml-0 ${exp.isCurrent ? 'animate-pulse' : ''}`}
                        style={{ background: exp.isCurrent ? 'linear-gradient(to right, #10b981, #059669)' : 'linear-gradient(to right, #3b82f6, #8b5cf6)', boxShadow: exp.isCurrent ? '0 0 12px rgba(16, 185, 129, 0.7)' : 'none' }}>
                        <span className="text-white font-bold text-[10px] md:text-xs">{index + 1}</span>
                      </div>
                    </div>
                    <div className="hidden md:block w-[45%]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-effect bg-gray-900/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50 shadow-2xl">
          <div className="flex justify-center items-center gap-4">
            <button onClick={() => scrollToItem(activeItemIndex > 0 ? activeItemIndex - 1 : experiences.length - 1)} className="bg-gray-800/50 hover:bg-gray-700/70 p-2 rounded-full transition-colors" title="Previous">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={() => setIsPaused(!isPaused)} className={`bg-gray-800/50 hover:bg-gray-700/70 p-2 rounded-full transition-colors ${isPaused ? 'text-blue-400' : 'text-gray-300'}`} title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}>
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
            </button>
            <button onClick={() => scrollToItem(activeItemIndex < experiences.length - 1 ? activeItemIndex + 1 : 0)} className="bg-gray-800/50 hover:bg-gray-700/70 p-2 rounded-full transition-colors" title="Next">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience