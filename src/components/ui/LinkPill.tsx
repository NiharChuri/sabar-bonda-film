import { ExternalLink } from 'lucide-react';

interface LinkPillProps {
  href: string;
  label: string;
  external?: boolean;
}

const LinkPill = ({ href, label, external = false }: LinkPillProps) => {
  const Component = external ? 'a' : 'button';
  const linkProps = external 
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Component
      {...linkProps}
      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white border border-border text-moss-500 hover:bg-moss-50 hover:border-moss-300 transition-all duration-200 shadow-sm hover:shadow-film"
    >
      {label}
      {external && <ExternalLink size={14} className="ml-2" />}
    </Component>
  );
};

export default LinkPill;