import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/filmstill2_small.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8">
            {/* Left side - Logo */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <img 
                  src="/images/heroimage.png" 
                  alt="Sabar Bonda Film Logo" 
                  className="h-64 sm:h-72 lg:h-80 xl:h-96 w-auto object-contain drop-shadow-2xl mx-auto lg:mx-0"
                  loading="eager"
                />
              </div>
            </div>
            
            {/* Right side - Award Laurels Grid */}
            <div className="flex flex-col items-center">
              {/* 3-2 Grid of Award Laurels - Large and Prominent */}
              <div className="flex flex-col gap-4 lg:gap-6">
                {/* Top row - 3 laurels */}
                <div className="flex gap-4 lg:gap-6 justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                    <img 
                      src="/images/award_laurels/Sundance Winner_World Cinema Grand Jury Prize-Dramatic_white.png" 
                      alt="Sundance World Cinema Grand Jury Prize" 
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                    <img 
                      src="/images/award_laurels/SXSW winner laurel.png" 
                      alt="SXSW Winner Laurel" 
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                    <img 
                      src="/images/award_laurels/Audience - Best Feature IFFLA 2025_white.png" 
                      alt="IFFLA 2025 Audience Best Feature" 
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
                {/* Bottom row - 2 laurels */}
                <div className="flex gap-4 lg:gap-6 justify-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                    <img 
                      src="/images/award_laurels/IO-Audience-Award-Best-Narrative-Feature_white.png" 
                      alt="IO Audience Award Best Narrative Feature" 
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
                    <img 
                      src="/images/award_laurels/flc_ndnf25_laurels_official_selection_wht.png" 
                      alt="FLC NDNF25 Official Selection" 
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
