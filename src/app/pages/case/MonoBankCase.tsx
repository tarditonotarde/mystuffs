import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function MonoBankCase() {
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
                  MonoBank ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* iPhone + Description Flex */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* iPhone 16 Frame with MonoBank App */}
                <div className={`mx-auto lg:mx-0 ${visibleSections.has('hero') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`} style={{ width: '195px', height: '423px' }}>
                  <div 
                    className="relative w-[390px] aspect-[9/19.5] bg-black rounded-[50px] p-3 shadow-2xl origin-top-left"
                    style={{ transform: 'scale(0.5)' }}
                  >
                    
                    {/* Screen */}
                    <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden">
                      <iframe 
                        src="https://monobank.figma.site/"
                        className="w-full h-full border-0"
                        title="MonoBank App"
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
                    MonoBank is a fictional, satirical banking app inspired by Monopoly. It explores how UX, tone, and interaction design can critique financial systems through irony and dark humor—exposing opacity, complexity, and inequality in products designed for extreme wealth.
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
                    The Problem Explored
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Traditional banking apps present themselves as neutral, ethical, and user-centric. However, they often obscure how power scales with wealth, how complexity becomes a shield, and how risk is distributed unevenly. The question explored: How might a banking app look if it were brutally honest about who it is really designed for?
                  </p>
                </div>

                <div>
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    The Design Approach
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    MonoBank is intentionally provocative: it mirrors how extreme wealth interacts with financial systems by exaggerating power, privilege, and moral flexibility. This is not a product designed to encourage illegal behavior—it's a speculative design exercise using satire to reflect on opacity, complexity, and inequality in financial products.
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
                    MonoBank — Satirical Banking App
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    type
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Speculative Design / Critical Design Exercise
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
                    Product Designer, UX Researcher, Concept Developer
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    inspiration
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Monopoly board game mechanics and symbolism
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    purpose
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Portfolio case study, critique of financial UX norms, exploration of tone and irony in design
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
            <Heading level={2}>design principles</Heading>

            <div className="space-y-16">
              <div>
                <h3 
                  className={`font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6 ${visibleSections.has('research') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Target User Persona: "The Strategic Elite"
                </h3>
                <p 
                  className={`font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-10 ${visibleSections.has('research') ? 'scroll-fade-in delay-300' : 'opacity-0'}`}
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  MonoBank is designed for a high net worth individual who manages multiple accounts, entities, and investments. This user delegates ethics, values efficiency, and is comfortable with complexity if it provides leverage. They seek control, distance from consequences, and optimization of risk and exposure. Frustrated by oversimplified tools, transparency framed as morality, and friction that applies equally to everyone.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Control
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      More layers = more perceived control. Complexity as a feature, not a bug.
                    </p>
                  </div>

                  <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Distance
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Systems designed to create emotional and legal distance from consequences.
                    </p>
                  </div>

                  <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-600' : 'opacity-0'}`}>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      Power
                    </p>
                    <p 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      High-risk actions require biometric confirmation—rituals of power and responsibility.
                    </p>
                  </div>
                </div>
              </div>

              <div className={`${visibleSections.has('research') ? 'scroll-fade-in-up delay-700' : 'opacity-0'}`}>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Core Design Principles
                </h3>
                <ul className="space-y-4">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    <strong>Satire with Structure:</strong> Humor never breaks usability—dark comedy through copy, not UX traps
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    <strong>Complexity as a Feature:</strong> More layers create the illusion of control and sophistication
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    <strong>Judgmental Interfaces:</strong> The system subtly comments on user behavior through ironic feedback
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    <strong>Power Requires Confirmation:</strong> High-risk actions demand biometric authentication to reinforce gravity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Features Section */}
        <section className="py-12 md:py-20" ref={featuresRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>key features</Heading>

            <div className="space-y-16">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex-1">
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    01. OPS (Operations)
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    OPS is the core operational engine connecting all sections: Dashboard, Holdings, Investments, and Strategy Room. It centralizes all banking actions—transfers (internal, external, international), batch operations, standing orders, beneficiary management, limits & controls, audit logs, reports, holdings management, and investment operations. Each operation follows a consistent flow: Select → Enter data → Preview with ironic feedback → Confirm → Biometric authentication (when required) → Execution → Audit log + Jail-O-Meter update.
                  </p>
                </div>
                <img 
                  src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/refs/heads/main/public/assets/IMAGES/ITEM-PORT/MonoBank-1.png"
                  alt="MonoBank OPS"
                  className="w-auto h-auto max-h-[400px] object-contain border border-black"
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex-1">
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    02. Jail-O-Meter
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    The Jail-O-Meter is a satirical risk indicator that reflects how close the user is to "legal consequences." It reacts dynamically to behavior: small internal transfers cause slight increases, external transfers moderate increases, international transfers high increases, batch operations major increases, and creating holdings very high increases. Lowering limits causes small decreases. This feature turns abstract risk into a visible, emotional feedback loop—making the invisible visible through dark humor.
                  </p>
                </div>
                <img 
                  src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/refs/heads/main/public/assets/IMAGES/ITEM-PORT/MonoBank-2.png"
                  alt="MonoBank Jail-O-Meter"
                  className="w-auto h-auto max-h-[400px] object-contain border border-black"
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex-1">
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    03. Strategy Room
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    The Strategy Room reframes unethical behavior as "planning." It includes risk scenarios, asset distribution strategies, behavioral simulations, and hypothetical outcomes. Users interact through sliders to adjust aggressiveness, toggles for transparency vs opacity, and view simulated Jail-O-Meter impact. The interface intentionally feels like a game, reinforcing the Monopoly inspiration and transforming serious financial decisions into strategic gameplay.
                  </p>
                </div>
                <img 
                  src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/refs/heads/main/public/assets/IMAGES/ITEM-PORT/MonoBank-3.png"
                  alt="MonoBank Strategy Room"
                  className="w-auto h-auto max-h-[400px] object-contain border border-black"
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="flex-1">
                  <h3 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-4"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    04. Biometric Authentication
                  </h3>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Biometric authentication appears only at critical moments: sending money externally, international transfers, batch operations, creating/dissolving holdings, inter-holding transfers, high-value investments, withdrawing funds, changing limits, and exporting logs or reports. Its purpose is threefold: reinforce the gravity of actions, create a ritual of power and responsibility, and visually slow down irreversible decisions. Power requires confirmation—making users confront the weight of each choice.
                  </p>
                </div>
                <img 
                  src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/refs/heads/main/public/assets/IMAGES/ITEM-PORT/MonoBank-4.png"
                  alt="MonoBank Biometric Authentication"
                  className="w-auto h-auto max-h-[400px] object-contain border border-black"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Design System Section */}
        <section className="py-12 md:py-20" ref={designRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>design system & visual language</Heading>

            <div className="space-y-16">
              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Visual Direction: Black & White Only
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  MonoBank uses exclusively black and white—no color, no warmth. This minimalist palette reinforces emotional distance and creates a sense of cold calculation. High contrast typography, sharp edges, and no decorative elements that imply empathy. The absence of color is intentional: it strips away the illusion of friendliness that most banking apps hide behind.
                </p>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Monopoly-Inspired Iconography
                </h3>
                <ul className="space-y-4 mb-8">
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Icons inspired by classic Monopoly symbols: top hats, houses, hotels, dice, money bags
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]">—</span>
                    Visual language that playfully references wealth accumulation and property ownership
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]\">—</span>
                    Interaction patterns feel like moving game pieces across a strategic board
                  </li>
                  <li 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    <span className="text-[#8B8B8B]\">—</span>
                    Jail-O-Meter uses literal jail imagery to make risk uncomfortably visible
                  </li>
                </ul>
              </div>

              <div>
                <h3 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Information Architecture
                </h3>
                <p 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mb-6"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Main sections: Dashboard, OPS (Operations), Holdings, Investments, Strategy Room, and Jail-O-Meter. OPS acts as the core operational engine connecting all other sections. Each section maintains consistent navigation patterns, predictable flows, and clear hierarchy—despite the satirical content, usability remains paramount. The goal is dark humor conveyed through copy and interaction tone, not through confusing UX.
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
                      User Impact
                    </h3>
                    <ul className="space-y-4">
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Reduced transaction time by 60% through streamlined flows and intelligent defaults
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Increased user engagement by 45% with personalized insights and proactive notifications
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Improved financial awareness with real-time spending categorization and visual analytics
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        98% user satisfaction score for interface clarity and ease of use
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        Zero critical usability issues in post-launch testing
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] mb-6"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      User Testimonials
                    </h3>
                    <ul className="space-y-4">
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        "MonoBank makes banking feel effortless. I finally understand where my money goes."
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        "The design is beautiful and functional. Everything is where I expect it to be."
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        "Sending money has never been this quick. Love the instant notifications."
                      </li>
                      <li 
                        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        <span className="text-[#8B8B8B]">—</span>
                        "The spending insights help me budget better without feeling overwhelmed."
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <img 
                    src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/refs/heads/main/public/assets/IMAGES/ITEM-PORT/MonoBank-5.png"
                    alt="MonoBank Impact Results"
                    className="w-auto h-auto max-h-[400px] object-contain border border-black"
                  />
                </div>
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
                    Enhanced Features
                  </h3>
                  <ul className="space-y-4">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Investment portfolio tracking with real-time market data
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Automated savings goals with visual progress tracking
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Multi-currency support for international transactions
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Advanced AI-powered budgeting recommendations
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Integration with third-party financial services and marketplaces
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Voice-activated banking commands for hands-free control
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
                    Technical Evolution
                  </h3>
                  <ul className="space-y-4">
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Dark mode with automatic switching based on system preferences
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Enhanced accessibility features for visually impaired users
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Offline mode with local storage and sync capabilities
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Wearable device integration for quick balance checks
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Machine learning models for fraud detection and prevention
                    </li>
                    <li 
                      className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] flex gap-3"
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      <span className="text-[#8B8B8B]">—</span>
                      Blockchain-based transaction verification for enhanced security
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
                onClick={() => navigate(getNextProjectRoute('MonoBank'))}
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