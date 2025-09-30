import { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact({ slideIndex }) {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('idle') // idle, sending, success, error

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Me',
      subtitle: 'Drop me a line',
      value: 'hello@jamshidbek.dev',
      action: 'mailto:hello@jamshidbek.dev',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '💬',
      title: 'Let\'s Chat',
      subtitle: 'Quick response',
      value: 'Schedule a call',
      action: 'https://calendly.com/jamshidbek',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '📱',
      title: 'Call Me',
      subtitle: 'Direct contact',
      value: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '📍',
      title: 'Location',
      subtitle: 'Based in',
      value: 'San Francisco, CA',
      action: 'https://maps.google.com/?q=San Francisco',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/jamshidbek', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:bg-gray-600'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/jamshidbek', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'hover:bg-blue-600'
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/jamshidbek', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: 'hover:bg-blue-400'
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/jamshidbek', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: 'hover:bg-pink-600'
    }
  ]

  useLayoutEffect(() => {
    // Clear any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const run = () => {
      let ctx = gsap.context(() => {
        // Initial setup
        gsap.set('.contact-animate', { opacity: 0, y: 50 });
        gsap.set('.contact-method', { opacity: 0, scale: 0.8 });
        gsap.set('.social-item', { opacity: 0, scale: 0 });
        gsap.set('.form-field', { opacity: 0, x: -30 });

        // Main animation timeline
        const tl = gsap.timeline();

        // Animate contact methods
        tl.to('.contact-method', {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        });

        // Animate form fields
        tl.to('.form-field', {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=0.3');

        // Animate social links
        tl.to('.social-item', {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        }, '-=0.2');

        // Animate other elements
        tl.to('.contact-animate', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=0.4');

      }, sectionRef);
      return ctx;
    };

    // Run animations immediately
    let ctx = run();
    
    // Re-run animations when this slide becomes active
    const handler = (e) => {
      if (e.detail.index === slideIndex) { 
        if (ctx) {
          ctx.revert();
        }
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success')
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }, 2000)
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-full text-white/90 backdrop-blur-[2px]"
      id="contact"
    >
      <div className="h-full flex items-center justify-center">
        <div className="container-custom px-6 py-4 max-w-7xl mx-auto w-full">
          {/* Top padding for pinned header */}
          <div className="pt-20 mb-6"></div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                target={method.action.startsWith('http') ? '_blank' : '_self'}
                rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                className="contact-method group"
              >
                <div className="glass-effect bg-gray-800/30 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                      {method.icon}
                    </div>
                    <h3 className="text-sm font-bold mb-1 group-hover:text-blue-400 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-xs text-gray-400 mb-1">{method.subtitle}</p>
                    <p className="text-white text-sm font-medium">{method.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-effect bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
                <div className="contact-animate mb-6">
                  <h3 className="text-2xl font-bold mb-2">Send Me a Message</h3>
                  <p className="text-gray-400 text-sm">
                    Got a project in mind? Let's discuss how we can work together.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-field">
                      <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400 text-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="form-field">
                      <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400 text-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="form-field">
                    <label htmlFor="subject" className="block text-xs font-medium text-gray-300 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400 text-sm"
                      placeholder="Let's discuss a project"
                    />
                  </div>
                  
                  <div className="form-field">
                    <label htmlFor="message" className="block text-xs font-medium text-gray-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-400 resize-none text-sm"
                      placeholder="Tell me about your project, timeline, and goals..."
                    ></textarea>
                  </div>
                  
                  <div className="form-field">
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-sm ${
                        formStatus === 'sending'
                          ? 'bg-gray-600 cursor-not-allowed'
                          : formStatus === 'success'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25'
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        {formStatus === 'sending' && (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        )}
                        {formStatus === 'success' && '✓ '}
                        {formStatus === 'sending' ? 'Sending...' : 
                         formStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                        {formStatus === 'idle' && (
                          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick Response */}
              <div className="contact-animate glass-effect bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                <h4 className="text-lg font-bold mb-3 gradient-text">Quick Response</h4>
                <p className="text-gray-300 text-xs leading-relaxed mb-3">
                  I typically respond to emails within 24 hours. For urgent matters, feel free to call.
                </p>
                <div className="flex items-center text-green-400 text-xs">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Available for new projects
                </div>
              </div>

              {/* Social Links */}
              <div className="contact-animate glass-effect bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                <h4 className="text-lg font-bold mb-3">Connect With Me</h4>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-item flex items-center justify-center p-2 bg-gray-700/50 rounded-lg transition-all duration-300 transform hover:scale-105 ${social.color}`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="contact-animate glass-effect bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                <h4 className="text-lg font-bold mb-3 gradient-text">Services</h4>
                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span>
                    Web Development
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span>
                    UI/UX Design
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span>
                    Full-Stack Apps
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-400 mr-2">✓</span>
                    Performance Optimization
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="contact-animate text-center mt-6 pt-4 border-t border-gray-700/50">
            <p className="text-gray-400 text-xs">
              &copy; 2025 Jamshidbek. Built with React & GSAP.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
