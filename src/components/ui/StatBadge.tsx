import { Award } from 'lucide-react';

interface StatBadgeProps {
  title: string;
  subtitle?: string;
  variant?: 'laurel' | 'default';
}

const StatBadge = ({ title, subtitle, variant = 'default' }: StatBadgeProps) => {
  return (
    <div 
      className={`
        inline-flex items-center px-4 py-3 rounded-full font-medium shadow-sm
        ${variant === 'laurel' 
          ? 'bg-sand-100 text-ink-900 border border-sand-400/30' 
          : 'bg-white text-ink-900 border border-border'
        }
      `}
    >
      {variant === 'laurel' && <Award size={16} className="mr-2 text-copper-500" />}
      <div>
        <div className="text-sm font-semibold font-nohemi">{title}</div>
        {subtitle && <div className="text-xs text-muted font-nohemi">{subtitle}</div>}
      </div>
    </div>
  );
};

export default StatBadge;