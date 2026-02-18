import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function LynchUniverseCase() {
  const navigate = useNavigate();
  const [animationKey, setAnimationKey] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [backToTopAnimKey, setBackToTopAnimKey] = useState(0);

  // Typewriter animation states
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'case study';

  // Scroll animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const learningsRef = useRef<HTMLDivElement>(null);

  // Scroll animation state
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const refs = [
      { ref: heroRef, name: 'hero' },
      { ref: overviewRef, name: 'overview' },
      { ref: challengeRef, name: 'challenge' },
      { ref: researchRef, name: 'research' },
      { ref: designRef, name: 'design' },
      { ref: technicalRef, name: 'technical' },
      { ref: resultsRef, name: 'results' },
      { ref: learningsRef, name: 'learnings' },
    ];

    refs.forEach(({ ref, name }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections((prev) => new Set(prev).add(name));
              }
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setBackToTopAnimKey(prev => prev + 1);
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <section className="p-[0px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-4">
              {/* Empty space */}
            </div>

            <div 
              className="relative"
              onMouseLeave={() => {
                setIsMenuOpen(false);
              }}
            >
              <button 
                className="fixed top-4 right-6 md:right-12 lg:right-16 w-[80px] h-[64px] z-50 transition-all duration-700 ease-in-out group cursor-pointer"
                onMouseEnter={() => {
                  setAnimationKey(prev => prev + 1);
                  setIsMenuOpen(true);
                }}
                onClick={() => {
                  setIsMenuOpen(prev => !prev);
                }}
              >
                <div className="flex items-center justify-center w-full h-full">
                  <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 247 196">
                    <path key={animationKey} className="animated-scribble-hover" d={svgPathsScribble.p9f31800} stroke="black" strokeLinecap="round" strokeWidth="1" />
                  </svg>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div 
                  className="fixed top-[76px] right-6 md:right-12 lg:right-16 z-50 bg-white border border-black shadow-lg"
                  style={{
                    transform: 'translateX(calc(50% - 40px))'
                  }}
                  onMouseEnter={() => setIsMenuOpen(true)}
                >
                  <div className="flex flex-col divide-y divide-black">
                    <button
                      onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-6 py-1 text-left text-[14px] text-black tracking-[-0.42px] hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                      style={{ fontFamily: 'Instrument Sans, sans-serif', fontVariationSettings: "'wdth' 100" }}
                    >
                      hey!
                    </button>
                    <button
                      onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                          const sections = document.querySelectorAll('section');
                          const myWorkSection = Array.from(sections).find(section => 
                            section.querySelector('h2')?.textContent === 'my work'
                          );
                          myWorkSection?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-6 py-1 text-left text-[14px] text-black tracking-[-0.42px] hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                      style={{ fontFamily: 'Instrument Sans, sans-serif', fontVariationSettings: "'wdth' 100" }}
                    >
                      my work
                    </button>
                    <button
                      onClick={() => {
                        navigate('/works');
                      }}
                      className="px-6 py-1 text-left text-[14px] text-black tracking-[-0.42px] hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                      style={{ fontFamily: 'Instrument Sans, sans-serif', fontVariationSettings: "'wdth' 100" }}
                    >
                      more stuffs
                    </button>
                    <button
                      onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                          const sections = document.querySelectorAll('section');
                          const itsMeSection = Array.from(sections).find(section => 
                            section.querySelector('h2')?.textContent === "it's me"
                          );
                          itsMeSection?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-6 py-1 text-left text-[14px] text-black tracking-[-0.42px] hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                      style={{ fontFamily: 'Instrument Sans, sans-serif', fontVariationSettings: "'wdth' 100" }}
                    >
                      it's me
                    </button>
                    <button
                      onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                          const sections = document.querySelectorAll('section');
                          const contactSection = Array.from(sections).find(section => 
                            section.querySelector('h2')?.textContent === 'contact'
                          );
                          contactSection?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className="px-6 py-1 text-left text-[14px] text-black tracking-[-0.42px] hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                      style={{ fontFamily: 'Instrument Sans, sans-serif', fontVariationSettings: "'wdth' 100" }}
                    >
                      contact
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-12 md:py-20" ref={heroRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('hero') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <div className="flex flex-col gap-8">
              <div className="py-[30px]">
                <h1 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[28px] md:text-[36px] lg:text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Lynch Universe Stream ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* TV Mockup + Description Flex */}
              <div className="flex flex-col gap-8 lg:gap-12 items-center">
                {/* Description Text */}
                <div className={`flex items-center ${visibleSections.has('hero') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] text-center"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Lynch Universe Stream is not just a streaming UI clone. It is a digital tribute experience that reimagines the cinematic universe of David Lynch as if it were presented inside a premium platform similar to Netflix. Rather than fragmenting his work across multiple services, the project creates a unified tribute entry point that allows users to immerse themselves in Lynch's world through a curated, atmospheric streaming interface. This is a UX homage project, not a content distribution platform.
                  </p>
                </div>

                {/* TV Frame with Lynch Universe Stream */}
                <div className={`w-[90%] mx-auto ${visibleSections.has('hero') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <div 
                      className="absolute top-0 left-1/2 w-[200%] aspect-[16/10]"
                      style={{ transform: 'translateX(-50%) scale(0.5)', transformOrigin: 'top center' }}
                    >
                      <div className="relative w-full h-full bg-black rounded-[40px] p-8 shadow-2xl">
                        {/* Screen */}
                        <div className="relative w-full h-full bg-white rounded-[24px] overflow-hidden">
                          <iframe 
                            src="https://tarditonotarde.github.io/LynchUniverse/"
                            className="w-full h-full border-0"
                            title="Lynch Universe Stream Platform"
                            allow="clipboard-write"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Overview Section */}
        <section className="py-12 md:py-20" ref={overviewRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('overview') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>overview</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('overview') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Project Details
                  </h3>
                  <div className="space-y-3">
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Project Type:</strong> Streaming Platform Concept / Tribute Experience
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Timeline:</strong> 2026
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Role:</strong> Full-Stack Designer & Developer
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Platform:</strong> SmartTV and Web (Desktop & Mobile Responsive)
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Status:</strong> Live Production
                    </p>
                  </div>
                </div>
              </div>

              <div className={`space-y-10 ${visibleSections.has('overview') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Objectives
                  </h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Reimagine Lynch's filmography as a cohesive streaming universe
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Design a tribute-style entry point inspired by Netflix-level browsing patterns
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Create an immersive atmosphere aligned with Lynch's surreal aesthetic
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Demonstrate advanced front-end architecture and animation systems
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Merge cinema, UX design, and modern web engineering
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* The Challenge Section */}
        <section className="py-12 md:py-20" ref={challengeRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('challenge') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>the challenge</Heading>

            {/* iPhone 16 Frame with Lynch Universe Stream */}
            <div className={`mx-auto ${visibleSections.has('challenge') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`} style={{ width: '195px', height: '423px' }}>
              <div 
                className="relative w-[390px] aspect-[9/19.5] bg-black rounded-[50px] p-3 shadow-2xl origin-top-left"
                style={{ transform: 'scale(0.5)' }}
              >
                
                {/* Screen */}
                <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden">
                  <iframe 
                    src="https://tarditonotarde.github.io/LynchUniverse/"
                    className="w-full h-full border-0"
                    title="Lynch Universe Stream Mobile"
                    allow="clipboard-write"
                  />
                </div>
                
                {/* Side Buttons */}
                <div className="absolute left-[-4px] top-[120px] w-[4px] h-[60px] bg-black rounded-l-lg"></div>
                <div className="absolute left-[-4px] top-[190px] w-[4px] h-[60px] bg-black rounded-l-lg"></div>
                <div className="absolute left-[-4px] top-[260px] w-[4px] h-[60px] bg-black rounded-l-lg"></div>
                <div className="absolute right-[-4px] top-[200px] w-[4px] h-[100px] bg-black rounded-r-lg"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('challenge') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Problem Statement
                  </h3>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black leading-relaxed" style={{ fontVariationSettings: "'wdth' 100" }}>
                    David Lynch's extensive body of work spans films, series, short films, documentaries, interviews, and soundscapes. Existing platforms present this content in fragmented, inconsistent ways that don't honor the atmospheric and cohesive nature of Lynch's artistic vision.
                  </p>
                </div>

                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Primary Goals
                  </h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Design a unified, immersive platform reflecting Lynch's dark, surreal aesthetic
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Organize 56+ unique videos across 6 curated categories
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Provide seamless video playback with YouTube integration
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Create a premium user experience rivaling major streaming platforms
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`space-y-10 ${visibleSections.has('challenge') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Target Audience
                  </h3>
                  <div className="space-y-3">
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Lynch Enthusiasts:</strong> Fans exploring his complete filmography
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Film Students:</strong> Studying Lynchian cinema and experimental film
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Casual Viewers:</strong> Discovering Lynch's work for the first time
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Developers:</strong> Studying modern web application architecture
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Research Section */}
        <section className="py-12 md:py-20" ref={researchRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('research') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>research & discovery</Heading>

            <div className={`space-y-10 ${visibleSections.has('research') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Competitive Analysis
                </h3>
                <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black mb-4" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Platforms Studied:
                </p>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Netflix - Industry-leading UI/UX patterns, card-based browsing
                  </li>
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Disney+ - Content categorization, smooth animations
                  </li>
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    HBO Max - Dark aesthetic, premium feel
                  </li>
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Criterion Channel - Curated film presentation
                  </li>
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    YouTube - Video player integration, metadata display
                  </li>
                </ul>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Key Insights
                </h3>
                <ul className="space-y-2 list-disc list-inside ml-4">
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Dark-first design reduces eye strain for extended viewing
                  </li>
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Card hover states provide quick content previews
                  </li>
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Categorization helps users navigate large catalogs
                  </li>
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Ambient audio enhances immersion
                  </li>
                  <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                    Minimal UI keeps focus on content
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Design Process Section */}
        <section className="py-12 md:py-20" ref={designRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('design') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>design process</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('design') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Design Principles
                  </h3>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Content-First: UI fades away when not needed
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Dark Aesthetic: Reflects Lynch's noir and surreal themes
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Premium Feel: Sophisticated animations and transitions
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Intuitive Navigation: Clear hierarchy and categorization
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Atmospheric: Ambient audio and visual effects create mood
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`space-y-10 ${visibleSections.has('design') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Color Strategy
                  </h3>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Deep blacks - Main backgrounds
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Netflix red - Brand accent, CTAs
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Subtle grays - Text hierarchy
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Transparency layers - Glass morphism, overlays
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Technical Implementation Section */}
        <section className="py-12 md:py-20" ref={technicalRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('technical') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>technical implementation</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('technical') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Technology Stack
                  </h3>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      React 18.3.1 - Component architecture
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      TypeScript - Type safety
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Tailwind CSS v4 - Utility-first styling
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Framer Motion - Advanced animations
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      YouTube IFrame API - Video playback
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`space-y-10 ${visibleSections.has('technical') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Key Features
                  </h3>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      56 unique videos with complete metadata
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      6 curated categories with smooth animations
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Premium card interactions
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Immersive video modal with custom controls
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Ambient audio system with visualizer
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Results Section */}
        <section className="py-12 md:py-20" ref={resultsRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('results') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>results & impact</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('results') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Quantitative Metrics
                  </h3>
                  <div className="space-y-2">
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Page Load:</strong> Less than 2 seconds on 3G
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>First Contentful Paint:</strong> Less than 1 second
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Mobile Performance:</strong> 90+ Lighthouse score
                    </p>
                    <p className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      <strong>Interaction Response:</strong> Less than 100ms
                    </p>
                  </div>
                </div>
              </div>

              <div className={`space-y-10 ${visibleSections.has('results') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Technical Achievements
                  </h3>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Advanced React Patterns: Context API, custom hooks, component composition
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Sophisticated Animations: Framer Motion integration, spring physics
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Design System: Complete token-based theming
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Type Safety: Full TypeScript coverage
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Key Learnings Section */}
        <section className="py-12 md:py-20" ref={learningsRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('learnings') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>key learnings</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('learnings') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Technical Insights
                  </h3>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      CSS Custom Properties enable responsive design at scale
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Framer Motion's declarative API is easier than CSS animations
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Context API is sufficient for most apps
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      TypeScript catches bugs early and improves developer experience
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`space-y-10 ${visibleSections.has('learnings') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Design Insights
                  </h3>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Dark themes require careful contrast management
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Animations should be purposeful
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Hover states need breathing room to prevent jank
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[16px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Mobile-first forces prioritization and better UX
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Navigation */}
        <section className="py-12 md:py-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <ArrowButton
              text="back to works"
              onClick={() => navigate('/works')}
              direction="left"
              svgPaths={svgPathsArrow}
            />

            <ArrowButton
              text="next project"
              onClick={() => navigate(getNextProjectRoute('Lynch Universe Stream'))}
              direction="right"
              svgPaths={svgPathsArrow}
            />
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-50 w-[32px] h-[32px] bg-black hover:bg-gray-800 rounded-full shadow-lg cursor-pointer transition-all hover:opacity-70 group"
          onClick={scrollToTop}
          onMouseEnter={() => setBackToTopAnimKey(prev => prev + 1)}
          aria-label="Back to top"
        >
          <div className="w-full h-full flex items-center justify-center -rotate-90">
            <svg className="block w-[20px] h-[20px]" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
              <g>
                <path 
                  key={`back-to-top-arrow1-${backToTopAnimKey}`}
                  className="animated-icon-path" 
                  d={svgPathsArrow.p3ecd4f00} 
                  stroke="white" 
                  strokeWidth="1.5" 
                />
                <path 
                  key={`back-to-top-arrow2-${backToTopAnimKey}`}
                  className="animated-icon-path" 
                  d={svgPathsArrow.p8aff500} 
                  stroke="white" 
                  strokeWidth="1.5" 
                />
              </g>
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
