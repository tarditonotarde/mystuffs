import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function ChronogoCase() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  
  // Typewriter animation state
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'case study';

  // Back to top button state
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [backToTopAnimKey, setBackToTopAnimKey] = useState(0);

  // Scroll animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);

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

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Back to top button visibility on scroll
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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll animation effect
  useEffect(() => {
    const currentRefs = [heroRef, overviewRef, researchRef, featuresRef, designRef, impactRef, futureRef];
    const currentIds = ['hero', 'overview', 'research', 'features', 'design', 'impact', 'future'];

    const observers: IntersectionObserver[] = [];

    currentRefs.forEach((ref, index) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections((prev) => new Set(prev).add(currentIds[index]));
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

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <section className="p-[0px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-4">
              {/* Espacio vacío donde antes estaban los iconos */}
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
        <section className="py-12 md:py-20" ref={heroRef}> {/* Video Preview */}
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('hero') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <div className="flex flex-col gap-8">
              <div className="py-[30px]">
                <h1 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[28px] md:text-[36px] lg:text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Chrono-go app ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* iPhone + Description Flex */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* iPhone 16 Frame with BeatBits App */}
                <div className={`mx-auto lg:mx-0 ${visibleSections.has('hero') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`} style={{ width: '195px', height: '423px' }}>
                  <div 
                    className="relative w-[390px] aspect-[9/19.5] bg-black rounded-[50px] p-3 shadow-2xl origin-top-left"
                    style={{ transform: 'scale(0.5)' }}
                  >
                    
                    {/* Screen */}
                    <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden">
                      <iframe 
                        src="https://chrono-go.figma.site/"
                        className="w-full h-full border-0"
                        title="Chrono-go App"
                        allow="microphone; autoplay"
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
                    Chrono-Go is a speculative travel app inspired by Back to the Future. It envisions a future where traveling through time and space is as easy as booking a flight. This project is a creative exploration of future design tools and experiences, imagining how users might interact with temporal journeys in a seamless, intuitive way.
                  </p>
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
                    The Challenge
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    As technology continues to blur the limits of reality, the concept of time travel remains one of humanity's most fascinating dreams — yet one with no defined user experience. If time travel existed, how would people plan, book, and navigate a trip across different eras? The challenge was to explore how UX design could translate this impossible experience into a clear, safe, and emotionally engaging interface.
                  </p>
                </div>

                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    The Solution
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Chrono-Go investigates how users might trust, understand, and enjoy a journey beyond time — balancing futuristic aesthetics, ethical implications, and intuitive interaction. From researching cultural perceptions of time travel to designing an interface that feels both futuristic and familiar, Chrono-Go reflects on how UX can shape the boundaries between imagination and technology.
                  </p>
                </div>
              </div>

              <div className={`space-y-8 ${visibleSections.has('overview') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    project
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    ChronoGo! App
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    employer
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Fictional
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    role
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    UX/UI & Dev
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    deliverables
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Vite and TailwindCSS App
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    scope
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Futuristic immersive travel app design
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    timeframe
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    2025
                  </p>
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

            <div className="space-y-16">
              <div>
                <h3 
                  className={`font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6 ${visibleSections.has('research') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Problem Analysis
                </h3>
                <p 
                  className={`font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-10 ${visibleSections.has('research') ? 'scroll-fade-in delay-300' : 'opacity-0'}`}
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  To design a time travel experience, I researched cultural perceptions of time travel across science fiction, philosophy, and popular media. The challenge was balancing the fantastical nature of temporal journeys with practical UX patterns users already trust from travel booking apps. How do you communicate trust and safety when the service itself defies physics? How do you visualize time as a destination?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Persona
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Curious travelers and sci-fi enthusiasts who dream of experiencing history firsthand and exploring different time periods
                    </p>
                  </div>

                  <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Problem
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      No defined UX patterns exist for time travel. How do users book, navigate, and trust a journey across different eras?
                    </p>
                  </div>

                  <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-600' : 'opacity-0'}`}>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Hypothesis
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      A familiar booking flow combined with futuristic aesthetics can make time travel feel both accessible and extraordinary
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${visibleSections.has('research') ? 'scroll-fade-in-up delay-700' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Design Principles
                </h3>
                <ul className="space-y-4">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Retro-futuristic aesthetics inspired by 1960s-70s futurist movement and vintage sci-fi design
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Gesture-based navigation with smooth time-transition animations
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Dynamic light effects and futuristic sound cues for immersion
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Clear safety indicators and ethical considerations for temporal travel
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Architecture & Technical Stack Section */}
        <section className="py-12 md:py-20" ref={designRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>architecture & technical stack</Heading>

            <div className="space-y-16">
              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Frontend Architecture
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Built with Vite for lightning-fast development and TailwindCSS for responsive, utility-first styling. The architecture focuses on fluid animations, dynamic lighting effects, and gesture-based interactions that simulate temporal movement through an immersive, futuristic interface.
                </p>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Design System & Interactions
                </h3>
                <ul className="space-y-4 mb-8">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Gesture-based navigation with swipe and tap interactions for temporal browsing
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Dynamic light effects inspired by temporal distortions and time ripples
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Futuristic sound cues for feedback and emotional engagement
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Fluid interface transitions simulating movement through spacetime
                  </li>
                </ul>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Key Screen Components
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-black p-6">
                    <p 
                      className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Home / Dashboard
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Displays the upcoming time reservation and recommended destinations across different historical eras.
                    </p>
                  </div>

                  <div className="border border-black p-6">
                    <p 
                      className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Time Destination Selector
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      4D calendar interface allowing users to browse and select historical eras and locations across the spacetime continuum.
                    </p>
                  </div>

                  <div className="border border-black p-6">
                    <p 
                      className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Booking Screen
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Confirmation interface with dynamic visualization of the time jump, showing temporal coordinates and safety indicators.
                    </p>
                  </div>

                  <div className="border border-black p-6">
                    <p 
                      className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Profile / Timeline
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Personal history visualization showing all temporal journeys, creating a non-linear timeline of the user's adventures.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Speculative Design Philosophy
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Chrono-Go is more than a design fiction project — it's a reflection on how technology and imagination intersect. Through speculative UX, it explores what it means to design for experiences that don't yet exist, encouraging empathy, curiosity, and a sense of wonder toward the future of travel and interaction. The interface balances familiar booking patterns with otherworldly aesthetics, making the impossible feel just within reach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Solution Section */}
        <section className="py-12 md:py-20" ref={featuresRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>the solution</Heading>

            <div className="space-y-16">
              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  01. Dashboard & Time Reservations
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  The home screen welcomes users with their upcoming time reservation displayed prominently, featuring destination details, temporal coordinates, and safety status indicators. Recommended destinations carousel showcases curated historical moments and future events, each with immersive preview imagery and contextual information about the era. Dynamic lighting effects pulse gently to suggest temporal energy and movement.
                </p>
                <div className="flex flex-col md:flex-row gap-6 md:gap-5 justify-center items-center">
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/chronogo-1.mp4"
                    className="w-full max-w-[250px] h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/chronogo-4.mp4"
                    className="w-full max-w-[250px] h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  02. 4D Calendar & Destination Selector
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  The innovative 4D calendar interface allows users to navigate through both time and space simultaneously. Swipe gestures move through centuries while pinch-to-zoom reveals specific dates and locations. Historical eras are visualized with period-appropriate imagery and cultural context, while future destinations showcase speculative visualizations. Safety indicators clearly communicate temporal stability and potential paradox risks for each destination.
                </p>
                <div className="flex flex-col md:flex-row gap-6 md:gap-5 justify-center items-center">
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/chronogo-2.mp4"
                    className="w-full max-w-[250px] h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/chronogo-3.mp4"
                    className="w-full max-w-[250px] h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  03. Booking & Profile Timeline
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  The booking confirmation screen visualizes the time jump with animated temporal coordinates and rippling spacetime effects. Users review departure/arrival times (both calendar and temporal), safety briefings, and ethical guidelines for interacting with past/future societies. The personal timeline in the profile creates a non-linear visualization of all completed journeys, allowing users to revisit memories and track their temporal adventures across the continuum.
                </p>
                <div className="flex justify-center">
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/chronogo-5.mp4"
                    className="w-full max-w-[250px] h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Impact Section */}
        <section className="py-12 md:py-20" ref={impactRef}>
          <div className="w-full flex flex-col gap-12">
            <div className="space-y-12">
              <Heading level={2}>impact & results</Heading>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                <div className="space-y-10">
                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Design Achievements
                    </h3>
                    <ul className="space-y-4">
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Successfully visualized abstract temporal concepts through familiar UI patterns
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Created immersive futuristic aesthetics while maintaining usability and accessibility
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Balanced sci-fi inspiration with practical booking flow conventions
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Designed ethical safeguards and safety indicators for speculative temporal travel
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Explored design fiction as a tool for imagining future interaction paradigms
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      User Experience Highlights
                    </h3>
                    <ul className="space-y-4">
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Familiar booking patterns that make time travel feel intuitive and trustworthy
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Futuristic sound cues and visual effects creating emotional immersion
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Gesture-based navigation enabling fluid temporal browsing
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Speculative design encouraging curiosity about future interaction paradigms
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Removed black placeholder div */}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Future Improvements Section */}
        <section className="py-12 md:py-20" ref={futureRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>future improvements</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-10">
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Design & UX Refinements
                  </h3>
                  <ul className="space-y-4">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Enhanced temporal paradox warnings with clear explanations
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Accessibility features for users with different temporal perception needs
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Personalized recommendations based on user interests and historical preferences
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Interactive tutorials explaining temporal mechanics and safety protocols
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Real-time weather and environmental conditions for destination eras
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Dark mode theme for late-night temporal browsing sessions
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Technical Optimizations
                  </h3>
                  <ul className="space-y-4">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Cloud sync for cross-device project access
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Offline functionality with Service Worker implementation
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Lazy loading for audio samples to reduce initial load time
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      WebAssembly integration for heavy audio processing tasks
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Improved synthesis algorithms for richer sound quality
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Storage compression to maximize LocalStorage capacity
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Navigation Buttons */}
        <section className="py-12 md:py-20">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end gap-6">
            <ArrowButton 
              text="back to works"
              onClick={() => navigate('/works')}
              direction="left"
              svgPaths={{
                p3ecd4f00: svgPaths.p3ecd4f00,
                p8aff500: svgPaths.p8aff500
              }}
            />

            <div>
              <ArrowButton 
                text="next project"
                onClick={() => navigate(getNextProjectRoute('Chrono-go'))}
                direction="right"
                svgPaths={{
                  p3ecd4f00: svgPaths.p3ecd4f00,
                  p8aff500: svgPaths.p8aff500
                }}
              />
            </div>
          </div>
        </section>

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
    </div>
  );
}