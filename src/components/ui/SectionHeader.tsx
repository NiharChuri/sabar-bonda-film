import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  centered?: boolean;
}

const SectionHeader = ({ title, subtitle, children, centered = false }: SectionHeaderProps) => {
  return (
    <header className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-ink-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg leading-relaxed text-muted max-w-3xl">
          {subtitle}
        </p>
      )}
      {children}
    </header>
  );
};

export default SectionHeader;