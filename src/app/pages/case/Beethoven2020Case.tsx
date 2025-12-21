import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function Beethoven2020Case() {
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
        <section className="py-12 md:py-20" ref={heroRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('hero') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <div className="flex flex-col gap-8">
              <div className="py-[30px]">
                <h1 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[28px] md:text-[36px] lg:text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Beethoven 2020 ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* Description + Video Preview */}
              <div className="flex flex-col gap-8">
                {/* Description Text */}
                <div className={`${visibleSections.has('hero') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    The Beethoven 2020 project presented Beethoven's music through a Latin American lens, connecting global festivals and cultural events. Claudia Tardito led the art direction, brand identity, and web design, creating a digital and visual experience that embodied the project's mission and ideals.
                  </p>
                </div>

                {/* Visual Placeholder */}
                <div className={`w-full ${visibleSections.has('hero') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                  <video 
                    className="w-full h-auto rounded-lg"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/beethoven-1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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
                    Goals
                  </h3>
                  <ul className="space-y-4">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Create a contemporary visual identity honoring Beethoven's legacy while appealing to modern audiences
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Design cohesive brand materials spanning digital, print, and event applications
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Bridge classical music tradition with contemporary design aesthetics
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Engage younger audiences with accessible and vibrant communication materials
                    </li>
                  </ul>
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
                    Art Direction, Brand & Web Design
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
                    Corporación RAMA | Municipio de Zapallar
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    author
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Claudia Tardito
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
                    2019-2020
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
                  Design Challenge
                </h3>
                <p 
                  className={`font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-10 ${visibleSections.has('research') ? 'scroll-fade-in delay-300' : 'opacity-0'}`}
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  The challenge was to honor a 250-year musical legacy while creating something fresh and relevant. I researched Beethoven's era, his revolutionary impact on music, and how contemporary audiences engage with classical culture today.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Heritage
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Understanding Beethoven's historical significance and cultural impact across generations
                    </p>
                  </div>

                  <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Audience
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Researching how to engage both classical music enthusiasts and new audiences
                    </p>
                  </div>

                  <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-600' : 'opacity-0'}`}>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Aesthetic
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Balancing classical elegance with bold contemporary design language
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${visibleSections.has('research') ? 'scroll-fade-in-up delay-700' : 'opacity-0'}`}>
                <iframe
                  src="https://heyzine.com/flip-book/b2239f76da.html"
                  className="w-full h-[500px] md:h-[600px] lg:h-[700px] border-0"
                  title="Beethoven 2020 Flipbook"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Design Execution Section */}
        <section className="py-12 md:py-20" ref={designRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>design execution</Heading>

            <div className="space-y-16">
              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Visual Identity
                </h3>
                <ul className="space-y-4 mb-6">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Created a bold logomark combining musical notation with modern geometry
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Developed a vibrant color palette inspired by the energy of Beethoven's compositions
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Established typographic hierarchy balancing classical elegance with contemporary readability
                  </li>
                </ul>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Editorial & Print Materials
                </h3>
                <ul className="space-y-4 mb-8">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Designed commemorative posters featuring dynamic compositions and bold typography
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Created program booklets and exhibition catalogs with engaging layouts
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Produced branded merchandise including notebooks, tote bags, and promotional materials
                  </li>
                </ul>
                <ImageWithFallback 
                  src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/ITEM-PORT/beethoven-2.png?raw=true"
                  alt="Beethoven 2020 Editorial & Print Materials"
                  className="w-full h-auto"
                />
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Event & Digital Communication
                </h3>
                <ul className="space-y-4 mb-8">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Developed event signage and wayfinding systems for concert venues and exhibitions
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Created social media templates and digital campaign assets
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Designed animated graphics for promotional videos and online content
                  </li>
                </ul>
                <ImageWithFallback 
                  src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/ITEM-PORT/beethoven-3.png?raw=true"
                  alt="Beethoven 2020 Event & Digital Communication"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Solution Section */}
        <section className="py-12 md:py-20" ref={featuresRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>key deliverables</Heading>

            <div className="space-y-16">
              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  01. Brand Identity System
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  A comprehensive visual identity system including logo variations, color specifications, typography standards, and application guidelines. The brand system was designed to work seamlessly across digital platforms, print materials, environmental graphics, and merchandise, ensuring consistent visual communication throughout the anniversary year.
                </p>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  02. Poster Campaign
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  A series of commemorative posters celebrating Beethoven's musical legacy through bold graphic design. Each poster explores a different aspect of his work—from his revolutionary symphonies to his intimate chamber music—using vibrant colors, dynamic compositions, and contemporary typography to make classical music visually accessible and exciting.
                </p>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  03. Editorial Publications
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Program booklets, exhibition catalogs, and commemorative publications featuring engaging layouts, informative content, and striking visual storytelling. These editorial pieces balance historical context with contemporary design, making Beethoven's story and musical innovations accessible to diverse audiences while maintaining visual coherence with the broader brand identity.
                </p>
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
                      Cultural Impact
                    </h3>
                    <ul className="space-y-4">
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Successfully bridged classical music heritage with contemporary visual culture
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Created accessible entry points for younger audiences to engage with classical music
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Generated widespread visibility across concert halls, museums, and public spaces
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Honored Beethoven's revolutionary spirit through equally bold visual design
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
                      Design Success
                    </h3>
                    <ul className="space-y-4">
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Cohesive brand system applied across 50+ touchpoints and materials
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Strong visual recognition throughout year-long celebration campaign
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Positive reception from both classical music community and design industry
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Demonstrated how heritage brands can be revitalized through modern design
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

        {/* Future Section */}
        <section className="py-12 md:py-20" ref={futureRef}>
          <div className="w-full flex flex-col gap-12">
            <div className="space-y-10">
              <div>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  The Beethoven 2020 project proved that classical culture and contemporary design can coexist powerfully. By honoring tradition while embracing bold visual expression, the brand identity successfully introduced Beethoven's genius to new generations while respecting the reverence of lifelong classical music enthusiasts.
                </p>
                <ImageWithFallback 
                  src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/ITEM-PORT/beethoven-4.png?raw=true"
                  alt="Beethoven 2020 Future Vision"
                  className="w-full h-auto mb-8"
                />
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  This cultural branding project challenged me to balance historical significance with contemporary relevance, demonstrating how thoughtful design can make heritage accessible without diluting its importance. The work stands as a testament to the timeless power of visual communication in celebrating artistic legacy.
                </p>
              </div>
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
                onClick={() => navigate(getNextProjectRoute('Beethoven 2020'))}
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