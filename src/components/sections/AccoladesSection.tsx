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
          <header className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-cabinet font-bold tracking-tight text-white mb-3 sm:mb-4">
              Reviews & Recognition
            </h2>
            {/* <p className="text-base sm:text-lg leading-relaxed text-white/80 max-w-3xl font-nohemi font-medium">
              Critical acclaim and festival honors
            </p> */}
          </header>
          
          {/* Critical Quotes Auto-scrolling Carousel */}
          <div className="mb-12 lg:mb-16">
            {/* <h3 className="text-xl sm:text-2xl font-cabinet font-semibold text-white mb-6 sm:mb-8 text-center">
              Critical Praise
            </h3> */}
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
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wider font-light italic">
                    "A tender and authentic portrayal of queer love in rural India, beautifully crafted with emotional depth and cultural sensitivity."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— Variety</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wider font-light italic">
                    "Kanawade's direction brings remarkable intimacy to this story of connection amidst grief and societal pressure."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— The Hollywood Reporter</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wider font-light italic">
                    "A powerful debut that challenges stereotypes while celebrating the universality of human connection."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— IndieWire</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wider font-light italic">
                    "A groundbreaking work that showcases the beauty and complexity of rural Indian life through a queer lens."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— Film Companion</cite>
                </div>

                {/* Critical Praise Items - Second set for seamless loop */}
                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wider font-light italic">
                    "A tender and authentic portrayal of queer love in rural India, beautifully crafted with emotional depth and cultural sensitivity."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— Variety</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wider font-light italic">
                    "Kanawade's direction brings remarkable intimacy to this story of connection amidst grief and societal pressure."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— The Hollywood Reporter</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wider font-light italic">
                    "A powerful debut that challenges stereotypes while celebrating the universality of human connection."
                  </blockquote>
                  <cite className="text-xs sm:text-sm text-yellow-600 font-semibold font-cabinet tracking-wide uppercase">— IndieWire</cite>
                </div>

                <div className="flex-shrink-0 w-80 sm:w-96 p-4 sm:p-6 border-l-4 border-copper-500 mx-2 sm:mx-4">
                  <blockquote className="text-sm sm:text-base text-white/90 leading-relaxed mb-3 sm:mb-4 font-nohemi tracking-wider font-light italic">
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

          {/* Article Links Section */}
          <div className="mb-12 lg:mb-16">
            <h3 className="text-xl sm:text-2xl font-cabinet font-semibold text-white mb-6 sm:mb-8 text-center">
              Featured Articles & Reviews
            </h3>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <a 
                  href="https://festival.sundance.org/blogs/give-me-the-backstory-get-to-know-rohan-parashuram-kanawade-the-writer-director-of-sabar-bonda-cactus-pears/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 sm:p-6 border border-white/20 rounded-lg hover:border-copper-500/50 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-cabinet font-semibold text-white text-sm sm:text-base mb-2 group-hover:text-copper-400 transition-colors">
                        Get to Know Director Rohan Parashuram Kanawade
                      </h4>
                      <p className="text-copper-500 font-medium text-xs sm:text-sm font-nohemi">
                        Sundance Film Festival
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-white/60 group-hover:text-copper-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>

                <a 
                  href="https://www.labiennale.org/en/news/%E2%80%9Csabar-bonda%E2%80%9D-rohan-parashuram-kanawade-wins-grand-jury-prize-2025-sundance-film-festival"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 sm:p-6 border border-white/20 rounded-lg hover:border-copper-500/50 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-cabinet font-semibold text-white text-sm sm:text-base mb-2 group-hover:text-copper-400 transition-colors">
                        “Sabar Bonda” by Rohan Parashuram Kanawade wins the Grand Jury Prize at the 2025 Sundance Film Festival
                      </h4>
                      <p className="text-copper-500 font-medium text-xs sm:text-sm font-nohemi">
                        La Biennale di Venezia
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-white/60 group-hover:text-copper-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>

                <a 
                  href="https://variety.com/2025/film/reviews/sabar-bonda-cactus-pears-review-sundance-1236287998/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 sm:p-6 border border-white/20 rounded-lg hover:border-copper-500/50 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-cabinet font-semibold text-white text-sm sm:text-base mb-2 group-hover:text-copper-400 transition-colors">
                        ‘Sabar Bonda (Cactus Pears)’ Review: A Tender Queer Indian Drama Born of Grief
                      </h4>
                      <p className="text-copper-500 font-medium text-xs sm:text-sm font-nohemi">
                        Variety
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-white/60 group-hover:text-copper-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>

                <a 
                  href="https://www.indiewire.com/criticism/movies/sabar-bonda-review-rohan-parashuram-kanawade-1235087891/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 sm:p-6 border border-white/20 rounded-lg hover:border-copper-500/50 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-cabinet font-semibold text-white text-sm sm:text-base mb-2 group-hover:text-copper-400 transition-colors">
                        ‘Sabar Bonda’ Review: ‘Special Friends’ Reunite During a Period of Mourning in Poetic Marathi-Language Debut
                      </h4>
                      <p className="text-copper-500 font-medium text-xs sm:text-sm font-nohemi">
                        IndieWire
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-white/60 group-hover:text-copper-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>

                <a 
                  href="https://www.rogerebert.com/festivals/sundance-2025-sabar-bonda-cactus-pears-dj-ahmet-andre-is-an-idiot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 sm:p-6 border border-white/20 rounded-lg hover:border-copper-500/50 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-cabinet font-semibold text-white text-sm sm:text-base mb-2 group-hover:text-copper-400 transition-colors">
                        Sundance 2025: Sabar Bonda (Cactus Pears), DJ Ahmet, André Is an Idiot
                      </h4>
                      <p className="text-copper-500 font-medium text-xs sm:text-sm font-nohemi">
                        RogerEbert.com
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-white/60 group-hover:text-copper-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>

                <a 
                  href="https://mashable.com/article/sabar-bonda-cactus-pears-review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 sm:p-6 border border-white/20 rounded-lg hover:border-copper-500/50 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-cabinet font-semibold text-white text-sm sm:text-base mb-2 group-hover:text-copper-400 transition-colors">
                        'Cactus Pears' review: An assured debut feature that subverts queer tropes
                      </h4>
                      <p className="text-copper-500 font-medium text-xs sm:text-sm font-nohemi">
                        Mashable
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-white/60 group-hover:text-copper-400 transition-colors flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Awards Grid - Static Display
          <div>
            <h3 className="text-xl sm:text-2xl font-cabinet font-semibold text-white mb-6 sm:mb-8 text-center">
              Festival Awards & Recognition
            </h3>
            
            <div className="flex flex-col items-center gap-6 sm:gap-8">
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
          </div> */}
        </Section>
      </div>
    </section>
  );
};

export default AccoladesSection;
