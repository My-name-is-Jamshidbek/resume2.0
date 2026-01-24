import { useRef, useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Projects({ slideIndex }) {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(0)
  const [isDetailView, setIsDetailView] = useState(false)
  const projectRefs = useRef([])

  const projects = [
    {
      id: 1,
      title: 'Fuel Station CRM System',
      subtitle: 'IoT & Web Management Platform',
      description: 'Comprehensive CRM system for AMUSOFT managing fuel stations with IoT integration. Real-time monitoring, inventory management, and web-based analytics dashboard.',
      longDescription: 'Enterprise-grade fuel station management system combining IoT sensors for real-time fuel monitoring with a robust web platform for operations management. Features include inventory tracking, sales analytics, driver management, and automated alerts for low fuel levels.',
      tech: ['Django', 'React', 'PostgreSQL', 'Arduino', 'Raspberry Pi', 'MQTT'],
      image: '/assets/project1.jpg',
      liveUrl: 'https://mms.amusoft.com',
      githubUrl: 'https://github.com/My-name-is-Jamshidbek/mms_backend',
      category: 'IoT & Web',
      year: '2023-2024',
      status: 'Live',
      metrics: {
        stations: '15+',
        uptime: '99.5%',
        users: '50+'
      },
      features: [
        'Real-time IoT monitoring',
        'Inventory management',
        'Sales analytics',
        'Driver management',
        'Automated alerts',
        'Web dashboard'
      ]
    },
    {
      id: 2,
      title: 'Task Manager Mobile App',
      subtitle: 'Flutter TMS for RANCH University',
      description: 'Mobile task management application built with Flutter for RANCH University. Enables students and staff to create, assign, and track tasks with real-time synchronization.',
      longDescription: 'A feature-rich task management app developed with Flutter providing seamless task creation, assignment, and tracking. Integrated with RANCH University backend for data synchronization, user authentication, and real-time notifications.',
      tech: ['Flutter', 'Dart', 'Firebase', 'Django Backend'],
      image: '/assets/project2.jpg',
      liveUrl: 'https://github.com/My-name-is-Jamshidbek/task_manager_mobile',
      githubUrl: 'https://github.com/My-name-is-Jamshidbek/task_manager_mobile',
      category: 'Mobile',
      year: '2024-2025',
      status: 'Live',
      metrics: {
        downloads: '1K+',
        rating: '4.6',
        users: '500+'
      },
      features: [
        'Task creation & assignment',
        'Real-time updates',
        'Deadline tracking',
        'Team collaboration',
        'Push notifications',
        'Offline mode'
      ]
    },
    {
      id: 3,
      title: 'Smart Lake Monitoring System',
      subtitle: 'IoT Fish Lake Monitoring Platform',
      description: 'Comprehensive fish lake monitoring system with mobile app, web dashboard, and IoT devices. Real-time water quality monitoring, temperature tracking, and ecosystem analysis.',
      longDescription: 'End-to-end IoT solution for monitoring fish lakes with Arduino-based sensors, mobile app for data visualization, web-based analytics, and backend synchronization. Tracks water parameters, temperature, pH, and fish population metrics with predictive analytics.',
      tech: ['Flutter', 'Django', 'Arduino', 'Raspberry Pi', 'PostgreSQL', 'React'],
      image: '/assets/project3.jpg',
      liveUrl: 'https://github.com/My-name-is-Jamshidbek/smart_lake',
      githubUrl: 'https://github.com/My-name-is-Jamshidbek/smart_lake',
      category: 'IoT & Mobile',
      year: '2024-2025',
      status: 'In Development',
      metrics: {
        sensors: '10+',
        dataPoints: '100K+',
        accuracy: '98.5%'
      },
      features: [
        'Real-time water quality monitoring',
        'Temperature & pH tracking',
        'Mobile app visualization',
        'Web dashboard analytics',
        'Predictive alerts',
        'Historical data analysis'
      ]
    },
    {
      id: 4,
      title: 'KOMPARATIVISTIKA Scientific Journal',
      subtitle: 'Electronic Academic Publishing Platform',
      description: 'Scientific electronic journal platform for KOMPARATIVISTIKA. Web-based publication system for academic articles, peer review management, and research dissemination.',
      longDescription: 'Professional academic journal platform built for KOMPARATIVISTIKA scientific publication. Features include article submission, peer review workflow, digital publishing, and online access to research papers. Supports multiple languages and international research collaboration.',
      tech: ['Laravel', 'Vue.js', 'MySQL', 'Docker'],
      image: '/assets/project4.jpg',
      liveUrl: 'https://jurnal-komparativistika.uz/en/',
      githubUrl: 'https://github.com/My-name-is-Jamshidbek/journal_cs',
      category: 'Web',
      year: '2024-2025',
      status: 'Live',
      metrics: {
        articles: '200+',
        readers: '5K+',
        languages: '3'
      },
      features: [
        'Article submission system',
        'Peer review workflow',
        'Digital publishing',
        'Multi-language support',
        'Advanced search',
        'Author management'
      ]
    }
  ]

  useLayoutEffect(() => {
    // Clear any existing ScrollTrigger instances
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    const run = () => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let ctx = gsap.context(() => {
        if (!reduceMotion) {
          gsap.set('.project-slide', { opacity: 0, y: 100 });
          gsap.set('.project-nav-item', { opacity: 0, scale: 0.8 });
          gsap.set('.project-meta', { opacity: 0, x: -50 });
          gsap.set('.project-feature', { opacity: 0, y: 20 });
          const tl = gsap.timeline();
          tl.to('.project-nav-item', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
          });
          tl.to('.project-slide', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
          }, '-=0.3');
          tl.to('.project-meta', {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
          }, '-=0.4');
          tl.to('.project-feature', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out'
          }, '-=0.2');
        } else {
          gsap.set(['.project-slide','.project-nav-item','.project-meta','.project-feature'], { opacity: 1, clearProps: 'all' })
        }
      }, sectionRef)
      return ctx
    }

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
  }, [slideIndex, selectedProject]);

  const selectProject = (index) => {
    if (index === selectedProject) return;
    
    // Animate out current project
    gsap.to('.project-slide', {
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setSelectedProject(index);
        // Animate in new project
        gsap.fromTo('.project-slide', 
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
  };

  const currentProject = projects[selectedProject];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-full text-white/90 backdrop-blur-[2px]"
      id="projects"
    >
      <div className="h-full overflow-y-auto">
  <div className="container-custom px-4 sm:px-6 py-10 max-w-7xl mx-auto">
          {/* Top padding for pinned header */}
          <div className="pt-24 mb-8"></div>

          {/* Project Navigation */}
          <div className="flex flex-nowrap overflow-x-auto scrollbar-none gap-3 mb-8 pb-1 -mx-2 px-2 snap-x snap-mandatory md:flex-wrap md:justify-center md:gap-4 md:mb-12">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => selectProject(index)}
                className={`project-nav-item px-5 py-2.5 rounded-full border transition-all duration-300 text-sm md:text-base snap-start ${
                  selectedProject === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-blue-500 hover:text-blue-400'
                }`}
              >
                <span className="font-medium">{project.title}</span>
              </button>
            ))}
          </div>

          {/* Main Project Display */}
          <div className="project-slide">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
              {/* Project Visual */}
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative group">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${currentProject.image})`,
                    }}
                  ></div>
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      <a 
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transform hover:scale-110 transition-all duration-300"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <a 
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transform hover:scale-110 transition-all duration-300"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {currentProject.status}
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                      {currentProject.category}
                    </span>
                  </div>
                </div>

                {/* Project Metrics */}
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
                  {Object.entries(currentProject.metrics).map(([key, value], index) => (
                    <div key={key} className="project-meta text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
                      <div className="text-2xl font-bold text-blue-400 mb-1">{value}</div>
                      <div className="text-sm text-gray-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <div>
                  <div className="project-meta flex items-center gap-4 mb-4">
                    <span className="text-sm text-blue-400 font-medium">{currentProject.year}</span>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">{currentProject.category}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{currentProject.title}</h3>
                  <p className="text-lg md:text-xl text-blue-400 mb-3 md:mb-4">{currentProject.subtitle}</p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {currentProject.longDescription}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="project-meta">
                  <h4 className="text-lg font-semibold mb-3 text-gray-200">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-300 rounded-lg text-sm font-medium border border-gray-600 hover:border-blue-500 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="project-meta">
                  <h4 className="text-lg font-semibold mb-3 text-gray-200">Key Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentProject.features.map((feature, index) => (
                      <div key={index} className="project-feature flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="project-meta flex gap-4">
                  <a 
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    View Live Project
                  </a>
                  <a 
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    View Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}