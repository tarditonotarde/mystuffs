import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function OfficeApocalypseCase() {
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
  const challengeRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gameOverRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const componentsRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);
  const takeawaysRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

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
    const currentRefs = [heroRef, overviewRef, challengeRef, techRef, featuresRef, statsRef, gameOverRef, designRef, componentsRef, challengesRef, resultsRef, futureRef, takeawaysRef, conclusionRef];
    const currentIds = ['hero', 'overview', 'challenge', 'tech', 'features', 'stats', 'gameover', 'design', 'components', 'challenges', 'results', 'future', 'takeaways', 'conclusion'];

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
        <section className="py-12 md:py-20" ref={heroRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('hero') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <div className="flex flex-col gap-8">
              <div className="py-[30px]">
                <h1 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[28px] md:text-[36px] lg:text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Office Apocalypse ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* iPhone + Description */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* iPhone 16 Frame */}
                <div className={`mx-auto lg:mx-0 ${visibleSections.has('hero') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`} style={{ width: '195px', height: '423px' }}>
                  <div 
                    className="relative w-[390px] aspect-[9/19.5] bg-black rounded-[50px] p-3 shadow-2xl origin-top-left"
                    style={{ transform: 'scale(0.5)' }}
                  >
                    <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden">
                      <iframe 
                        src="https://officechaos.figma.site"
                        className="w-full h-full border-0"
                        title="Office Apocalypse Game"
                        allow="autoplay"
                        style={{ transform: 'scale(0.9)' }}
                      />
                    </div>
                    <div className="absolute left-[-4px] top-[120px] w-[4px] h-[60px] bg-black rounded-l-lg"></div>
                    <div className="absolute left-[-4px] top-[190px] w-[4px] h-[60px] bg-black rounded-l-lg"></div>
                    <div className="absolute left-[-4px] top-[260px] w-[4px] h-[60px] bg-black rounded-l-lg"></div>
                    <div className="absolute right-[-4px] top-[200px] w-[4px] h-[100px] bg-black rounded-r-lg"></div>
                  </div>
                </div>

                {/* Description */}
                <div className={`${visibleSections.has('hero') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Office Apocalypse is an interactive decision-making game built with React and Tailwind CSS, where players navigate through chaotic office scenarios. The game challenges users to manage four critical workplace metrics—Stress, Chaos, Happiness, and Embarrassment—through a series of unpredictable events and consequential choices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Project Overview */}
        <section className="py-12 md:py-20" ref={overviewRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('overview') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>project overview</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('overview') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Interactive browser-based game requiring no installation or backend infrastructure. Built with pure frontend implementation, ultra-minimalist design using only black and white color palette, and responsive layout that works perfectly without scrolling.
                </p>
              </div>

              <div className={`space-y-8 ${visibleSections.has('overview') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    objective
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Create an engaging, humor-driven game that captures the absurdity of modern office life
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
                    UX/UI Design, Game Design, Frontend Development
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
                    2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* The Challenge */}
        <section className="py-12 md:py-20" ref={challengeRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('challenge') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>the challenge</Heading>

            <div className="space-y-8">
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Key Requirements
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`border border-black p-6 ${visibleSections.has('challenge') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Pure frontend implementation with no backend dependencies
                  </p>
                </div>

                <div className={`border border-black p-6 ${visibleSections.has('challenge') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Ultra-minimalist design using only black and white color palette
                  </p>
                </div>

                <div className={`border border-black p-6 ${visibleSections.has('challenge') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Responsive layout that works perfectly without scrolling
                  </p>
                </div>

                <div className={`border border-black p-6 ${visibleSections.has('challenge') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Dynamic stat tracking with real-time visual feedback
                  </p>
                </div>

                <div className={`border border-black p-6 ${visibleSections.has('challenge') ? 'scroll-scale-in delay-600' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Corporate-style Game Over modal formatted as an HR email
                  </p>
                </div>

                <div className={`border border-black p-6 ${visibleSections.has('challenge') ? 'scroll-scale-in delay-700' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Imported Figma logo integration with proper scaling and centering
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Technical Implementation */}
        <section className="py-12 md:py-20" ref={techRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('tech') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>technical implementation</Heading>

            <div className="space-y-8">
              <h3 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Technology Stack
              </h3>

              <div className="border border-black">
                <div className="grid grid-cols-2 divide-x divide-black">
                  <div className="p-4 bg-gray-50">
                    <p className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>Technology</p>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <p className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>Purpose</p>
                  </div>
                </div>
                
                {[
                  { tech: 'React 18', purpose: 'Component-based UI architecture' },
                  { tech: 'TypeScript', purpose: 'Type-safe development' },
                  { tech: 'Tailwind CSS v4', purpose: 'Utility-first styling system' },
                  { tech: 'Lucide React', purpose: 'Minimalist icon library' },
                  { tech: 'Vite', purpose: 'Fast development and build tooling' }
                ].map((item, i) => (
                  <div key={i} className={`grid grid-cols-2 divide-x divide-black border-t border-black ${visibleSections.has('tech') ? 'scroll-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="p-4">
                      <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>{item.tech}</p>
                    </div>
                    <div className="p-4">
                      <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>{item.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Core Features */}
        <section className="py-12 md:py-20" ref={featuresRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('features') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>core features</Heading>

            <div className="space-y-12">
              <div className={`${visibleSections.has('features') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  1. Dynamic Event System
                </h3>
                <div className="space-y-3">
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    • 20+ unique office scenarios ranging from printer jams to surprise performance reviews
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    • Random event selection ensures unpredictable gameplay
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    • Multiple choice options with varying stat impacts for each decision
                  </p>
                </div>
              </div>

              <div className={`${visibleSections.has('features') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  2. Real-Time Stat Management
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Four interconnected metrics tracked simultaneously:
                </p>
                <div className="border border-black p-6 space-y-2">
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <span className="font-['Instrument_Sans:Medium',sans-serif]">Stress</span> | 0-100 | Game Over at ≥ 100 | Red
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <span className="font-['Instrument_Sans:Medium',sans-serif]">Chaos</span> | 0-100 | Game Over at ≥ 100 | Orange
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <span className="font-['Instrument_Sans:Medium',sans-serif]">Happiness</span> | 100-0 | Game Over at ≤ 0 | Green
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <span className="font-['Instrument_Sans:Medium',sans-serif]">Embarrassment</span> | 0-100 | Game Over at ≥ 100 | Purple
                  </p>
                </div>
              </div>

              <div className={`${visibleSections.has('features') ? 'scroll-fade-in-up delay-400' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  3. Corporate-Style Game Over Modal
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Designed to mimic authentic HR termination emails with:
                </p>
                <div className="space-y-2">
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Black header with monospace email metadata (FROM, TO, DATE, SUBJECT)
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Formal corporate language with dark humor
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Performance metrics displayed in a professional table format
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Official signature with company slogan: "Your suffering is our success"
                  </p>
                </div>
              </div>

              <div className={`${visibleSections.has('features') ? 'scroll-fade-in-up delay-500' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  4. Minimalist Design System
                </h3>
                <div className="border border-black p-6 space-y-3">
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    ❌ No blue colors allowed
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    ✅ Only black (#000000) and white (#ffffff)
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    ✅ Single sans-serif font family
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    ✅ Everything visible without scrolling (except Game Over modal)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Design Decisions */}
        <section className="py-12 md:py-20" ref={designRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('design') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>design decisions</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`border border-black p-8 ${visibleSections.has('design') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  State Management
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  React's built-in useState hooks instead of external state libraries
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Rationale: Game state is localized to a single component, no need for global state management overhead
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('design') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Event Randomization
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Fisher-Yates shuffle approach through Math.random()
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Benefits: High replayability, prevents predictable patterns, easy to expand event pool
                </p>
              </div>

              <div className={`border border-black p-8 md:col-span-2 ${visibleSections.has('design') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Game Over Conditions
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Multi-metric failure system instead of single health bar
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Why this works: Creates strategic tension across four dimensions, forces players to balance competing priorities, more engaging than single-metric tracking
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Challenges & Solutions */}
        <section className="py-12 md:py-20" ref={challengesRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('challenges') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>challenges & solutions</Heading>

            <div className="space-y-8">
              {[
                {
                  title: 'Challenge 1: Figma Logo Integration',
                  problem: 'Imported SVG logo was distorted and off-center',
                  solution: 'Changed preserveAspectRatio to "xMidYMid meet", used exact aspect ratio for container, switched to relative positioning with flexbox centering'
                },
                {
                  title: 'Challenge 2: Modal Content Overflow',
                  problem: 'Game Over modal content was cut off on smaller screens',
                  solution: 'Added max-h-[90vh] overflow-y-auto to allow scrolling within the modal while preventing full-page scroll'
                },
                {
                  title: 'Challenge 3: Stat Bar Performance',
                  problem: 'Rapid stat updates caused visual jank',
                  solution: 'CSS transitions with easing functions (transition-all duration-300 ease-out)'
                },
                {
                  title: 'Challenge 4: Event Repetition',
                  problem: 'Same events appearing consecutively felt repetitive',
                  solution: 'Random selection from 20+ events reduces immediate repetition probability to ~5%'
                }
              ].map((item, i) => (
                <div key={i} className={`border border-black p-8 ${visibleSections.has('challenges') ? 'scroll-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 100}ms` }}>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="font-['Instrument_Sans:Medium',sans-serif]">Problem:</span> {item.problem}
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="font-['Instrument_Sans:Medium',sans-serif]">Solution:</span> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Results & Impact */}
        <section className="py-12 md:py-20" ref={resultsRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('results') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>results & impact</Heading>

            <div className="space-y-8">
              <div className={`${visibleSections.has('results') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  User Experience Wins
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Zero loading screens - Instant gameplay',
                    'No tutorial needed - Intuitive interface',
                    'High replayability - Random events + multiple endings',
                    'Mobile-friendly - Responsive design works on all devices',
                    'Accessible - High contrast black/white theme'
                  ].map((item, i) => (
                    <div key={i} className="border border-black p-4">
                      <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        ✅ {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`${visibleSections.has('results') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Performance Metrics
                </h3>
                <div className="border border-black p-8 space-y-2">
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Bundle Size: &lt; 150KB (optimized)
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • First Contentful Paint: &lt; 1 second
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • No external API calls: Pure frontend
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Zero runtime errors: Type-safe TypeScript
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Future Enhancements */}
        <section className="py-12 md:py-20" ref={futureRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('future') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>future enhancements</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Event Difficulty Scaling',
                'Achievement System',
                'Sound Effects',
                'Leaderboard (requires backend)',
                'Custom Event Editor',
                'Multiple Endings',
                'Stat Tooltips',
                'Mobile Haptics'
              ].map((item, i) => (
                <div key={i} className={`border border-black p-6 ${visibleSections.has('future') ? 'scroll-scale-in' : 'opacity-0'}`} style={{ animationDelay: `${i * 50}ms` }}>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    {i + 1}. {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Key Takeaways */}
        <section className="py-12 md:py-20" ref={takeawaysRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('takeaways') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>key takeaways</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className={`border border-black p-8 ${visibleSections.has('takeaways') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  What Worked Well
                </h3>
                <div className="space-y-2">
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Pure frontend approach eliminated deployment complexity
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Minimalist design created strong brand identity
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • TypeScript prevented runtime errors during development
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Component architecture made features easy to add/modify
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Corporate humor resonated with target audience
                  </p>
                </div>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('takeaways') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Lessons Learned
                </h3>
                <div className="space-y-2">
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Figma imports need careful aspect ratio management
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Modal overflow is a common issue - plan for scrollable content
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Random events need sufficient quantity (20+ minimum)
                  </p>
                  <p className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                    • Black & white constraints force creativity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Conclusion */}
        <section className="py-12 md:py-20" ref={conclusionRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('conclusion') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>conclusion</Heading>

            <div className="space-y-8">
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Office Apocalypse demonstrates how thoughtful design constraints (monochrome palette, no backend, minimalist UI) can actually enhance rather than limit creativity. By focusing on tight game mechanics, witty writing, and polished UI/UX, the project delivers an engaging experience that feels larger than its technical footprint.
              </p>

              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                The combination of React's component model, Tailwind's utility classes, and TypeScript's type safety created a robust foundation for rapid iteration. The result is a game that's fun to play, easy to maintain, and simple to extend.
              </p>

              <div className="border border-black p-8 text-center">
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] italic"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  "Your suffering is our success"
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mt-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  — Office Apocalypse Corp™
                </p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Navigation Section */}
        <section className="py-12 md:py-20">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <ArrowButton 
                text="back"
                onClick={() => navigate('/works')}
                direction="left"
                svgPaths={svgPathsArrow}
              />
            </div>
            <div>
              <ArrowButton 
                text="next project"
                onClick={() => navigate(getNextProjectRoute('Office Apocalypse'))}
                direction="right"
                svgPaths={svgPathsArrow}
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