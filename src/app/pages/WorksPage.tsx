import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { GalleryHorizontal, LayoutGrid } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import svgPaths from "../../imports/svg-0pgs1q9s8l";
import svgPathsScribble from "../../imports/svg-8varu1tqqx";
import svgPathsTheme from "../../imports/svg-u95vusejla";
import { ArrowButton, IconButton, Heading } from "../components/design-system";

// WorksPage Component - Portfolio Gallery with floating and grid modes
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
  const [isGridMode, setIsGridMode] = useState(false); // Nuevo estado para modo grid
  const [isMobile, setIsMobile] = useState(false); // Nuevo estado para detectar mobile
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const clickStartPos = useRef<{ x: number; y: number } | null>(null);

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

  // Prevenir scroll en toda la página (solo en modo floating)
  useEffect(() => {
    if (!isGridMode) {
      // Prevenir scroll en toda la página solo en modo floating
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      // En modo grid, PERMITIR scroll normal del body
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    
    return () => {
      // Restaurar al salir
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isGridMode]);

  // Detectar si estamos en mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar al cargar
    checkMobile();

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const works: WorkItem[] = [
    { id: 'MonoBank', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/monobank.gif?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Beatbits', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/beatbits.gif?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Chrono-go', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/chrono-go.gif?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Herta Security', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/herta.gif?raw=true', categories: ['ux/ui', 'branding'], className: 'w-[100px] h-[100px]' },
    { id: 'Countify', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/countify.jpg?raw=true', categories: ['ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Uno Tarot', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/uno.gif?raw=true', categories: ['playground', 'ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Office Apocalypse', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/office.gif?raw=true', categories: ['playground', 'ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Read Me Right!', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/readme.gif?raw=true', categories: ['playground', 'ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'LynchUniverse', image: 'https://github.com/tarditonotarde/IMAGES_REPO/blob/main/public/assets/IMAGES/MAIN-PORT/lynch.gif?raw=true', categories: ['playground', 'ux/ui'], className: 'w-[100px] h-[100px]' },
    { id: 'Break the Frame', image: 'https://raw.githubusercontent.com/tarditonotarde/IMAGES_REPO/refs/heads/main/public/assets/IMAGES/MAIN-PORT/break.gif', categories: ['playground', 'ux/ui'], className: 'w-[100px] h-[100px]' },
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
    'Read Me Right!': svgPaths.p19ff1980,
    'LynchUniverse': svgPaths.p19ff1980,
    'Break the Frame': svgPaths.p19ff1980,
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
      if (!containerRef.current || !dragStartPos.current) return;
      
      // Calcular distancia movida desde el inicio
      const deltaX = Math.abs(e.clientX - dragStartPos.current.x);
      const deltaY = Math.abs(e.clientY - dragStartPos.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Solo marcar como drag si se movió más de 5 pixels
      if (distance > 5) {
        setHasDragged(true);
      }
      
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
      if (!containerRef.current || !dragStartPos.current) return;
      
      // Prevenir scroll mientras se arrastra
      e.preventDefault();
      
      const touch = e.touches[0];
      
      // Calcular distancia movida desde el inicio
      const deltaX = Math.abs(touch.clientX - dragStartPos.current.x);
      const deltaY = Math.abs(touch.clientY - dragStartPos.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Solo marcar como drag si se movió más de 5 pixels
      if (distance > 5) {
        setHasDragged(true);
      }
      
      const container = containerRef.current.getBoundingClientRect();
      
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
      dragStartPos.current = null;
      // Esperar un poco antes de resetear hasDragged para que onClick no se dispare
      setTimeout(() => setHasDragged(false), 50);
    };

    const handleGlobalTouchEnd = () => {
      setDraggedImage(null);
      dragStartPos.current = null;
      // Esperar un poco antes de resetear hasDragged para que onClick no se dispare
      setTimeout(() => setHasDragged(false), 50);
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
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    clickStartPos.current = { x: e.clientX, y: e.clientY }; // Guardar posición para detectar click
  };

  // Inicio del drag (touch)
  const handleImageTouchStart = (e: React.TouchEvent, index: number) => {
    e.preventDefault();
    setHasDragged(false); // Resetear el estado de drag al iniciar
    setDraggedImage(index);
    const touch = e.touches[0];
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };
    clickStartPos.current = { x: touch.clientX, y: touch.clientY }; // Guardar posición para detectar click
  };

  // Manejar click en imagen para navegar al case study
  const handleImageClick = (e: React.MouseEvent, workId: string) => {
    // Verificar si hubo movimiento significativo desde el mouseDown
    if (clickStartPos.current) {
      const deltaX = Math.abs(e.clientX - clickStartPos.current.x);
      const deltaY = Math.abs(e.clientY - clickStartPos.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Si se movió más de 5 pixels, fue un drag, no un click
      if (distance > 5) {
        clickStartPos.current = null;
        return;
      }
    }
    
    // Limpiar la posición de click
    clickStartPos.current = null;
    
    // Navegar al case study
    navigateToCaseStudy(workId);
  };

  // Función simplificada para navegar (usada en modo grid)
  const handleImageClickSimple = (workId: string) => {
    navigateToCaseStudy(workId);
  };

  // Función helper para navegar a case study
  const navigateToCaseStudy = (workId: string) => {
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
      'Read Me Right!': '/case/read-me-right',
      'Break the Frame': '/case/break-the-frame',
      'LynchUniverse': '/case/lynch-universe',
      // Agregar más rutas aquí cuando estén disponibles
    };

    const route = caseStudyRoutes[workId];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div 
      className={`w-full transition-colors duration-300 ${isGridMode ? 'min-h-screen' : 'h-[100vh] overflow-hidden flex flex-col'}`} 
      style={{ 
        backgroundColor: colors.bg,
        WebkitOverflowScrolling: 'touch' // Smooth scrolling en iOS
      }}
    >
        
        {/* Header - Fixed en modo grid, normal en modo floating */}
        <section 
          className={`${isGridMode ? 'fixed top-0 left-0 right-0' : 'relative'} z-[100] w-full px-4 md:px-[64px] pt-3 md:pt-4 pb-3 md:pb-4 flex-shrink-0 transition-colors duration-300`} 
          style={{ 
            backgroundColor: colors.bg
          }}
        >
          <div className="flex flex-row justify-between items-start gap-2 md:gap-8">
            {/* Lado izquierdo: botones + título con wrap */}
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              {/* Theme Toggle Button */}
              <button 
                className="w-[32px] md:w-[36px] h-[32px] md:h-[36px] flex-shrink-0 transition-colors [&_path]:hover:fill-[#8B8B8B]"
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

              {/* Carousel/Grid Toggle Button */}
              <button
                onClick={() => setIsGridMode(!isGridMode)}
                className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-colors group flex-shrink-0"
                style={{ 
                  border: `1px solid ${colors.text}`,
                  backgroundColor: 'transparent'
                }}
                aria-label="Toggle carousel mode"
              >
                {isGridMode ? (
                  <GalleryHorizontal size={18} strokeWidth={1.5} stroke={colors.text} className="group-hover:!stroke-[#8B8B8B] transition-colors" />
                ) : (
                  <LayoutGrid size={18} strokeWidth={1.5} stroke={colors.text} className="group-hover:!stroke-[#8B8B8B] transition-colors" />
                )}
              </button>

              {/* Título + Nombre del proyecto */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 leading-none">
                  <Heading level={2}>
                    {selectedCategory === 'all' ? 'everything' : selectedCategory}
                  </Heading>
                </div>
              </div>
            </div>

            {/* Menu Button - En el flujo normal del flex */}
            <div 
              className="relative"
              onMouseLeave={() => {
                setIsMenuOpen(false);
              }}
            >
              <button 
                className="w-[80px] h-[64px] transition-all duration-700 ease-in-out group cursor-pointer"
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
                  className="absolute top-[76px] right-0 z-50 shadow-lg transition-colors duration-300"
                  style={{
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

        {/* Works Section - Ocupa el espacio restante */}
        <div className={`relative px-4 md:px-[64px] pb-8 md:pb-[64px] ${isGridMode ? 'pt-[100px]' : 'flex-1 flex flex-col'}`}>
          
          {/* Contenedor de imágenes - Modo Floating vs Grid */}
          <div className={`relative w-full ${isGridMode ? '' : 'flex-1'}`} ref={containerRef}>
            {isGridMode ? (
              /* Modo Grid - Grid responsivo organizado */
              <div className="w-full px-0 md:px-4 pt-4 pb-8 md:py-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 auto-rows-min">
                  {filteredWorks.map((work, index) => (
                    <div
                      key={work.id}
                      className="w-full flex flex-col gap-2"
                    >
                      {/* Imagen */}
                      <div
                        className="w-full aspect-square relative group cursor-pointer overflow-hidden"
                        onMouseEnter={() => setHoveredWork(work.id)}
                        onMouseLeave={() => setHoveredWork(null)}
                        onClick={() => handleImageClickSimple(work.id)}
                      >
                        <img
                          src={work.image}
                          alt={work.id}
                          width={100}
                          height={100}
                          loading={index < 6 ? "eager" : "lazy"}
                          decoding="async"
                          className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        {/* Overlay con nombre y SVG - Solo desktop (hover) */}
                        {!isMobile && hoveredWork === work.id && (
                          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center gap-2 z-10">
                            {/* SVG Icon */}
                            <div className="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0">
                              <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 25 23">
                                <path 
                                  key={work.id} 
                                  className="animated-scribble-hover" 
                                  d={projectIcons[work.id]} 
                                  stroke="#FFFFFF"
                                  strokeLinecap="round" 
                                  strokeWidth="0.5" 
                                />
                              </svg>
                            </div>
                            
                            {/* Project Name */}
                            <div 
                              className="text-[14px] md:text-[16px] tracking-[-0.42px] text-white text-center px-2" 
                              style={{ fontFamily: 'Instrument Sans, sans-serif' }}
                            >
                              {getDisplayName(work.id)}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Nombre del proyecto - Solo mobile, siempre visible DEBAJO */}
                      {isMobile && (
                        <div className="flex items-center justify-center">
                          {/* Project Name */}
                          <div 
                            className="text-[12px] tracking-[-0.36px] text-center transition-colors" 
                            style={{ 
                              fontFamily: 'Instrument Sans, sans-serif',
                              color: colors.text
                            }}
                          >
                            {getDisplayName(work.id)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Modo Floating - Imágenes posicionadas aleatoriamente */
              <>
                {filteredWorks.map((work, index) => (
                  <div
                    key={work.id}
                    className={`absolute w-[100px] h-[100px] group overflow-hidden ${draggedImage === index ? 'cursor-grabbing scale-110 z-20' : 'cursor-grab hover:scale-110 hover:z-10'} ${draggedImage === index ? '' : 'transition-all duration-500'}`}
                    style={{
                      top: imagePositions[index]?.top || '0%',
                      left: imagePositions[index]?.left || '0%',
                    }}
                    onMouseEnter={() => setHoveredWork(work.id)}
                    onMouseLeave={() => setHoveredWork(null)}
                    onMouseDown={(e) => handleImageMouseDown(e, index)}
                    onTouchStart={(e) => handleImageTouchStart(e, index)}
                    onClick={(e) => handleImageClick(e, work.id)}
                  >
                    <img
                      src={work.image}
                      alt={work.id}
                      width={100}
                      height={100}
                      loading={index < 10 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Overlay con nombre y SVG */}
                    {hoveredWork === work.id && draggedImage !== index && (
                      <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center gap-2 z-10 pointer-events-none">
                        {/* SVG Icon */}
                        <div className="w-[20px] h-[20px] flex items-center justify-center flex-shrink-0">
                          <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 25 23">
                            <path 
                              key={work.id} 
                              className="animated-scribble-hover" 
                              d={projectIcons[work.id]} 
                              stroke="#FFFFFF"
                              strokeLinecap="round" 
                              strokeWidth="0.5" 
                            />
                          </svg>
                        </div>
                        
                        {/* Project Name */}
                        <div 
                          className="text-[10px] tracking-[-0.3px] text-white text-center px-1 leading-tight" 
                          style={{ fontFamily: 'Instrument Sans, sans-serif' }}
                        >
                          {getDisplayName(work.id)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Categories - Fijas abajo con padding responsive */}
          <div className={`${isGridMode ? 'mt-12 relative bottom-[80px] md:bottom-8' : 'absolute bottom-[120px] md:bottom-8'} right-4 md:right-8 flex justify-end items-end pt-6`}>
            <div className="space-y-3">
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