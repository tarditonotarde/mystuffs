# Claudia Tardito Portfolio - Development Guidelines

## 📋 General Guidelines

### Code Structure
- Mantener las importaciones de Figma intactas (no modificar diseños importados a menos que sea necesario)
- Refactorizar código progresivamente para mantener limpieza
- Mantener archivos pequeños y componentes en archivos separados
- Usar TypeScript para type safety

### Layout Principles
- Usar flexbox y grid por defecto, evitar absolute positioning innecesario
- Diseño mobile-first con breakpoints responsive
- **HomePage**: Permitir scroll normal para navegación entre secciones + back-to-top button (32x32px)
- **WorksPage**: Layout fijo sin scroll (`overflow: hidden`, `position: fixed`) para experiencia de galería interactiva
- **Case Study Pages**: Permitir scroll normal + back-to-top button (32x32px) + typewriter animation en título

---

## 🎨 Design System Guidelines

### Typography Rules
**CRITICAL**: Nunca usar clases de Tailwind para:
- Font size (text-xl, text-2xl, etc.)
- Font weight (font-bold, font-semibold, etc.)
- Line height (leading-none, leading-tight, etc.)

**REASON**: Tenemos un sistema de tipografía personalizado en `/src/styles/theme.css` que NO debe ser sobrescrito.

### Font Specifications
- **Hero Text**: 48px desktop / 36px tablet / 28px mobile
- **Headings**: 24px
- **Buttons**: 24px (Medium o SemiBold)
- **Contact/Menu**: 14px
- **Font Family**: Instrument Sans exclusivamente
- **Letter Spacing**: Valores específicos (-2.4px hero, -1.2px headings, -0.72px buttons, -0.42px small text)

### Color Palette
```css
Black: #000000 (texto principal, bordes)
White: #FFFFFF (fondos)
Gray: #8B8B8B (texto deshabilitado/seleccionado)
```

### Dark Mode System
El portfolio implementa un sistema de temas dinámico con ThemeContext.

**Scope**:
- ✅ **Activo en**: HomePage y WorksPage
- ❌ **NO activo en**: Case Study Pages (siempre modo claro)

**Características**:
- Persistencia en localStorage
- Transiciones suaves entre temas
- Colores dinámicos adaptables
- MouseTrail adaptable al tema

**Color Palette - Dark Mode**:
```css
Background: #000000 (fondo oscuro)
Text: #FFFFFF (texto blanco)
Gray: #8B8B8B (igual que light mode)
Border: #FFFFFF (bordes blancos)
```

**ThemeContext Implementation**:
```tsx
// /src/app/contexts/ThemeContext.tsx
const { theme, toggleTheme, colors } = useTheme();

// theme: 'light' | 'dark'
// colors: { background, text, gray, border }
```

**Usage Pattern**:
```tsx
// En HomePage y WorksPage
import { useTheme } from '../contexts/ThemeContext';

const { theme, colors } = useTheme();

// Aplicar colores dinámicos
<div style={{ 
  backgroundColor: colors.background,
  color: colors.text,
  borderColor: colors.border
}}>
```

**Theme Toggle Button**:
- SVG importado desde Figma (svgPathsTheme)
- Position: Fixed top-right corner
- Hover: opacity 0.7
- Click: toggleTheme()

**Adaptaciones específicas para Dark Mode**:

1. **MouseTrail Component**:
   - Light mode: `rgba(0, 0, 0, opacity)` + `mixBlendMode: 'darken'`
   - Dark mode: `rgba(255, 255, 255, opacity)` + `mixBlendMode: 'lighten'`

