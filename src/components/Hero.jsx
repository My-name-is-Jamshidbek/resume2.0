import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '/assets/profile.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Handle animations
  useLayoutEffect(() => {
    // Set loaded state after a short delay to ensure smooth entrance
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);
    
    // Create animation context for proper cleanup
    let ctx = gsap.context(() => {
      // Initial entrance animation
      const mainTimeline = gsap.timeline({
        defaults: { ease: "power3.out" }
      });
      
      mainTimeline
        .to(".hero-overlay", {
          opacity: 0,
          duration: 1.2,
          delay: 0.3
        })
        .from(".hero-name", {
          y: 100,
          opacity: 0,
          duration: 1.2,
          stagger: 0.03,
        }, "-=0.8")
        .from(".hero-title", {
          y: 40,
          opacity: 0,
          duration: 0.8
        }, "-=0.6")
        .from(".hero-tagline", {
          opacity: 0,
          duration: 0.8
        }, "-=0.4")
        .from(".hero-cta", {
          y: 20,
          opacity: 0,
          stagger: 0.2,
          duration: 0.6
        }, "-=0.5")
        .from(".social-icon", {
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.4")
        .from(".scroll-indicator", {
          opacity: 0,
          y: -20,
          duration: 0.8
        }, "-=0.2");

      // Parallax effect for background elements
      gsap.to(".parallax-bg", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });
      
      // Create floating animation for the profile image
      gsap.to(".profile-float", {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);
    
    // Cleanup function
    return () => {
      ctx.revert();
      clearTimeout(loadTimer);
    };
  }, []);

  // Split text into individual characters for animation
  const renderSplitText = (text, className) => {
    return text.split('').map((char, index) => (
      <span key={index} className={`inline-block ${className}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      ref={heroRef}
  className="relative w-full h-screen overflow-hidden text-white flex items-center justify-center"
      aria-label="Introduction"
    >
      {/* Loading overlay */}
      <div 
        className={`hero-overlay fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-700 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-hidden={isLoaded}
      >
        <div className="loading-logo text-4xl font-bold text-blue-500">J</div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="parallax-bg absolute inset-0 opacity-30">
          <div className="absolute top-[10%] left-[15%] w-64 h-64 rounded-full bg-blue-500 blur-[100px]"></div>
          <div className="absolute top-[40%] right-[10%] w-72 h-72 rounded-full bg-purple-600 blur-[120px]"></div>
          <div className="absolute bottom-[10%] left-[25%] w-80 h-80 rounded-full bg-indigo-700 blur-[150px]"></div>
        </div>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Main content container */}
  <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center relative z-10 w-full">
        {/* Left column: Text content */}
        <div className="w-full md:w-1/2 pt-24 md:pt-0 order-2 md:order-1">
          <div className="max-w-xl">
            <h1 className="text-4xl xs:text-[2.75rem] md:text-7xl font-extrabold mb-6 tracking-tight leading-[1.05]">
              {renderSplitText('Jamshidbek', 'hero-name')}
            </h1>
            
            <h2 className="hero-title text-base xs:text-lg md:text-2xl text-blue-400 font-medium mb-4 flex items-center">
              <span className="inline-block w-6 md:w-8 h-0.5 bg-blue-400 mr-3"></span>
              Software Engineer
            </h2>
            
            <p className="hero-tagline text-sm xs:text-base md:text-xl text-gray-300 mb-8 leading-relaxed">
              Building powerful cross-platform solutions for 
              <span className="block font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Android, Web & IoT applications
              </span>
            </p>
            
            <div className="flex flex-wrap gap-4 md:gap-5 mb-8 md:mb-10">
              <a 
                href="#projects" 
                className="hero-cta relative group bg-blue-500 hover:bg-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-white text-sm md:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                <span className="relative z-10">Explore My Work</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
              <a 
                href="#contact" 
                className="hero-cta relative overflow-hidden px-6 md:px-8 py-3 md:py-4 rounded-full font-medium text-white text-sm md:text-base border border-white/30 hover:border-white/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <span className="relative z-10">Get In Touch</span>
                <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </div>
            
            {/* Social icons */}
            <div className="flex gap-4 md:gap-5 mb-10 md:mb-0">
              {['github', 'linkedin', 'twitter', 'instagram'].map((platform, index) => (
                <a 
                  key={platform} 
                  href={`https://${platform}.com/jamshidbek`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={`Follow on ${platform}`}
                >
                  <span className="sr-only">{platform}</span>
                  <i className={`icon-${platform} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column: Profile image */}
        <div className="w-full md:w-1/2 md:h-full flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
          <div className="relative">
            {/* Main profile image */}
            <div className="profile-float relative z-10">
              <div className="relative w-52 h-52 xs:w-60 xs:h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                  src={profileImage}
                  alt="Jamshidbek"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              {/* Rotating circle */}
              <div className="absolute inset-0 -m-6 border-2 border-dashed border-blue-500/30 rounded-full animate-spin-slow"></div>
            </div>
            
            {/* Experience badge */}
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full shadow-lg z-20">
              <p className="text-xs xs:text-sm font-medium">6+ Years Experience</p>
            </div>
            
            {/* Tech stack badge */}
            <div className="absolute -top-4 -right-4 bg-gray-800/80 backdrop-blur-sm text-white px-4 py-1.5 rounded-full shadow-lg z-20">
              <p className="text-xs xs:text-sm font-medium">Flutter • Django • C++</p>
            </div>
            
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-3xl rounded-full transform scale-75"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-80 hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">Scroll Down</span>
        <div className="w-5 h-9 md:w-6 md:h-10 rounded-full border-2 border-gray-400 flex items-start justify-center p-1">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}