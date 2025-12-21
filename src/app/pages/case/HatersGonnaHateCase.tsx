import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function HatersGonnaHateCase() {
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
  const solutionRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const challengesRef = useRef<HTMLDivElement>(null);
  const performanceRef = useRef<HTMLDivElement>(null);
  const futureRef = useRef<HTMLDivElement>(null);
  const learningsRef = useRef<HTMLDivElement>(null);
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
    const currentRefs = [heroRef, overviewRef, challengeRef, solutionRef, techStackRef, challengesRef, performanceRef, futureRef, learningsRef, conclusionRef];
    const currentIds = ['hero', 'overview', 'challenge', 'solution', 'techStack', 'challenges', 'performance', 'future', 'learnings', 'conclusion'];

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
                  Haters gonna hate ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* iPhone + Description Flex */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* iPhone Mock - Left Column */}
                <div className={`mx-auto lg:mx-0 ${visibleSections.has('hero') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`} style={{ width: '195px', height: '423px' }}>
                  <div 
                    className="relative w-[390px] aspect-[9/19.5] bg-black rounded-[50px] p-3 shadow-2xl origin-top-left"
                    style={{ transform: 'scale(0.5)' }}
                  >
                    
                    {/* Screen */}
                    <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden">
                      <iframe 
                        src="https://hatersgonnahate.figma.site"
                        className="w-full h-full border-0"
                        style={{ transform: 'scale(0.9)' }}
                        title="Haters Gonna Hate Game"
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

                {/* Description - Right Column */}
                <div className={`flex items-center ${visibleSections.has('hero') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Haters Gonna Hate is an interactive web application that allows users to "vandalize" portraits of infamous figures through digital graffiti, emoji stickers, and custom text. The application combines satirical art with an elegant user experience inspired by contemporary art galleries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Project Overview Section */}
        <section className="py-12 md:py-20" ref={overviewRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('overview') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>project information</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-8 ${visibleSections.has('overview') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    category
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Interactive Web Application / Digital Art
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    platform
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Web (Mobile-First)
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    technologies
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    React, TypeScript, Tailwind CSS, HTML5 Canvas
                  </p>
                </div>
              </div>

              <div className={`space-y-8 ${visibleSections.has('overview') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    status
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Production
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    date
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    December 2024
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
            <Heading level={2}>the challenge</Heading>

            <div className="space-y-8">
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Create a digital experience that allows users to express their frustration in a creative and cathartic way, while maintaining a sophisticated aesthetic that contrasts with the irreverent concept of "virtual vandalism."
              </p>

              <div className={`space-y-6 ${visibleSections.has('challenge') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <div className="border-l-2 border-black pl-6">
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Mobile-First Touch Interactions: Ensure precision in touch interactions for drawing on mobile devices
                  </p>
                </div>
                <div className="border-l-2 border-black pl-6">
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Responsive Canvas: Maintain correct image proportions without distortion across different screen sizes
                  </p>
                </div>
                <div className="border-l-2 border-black pl-6">
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Professional Drawing Tools: Implement brush, spray, eraser with intuitive controls
                  </p>
                </div>
                <div className="border-l-2 border-black pl-6">
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Complex State Management: Coordinate multiple layers (portrait, frame, canvas, stickers, text)
                  </p>
                </div>
                <div className="border-l-2 border-black pl-6">
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Elegant UX: Contrast the irreverent concept with minimalist and professional design
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
            <Heading level={2}>the solution</Heading>

            <div className="space-y-16">
              {/* Visual Architecture */}
              <div className={`${visibleSections.has('solution') ? 'scroll-fade-in-up delay-100' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Contemporary Art Gallery Aesthetic
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-black p-6">
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Neutral color palette (grays, whites) with blue-gray accent (#4585a1)
                    </p>
                  </div>
                  <div className="border border-black p-6">
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Ornate golden frames around black and white portraits
                    </p>
                  </div>
                  <div className="border border-black p-6">
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Modern, clean sans-serif typography
                    </p>
                  </div>
                  <div className="border border-black p-6">
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Minimalist design that highlights the content
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className={`${visibleSections.has('solution') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Key Features
                </h3>
                <div className="space-y-8">
                  <div className="border border-black p-8">
                    <h4 
                      className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Advanced Graffiti Tools
                    </h4>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Brush with smooth strokes and thickness control (1-50px), spray with realistic particle effect, eraser with variable size, custom circular color picker, and adjustable opacity.
                    </p>
                  </div>

                  <div className="border border-black p-8">
                    <h4 
                      className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Emoji Sticker System
                    </h4>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Gallery of pre-selected thematic emojis with intuitive drag-and-drop, two-finger scaling (pinch-to-zoom), touch gesture rotation, and individual deletion.
                    </p>
                  </div>

                  <div className="border border-black p-8">
                    <h4 
                      className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Advanced Text Tool
                    </h4>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Text addition via canvas click with complete editing panel: font selector, size control (12-72px), color picker, style options (Bold, Italic, Underline), text rotation (-180° to +180°), and shadow effect toggle.
                    </p>
                  </div>

                  <div className="border border-black p-8">
                    <h4 
                      className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Portrait Gallery & Export
                    </h4>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Navigation between multiple predefined portraits with smooth transitions, custom image upload with automatic grayscale conversion, undo system, clear canvas, and export final artwork as high-quality PNG.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Technology Stack Section */}
        <section className="py-12 md:py-20" ref={techStackRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('techStack') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>technology stack</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`border border-black p-8 ${visibleSections.has('techStack') ? 'scroll-scale-in delay-100' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Frontend Core
                </h4>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  React 18.3.1, TypeScript, Vite 6.3.5
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('techStack') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Styling & UI
                </h4>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Tailwind CSS 4.1.12, Radix UI, Lucide React
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('techStack') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Canvas & Graphics
                </h4>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  HTML5 Canvas API, Custom Canvas Hook
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('techStack') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Interactions & Animations
                </h4>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  React DnD 16.0.1, Motion (Framer Motion) 12.23.24
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Challenges Overcome Section */}
        <section className="py-12 md:py-20" ref={challengesRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('challenges') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>challenges overcome</Heading>

            <div className="space-y-8">
              <div className={`border border-black p-8 ${visibleSections.has('challenges') ? 'scroll-scale-in delay-100' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Touch Event Precision
                </h4>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Problem: Touch events don't automatically provide precise coordinates. Solution: Manual calculation of coordinates relative to canvas, getBoundingClientRect() for exact position, viewport to canvas coordinate conversion, and preventDefault() to avoid scrolling while drawing.
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('challenges') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Realistic Spray Effect
                </h4>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Problem: Create natural aerosol effect with canvas. Solution: Random particle algorithm, Gaussian distribution for dispersion, multiple points per frame with low opacity, and variable particle size.
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('challenges') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Canvas Export with HTML Layers
                </h4>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Problem: Stickers and texts were DOM elements, not part of the canvas. Solution: Temporary canvas for composition, manual re-rendering of stickers as images, programmatic application of text styles, and pixel copying from drawing canvas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Performance Metrics Section */}
        <section className="py-12 md:py-20" ref={performanceRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('performance') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>performance metrics</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`border border-black p-6 ${visibleSections.has('performance') ? 'scroll-scale-in delay-100' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  First Contentful Paint
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  &lt; 1.5s
                </p>
              </div>

              <div className={`border border-black p-6 ${visibleSections.has('performance') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Time to Interactive
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  &lt; 2.5s
                </p>
              </div>

              <div className={`border border-black p-6 ${visibleSections.has('performance') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Bundle Size
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  ~450KB (gzipped)
                </p>
              </div>

              <div className={`border border-black p-6 ${visibleSections.has('performance') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Lighthouse Score
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  95+ (Performance)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Future Improvements Section */}
        <section className="py-12 md:py-20" ref={futureRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('future') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>future improvements</Heading>

            <div className="space-y-12">
              <div className={`${visibleSections.has('future') ? 'scroll-fade-in-up delay-100' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Short Term
                </h4>
                <div className="space-y-3">
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ Layer system with reordering
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ More brush options (chalk, marker, highlighter)
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ Custom sticker template gallery
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ Additional portrait filters (sepia, contrast, brightness)
                  </p>
                </div>
              </div>

              <div className={`${visibleSections.has('future') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Medium Term
                </h4>
                <div className="space-y-3">
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ Backend for saving and sharing artwork
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ Public creation gallery
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ Like and comment system
                  </p>
                </div>
              </div>

              <div className={`${visibleSections.has('future') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Long Term
                </h4>
                <div className="space-y-3">
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ AI-powered portrait generation
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ Real-time multi-user collaboration
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    □ NFT minting of artwork
                  </p>
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

            <div className="space-y-6">
              <div className={`border-l-4 border-black pl-6 ${visibleSections.has('learnings') ? 'scroll-fade-in-left delay-100' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Canvas API is powerful but requires careful management: Synchronization between React state and canvas requires well-thought-out refs and effects.
                </p>
              </div>

              <div className={`border-l-4 border-black pl-6 ${visibleSections.has('learnings') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Touch events ≠ Mouse events: Mobile devices require specific event handling and prevention of default behaviors.
                </p>
              </div>

              <div className={`border-l-4 border-black pl-6 ${visibleSections.has('learnings') ? 'scroll-fade-in-left delay-300' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  HTML Layers + Canvas = Complexity: Combining DOM elements with canvas for export requires manual re-rendering.
                </p>
              </div>

              <div className={`border-l-4 border-black pl-6 ${visibleSections.has('learnings') ? 'scroll-fade-in-left delay-400' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Micro-interactions matter: Small visual feedback details make the difference in UX.
                </p>
              </div>

              <div className={`border-l-4 border-black pl-6 ${visibleSections.has('learnings') ? 'scroll-fade-in-left delay-500' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Mobile-first is not optional: In 2024, most users will access from mobile first.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Conclusion Section */}
        <section className="py-12 md:py-20" ref={conclusionRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('conclusion') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>conclusion</Heading>

            <div className="space-y-8">
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Haters Gonna Hate demonstrates how a satirical concept can be executed with technical excellence and sophisticated design. The application balances conceptual irreverence with visual elegance, creating a unique experience that invites creativity and expression.
              </p>

              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                The modular technical architecture, mobile-first approach, and attention to detail in UX position this project as a solid example of a modern interactive web application.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
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
                onClick={() => navigate(getNextProjectRoute('Haters gonna hate'))}
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