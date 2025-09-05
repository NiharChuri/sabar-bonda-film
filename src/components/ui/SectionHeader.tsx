import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  centered?: boolean;
  variant?: 'light' | 'dark' | 'bold';
}

const SectionHeader = ({ title, subtitle, children, centered = false, variant = 'light' }: SectionHeaderProps) => {
  let titleClass;
  if (variant === 'bold') {
    titleClass = 'text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white mb-6';
  } else if (variant === 'dark') {
    titleClass = 'text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white mb-4';
  } else {
    titleClass = 'text-3xl sm:text-4xl font-serif font-bold tracking-tight text-ink-900 mb-4';
  }
    
  const subtitleClass = variant === 'dark' || variant === 'bold'
    ? 'text-lg leading-relaxed text-white/80 max-w-3xl font-nohemi font-medium'
    : 'text-lg leading-relaxed text-muted max-w-3xl font-nohemi font-medium';

  return (
    <header className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className={titleClass}>
        {title}
      </h2>
      {subtitle && (
        <p className={subtitleClass}>
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
};

export default SectionHeader;