import { useState, useEffect, useRef, useCallback } from 'react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const AccoladesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      scrollContainer.scrollLeft += 1.5;
      
      // Reset when we've scrolled past the first set
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    }, 20);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainer.offsetLeft);
    setScrollLeft(scrollContainer.scrollLeft);
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Resume auto-scroll immediately after release
    setTimeout(() => {
      startAutoScroll();
    }, 100);
  }, [startAutoScroll]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Stop auto-scroll during drag movement
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    let newScrollLeft = scrollLeft - walk;
    
    // Handle infinite scroll boundaries
    const maxScroll = scrollContainer.scrollWidth / 2;
    
    if (newScrollLeft <= 0) {
      newScrollLeft = maxScroll + newScrollLeft;
    } else if (newScrollLeft >= maxScroll) {
      newScrollLeft = newScrollLeft - maxScroll;
    }
    
    scrollContainer.scrollLeft = newScrollLeft;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setTimeout(() => {
        startAutoScroll();
      }, 100);
    }
  }, [isDragging, startAutoScroll]);

  // Touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollContainer.offsetLeft);
    setScrollLeft(scrollContainer.scrollLeft);
    stopAutoScroll();
  }, [stopAutoScroll]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => {
      startAutoScroll();
    }, 100);
  }, [startAutoScroll]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Stop auto-scroll during drag movement
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }

    const x = e.touches[0].pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    let newScrollLeft = scrollLeft - walk;
    
    // Handle infinite scroll boundaries
    const maxScroll = scrollContainer.scrollWidth / 2;
    
    if (newScrollLeft <= 0) {
      newScrollLeft = maxScroll + newScrollLeft;
    } else if (newScrollLeft >= maxScroll) {
      newScrollLeft = newScrollLeft - maxScroll;
    }
    
    scrollContainer.scrollLeft = newScrollLeft;
  }, [isDragging, startX, scrollLeft]);

  useEffect(() => {
    startAutoScroll();
    
    return () => {
      stopAutoScroll();
    };
  }, [startAutoScroll, stopAutoScroll]);

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
          <div className="mb-12 lg:mb-16">
            <h3 className="text-xl sm:text-2xl font-cabinet font-semibold text-white mb-6 sm:mb-8 text-center">
              Critical Praise
            </h3>
            <div className="relative overflow-hidden">
              <div 
                ref={scrollRef}
                className={`flex overflow-x-hidden overflow-y-hidden scrollbar-hide select-none transition-all duration-300 ${
                  isDragging ? 'cursor-grabbing scale-98' : 'cursor-grab scale-100'
                }`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
              >
                {/* Critical Praise Items - First Set */}
                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wide font-light italic">
                    "A tender and authentic portrayal of queer love in rural India, beautifully crafted with emotional depth and cultural sensitivity."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— Variety</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wide font-light italic">
                    "Kanawade's direction brings remarkable intimacy to this story of connection amidst grief and societal pressure."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— The Hollywood Reporter</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wide font-light italic">
                    "A powerful debut that challenges stereotypes while celebrating the universality of human connection."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— IndieWire</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wide font-light italic">
                    "A groundbreaking work that showcases the beauty and complexity of rural Indian life through a queer lens."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— Film Companion</cite>
                </div>

                {/* Critical Praise Items - Second set for seamless loop */}
                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wide font-light italic">
                    "A tender and authentic portrayal of queer love in rural India, beautifully crafted with emotional depth and cultural sensitivity."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— Variety</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wide font-light italic">
                    "Kanawade's direction brings remarkable intimacy to this story of connection amidst grief and societal pressure."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— The Hollywood Reporter</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wide font-light italic">
                    "A powerful debut that challenges stereotypes while celebrating the universality of human connection."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— IndieWire</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wide font-light italic">
                    "A groundbreaking work that showcases the beauty and complexity of rural Indian life through a queer lens."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— Film Companion</cite>
                </div>
              </div>
              
              {/* Enhanced gradient overlays for smooth edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-r from-black/80 via-black/60 to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-l from-black/80 via-black/60 to-transparent pointer-events-none z-10" />
            </div>
          </div>

          {/* Awards Grid - Static Display */}
          <div>
            <h3 className="text-xl sm:text-2xl font-cabinet font-semibold text-white mb-6 sm:mb-8 text-center">
              Festival Awards & Recognition
            </h3>
            
            {/* 3-2 Grid Layout for Awards */}
            <div className="flex flex-col items-center gap-6 sm:gap-8">
              {/* Top row - 3 laurels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center max-w-5xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4">
                    <img 
                      src="/images/award_laurels/Sundance Winner_World Cinema Grand Jury Prize-Dramatic_white.png" 
                      alt="Sundance World Cinema Grand Jury Prize" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-cabinet font-semibold text-white mb-1 sm:mb-2">
                    Sundance Film Festival 2025
                  </h4>
                  <p className="text-copper-500 font-medium mb-1 sm:mb-2 font-nohemi text-sm sm:text-base">
                    World Cinema Grand Jury Prize: Dramatic
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 font-nohemi">
                    Prestigious recognition for outstanding dramatic filmmaking in world cinema competition.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4">
                    <img 
                      src="/images/award_laurels/SXSW winner laurel.png" 
                      alt="SXSW Winner" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-cabinet font-semibold text-white mb-1 sm:mb-2">
                    SXSW 2025
                  </h4>
                  <p className="text-copper-500 font-medium mb-1 sm:mb-2 font-nohemi text-sm sm:text-base">
                    Winner
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 font-nohemi">
                    Celebrated at one of the most influential film festivals in the world.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4">
                    <img 
                      src="/images/award_laurels/Audience - Best Feature IFFLA 2025_white.png" 
                      alt="IFFLA 2025 Audience Best Feature" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-cabinet font-semibold text-white mb-1 sm:mb-2">
                    IFFLA 2025
                  </h4>
                  <p className="text-copper-500 font-medium mb-1 sm:mb-2 font-nohemi text-sm sm:text-base">
                    Audience Award - Best Feature
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 font-nohemi">
                    Chosen by audiences as the best feature film at the Indian Film Festival of Los Angeles.
                  </p>
                </div>
              </div>

              {/* Bottom row - 2 laurels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-center max-w-3xl">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4">
                    <img 
                      src="/images/award_laurels/IO-Audience-Award-Best-Narrative-Feature_white.png" 
                      alt="IO Audience Award Best Narrative Feature" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-cabinet font-semibold text-white mb-1 sm:mb-2">
                    Inside Out Festival
                  </h4>
                  <p className="text-copper-500 font-medium mb-1 sm:mb-2 font-nohemi text-sm sm:text-base">
                    Audience Award - Best Narrative Feature
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 font-nohemi">
                    Honored by audiences at Toronto's premier LGBTQ+ film festival.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4">
                    <img 
                      src="/images/award_laurels/flc_ndnf25_laurels_official_selection_wht.png" 
                      alt="FLC NDNF25 Official Selection" 
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h4 className="text-base sm:text-lg font-cabinet font-semibold text-white mb-1 sm:mb-2">
                    New Directors/New Films 2025
                  </h4>
                  <p className="text-copper-500 font-medium mb-1 sm:mb-2 font-nohemi text-sm sm:text-base">
                    Official Selection
                  </p>
                  <p className="text-xs sm:text-sm text-white/80 font-nohemi">
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
