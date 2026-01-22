import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function ReadMeRightCase() {
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
                  Read Me Right! app ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* iPhone + Description Flex */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* iPhone 16 Frame with Read Me Right App */}
                <div className={`mx-auto lg:mx-0 ${visibleSections.has('hero') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`} style={{ width: '195px', height: '423px' }}>
                  <div 
                    className="relative w-[390px] aspect-[9/19.5] bg-black rounded-[50px] p-3 shadow-2xl origin-top-left"
                    style={{ transform: 'scale(0.5)' }}
                  >
                    
                    {/* Screen */}
                    <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden">
                      <iframe 
                        src="https://tarditonotarde.github.io/Readmeright/"
                        className="w-full h-full border-0"
                        title="Read Me Right App"
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
                    Read Me Right! is a provocative web app that connects users with literature based on their emotional state and existential damage. Through exactly 5 brutally honest questions presented in a mobile-first Tinder-style format, it generates 3 personalized book recommendations with dark humor justifications. The entire experience is irreverent, direct, and unfiltered, featuring a Memphis Design × Brutalismo aesthetic.
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
                    Book discovery platforms face critical challenges: decision fatigue from overwhelming options, generic algorithmic recommendations that ignore emotional context, boring interfaces without personality, and desktop-first experiences that don't match modern mobile consumption habits. Users want quick, honest, and personalized recommendations that reflect their current state of mind.
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
                    Read Me Right! is a quiz app that diagnoses your "emotional damage" and prescribes exactly 3 books that fit your current state. The experience is fast (5 questions, under 2 minutes), honest (no corporate filters), fun (gamified with dark humor), and shareable (viral-ready CTAs). Built with React, TypeScript, and Tailwind CSS, featuring a distinctive Memphis × Brutalismo design that stands out from generic book platforms.
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
                    Read Me Right! app
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
                    UX/UI & Frontend Dev
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
                    React Web App + TypeScript + Tailwind CSS v4 + Motion
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
                    Mobile-first quiz app with emotion-based book recommendations, dark humor copy, dynamic scoring algorithm, and social sharing functionality
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
                    2026
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
                  Through competitive analysis of Goodreads, Amazon, and StoryGraph, I identified key barriers: paralysis by analysis from too many choices, emotional disconnect from algorithmic recommendations, generic interfaces lacking personality, and desktop-first experiences not optimized for mobile discovery. Users expressed frustration with tools that don't consider their current emotional state when recommending books.
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
                      Readers aged 20-35 tired of corporate recommendations who want honest, emotionally-aware book suggestions without the BS
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
                      Traditional book platforms are boring, impersonal, and don't consider your emotional state when recommending books
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
                      A fast, honest, personality-driven quiz can provide better recommendations than generic algorithms
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
                    Brutally honest: No corporate filters, just real talk about books and emotional damage
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Zero friction: 5 questions, under 2 minutes, no login required
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Personality over perfection: Memphis × Brutalismo aesthetic that stands out
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Mobile-first with large touch targets and vibrant color-coded interactions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Key Features Section */}
        <section className="py-12 md:py-20" ref={featuresRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('features') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>key features</Heading>

            <div className="space-y-16">
              {/* Welcome Screen */}
              <div className={`${visibleSections.has('features') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  1. Welcome Screen: No BS Introduction
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  The welcome screen sets the tone immediately with provocative copy: "We don't fix you. We recommend books." Multi-color rotated titles, animated badges ("No right answers. Just red flags"), and a CTA that says "JUDGE ME, BUT MAKE IT LITERARY." Users know exactly what they're getting into—an honest, unfiltered experience.
                </p>
                <div className="flex justify-center">
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/readme-1.mp4"
                    className="w-full max-w-[250px] h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>

              {/* Quiz Interface */}
              <div className={`${visibleSections.has('features') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  2. Quiz Interface: Tinder Meets Existentialism
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Each of the 5 questions appears on its own screen with 4 brutally honest answer options. Questions evaluate emotional state ("How are you holding up today?"), energy level ("Your ideal reading posture is…"), tone preference ("Pick your mental flavor"), complexity tolerance ("How much effort can you tolerate?"), and genre ("What kind of damage are you in the mood for?"). Answers are randomized using Fisher-Yates shuffle to prevent bias. Progress bar includes a "No escape" badge for meta humor.
                </p>
                <div className="flex flex-col md:flex-row gap-6 md:gap-5 justify-center items-center">
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/readme-2.mp4"
                    className="w-full max-w-[250px] h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/readme-3.mp4"
                    className="w-full max-w-[250px] h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>

              {/* Loading Screen */}
              <div className={`${visibleSections.has('features') ? 'scroll-fade-in-up delay-400' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  3. Loading Screen: Building Anticipation
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  A 3-second loading screen displays rotating messages every 700ms: "Analyzing your emotional damage…", "This says more about you than you think.", "Your therapist will hear about this…" Three bouncing squares (no borders, pure brutalismo) and a pulsating yellow progress indicator maintain visual interest while the algorithm calculates personalized recommendations.
                </p>
                <div className="flex justify-center">
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/readme-4.mp4"
                    className="w-full max-w-[250px] h-auto object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>

              {/* Results & Sharing */}
              <div className={`${visibleSections.has('features') ? 'scroll-fade-in-up delay-500' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  4. Results & Social Sharing
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-8"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Results display exactly 3 books with covers, titles, authors, and dark humor justifications (80-120 characters each). Example: "For when you want to feel seen by a guy who literally killed someone because it was too sunny outside. Peak relatable." (The Stranger, Camus). Each book has a "Buy this bad decision" CTA linking directly to Amazon. Web Share API enables native sharing on mobile with WhatsApp/LinkedIn fallbacks on desktop. Copy includes: "Warning: Results may cause emotional damage."
                </p>
                <div className="flex justify-center">
                  <video 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/main/public/assets/IMAGES/ITEM-PORT/readme-5.mp4"
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

        {/* Architecture & Technical Stack Section */}
        <section className="py-12 md:py-20" ref={designRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>architecture & technical implementation</Heading>

            <div className="space-y-16">
              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Frontend Stack
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  React 18+ with TypeScript for type safety, Tailwind CSS v4 for utility-first styling with custom design tokens, Motion (Framer Motion) for fluid animations, and Lucide React for minimalist iconography. Vite as build tool for fast development and optimized production builds.
                </p>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Recommendation Algorithm
                </h3>
                <ul className="space-y-4 mb-8">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Multi-dimensional scoring system: Each answer generates scores across 5 dimensions (existential, sarcasm, darkness, effort, chaos)
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    60-book curated database: Each book has implicit requirements (e.g., "Infinite Jest" requires effort ≥ 3, darkness ≥ 2)
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Dynamic filtering with randomization: Compatible books are filtered by thresholds, then shuffled and limited to exactly 3 recommendations
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Fisher-Yates shuffle for answer randomization: Prevents bias from answer order while preserving original indices for scoring
                  </li>
                </ul>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Animation Strategy
                </h3>
                <ul className="space-y-4">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Screen transitions: AnimatePresence with fade + scale (0.15s duration, easeInOut) on black background to prevent white flashes
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Hover interactions: Scale 1.02 + translate (3px, 3px) on hover, scale 0.98 + translate (6px, 6px) on tap
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Staggered reveals: Delay indices × 0.2s for sequential card appearances
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Loading animation: 3 bouncing squares (infinite loop) + rotating messages every 700ms
                  </li>
                </ul>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Design System
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-4"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Memphis Design × Brutalismo aesthetic with 6 vibrant colors: Turquoise Retro (#14CEC7), Rosa Shocking (#FF006E), Amarillo Sol (#FFD60A), Violeta Profundo (#9D4EDD), Negro Tinta (#000814), Beige Papel (#FDF0D5). Typography: Rubik (700-900 weights) for display, Work Sans (400-700) for body. Elements: thick 3-6px borders, 6-8px hard shadows, -2deg to 5deg rotations, uppercase CTAs, and dynamic asymmetric compositions without decorative geometry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Impact & Metrics Section */}
        <section className="py-12 md:py-20" ref={impactRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('impact') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>impact & metrics</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className={`border border-black p-8 ${visibleSections.has('impact') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  ~95%
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Estimated completion rate (users who finish all 5 questions)
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('impact') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  ~90s
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Average time to complete (under 2-minute goal)
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('impact') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  60
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Unique books curated across existential, dark humor, and absurdist categories
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('impact') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  98/100
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Lighthouse Performance score (mobile-optimized)
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('impact') ? 'scroll-scale-in delay-600' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  ~180KB
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Initial load size (gzipped) for fast mobile performance
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('impact') ? 'scroll-scale-in delay-700' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  {'<2%'}
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Probability of repeating exact same 3 books on consecutive uses
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Lessons & Future Section */}
        <section className="py-12 md:py-20" ref={futureRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('future') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>lessons learned & future roadmap</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className={`space-y-10 ${visibleSections.has('future') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Technical Lessons
                  </h3>
                  <ul className="space-y-3">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Motion is powerful but use sparingly: Well-crafted animations matter more than quantity
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Mobile-first saves time: Designing for mobile first prevented desktop refactoring
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      TypeScript catches bugs early: Interfaces in book data prevented many runtime errors
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Tailwind v4 custom tokens: CSS variables provide maximum flexibility for design systems
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Design Lessons
                  </h3>
                  <ul className="space-y-3">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Constraints breed creativity: 6 colors forced better creative decisions than unlimited choices
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Personality {'>'} Perfection: Users forgive rough edges if personality is strong
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Copy is design: Book justifications are as important as visual layout
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Brutalism requires balance: Aggressive visuals need careful usability consideration
                    </li>
                  </ul>
                </div>
              </div>

              <div className={`space-y-10 ${visibleSections.has('future') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Phase 2: Backend Integration (Q2 2026)
                  </h3>
                  <ul className="space-y-3">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Supabase for result persistence and user analytics
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      A/B testing for copy variations and conversion optimization
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Expand to 100+ books with new categories (graphic novels, non-fiction)
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      ML-enhanced algorithm for better personalization over time
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Phase 3: Social & Monetization (Q3-Q4 2026)
                  </h3>
                  <ul className="space-y-3">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Compare results with friends and compatibility scoring
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Leaderboard of "most damaged" users (gamification with humor)
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Amazon affiliate links for monetization
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Partnerships with indie bookstores for local discovery
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
              svgPaths={{
                p3ecd4f00: svgPaths.p3ecd4f00,
                p8aff500: svgPaths.p8aff500
              }}
            />
            
            <ArrowButton 
              text="next project"
              onClick={() => navigate(getNextProjectRoute('Read Me Right!'))}
              direction="right"
              svgPaths={{
                p3ecd4f00: svgPaths.p3ecd4f00,
                p8aff500: svgPaths.p8aff500
              }}
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
