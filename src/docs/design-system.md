# Design System - Claudia Tardito Portfolio

## 🎨 Overview
Este design system documenta todos los elementos visuales, componentes y patrones de diseño utilizados en el portfolio de Claudia Tardito.

---

## 📐 Layout

### Container
- **Max Width**: `1280px`
- **Padding**: 
  - Mobile: `24px` (px-6)
  - Tablet: `48px` (md:px-12)
  - Desktop: `64px` (lg:px-16)

### Sections
- **Min/Max Height**: `85vh` para todas las secciones principales
- **Padding Bottom**: `48px` (mobile) | `64px` (md) | `80px` (lg)

### Pages Structure
- **HomePage**: Layout con scroll habilitado, múltiples secciones con back-to-top button
- **WorksPage**: Layout fijo sin scroll (`overflow: hidden`, `position: fixed`), optimizado para galería interactiva
- **Case Study Pages**: Layout con scroll habilitado, back-to-top button, typewriter animation
  - 21 case studies completados: BeatBits, Chronogo, Herta Security, MonoBank, SynapHelmet, Countify, Infamia Museum, Trashtour LDN/BER/BCN, La Olla Común, Go Home Mag, Hertaverse, Beethoven 2020, Mi gato Bolaño, Letrarte Ediciones, FILSA, Cuarta Estación Circus, Cirkubrick, Infinito, ARC Festival, Sedas Rina María (Lozanía), Guz Studio
  - Estructura consistente: Hero → Overview → Design Process → Results → Conclusion
  - Videos embedidos: YouTube y Google Drive con autoplay, mute, loop

---

## 🔤 Typography

### Font Family
- **Primary**: `Instrument Sans`
- **Weights**: Regular (400), Medium (500), SemiBold (600)
- **Font Variation Settings**: `'wdth' 100`

### Type Scale

#### Hero Text (48px / 36px / 28px)
```css
font-family: 'Instrument Sans:Regular', sans-serif;
font-weight: 400;
font-size: 48px; /* Desktop */
font-size: 36px; /* Tablet */
font-size: 28px; /* Mobile */
line-height: 1.1;
letter-spacing: -2.4px;
```

#### Heading (24px)
```css
font-family: 'Instrument Sans:Regular', sans-serif;
font-weight: 400;
font-size: 24px;
letter-spacing: -1.2px;
```

#### Button Text (24px)
```css
font-family: 'Instrument Sans:Medium', sans-serif;
font-weight: 500;
font-size: 24px;
letter-spacing: -0.72px;
```

#### Button Text SemiBold (24px)
```css
font-family: 'Instrument Sans:SemiBold', sans-serif;
font-weight: 600;
font-size: 24px;
letter-spacing: -0.72px;
```

#### Contact Info (14px)
```css
font-family: 'Instrument Sans:Regular', sans-serif;
font-weight: 400;
font-size: 14px;
letter-spacing: -0.42px;
```

#### Menu Text (14px)
```css
font-family: 'Instrument Sans:Medium', sans-serif;
font-weight: 500;
font-size: 14px;
letter-spacing: -0.42px;
```

---

## 🎨 Colors

### Primary Palette
```css
--color-black: #000000;
--color-white: #FFFFFF;
--color-gray: #8B8B8B;
```

