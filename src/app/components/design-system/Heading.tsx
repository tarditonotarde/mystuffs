import { useTheme } from '../../contexts/ThemeContext';

interface HeadingProps {
  level?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level = 2, children, className = '' }: HeadingProps) {
  const { colors } = useTheme();
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag 
      className={`font-['Instrument_Sans:Regular',sans-serif] font-normal text-[18px] md:text-[24px] tracking-[-1.2px] transition-colors duration-300 ${className}`}
      style={{ fontVariationSettings: "'wdth' 100", color: colors.text }}
    >
      {children}
    </Tag>
  );
}