import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import svgPaths from "../../imports/svg-gazf6rc9gx";
import svgPathsIcons from "../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../imports/svg-8varu1tqqx";
import svgPathsLanguage from "../../imports/svg-ptd9s8x07g";
import svgPathsTheme from "../../imports/svg-u95vusejla";
import svgPathsLightMode from "../../imports/svg-w2mg1j23i3";
import svgPathsSmile from "../../imports/svg-qh6vzvzq0q";
import svgPathsDevil from "../../imports/svg-uqlnpcxu0j";
import imgUx5 from "figma:asset/47a3b0cc3f987ef875ceab353bd5ec75ee5ae161.png";
import imgUx6 from "figma:asset/b4441c3600013e07688cb85f41936971a26b00fc.png";
import imgUx7 from "figma:asset/493b08cb1dfdf4b7f3560a1360210a8d41dcd463.png";
import imgUx8 from "figma:asset/47ef43ef8f975472b72131b51e4d0a3f4b1a6432.png";

// Translations object
const translations = {
  EN: {
    greeting: "👋 Hey! I'm Claudia Tardito,",
    subtitle1: "a product designer.",
    subtitle2: "Welcome to my playgrounds…",
    subtitle3: "and yes, the occasional",
    greetingFunny: "💀 Sup. I'm Claudia Tardito,",
    subtitle1Funny: "a product designer.",
    subtitle2Funny: "Welcome to my therapy sessions…",
    subtitle3Funny: "I mean, the occasional",
    wordsFunny: ['disaster.', 'existential crisis.', 'procrastination.', 'imposter syndrome.', 'anxiety.', 'overthinking.', 'caffeine addiction.', 'burnout.', 'self-doubt.', 'panic.', 'stress.'],
    wordsNormal: ['mess.', 'experiments.', 'chaos.', 'magic.', 'mistakes.', 'fun.', 'spark.', 'madness.', 'coffee.', 'inspiration.', 'wonder.'],
    myWork: "my work",
    seeMore: "see more stuffs",
    itsMe: "it's me",
    itsmeIntro: "👋 Hi! I'm Claudia Tardito, a designer, researcher, and visual storyteller with a background in Art & Design and a Master's in Editorial Design.",
    itsmeBody: "With 10+ years of experience in branding, culture, and community, I now focus on UX/UI design, front-end development, and AI-driven applications — blending creativity, tech, and research to craft intuitive experiences.",
    itsmeEnd: "I love design",
    itsmeIntroFunny: "😬 So... I'm Claudia Tardito, a \"designer\" who somehow convinced people I know what I'm doing. Still have no idea how that happened.",
    itsmeBodyFunny: "With 10+ years of faking it till I make it, I now specialize in questioning every design decision, refreshing Figma obsessively, and pretending I understand AI — while crying internally over user feedback.",
    itsmeEndFunny: "I create design",
    itsmeWordsFunny: ['that nobody asked for.', 'that makes no sense.', 'to pay the bills.', 'because I have no choice.', 'to survive.'],
    itsmeWordsNormal: ['with purpose.', 'with intention.', 'that matters.', 'that makes sense.', 'with impact.'],
    myResume: "my resume",
    contact: "contact",
    menuHey: "hey!",
    menuMyWork: "my work",
    menuMoreStuffs: "more stuffs",
    menuItsMe: "it's me",
    menuContact: "contact",
    spotify: "spotify",
    linkedin: "linkedin",
    instagram: "instagram"
  },
  ES: {
    greeting: "👋 ¡Hola! Soy Claudia Tardito,",
    subtitle1: "diseñadora de producto.",
    subtitle2: "Bienvenido a mis campos de juego…",
    subtitle3: "y sí, el ocasional",
    greetingFunny: "💀 Hola. Soy Claudia Tardito,",
    subtitle1Funny: "diseñadora de producto.",
    subtitle2Funny: "Bienvenido a mis sesiones de terapia…",
    subtitle3Funny: "Quiero decir, el ocasional",
    wordsFunny: ['desastre.', 'crisis existencial.', 'procrastinación.', 'síndrome del impostor.', 'ansiedad.', 'sobrepensamiento.', 'adicción a la cafeína.', 'agotamiento.', 'duda personal.', 'pánico.', 'estrés.'],
    wordsNormal: ['desorden.', 'experimentos.', 'caos.', 'magia.', 'errores.', 'diversión.', 'chispa.', 'locura.', 'café.', 'inspiración.', 'asombro.'],
    myWork: "mi trabajo",
    seeMore: "ver más cosas",
    itsMe: "soy yo",
    itsmeIntro: "👋 ¡Hola! Soy Claudia Tardito, diseñadora, investigadora y narradora visual con formación en Arte & Diseño y un Máster en Diseño Editorial.",
    itsmeBody: "Con más de 10 años de experiencia en branding, cultura y comunidad, ahora me enfoco en diseño UX/UI, desarrollo front-end y aplicaciones impulsadas por IA — combinando creatividad, tecnología e investigación para crear experiencias intuitivas.",
    itsmeEnd: "Amo el diseño",
    itsmeIntroFunny: "😬 Bueno... Soy Claudia Tardito, una \"diseñadora\" que de alguna manera convenció a la gente de que sé lo que hago. Todavía no sé cómo pasó eso.",
    itsmeBodyFunny: "Con más de 10 años fingiendo hasta lograrlo, ahora me especializo en cuestionar cada decisión de diseño, actualizar Figma obsesivamente y fingir que entiendo la IA — mientras lloro internamente por el feedback de usuarios.",
    itsmeEndFunny: "Creo diseño",
    itsmeWordsFunny: ['que nadie pidió.', 'que no tiene sentido.', 'para pagar las cuentas.', 'porque no tengo opción.', 'para sobrevivir.'],
    itsmeWordsNormal: ['con propósito.', 'con intención.', 'que importa.', 'que tiene sentido.', 'con impacto.'],
    myResume: "mi cv",
    contact: "contacto",
    menuHey: "hey!",
    menuMyWork: "mi trabajo",
    menuMoreStuffs: "más cosas",
    menuItsMe: "soy yo",
    menuContact: "contacto",
    spotify: "spotify",
    linkedin: "linkedin",
    instagram: "instagram"
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const { theme, toggleTheme, colors } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [backToTopAnimKey, setBackToTopAnimKey] = useState(0);
  const [isFunnyMode, setIsFunnyMode] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'ES'>('EN');
  
  // Animation keys for each icon
  const [readMeRightAnimKey, setReadMeRightAnimKey] = useState(0);
  const [breakTheFrameAnimKey, setBreakTheFrameAnimKey] = useState(0);
  const [lynchUniverseAnimKey, setLynchUniverseAnimKey] = useState(0);
  const [monoBankAnimKey, setMonoBankAnimKey] = useState(0);
  const [beatBitsAnimKey, setBeatBitsAnimKey] = useState(0);
  const [chronoGoAnimKey, setChronoGoAnimKey] = useState(0);
  const [hertaAnimKey, setHertaAnimKey] = useState(0);
  const [seeMoreAnimKey, setSeeMoreAnimKey] = useState(0);
  const [resumeAnimKey, setResumeAnimKey] = useState(0);
  const [contactSpotifyAnimKey, setContactSpotifyAnimKey] = useState(0);
  const [contactLinkedInAnimKey, setContactLinkedInAnimKey] = useState(0);
  const [contactInstagramAnimKey, setContactInstagramAnimKey] = useState(0);
  const [contactResumeAnimKey, setContactResumeAnimKey] = useState(0);

  // Get current translations
  const t = translations[language];
  const words = isFunnyMode ? t.wordsFunny : t.wordsNormal;
  const itsmeWords = isFunnyMode ? t.itsmeWordsFunny : t.itsmeWordsNormal;

  // Typewriter animation state for hero
  const [currentText, setCurrentText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter animation state for "it's me"
  const [itsmeText, setItsmeText] = useState('');
  const [itsmeWordIndex, setItsmeWordIndex] = useState(0);
  const [itsmeIsDeleting, setItsmeIsDeleting] = useState(false);

  // Map project IDs to images
  const projectImages: { [key: string]: string } = {
    'ux-4': 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/readme.gif?raw=true',
    'ux-4b': 'https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/refs/heads/main/public/assets/IMAGES/MAIN-PORT/break.gif',
    'ux-4c': 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/lynch.gif?raw=true',
    'ux-5': 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/monobank.gif?raw=true',
    'ux-6': 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/beatbits.gif?raw=true',
    'ux-7': 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/chrono-go.gif?raw=true',
    'ux-8': 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/herta.gif?raw=true',
  };

  // Animation variants - OPTIMIZED FOR PERFORMANCE
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0, 
      x: -15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const socialButtonVariants = {
    hidden: { 
      opacity: 0, 
      x: 15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const dividerVariants = {
    hidden: { 
      scaleX: 0
    },
    visible: { 
      scaleX: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  // Function to generate random position
  const generateRandomPosition = () => {
    // Get viewport dimensions to keep image within bounds
    const maxX = window.innerWidth - 200; // Leave margin for image
    const maxY = window.innerHeight - 200;
    const minX = 100;
    const minY = 100;
    
    setImagePosition({
      x: Math.random() * (maxX - minX) + minX,
      y: Math.random() * (maxY - minY) + minY
    });
  };
  
  // Typing animation for hero section
  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Escribiendo
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Pausa antes de empezar a borrar
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        // Borrando
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Cambiar a la siguiente palabra
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setAnimationKey(prev => prev + 1); // Cambiar la clave de animación para reiniciar la animación
        }
      }
    }, isDeleting ? 50 : 100); // Borrar más rápido que escribir
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, wordIndex, words]);

  // Typing animation for "it's me" section
  useEffect(() => {
    const currentWord = itsmeWords[itsmeWordIndex];
    
    const timeout = setTimeout(() => {
      if (!itsmeIsDeleting) {
        // Escribiendo
        if (itsmeText.length < currentWord.length) {
          setItsmeText(currentWord.slice(0, itsmeText.length + 1));
        } else {
          // Pausa antes de empezar a borrar
          setTimeout(() => setItsmeIsDeleting(true), 2000);
        }
      } else {
        // Borrando
        if (itsmeText.length > 0) {
          setItsmeText(itsmeText.slice(0, -1));
        } else {
          // Cambiar a la siguiente palabra
          setItsmeIsDeleting(false);
          setItsmeWordIndex((prev) => (prev + 1) % itsmeWords.length);
        }
      }
    }, itsmeIsDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [itsmeText, itsmeIsDeleting, itsmeWordIndex, itsmeWords]);

  // Detectar scroll para cambiar el botón de menú
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar scroll para mostrar el botón de volver al inicio
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

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden transition-colors duration-300" style={{ backgroundColor: colors.bg }}>
      {/* Container with max width and centered */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Hero Section */}
        <section className="py-12 md:py-20 relative min-h-[85vh] max-h-[85vh] flex items-center justify-end">
          {/* Header Icons - Fixed sticky position at top left */}
          <div className="fixed top-4 left-6 md:left-12 lg:left-16 flex items-center gap-4 z-50">
            {/* Theme Toggle Icon */}
            <button 
              className="w-[36px] h-[36px] transition-colors [&_path]:hover:fill-[#8B8B8B]"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 119 119">
                  <path d={svgPathsLightMode.p2ae85040} fill={colors.text} className="transition-colors" />
                </svg>
              ) : (
                <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 129 119">
                  <g clipPath="url(#clip0_17_110_home)">
                    <path d={svgPathsTheme.p2ce5c980} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.p20a05a80} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.p5e82bd0} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.pd659200} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.p1bc0a740} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.pfcbdf00} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.pce3b500} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.p2dd9a880} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.p3db18480} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.p1da80500} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.p543a680} fill={colors.text} className="transition-colors" />
                    <path d={svgPathsTheme.p23cebb80} fill={colors.text} className="transition-colors" />
                  </g>
                  <defs>
                    <clipPath id="clip0_17_110_home">
                      <rect fill="white" height="118.831" width="128.742" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </button>
            
            {/* Smile Icon */}
            <button 
              className="w-[22px] h-[22px] transition-colors [&_path]:hover:fill-[#8B8B8B]"
              aria-label="Toggle funny mode"
              onClick={() => setIsFunnyMode(!isFunnyMode)}
            >
              <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox={isFunnyMode ? "0 0 86 85" : "0 0 82 91"}>
                <path clipRule="evenodd" d={isFunnyMode ? svgPathsDevil.p3a986080 : svgPathsSmile.p3335a500} fill={colors.text} fillRule="evenodd" className="transition-colors" />
              </svg>
            </button>

            {/* Language Toggle Button */}
            <div className="flex items-center gap-2">
              <button
                className="text-[14px] tracking-[-0.42px] transition-colors hover:!text-[#8B8B8B]"
                style={{ 
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontVariationSettings: "'wdth' 100",
                  color: colors.text
                }}
                onClick={() => setLanguage(language === 'EN' ? 'ES' : 'EN')}
                aria-label={language === 'EN' ? 'Cambiar a Español' : 'Switch to English'}
              >
                {language === 'EN' ? 'ES' : 'EN'}
              </button>
            </div>
          </div>

          {/* Intro text - positioned at bottom left */}
          <div className="absolute bottom-0 left-0 p-[0px]">
            <div className="leading-[1.1] text-[28px] md:text-[36px] lg:text-[48px] tracking-[-2.4px] transition-colors" style={{ fontFamily: 'Instrument Sans, sans-serif', fontVariationSettings: "'wdth' 100", color: colors.text }}>
              {isFunnyMode ? (
                <>
                  <p className="mb-0">{t.greetingFunny}</p>
                  <p className="mb-0">{t.subtitle1Funny}</p>
                  <p className="mb-0">{t.subtitle2Funny}</p>
                  <p>{t.subtitle3Funny} <span className="inline-block">{currentText}<span className="inline-block w-[2px] h-[1em] ml-[2px] align-middle" style={{ animation: 'blink 1s step-end infinite', backgroundColor: theme === 'dark' ? '#FFFFFF' : colors.text }}></span></span></p>
                </>
              ) : (
                <>
                  <p className="mb-0">{t.greeting}</p>
                  <p className="mb-0">{t.subtitle1}</p>
                  <p className="mb-0">{t.subtitle2}</p>
                  <p>{t.subtitle3} <span className="inline-block">{currentText}<span className="inline-block w-[2px] h-[1em] ml-[2px] align-middle" style={{ animation: 'blink 1s step-end infinite', backgroundColor: theme === 'dark' ? '#FFFFFF' : colors.text }}></span></span></p>
                </>
              )}
            </div>
          </div>

          {/* Circle graphic - positioned at top right, becomes menu button on scroll */}
          <div 
            className="relative"
            onMouseLeave={() => {
              if (isScrolled) setIsMenuOpen(false);
            }}
          >
            <button 
              className={`
                transition-all duration-500 ease-in-out group
                ${isScrolled 
                  ? 'fixed top-4 right-6 md:right-12 lg:right-16 z-50 w-[80px] h-[64px] cursor-pointer' 
                  : 'w-[247px] h-[196px] mb-8 cursor-default'
                }
              `}
              onMouseEnter={() => {
                setAnimationKey(prev => prev + 1);
                if (isScrolled) setIsMenuOpen(true);
              }}
              onClick={() => {
                if (isScrolled) setIsMenuOpen(prev => !prev);
              }}
            >
              <div className="flex items-center justify-center w-full h-full">
                <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 247 196">
                  {/* Trazo que se dibuja progresivamente sin opacidad */}
                  <path key={animationKey} className="animated-scribble-hover" d={svgPathsScribble.p9f31800} stroke={colors.text} strokeLinecap="round" strokeWidth="1" />
                </svg>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div 
                className={`
                  absolute shadow-lg transition-colors duration-300
                  ${isScrolled 
                    ? 'fixed top-[76px] z-50 left-1/2 -translate-x-1/2' 
                    : 'top-full right-0 mt-2'
                  }
                `}
                style={{
                  backgroundColor: colors.bg,
                  borderColor: colors.text,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  ...(isScrolled ? {
                    left: 'calc(100vw - (6 * 0.25rem) - 40px)',
                    transform: 'translateX(-50%)'
                  } : {})
                }}
              >
                <div className="flex flex-col" style={{ borderColor: colors.text }}>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-1 text-left text-[14px] tracking-[-0.42px] transition-colors whitespace-nowrap"
                    style={{ 
                      fontFamily: 'Instrument Sans, sans-serif', 
                      fontVariationSettings: "'wdth' 100",
                      color: colors.text,
                      borderBottomWidth: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: colors.text
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.text;
                      e.currentTarget.style.color = colors.bg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {t.menuHey}
                  </button>
                  <button
                    onClick={() => {
                      const sections = document.querySelectorAll('section');
                      const myWorkSection = Array.from(sections).find(section => 
                        section.querySelector('h2')?.textContent === t.myWork
                      );
                      myWorkSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-1 text-left text-[14px] tracking-[-0.42px] transition-colors whitespace-nowrap"
                    style={{ 
                      fontFamily: 'Instrument Sans, sans-serif', 
                      fontVariationSettings: "'wdth' 100",
                      color: colors.text,
                      borderBottomWidth: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: colors.text
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.text;
                      e.currentTarget.style.color = colors.bg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {t.menuMyWork}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/works');
                    }}
                    className="px-6 py-1 text-left text-[14px] tracking-[-0.42px] transition-colors whitespace-nowrap"
                    style={{ 
                      fontFamily: 'Instrument Sans, sans-serif', 
                      fontVariationSettings: "'wdth' 100",
                      color: colors.text,
                      borderBottomWidth: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: colors.text
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.text;
                      e.currentTarget.style.color = colors.bg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {t.menuMoreStuffs}
                  </button>
                  <button
                    onClick={() => {
                      const sections = document.querySelectorAll('section');
                      const itsMeSection = Array.from(sections).find(section => 
                        section.querySelector('h2')?.textContent === t.itsMe
                      );
                      itsMeSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-1 text-left text-[14px] tracking-[-0.42px] transition-colors whitespace-nowrap"
                    style={{ 
                      fontFamily: 'Instrument Sans, sans-serif', 
                      fontVariationSettings: "'wdth' 100",
                      color: colors.text,
                      borderBottomWidth: '1px',
                      borderBottomStyle: 'solid',
                      borderBottomColor: colors.text
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.text;
                      e.currentTarget.style.color = colors.bg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {t.menuItsMe}
                  </button>
                  <button
                    onClick={() => {
                      const sections = document.querySelectorAll('section');
                      const contactSection = Array.from(sections).find(section => 
                        section.querySelector('h2')?.textContent === t.contact
                      );
                      contactSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-1 text-left text-[14px] tracking-[-0.42px] transition-colors whitespace-nowrap"
                    style={{ 
                      fontFamily: 'Instrument Sans, sans-serif', 
                      fontVariationSettings: "'wdth' 100",
                      color: colors.text
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.text;
                      e.currentTarget.style.color = colors.bg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {t.menuContact}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Add keyframes for cursor blink */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          @keyframes drawCircle {
            0% {
              stroke-dashoffset: 3500;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          @keyframes drawIcon {
            0% {
              stroke-dashoffset: 200;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          .animated-scribble-hover {
            stroke-dasharray: 3500;
            stroke-dashoffset: 0;
            animation: drawCircle 2s ease-in-out forwards;
          }
          button:hover .animated-scribble-hover {
            animation: drawCircle 2s ease-in-out;
          }
          .animated-icon-path {
            stroke-dasharray: 200;
            stroke-dashoffset: 0;
            animation: drawIcon 1s ease-in-out forwards;
          }
        `}} />

        {/* Divider */}
        <motion.div 
          className="w-full h-px transition-colors duration-300 mb-2 mt-8 md:mb-3 md:mt-12" 
          style={{ backgroundColor: colors.text }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={dividerVariants}
        />

        {/* My Work Section */}
        <motion.section 
          className="min-h-[85vh] max-h-[85vh] flex flex-col justify-between relative p-[0px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
        >
          <motion.div variants={containerVariants}>
            <motion.h2 
              className="text-[24px] tracking-[-1.2px] mb-8 transition-colors duration-300" 
              style={{ fontFamily: 'Instrument Sans, sans-serif', fontVariationSettings: "'wdth' 100", color: colors.text }}
              variants={itemVariants}
            >
              {t.myWork}
            </motion.h2>
          </motion.div>

          {/* Floating image preview */}
          {hoveredProject && (
            <div 
              className="hidden lg:block fixed pointer-events-none z-10 transition-opacity duration-300"
              style={{ 
                left: `${imagePosition.x}px`, 
                top: `${imagePosition.y}px`,
              }}
            >
              <div className="w-[100px] h-[100px]">
                <img 
                  src={projectImages[hoveredProject]} 
                  alt={`${hoveredProject} preview`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <motion.div 
            className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-end justify-end lg:justify-end p-[0px]"
            variants={containerVariants}
          >
            {/* Featured Projects - stacked vertically */}
            <motion.div className="w-fit flex flex-col gap-3" variants={containerVariants}>
              {/* Lynch Universe Stream */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onMouseEnter={() => {
                  setLynchUniverseAnimKey(prev => prev + 1);
                  setHoveredProject('ux-4c');
                  generateRandomPosition();
                }}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate('/case/lynch-universe')}
                variants={projectVariants}
              >
                <div className="w-[24px] h-[24px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 25">
                    <path 
                      key={lynchUniverseAnimKey}
                      className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                      d={svgPathsIcons.p1da95340} 
                      stroke={colors.text}
                      strokeLinecap="round" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                </div>
                <p className="text-[24px] tracking-[-0.72px] transition-colors group-hover:!text-[#8B8B8B]" style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  Lynch Universe Stream
                </p>
              </motion.div>

              {/* Break the Frame */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onMouseEnter={() => {
                  setBreakTheFrameAnimKey(prev => prev + 1);
                  setHoveredProject('ux-4b');
                  generateRandomPosition();
                }}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate('/case/break-the-frame')}
                variants={projectVariants}
              >
                <div className="w-[24px] h-[23px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <path 
                      key={breakTheFrameAnimKey}
                      className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                      d={svgPathsIcons.p30b01d80} 
                      stroke={colors.text}
                      strokeLinecap="round" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                </div>
                <p className="text-[24px] tracking-[-0.72px] transition-colors group-hover:!text-[#8B8B8B]" style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  Break the Frame
                </p>
              </motion.div>

              {/* Read Me Right! */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onMouseEnter={() => {
                  setReadMeRightAnimKey(prev => prev + 1);
                  setHoveredProject('ux-4');
                  generateRandomPosition();
                }}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate('/case/read-me-right')}
                variants={projectVariants}
              >
                <div className="w-[24px] h-[27px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 28">
                    <path 
                      key={readMeRightAnimKey}
                      className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                      d={svgPaths.p19ff1980} 
                      stroke={colors.text}
                      strokeLinecap="round" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                </div>
                <p className="text-[24px] tracking-[-0.72px] transition-colors group-hover:!text-[#8B8B8B]" style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  Read Me Right!
                </p>
              </motion.div>

              {/* MonoBank */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onMouseEnter={() => {
                  setMonoBankAnimKey(prev => prev + 1);
                  setHoveredProject('ux-5');
                  generateRandomPosition();
                }}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate('/case/monobank')}
                variants={projectVariants}
              >
                <div className="w-[24px] h-[20px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 21">
                    <path 
                      key={monoBankAnimKey}
                      className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                      d={svgPathsIcons.p35507900} 
                      stroke={colors.text}
                      strokeLinecap="round" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                </div>
                <p className="text-[24px] tracking-[-0.72px] transition-colors group-hover:!text-[#8B8B8B]" style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  MonoBank
                </p>
              </motion.div>

              {/* BeatBits */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onMouseEnter={() => {
                  setBeatBitsAnimKey(prev => prev + 1);
                  setHoveredProject('ux-6');
                  generateRandomPosition();
                }}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate('/case/beatbits')}
                variants={projectVariants}
              >
                <div className="w-[24px] h-[22px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 23">
                    <path 
                      key={beatBitsAnimKey}
                      className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                      d={svgPathsIcons.p2c26bdc0} 
                      stroke={colors.text}
                      strokeLinecap="round" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                </div>
                <p className="text-[24px] tracking-[-0.72px] transition-colors group-hover:!text-[#8B8B8B]" style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  BeatBits
                </p>
              </motion.div>

              {/* Chrono-go */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onMouseEnter={() => {
                  setChronoGoAnimKey(prev => prev + 1);
                  setHoveredProject('ux-7');
                  generateRandomPosition();
                }}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate('/case/chronogo')}
                variants={projectVariants}
              >
                <div className="w-[24px] h-[23px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <path 
                      key={chronoGoAnimKey}
                      className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                      d={svgPathsIcons.p30b01d80} 
                      stroke={colors.text}
                      strokeLinecap="round" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                </div>
                <p className="text-[24px] tracking-[-0.72px] transition-colors group-hover:!text-[#8B8B8B]" style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  Chrono-go
                </p>
              </motion.div>

              {/* Herta Security */}
              <motion.div 
                className="flex items-center gap-4 cursor-pointer group"
                onMouseEnter={() => {
                  setHertaAnimKey(prev => prev + 1);
                  setHoveredProject('ux-8');
                  generateRandomPosition();
                }}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => navigate('/case/herta-security')}
                variants={projectVariants}
              >
                <div className="w-[24px] h-[24px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 25">
                    <path 
                      key={hertaAnimKey}
                      className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                      d={svgPathsIcons.p1da95340} 
                      stroke={colors.text}
                      strokeLinecap="round" 
                      strokeWidth="0.5" 
                    />
                  </svg>
                </div>
                <p className="text-[24px] tracking-[-0.72px] transition-colors group-hover:!text-[#8B8B8B]" style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 600, fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  Herta Security
                </p>
              </motion.div>

              {/* See More Button */}
              <motion.button 
                onClick={() => navigate('/works')}
                className="flex items-center gap-3 group cursor-pointer mt-4 h-[52px]"
                onMouseEnter={() => setSeeMoreAnimKey(prev => prev + 1)}
                variants={buttonVariants}
              >
                <p className="text-[24px] tracking-[-0.72px] transition-colors group-hover:!text-[#8B8B8B]" style={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 500, fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  {t.seeMore}
                </p>
                <div className="w-[52px] h-[52px] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:rotate-90">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
                    <g>
                      <path 
                        key={`see-more-arrow1-${seeMoreAnimKey}`}
                        className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                        d={svgPaths.p3ecd4f00} 
                        stroke={colors.text}
                        strokeWidth="1.5" 
                      />
                      <path 
                        key={`see-more-arrow2-${seeMoreAnimKey}`}
                        className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                        d={svgPaths.p8aff500} 
                        stroke={colors.text}
                        strokeWidth="1.5" 
                      />
                    </g>
                  </svg>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Divider */}
        <motion.div 
          className="w-full h-px transition-colors duration-300 mb-2 mt-8 md:mb-3 md:mt-12" 
          style={{ backgroundColor: colors.text }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={dividerVariants}
        />

        {/* It's me Section */}
        <motion.section 
          className="min-h-[85vh] max-h-[85vh] flex flex-col justify-between p-[0px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
        >
          <motion.div variants={containerVariants}>
            <motion.h2 
              className="font-['Instrument_Sans:Regular',sans-serif] font-normal text-[24px] tracking-[-1.2px] mb-8 transition-colors duration-300" 
              style={{ fontVariationSettings: "'wdth' 100", color: colors.text }}
              variants={itemVariants}
            >
              {t.itsMe}
            </motion.h2>
          </motion.div>

          {/* Video placeholder negro - Reemplaza con tu video de Canva */}
          <motion.div className="flex justify-start" variants={itemVariants}>
            <div className="w-[100px] h-[100px]">
              <img 
                src="https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/VIDEOS/me-video.gif?raw=true"
                alt="It's me section animation"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-end"
            variants={itemVariants}
          >
            <div className="flex-1 lg:max-w-[50%]">
              <div className="font-['Instrument_Sans:Regular',sans-serif] font-normal text-[24px] tracking-[-1.2px] leading-[1.1] transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100", color: colors.text }}>
                {isFunnyMode ? (
                  <>
                    <p className="mb-0">{t.itsmeIntroFunny}</p>
                    <p className="mb-0">{t.itsmeBodyFunny}</p>
                    <p>{t.itsmeEndFunny} <span className="inline-block">{itsmeText}<span className="inline-block w-[2px] h-[1em] ml-[2px] align-middle transition-colors duration-300" style={{ animation: 'blink 1s step-end infinite', backgroundColor: theme === 'dark' ? '#FFFFFF' : colors.text }}></span></span></p>
                  </>
                ) : (
                  <>
                    <p className="mb-0">{t.itsmeIntro}</p>
                    <p className="mb-0">{t.itsmeBody}</p>
                    <p>{t.itsmeEnd} <span className="inline-block">{itsmeText}<span className="inline-block w-[2px] h-[1em] ml-[2px] align-middle transition-colors duration-300" style={{ animation: 'blink 1s step-end infinite', backgroundColor: theme === 'dark' ? '#FFFFFF' : colors.text }}></span></span></p>
                  </>
                )}
              </div>
            </div>

            <div className="lg:w-auto lg:ml-auto">
              <button 
                className="flex items-center gap-3 group cursor-pointer h-[52px]"
                onMouseEnter={() => setResumeAnimKey(prev => prev + 1)}
                onClick={() => window.open('https://drive.google.com/file/d/1BSFvcdQJjesg4U2r8i4tGjXFQhhCA5L5/view?usp=sharing', '_blank')}
                variants={buttonVariants}
              >
                <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium text-[24px] tracking-[-0.72px] transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                  <span className="group-hover:!text-[#8B8B8B] transition-colors" style={{ color: colors.text }}>{t.myResume}</span>
                </p>
                <div className="w-[52px] h-[52px] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:rotate-90">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
                    <g>
                      <path 
                        key={`resume-arrow1-${resumeAnimKey}`}
                        className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                        d={svgPaths.p3ecd4f00} 
                        stroke={colors.text}
                        strokeWidth="1.5" 
                      />
                      <path 
                        key={`resume-arrow2-${resumeAnimKey}`}
                        className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                        d={svgPaths.p8aff500} 
                        stroke={colors.text}
                        strokeWidth="1.5" 
                      />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Animated Skills Marquee */}
          <div className="w-full transition-colors duration-300" style={{ backgroundColor: colors.bg }}>
            <div className="flex whitespace-nowrap animate-marquee">
              <div className="flex">
                <span className="font-['Instrument_Sans:Light',sans-serif] text-[10px] tracking-[-0.42px] transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  UX RESEARCH ■ USABILITY TESTING ■ PROTOTYPING ■ DESIGN SYSTEMS ■ ACCESSIBILITY (WCAG) ■ VISUAL STORYTELLING ■ BRANDING ■ TYPOGRAPHY ■ FIGMA / ADOBE XD ■ ILLUSTRATOR / PHOTOSHOP ■ INDESIGN ■ AFTER EFFECTS ■ GIT | GITHUB ■ VISUAL STUDIO CODE ■ HTML5 / CSS / ANGULAR ■ WORDPRESS ■ 
                </span>
              </div>
              <div className="flex">
                <span className="font-['Instrument_Sans:Light',sans-serif] text-[10px] tracking-[-0.42px] transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100", color: colors.text }}>
                  UX RESEARCH ■ USABILITY TESTING ■ PROTOTYPING ■ DESIGN SYSTEMS ■ ACCESSIBILITY (WCAG) ■ VISUAL STORYTELLING ■ BRANDING ■ TYPOGRAPHY ■ FIGMA / ADOBE XD ■ ILLUSTRATOR / PHOTOSHOP ■ INDESIGN ■ AFTER EFFECTS ■ GIT | GITHUB ■ VISUAL STUDIO CODE ■ HTML5 / CSS / ANGULAR ■ WORDPRESS ■ 
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Divider */}
        <motion.div 
          className="w-full h-px transition-colors duration-300 mb-2 mt-8 md:mb-3 md:mt-12" 
          style={{ backgroundColor: colors.text }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={dividerVariants}
        />

        {/* Contact Section */}
        <motion.section 
          className="min-h-[85vh] max-h-[85vh] p-[0px] flex flex-col justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={sectionVariants}
        >
          <motion.div variants={containerVariants}>
            <motion.h2 
              className="font-['Instrument_Sans:Regular',sans-serif] font-normal text-[24px] tracking-[-1.2px] mb-8 transition-colors duration-300" 
              style={{ fontVariationSettings: "'wdth' 100", color: colors.text }}
              variants={itemVariants}
            >
              {t.contact}
            </motion.h2>
          </motion.div>

          {/* Video placeholder negro */}
          <motion.div className="flex justify-center" variants={itemVariants}>
            <div className="w-[100px] h-[100px]">
              <img 
                src="https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/refs/heads/main/public/assets/VIDEOS/contact-video.gif"
                alt="Contact section animation"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div className="flex flex-col lg:flex-row gap-12 lg:gap-16" variants={itemVariants}>
            <div className="flex-1 flex flex-col justify-end">
              <div className="font-['Instrument_Sans:Regular',sans-serif] font-normal text-[14px] tracking-[-0.42px] space-y-2 transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100", color: colors.text }}>
                <p>tarditox@gmail.com</p>
                <p>(+34) 663 830 109</p>
                <p>Barcelona | Spain</p>
              </div>
            </div>

            <div className="lg:w-[400px]">
              <motion.div className="space-y-4 flex flex-col items-end" variants={containerVariants}>
                {/* Spotify Button */}
                <motion.button 
                  className="flex items-center gap-3 group cursor-pointer h-[52px]"
                  onMouseEnter={() => setContactSpotifyAnimKey(prev => prev + 1)}
                  onClick={() => window.open('https://open.spotify.com/playlist/385mgVewUPy5Hl6GcCI4qs?si=L75FZDSGRUmFXmrMGrRRMw', '_blank')}
                  variants={socialButtonVariants}
                >
                  <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium text-[24px] tracking-[-0.72px] transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <span className="group-hover:!text-[#8B8B8B] transition-colors" style={{ color: colors.text }}>{t.spotify}</span>
                  </p>
                  <div className="w-[52px] h-[52px] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:rotate-90">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
                      <g>
                        <path 
                          key={`contact-spotify-arrow1-${contactSpotifyAnimKey}`}
                          className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                          d={svgPaths.p3ecd4f00} 
                          stroke={colors.text}
                          strokeWidth="1.5" 
                        />
                        <path 
                          key={`contact-spotify-arrow2-${contactSpotifyAnimKey}`}
                          className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                          d={svgPaths.p8aff500} 
                          stroke={colors.text}
                          strokeWidth="1.5" 
                        />
                      </g>
                    </svg>
                  </div>
                </motion.button>

                {/* LinkedIn Button */}
                <motion.button 
                  className="flex items-center gap-3 group cursor-pointer h-[52px]"
                  onMouseEnter={() => setContactLinkedInAnimKey(prev => prev + 1)}
                  onClick={() => window.open('https://www.linkedin.com/in/claudiatardito/', '_blank')}
                  variants={socialButtonVariants}
                >
                  <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium text-[24px] tracking-[-0.72px] transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <span className="group-hover:!text-[#8B8B8B] transition-colors" style={{ color: colors.text }}>{t.linkedin}</span>
                  </p>
                  <div className="w-[52px] h-[52px] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:rotate-90">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
                      <g>
                        <path 
                          key={`contact-linkedin-arrow1-${contactLinkedInAnimKey}`}
                          className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                          d={svgPaths.p3ecd4f00} 
                          stroke={colors.text}
                          strokeWidth="1.5" 
                        />
                        <path 
                          key={`contact-linkedin-arrow2-${contactLinkedInAnimKey}`}
                          className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                          d={svgPaths.p8aff500} 
                          stroke={colors.text}
                          strokeWidth="1.5" 
                        />
                      </g>
                    </svg>
                  </div>
                </motion.button>

                {/* Instagram Button */}
                <motion.button 
                  className="flex items-center gap-3 group cursor-pointer h-[52px]"
                  onMouseEnter={() => setContactInstagramAnimKey(prev => prev + 1)}
                  onClick={() => window.open('https://www.instagram.com/hereismymess/', '_blank')}
                  variants={socialButtonVariants}
                >
                  <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium text-[24px] tracking-[-0.72px] transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <span className="group-hover:!text-[#8B8B8B] transition-colors" style={{ color: colors.text }}>{t.instagram}</span>
                  </p>
                  <div className="w-[52px] h-[52px] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:rotate-90">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
                      <g>
                        <path 
                          key={`contact-instagram-arrow1-${contactInstagramAnimKey}`}
                          className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                          d={svgPaths.p3ecd4f00} 
                          stroke={colors.text}
                          strokeWidth="1.5" 
                        />
                        <path 
                          key={`contact-instagram-arrow2-${contactInstagramAnimKey}`}
                          className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                          d={svgPaths.p8aff500} 
                          stroke={colors.text}
                          strokeWidth="1.5" 
                        />
                      </g>
                    </svg>
                  </div>
                </motion.button>

                {/* My Resume Button */}
                <motion.button 
                  className="flex items-center gap-3 group cursor-pointer h-[52px]"
                  onMouseEnter={() => setContactResumeAnimKey(prev => prev + 1)}
                  onClick={() => window.open('https://drive.google.com/file/d/1BSFvcdQJjesg4U2r8i4tGjXFQhhCA5L5/view?usp=sharing', '_blank')}
                  variants={socialButtonVariants}
                >
                  <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium text-[24px] tracking-[-0.72px] transition-colors" style={{ fontVariationSettings: "'wdth' 100" }}>
                    <span className="group-hover:!text-[#8B8B8B] transition-colors" style={{ color: colors.text }}>{t.myResume}</span>
                  </p>
                  <div className="w-[52px] h-[52px] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-x-2 group-hover:rotate-90">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
                      <g>
                        <path 
                          key={`contact-resume-arrow1-${contactResumeAnimKey}`}
                          className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                          d={svgPaths.p3ecd4f00} 
                          stroke={colors.text}
                          strokeWidth="1.5" 
                        />
                        <path 
                          key={`contact-resume-arrow2-${contactResumeAnimKey}`}
                          className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                          d={svgPaths.p8aff500} 
                          stroke={colors.text}
                          strokeWidth="1.5" 
                        />
                      </g>
                    </svg>
                  </div>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Divider */}
        <motion.div 
          className="w-full h-px transition-colors duration-300 mb-2 mt-8 md:mb-3 md:mt-12" 
          style={{ backgroundColor: colors.text }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={dividerVariants}
        />

        {/* Footer */}
        <footer className="p-[0px] text-center">
          <p className="font-['Instrument_Sans:Light',sans-serif] text-[10px] tracking-[-0.42px] transition-colors duration-300" style={{ fontVariationSettings: "'wdth' 100", color: colors.text }}>
            © 2026 Claudia Tardito. All rights reserved.
          </p>
        </footer>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
          onMouseEnter={() => setBackToTopAnimKey(prev => prev + 1)}
          className="fixed bottom-8 right-6 md:right-12 lg:right-16 w-[32px] h-[32px] z-50 rounded-full shadow-lg cursor-pointer transition-all hover:opacity-70 group"
          style={{ backgroundColor: colors.text }}
          aria-label="Back to top"
        >
          <div className="w-full h-full flex items-center justify-center -rotate-90">
            <svg className="block w-[20px] h-[20px]" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
              <g>
                <path 
                  key={`back-to-top-arrow1-${backToTopAnimKey}`}
                  className="animated-icon-path" 
                  d={svgPaths.p3ecd4f00} 
                  stroke={colors.bg}
                  strokeWidth="1.5" 
                />
                <path 
                  key={`back-to-top-arrow2-${backToTopAnimKey}`}
                  className="animated-icon-path" 
                  d={svgPaths.p8aff500} 
                  stroke={colors.bg}
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
