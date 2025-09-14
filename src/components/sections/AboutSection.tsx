import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const AboutSection = () => {
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [isDirectorStatementExpanded, setIsDirectorStatementExpanded] = useState(false);
  const [isFullCrewExpanded, setIsFullCrewExpanded] = useState(false);
  const isMobile = useIsMobile();
  const readMoreButtonRef = useRef<HTMLDivElement>(null);
  const fullCrewButtonRef = useRef<HTMLDivElement>(null);
  
  // Staggered animations for different content areas
  const { ref: posterRef, isVisible: posterVisible } = useStaggeredAnimation<HTMLDivElement>({
    delay: 200
  });
  const { ref: synopsisRef, isVisible: synopsisVisible } = useStaggeredAnimation<HTMLDivElement>({
    delay: 400
  });
  const { ref: crewRef, isVisible: crewVisible, isItemVisible } = useStaggeredAnimation<HTMLDivElement>({
    delay: 600,
    staggerDelay: 100,
    childSelector: '.crew-item'
  });
  
  // Touch/swipe handling for poster carousel
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const posterImages = [
    {
      src: '/images/posters/postermain.jpg',
      alt: 'Sabar Bonda Main Poster'
    },
    {
      src: '/images/posters/postermarathi.jpg',
      alt: 'Sabar Bonda Vertical Poster'
    }
  ];

  const nextPoster = () => {
    setCurrentPosterIndex((prev) => (prev + 1) % posterImages.length);
  };

  const prevPoster = () => {
    setCurrentPosterIndex((prev) => (prev - 1 + posterImages.length) % posterImages.length);
  };

  const handleReadMoreToggle = () => {
    const newExpanded = !isDirectorStatementExpanded;
    setIsDirectorStatementExpanded(newExpanded);
    
    // If collapsing (Read Less), scroll to the Read More button area
    if (!newExpanded && readMoreButtonRef.current) {
      setTimeout(() => {
        readMoreButtonRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100); // Small delay to ensure state update is complete
    }
  };

  const handleFullCrewToggle = () => {
    const newExpanded = !isFullCrewExpanded;
    setIsFullCrewExpanded(newExpanded);
    
    // If collapsing (View Less), scroll to the button area
    if (!newExpanded && fullCrewButtonRef.current) {
      setTimeout(() => {
        fullCrewButtonRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  };

  // Touch/swipe handlers for poster carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !isDragging.current) return;
    
    touchEndX.current = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left - next poster
        nextPoster();
      } else {
        // Swipe right - previous poster
        prevPoster();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    isDragging.current = false;
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartX.current !== null) {
      isDragging.current = true;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!touchStartX.current || !isDragging.current) return;
    
    touchEndX.current = e.clientX;
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Drag left - next poster
        nextPoster();
      } else {
        // Drag right - previous poster
        prevPoster();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    isDragging.current = false;
  };

  return (
    <section id="about" className="relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/filmstill1_small.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      <div className="relative z-10">
        <Section className="bg-black/30 backdrop-blur-sm" enableParallax>
          <SectionHeader 
            title="Synopsis" 
            variant="dark"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Side - Movie Poster Carousel */}
            <div 
              ref={posterRef}
              className={`lg:col-span-4 transition-all duration-800 ease-out ${
                posterVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <div className="relative card-hover-subtle">
                  <img 
                    src={posterImages[currentPosterIndex].src}
                    alt={posterImages[currentPosterIndex].alt}
                    className="w-full h-auto object-cover transition-all duration-500 ease-in-out cursor-grab active:cursor-grabbing select-none shadow-film-lg"
                    loading="lazy"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onDragStart={(e) => e.preventDefault()}
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevPoster}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-white/70 transition-all duration-200 btn-hover touch-target"
                    aria-label="Previous poster"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button
                    onClick={nextPoster}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-white/70 transition-all duration-200 btn-hover touch-target"
                    aria-label="Next poster"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Poster Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 glass-dark text-white text-sm font-nohemi">
                    {currentPosterIndex + 1} / {posterImages.length}
                  </div>
                </div>
                
                {/* Poster Indicators */}
                <div className="mt-4 flex justify-center space-x-2">
                  {posterImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPosterIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 btn-hover ${
                        index === currentPosterIndex 
                          ? 'bg-copper-500 scale-125' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to poster ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Synopsis */}
            <div 
              ref={synopsisRef}
              className={`lg:col-span-8 transition-all duration-800 ease-out ${
                synopsisVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div>
                <div className="prose prose-sm max-w-none text-white leading-relaxed space-y-4 text-xs sm:text-sm lg:text-base font-nohemi font-light tracking-wider">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      <p className="transition-all duration-700 ease-out animate-delay-200">
                        Anand (30), a call-center employee in Mumbai, is forced to spend ten days at his ancestral village to mourn the loss of his father at the behest of his mother, Suman (50).
                      </p>
                      <p className="transition-all duration-700 ease-out animate-delay-300">
                        As the mourning period begins post-cremation, he faces subtle but relentless badgering from relatives to get married so that at least his mother finds the pleasure of seeing him settled. Anand finds himself stifled, as coming out to extended family could alienate his mother from the relatives when she needs them the most.
                      </p>
                      <p className="transition-all duration-700 ease-out animate-delay-500">
                        He finds solace in his childhood friend, Balya (30), as he accompanies him on his daily outings into the mountains to herd goats. Balya has been using the 'educated girls favoring city-dwellers over farmers' as a ruse to stay unmarried as he undergoes similar pressures relating to his sexuality from his family.
                      </p>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <p className="transition-all duration-700 ease-out animate-delay-700">
                        To escape their pressures, the two men spend time together. Hailing from different worlds but bound by childhood memories, they connect over their common struggle.
                      </p>
                      <p className="transition-all duration-700 ease-out animate-delay-1000">
                        As the days pass, their intimacy blooms emotionally and physically. With the mourning period ending, will their burgeoning bond survive beyond the ten days?
                      </p>
                      <p className="transition-all duration-700 ease-out animate-delay-1000">
                        Sabar Bonda (Cactus Pears) explores the delicate bonds that develop under duress and the future of it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cast & Crew Section - Full Width Below */}
          <div className="mt-8 lg:mt-12">
            <SectionHeader 
              title="Cast & Crew" 
              variant="dark"
              animationDelay={800}
            />
            
            <div className="flex justify-center">
              {/* Film Information Single Column List - Centered Gap Layout */}
              <div ref={crewRef} className="w-full max-w-6xl">
                <div className="space-y-4">
                  {[
                    { label: 'Director & Screenplay', value: 'Rohan Parashuram Kanawade' },
                    { label: 'Cast', value: 'Bhushaan Manoj, Suraaj Suman, Jayshri Jagtap' },
                    { label: 'EP & Presenters', value: 'Nagraj Popatrao Manjule, Nikhil Advani, Sai Tamhankar, Vikramaditya Motwane' },
                    { label: 'Producers', value: 'Neeraj Churi, Mohamed Khaki, Kaushik Ray, Naren Chandavarkar, Sidharth Meer, Hareesh Reddypalli, Rohan Parashuram Kanawade' },
                    { label: 'Co-Producers', value: 'Jim Sarbh, Rajesh Parwatkar, Neha Kaul' },
                    { label: 'Associate Producers', value: 'Avigyan Dasgupta, Deepthi Pendurty, Parag Pradhan' }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={`crew-item grid grid-cols-1 md:grid-cols-[2fr_auto_3fr] gap-4 md:gap-8 items-start transition-all duration-700 ease-out ${
                        isItemVisible(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <span className="font-cabinet font-black text-copper-500 text-base sm:text-lg text-right order-1 md:order-1">{item.label}</span>
                      <div className="hidden md:block w-px bg-copper-500/30 justify-self-center order-2" style={{height: '1.5em'}}></div>
                      <span className="font-nohemi font-light text-white/90 text-left md:text-left tracking-wider order-2 md:order-3">{item.value}</span>
                    </div>
                  ))}
                  
                  {/* Show remaining crew only on larger screens or when expanded */}
                  <div className={`${isMobile && !isFullCrewExpanded ? 'hidden' : 'block'} space-y-4`}>
                    {[
                      { label: 'Executive Producers', value: 'Ilann Girard, Kishor Vasant Sawant' },
                      { label: 'Cinematographer', value: 'Vikas Urs' },
                      { label: 'Editor', value: 'Anadi Athaley' },
                      { label: 'Production Designer', value: 'Tejashree Kapadane' },
                      { label: 'Costume Designer', value: 'Sachin Lovalekar' },
                      { label: 'Sound Designers', value: 'Anirban Borthakur, Naren Chandavarkar' },
                      { label: 'Re-Recording Mixers', value: 'Boloy Kumar Doloi, Rahul Karpe' },
                      { label: 'Colorist', value: 'Himanshu Kamble' },
                      { label: 'VFX', value: 'Nitin Kale (Cactus Pears VFX)' },
                      { label: 'Casting', value: 'Yugandhar Deshpande' }
                    ].map((item, index) => (
                      <div 
                        key={index + 6}
                        className={`crew-item grid grid-cols-1 md:grid-cols-[2fr_auto_3fr] gap-4 md:gap-8 items-start transition-all duration-700 ease-out ${
                          isItemVisible(index + 6) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                      >
                        <span className="font-cabinet font-black text-copper-500 text-base sm:text-lg text-right order-1 md:order-1">{item.label}</span>
                        <div className="hidden md:block w-px bg-copper-500/30 justify-self-center order-2" style={{height: '1.5em'}}></div>
                        <span className="font-nohemi font-light text-white/90 text-left md:text-left tracking-wider order-2 md:order-3">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* View More/Less button for mobile */}
                {isMobile && (
                  <div ref={fullCrewButtonRef} className="flex justify-center mt-6">
                    <button
                      onClick={handleFullCrewToggle}
                      className="flex items-center gap-2 text-copper-500 hover:text-copper-400 transition-all duration-300 font-nohemi font-medium text-sm px-4 py-2 rounded-full border border-copper-500/30 hover:border-copper-500/50 glass-dark btn-hover"
                    >
                      {isFullCrewExpanded ? (
                        <>
                          <span>View Less</span>
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          <span>View Full Credits</span>
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
};

export default AboutSection;