### Usage (Light Mode - Default)
- **Text Primary**: Black (#000000)
- **Background**: White (#FFFFFF)
- **Text Disabled/Selected**: Gray (#8B8B8B)
- **Borders**: Black (#000000)

### Dark Mode Palette
```css
--dark-background: #000000;
--dark-text: #FFFFFF;
--dark-gray: #8B8B8B;
--dark-border: #FFFFFF;
```

### Dark Mode Usage
- **Text Primary**: White (#FFFFFF)
- **Background**: Black (#000000)
- **Text Disabled/Selected**: Gray (#8B8B8B)
- **Borders**: White (#FFFFFF)

### Theme System (ThemeContext)
El portfolio usa un sistema de temas dinámico implementado con React Context.

**Características**:
- ✅ Modo claro y oscuro
- ✅ Persistencia en localStorage
- ✅ Transiciones suaves entre temas
- ✅ Solo aplica a HomePage y WorksPage (NO a case studies)

**Implementation**:
```tsx
// ThemeContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeColors {
  background: string;
  text: string;
  gray: string;
  border: string;
}

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors: ThemeColors = theme === 'dark' 
    ? {
        background: '#000000',
        text: '#FFFFFF',
        gray: '#8B8B8B',
        border: '#FFFFFF'
      }
    : {
        background: '#FFFFFF',
        text: '#000000',
        gray: '#8B8B8B',
        border: '#000000'
      };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

**Usage in Components**:
```tsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, colors } = useTheme();
  
  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Content */}
    </div>
  );
}
```

---

## 🔲 Spacing

### Gap System
- **Small**: `12px` (gap-3)
- **Medium**: `16px` (gap-4)
- **Large**: `48px` (gap-12)
- **XLarge**: `64px` (gap-16)

### Padding/Margin
- **Section**: `48px` (py-12) mobile | `64px` (md:py-16) tablet | `80px` (md:py-20) desktop
- **Element**: `32px` (mb-8) standard margin bottom

---

## 🧩 Components

### 1. Arrow Button
Botón con flecha animada que se usa para navegación y CTAs.

**Variants**:
- Primary: Texto + Flecha derecha
- Back: Flecha izquierda + Texto

**States**:
- Default
- Hover: `opacity: 0.7` + arrow scale & translate

**Animation**:
- Arrow SVG paths animate on hover
- Scale: `1.1`
- Translate X: `8px`

**Size**:
- Icon: `52px × 52px`
- Text: `24px`
- Gap: `12px`

---

### 2. Icon Button
Botón con icono SVG y texto, usado para proyectos y categorías.

**Variants**:
- Project Item (with animation key)
- Category Filter (with selection state)

**States**:
- Default
- Hover: `opacity: 0.7`
- Selected: Text color `#8B8B8B`

**Animation**:
- SVG path draws on hover using keyframes
- Duration: `1s ease-in-out`

**Size**:
- Icon: `24px × 20-29px` (varies by icon)
- Text: `24px`
- Gap: `16px`

---

### 3. Section Divider
Línea divisoria horizontal entre secciones.

**Style**:
```css
width: 100%;
height: 1px;
background: #000000;
margin-top: 32px (mobile) | 48px (md);
margin-bottom: 8px (mobile) | 12px (md);
```

---

### 4. Contact Info Block
Bloque de información de contacto.

**Content**:
- Email
- Phone
- Location

**Style**:
- Font: 14px Regular
- Spacing: `8px` entre líneas
- Color: Black

---

### 5. Menu Dropdown
Menú desplegable del círculo animado.

**Behavior**:
- Desktop: Hover to open
- Mobile: Click to toggle
- Auto-close on scroll up

**Style**:
- Background: White
- Border: 1px solid Black
- Padding: `24px` horizontal, `4px` vertical per item
- Dividers: 1px solid Black between items

**Position**:
- Fixed: `top: 76px`, centered with circle
- Items: Single line, centered text

---

### 6. Animated Circle
Círculo SVG con animación de trazo.

**States**:
- Default (Hero): `247px × 196px`
- Scrolled (Menu): `80px × 64px`

**Animation**:
- Draws on hover
- Duration: `2s ease-in-out`
- Stroke dasharray: `3500`

---

### 7. Typing Animation
Efecto de escritura y borrado de texto.

**Behavior**:
- Types character by character
- Pauses at end
- Deletes and cycles to next word

**Cursor**:
- Width: `2px`
- Blink animation: `1s step-end infinite`

**Implementation**:
```tsx
// Typewriter animation state
const [typedText, setTypedText] = useState('');
const [showCursor, setShowCursor] = useState(true);
const fullText = 'case study';

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
  }, 150); // 150ms per character

  return () => clearInterval(typingInterval);
}, []);

// Cursor blinking effect
useEffect(() => {
  const cursorInterval = setInterval(() => {
    setShowCursor(prev => !prev);
  }, 530); // Blink every 530ms

  return () => clearInterval(cursorInterval);
}, []);
```

**Usage**:
```tsx
<div className="inline-flex items-baseline">
  <span>{typedText}</span>
  <span 
    className={`inline-block w-[2px] h-[1.2em] bg-black ml-[2px] ${
      showCursor ? 'opacity-100' : 'opacity-0'
    }`}
  />
</div>
```

---

### 8. Back to Top Button
Botón circular que aparece al hacer scroll para volver arriba.

**Specifications**:
- **Size**: `32px × 32px` (w-8 h-8)
- **Icon**: Arrow up (↑) con SVG animado
- **Position**: Fixed `bottom-8 right-6 md:right-12 lg:right-16`
- **Z-index**: `50`

**Behavior**:
- Aparece cuando `scrollY > 300px`
- Click scroll suave a top: `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Hover: Opacity `0.7` + scale animation

**Animation**:
- SVG arrow animates on hover (key-based reset)
- Scribble draw animation: `drawScribble 2s ease-in-out forwards`

**Implementation**:
```tsx
// State
const [showBackToTop, setShowBackToTop] = useState(false);
const [backToTopAnimKey, setBackToTopAnimKey] = useState(0);

// Show/hide on scroll
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
```

**JSX**:
```tsx
{showBackToTop && (
  <button
    onClick={scrollToTop}
    onMouseEnter={() => setBackToTopAnimKey(prev => prev + 1)}
    className="fixed bottom-8 right-6 md:right-12 lg:right-16 w-8 h-8 z-50 group cursor-pointer hover:opacity-70 transition-opacity"
  >
    <svg className="w-full h-full" viewBox="0 0 247 196" fill="none">
      <path
        key={backToTopAnimKey}
        className="animated-scribble-hover"
        d={svgPathsArrow.p30b01d80}
        stroke="black"
        strokeLinecap="round"
        strokeWidth="1"
      />
    </svg>
  </button>
)}
```

---

### 9. ScrollToTop Component
Utility component para scroll automático al cambiar de página.

**Purpose**: Resetea scroll position a top cuando se navega entre páginas

**Implementation**:
```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

**Usage in App.tsx**:
```tsx
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

### 10. MouseTrail Component
Efecto visual que crea una línea animada que sigue el movimiento del cursor.

**Purpose**: Agregar un trail visual personalizado al cursor que se adapta al tema (claro/oscuro)

**Features**:
- ✅ Trail de líneas que sigue el cursor
- ✅ Fade out progresivo (1 segundo)
- ✅ Color adaptable al tema (negro en light mode, blanco en dark mode)
- ✅ Blend mode dinámico según tema
- ✅ Canvas HTML5 para rendering eficiente

**Specifications**:
- **Line Width**: `0.5px`
- **Fade Duration**: `1000ms`
- **Update Interval**: `100ms`
- **Z-index**: `9999` (top layer)
- **Pointer Events**: `none` (no interfiere con interacciones)

**Theme Adaptation**:
- **Light Mode**: 
  - Color: `rgba(0, 0, 0, opacity)` (Negro)
  - Blend Mode: `darken`
- **Dark Mode**: 
  - Color: `rgba(255, 255, 255, opacity)` (Blanco)
  - Blend Mode: `lighten`

**Implementation**:
```tsx
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const { theme } = useTheme();

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: Point = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };
      setPoints(prev => [...prev, newPoint]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Draw on canvas and clean old points
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Filter old points (older than 1 second)
    const now = Date.now();
    const filteredPoints = points.filter(point => now - point.timestamp < 1000);
    
    if (filteredPoints.length !== points.length) {
      setPoints(filteredPoints);
    }

    // Draw lines
    if (filteredPoints.length > 1) {
      filteredPoints.forEach((point, index) => {
        if (index === 0) return;

        const prevPoint = filteredPoints[index - 1];
        const age = now - point.timestamp;
        const opacity = Math.max(0, 1 - age / 1000); // Fade in 1 second

        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(point.x, point.y);
        // Use white in dark mode, black in light mode
        ctx.strokeStyle = theme === 'dark' 
          ? `rgba(255, 255, 255, ${opacity})` 
          : `rgba(0, 0, 0, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });
    }
  }, [points, theme]);

  // Animate continuously to update fade
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const now = Date.now();
        return prev.filter(point => now - point.timestamp < 1000);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Resize canvas
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
      style={{ mixBlendMode: theme === 'dark' ? 'lighten' : 'darken' }}
    />
  );
}
```

**Usage in App.tsx**:
```tsx
import { MouseTrail } from './components/MouseTrail';

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <MouseTrail />
        <Routes>
          {/* routes */}
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
```

**Performance Considerations**:
- Canvas renders efficiently with requestAnimationFrame-like behavior
- Points older than 1 second are automatically removed
- No memory leaks thanks to proper cleanup
- Minimal impact on scroll performance

**Customization Options**:
```tsx
// Adjust line width
ctx.lineWidth = 0.5; // Change value for thicker/thinner lines

// Adjust fade duration
const opacity = Math.max(0, 1 - age / 1000); // Change 1000 to adjust fade speed

// Adjust update frequency
setInterval(() => { /* ... */ }, 100); // Change 100 to adjust smoothness
```

---

### 11. Works Gallery System
Sistema de visualización dual para la galería de trabajos con dos modos de presentación: **Carousel Mode** y **Floating Gallery Mode**.

#### Toggle Button (Modo Carousel/Grid)
**Purpose**: Permite alternar entre modo carousel (horizontal scroll) y modo grid (floating gallery)

**Specifications**:
- **Size**: `18px × 18px`
- **Icons**: Lucide React - `GalleryHorizontal` y `LayoutGrid`
- **Position**: Al lado del título "Works" con `gap-3`
- **Stroke Width**: `1.5px`
- **Hover**: Color gris `#8B8B8B`

**Implementation**:
```tsx
import { GalleryHorizontal, LayoutGrid } from 'lucide-react';

const [isCarouselMode, setIsCarouselMode] = useState(false);

<button
  onClick={() => setIsCarouselMode(!isCarouselMode)}
  className="w-[18px] h-[18px] flex items-center justify-center transition-colors group flex-shrink-0"
  aria-label="Toggle carousel mode"
>
  {isCarouselMode ? (
    <GalleryHorizontal 
      size={18} 
      strokeWidth={1.5} 
      stroke={colors.text} 
      className="group-hover:!stroke-[#8B8B8B] transition-colors" 
    />
  ) : (
    <LayoutGrid 
      size={18} 
      strokeWidth={1.5} 
      stroke={colors.text} 
      className="group-hover:!stroke-[#8B8B8B] transition-colors" 
    />
  )}
</button>
```

#### Modo Carousel (Horizontal Scroll)
**Layout**:
- Carousel horizontal con scroll suave
- Imágenes: `50px × 50px` cada una (consistente con modo "all")
- Gap: `24px` (gap-6) entre imágenes
- Overflow-x: auto con scrollbar oculto
- Flex layout con items-center para alineación vertical

**Interacciones**:
- Hover en imagen: Scale `1.1` + muestra nombre del proyecto + icono rallado animado
- Click en imagen: Navega al case study correspondiente
- Scroll horizontal suave (scrollBehavior: 'smooth')

**Componentes**:
```tsx
<div className="h-full flex items-center overflow-x-auto gap-6 px-4 scrollbar-hide">
  {filteredWorks.map((work) => (
    <div
      key={work.id}
      className="flex-shrink-0 w-[50px] h-[50px] hover:scale-110 transition-transform duration-300 cursor-pointer"
      onMouseEnter={() => setHoveredWork(work.id)}
      onMouseLeave={() => setHoveredWork(null)}
      onClick={() => handleImageClick(work.id)}
    >
      <img src={work.image} alt={work.id} className="w-full h-full object-cover" />
    </div>
  ))}
</div>
```

**Image Sizes**:
- Todas las categorías: `50px × 50px` (consistente en modo carousel)

#### Modo Floating Gallery (Grid Aleatorio)
**Categorías**: Todas las categorías incluidas (`all`, `ux/ui`, `editorial`, `branding`, `playground`, `art & culture`)

**Layout**:
- Imágenes flotantes con posiciones aleatorias
- Distribución: 0-80% del viewport (inicial)
- Sin límites de posicionamiento después del drag
- Z-index dinámico basado en hover y drag

**Interacciones**:
- **Drag & Drop**: Imágenes completamente arrastrables
  - Sin límites de movimiento
  - Cursor: `cursor-grab` (normal) → `cursor-grabbing` (arrastrar)
  - Escala: `1.1` durante el drag
  - Z-index elevado durante el drag
  - Eventos globales del documento para drag fluido
  
- **Hover States**:
  - Escala: `1.1` en hover
  - Z-index elevado
  - Muestra nombre del proyecto + icono al lado del título de sección
  - Animación del icono rallado (scribble animation)

- **Visual Feedback**:
  - Transiciones suaves (500ms) excepto durante drag
  - No hay transiciones mientras se arrastra para respuesta instantánea
  - Imágenes mantienen posición después de soltar

**Sistema de Posicionamiento**:
```typescript
interface Position {
  top: string; // Porcentaje (%)
  left: string; // Porcentaje (%)
}

// Posiciones aleatorias iniciales
const generateRandomPositions = (count: number) => {
  return Array.from({ length: count }, () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`
  }));
};

// Drag sin límites
const calculateDragPosition = (mouseX, mouseY, containerRect) => {
  const newLeft = ((mouseX - containerRect.left) / containerRect.width) * 100 - 5;
  const newTop = ((mouseY - containerRect.top) / containerRect.height) * 100 - 5;
  return { left: `${newLeft}%`, top: `${newTop}%` };
};
```

**Estados del Componente**:
```typescript
const [draggedImage, setDraggedImage] = useState<number | null>(null);
const [imagePositions, setImagePositions] = useState<Position[]>([]);
const [hoveredWork, setHoveredWork] = useState<string | null>(null);
```

---

### 12. Project Name Display
Muestra el nombre del proyecto con icono animado al hacer hover.

**Layout**:
- **Modo "All"**: Aparece al lado de la flecha de scroll
- **Modo Categorías**: Aparece al lado del título de la sección

**Componentes**:
```tsx
<div className="flex items-center gap-3">
  {/* Icono rallado animado */}
  <div className="w-[32px] h-[32px]">
    <svg viewBox="0 0 25 23">
      <path 
        className="animated-scribble-hover" 
        d={projectIcons[hoveredWork]}
      />
    </svg>
  </div>
  
  {/* Nombre del proyecto */}
  <div className="text-[24px]">
    {hoveredWork}
  </div>
</div>
```

**Animación**:
- Icono se dibuja progresivamente en cada hover
- Key prop cambia para reiniciar animación
- Duración: `2s ease-in-out`

---

### 13. Category Filter System
Sistema de filtrado por categorías con estado visual.

**Categorías**:
1. `all` - Muestra todo en carousel
2. `ux/ui` - Proyectos de diseño UX/UI
3. `editorial` - Proyectos editoriales
4. `branding` - Proyectos de branding
5. `playground` - Proyectos experimentales
6. `art & culture` - Proyectos culturales

**Visual States**:
- **Seleccionado**: Texto en gris (#8B8B8B)
- **No seleccionado**: Texto en negro
- **Hover**: Opacidad 0.7

**Comportamiento**:
- Click cambia la categoría activa
- Regenera posiciones aleatorias al cambiar categoría
- Resetea scroll del carousel a posición inicial
- Transición suave entre vistas

---

## 🎬 Animations

### Keyframes

#### Cursor Blink
```css
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
```

#### SVG Circle Draw
```css
@keyframes drawCircle {
  0% { stroke-dashoffset: 3500; }
  100% { stroke-dashoffset: 0; }
}
```

#### SVG Icon Draw
```css
@keyframes drawIcon {
  0% { stroke-dashoffset: 200; }
  100% { stroke-dashoffset: 0; }
}
```

#### SVG Scribble Hover
```css
@keyframes drawScribble {
  0% { 
    stroke-dashoffset: 200;
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  100% { 
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.animated-scribble-hover {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawScribble 2s ease-in-out forwards;
}
```

#### Marquee Text Scroll
```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

### Transitions
- **Standard**: `transition-opacity duration-300`
- **Hover**: `opacity: 0.7`
- **Arrow Transform**: `duration-300 ease-out`
- **Size Change**: `duration-500 ease-in-out`
- **Image Float**: `duration-500` (excepto durante drag)
- **Scale on Hover/Drag**: `scale-110`

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default: < 768px

/* Tablet */
md: 768px

/* Desktop */
lg: 1024px
```

### Responsive Typography
- Hero: `28px` → `36px` (md) → `48px` (lg)
- All other sizes remain constant across breakpoints

---

## 🖼️ Images & Assets

### Placeholders
- **Size**: `100px × 100px`
- **Background**: Black
- **Usage**: Video/media placeholders

### Project Images
- **Hover Preview**: Random position, `100px × 100px`
- **Gallery**: Variable sizes based on layout needs

### Image Sources
**Figma Imports**:
```tsx
// SVGs - Ruta relativa desde el componente
import svgPaths from "../../imports/svg-0pgs1q9s8l";

// Imágenes - Esquema virtual figma:asset
import imgUx1 from "figma:asset/9364cf9f30a1d6d9052bc36a0a91110cb0e344a1.png";
```

**External Images (Google Drive)**:
```tsx
// Formato para imágenes
<img 
  src="https://drive.google.com/uc?export=view&id=FILE_ID"
  alt="Description"
/>

// Formato para videos embedded
<iframe
  src="https://drive.google.com/file/d/FILE_ID/preview"
  className="w-full h-[400px]"
  allow="autoplay"
/>
```

**Unsplash Placeholder**:
```tsx
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src="https://source.unsplash.com/random/800x600?design"
  alt="Project preview"
/>
```

---

## 🎯 Interactions

### Hover States

**Official Hover System** ✅

El portfolio usa un sistema de hovers consistente basado en el color gris #8B8B8B:

1. **Text & Icon Hover**: Color change to Gray (#8B8B8B)
   - Todos los textos clickeables (botones, links, menús)
   - Todos los iconos SVG clickeables
   - Implementation: `group-hover:!text-[#8B8B8B]` con `!important` para sobrescribir estilos inline
   
2. **Arrow Transform**: Scale `1.1` + Translate X `8px`
   - ArrowButton component
   - Smooth transition 300ms

3. **SVG Animation**: Path drawing effect
   - Iconos con animación de trazo
   - Duration: 1s ease-in-out

**Components with Gray Hover (#8B8B8B)**:
- ✅ ArrowButton (text + arrow)
- ✅ IconButton (text + icon) - usado en categorías y proyectos
- ✅ Social links (HomePage)
- ✅ Menu buttons (hey!, my work, it's me, contact)
- ✅ Project names display

**Important Technical Note**:
- Use `group-hover:!text-[#8B8B8B]` with `!important` to override inline styles from ThemeContext
- Apply to both text and SVG stroke: `group-hover:!text-[#8B8B8B]` and `group-hover:stroke-[#8B8B8B]`
- Always add `transition-colors` for smooth color transitions

### Click Behaviors
1. **Navigation**: Smooth scroll to sections
2. **External Links**: Open in new tab
3. **Menu Toggle**: Mobile click toggle

### Scroll Behaviors
1. **Menu Transform**: Circle shrinks to fixed button at scroll > 300px
2. **Smooth Scroll**: All internal navigation uses `behavior: smooth`
3. **Back to Top**: Button appears at scroll > 300px

---

## 🔧 Usage Guidelines

### DO's
✅ Use exact font sizes and letter spacing  
✅ Maintain 85vh section heights  
✅ Use provided animations for consistency  
✅ Follow color palette strictly  
✅ Use Instrument Sans font exclusively  
✅ Maintain responsive padding structure  
✅ Add back-to-top button (32x32px) to scrollable pages  
✅ Use ScrollToTop component for route changes  
✅ Implement typewriter animation on case study titles  

### DON'Ts
❌ Don't create custom font sizes  
❌ Don't modify letter spacing values  
❌ Don't use colors outside the palette  
❌ Don't change animation durations  
❌ Don't override section heights  
❌ Don't use other fonts  
❌ Don't forget scroll prevention on WorksPage  

---

## 📦 Component Library

All components are located in `/src/app/components/`:

### Design System Components (`/design-system/`)
1. `ArrowButton.tsx` - Button with animated arrow
2. `IconButton.tsx` - Button with SVG icon
3. `SectionDivider.tsx` - Horizontal divider
4. `ContactInfo.tsx` - Contact information block
5. `Heading.tsx` - Section headings
6. `Text.tsx` - Body text variants
7. `SocialLinks.tsx` - Social media links

### Utility Components
8. `ScrollToTop.tsx` - Auto-scroll on route change
9. `MouseTrail.tsx` - Visual trail effect for cursor

### Figma Components (`/figma/`)
10. `ImageWithFallback.tsx` - Image with fallback support (protected)

---

## 🚀 Implementation

### Import Components
```tsx
import { ArrowButton } from './components/design-system/ArrowButton';
import { IconButton } from './components/design-system/IconButton';
import { SectionDivider } from './components/design-system/SectionDivider';
import { ContactInfo } from './components/design-system/ContactInfo';
import { Heading } from './components/design-system/Heading';
import { ScrollToTop } from './components/ScrollToTop';
import { MouseTrail } from './components/MouseTrail';
```

### Example Usage
```tsx
<ArrowButton 
  text="see more stuffs" 
  onClick={() => navigate('/works')}
  direction="right"
/>

<IconButton 
  icon={svgPath}
  text="MonoBank"
  onClick={handleClick}
  animated
/>

<SectionDivider />

<ContactInfo />

<Heading level={2}>my work</Heading>

<ScrollToTop />
<MouseTrail />
```

---

## 🎮 Advanced Interactions

### Drag & Drop Implementation

#### Setup States
```tsx
const [draggedImage, setDraggedImage] = useState<number | null>(null);
const [imagePositions, setImagePositions] = useState<Position[]>([]);
const containerRef = useRef<HTMLDivElement>(null);
```

#### Event Handlers
```tsx
// Iniciar drag
const handleImageMouseDown = (e: React.MouseEvent, index: number) => {
  e.preventDefault();
  setDraggedImage(index);
};

// Sistema de drag con eventos globales
useEffect(() => {
  if (draggedImage === null) return;

  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
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

  const handleGlobalMouseUp = () => {
    setDraggedImage(null);
  };

  document.addEventListener('mousemove', handleGlobalMouseMove);
  document.addEventListener('mouseup', handleGlobalMouseUp);

  return () => {
    document.removeEventListener('mousemove', handleGlobalMouseMove);
    document.removeEventListener('mouseup', handleGlobalMouseUp);
  };
}, [draggedImage]);
```

#### JSX Implementation
```tsx
<div ref={containerRef} className="relative flex-1 w-full">
  {items.map((item, index) => (
    <div
      key={item.id}
      className={`absolute w-[100px] h-[100px] hover:scale-110 hover:z-10 
        ${draggedImage === index ? 'cursor-grabbing scale-110 z-20' : 'cursor-grab'}
        ${draggedImage === index ? '' : 'transition-all duration-500'}`}
      style={{
        top: imagePositions[index]?.top,
        left: imagePositions[index]?.left,
      }}
      onMouseDown={(e) => handleImageMouseDown(e, index)}
    >
      <img src={item.image} alt={item.id} className="w-full h-full object-cover pointer-events-none select-none" />
    </div>
  ))}
</div>
```

### Scroll Prevention (WorksPage)
```tsx
useEffect(() => {
  // Prevenir scroll en mobile y desktop
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.height = '100%';
  
  return () => {
    // Restaurar scroll al desmontar
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
  };
}, []);
```

### Carousel Navigation
```tsx
// Scroll automático
const scrollCarousel = () => {
  if (carouselRef.current) {
    carouselRef.current.scrollBy({
      left: 220, // Ancho de 2 imágenes + gap
      behavior: 'smooth'
    });
  }
};

// Navegación por puntos
const scrollToPage = (pageIndex: number) => {
  if (carouselRef.current) {
    const carouselWidth = carouselRef.current.clientWidth;
    const itemWidth = 112;
    const itemsPerView = Math.floor(carouselWidth / itemWidth);
    
    carouselRef.current.scrollTo({
      left: pageIndex * itemWidth * itemsPerView,
      behavior: 'smooth'
    });
  }
};
```

---

## 🎨 CSS Classes Reference

### Custom Animations
```css
/* Scribble Icon Animation */
.animated-scribble-hover {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawScribble 2s ease-in-out forwards;
}

/* Icon Path Animation */
.animated-icon-path {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
}
.animated-icon-path:hover {
  animation: drawIcon 1s ease-in-out forwards;
}

/* Scrollbar Hide */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

### Utility Combinations
```tsx
// Imagen arrastrable
className="cursor-grab hover:cursor-grabbing select-none"

// Contenedor fijo sin scroll
className="overflow-hidden fixed inset-0"

// Transición condicional
className={`${isDragging ? '' : 'transition-all duration-500'}`}

// Scale en hover y drag
className="hover:scale-110 hover:z-10"
```

---

## 📊 Data Structures

### Work Item Interface
```typescript
interface WorkItem {
  id: string;              // Identificador único (ej: 'ux-1')
  image: string;           // URL de la imagen
  category: Category;      // Categoría del proyecto
  className?: string;      // Clases CSS opcionales
}

type Category = 'all' | 'ux/ui' | 'editorial' | 'branding' | 'playground' | 'art & culture';
```

### Position System
```typescript
interface Position {
  top: string;    // Porcentaje (ej: '50%')
  left: string;   // Porcentaje (ej: '30%')
}

// Generar posiciones aleatorias
const generateRandomPositions = (itemCount: number): Position[] => {
  return Array.from({ length: itemCount }, () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`
  }));
};
```

### Project Icons Mapping
```typescript
const projectIcons: Record<string, string> = {
  'ux-1': svgPaths.p30b01d80,
  'ux-2': svgPaths.p1da95340,
  'editorial-1': svgPaths.p2f537a00,
  // ... más mapeos
};
```

---

## 🎯 Best Practices

### Performance
- Usar `useRef` para referencias del DOM sin re-renders
- Eventos globales solo cuando sea necesario (drag & drop)
- Cleanup de event listeners en useEffect return
- Regenerar posiciones solo al cambiar categoría

### Accessibility
- Botones con `aria-label` descriptivos
- Imágenes con `alt` text apropiado
- Keyboard navigation support
- Focus states visibles

### Mobile Optimization
- Touch events considerados (drag también funciona con touch)
- Prevent scroll cuando sea necesario
- Responsive breakpoints bien definidos
- Performance optimizado para dispositivos móviles

### Code Organization
- Componentes reutilizables en `/components/design-system/`
- Estados locales en pages
- Refs para manipulación directa del DOM
- TypeScript para type safety

---

## 🔄 State Management Patterns

### Category Filtering
```tsx
const [selectedCategory, setSelectedCategory] = useState<Category>('all');

const filteredWorks = selectedCategory === 'all' 
  ? works 
  : works.filter(work => work.category === selectedCategory);

// Resetear estado al cambiar categoría
useEffect(() => {
  setCurrentPage(0);
  setImagePositions(generateRandomPositions(filteredWorks.length));
}, [selectedCategory]);
```

### Hover State Management
```tsx
const [hoveredWork, setHoveredWork] = useState<string | null>(null);

// Mostrar nombre solo cuando hay hover
{hoveredWork && (
  <div className="flex items-center gap-3">
    <AnimatedIcon workId={hoveredWork} />
    <div>{hoveredWork}</div>
  </div>
)}
```

### Drag State Management
```tsx
const [draggedImage, setDraggedImage] = useState<number | null>(null);

// Aplicar estilos condicionales
const isDragging = draggedImage === index;
className={`${isDragging ? 'cursor-grabbing scale-110 z-20' : 'cursor-grab'}`}
```

---

## 🎬 Animation Timing Guide

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| Scribble Draw | 2s | ease-in-out | Iconos rallados en hover |
| Icon Path Draw | 1s | ease-in-out | Iconos de navegación |
| Circle Draw | 2s | ease-in-out | Círculo del menú |
| Opacity Hover | 300ms | default | Todos los elementos clickeables |
| Scale Transform | 300ms | ease-out | Flechas y elementos interactivos |
| Image Transitions | 500ms | default | Movimiento de imágenes flotantes |
| Cursor Blink | 1s | step-end | Cursor de typing animation |
| Typewriter | 150ms/char | linear | Case study titles |
| Marquee Scroll | 30s | linear | Infinite text scroll |

---

## 📦 Export Structure

```tsx
// /src/app/components/design-system/index.ts
export { ArrowButton } from './ArrowButton';
export { IconButton } from './IconButton';
export { SectionDivider } from './SectionDivider';
export { ContactInfo } from './ContactInfo';
export { Heading } from './Heading';
export { SocialLinks } from './SocialLinks';

// Import en pages
import { 
  ArrowButton, 
  IconButton, 
  SectionDivider, 
  Heading 
} from '../components/design-system';
```

---

## 🗂️ Project Structure

```
/src
  /app
    /components
      /design-system    # Componentes reutilizables del sistema
        ArrowButton.tsx
        IconButton.tsx
        SectionDivider.tsx
        ContactInfo.tsx
        Heading.tsx
        Text.tsx
        SocialLinks.tsx
        index.ts
      /figma           # Componentes específicos de Figma
        ImageWithFallback.tsx (protected)
      /ui              # UI components (shadcn)
      ScrollToTop.tsx  # Utility para reset scroll
      MouseTrail.tsx   # Utility para trail visual
    /pages
      HomePage.tsx     # Página principal con scroll
      WorksPage.tsx    # Galería con drag & drop
      BeatBitsCase.tsx # Case study page
    App.tsx           # Root component con routing
  /imports           # Assets importados de Figma
  /styles
    fonts.css        # Importación de fuentes
    theme.css        # Sistema de tipografía y tokens
    tailwind.css     # Tailwind base
    index.css        # Global styles y animations
  /docs
    design-system.md # Esta documentación
/guidelines
  Guidelines.md      # Development guidelines
```

---

## 🎯 Key Features Implementation

### 1. Dual Gallery System
- Vista "all": Carousel horizontal con scroll
- Vistas por categoría: Floating gallery con drag & drop

### 2. Drag & Drop System
- Posicionamiento libre sin límites
- Eventos globales del documento
- Visual feedback instantáneo
- Persistencia de posición al soltar

### 3. Project Name Display
- Modo carousel: Al lado de la flecha
- Modo flotante: Al lado del título de categoría
- Icono rallado animado diferente por proyecto

### 4. Category Filter
- 6 categorías: all, ux/ui, editorial, branding, playground, art & culture
- Estado visual claro (gris cuando seleccionado)
- Regeneración de posiciones al cambiar

### 5. Scroll Prevention
- Body fixed en WorksPage
- Prevención de scroll en mobile
- Restauración al navegar fuera

### 6. Back to Top Button
- Aparece en scroll > 300px
- 32x32px size
- Smooth scroll animation
- Presente en HomePage y Case Study pages

### 7. Route Navigation
- ScrollToTop component resetea posición
- Smooth transitions entre páginas
- Preserve state cuando sea necesario

---

**Version**: 2.2  
**Last Updated**: December 17, 2024  
**Maintained by**: Claudia Tardito

---

## 📝 Recent Updates

### December 17, 2024
- ✅ Agregado Guz Studio case study
- ✅ Documentación actualizada con 21 case studies completos
- ✅ Todos los proyectos conectados con routing funcional
- ✅ Videos embedidos de YouTube y Google Drive funcionando
- ✅ Sistema completo de 27 proyectos con media externa

### Key Metrics
- **Total Projects**: 27
- **Case Studies**: 21 completos
- **Categories**: 6 (all, ux/ui, editorial, branding, playground, art & culture)
- **Components**: 12+ reusable components
- **Pages**: 3 main pages + 21 case study pages

---

## 📞 Support

Para preguntas sobre este design system o actualizaciones:
- **Email**: claudia.tardito@example.com
- **Portfolio**: claudia-tardito-portfolio.github.io
- **Documentation**: `/src/docs/design-system.md`