import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function LetrarteCase() {
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
  const impactRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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
    const currentRefs = [heroRef, overviewRef, researchRef, featuresRef, impactRef, galleryRef];
    const currentIds = ['hero', 'overview', 'research', 'features', 'impact', 'gallery'];

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
                  Editorial Letrarte ■ {typedText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
                </h1>
              </div>

              {/* Description + Visual Preview */}
              <div className="flex flex-col gap-8">
                {/* Description Text */}
                <div className={`${visibleSections.has('hero') ? 'scroll-fade-in-up delay-200' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Editorial Letrarte focuses on evaluating, editing, publishing, and marketing printed texts across various technological platforms. The company emphasizes regional research and narrative while offering a local alternative to foster the professionalization of editorial processes alongside regional authors. Editorial Letrarte also provides personalized services to authors in producing and promoting their literary works.
                  </p>
                </div>

                {/* Visual Placeholder */}
                <div className={`w-full ${visibleSections.has('hero') ? 'scroll-fade-in-up delay-300' : 'opacity-0'}`}>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe 
                      src="https://www.youtube.com/embed/N-GItWPfaQ0?autoplay=1&mute=1&loop=1&controls=0&playlist=N-GItWPfaQ0" 
                      className="absolute top-0 left-0 w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Editorial Letrarte Video"
                    />
                  </div>
                </div>

                {/* Mission Statement */}
                <div className={`${visibleSections.has('hero') ? 'scroll-fade-in-up delay-400' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    This initiative seeks to highlight the mission of Editorial Letrarte in nurturing Gabriela Mistral's school of thought, committing to critical, responsible, and creative education for social development.
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
                    Create a cohesive visual identity that reflects Editorial Letrarte's commitment to regional literary production, critical education, and cultural authenticity while maintaining professionalism across all editorial touchpoints.
                  </p>
                </div>
              </div>

              <div className={`space-y-8 ${visibleSections.has('overview') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>
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
                    Editorial Letrarte
                  </p>
                </div>

                <div>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    project type
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Medium',sans-serif] text-[14px] text-black tracking-[-0.42px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Editorial & Graphic Design
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
                    Design, Branding, Layout & Production
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
                    2010 – 2022
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Design Process Section */}
        <section className="py-12 md:py-20" ref={researchRef}>
          <div className={`w-full flex flex-col gap-12 ${visibleSections.has('research') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
            <Heading level={2}>design process</Heading>

            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-200' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Brand Identity Creation
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Developed a visual identity reflecting the mission and values of Editorial Letrarte, combining regional influences with modern aesthetics to convey cultural authenticity and professionalism
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-300' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Editorial Layout & Production
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Designed clean, impactful layouts for print and digital publications, ensuring each text remained engaging while respecting the author's narrative and style
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-400' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Typography & Graphic Design
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Selected typography and graphic elements that enhanced readability and reinforced the editorial brand's association with critical education and regional storytelling
                  </p>
                </div>

                <div className={`border border-black p-8 ${visibleSections.has('research') ? 'scroll-scale-in delay-500' : 'opacity-0'}`}>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[48px] text-black tracking-[-2.4px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Visual Consistency
                  </p>
                  <p 
                    className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] mt-3"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                  >
                    Applied the established brand identity across book covers, promotional items, and online content, ensuring cohesion across all touchpoints
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Results Section */}
        <section className="py-12 md:py-20" ref={featuresRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>results</Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="border border-black p-8">
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
                  Communicated Editorial Letrarte's commitment to regional literary production through a distinctive visual language
                </p>
              </div>

              <div className="border border-black p-8">
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
                  Enhanced recognition among authors and readers, fostering deeper connection with local identity
                </p>
              </div>

              <div className="border border-black p-8">
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
                  Elevated editorial processes with layouts that are both aesthetically pleasing and functional
                </p>
              </div>

              <div className="border border-black p-8">
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
                  Increased engagement with regional narratives, contributing to the professionalization of local literary work
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Gallery Section */}
        <section className="py-12 md:py-20" ref={galleryRef}>
          <div className="w-full flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ImageWithFallback 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/diaguita.png?raw=true"
                alt="Letrarte Ediciones - Diaguita"
                className="w-full h-auto object-cover"
              />
              <ImageWithFallback 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/dias.png?raw=true"
                alt="Letrarte Ediciones - Días"
                className="w-full h-auto object-cover"
              />
              <ImageWithFallback 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/padre.png?raw=true"
                alt="Letrarte Ediciones - Padre"
                className="w-full h-auto object-cover"
              />
              <ImageWithFallback 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/pajaro.png?raw=true"
                alt="Letrarte Ediciones - Pájaro"
                className="w-full h-auto object-cover"
              />
              <ImageWithFallback 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/poema.png?raw=true"
                alt="Letrarte Ediciones - Poema"
                className="w-full h-auto object-cover"
              />
              <ImageWithFallback 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/testigo.png?raw=true"
                alt="Letrarte Ediciones - Testigo"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Divider */}
        <SectionDivider />

        {/* Conclusion Section */}
        <section className="py-12 md:py-20" ref={impactRef}>
          <div className="w-full flex flex-col gap-12">
            <Heading level={2}>conclusion</Heading>

            <div className="space-y-8">
              <p 
                className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] leading-relaxed"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                The design work for Editorial Letrarte reflects its mission of fostering regional literary voices and contributing to the professionalization of editorial processes. By blending artistic and functional elements, the strategy gave the company a fresh and unified look, positioning it as a key player in cultural and educational development.
              </p>

              {/* Social Link */}
              <div className="flex items-center gap-3 pt-4">
                <span 
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  📌 More Info:
                </span>
                <a 
                  href="https://www.instagram.com/editorial_letrarte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px] hover:opacity-70 transition-opacity underline"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  @editorial_letrarte
                </a>
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
                onClick={() => navigate(getNextProjectRoute('Letrarte Ediciones'))}
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