2. **Typewriter Cursor**:
   - Light mode: Negro (#000000)
   - Dark mode: Blanco (#FFFFFF)
   - Implementation: `backgroundColor: theme === 'dark' ? '#FFFFFF' : colors.text`

3. **SVG Icons**:
   - Stroke color dinámico basado en `colors.border`
   - Border color dinámico en menús y dividers

4. **Transiciones**:
   - `transition-colors duration-300` en elementos que cambian color
   - Smooth transitions para evitar flash visual

**IMPORTANT**:
- NO implementar dark mode en case studies
- Siempre usar `colors` del ThemeContext, NO hardcodear colores
- Agregar `transition-colors duration-300` a elementos con colores dinámicos

### Spacing System
- **Section Height**: `min-h-[85vh] max-h-[85vh]` para todas las secciones principales
- **Container**: max-w-[1280px] con padding responsive
- **Gaps**: 12px (small), 16px (medium), 48px (large), 64px (xlarge)

---

## 🖼️ Figma Imports & Asset Management

### SVG Management
- **Vectors SVG**: Importar desde `/src/imports/` usando rutas relativas
- **Raster Images**: Usar esquema `figma:asset/[hash].png` (NO agregar prefijos de ruta)

### Ejemplo de Importación
```tsx
// SVGs - Ruta relativa
import svgPaths from "../../imports/svg-0pgs1q9s8l";

// Imágenes - Esquema virtual
import imgUx1 from "figma:asset/9364cf9f30a1d6d9052bc36a0a91110cb0e344a1.png";
```

### External Images (Google Drive)
Para reemplazar placeholders con imágenes/videos reales:

#### Google Drive - Pasos para obtener URL directa:
1. **Subir archivo** a Google Drive
2. **Compartir**: Click derecho → "Compartir" → Cambiar a "Cualquier persona con el enlace"
3. **Copiar enlace**: Se verá como `https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing`
4. **Extraer ID**: La parte entre `/d/` y `/view` es el ID (`1ABC123xyz`)
5. **Convertir a URL directa**:
   - **Para imágenes**: `https://drive.google.com/uc?export=view&id=1ABC123xyz`
   - **Para videos embedded**: `https://drive.google.com/file/d/1ABC123xyz/preview`

#### Uso en código:
```tsx
// Imágenes
<img 
  src="https://drive.google.com/uc?export=view&id=FILE_ID"
  alt="Description"
  className="w-full h-auto"
/>

// Videos embedded
<iframe
  src="https://drive.google.com/file/d/FILE_ID/preview"
  className="w-full h-[400px]"
  allow="autoplay"
  title="Video Title"
/>
```

#### Alternativas a Google Drive:
- **Imgur**: Para imágenes rápidas (URL directa: `https://i.imgur.com/abc123.jpg`)
- **GitHub**: Para assets del proyecto (URL: `https://raw.githubusercontent.com/user/repo/main/path/image.png`)

**NO USAR**: iCloud (no da URLs directas funcionales para `<img>` tags)

### Preservar Diseños
- NO modificar estructura de elementos importados de Figma
- NO cambiar clases de Tailwind en código importado (a menos que sea requerido)
- Mantener todos los atributos `style` originales
- Preservar todas las imágenes de fondo

---

## 🎬 Animation Guidelines

### SVG Animations
Usar keyframes específicas del design system:

```css
/* Scribble Animation - Para iconos rallados */
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
```

### Typewriter Animation
Para case study pages y títulos dinámicos:

```tsx
// States
const [typedText, setTypedText] = useState('');
const [showCursor, setShowCursor] = useState(true);
const fullText = 'case study';

// Typing effect (150ms por carácter)
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

// Cursor blink (530ms)
useEffect(() => {
  const cursorInterval = setInterval(() => {
    setShowCursor(prev => !prev);
  }, 530);

  return () => clearInterval(cursorInterval);
}, []);
```

### Transition Rules
- **Hover States**: `opacity: 0.7` en todos los elementos clickeables
- **Transforms**: `duration-300 ease-out` para cambios suaves
- **Scale**: `scale-110` en hover y drag de imágenes
- **NO transiciones durante drag**: Desactivar transitions mientras se arrastra para feedback instantáneo

---

## 🖱️ Interaction Patterns

### Works Gallery Interactions

#### Toggle Button (Carousel/Grid Mode)
Botón que permite cambiar entre dos modos de visualización.

**Especificaciones**:
- **Position**: Al lado del título "Works" con `gap-3`
- **Icons**: Lucide React - `GalleryHorizontal` (modo carousel activo) y `LayoutGrid` (modo grid activo)
- **Size**: `18px × 18px`
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

#### Carousel Mode (Horizontal Scroll)
Modo de visualización horizontal para todas las categorías.

**Layout**:
- Scroll horizontal suave con scrollbar oculto
- Imágenes: `50px × 50px` (consistente en todas las categorías)
- Gap: `24px` (gap-6) entre imágenes
- Flex layout con `items-center` para alineación vertical
- Overflow-x: auto con `scrollBehavior: 'smooth'`

**Interacciones**:
- Hover en imagen muestra nombre del proyecto + icono animado al lado del título
- Scale `1.1` en hover
- Click navega al case study correspondiente
- Scroll horizontal suave

**Implementation**:
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

#### Floating Gallery Mode (Grid Aleatorio)
Modo de visualización con imágenes flotantes y drag & drop.

- Imágenes flotantes con posiciones aleatorias
- **Drag & Drop**:
  - Sin límites de movimiento
  - Cursor: `cursor-grab` → `cursor-grabbing`
  - Eventos globales del documento (mousedown, mousemove, mouseup)
  - Calcular posición en porcentaje del contenedor
  
```typescript
// Ejemplo de sistema de drag
const handleImageMouseDown = (e: React.MouseEvent, index: number) => {
  e.preventDefault();
  setDraggedImage(index);
};

useEffect(() => {
  if (draggedImage === null) return;
  
  const handleGlobalMouseMove = (e: MouseEvent) => {
    const newPos = calculatePosition(e.clientX, e.clientY);
    updateImagePosition(draggedImage, newPos);
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

### Hover Behavior
- **HomePage**: Proyectos destacados muestran previsualización de imagen aleatoria
- **WorksPage**: Hover muestra nombre + icono al lado del título
- Key prop en SVG para reiniciar animación en cada hover

### Back to Top Button
Implementar en todas las páginas con scroll (HomePage, Case Study pages):

**Especificaciones**:
- **Size**: `32px × 32px` (w-8 h-8)
- **Position**: Fixed `bottom-8 right-6 md:right-12 lg:right-16`
- **Trigger**: Aparece cuando `scrollY > 300px`
- **Animation**: SVG arrow con scribble draw animation
- **Behavior**: Click → smooth scroll to top

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

// Scroll function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
```

---

## 📱 Mobile Optimization

### Scroll Prevention (WorksPage)
```typescript
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
```

### Responsive Behavior
- **Mobile** (<768px): Layout simplificado, padding reducido
- **Tablet** (768px+): Padding intermedio, algunas features adicionales
- **Desktop** (1024px+): Experiencia completa con todas las animaciones

---

## 🚫 DO's and DON'Ts

### ✅ DO's
- Mantener fidelidad exacta a las maquetas de Figma
- Usar únicamente Instrument Sans
- Preservar todos los elementos y clases del código importado
- Implementar animaciones suaves y consistentes
- Usar el sistema de componentes del design system
- Regenerar posiciones aleatorias al cambiar categorías
- Agregar back-to-top button (32x32px) en páginas con scroll
- Usar ScrollToTop component para navegación entre rutas
- Implementar typewriter animation en case study titles
- Usar Google Drive para imágenes/videos reales (con URL directa correcta)

### ❌ DON'Ts
- NO modificar tamaños de fuente a menos que se solicite explícitamente
- NO usar otras fuentes o tipografías
- NO cambiar el color palette
- NO modificar los valores de letter-spacing
- NO sobrescribir las alturas de sección (85vh)
- NO agregar scroll a WorksPage
- NO modificar código importado de Figma sin necesidad
- NO usar iCloud para imágenes (no da URLs directas)
- NO olvidar cleanup de event listeners en useEffect

---

## 🔧 Component Usage

### ArrowButton
```tsx
<ArrowButton 
  text="see more stuffs"
  onClick={() => navigate('/works')}
  direction="right"
  svgPaths={svgPaths}
/>
```

### IconButton
```tsx
<IconButton
  icon={iconPath}
  text="ux/ui"
  onClick={() => setCategory('ux/ui')}
  selected={selectedCategory === 'ux/ui'}
  variant="semibold"
/>
```

### Heading
```tsx
<Heading level={2}>
  everything
</Heading>
```

### ScrollToTop
```tsx
// En App.tsx
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

## 🗂️ File Structure

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
      ScrollToTop.tsx  # Auto-scroll on route change
    /pages
      HomePage.tsx     # Página principal con scroll + back-to-top
      WorksPage.tsx    # Galería con drag & drop (sin scroll)
      BeatBitsCase.tsx # Case study con scroll + back-to-top + typewriter
    App.tsx           # Root component con routing
  /imports           # Assets importados de Figma
  /styles
    fonts.css        # Importación de fuentes
    theme.css        # Sistema de tipografía y tokens
    tailwind.css     # Tailwind base
    index.css        # Global styles y animations
  /docs
    design-system.md # Documentación completa de componentes
/guidelines
  Guidelines.md      # Este archivo
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

### 5. Scroll Management
- **WorksPage**: Body fixed sin scroll
- **HomePage & Case Studies**: Scroll normal con back-to-top button
- **Route Changes**: ScrollToTop component resetea posición

### 6. Back to Top Button
- **Size**: 32x32px
- **Trigger**: scrollY > 300px
- **Behavior**: Smooth scroll to top
- **Animation**: SVG scribble draw on hover
- **Locations**: HomePage, BeatBitsCase, y todas las case study pages

### 7. Typewriter Animation
- **Use in**: Case study titles
- **Speed**: 150ms per character
- **Cursor**: 2px width, blink every 530ms
- **Effect**: Types text character by character

### 8. Navigation System
- React Router para navegación entre páginas
- ScrollToTop component para reset automático
- ArrowButton para CTAs y navegación
- Back button en case studies

---

## 📚 Documentation Reference

- **Design System**: `/src/docs/design-system.md` (Documentación completa de componentes)
- **Theme Tokens**: `/src/styles/theme.css` (Variables y tipografía)
- **Animations**: `/src/styles/index.css` (Keyframes y animaciones)
- **Guidelines**: `/guidelines/Guidelines.md` (Este archivo)

---

## 🔄 Recent Updates (December 17, 2024)

### Added:
- ✅ **Toggle Button para Carousel/Grid Mode** en WorksPage:
  - Botón con iconos de Lucide React (GalleryHorizontal y LayoutGrid)
  - Size: 18x18px, strokeWidth: 1.5px
  - Hover con color gris #8B8B8B
  - Permite cambiar entre modo carousel y modo grid flotante
  - Position: Al lado del título con gap-3
- ✅ **Modo Carousel actualizado**:
  - Imágenes de 50x50px (consistente con modo "all" flotante)
  - Gap de 24px entre imágenes
  - Scroll horizontal suave con scrollbar oculto
  - Hover muestra nombre del proyecto + icono animado
- ✅ **Dark Mode System** implementado completamente:
  - ThemeContext con persistencia en localStorage
  - Toggle button con SVG importado desde Figma
  - Color palette dinámico (light/dark)
  - Solo activo en HomePage y WorksPage (NO en case studies)
  - MouseTrail adaptable al tema (blanco en dark mode)
  - Typewriter cursor adaptable al tema (blanco en dark mode)
  - Transiciones suaves entre temas (300ms)
- ✅ 27 proyectos reales con GIFs de Giphy y Google Drive
- ✅ Case study pages completas para todos los proyectos principales:
  - BeatBits (música interactiva)
  - Chronogo (gestión del tiempo)
  - Herta Security (seguridad biométrica)
  - MonoBank (banca digital)
  - SynapHelmet (casco ciclista inteligente)
  - Countify (contador de calorías)
  - Infamia Museum (museo virtual)
  - Trashtour LDN, BER, BCN (tours turísticos)
  - La Olla Común (cocina comunitaria)
  - Go Home Mag (revista cultural)
  - Hertaverse (metaverso)
  - Beethoven 2020 (festival musical)
  - Mi gato Bolaño (editorial)
  - Letrarte Ediciones (editorial)
  - FILSA (feria del libro)
  - Cuarta Estación Circus (circo)
  - Cirkubrick (arte y cultura)
  - Infinito (art & culture)
  - ARC Festival (music festival con 3 videos de YouTube embedded)
  - Sedas Rina María / Lozanía (branding textil de lujo)
  - Guz Studio (brand design & positioning)
- ✅ ScrollToTop component para navegación
- ✅ Back to top button (32x32px) funcional en todas las páginas con scroll
- ✅ Typewriter animation en títulos de case studies
- ✅ MouseTrail component para trail de cursor personalizado
- ✅ Videos embedidos de YouTube y Google Drive funcionando correctamente
- ✅ Sistema de routing completo con HashRouter para GitHub Pages
- ✅ Todos los links de proyectos conectados a sus case studies

### Fixed:
- ✅ Compilation errors en todos los case studies
- ✅ Back to top button aparece correctamente al scroll
- ✅ Animación del arrow en back to top button
- ✅ Scroll animations funcionando suavemente
- ✅ Videos con autoplay, mute, y loop configurados correctamente
- ✅ Nomenclatura "Lozanía" (no "LOZANÍA") en Sedas Rina María case
- ✅ MouseTrail cursor blanco en modo oscuro
- ✅ Typewriter cursor blanco en modo oscuro
- ✅ **Hover System completo implementado con color gris #8B8B8B**:
  - ArrowButton (text + arrow) usando `group-hover:!text-[#8B8B8B]`
  - IconButton (text + icon) para categorías y proyectos
  - Social links en HomePage
  - Menu buttons (hey!, my work, it's me, contact)
  - "back to works" y "next project" buttons en case studies
  - Todas las categorías de WorksPage (all, ux/ui, editorial, branding, playground, art & culture)

### Documentation:
- ✅ Actualizado design-system.md con nuevos componentes
- ✅ Actualizado design-system.md con Dark Mode System completo
- ✅ Actualizado design-system.md con Official Hover System (#8B8B8B)
- ✅ Actualizado Guidelines.md con Google Drive instructions
- ✅ Agregadas especificaciones de back to top button
- ✅ Agregadas guías de typewriter animation
- ✅ Agregadas guías de Dark Mode implementation
- ✅ Documentación de videos embedidos (YouTube y Google Drive)
- ✅ Documentación de ThemeContext y uso de colores dinámicos
- ✅ Documentación de MouseTrail adaptable al tema
- ✅ Documentación completa del Hover System con `group-hover:!text-[#8B8B8B]`

### Projects Status:
- **Total Projects**: 27
- **Case Studies Completed**: 21
- **Categories**: ux/ui (4), editorial (6), branding (10), playground (2), art & culture (11)
- **External Media**: GIFs de Giphy, imágenes de Google Drive, videos de YouTube
- **Theme Support**: Dark/Light mode en HomePage y WorksPage

---

## 🎓 Development Workflow

### Para agregar una nueva Case Study Page:
1. Crear archivo en `/src/app/pages/ProjectNameCase.tsx`
2. Implementar estructura base con:
   - Header con círculo animado y menú
   - Typewriter animation en título
   - Secciones de contenido con max-w-[1280px]
   - Back to top button (32x32px)
   - ArrowButton para navegación
3. Agregar ruta en `App.tsx`
4. Usar Google Drive para imágenes/videos reales
5. Mantener consistencia con BeatBitsCase.tsx

### Para agregar assets externos:
1. Subir a Google Drive
2. Cambiar permisos a "Cualquier persona con el enlace"
3. Extraer ID del enlace compartido
4. Usar formato correcto:
   - Imágenes: `https://drive.google.com/uc?export=view&id=ID`
   - Videos: `https://drive.google.com/file/d/ID/preview`
5. Reemplazar placeholders en código

### Para debugging:
1. Verificar que imports de Figma usen rutas correctas
2. Comprobar que ScrollToTop esté en App.tsx
3. Verificar cleanup de event listeners
4. Revisar console para warnings de React
5. Testear responsive en mobile/tablet/desktop

---

## 🎨 Style Consistency Checklist

Antes de considerar una página completa:

- [ ] Font: Solo Instrument Sans usado
- [ ] Colors: Solo Black, White, Gray del palette
- [ ] Spacing: Usa valores del spacing system (12px, 16px, 48px, 64px)
- [ ] Typography: NO usa clases text-*, font-*, leading-*
- [ ] Container: max-w-[1280px] con padding responsive
- [ ] Animations: Usa keyframes del design system
- [ ] Hover: Color gris #8B8B8B en textos e iconos clickeables (`group-hover:!text-[#8B8B8B]`)
- [ ] Back to top: Presente en páginas con scroll (32x32px)
- [ ] ScrollToTop: Component incluido en routing
- [ ] Event Cleanup: Todos los listeners limpiados en useEffect return
- [ ] Mobile: Tested en breakpoints mobile/tablet/desktop
- [ ] Assets: URLs funcionales (Google Drive con formato correcto)

---

## 💡 Tips & Best Practices

### Performance:
- Usa `useRef` para DOM refs sin causar re-renders
- Solo agrega event listeners globales cuando sea necesario
- Siempre limpia listeners en cleanup function
- Regenera posiciones solo cuando cambia categoría

### Code Quality:
- TypeScript interfaces para type safety
- Componentes pequeños y reutilizables
- Estados locales en pages, no global state innecesario
- Comentarios en español para claridad

### UX:
- Smooth scroll en todas las navegaciones
- Feedback visual inmediato en interacciones
- Animations consistentes y no invasivas
- Mobile-first pero desktop-optimized

### Asset Management:
- Google Drive para assets grandes (videos, imágenes HD)
- Figma imports para assets del diseño original
- Unsplash/ImageWithFallback para placeholders temporales
- Siempre incluir alt text descriptivo

---

**Version**: 2.1  
**Last Updated**: December 17, 2024  
**Maintained by**: Claudia Tardito

---

## 📝 Notes

Este portfolio es un trabajo en progreso. La documentación se actualiza continuamente conforme se agregan nuevas features y componentes. 

Para preguntas o sugerencias sobre el design system o estas guidelines, consultar con Claudia Tardito.