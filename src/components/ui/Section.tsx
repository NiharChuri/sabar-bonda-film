import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface SectionProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  enableParallax?: boolean;
  animationDelay?: number;
}

const Section = ({ 
  children, 
  className = '', 
  fullWidth = false, 
  enableParallax = false,
  animationDelay = 0
}: SectionProps) => {
  const { ref, isVisible, parallaxOffset } = useScrollAnimation<HTMLElement>({
    enableParallax,
    delay: animationDelay,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <section 
      ref={ref}
      className={`py-12 sm:py-16 lg:py-20 ${className} transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transform: enableParallax 
          ? `translateY(${parallaxOffset}px)` 
          : undefined
      }}
    >
      <div className={fullWidth ? '' : 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'}>
        {children}
      </div>
    </section>
  );
};

export default Section;