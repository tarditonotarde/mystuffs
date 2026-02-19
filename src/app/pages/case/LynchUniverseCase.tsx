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
  const solutionRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

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
      { ref: solutionRef, name: 'solution' },
      { ref: businessRef, name: 'business' },
      { ref: marketingRef, name: 'marketing' },
      { ref: impactRef, name: 'impact' },
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
                  <span className={`inline-block w-[2px] h-[1em] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: '#000000', verticalAlign: 'text-bottom' }}></span>
                </h1>
              </div>

              {/* iPhone + Description Flex */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* iPhone Frame */}
                <div className={`mx-auto lg:mx-0 ${visibleSections.has('hero') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`} style={{ width: '195px', height: '423px' }}>
                  <div 
                    className="relative w-[390px] aspect-[9/19.5] bg-black rounded-[50px] p-3 shadow-2xl origin-top-left"
                    style={{ transform: 'scale(0.5)' }}
                  >
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

                {/* Description Text */}
                <div className={`flex items-center ${visibleSections.has('hero') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Lynch Universe Stream is a digital tribute experience that explores how streaming platforms can create immersive, curated portals dedicated to filmmakers, cultural movements, or commemorative dates.
                  </p>
                </div>
              </div>

              {/* TV Frame */}
              <div className={`w-[90%] mx-auto mt-8 ${visibleSections.has('hero') ? 'scroll-fade-in-up delay-400' : 'opacity-0'}`}>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <div 
                    className="absolute top-0 left-1/2 w-[200%] aspect-[16/10]"
                    style={{ transform: 'translateX(-50%) scale(0.5)', transformOrigin: 'top center' }}
                  >
                    <div className="relative w-full h-full bg-black rounded-[40px] p-8 shadow-2xl">
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
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Overview Section */}
        <section className="py-12 md:py-20" ref={overviewRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('overview') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>Overview</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('overview') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Rather than functioning as a content distribution service, it operates as a special profile within an existing platform. The goal is to transform traditional browsing into a narrative, atmospheric journey.
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mt-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    This project serves as a scalable and reusable format for editorial experiences inside streaming ecosystems.
                  </p>
                </div>
              </div>

              <div className={`space-y-8 ${visibleSections.has('overview') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Role
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Full-Stack Designer & Developer
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Timeline
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    2026
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Status
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Live Production
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Tech Stack
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    React, TypeScript, Tailwind CSS v4, Framer Motion
                  </p>
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
            <Heading level={2}>The Challenge</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('challenge') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Streaming platforms compete heavily on content volume, but differentiation increasingly depends on experience, identity, and emotional connection.
                  </p>
                </div>

                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Problem
                  </h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Commemorative or tribute content is often presented as temporary lists with little experiential depth
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Editorial curation rarely translates into product-level immersion
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Key cultural moments and anniversaries are underleveraged as engagement opportunities
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
                    Opportunity
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Design a system of activatable curated experiences for:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Visionary directors and creators
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Cinematic movements
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Cultural dates such as International Women's Day (8M)
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Strategic premieres or catalog repositioning
                    </li>
                  </ul>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mt-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    The opportunity lies in combining editorial vision, UX design, and marketing strategy into a cohesive product experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* The Solution Section */}
        <section className="py-12 md:py-20" ref={solutionRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('solution') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>The Solution</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('solution') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    A Streaming Tribute Experience model that transforms curation into a product feature.
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mt-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Each portal functions as:
                  </p>
                  <ul className="space-y-2 list-disc list-inside mt-2">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      A time-based immersive activation
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      A narrative-driven browsing experience
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      An emotional entry point into the existing catalog
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`space-y-10 ${visibleSections.has('solution') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Key Features
                  </h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      56+ curated videos organized with narrative intent
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      6 structured categories designed as experiential chapters
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      YouTube integration (embedded content for educational and artistic appreciation purposes)
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Adaptable visual identity aligned with the featured theme
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Premium microinteractions and motion design
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Immersive video modal with custom controls
                    </li>
                    <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                      Responsive design for Web and SmartTV environments
                    </li>
                  </ul>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mt-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Instead of infinite scroll, users move through a designed journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Business Vision Section */}
        <section className="py-12 md:py-20" ref={businessRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('business') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>Business Vision</Heading>

            <div className={`space-y-10 ${visibleSections.has('business') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                From a product perspective, curated portals create strategic value.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="space-y-8">
                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Differentiation
                    </h3>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      They position a platform as a cultural curator rather than a passive distributor, increasing perceived brand depth and editorial authority.
                    </p>
                  </div>

                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Retention
                    </h3>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Narrative pathways encourage longer sessions and reactivation of existing catalog content through contextual framing.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Scalability
                    </h3>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      The underlying system can be reused across multiple themes, creators, and cultural events, reducing activation cost compared to producing original content.
                    </p>
                  </div>

                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Monetization Potential
                    </h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Premium-tier exclusive access
                      </li>
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Sponsored cultural activations
                      </li>
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Partnerships with film festivals, educational institutions, or cultural organizations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Marketing Vision Section */}
        <section className="py-12 md:py-20" ref={marketingRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('marketing') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>Marketing Vision</Heading>

            <div className={`space-y-10 ${visibleSections.has('marketing') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                This format expands marketing capabilities beyond traditional promotion.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="space-y-8">
                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Brand Storytelling
                    </h3>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Each portal becomes a campaign in itself, reinforcing cultural values, diversity initiatives, and editorial positioning.
                    </p>
                  </div>

                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Social Activation
                    </h3>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Curated portals generate high-quality shareable moments, highlight reels, and narrative-driven promotional content.
                    </p>
                  </div>

                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Cultural Calendar Strategy
                    </h3>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      They allow platforms to strategically activate moments such as:
                    </p>
                    <ul className="space-y-2 list-disc list-inside">
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        International Women's Day (8M)
                      </li>
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Pride Month
                      </li>
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Director anniversaries
                      </li>
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Film movement retrospectives
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      PR Positioning
                    </h3>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Experiential portals are highly communicable to press and creative communities, strengthening the platform's image as innovative and culturally engaged.
                    </p>
                  </div>

                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Audience
                    </h3>
                    <ul className="space-y-2 list-disc list-inside">
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Streaming product teams
                      </li>
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Marketing and brand strategy departments
                      </li>
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Cultural platforms exploring editorial innovation
                      </li>
                      <li className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        Designers and developers studying immersive UX systems
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Impact Section */}
        <section className="py-12 md:py-20" ref={impactRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('impact') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>Impact</Heading>

            <div className={`${visibleSections.has('impact') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Lynch Universe Stream demonstrates a shift in perspective:
              </p>
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mt-4"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                From showcasing content to designing curated cultural experiences with business, marketing, and emotional impact.
              </p>
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mt-4"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                It proposes a scalable model that can be applied to any filmmaker, cultural movement, or commemorative date within the streaming ecosystem.
              </p>
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