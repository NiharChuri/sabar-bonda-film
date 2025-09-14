import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  centered?: boolean;
  variant?: 'light' | 'dark' | 'bold';
  animationDelay?: number;
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  children, 
  centered = false, 
  variant = 'light',
  animationDelay = 0
}: SectionHeaderProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({
    delay: animationDelay,
    threshold: 0.3
  });

  let titleClass;
  if (variant === 'bold') {
    titleClass = 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cabinet font-black tracking-tight text-white mb-4 sm:mb-6';
  } else if (variant === 'dark') {
    titleClass = 'text-2xl sm:text-3xl md:text-4xl font-cabinet font-bold tracking-tight text-white mb-3 sm:mb-4';
  } else {
    titleClass = 'text-2xl sm:text-3xl md:text-4xl font-cabinet font-bold tracking-tight text-ink-900 mb-3 sm:mb-4';
  }
    
  const subtitleClass = variant === 'dark' || variant === 'bold'
    ? 'text-base sm:text-lg leading-relaxed text-white/80 max-w-3xl font-nohemi font-medium'
    : 'text-base sm:text-lg leading-relaxed text-muted max-w-3xl font-nohemi font-medium';

  return (
    <header 
      ref={ref}
      className={`mb-8 sm:mb-10 lg:mb-12 transition-all duration-800 ease-out ${
        centered ? 'text-center' : ''
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <h2 className={`${titleClass} transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: '200ms' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`${subtitleClass} transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '400ms' }}
        >
          {subtitle}
        </p>
      )}
      {children && (
        <div className={`transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ transitionDelay: '600ms' }}
        >
          {children}
        </div>
      )}
    </header>
  );
};

export default SectionHeader;