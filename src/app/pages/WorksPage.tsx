import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { GalleryHorizontal, LayoutGrid } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import svgPaths from "../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../imports/svg-8varu1tqqx";
import svgPathsTheme from "../../imports/svg-u95vusejla";
import { ArrowButton, IconButton, Heading } from "../components/design-system";

type Category = 'all' | 'ux/ui' | 'editorial' | 'branding' | 'playground' | 'art & culture';

interface WorkItem {
  id: string;
  image: string;
  categories: Category[]; // Cambiado de category a categories (array)
  className?: string;
}

export default function WorksPage() {
  const navigate = useNavigate();
  const { theme, colors, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredWork, setHoveredWork] = useState<string | null>(null);
  const [draggedImage, setDraggedImage] = useState<number | null>(null);
  const [hasDragged, setHasDragged] = useState(false);
  const [isCarouselMode, setIsCarouselMode] = useState(false); // Nuevo estado para modo carousel
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Prevenir scroll en toda la página (especialmente mobile)
  useEffect(() => {
    // Prevenir scroll en toda la página
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    return () => {
      // Restaurar al salir
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  const works: WorkItem[] = [
    { id: 'MonoBank', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/monobank.gif?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Beatbits', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/beatbits.gif?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Chrono-go', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/chrono-go.gif?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Herta Security', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/herta.gif?raw=true', categories: ['ux/ui', 'branding'], className: 'w-[100px] h-[100px]' },
    { id: 'Countify', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/countify.jpg?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Uno Tarot', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/uno.gif?raw=true', categories: ['playground', 'ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Office Apocalypse', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/office.gif?raw=true', categories: ['playground', 'ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Hertaverse', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/hertaverse.gif?raw=true', categories: ['branding'], className: 'w-[100px] h-[100px]' },
    { id: 'Infamia Museum', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/infamia.gif?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Haters gonna hate', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/hater.gif?raw=true', categories: ['playground', 'ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Beethoven 2020', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/b2020.gif?raw=true', categories: ['branding', 'art & culture'], className: 'w-[100px] h-[100px]' },
    { id: 'SynapHelmet', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/synap.gif?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Trashtour BER', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/trash-ber.gif?raw=true', categories: ['editorial'], className: 'w-[100px] h-[100px]' },
    { id: 'Trashtour LDN', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/trash-ldn.gif?raw=true', categories: ['editorial'], className: 'w-[100px] h-[100px]' },
    { id: 'Trashtour BCN', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/trash-bcn.gif?raw=true', categories: ['editorial'], className: 'w-[100px] h-[100px]' },
    { id: 'La Olla Común', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/olla.gif?raw=true', categories: ['editorial'], className: 'w-[100px] h-[100px]' },
    { id: 'Go-home Mag', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/go-home.png?raw=true', categories: ['editorial'], className: 'w-[100px] h-[100px]' },
    { id: 'Mean Bot', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/mean.gif?raw=true', categories: ['playground', 'ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Mi gato Bolaño', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/bolano.gif?raw=true', categories: ['editorial'], className: 'w-[100px] h-[100px]' },
    { id: 'Infinito', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/infinito.gif?raw=true', categories: ['art & culture'], className: 'w-[100px] h-[100px]' },
    { id: 'Arc Festival', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/arc.gif?raw=true', categories: ['branding', 'art & culture'], className: 'w-[100px] h-[100px]' },
    { id: 'Guz St.', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/guz.gif?raw=true', categories: ['branding'], className: 'w-[100px] h-[100px]' },
    { id: 'Sedas Rina María', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/sedas.png?raw=true', categories: ['branding'], className: 'w-[100px] h-[100px]' },
    { id: 'FILSA', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/filsa.gif?raw=true', categories: ['branding', 'editorial', 'art & culture'], className: 'w-[100px] h-[100px]' },
    { id: 'Letrarte Ediciones', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/letrarte.gif?raw=true', categories: ['branding', 'editorial', 'art & culture'], className: 'w-[100px] h-[100px]' },
    { id: 'Cuarta Estación Circus', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/cuarta-estacion.gif?raw=true', categories: ['branding', 'art & culture'], className: 'w-[100px] h-[100px]' },
    { id: 'Cirkubrick', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/cirkubrick.gif?raw=true', categories: ['art & culture'], className: 'w-[100px] h-[100px]' },
  ];

  const filteredWorks = selectedCategory === 'all' 
    ? works 
    : works.filter(work => work.categories.includes(selectedCategory));

  const categories: Category[] = ['all', 'ux/ui', 'editorial', 'branding', 'playground', 'art & culture'];

  // Función helper para obtener el nombre de display sin sufijos
  const getDisplayName = (workId: string): string => {
    // Remover sufijos -ux, -branding, etc.
    return workId.replace(/-(ux|branding|editorial|playground|art)$/, '');
  };

  // Mapeo de proyectos a íconos animados
  const projectIcons: Record<string, string> = {
    'MonoBank': svgPaths.p35507900,
    'Beatbits': svgPaths.p2c26bdc0,
    'Chrono-go': svgPaths.p30b01d80,
    'Herta Security': svgPaths.p1da95340,
    'Countify': svgPaths.p1da95340,
    'Uno Tarot': svgPaths.p2f537a00,
    'Office Apocalypse': svgPaths.p19ff1980,
    'Hertaverse': svgPaths.p2c26bdc0,
    'Infamia Museum': svgPaths.p30b01d80,
    'Haters gonna hate': svgPaths.p35507900,
    'Beethoven 2020': svgPaths.p1da95340,
    'SynapHelmet': svgPaths.p2f537a00,
    'Trashtour BER': svgPaths.p19ff1980,
    'Trashtour LDN': svgPaths.p2c26bdc0,
    'Trashtour BCN': svgPaths.p30b01d80,
    'La Olla Común': svgPaths.p1da95340,
    'Go-home Mag': svgPaths.p2f537a00,
    'Mean Bot': svgPaths.p19ff1980,
    'Mi gato Bolaño': svgPaths.p35507900,
    'Infinito': svgPaths.p2c26bdc0,
    'Arc Festival': svgPaths.p30b01d80,
    'Guz St.': svgPaths.p1da95340,
    'Sedas Rina María': svgPaths.p2f537a00,
    'FILSA': svgPaths.p19ff1980,
    'Letrarte Ediciones': svgPaths.p35507900,
    'Cuarta Estación Circus': svgPaths.p2c26bdc0,
    'Cirkubrick': svgPaths.p30b01d80,
  };

  // Generar posiciones aleatorias para las imágenes
  const generateRandomPositions = (itemCount: number) => {
    const positions = [];
    for (let i = 0; i < itemCount; i++) {
      positions.push({
        top: `${Math.random() * 80}%`, // 0-80% para mantener dentro de vista
        left: `${Math.random() * 80}%`, // 0-80% para mantener dentro de vista
      });
    }
    return positions;
  };

  const [imagePositions, setImagePositions] = useState(() => 
    generateRandomPositions(filteredWorks.length)
  );

  // Regenerar posiciones cuando cambia la categoría
  useEffect(() => {
    setImagePositions(generateRandomPositions(filteredWorks.length));
  }, [selectedCategory, filteredWorks.length]);

  // Sistema de drag fluido usando eventos globales (mouse y touch)
  useEffect(() => {
    if (draggedImage === null) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Marcar que hubo movimiento durante el drag
      setHasDragged(true);
      
      const container = containerRef.current.getBoundingClientRect();
      
      // Calcular posición en porcentaje basado en la posición del mouse
      // Total libertad de movimiento sin límites
      const newLeft = ((e.clientX - container.left) / container.width) * 100 - 5;
      const newTop = ((e.clientY - container.top) / container.height) * 100 - 5;

      setImagePositions(prev => {
        const newPositions = [...prev];
        newPositions[draggedImage] = {
          left: `${newLeft}%`,
          top: `${newTop}%`,
        };
        return newPositions;
      });
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return;
      
      // Prevenir scroll mientras se arrastra
      e.preventDefault();
      
      // Marcar que hubo movimiento durante el drag
      setHasDragged(true);
      
      const container = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      
      // Calcular posición en porcentaje basado en la posición del touch
      const newLeft = ((touch.clientX - container.left) / container.width) * 100 - 5;
      const newTop = ((touch.clientY - container.top) / container.height) * 100 - 5;

      setImagePositions(prev => {
        const newPositions = [...prev];
        newPositions[draggedImage] = {
          left: `${newLeft}%`,
          top: `${newTop}%`,
        };
        return newPositions;
      });
    };

    const handleGlobalMouseUp = () => {
      setDraggedImage(null);
      // Esperar un poco antes de resetear hasDragged para que onClick no se dispare
      setTimeout(() => setHasDragged(false), 100);
    };

    const handleGlobalTouchEnd = () => {
      setDraggedImage(null);
      // Esperar un poco antes de resetear hasDragged para que onClick no se dispare
      setTimeout(() => setHasDragged(false), 100);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [draggedImage]);

  // Inicio del drag (mouse)
  const handleImageMouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setHasDragged(false); // Resetear el estado de drag al iniciar
    setDraggedImage(index);
  };

  // Inicio del drag (touch)
  const handleImageTouchStart = (e: React.TouchEvent, index: number) => {
    e.preventDefault();
    setHasDragged(false); // Resetear el estado de drag al iniciar
    setDraggedImage(index);
  };

  // Manejar click en imagen para navegar al case study
  const handleImageClick = (workId: string) => {
    // Solo navegar si no se está arrastrando y no hubo drag reciente
    if (draggedImage !== null || hasDragged) return;
    
    // Mapeo de IDs a rutas de case study
    const caseStudyRoutes: Record<string, string> = {
      'MonoBank': '/case/monobank',
      'Beatbits': '/case/beatbits',
      'Chrono-go': '/case/chronogo',
      'Herta Security': '/case/herta-security',
      'SynapHelmet': '/case/synaphelmet',
      'Countify': '/case/countify',
      'Infamia Museum': '/case/infamia-museum',
      'Trashtour LDN': '/case/trashtour-ldn',
      'Trashtour BER': '/case/trashtour-ber',
      'Trashtour BCN': '/case/trashtour-bcn',
      'La Olla Común': '/case/la-olla-comun',
      'Go-home Mag': '/case/go-home-mag',
      'Hertaverse': '/case/hertaverse',
      'Beethoven 2020': '/case/beethoven2020',
      'Mi gato Bolaño': '/case/mi-gato-bolano',
      'Letrarte Ediciones': '/case/letrarte',
      'FILSA': '/case/filsa',
      'Cuarta Estación Circus': '/case/cuarta-estacion',
      'Cirkubrick': '/case/cirkubrick',
      'Infinito': '/case/infinito',
      'Arc Festival': '/case/arc-festival',
      'Sedas Rina María': '/case/sedas-rina-maria',
      'Guz St.': '/case/guz-studio',
      'Uno Tarot': '/case/uno-tarot',
      'Office Apocalypse': '/case/office-apocalypse',
      'Haters gonna hate': '/case/haters-gonna-hate',
      'Mean Bot': '/case/mean-bot',
      // Agregar más rutas aquí cuando estén disponibles
    };

    const route = caseStudyRoutes[workId];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="h-[90vh] w-full transition-colors duration-300 flex flex-col items-center justify-center" style={{ backgroundColor: colors.bg }}>
        
        {/* Header */}
        <section className="p-[0px] pt-4 absolute top-0 left-0 right-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 px-[64px] py-[0px]">
            <div className="flex items-center gap-4">
              {/* Theme Toggle Button */}
              <button 
                className="w-[36px] h-[36px] transition-colors [&_path]:hover:fill-[#8B8B8B]"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 129 119">
                  <g clipPath="url(#clip0_17_110_works)">
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
                    <clipPath id="clip0_17_110_works">
                      <rect fill="white" height="118.831" width="128.742" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
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
                    {/* Trazo que se dibuja progresivamente sin opacidad */}
                    <path key={animationKey} className="animated-scribble-hover" d={svgPathsScribble.p9f31800} stroke={colors.text} strokeLinecap="round" strokeWidth="1" />
                  </svg>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div 
                  className="fixed top-[76px] right-6 md:right-12 lg:right-16 z-50 shadow-lg transition-colors duration-300"
                  style={{
                    transform: 'translateX(calc(50% - 40px))',
                    backgroundColor: colors.bg,
                    borderColor: colors.text,
                    borderWidth: '1px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={() => setIsMenuOpen(true)}
                >
                  <div className="flex flex-col" style={{ 
                    borderColor: colors.text 
                  }}>
                    <button
                      onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
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
                      my work
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
                      contact
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Works Section */}
        <div className="flex flex-col gap-12 h-[70vh] justify-center w-full px-[64px] py-[0px] m-[0px]">
          
          {/* Galería de imágenes flotantes para todas las categorías */}
          {/* Título de la sección + Nombre del proyecto en hover lado a lado */}
          <div className="flex items-center gap-3 h-[32px] md:h-[40px]">
            {/* Botón para cambiar a modo carousel */}
            <button
              onClick={() => setIsCarouselMode(!isCarouselMode)}
              className="w-[18px] h-[18px] flex items-center justify-center transition-colors group flex-shrink-0"
              aria-label="Toggle carousel mode"
            >
              {isCarouselMode ? (
                <GalleryHorizontal size={18} strokeWidth={1.5} stroke={colors.text} className="group-hover:!stroke-[#8B8B8B] transition-colors" />
              ) : (
                <LayoutGrid size={18} strokeWidth={1.5} stroke={colors.text} className="group-hover:!stroke-[#8B8B8B] transition-colors" />
              )}
            </button>
            
            <div className="flex-shrink-0 leading-none">
              <Heading level={2}>
                {selectedCategory === 'all' ? 'everything' : selectedCategory}
              </Heading>
            </div>
            
            {/* Mostrar nombre del proyecto en hover O cuando se está arrastrando */}
            {(() => {
              const displayedWork = hoveredWork || (draggedImage !== null ? filteredWorks[draggedImage]?.id : null);
              
              return displayedWork && (
                <div className="flex items-center gap-3">
                  {/* Icono rallado animado diferente por proyecto */}
                  <div className="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
                    <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 25 23">
                      <path 
                        key={displayedWork} 
                        className="animated-scribble-hover" 
                        d={projectIcons[displayedWork]} 
                        stroke={colors.text}
                        strokeLinecap="round" 
                        strokeWidth="0.5" 
                      />
                    </svg>
                  </div>
                  
                  {/* Nombre del proyecto */}
                  <div className="text-[18px] md:text-[24px] tracking-[-0.72px] transition-colors duration-300 flex-shrink-0 leading-none" style={{ fontFamily: 'Instrument Sans, sans-serif', color: colors.text }}>
                    {getDisplayName(displayedWork)}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Contenedor de imágenes - Modo Floating vs Carousel */}
          <div className="relative flex-1 w-full" ref={containerRef}>
            {isCarouselMode ? (
              /* Modo Carousel - Imágenes en fila horizontal con scroll */
              <div className="h-full flex items-center overflow-x-auto gap-6 px-4 scrollbar-hide" style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {filteredWorks.map((work, index) => (
                  <div
                    key={work.id}
                    className="flex-shrink-0 w-[50px] h-[50px] hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredWork(work.id)}
                    onMouseLeave={() => setHoveredWork(null)}
                    onClick={() => handleImageClick(work.id)}
                  >
                    <img
                      src={work.image}
                      alt={work.id}
                      className="w-full h-full object-cover pointer-events-none select-none"
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Modo Floating - Imágenes posicionadas aleatoriamente */
              filteredWorks.map((work, index) => (
                <div
                  key={work.id}
                  className={`absolute ${selectedCategory === 'all' ? 'w-[50px] h-[50px]' : 'w-[100px] h-[100px]'} hover:scale-110 hover:z-10 ${draggedImage === index ? 'cursor-grabbing scale-110 z-20' : 'cursor-grab'} ${draggedImage === index ? '' : 'transition-all duration-500'}`}
                  style={{
                    top: imagePositions[index]?.top || '0%',
                    left: imagePositions[index]?.left || '0%',
                  }}
                  onMouseEnter={() => setHoveredWork(work.id)}
                  onMouseLeave={() => setHoveredWork(null)}
                  onMouseDown={(e) => handleImageMouseDown(e, index)}
                  onTouchStart={(e) => handleImageTouchStart(e, index)}
                  onClick={() => handleImageClick(work.id)}
                >
                  <img
                    src={work.image}
                    alt={work.id}
                    className="w-full h-full object-cover pointer-events-none select-none"
                  />
                </div>
              ))
            )}
          </div>

          {/* Back + Categories */}
          <div className="flex justify-between items-end pt-[0px] pr-[0px] pb-[0px] pl-[0px] p-[0px]">
            {/* Categories Column */}
            <div className="space-y-3 ml-auto">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                const iconMap = {
                  'all': svgPaths.p2c26bdc0,
                  'ux/ui': svgPaths.p30b01d80,
                  'editorial': svgPaths.p2f537a00,
                  'branding': svgPaths.p1da95340,
                  'playground': svgPaths.p19ff1980,
                  'art & culture': svgPaths.p35507900,
                };

                return (
                  <IconButton
                    key={category}
                    icon={iconMap[category]}
                    text={category}
                    onClick={() => setSelectedCategory(category)}
                    selected={isSelected}
                    variant="semibold"
                  />
                );
              })}
            </div>
          </div>
        </div>
    </div>
  );
}