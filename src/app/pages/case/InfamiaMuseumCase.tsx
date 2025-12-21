import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function InfamiaMuseumCase() {
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
  const problemRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
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
    const currentRefs = [heroRef, overviewRef, problemRef, researchRef, strategyRef, designRef, solutionRef, conclusionRef];
    const currentIds = ['hero', 'overview', 'problem', 'research', 'strategy', 'design', 'solution', 'conclusion'];

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
                  Infamia Museum ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* Description */}
              <div className={`${visibleSections.has('hero') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Infamia Museum is a digital archive dedicated to the figures who have shaped history through corruption, deception, and unethical behavior. By curating a collection of artistic expressions inspired by these infamous characters, the project transforms outrage into creative resistance.
                </p>
              </div>

              {/* MacBook Pro Mockup - Dual Screens */}
              <div className={`w-full mt-12 ${visibleSections.has('hero') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* First MacBook */}
                  <div className="w-full">
                    <div className="relative w-full bg-[#1a1a1a] rounded-t-[20px] p-4 shadow-2xl">
                      {/* Top Bar */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[100px] h-[6px] bg-[#0a0a0a] rounded-full"></div>
                      
                      {/* Screen */}
                      <div className="relative w-full aspect-[16/10] bg-white rounded-[8px] overflow-hidden mt-2">
                        <iframe 
                          src="https://embed.figma.com/proto/12QPqED2SrAO6hhTCa6pZd/INFAMIA-MUSEUM?page-id=1%3A25247&node-id=1-25267&scaling=contain&content-scaling=fixed&starting-point-node-id=1%3A25465&hide-ui=1&embed-host=share"
                          className="w-full h-full border-0"
                          style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}
                          title="Infamia Museum Platform - Screen 1"
                          allow="microphone; autoplay"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    
                    {/* Bottom Base */}
                    <div className="w-full h-[20px] bg-[#e0e0e0] rounded-b-[8px] shadow-lg"></div>
                    <div className="w-[200px] h-[8px] bg-[#d0d0d0] mx-auto rounded-b-[4px]"></div>
                  </div>

                  {/* Second MacBook */}
                  <div className="w-full">
                    <div className="relative w-full bg-[#1a1a1a] rounded-t-[20px] p-4 shadow-2xl">
                      {/* Top Bar */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[100px] h-[6px] bg-[#0a0a0a] rounded-full"></div>
                      
                      {/* Screen */}
                      <div className="relative w-full aspect-[16/10] bg-white rounded-[8px] overflow-hidden mt-2">
                        <iframe 
                          src="https://embed.figma.com/proto/gPQmyTp7QVz5pSKIKQ4JSr/INFAMIA-PRESENT?page-id=1%3A25247&node-id=202-3293&scaling=contain&content-scaling=fixed&starting-point-node-id=202%3A3293&hide-ui=1&embed-host=share"
                          className="w-full h-full border-0"
                          style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}
                          title="Infamia Museum Platform - Screen 2"
                          allow="microphone; autoplay"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    
                    {/* Bottom Base */}
                    <div className="w-full h-[20px] bg-[#e0e0e0] rounded-b-[8px] shadow-lg"></div>
                    <div className="w-[200px] h-[8px] bg-[#d0d0d0] mx-auto rounded-b-[4px]"></div>
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
              <div className={`space-y-8 ${visibleSections.has('overview') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
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
                    Digital Archive & Online Exhibition
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
                    ELISAVA | Editorial Design Master
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
                    publication
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Summer 2023
                  </p>
                </div>
              </div>

              <div className={`space-y-10 ${visibleSections.has('overview') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Concept & Approach
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Infamia Museum challenges the idea that art should only reflect beauty and virtue. Instead, it embraces anger as a valid and powerful emotion, using visual storytelling to expose injustice. The project serves as both a critique and a reminder that power ultimately belongs to the people, echoing the message of Patti Smith's song, People Have the Power.
                  </p>
                  
                  <h4 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Curatorial Themes:
                  </h4>
                  <ul className="space-y-4">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Scoundrels & Thieves: Artistic exploration of historical and contemporary figures known for corruption and betrayal.
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      The Politics of Anger: How frustration and rage can be transformed into impactful artistic statements.
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Power & Resistance: Highlighting how art has historically been used as a form of protest and activism.
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Digital Narratives: Use of online platforms to create an accessible, interactive, and evolving archive.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className={`w-full mt-8 ${visibleSections.has('overview') ? 'scroll-fade-in-up delay-400' : 'opacity-0'}`}>
              <ImageWithFallback 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/ITEM-PORT/infamis-2.png?raw=true"
                alt="Infamia Museum - Overview & Curatorial Themes"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Problem Statement Section */}
        <section className="py-12 md:py-20" ref={problemRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('problem') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>problem statement</Heading>

            <div className={`${visibleSections.has('problem') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Traditional museum experiences often fail to engage younger audiences with historical content. Digital platforms about controversial historical figures typically lack the balance between educational value and user engagement. The challenge was to create a platform that presents sensitive historical content in an accessible, engaging way while maintaining scholarly integrity and encouraging critical thinking about history and its impact on contemporary society.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Research Section */}
        <section className="py-12 md:py-20" ref={researchRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('research') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>UX research insights</Heading>

            <div className="space-y-10">
              <div className={`${visibleSections.has('research') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  User Research & Target Audience
                </h3>
                <p 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Primary Users:
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Activists, artists, researchers, and individuals interested in social justice and digital archiving.
                </p>

                <p 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  User Needs:
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Users seek an engaging, interactive, and informative platform that allows them to explore, contribute, and reflect on historical and contemporary figures of infamy.
                </p>

                <p 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Pain Points:
                </p>
                <ul className="space-y-4 mb-10">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Difficulty accessing well-structured information on corrupt figures.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Lack of interactive elements in digital archives.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Need for a visually compelling interface that enhances storytelling.
                  </li>
                </ul>

                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Usability Testing
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Conducted 5 remote usability tests with participants from diverse backgrounds (activists, students, and artists).
                </p>
                <ul className="space-y-4 mb-10">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    80% of users found the navigation intuitive, but some sections needed clearer categorization.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Users appreciated the «Hell's Wall» feature but suggested adding more context on each figure.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Some participants felt overwhelmed by text-heavy content and requested more interactive elements (videos, infographics).
                  </li>
                </ul>

                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Accessibility Considerations
                </h3>
                <ul className="space-y-4">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Ensured high contrast design for readability.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Added alt text for all images to improve screen reader compatibility.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Improved keyboard navigation to make the site more inclusive.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Strategy Section */}
        <section className="py-12 md:py-20" ref={strategyRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('strategy') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>strategy</Heading>

            <div className="space-y-10">
              <div className={`${visibleSections.has('strategy') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Design Approach
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Analyzed existing digital museum platforms and historical education sites to identify best practices and opportunities for innovation.
                </p>
                <h4 
                  className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px] mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Key Insights:
                </h4>
                <ul className="space-y-4">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Users prefer visual-first content with supporting text.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Interactive timelines enhance understanding of historical context.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Clear navigation structures improve content discovery.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Responsive design is critical for mobile learners.
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

            <div className="space-y-16">
              <div className={`${visibleSections.has('design') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Information Architecture
                </h3>
                <ul className="space-y-4">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Home page with featured exhibitions
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Gallery view with filter and search functionality
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Individual profile pages with multimedia content
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Interactive timeline visualization
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Related content and cross-references
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    About section with project context
                  </li>
                </ul>
              </div>

              <div className={`${visibleSections.has('design') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Visual Design System
                </h3>
                <ul className="space-y-4">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Dark, dramatic color palette with accent colors
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Typography hierarchy for content readability
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Grid-based layout for consistency
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    High-quality imagery and visual documentation
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Smooth transitions and micro-interactions
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Responsive components for all screen sizes
                  </li>
                </ul>
              </div>

              <div className={`${visibleSections.has('design') ? 'scroll-fade-in-up delay-400' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Prototyping & Testing
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Created interactive prototypes and tested with target users. Key findings led to iterative improvements:
                </p>
                <ul className="space-y-4">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Simplified navigation menu for better discoverability
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Added breadcrumb navigation for orientation
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Enhanced contrast for text readability
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Improved mobile touch targets and spacing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Final Solution Section */}
        <section className="py-12 md:py-20" ref={solutionRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('solution') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>final solution</Heading>

            <div className={`${visibleSections.has('solution') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
              <ul className="space-y-4">
                <li 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <span className="text-[#8B8B8B]">—</span>
                  Immersive digital museum experience with curated content
                </li>
                <li 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <span className="text-[#8B8B8B]">—</span>
                  Interactive timeline for historical context
                </li>
                <li 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <span className="text-[#8B8B8B]">—</span>
                  Comprehensive search and filter functionality
                </li>
                <li 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <span className="text-[#8B8B8B]">—</span>
                  Rich multimedia content integration
                </li>
                <li 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <span className="text-[#8B8B8B]">—</span>
                  Fully responsive design across all devices
                </li>
              </ul>
            </div>

            {/* Image Placeholder */}
            <div className={`w-full ${visibleSections.has('solution') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
              <ImageWithFallback 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/ITEM-PORT/infamis-3.png?raw=true"
                alt="Infamia Museum - Final Solution & Platform Features"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Conclusion Section */}
        <section className="py-12 md:py-20" ref={conclusionRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('conclusion') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>conclusion</Heading>

            <div className="space-y-10">
              <div className={`${visibleSections.has('conclusion') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Infamia Museum reclaims anger as a force for artistic and social transformation. By documenting and exposing figures of infamy, the project serves as both a critique of power and an assertion of collective agency. The people still have the power—it's time to use it.
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Visitors to the digital archive are encouraged to interact, contribute, and reflect on the figures and themes presented. The project is not just a static collection but a call to awareness and action—reminding viewers that corruption thrives in silence, and art can be a tool to challenge it.
                </p>

                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Next Steps
                </h3>
                <ul className="space-y-4">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Enhance interactivity: Implement hover-triggered tooltips for quick information access.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Expand multimedia content: Introduce short-form video narratives.
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Improve content categorization: Use tags and filters for better content discovery.
                  </li>
                </ul>
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
                onClick={() => navigate(getNextProjectRoute('Infamia Museum'))}
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