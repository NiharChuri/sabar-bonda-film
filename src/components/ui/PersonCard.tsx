import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PersonCardProps {
  name: string;
  role: string;
  bio: string;
  fullBio?: string;
  avatar?: string;
}

const PersonCard = ({ name, role, bio, fullBio, avatar }: PersonCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-6 transition-all duration-200">
      {avatar && (
        <div className="w-16 h-16 rounded-full bg-sand-100 mb-4 overflow-hidden">
          <img 
            src={avatar} 
            alt={`${name} portrait`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <h3 className="font-cabinet font-semibold text-lg text-white mb-1">{name}</h3>
      <p className="text-copper-500 font-medium text-sm mb-3 font-cabinet">{role}</p>
      <p className="text-white leading-relaxed font-nohemi font-medium">
        {isExpanded && fullBio ? fullBio : bio}
      </p>
      
      {fullBio && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 inline-flex items-center px-3 py-2 rounded-full text-sm text-moss-500 hover:text-moss-600 hover:bg-moss-50 transition-all duration-200 font-cabinet"
          aria-label={isExpanded ? 'Show less' : 'Read more'}
        >
          {isExpanded ? 'Show less' : 'Read more'}
          {isExpanded ? (
            <ChevronUp size={16} className="ml-1" />
          ) : (
            <ChevronDown size={16} className="ml-1" />
          )}
        </button>
      )}
    </div>
  );
};

export default PersonCard;
