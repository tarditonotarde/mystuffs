import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function MeanBotCase() {
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
                  Mean Bot ■ {typedText}
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
                        src="https://meanbot.figma.site"
                        className="w-full h-full border-0"
                        title="Mean Bot Chat"
                        allow="microphone; autoplay"
                      />
                    </div>

                    {/* Dynamic Island */}
                    <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full z-10"></div>
                  </div>
                </div>

                {/* Description - Right Column */}
                <div className={`flex items-center ${visibleSections.has('hero') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Mean Bot / Angel Bot is an innovative chatbot application with dual personality: a "Mean" mode with extreme sarcasm and dark humor, and an "Angel" mode with kind, motivational responses. The app automatically detects the user's language (Spanish/English) and responds with coherent personality, using dynamic gradients and fluid animations to create an immersive experience inspired by Facebook Messenger aesthetics.
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
                    About the Project
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    A chatbot with dual personality that users can toggle between: Mean Bot delivers biting sarcasm and dark humor, while Angel Bot provides motivational support and kindness. Built with React, TypeScript, and Motion (Framer Motion), featuring automatic language detection, dynamic gradients, emoji pickers, quick message chips, and smooth animations. The project explores emotional UX design and demonstrates how personality-driven interfaces can create memorable user experiences.
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
                    Playground / Experimental
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
                    UX/UI Design, Frontend Development
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    tech stack
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    React, TypeScript, Tailwind CSS, Motion
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
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Dual Personality System
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Designed two distinct conversational personas: Mean Bot with 50+ sarcastic responses and Angel Bot with 50+ motivational messages. Each mode features unique color gradients (dark red vs. blue), custom emoji sets, and tonally consistent language.
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Language Detection
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Implemented automatic Spanish/English detection using regex patterns for accented characters and keyword recognition. The bot seamlessly responds in the detected language, maintaining personality consistency across both idioms.
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Messenger-Inspired UX
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Created a familiar chat interface inspired by Facebook Messenger: gradient bubbles, fixed header with avatar, emoji picker, quick message chips, and smooth auto-scroll. Mobile-first design with full-screen mobile and centered 420px container on desktop.
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Motion Design System
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Leveraged Motion (Framer Motion) for coordinated entrance animations with staggered delays, spring physics for natural bounce effects, and smooth 700ms color transitions when toggling between modes. Every interaction provides immediate visual feedback.
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('process') ? 'scroll-scale-in delay-600' : 'opacity-0'} md:col-span-2`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Dynamic Visual Theming
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Developed a comprehensive theming system with CSS gradients, grain texture overlays, custom scrollbars, and SVG avatars that change dynamically. Mean Mode features dark red gradients (#8B0000 → #DC143C) while Angel Mode uses blue (#1E40AF → #60A5FA), creating distinct emotional atmospheres.
                  </p>
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
            <Heading level={2}>key features</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className={`border border-black p-8 ${visibleSections.has('results') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Toggle Between Personalities
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Switch seamlessly between Mean Bot (😈 sarcastic) and Angel Bot (😇 motivational) with a single button. Entire UI transitions smoothly in 700ms, changing gradients, emojis, and message tone.
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('results') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Automatic Language Detection
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Type in Spanish or English—the bot automatically detects your language and responds accordingly. No settings needed, just start chatting naturally in your preferred language.
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('results') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Themed Emoji Picker
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  31 custom emojis per mode: Mean (😈💀🔥💔🤬) vs Angel (😇💙✨🌟🦋). No scroll needed—8-column grid with hover effects. Click any emoji to insert it directly into your message.
                </p>
              </div>

              <div className={`border border-black p-8 ${visibleSections.has('results') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Quick Message Chips
                </p>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  5 predefined messages for instant conversation starters: "Hola", "¿Cómo estás?", "Ayuda", "Proyecto", "Adiós". Gradient buttons with smooth hover effects and one-tap sending.
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
            <Heading level={2}>impact & learnings</Heading>

            <div className="space-y-8">
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Mean Bot / Angel Bot demonstrates how a simple concept—dual personality chatbot—can evolve into a rich, engaging experience through meticulous design and technical execution. The project explores emotional UX design, proving that personality-driven interfaces create memorable interactions. Built with React, TypeScript, Motion, and Tailwind CSS, it showcases modern frontend capabilities: fluid animations at 60fps, dynamic theming, multilingual support, and component-based architecture. Key learnings include the power of Motion for declarative animations, the flexibility of CSS gradients over images, and the importance of consistent personality reinforcement through every design detail. This playground project serves as a foundation for future explorations in AI personality design, conversational UX, and emotional technology.
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
                onClick={() => navigate(getNextProjectRoute('Mean Bot'))}
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