import { useRef, useLayoutEffect, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default function Experience({ slideIndex }) {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  var [activeItemIndex, setActiveItemIndex] = useState(0)
  const [direction, setDirection] = useState('down')
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(100)
  const autoScrollIntervalRef = useRef(null)
  const progressIntervalRef = useRef(null)
  const experienceItemRefs = useRef([])

  const experiences = [
    {
      period: '2019 - 2020',
      title: 'Junior Web Developer',
      company: 'StartUp Hub',
      description: 'Started career building basic websites and learning modern development practices. Gained experience with version control and agile methodologies.',
      achievements: [
        'Built 10+ static websites',
        'Learned React and modern JavaScript',
        'Collaborated in agile development teams'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Git'],
      isCurrent: false
    },
    {
      period: '2020 - 2021',
      title: 'Frontend Developer',
      company: 'Creative Studio',
      description: 'Specialized in frontend development with focus on user experience and interactive animations. Worked closely with designers to bring creative visions to life.',
      achievements: [
        'Created interactive portfolio websites',
        'Mastered GSAP and CSS animations',
        'Improved user engagement by 60%'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'jQuery'],
      isCurrent: false
    },
    {
      period: '2021 - 2023',
      title: 'Full Stack Developer',
      company: 'Digital Solutions LLC',
      description: 'Developed responsive web applications and RESTful APIs. Collaborated with design teams to create engaging user interfaces with smooth animations.',
      achievements: [
        'Built 20+ responsive web applications',
        'Reduced loading times by 35%',
        'Implemented modern CSS animations'
      ],
      tech: ['React', 'Express.js', 'MongoDB', 'CSS3', 'JavaScript'],
      isCurrent: false
    },
    {
      period: '2023 - Present',
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and implementing modern animation techniques.',
      achievements: [
        'Improved application performance by 40%',
        'Led team of 5 developers',
        'Implemented GSAP animations across 15+ projects'
      ],
      tech: ['React', 'Node.js', 'AWS', 'GSAP', 'TypeScript'],
      isCurrent: true
    }
  ]

  useLayoutEffect(() => {
    // Clear any existing ScrollTrigger instances to prevent conflicts
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const run = () => {
      let ctx = gsap.context(() => {
        // Initial state setup - ensure everything is visible but ready for animation
        gsap.set('.timeline-line', { scaleY: 0 });
        gsap.set('.timeline-item', { opacity: 0 });
        gsap.set('.timeline-dot', { scale: 0 });
        gsap.set('.tech-badge', { opacity: 0, scale: 0.8 });
        
        // Timeline animation
        const tl = gsap.timeline();
        
        // Animate the main timeline line
        tl.to('.timeline-line', {
          scaleY: 1,
          duration: 1.8,
          ease: 'power3.inOut',
        });

        // Animate timeline items - from oldest to newest
        const timelineItems = gsap.utils.toArray('.timeline-item');
        tl.to(timelineItems, {
          opacity: 1,
          stagger: 0.3, // Longer stagger for more sequential effect
          duration: 0.7,
          ease: 'power2.out',
          onComplete: () => {
            // Add special animation for current job
            gsap.to('.timeline-item:last-child', {
              keyframes: [
                { scale: 1.02, duration: 0.3 },
                { scale: 1, duration: 0.2 }
              ],
              ease: 'power2.inOut'
            });
          }
        }, "-=1");

        // Animate timeline dots
        const timelineDots = gsap.utils.toArray('.timeline-dot');
        tl.to(timelineDots, {
          scale: 1,
          stagger: 0.2,
          duration: 0.5,
          ease: 'back.out(1.7)',
        }, "-=1.5");

        // Animate tech badges
        const techBadges = gsap.utils.toArray('.tech-badge');
        tl.to(techBadges, {
          opacity: 1,
          scale: 1,
          stagger: 0.02,
          duration: 0.3,
          ease: 'power1.out',
        }, "-=0.5");

      }, sectionRef);
      return ctx;
    };

    // Run animations immediately when component mounts
    let ctx = run();
    
    // Re-run animations when this slide becomes active
    const handler = (e) => {
      if (e.detail.index === slideIndex) { 
        if (ctx) {
          ctx.revert();
        }
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          ctx = run();
        }, 50);
      }
    };
    
    window.addEventListener('slideEnter', handler);
    return () => { 
      window.removeEventListener('slideEnter', handler);
      if (ctx) {
        ctx.revert();
      }
    };
  }, [slideIndex]);

  // Auto-scrolling functionality
  const scrollToItem = (index) => {
    if (!experienceItemRefs.current[index]) return;
    
    const itemEl = experienceItemRefs.current[index];
    const offset = 80; // Offset from the top of the viewport
    
    // Use more direct scroll approach
    const container = sectionRef.current.querySelector('.h-full');
    const scrollTarget = itemEl.offsetTop - offset;
    
    gsap.to(container, {
      scrollTo: {
        y: scrollTarget,
        autoKill: false
      },
      duration: 1, // Slightly faster for 2-second interval
      ease: "power2.inOut",
      onComplete: () => {
        // Ensure active item is set after scroll
        setActiveItemIndex(index);
      }
    });

    // Apply visual changes immediately
    // Highlight the current item
    gsap.to(experienceItemRefs.current, {
      opacity: 0.7,
      scale: 0.98,
      duration: 0.4
    });
    
    gsap.to(experienceItemRefs.current[index], {
      opacity: 1,
      scale: 1,
      duration: 0.4
    });

    // Reset progress when manually scrolling
    setProgress(100);
    setActiveItemIndex(index);
    
    // Log for debugging
    // index++;
    // if (index >= experiences.length) index = 0;
    console.log(`Scrolling to item ${index}, target: ${scrollTarget}px`);
  };

  const startAutoScroll = () => {
    // Clear any existing intervals
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Reset progress
    setProgress(100);
    
    // Create a new interval for the countdown timer
    const intervalDuration = 5000; // 2 seconds
    const updateFrequency = 50; // Update progress every 50ms for smoothness
    const decrementAmount = (updateFrequency / intervalDuration) * 100;
    
    progressIntervalRef.current = setInterval(() => {
      if (!isPaused) {
        setProgress((prevProgress) => {
          const newProgress = Math.max(prevProgress - decrementAmount, 0);
          return newProgress;
        });
      }
    }, updateFrequency);
    
    // Main auto-scroll interval
    autoScrollIntervalRef.current = setInterval(() => {
      if (isPaused) return;
      
      // Reset progress for next interval
      setProgress(100);
      
      if (direction === 'down') {
        if (activeItemIndex < experiences.length - 1) {
          activeItemIndex++;
          scrollToItem(activeItemIndex);
        } else {
          // Reached the bottom, change direction
          setDirection('up');
          activeItemIndex--;
          scrollToItem(activeItemIndex);
        }
      } else { // direction === 'up'
        if (activeItemIndex > 0) {
          activeItemIndex--;
          scrollToItem(activeItemIndex);
        } else {
          // Reached the top, change direction
          setDirection('down');
          activeItemIndex++;
          scrollToItem(activeItemIndex);
        }
      }
    }, intervalDuration); // 2 second interval
  };

  useEffect(() => {
    // Register ScrollToPlugin directly
    gsap.registerPlugin(ScrollToPlugin);
      
    // Initialize scroll position with a slight delay to ensure DOM is ready
    setTimeout(() => {
      scrollToItem(0);
      
      // Start auto-scrolling
      startAutoScroll();
    }, 500);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Update auto-scrolling when direction changes, if slide changes, or pause state changes
  useEffect(() => {
    // Only start auto-scroll if we're on this slide
    const slideEnterHandler = (e) => {
      if (e.detail.index === slideIndex) {
        setTimeout(() => {
          startAutoScroll();
        }, 500);
      }
    };
    
    window.addEventListener('slideEnter', slideEnterHandler);
    
    // Initial start if this is the active slide
    if (slideIndex !== undefined) {
      startAutoScroll();
    }
    
    return () => {
      window.removeEventListener('slideEnter', slideEnterHandler);
    };
  }, [direction, slideIndex, isPaused]);

  // Handle mouse interaction
  const handleMouseEnter = () => {
    // Pause only when user is actively interacting with the timeline
    // We'll let the manual control buttons handle this instead
    // setIsPaused(true);
  };

  const handleMouseLeave = () => {
    // Auto-resume if mouse leaves the section
    // We'll let the manual control buttons handle this instead
    // setIsPaused(false);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-full text-white/90 backdrop-blur-[2px]"
      id="experience"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full overflow-y-auto">
        <div className="container-custom px-6 py-10 max-w-5xl mx-auto">
          {/* Add top padding to account for pinned header */}
          <div className="pt-24 mb-10"></div>

          {/* Timeline container */}
          <div ref={timelineRef} className="relative mx-auto max-w-4xl">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-700">
              <div className="timeline-line h-full w-full bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 origin-top"></div>
            </div>

            {/* Timeline content */}
            <div className="relative z-10">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  ref={el => experienceItemRefs.current[index] = el}
                  className={`timeline-item mb-16 transition-all duration-300 ${
                    activeItemIndex === index ? 'opacity-100 scale-100' : 'opacity-70 scale-98'
                  }`}
                >
                  <div className={`flex items-start ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Left column */}
                    <div className={`w-[45%] ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className={`glass-effect rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group
                        ${index % 2 === 0 ? 'border-r-4' : 'border-l-4'} 
                        ${exp.isCurrent 
                          ? 'border-emerald-500/70 bg-gradient-to-br from-slate-800/80 to-emerald-900/20' 
                          : 'border-blue-500/70'} 
                        shadow-xl`}
                      >
                        <div className={`flex items-center mb-4 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                          <span className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                            exp.isCurrent 
                              ? 'text-emerald-400 bg-emerald-400/20 font-semibold' 
                              : 'text-blue-400 bg-blue-400/10'
                          }`}>
                            {exp.period}
                            {exp.isCurrent && ' • Current'}
                          </span>
                        </div>
                        
                        <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                          exp.isCurrent 
                            ? 'text-emerald-300' 
                            : 'group-hover:text-blue-400'
                        }`}>
                          {exp.title}
                        </h3>
                        
                        <h4 className="text-lg font-medium text-purple-400 mb-3">
                          {exp.company}
                        </h4>
                        
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {exp.description}
                        </p>
                        
                        <div className="mb-4">
                          <h5 className="text-sm font-semibold text-gray-200 mb-2">Key Achievements:</h5>
                          <ul className="space-y-1">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className={`text-sm text-gray-400 flex items-center ${
                                index % 2 === 0 ? 'justify-end' : 'justify-start'
                              }`}>
                                {index % 2 === 0 && achievement}
                                <div className={`w-1.5 h-1.5 bg-green-500 rounded-full ${
                                  index % 2 === 0 ? 'ml-2' : 'mr-2'
                                }`}></div>
                                {index % 2 !== 0 && achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                          {exp.tech.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="tech-badge text-xs font-medium bg-gray-700/50 text-gray-300 px-2 py-1 rounded-md hover:bg-gray-600/50 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Center dot and number */}
                    <div className="w-[10%] flex flex-col items-center relative">
                      <div className={`timeline-dot w-7 h-7 rounded-full border-4 border-gray-900 z-10 mt-6 flex items-center justify-center
                        ${exp.isCurrent ? 'animate-pulse' : ''}`}
                        style={{
                          background: exp.isCurrent 
                            ? `linear-gradient(to right, #10b981, #059669)`
                            : `linear-gradient(to right, #3b82f6, #8b5cf6)`,
                          boxShadow: exp.isCurrent ? '0 0 12px rgba(16, 185, 129, 0.7)' : 'none'
                        }}
                      >
                        <span className="text-white font-bold text-xs">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                    
                    {/* Right column */}
                    <div className={`w-[45%] ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
                      {/* Empty space for alternating layout */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pinned Auto-scroll Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="glass-effect bg-gray-900/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50 shadow-2xl">
          {/* Auto-scroll controls */}
          <div className="flex justify-center items-center gap-4">
            <button 
              onClick={() => {
                if (activeItemIndex > 0) {
                  scrollToItem(activeItemIndex - 1);
                } else {
                  scrollToItem(experiences.length - 1); // Go to last item
                }
              }}
              className="bg-gray-800/50 hover:bg-gray-700/70 p-2 rounded-full transition-colors"
              title="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={() => setIsPaused(!isPaused)}
              className={`bg-gray-800/50 hover:bg-gray-700/70 p-2 rounded-full transition-colors ${
                isPaused ? 'text-blue-400' : 'text-gray-300'
              }`}
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>

            <button 
              onClick={() => {
                if (activeItemIndex < experiences.length - 1) {
                  scrollToItem(activeItemIndex + 1);
                } else {
                  scrollToItem(0); // Go to first item
                }
              }}
              className="bg-gray-800/50 hover:bg-gray-700/70 p-2 rounded-full transition-colors"
              title="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}