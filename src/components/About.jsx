import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About({ slideIndex }) {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  useLayoutEffect(() => {
    const animate = () => {
      let ctx = gsap.context(() => {
      // Text reveal animation
      gsap.fromTo(textRef.current.children,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
          }
        }
      )

      // Stats counter animation
      const stats = gsap.utils.toArray('.stat-number')
      stats.forEach((stat) => {
        const finalValue = parseInt(stat.dataset.value)
        gsap.fromTo(stat, 
          { innerHTML: 0 },
          {
            innerHTML: finalValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 80%"
            },
            onUpdate: function() {
              stat.innerHTML = Math.ceil(this.targets()[0].innerHTML)
            }
          }
        )
      })

      // Image parallax effect
      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
      }, sectionRef)
      return ctx
    }

    let ctx = animate()

    const handler = (e) => {
      if (e.detail.index === slideIndex) {
        ctx.revert()
        ctx = animate()
      }
    }
    window.addEventListener('slideEnter', handler)
    return () => {
      window.removeEventListener('slideEnter', handler)
      ctx.revert()
    }
  }, [slideIndex])

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-full text-white/90 backdrop-blur-[2px]"
      id="about"
    >
      <div className="h-full flex items-center justify-center overflow-y-auto">
  <div className="container-custom px-4 sm:px-6 py-16 md:py-20 max-w-7xl mx-auto">
          {/* Add top padding to account for pinned header */}
          <div className="pt-24 mb-10"></div>
          
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div ref={textRef} className="space-y-8">

            <p className="text-xl text-gray-300 leading-relaxed">
              I'm a versatile software engineer with <span className="gradient-text font-semibold">6+ years</span> of experience 
              building cross-platform applications for Android, Web, and IoT ecosystems. I specialize in Flutter, Kotlin, Django, 
              and embedded systems programming.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              I'm passionate about creating efficient, scalable solutions that solve real-world problems. Whether it's developing 
              responsive mobile apps, building robust web backends, or programming IoT devices, I bring technical excellence and 
              innovative thinking to every project. I thrive in collaborative environments and love mentoring junior developers.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 pt-6 md:pt-8">
              <div className="text-center">
                <div className="stat-number text-3xl font-bold gradient-text" data-value="45">0</div>
                <p className="text-gray-400 mt-2">Apps Deployed</p>
              </div>
              <div className="text-center">
                <div className="stat-number text-3xl font-bold gradient-text" data-value="25">0</div>
                <p className="text-gray-400 mt-2">Clients Served</p>
              </div>
              <div className="text-center">
                <div className="stat-number text-3xl font-bold gradient-text" data-value="6">0</div>
                <p className="text-gray-400 mt-2">Years Coding</p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <a 
                href="#contact" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group"
              >
                Let's Work Together
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Visual element */}
          <div className="relative mt-10 lg:mt-0">
            <div ref={imageRef} className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-blue-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-purple-500 rounded-full opacity-20"></div>
              
              {/* Main content area */}
              <div className="glass-effect rounded-3xl p-8 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-12 right-8 w-1 h-1 bg-purple-500 rounded-full"></div>
                  <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>

                {/* Code snippet decoration */}
                <div className="relative">
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-300 font-mono space-y-2">
                      <div><span className="text-purple-400">const</span> <span className="text-blue-400">engineer</span> = {"{"}</div>
                      <div className="ml-4"><span className="text-green-400">name</span>: <span className="text-yellow-400">"Jamshidbek"</span>,</div>
                      <div className="ml-4"><span className="text-green-400">specialization</span>: <span className="text-yellow-400">"Android, Web, IoT"</span>,</div>
                      <div className="ml-4"><span className="text-green-400">skills</span>: [<span className="text-yellow-400">"Flutter"</span>, <span className="text-yellow-400">"Django"</span>, <span className="text-yellow-400">"C++"</span>],</div>
                      <div className="ml-4"><span className="text-green-400">passion</span>: <span className="text-yellow-400">"Building scalable solutions"</span></div>
                      <div>{"}"};</div>
                    </div>
                  </div>
                  
                  {/* Achievement badges */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">📱</span>
                      </div>
                      <span className="text-gray-300">Mobile Developer</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">🌐</span>
                      </div>
                      <span className="text-gray-300">Backend Specialist</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">⚙️</span>
                      </div>
                      <span className="text-gray-300">IoT & Embedded</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
