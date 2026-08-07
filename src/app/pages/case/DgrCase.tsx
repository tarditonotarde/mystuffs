import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ArrowButton, SectionDivider, Heading } from '../../components/design-system';
import { getNextProjectRoute } from '../../utils/projectNavigation';
import svgPaths from "../../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../../imports/svg-8varu1tqqx";
import svgPathsArrow from "../../../imports/svg-gazf6rc9gx";

export default function DgrCase() {
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
  <div className={`w-full flex flex-col gap-12 ${visibleSections.has('hero') ? 'scroll-fade-in-up' : 'opacity-0'}`}>
    <div className="flex flex-col gap-8">

      <div className="py-[30px]">
        <h1
          className="font-['Instrument_Sans:Regular',sans-serif] text-[28px] md:text-[36px] lg:text-[48px] text-black tracking-[-2.4px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          DGR Professional ■ {typedText}
          <span
            className={`inline-block w-[2px] h-[1em] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundColor: "#000000",
              verticalAlign: "text-bottom"
            }}
          />
        </h1>
      </div>

      {/* iPhone + Description */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

        {/* iPhone */}
        <div
          className={`mx-auto lg:mx-0 ${visibleSections.has('hero') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}
          style={{ width: "195px", height: "423px" }}
        >
          <div
            className="relative w-[390px] aspect-[9/19.5] bg-black rounded-[50px] p-3 shadow-2xl origin-top-left"
            style={{ transform: "scale(0.5)" }}
          >
            <div className="relative w-full h-full bg-white rounded-[42px] overflow-hidden">
              <iframe
                src="https://dgr-professional.com/"
                className="w-full h-full border-0"
                title="DGR Professional Mobile"
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
          className={`flex items-center ${visibleSections.has('hero') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}
        >
          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] text-black tracking-[-1.2px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            DGR Professional is a premium barber equipment brand focused on high-performance clippers, trimmers and shavers designed for professionals. The project transforms a traditional e-commerce website into a premium digital experience where storytelling, product design and engineering quality become central to the purchasing journey.
          </p>


        </div>


      </div>

                                                                                        <div className="flex flex-col md:flex-row justify-end items-center gap-8 mt-8 mb-8">
     

            <ArrowButton
              text="link project"
                onClick={() => window.open('https://dgr-professional.com/', '_blank')}
              direction="right"
              svgPaths={svgPathsArrow}
            />
          </div>



      {/* Desktop */}
      <div
        className={`w-[90%] mx-auto mt-8 ${visibleSections.has('hero') ? 'scroll-fade-in-up delay-400' : 'opacity-0'}`}
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <div
            className="absolute top-0 left-1/2 w-[200%] aspect-[16/10]"
            style={{
              transform: "translateX(-50%) scale(0.5)",
              transformOrigin: "top center"
            }}
          >
            <div className="relative w-full h-full bg-black rounded-[40px] p-8 shadow-2xl">
              <div className="relative w-full h-full bg-white rounded-[24px] overflow-hidden">
                <iframe
                  src="https://dgr-professional.com/"
                  className="w-full h-full border-0"
                  title="DGR Professional Desktop"
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
  <div className={`w-full flex flex-col gap-12 ${visibleSections.has('overview') ? 'scroll-fade-in-up' : 'opacity-0'}`}>

    <Heading level={2}>Overview</Heading>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

      <div className={`space-y-10 ${visibleSections.has('overview') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            DGR Professional is a premium grooming brand specializing in high-performance barber equipment. The website was conceived as more than an online store—it was designed to communicate craftsmanship, engineering and product quality through a refined digital experience.
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px] leading-relaxed mt-4"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            The project combines UX strategy, visual storytelling and responsive design to create a scalable platform capable of supporting future product launches, distributors and brand growth while reinforcing DGR's premium positioning.
          </p>


        </div>

      </div>

      <div className={`space-y-8 ${visibleSections.has('overview') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>

        <div>
          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Role
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            UX/UI Designer
            <br />
            Brand Experience Designer
            <br />
            Creative Direction
            <br />
            Design System
          </p>
        </div>

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Timeline
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            2025–2026
          </p>

        </div>

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Status
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Live
          </p>

        </div>

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Industry
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Professional Barber Equipment
          </p>

        </div>

        <div>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#8B8B8B] tracking-[-0.42px] mb-2"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Deliverables
          </p>

          <p
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-black tracking-[-0.42px]"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            UX Research
            <br />
            UX/UI Design
            <br />
            Design System
            <br />
            Responsive Website
            <br />
            Product Storytelling
            <br />
            Brand Experience
          </p>

        </div>

      </div>

    </div>

  </div>
</section>


{/* Divider */}
<SectionDivider />

{/* Research Section */}
<section className="py-12 md:py-20">

  <div className="w-full flex flex-col gap-12">

    <Heading level={2}>Research</Heading>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

      <div className="space-y-8">

        <p
          className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Before designing the experience, I explored how professional barbers
          evaluate grooming equipment online. Unlike consumer electronics,
          purchasing decisions are driven by reliability, ergonomics,
          long-term performance and peer recommendations rather than purely
          aesthetics.
        </p>

        <p
          className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] leading-relaxed tracking-[-0.42px]"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Most competitors communicate specifications first, while emotional
          value, craftsmanship and product confidence remain secondary.
          This revealed an opportunity to reposition DGR through storytelling
          instead of technical overload.
        </p>

      </div>

      <div className="space-y-8">

        <div>

          <p
            className="text-[#8B8B8B] text-[14px] mb-3"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Research Goals
          </p>

          <ul className="space-y-3 list-disc list-inside">

            <li className="text-[14px]">
              Understand how professionals compare barber tools.
            </li>

            <li className="text-[14px]">
              Identify friction within existing e-commerce experiences.
            </li>

            <li className="text-[14px]">
              Increase perceived product value before price becomes relevant.
            </li>

            <li className="text-[14px]">
              Build trust through design and product storytelling.
            </li>

          </ul>

        </div>

      </div>

    </div>

  </div>

</section>

<SectionDivider />

{/* Competitive Analysis */}

<section className="py-12 md:py-20">

<div className="w-full flex flex-col gap-12">

<Heading level={2}>Competitive Analysis</Heading>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

<div>

<p
className="text-[14px] leading-relaxed tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>

The premium barber market is highly competitive, but most websites rely on
similar visual patterns and specification-heavy product pages. The opportunity
for DGR was to differentiate through clarity, premium perception and
storytelling.

</p>

</div>

<div>

<div className="space-y-5">

<div className="border-b border-black pb-3 flex justify-between">
<span>Wahl Professional</span>
<span>Strong heritage</span>
</div>

<div className="border-b border-black pb-3 flex justify-between">
<span>BabylissPRO</span>
<span>Premium identity</span>
</div>

<div className="border-b border-black pb-3 flex justify-between">
<span>Gamma+</span>
<span>Innovation</span>
</div>

<div className="border-b border-black pb-3 flex justify-between">
<span>StyleCraft</span>
<span>Bold branding</span>
</div>

<div className="border-b border-black pb-3 flex justify-between">
<span>JRL</span>
<span>Technical innovation</span>
</div>

<div className="border-b border-black pb-3 flex justify-between font-medium">
<span>DGR Professional</span>
<span>Premium Digital Experience</span>
</div>

</div>

</div>

</div>

</div>

</section>

<SectionDivider />

{/* Design Principles */}

<section className="py-12 md:py-20">

<div className="w-full flex flex-col gap-12">

<Heading level={2}>Design Principles</Heading>

<div className="grid grid-cols-1 md:grid-cols-2 gap-12">

<div>

<h3 className="text-[24px] tracking-[-1.2px] mb-3">
Precision
</h3>

<p className="text-[14px] leading-relaxed">
Every interface element reinforces engineering quality through structure,
spacing and typography.
</p>

</div>

<div>

<h3 className="text-[24px] tracking-[-1.2px] mb-3">
Performance
</h3>

<p className="text-[14px] leading-relaxed">
Navigation is designed to reduce friction and support quick product discovery.
</p>

</div>

<div>

<h3 className="text-[24px] tracking-[-1.2px] mb-3">
Craftsmanship
</h3>

<p className="text-[14px] leading-relaxed">
Large imagery, generous whitespace and refined typography communicate premium
manufacturing quality.
</p>

</div>

<div>

<h3 className="text-[24px] tracking-[-1.2px] mb-3">
Professional Trust
</h3>

<p className="text-[14px] leading-relaxed">
Technical information is organised progressively to help professionals make
confident purchasing decisions.
</p>

</div>

</div>

</div>

</section>

<SectionDivider />

        {/* Divider */}
        <SectionDivider />

{/* The Challenge Section */}

<section className="py-12 md:py-20" ref={challengeRef}>

<div className={`w-full flex flex-col gap-12 ${visibleSections.has('challenge') ? 'scroll-fade-in-up' : 'opacity-0'}`}>

<Heading level={2}>The Challenge</Heading>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

<div className={`space-y-10 ${visibleSections.has('challenge') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>

<div>

<p
className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] tracking-[-0.42px] leading-relaxed"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Professional grooming products are frequently presented through technical
specifications alone. While battery capacity, blade materials and motor speed
are important, they rarely communicate why a tool feels premium in real
professional use.

The challenge was to transform a specification-driven catalogue into an
experience capable of communicating craftsmanship, confidence and product
quality before the purchasing decision.

</p>

</div>

<div>

<h3
className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Problems

</h3>

<ul className="space-y-3 list-disc list-inside">

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Premium products presented like generic marketplace listings.
</li>

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Limited emotional differentiation between competing brands.
</li>

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Technical specifications difficult to scan and compare.
</li>

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
No consistent digital experience reinforcing premium positioning.
</li>

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Need to increase customer confidence before purchase.
</li>

</ul>

</div>

</div>

<div className={`space-y-10 ${visibleSections.has('challenge') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>

<div>

<h3
className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Opportunity

</h3>

<p
className="text-[14px] tracking-[-0.42px] leading-relaxed mb-4"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Rather than competing on specifications alone, DGR had the opportunity to
position itself as a premium professional brand through experience design.

</p>

<ul className="space-y-3 list-disc list-inside">

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Elevate perceived product value.

</li>

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Communicate engineering quality visually.

</li>

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Create stronger emotional engagement.

</li>

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Improve product discoverability.

</li>

<li
className="text-[14px] tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Support distributors with a scalable digital platform.

</li>

</ul>

<p
className="text-[14px] tracking-[-0.42px] leading-relaxed mt-5"
style={{ fontVariationSettings: "'wdth' 100" }}
>

The objective was not simply to redesign an e-commerce website, but to build
a digital ecosystem capable of growing alongside the brand.

</p>

</div>

</div>

</div>

</div>

</section>

        {/* Divider */}
        <SectionDivider />

{/* Design Strategy Section */}

<section className="py-12 md:py-20" ref={solutionRef}>

<div className={`w-full flex flex-col gap-12 ${visibleSections.has('solution') ? 'scroll-fade-in-up' : 'opacity-0'}`}>

<Heading level={2}>Design Strategy</Heading>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

<div className={`space-y-10 ${visibleSections.has('solution') ? 'scroll-fade-in-left delay-200' : 'opacity-0'}`}>

<div>

<p
className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] tracking-[-0.42px] leading-relaxed"
style={{ fontVariationSettings: "'wdth' 100" }}
>

The experience was designed around one central principle:

</p>

<h3
className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mt-6 mb-6"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Every interaction should reinforce the perception of professional quality.

</h3>

<p
className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] tracking-[-0.42px] leading-relaxed"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Instead of presenting products as isolated catalogue items, the website
guides users through a visual narrative where photography, typography,
spacing and interaction design communicate craftsmanship before technical
specifications become relevant.

</p>

<p
className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] tracking-[-0.42px] leading-relaxed mt-5"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Every page was designed to increase confidence, simplify comparison and
position DGR as a premium professional brand rather than another hardware
manufacturer.

</p>

</div>

</div>

<div className={`space-y-10 ${visibleSections.has('solution') ? 'scroll-fade-in-right delay-300' : 'opacity-0'}`}>

<div>

<h3
className="font-['Instrument_Sans:Regular',sans-serif] text-[24px] tracking-[-1.2px] mb-4"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Key Features

</h3>

<ul className="space-y-3 list-disc list-inside">

<li
className="text-[14px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Premium product storytelling.

</li>

<li
className="text-[14px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Large immersive product photography.

</li>

<li
className="text-[14px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Responsive desktop, tablet and mobile layouts.

</li>

<li
className="text-[14px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Scalable design system.

</li>

<li
className="text-[14px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Visual hierarchy focused on product comparison.

</li>

<li
className="text-[14px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Motion-enhanced interactions.

</li>

<li
className="text-[14px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Modular content architecture for future launches.

</li>

<li
className="text-[14px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>
Distributor-friendly product presentation.

</li>

</ul>

</div>

</div>

</div>

<div className="mt-20">

<Heading level={3}>UX Decisions</Heading>

<div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">

<div>

<h3
className="text-[22px] tracking-[-1px] mb-3"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Product-first Navigation

</h3>

<p className="text-[14px] leading-relaxed">

Products remain the primary navigation layer while supporting collections,
categories and educational content without increasing complexity.

</p>

</div>

<div>

<h3
className="text-[22px] tracking-[-1px] mb-3"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Progressive Information

</h3>

<p className="text-[14px] leading-relaxed">

Users discover benefits first, then explore technical specifications only
when they need additional details.

</p>

</div>

<div>

<h3
className="text-[22px] tracking-[-1px] mb-3"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Reduced Cognitive Load

</h3>

<p className="text-[14px] leading-relaxed">

Whitespace, typography and modular layouts simplify comparison while
improving readability across the entire experience.

</p>

</div>

<div>

<h3
className="text-[22px] tracking-[-1px] mb-3"
style={{ fontVariationSettings: "'wdth' 100" }}
>

Scalable Components

</h3>

<p className="text-[14px] leading-relaxed">

Every product page follows the same design language, allowing future
collections to be added consistently without redesigning the platform.

</p>

</div>

</div>

</div>

<div className="mt-24">

<Heading level={3}>Design System</Heading>

<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">

<div>

<p className="text-[14px] leading-relaxed">

The project evolved into a reusable design system supporting future product
launches, campaigns and distributor experiences while maintaining a
consistent premium identity.

</p>

</div>

<div>

<ul className="space-y-3 list-disc list-inside">

<li>Typography System</li>

<li>Responsive Grid</li>

<li>Product Cards</li>

<li>Feature Sections</li>

<li>CTA Components</li>

<li>Navigation Patterns</li>

<li>Technical Specification Modules</li>

<li>Reusable Layout Templates</li>

</ul>

</div>

</div>

</div>

</div>

</section>

        {/* Divider */}
        <SectionDivider />

{/* Business Impact */}

<section className="py-12 md:py-20" ref={businessRef}>

<div className={`w-full flex flex-col gap-12 ${visibleSections.has('business') ? 'scroll-fade-in-up' : 'opacity-0'}`}>

<Heading level={2}>Business Impact</Heading>

<p
className="text-[14px] leading-relaxed tracking-[-0.42px]"
style={{ fontVariationSettings: "'wdth' 100" }}
>

The redesign positions DGR Professional as more than an online store.
It establishes a scalable digital ecosystem that supports commercial growth,
strengthens brand perception and creates a consistent premium experience across
every customer touchpoint.

</p>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">

<div>

<h3 className="text-[24px] mb-4">
Premium Positioning
</h3>

<p className="text-[14px] leading-relaxed">

Every interaction reinforces product quality through visual storytelling,
carefully structured information and refined presentation.

</p>

</div>

<div>

<h3 className="text-[24px] mb-4">
Sales Enablement
</h3>

<p className="text-[14px] leading-relaxed">

The platform supports distributors and retailers with clear product
information, consistent layouts and reusable visual assets.

</p>

</div>

<div>

<h3 className="text-[24px] mb-4">
Scalable Architecture
</h3>

<p className="text-[14px] leading-relaxed">

A modular design system enables future product launches without redesigning
the experience.

</p>

</div>

<div>

<h3 className="text-[24px] mb-4">
Conversion

</h3>

<p className="text-[14px] leading-relaxed">

Improved hierarchy, simplified navigation and progressive disclosure reduce
purchase uncertainty while increasing perceived product value.

</p>

</div>

</div>

</div>

</section>


        {/* Divider */}
        <SectionDivider />

<SectionDivider />

<section className="py-12 md:py-20" ref={marketingRef}>

<div className={`w-full flex flex-col gap-12 ${visibleSections.has('marketing') ? 'scroll-fade-in-up' : 'opacity-0'}`}>

<Heading level={2}>Results & Reflection</Heading>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

<div>

<h3 className="text-[24px] mb-5">
Project Outcomes
</h3>

<ul className="space-y-3 list-disc list-inside">

<li>Premium brand perception.</li>

<li>Consistent digital identity.</li>

<li>Scalable design system.</li>

<li>Improved product discoverability.</li>

<li>Better storytelling across the customer journey.</li>

<li>Distributor-ready product presentation.</li>

<li>Future-ready content architecture.</li>

</ul>

</div>

<div>

<h3 className="text-[24px] mb-5">
Reflection
</h3>

<p className="text-[14px] leading-relaxed">

Designing DGR Professional reinforced the importance of combining branding,
UX and product strategy into a single experience.

Rather than designing isolated pages, the objective was to build a digital
ecosystem capable of growing alongside the business while communicating
craftsmanship, precision and professional confidence through every
interaction.

</p>

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
              onClick={() => navigate(getNextProjectRoute('Dgr Professional'))}
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