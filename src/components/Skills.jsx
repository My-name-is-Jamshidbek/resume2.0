import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Skills({ slideIndex }) {
  const sectionRef = useRef(null)
  const skillsRef = useRef(null)

  const skills = [
    { name: 'JavaScript', level: 95, color: 'from-yellow-400 to-orange-500' },
    { name: 'React', level: 90, color: 'from-blue-400 to-blue-600' },
    { name: 'Node.js', level: 85, color: 'from-green-400 to-green-600' },
    { name: 'TypeScript', level: 80, color: 'from-blue-500 to-indigo-600' },
    { name: 'GSAP', level: 88, color: 'from-purple-400 to-purple-600' },
    { name: 'MongoDB', level: 82, color: 'from-green-500 to-teal-600' },
    { name: 'Express.js', level: 87, color: 'from-gray-600 to-gray-800' },
    { name: 'Next.js', level: 85, color: 'from-black to-gray-700' },
  ]

  const tools = [
    'VS Code', 'Git', 'Docker', 'AWS', 'Figma', 'Photoshop', 'Webpack', 'Vite'
  ]

  useLayoutEffect(() => {
    const run = () => {
      let ctx = gsap.context(() => {
      // Animate skill bars
      const skillBars = gsap.utils.toArray('.skill-bar')
      skillBars.forEach((bar, index) => {
        const level = skills[index].level
        gsap.fromTo(bar, 
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: bar,
              start: "top 80%"
            }
          }
        )
      })

      // Animate skill items
      gsap.fromTo('.skill-item',
        {
          opacity: 0,
          y: 50,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 70%"
          }
        }
      )

      // Animate tools
      gsap.fromTo('.tool-item',
        {
          opacity: 0,
          rotationY: 90
        },
        {
          opacity: 1,
          rotationY: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.tools-grid',
            start: "top 80%"
          }
        }
      )
      }, sectionRef)
      return ctx
    }
    let ctx = run()
    const handler = (e) => {
      if (e.detail.index === slideIndex) {
        ctx.revert()
        ctx = run()
      }
    }
    window.addEventListener('slideEnter', handler)
    return () => { window.removeEventListener('slideEnter', handler); ctx.revert() }
  }, [slideIndex])

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-full text-white/90 backdrop-blur-[2px]"
      id="skills"
    >
      <div className="h-full overflow-y-auto">
        <div className="container-custom px-6 py-10 max-w-7xl mx-auto">
          {/* Add top padding to account for pinned header */}
          <div className="pt-24 mb-10"></div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Technical Skills */}
          <div ref={skillsRef}>
            <h3 className="text-3xl font-bold mb-8">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`skill-bar absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      style={{ width: '0%' }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div>
            <h3 className="text-3xl font-bold mb-8">Tools & Technologies</h3>
            <div className="tools-grid grid grid-cols-4 gap-4 mb-8">
              {tools.map((tool, index) => (
                <div 
                  key={tool} 
                  className="tool-item glass-effect rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">{tool.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <p className="text-sm font-medium">{tool}</p>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="glass-effect rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 gradient-text">What I Bring</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Clean, maintainable, and scalable code
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  Performance optimization and best practices
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Cross-browser compatibility and responsiveness
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  Modern animation and interaction design
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}