import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const ScreeningsSection = () => {
  const [isAllFestivalsExpanded, setIsAllFestivalsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const allFestivalsButtonRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const { ref: screeningsRef, isVisible: screeningsVisible, isItemVisible } = useStaggeredAnimation<HTMLDivElement>({
    delay: 200,
    staggerDelay: 150,
    childSelector: '.screening-item'
  });

  const handleAllFestivalsToggle = () => {
    const newExpanded = !isAllFestivalsExpanded;
    setIsAllFestivalsExpanded(newExpanded);
    
    // If collapsing (View Less), scroll to the button area
    if (!newExpanded && allFestivalsButtonRef.current) {
      setTimeout(() => {
        allFestivalsButtonRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  };

  // Key festivals with awards - always visible
  const keyScreenings = [
    {
      festival: 'Sundance Film Festival, USA, 2025',
      status: 'Winner of Grand Jury Prize in World Cinema Dramatic',
      isAward: true
    },
    {
      festival: 'Sunny Bunny Festival, Ukraine, 2025',
      status: 'Best Feature Film',
      isAward: true
    },
    {
      festival: 'San Francisco International Film Festival (SFFILM), USA, 2025',
      status: 'Global Visions Awards Honorable Mention',
      isAward: true
    },
    {
      festival: 'IFFLA, USA, 2025',
      status: 'Audience Choice Award for Best Feature & Acting Honorary Mention',
      isAward: true
    },
    {
      festival: 'Inside Out 2SLGBTQ+ Film Festival, Canada, 2025',
      status: 'Centrepiece Gala, Audience Award winner for Best Narrative Feature & Leadership Circle Award for Outstanding Performance (Bhushaan Manoj)',
      isAward: true
    },
    {
      festival: 'SXSW London, UK, 2025',
      status: 'Grand Jury Prize for Best Film',
      isAward: true
    },
    {
      festival: 'International Film Festival Guadalajara, Mexico, 2025',
      status: 'Maguey Award for Best Feature Film',
      isAward: true
    }
  ];

  // Extended festival circuit - collapsible on mobile
  const extendedScreenings = [
    {
      festival: 'Göteborg Film Festival, Sweden, 2025',
      status: 'Ingmar Bergman Competition',
      isAward: false
    },
    {
      festival: 'New Directors/New Films (MoMA), USA, 2025',
      status: 'Official Selection',
      isAward: false
    },
    {
      festival: 'Minneapolis St. Paul International Film Festival, USA, 2025',
      status: 'Official Selection',
      isAward: false
    },
    {
      festival: 'BAFICI, Argentina, 2025',
      status: 'International Competition',
      isAward: false
    },
    {
      festival: 'MOOOV, Belgium, 2025',
      status: 'Official Selection Competition',
      isAward: false
    },
    {
      festival: 'Las Palmas de Gran Canaria International Film Festival, Spain, 2025',
      status: 'Official Selection Competition',
      isAward: false
    },
    {
      festival: 'Pink Apple Lesbian & Gay Film Festival, Switzerland, 2025',
      status: 'Official Selection',
      isAward: false
    },
    {
      festival: 'FILMKUNSTFEST, Germany, 2025',
      status: 'FOCUS INDIA',
      isAward: false
    },
    {
      festival: 'Austin Asian American Film Festival, USA, 2025',
      status: 'Narrative Feature',
      isAward: false
    },
    {
      festival: 'Provincetown International Film Festival, USA, 2025',
      status: 'Narrative Features',
      isAward: false
    },
    {
      festival: 'Fire!! Barcelona LGBTI Film Festival, Spain, 2025',
      status: 'Al Este del Edén section',
      isAward: false
    },
    {
      festival: 'Festival du Film de Cabourg, France, 2025',
      status: 'Feature Film Competition',
      isAward: false
    },
    {
      festival: 'Queer Spectrum Film Festival, Ireland, 2025',
      status: 'Official Selection',
      isAward: false
    },
    {
      festival: 'Taipei Film Festival, Taiwan, 2025',
      status: 'New Southbound Vision',
      isAward: false
    },
    {
      festival: 'FEST New Directors New Films, Portugal, 2025',
      status: 'Golden Lynx Competition',
      isAward: false
    },
    {
      festival: 'Zinegoak, Spain, 2025',
      status: 'Official Competition Section FIK',
      isAward: false
    },
    {
      festival: 'New Horizons, Poland, 2025',
      status: 'Discovery',
      isAward: false
    },
    {
      festival: 'Guanajuato International Film Festival, Mexico, 2025',
      status: 'Country in Focus',
      isAward: false
    },
    {
      festival: 'New Zealand International Film Festival, New Zealand, 2025',
      status: 'Fresh Competition',
      isAward: false
    },
    {
      festival: 'Melbourne International Film Festival, Australia, 2025',
      status: 'International Features program',
      isAward: false
    },
    {
      festival: 'Chichester International Film Festival, United Kingdom, 2025',
      status: 'Beyond Bollywood: India\'s Dramatic Canvas',
      isAward: false
    },
    {
      festival: 'Summer Film Academy in Zwierzyniec, Poland, 2025',
      status: 'Official Selection',
      isAward: false
    },
    {
      festival: 'Queer Screen Film Fest, Australia, 2025',
      status: 'Emerging Narrative Feature Competition',
      isAward: false
    },
    {
      festival: 'Thailand International LGBTQ+ Film Festival, Thailand, 2025',
      status: 'Official Selection',
      isAward: false
    }
  ];

  const renderScreeningItem = (screening: any, index: number) => (
    <div 
      key={index} 
      className={`screening-item relative flex gap-2 sm:gap-3 md:gap-4 transition-all duration-700 ease-out ${
        isItemVisible(index) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
      }`}
    >
      {/* Timeline dot */}
      <div className="flex-shrink-0 w-4 sm:w-6 md:w-8 flex justify-center pt-1 sm:pt-1.5">
        <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full border-2 border-white shadow-sm relative z-10 ${
          screening.isAward ? 'bg-copper-500' : 'bg-copper-300'
        }`}></div>
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-1 md:pb-2 min-w-0">
        <div className="py-1 md:py-2 px-0">
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-cabinet font-semibold text-white mb-1 leading-tight">
            {screening.festival}
          </h3>
          
          <div className="inline-block">
            <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium leading-tight rounded-full ${
              screening.isAward 
                ? 'bg-copper-500 text-white' 
                : 'bg-white/90 text-gray-800'
            }`}>
              {screening.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="screenings" className="relative">
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
        <Section className="bg-black/30 backdrop-blur-sm" enableParallax>
          <SectionHeader 
            title="Awards & Festivals" 
            variant="dark"
          />
          
          <div 
            ref={screeningsRef}
            className={`relative max-w-4xl mx-auto transition-all duration-1000 ease-out ${
              screeningsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Timeline line */}
            <div className="absolute left-2 sm:left-3 md:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-copper-500 via-copper-400 to-copper-500"></div>
            
            <div className="space-y-1 sm:space-y-2 md:space-y-3">
              {/* Key screenings - always visible */}
              {keyScreenings.map((screening, index) => renderScreeningItem(screening, index))}
              
              {/* Extended screenings - collapsible on mobile */}
              <div className={`${isMobile && !isAllFestivalsExpanded ? 'hidden' : 'block'}`}>
                {extendedScreenings.map((screening, index) => renderScreeningItem(screening, keyScreenings.length + index))}
              </div>
            </div>

            {/* View All Festivals button for mobile */}
            {isMobile && (
              <div ref={allFestivalsButtonRef} className="flex justify-center mt-6">
                <button
                  onClick={handleAllFestivalsToggle}
                  className="flex items-center gap-2 text-copper-500 hover:text-copper-400 transition-all duration-300 font-nohemi font-medium text-sm px-4 py-2 rounded-full border border-copper-500/30 hover:border-copper-500/50 glass-dark btn-hover"
                >
                  {isAllFestivalsExpanded ? (
                    <>
                      <span>View Less</span>
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <span>View All Festivals</span>
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </Section>
      </div>
    </section>
  );
};

export default ScreeningsSection;
