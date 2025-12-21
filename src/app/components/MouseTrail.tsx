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

  // Detectar movimiento del mouse
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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Dibujar en el canvas y limpiar puntos antiguos
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Filtrar puntos antiguos (mayores a 1 segundo)
    const now = Date.now();
    const filteredPoints = points.filter(point => now - point.timestamp < 1000);
    
    if (filteredPoints.length !== points.length) {
      setPoints(filteredPoints);
    }

    // Dibujar líneas
    if (filteredPoints.length > 1) {
      filteredPoints.forEach((point, index) => {
        if (index === 0) return;

        const prevPoint = filteredPoints[index - 1];
        const age = now - point.timestamp;
        const opacity = Math.max(0, 1 - age / 1000); // Desvanece en 1 segundo

        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(point.x, point.y);
        // Usar blanco en modo oscuro, negro en modo claro
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

  // Animar continuamente para actualizar el fade
  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const now = Date.now();
        return prev.filter(point => now - point.timestamp < 1000);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Redimensionar canvas
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