import { ArrowButton } from './ArrowButton';

interface SocialLink {
  name: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  svgPaths?: {
    p3ecd4f00: string;
    p8aff500: string;
  };
  className?: string;
}

export function SocialLinks({ links, svgPaths, className = '' }: SocialLinksProps) {
  return (
    <div className={`space-y-4 flex flex-col items-end ${className}`}>
      {links.map((link) => (
        <ArrowButton
          key={link.name}
          text={link.name}
          onClick={() => window.open(link.url, '_blank')}
          direction="right"
          svgPaths={svgPaths}
        />
      ))}
    </div>
  );
}
