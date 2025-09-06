import { useState, useEffect, useRef } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const AccoladesSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Improved drag functionality
  const handleStart = (clientX: number) => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(clientX);
    setScrollLeft(carouselRef.current.scrollLeft);
    
    // Pause animation
    carouselRef.current.style.animationPlayState = 'paused';
    carouselRef.current.style.cursor = 'grabbing';
    carouselRef.current.style.userSelect = 'none';
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !carouselRef.current) return;
    
    const deltaX = clientX - startX;
    const newTranslate = deltaX;
    
    setCurrentTranslate(newTranslate);
    carouselRef.current.style.transform = `translateX(${newTranslate}px)`;
  };

  const handleEnd = () => {
    if (!carouselRef.current) return;
    
    setIsDragging(false);
    
    // Determine direction and snap behavior
    const threshold = 50; // minimum drag distance to trigger action
    
    if (Math.abs(currentTranslate) > threshold) {
      // If dragged far enough, let it slide briefly then resume
      setTimeout(() => {
        if (carouselRef.current) {
          carouselRef.current.style.transform = '';
          carouselRef.current.style.animationPlayState = 'running';
        }
      }, 300);
    } else {
      // Snap back immediately if not dragged far enough
      carouselRef.current.style.transform = '';
      carouselRef.current.style.animationPlayState = 'running';
    }
    
    carouselRef.current.style.cursor = 'grab';
    carouselRef.current.style.userSelect = 'auto';
    setCurrentTranslate(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
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
  }, [isDragging]);

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
          
          {/* Critical Quotes Auto-scrolling Carousel */}
          <div className="mb-16">
            <h3 className="text-2xl font-cabinet font-semibold text-white mb-8 text-center">
              Critical Praise
            </h3>
            <div className="relative overflow-hidden carousel-container">
              <div 
                ref={carouselRef}
                className={`flex animate-scroll-infinite space-x-8 pb-4 transition-transform duration-300 ease-out ${
                  isDragging ? 'dragging' : ''
                }`}
                style={{ 
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: isDragging ? 'none' : 'auto'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Critical Praise Items */}
                <div className="flex-shrink-0 w-96 p-6 border-l-4 border-copper-500">
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

                <div className="flex-shrink-0 w-96 p-6 border-l-4 border-copper-500">
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

                <div className="flex-shrink-0 w-96 p-6 border-l-4 border-copper-500">
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

                <div className="flex-shrink-0 w-96 p-6 border-l-4 border-copper-500">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 font-cabinet">
                      Critical Praise
                    </span>
                  </div>
                  <blockquote className="text-sm italic text-white leading-relaxed mb-3 font-nohemi font-medium line-clamp-4">
                    "A groundbreaking work that showcases the beauty and complexity of rural Indian life through a queer lens."
                  </blockquote>
                  <cite className="text-xs text-muted font-medium font-nohemi">— Film Companion</cite>
                </div>

                {/* Duplicate items for seamless loop */}
                <div className="flex-shrink-0 w-96 p-6 border-l-4 border-copper-500">
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

                <div className="flex-shrink-0 w-96 p-6 border-l-4 border-copper-500">
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
              </div>
            </div>
          </div>

          {/* Awards Grid - Static Display */}
          <div>
            <h3 className="text-2xl font-cabinet font-semibold text-white mb-8 text-center">
              Festival Awards & Recognition
            </h3>
            
            {/* 3-2 Grid Layout for Awards */}
            <div className="flex flex-col items-center gap-8">
              {/* Top row - 3 laurels */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-5xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4">
                    <img 
                      src="/images/award_laurels/Sundance Winner_World Cinema Grand Jury Prize-Dramatic_white.png" 
                      alt="Sundance World Cinema Grand Jury Prize" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-lg font-cabinet font-semibold text-white mb-2">
                    Sundance Film Festival 2025
                  </h4>
                  <p className="text-copper-500 font-medium mb-2 font-nohemi">
                    World Cinema Grand Jury Prize: Dramatic
                  </p>
                  <p className="text-sm text-white/80 font-nohemi">
                    Prestigious recognition for outstanding dramatic filmmaking in world cinema competition.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4">
                    <img 
                      src="/images/award_laurels/SXSW winner laurel.png" 
                      alt="SXSW Winner" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-lg font-cabinet font-semibold text-white mb-2">
                    SXSW 2025
                  </h4>
                  <p className="text-copper-500 font-medium mb-2 font-nohemi">
                    Winner
                  </p>
                  <p className="text-sm text-white/80 font-nohemi">
                    Celebrated at one of the most influential film festivals in the world.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4">
                    <img 
                      src="/images/award_laurels/Audience - Best Feature IFFLA 2025_white.png" 
                      alt="IFFLA 2025 Audience Best Feature" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-lg font-cabinet font-semibold text-white mb-2">
                    IFFLA 2025
                  </h4>
                  <p className="text-copper-500 font-medium mb-2 font-nohemi">
                    Audience Award - Best Feature
                  </p>
                  <p className="text-sm text-white/80 font-nohemi">
                    Chosen by audiences as the best feature film at the Indian Film Festival of Los Angeles.
                  </p>
                </div>
              </div>

              {/* Bottom row - 2 laurels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-3xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4">
                    <img 
                      src="/images/award_laurels/IO-Audience-Award-Best-Narrative-Feature_white.png" 
                      alt="IO Audience Award Best Narrative Feature" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-lg font-cabinet font-semibold text-white mb-2">
                    Inside Out Festival
                  </h4>
                  <p className="text-copper-500 font-medium mb-2 font-nohemi">
                    Audience Award - Best Narrative Feature
                  </p>
                  <p className="text-sm text-white/80 font-nohemi">
                    Honored by audiences at Toronto's premier LGBTQ+ film festival.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4">
                    <img 
                      src="/images/award_laurels/flc_ndnf25_laurels_official_selection_wht.png" 
                      alt="FLC NDNF25 Official Selection" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-lg font-cabinet font-semibold text-white mb-2">
                    New Directors/New Films 2025
                  </h4>
                  <p className="text-copper-500 font-medium mb-2 font-nohemi">
                    Official Selection
                  </p>
                  <p className="text-sm text-white/80 font-nohemi">
                    Selected for the prestigious showcase of emerging filmmaking talent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
};

export default AccoladesSection;
