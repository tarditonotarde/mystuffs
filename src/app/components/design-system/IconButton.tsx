import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface IconButtonProps {
  icon: string;
  text: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  animated?: boolean;
  selected?: boolean;
  variant?: 'regular' | 'semibold';
  viewBox?: string;
  className?: string;
}

export function IconButton({ 
  icon, 
  text, 
  onClick,
  onMouseEnter,
  onMouseLeave,
  animated = true,
  selected = false,
  variant = 'semibold',
  viewBox = '0 0 26 27',
  className = ''
}: IconButtonProps) {
  const { colors } = useTheme();
  const [animKey, setAnimKey] = useState(0);

  const handleMouseEnter = () => {
    if (animated) {
      setAnimKey(prev => prev + 1);
    }
    onMouseEnter?.();
  };

  const fontFamily = variant === 'semibold' 
    ? "font-['Instrument_Sans:SemiBold',sans-serif] font-semibold"
    : "font-['Instrument_Sans:Medium',sans-serif] font-medium";

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`flex items-center gap-4 group cursor-pointer transition-all ${className}`}
    >
      <div className="w-[24px] h-[26px] flex-shrink-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={viewBox}>
          <path 
            key={animated ? `icon-${animKey}` : undefined}
            className={`${animated ? "animated-icon-path" : ""} group-hover:stroke-[#8B8B8B] transition-colors`} 
            d={icon} 
            stroke={selected ? colors.gray : colors.text}
            strokeLinecap="round" 
            strokeWidth="0.5" 
          />
        </svg>
      </div>
      <p 
        className={`${fontFamily} text-[24px] tracking-[-0.72px] text-left transition-colors group-hover:!text-[#8B8B8B]`}
        style={{ 
          fontVariationSettings: "'wdth' 100",
          color: selected ? colors.gray : colors.text
        }}
      >
        {text}
      </p>
    </button>
  );
}