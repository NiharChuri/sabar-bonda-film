import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Section = ({ children, className = '', fullWidth = false }: SectionProps) => {
  return (
    <section className={`py-12 sm:py-16 lg:py-20 ${className}`}>
      <div className={fullWidth ? '' : 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'}>
        {children}
      </div>
    </section>
  );
};

export default Section;