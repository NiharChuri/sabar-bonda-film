import { useState, useEffect, useRef } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import StatBadge from '@/components/ui/StatBadge';

const AccoladesSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Simple drag functionality
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    
    if (carouselRef.current) {
      carouselRef.current.style.animationPlayState = 'paused';
    }
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !carouselRef.current) return;
    
    setCurrentX(clientX);
    const diff = clientX - startX;
    carouselRef.current.style.transform = `translateX(${diff}px)`;
  };

  const handleEnd = () => {
    if (!carouselRef.current) return;
    
    setIsDragging(false);
    carouselRef.current.style.transform = '';
    carouselRef.current.style.animationPlayState = 'running';
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // Global mouse events for dragging outside element
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX]);

  return (
    <section id="accolades" className="relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/filmstill2_small.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      <div className="relative z-10">
        <Section className="bg-black/30 backdrop-blur-sm">
          <SectionHeader 
            title="Awards & Recognition"
            subtitle="Critical acclaim and festival honors"
            variant="dark"
          />
          
          {/* Auto-scrolling Carousel */}
          <div className="relative overflow-hidden">
            <div 
              ref={carouselRef}
              className={`flex animate-scroll-infinite space-x-8 pb-4 ${isDragging ? 'dragging' : ''}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Awards */}
              <div className="flex-shrink-0 w-96 glass p-6 shadow-film border-l-4 border-yellow-500 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <StatBadge 
                    title="Sundance Film Festival"
                    subtitle="2025"
                    variant="laurel"
                  />
                </div>
                <h3 className="text-lg font-cabinet font-semibold text-white mb-3 line-clamp-2">
                  World Cinema Grand Jury Prize: Dramatic
                </h3>
                <p className="text-sm text-white leading-relaxed font-nohemi font-medium line-clamp-3">
                  Prestigious recognition for outstanding dramatic filmmaking in world cinema competition.
                </p>
              </div>

              {/* Critical Praise Items */}
              <div className="flex-shrink-0 w-96 glass p-6 shadow-film border-l-4 border-copper-500 rounded-lg">
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 font-cabinet">
                    Critical Praise
                  </span>
                </div>
                <blockquote className="text-sm italic text-white leading-relaxed mb-3 font-nohemi font-medium line-clamp-4">
                  "A tender and authentic portrayal of queer love in rural India, beautifully crafted with emotional depth and cultural sensitivity."
                </blockquote>
                <cite className="text-xs text-muted font-medium font-nohemi">— Variety</cite>
              </div>

              <div className="flex-shrink-0 w-96 glass p-6 shadow-film border-l-4 border-copper-500 rounded-lg">
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 font-cabinet">
                    Critical Praise
                  </span>
                </div>
                <blockquote className="text-sm italic text-white leading-relaxed mb-3 font-nohemi font-medium line-clamp-4">
                  "Kanawade's direction brings remarkable intimacy to this story of connection amidst grief and societal pressure."
                </blockquote>
                <cite className="text-xs text-muted font-medium font-nohemi">— The Hollywood Reporter</cite>
              </div>

              <div className="flex-shrink-0 w-96 glass p-6 shadow-film border-l-4 border-copper-500 rounded-lg">
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 font-cabinet">
                  Critical Praise
                  </span>
                </div>
                <blockquote className="text-sm italic text-white leading-relaxed mb-3 font-nohemi font-medium line-clamp-4">
                  "A powerful debut that challenges stereotypes while celebrating the universality of human connection."
                </blockquote>
                <cite className="text-xs text-muted font-medium font-nohemi">— IndieWire</cite>
              </div>

              <div className="flex-shrink-0 w-96 glass p-6 shadow-film border-l-4 border-green-500 rounded-lg">
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 font-cabinet">
                    Industry Recognition
                  </span>
                </div>
                <h3 className="text-lg font-cabinet font-semibold text-white mb-3 line-clamp-2">
                  Official Selection - Mumbai Film Festival
                </h3>
                <p className="text-sm text-white leading-relaxed font-nohemi font-medium line-clamp-3">
                  Selected for the prestigious competition category celebrating innovative Indian cinema.
                </p>
              </div>

              {/* Duplicate items for seamless loop */}
              <div className="flex-shrink-0 w-96 glass p-6 shadow-film border-l-4 border-yellow-500 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <StatBadge 
                    title="Sundance Film Festival"
                    subtitle="2025"
                    variant="laurel"
                  />
                </div>
                <h3 className="text-lg font-cabinet font-semibold text-white mb-3 line-clamp-2">
                  World Cinema Grand Jury Prize: Dramatic
                </h3>
                <p className="text-sm text-white leading-relaxed font-nohemi font-medium line-clamp-3">
                  Prestigious recognition for outstanding dramatic filmmaking in world cinema competition.
                </p>
              </div>

              <div className="flex-shrink-0 w-96 glass p-6 shadow-film border-l-4 border-copper-500 rounded-lg">
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 font-cabinet">
                    Critical Praise
                  </span>
                </div>
                <blockquote className="text-sm italic text-white leading-relaxed mb-3 font-nohemi font-medium line-clamp-4">
                  "A tender and authentic portrayal of queer love in rural India, beautifully crafted with emotional depth and cultural sensitivity."
                </blockquote>
                <cite className="text-xs text-muted font-medium font-nohemi">— Variety</cite>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
};

export default AccoladesSection;
