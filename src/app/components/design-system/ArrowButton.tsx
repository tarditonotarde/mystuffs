import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface ArrowButtonProps {
  text: string;
  onClick?: () => void;
  direction?: 'left' | 'right';
  svgPaths?: {
    p3ecd4f00: string;
    p8aff500: string;
  };
  className?: string;
}

export function ArrowButton({ 
  text, 
  onClick, 
  direction = 'right',
  svgPaths,
  className = ''
}: ArrowButtonProps) {
  const { colors } = useTheme();
  const [animKey, setAnimKey] = useState(0);

  const isLeft = direction === 'left';

  return (
    <button 
      onClick={onClick}
      className={`flex items-end gap-3 group cursor-pointer transition-all h-[52px] ${className}`}
      onMouseEnter={() => setAnimKey(prev => prev + 1)}
    >
      {isLeft && svgPaths && (
        <div className="w-[52px] h-[52px] rotate-180 scale-y-[-1] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-x-2">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
            <g>
              <path 
                key={`arrow1-${animKey}`}
                className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                d={svgPaths.p3ecd4f00} 
                stroke={colors.text}
                strokeWidth="1.5" 
              />
              <path 
                key={`arrow2-${animKey}`}
                className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                d={svgPaths.p8aff500} 
                stroke={colors.text}
                strokeWidth="1.5" 
              />
            </g>
          </svg>
        </div>
      )}
      
      <p className="font-['Instrument_Sans:Medium',sans-serif] font-medium text-[24px] tracking-[-0.72px] transition-colors group-hover:!text-[#8B8B8B]" style={{ fontVariationSettings: "'wdth' 100", color: colors.text }}>
        {text}
      </p>
      
      {!isLeft && svgPaths && (
        <div className={`w-[52px] h-[52px] transition-transform duration-300 ease-out group-hover:scale-110 ${direction === 'right' ? 'group-hover:rotate-90' : 'group-hover:translate-x-2'}`}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 53 53">
            <g>
              <path 
                key={`arrow1-${animKey}`}
                className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                d={svgPaths.p3ecd4f00} 
                stroke={colors.text}
                strokeWidth="1.5" 
              />
              <path 
                key={`arrow2-${animKey}`}
                className="animated-icon-path group-hover:stroke-[#8B8B8B] transition-colors" 
                d={svgPaths.p8aff500} 
                stroke={colors.text}
                strokeWidth="1.5" 
              />
            </g>
          </svg>
        </div>
      )}
    </button>
  );
}