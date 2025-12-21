interface TextProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div' | 'li';
}

export function Text({ children, className = '', style = {}, as: Component = 'p' }: TextProps) {
  const combinedStyle = {
    fontFamily: 'Instrument Sans, sans-serif',
    fontVariationSettings: "'wdth' 100",
    ...style
  };

  return (
    <Component className={className} style={combinedStyle}>
      {children}
    </Component>
  );
}
