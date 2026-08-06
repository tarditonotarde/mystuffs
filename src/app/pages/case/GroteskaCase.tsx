import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function LynchUniverseCase() {
  const navigate = useNavigate();
  const [animationKey, setAnimationKey] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [backToTopAnimKey, setBackToTopAnimKey] = useState(0);

  // Typewriter animation states
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'case study';

  // Scroll animation refs
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const marketingRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);

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

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Show/hide back to top button
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

  // Scroll animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const refs = [
      { ref: heroRef, name: 'hero' },
      { ref: overviewRef, name: 'overview' },
      { ref: challengeRef, name: 'challenge' },
      { ref: solutionRef, name: 'solution' },
      { ref: businessRef, name: 'business' },
      { ref: marketingRef, name: 'marketing' },
      { ref: impactRef, name: 'impact' },
    ];

    refs.forEach(({ ref, name }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections((prev) => new Set(prev).add(name));
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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setBackToTopAnimKey(prev => prev + 1);
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Header */}
        <section className="p-[0px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center gap-4">
              {/* Empty space */}
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
  <div
    className={`w-full flex flex-col gap-12 ${
      visibleSections.has("hero") ? "scroll-fade-in-up" : "opacity-0"
    }`}
  >
    <div className="flex flex-col gap-8">

      <div className="py-[30px]">
        <h1
          className="font-['Instrument_Sans:Regular',sans-serif] text-[28px] md:text-[36px] lg:text-[48px] text-black tracking-[-2.4px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Groteska ■ {typedText}
          <span
            className={`inline-block w-[2px] h-[1em] ml-1 ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundColor: "#000000",
              verticalAlign: "text-bottom",
            }}
          />
        </h1>
      </div>

      {/* iPhone + Description */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

        {/* iPhone */}
        <div
          className={`mx-auto lg:mx-0 ${
            visibleSections.has("hero")
              ? "scroll-fade-in-left delay-200"
              : "opacity-0"
          }`}
          style={{ width: "195px", height: "423px" }}
        >
          <div
            className="relative w-[390px] aspect-[9/19.5] bg-black rounded-[50px] p-3 shadow-2xl origin-top-left"
            style={{ transform: "scale(0.5)" }}
          >
            <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden">
              <iframe
                src="https://groteska.es"
                className="w-full h-full border-0"
                title="Groteska Mobile"
                allow="clipboard-write"
              />
            </div>

            <div className="absolute left-[-4px] top-[120px] w-[4px] h-[60px] bg-black rounded-l-lg"></div>
            <div className="absolute left-[-4px] top-[190px] w-[4px] h-[60px] bg-black rounded-l-lg"></div>
            <div className="absolute left-[-4px] top-[260px] w-[4px] h-[60px] bg-black rounded-l-lg"></div>
            <div className="absolute right-[-4px] top-[200px] w-[4px] h-[100px] bg-black rounded-r-lg"></div>
          </div>
        </div>

        {/* Description */}

        <div
          className={`flex items-center ${
            visibleSections.has("hero")
              ? "scroll-fade-in-right delay-300"
              : "opacity-0"
          }`}
        >
          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Fast fashion has made online shopping increasingly predictable.
            Endless product grids, aggressive promotions and interchangeable
            branding have transformed many fashion websites into almost identical
            experiences.

            <br />
            <br />

            Groteska was born as a response to that.

            <br />
            <br />

            Rather than creating another clothing store, I wanted to build a
            digital brand where culture becomes the product and storytelling
            becomes part of the shopping experience.

            <br />
            <br />

            Inspired by Mediterranean everyday life, local traditions and the
            humour of ordinary people, Groteska celebrates characters that are
            rarely considered iconic—the grandmother hanging laundry, neighbours
            chatting on plastic chairs, old cafés, handwritten shop signs and
            the beauty of imperfect places.

            <br />
            <br />

            The project combines branding, UX/UI design, creative direction,
            front-end development and editorial storytelling into one cohesive
            digital experience, proving that an independent fashion brand can
            compete through identity rather than volume.
          </p>
        </div>
      </div>

      {/* Desktop */}

      <div
        className={`w-[90%] mx-auto mt-8 ${
          visibleSections.has("hero")
            ? "scroll-fade-in-up delay-400"
            : "opacity-0"
        }`}
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <div
            className="absolute top-0 left-1/2 w-[200%] aspect-[16/10]"
            style={{
              transform: "translateX(-50%) scale(0.5)",
              transformOrigin: "top center",
            }}
          >
            <div className="relative w-full h-full bg-black rounded-[40px] p-8 shadow-2xl">
              <div className="relative w-full h-full bg-white rounded-[24px] overflow-hidden">
                <iframe
                  src="https://groteska.es"
                  className="w-full h-full border-0"
                  title="Groteska Desktop"
                  allow="clipboard-write"
                />
              </div>
            </div>
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
  <div
    className={`w-full flex flex-col gap-12 ${
      visibleSections.has("overview") ? "scroll-fade-in-up" : "opacity-0"
    }`}
  >
    <Heading level={2}>Overview</Heading>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

      {/* LEFT COLUMN */}

      <div
        className={`space-y-10 ${
          visibleSections.has("overview")
            ? "scroll-fade-in-left delay-200"
            : "opacity-0"
        }`}
      >
        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Groteska is a self-initiated Product Design project that explores
            how branding, storytelling and user experience can transform a
            traditional e-commerce website into a memorable digital product.

            <br />
            <br />

            Instead of competing through endless catalogues or constant
            discounts, the project focuses on creating emotional value.
            Every interaction was designed to communicate personality before
            encouraging conversion.

            <br />
            <br />

            Inspired by Mediterranean culture, analogue photography,
            neighbourhood traditions and nostalgic everyday scenes, the
            experience blends editorial layouts with modern UX principles to
            create a slower, more intentional way of discovering products.

            <br />
            <br />

            Beyond the visual identity, the project also involved building a
            scalable design system, multilingual architecture, responsive
            layouts and reusable components capable of supporting future
            collections without compromising consistency.

            <br />
            <br />

            Groteska became much more than an online store. It evolved into a
            digital ecosystem where branding, product design and commerce work
            together to create an experience people remember.
          </p>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Project Goals
          </h3>

          <ul className="space-y-3 list-disc list-inside">

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Create a memorable digital identity capable of differentiating an
              independent fashion brand in a saturated market.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Combine editorial storytelling with intuitive e-commerce
              navigation.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Design a scalable component system for future collections and
              multilingual content.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Demonstrate how branding, UX and front-end development can become
              part of a single product strategy.
            </li>

          </ul>

        </div>

      </div>

      {/* RIGHT COLUMN */}

      <div
        className={`space-y-8 ${
          visibleSections.has("overview")
            ? "scroll-fade-in-right delay-300"
            : "opacity-0"
        }`}
      >

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Role
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Product Designer

            <br />

            UX/UI Designer

            <br />

            Brand Designer

            <br />

            Creative Director

            <br />

            Front-end Developer
          </p>

        </div>

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Timeline
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            2026
          </p>

        </div>

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Status
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Live
          </p>

        </div>

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Responsibilities
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            UX Research

            <br />

            Wireframing

            <br />

            Design System

            <br />

            Responsive Design

            <br />

            Brand Identity

            <br />

            Front-end Development

            <br />

            Creative Direction

          </p>

        </div>

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Tools
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Figma

            <br />

            HTML

            <br />

            CSS

            <br />

            JavaScript

            <br />

            GitHub

            <br />

            Photoshop

            <br />

            Weavy

          </p>

        </div>

      </div>

    </div>

  </div>

</section>

        {/* Divider */}
        <SectionDivider />

{/* The Problem Section */}
<section className="py-12 md:py-20" ref={challengeRef}>
  <div
    className={`w-full flex flex-col gap-12 ${
      visibleSections.has("challenge")
        ? "scroll-fade-in-up"
        : "opacity-0"
    }`}
  >
    <Heading level={2}>The Problem</Heading>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

      {/* LEFT */}

      <div
        className={`space-y-10 ${
          visibleSections.has("challenge")
            ? "scroll-fade-in-left delay-200"
            : "opacity-0"
        }`}
      >

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Today's fashion e-commerce has become increasingly homogeneous.
            Most online stores follow the same formula: promotional banners,
            endless product grids, seasonal campaigns and generic shopping
            experiences focused almost exclusively on conversion.

            <br />
            <br />

            While this approach may optimise short-term sales, it often leaves
            little room for identity, storytelling or emotional engagement.
            Independent brands struggle to compete against large retailers
            because they cannot win on price, advertising budgets or product
            volume.

            <br />
            <br />

            The challenge was not simply designing another online shop.

            It was designing a digital experience capable of making people
            remember the brand before remembering the products.
          </p>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Design Challenge
          </h3>

          <ul className="space-y-3 list-disc list-inside">

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Create an e-commerce experience that feels editorial instead of transactional.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Build a memorable brand identity capable of standing out with a
              small product catalogue.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Balance expressive visual storytelling with usability and
              accessibility.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Design a scalable platform capable of supporting future
              collections without redesigning the entire experience.
            </li>

          </ul>

        </div>

      </div>

      {/* RIGHT */}

      <div
        className={`space-y-10 ${
          visibleSections.has("challenge")
            ? "scroll-fade-in-right delay-300"
            : "opacity-0"
        }`}
      >

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Research & Insights
          </h3>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            I analysed contemporary fashion brands ranging from independent
            labels to global retailers, studying their navigation patterns,
            visual language, storytelling techniques and purchase flows.

            <br />
            <br />

            Despite significant aesthetic differences, most websites shared
            remarkably similar interaction models. Products dominated every
            screen while the brand itself often became secondary.

            <br />
            <br />

            This revealed an opportunity: instead of optimising only for
            conversion, Groteska could optimise for memorability.
          </p>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Design Principles
          </h3>

          <ul className="space-y-3 list-disc list-inside">

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Story before product.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Personality before promotion.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Simplicity before complexity.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Long-term brand building instead of short-term campaigns.
            </li>

          </ul>

        </div>

      </div>

    </div>

  </div>

</section>

        {/* Divider */}
        <SectionDivider />

{/* Brand Strategy Section */}
<section className="py-12 md:py-20" ref={solutionRef}>
  <div
    className={`w-full flex flex-col gap-12 ${
      visibleSections.has("solution")
        ? "scroll-fade-in-up"
        : "opacity-0"
    }`}
  >

    <Heading level={2}>Brand Strategy</Heading>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

      {/* LEFT */}

      <div
        className={`space-y-10 ${
          visibleSections.has("solution")
            ? "scroll-fade-in-left delay-200"
            : "opacity-0"
        }`}
      >

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Before designing interfaces, I designed a point of view.

            <br />
            <br />

            Groteska isn't inspired by luxury fashion or runway culture.
            Instead, it celebrates ordinary people, neighbourhood traditions
            and the visual language that quietly defines Mediterranean life.

            <br />
            <br />

            Plastic chairs outside cafés.

            Hand-painted shop signs.

            Laundry hanging across narrow streets.

            Grandmothers watching everything from their balconies.

            Elderly men debating football.

            Summer afternoons that feel frozen in time.

            <br />
            <br />

            These everyday moments became the foundation of the entire visual
            identity.
          </p>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Brand Manifesto
          </h3>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            We don't design for everyone.

            <br />
            <br />

            We design for people who still believe places have personality,
            who appreciate imperfect beauty and understand that culture is
            built through everyday rituals rather than trends.

            <br />
            <br />

            Groteska transforms ordinary moments into contemporary icons.
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div
        className={`space-y-10 ${
          visibleSections.has("solution")
            ? "scroll-fade-in-right delay-300"
            : "opacity-0"
        }`}
      >

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Visual Identity
          </h3>

          <ul className="space-y-3 list-disc list-inside">

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Editorial typography inspired by independent magazines.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Neutral colour palette allowing photography and illustrations
              to become the protagonists.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Analogue-inspired photography with flash, grain and natural
              imperfections.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Humorous copywriting inspired by Mediterranean culture.
            </li>

          </ul>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Design Decisions
          </h3>

          <ul className="space-y-3 list-disc list-inside">

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Minimal layouts prioritise storytelling over promotion.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Large amounts of whitespace increase the perceived quality of
              the products.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Motion is subtle and always reinforces navigation instead of
              becoming decoration.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Every collection tells its own story while remaining part of a
              larger visual system.
            </li>

          </ul>

        </div>

      </div>

    </div>

  </div>

</section>

        {/* Divider */}
        <SectionDivider />

{/* Design System Section */}
<section className="py-12 md:py-20" ref={businessRef}>
  <div
    className={`w-full flex flex-col gap-12 ${
      visibleSections.has("business")
        ? "scroll-fade-in-up"
        : "opacity-0"
    }`}
  >

    <Heading level={2}>Design System</Heading>

    <div className="space-y-12">

      <p
        className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
        style={{ fontVariationSettings: "'wdth' 100" }}
      >
        Rather than designing isolated pages, I built a modular design system
        capable of growing alongside the brand.

        Every component was designed to be reusable across future collections,
        editorial campaigns and multilingual content while maintaining visual
        consistency throughout the experience.

        The objective wasn't simply efficiency—it was creating a coherent
        identity that users could instantly recognise across every interaction.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] mb-4 tracking-[-1.2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Typography
          </h3>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Instrument Sans became the foundation of the visual language.
            Its neutrality allows illustrations, photography and copywriting
            to become the strongest expressive elements while maintaining
            excellent readability across all screen sizes.
          </p>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] mb-4 tracking-[-1.2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Grid System
          </h3>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            A consistent responsive grid allows every collection to maintain
            the same editorial rhythm regardless of screen size. Large margins
            and generous whitespace create breathing room and reinforce the
            premium feel of the brand.
          </p>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] mb-4 tracking-[-1.2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Components
          </h3>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Buttons, product cards, image layouts, navigation patterns,
            forms, language selectors and editorial sections were created as
            reusable components, allowing new collections to be launched
            without redesigning the interface.
          </p>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] mb-4 tracking-[-1.2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Motion
          </h3>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Motion was intentionally restrained. Instead of decorative
            animations, transitions provide spatial continuity, reinforce user
            feedback and support storytelling without distracting from the
            content.
          </p>

        </div>

      </div>

      <div>

        <h3
          className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] mb-6 tracking-[-1.2px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          System Principles
        </h3>

        <ul className="space-y-3 list-disc list-inside">

          <li
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Modular components designed for scalability.
          </li>

          <li
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Editorial hierarchy before commercial hierarchy.
          </li>

          <li
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Consistent spacing system across every page.
          </li>

          <li
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Mobile-first responsive behaviour.
          </li>

          <li
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Accessible navigation with multilingual support.
          </li>

        </ul>

      </div>

    </div>

  </div>

</section>

        {/* Divider */}
        <SectionDivider />

{/* Development Section */}
<section className="py-12 md:py-20" ref={marketingRef}>
  <div
    className={`w-full flex flex-col gap-12 ${
      visibleSections.has("marketing")
        ? "scroll-fade-in-up"
        : "opacity-0"
    }`}
  >

    <Heading level={2}>Development</Heading>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

      {/* LEFT */}

      <div
        className={`space-y-10 ${
          visibleSections.has("marketing")
            ? "scroll-fade-in-left delay-200"
            : "opacity-0"
        }`}
      >

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Rather than stopping at high-fidelity mockups, I developed the
            entire website from scratch to ensure every interaction behaved
            exactly as intended.

            <br />
            <br />

            Building the product allowed me to bridge the gap between design
            and implementation, validating design decisions through real user
            interaction instead of static prototypes.

            <br />
            <br />

            Every layout, animation and responsive behaviour was refined during
            development, turning the website into a living design system rather
            than a collection of screens.
          </p>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Front-end Development
          </h3>

          <ul className="space-y-3 list-disc list-inside">

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Semantic HTML architecture.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Modular CSS focused on scalability and maintainability.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Vanilla JavaScript interactions without unnecessary libraries.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Responsive layouts optimised for desktop, tablet and mobile.
            </li>

          </ul>

        </div>

      </div>

      {/* RIGHT */}

      <div
        className={`space-y-10 ${
          visibleSections.has("marketing")
            ? "scroll-fade-in-right delay-300"
            : "opacity-0"
        }`}
      >

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Product Features
          </h3>

          <ul className="space-y-3 list-disc list-inside">

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Fully responsive shopping experience.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Multilingual architecture (English, Spanish and Italian).
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Dynamic language switching without page reload.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Newsletter and contact forms connected through Formspree.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Optimised imagery and lightweight assets for faster loading.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Component-based architecture for future scalability.
            </li>

          </ul>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Performance & Accessibility
          </h3>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Performance was considered throughout the entire development
            process. Images were optimised, unnecessary dependencies were
            avoided and layouts were designed to remain lightweight across
            devices.

            <br />
            <br />

            Accessibility was also integrated into the interface through
            semantic structure, responsive typography, keyboard-friendly
            navigation and multilingual support, ensuring the experience
            remains clear and inclusive for a broad audience.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

        {/* Divider */}
        <SectionDivider />

{/* Reflection Section */}
<section className="py-12 md:py-20" ref={impactRef}>
  <div
    className={`w-full flex flex-col gap-12 ${
      visibleSections.has("impact")
        ? "scroll-fade-in-up"
        : "opacity-0"
    }`}
  >

    <Heading level={2}>Reflection</Heading>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

      {/* LEFT */}

      <div
        className={`space-y-10 ${
          visibleSections.has("impact")
            ? "scroll-fade-in-left delay-200"
            : "opacity-0"
        }`}
      >

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Groteska taught me that designing a product is not about producing
            beautiful interfaces—it's about making hundreds of interconnected
            decisions that together create a coherent experience.

            <br /><br />

            Every choice, from typography and navigation to photography,
            microcopy and performance, contributes to how people perceive a
            brand. Product Design lives in those small decisions.
          </p>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] mb-4 tracking-[-1.2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Key Learnings
          </h3>

          <ul className="space-y-3 list-disc list-inside">

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Brand identity becomes stronger when it informs every UX decision.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Building the product exposed opportunities impossible to discover
              in static mockups alone.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Simplicity usually requires more design effort than complexity.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Editorial storytelling can improve engagement without sacrificing
              usability.
            </li>

          </ul>

        </div>

      </div>

      {/* RIGHT */}

      <div
        className={`space-y-10 ${
          visibleSections.has("impact")
            ? "scroll-fade-in-right delay-300"
            : "opacity-0"
        }`}
      >

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] mb-4 tracking-[-1.2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Future Roadmap
          </h3>

          <ul className="space-y-3 list-disc list-inside">

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Expand the design system as new collections are released.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Introduce richer editorial content around Mediterranean culture,
              photography and craftsmanship.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Continue refining accessibility, performance and multilingual
              experiences.
            </li>

            <li
              className="font-['Instrument_Sans:Regular',sans-serif] text-[14px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Explore interactive storytelling and community-driven features
              that strengthen the relationship between the brand and its audience.
            </li>

          </ul>

        </div>

        <div>

          <h3
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] mb-4 tracking-[-1.2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Final Thoughts
          </h3>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Groteska continues to evolve as both a fashion brand and a design
            laboratory. It allows me to experiment with branding, UX, visual
            systems and front-end development in a real business context.

            <br /><br />

            More than an online store, it represents my approach to Product
            Design: combining strategy, storytelling, technology and culture to
            build digital experiences that people remember.
          </p>

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
              svgPaths={svgPathsArrow}
            />

            <ArrowButton
              text="next project"
              onClick={() => navigate(getNextProjectRoute('Lynch Universe Stream'))}
              direction="right"
              svgPaths={svgPathsArrow}
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