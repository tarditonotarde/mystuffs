import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    bg: string;
    text: string;
    border: string;
    gray: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Cargar tema guardado de localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    return (savedTheme as Theme) || 'light';
  });

  useEffect(() => {
    // Guardar tema en localStorage
    localStorage.setItem('portfolio-theme', theme);
    
    // Aplicar clase al body para transiciones globales
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const colors = {
    bg: theme === 'light' ? '#FFFFFF' : '#000000',
    text: theme === 'light' ? '#000000' : '#FFFFFF',
    border: theme === 'light' ? '#000000' : '#FFFFFF',
    gray: '#8B8B8B',
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
