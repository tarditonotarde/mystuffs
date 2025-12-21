import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function GuzStudioCase() {
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
  const processRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
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
    const currentRefs = [heroRef, overviewRef, processRef, resultsRef, conclusionRef];
    const currentIds = ['hero', 'overview', 'process', 'results', 'conclusion'];

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
                  Guz Studio ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* Description */}
              <div className={`${visibleSections.has('hero') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Guz Studio is a creative agency specializing in graphic design, branding, and digital experiences. The goal of this project was to develop a distinctive brand identity and positioning for Guz Studio, setting it apart in a competitive creative industry.
                </p>
              </div>

              {/* Hero Visual */}
              <div className={`w-full ${visibleSections.has('hero') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                <div className="w-full flex justify-center">
                  <img 
                    src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/ITEM-PORT/guz-1.png?raw=true"
                    alt="Guz Studio Branding"
                    className="w-full md:max-w-[300px] h-auto object-contain"
                  />
                </div>
              </div>

              {/* Additional Context */}
              <div className={`${visibleSections.has('hero') ? 'scroll-fade-in-up delay-400' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Claudia Tardito led the design and strategic elements to create a modern, professional, and visually engaging brand that reflected the studio's innovative spirit and creative expertise.
                </p>
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
                    About the Project
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Guz Studio is a creative agency specializing in graphic design, branding, and digital experiences. The goal of this project was to develop a distinctive brand identity and positioning for Guz Studio, setting it apart in a competitive creative industry.
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
                    Brand Design & Positioning
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    client
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Guz Studio
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
                    Brand Designer & Strategist
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
                    2015
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Design Process Section */}
        <section className="py-12 md:py-20" ref={processRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('process') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>design process</Heading>

            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Brand Concept & Positioning
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Understanding Guz Studio's values and vision to craft a brand that communicated creativity, innovation, and professionalism.
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Visual Identity Design
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    A logo with clean lines, bold typography, and minimalist aesthetics to ensure timelessness and adaptability.
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Logo Design
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Simple yet memorable, with subtle details that reflected creativity and dynamism.
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Color Palette & Typography
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Professional and creative color schemes, paired with legible typography that maintained a creative flair.
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-600' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Brand Application
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Visual identity applied to business cards, stationery, and the website for a cohesive brand experience.
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-700' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Website & Digital Presence
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    A modern, user-friendly website showcasing services and portfolio, aligned with the studio's identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Visual */}
        <section className="py-12 md:py-20">
          <div className="w-full">
            <div className="w-full flex justify-center">
              <img 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/ITEM-PORT/guz-2.png?raw=true"
                alt="Guz Studio Logo"
                className="w-full md:max-w-[300px] h-auto object-contain"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Results Section */}
        <section className="py-12 md:py-20" ref={resultsRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('results') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>results</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className={`border border-black p-8 ${visibleSections.has('results') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  🚀
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  A distinctive and professional brand identity that communicated Guz Studio's creative expertise
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('results') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  🚀
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Clear positioning within the design industry, setting the studio apart from competitors
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('results') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  🚀
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Increased brand visibility and recognition, both locally and internationally
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('results') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  🚀
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  A strong online and offline presence that helped the studio build a loyal client base
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
                The Guz Studio brand design project successfully created a strong visual identity and positioning strategy that elevated the studio's presence in the competitive creative market.
              </p>

              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Through thoughtful design and strategic branding, Claudia Tardito helped craft a brand that was modern, professional, and aligned with the studio's values and vision.
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
                onClick={() => navigate(getNextProjectRoute('Guz St.'))}
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