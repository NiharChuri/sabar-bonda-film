import { useState, useEffect, useRef } from 'react';
import { Instagram } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Show content immediately when component mounts
    setIsVisible(true);
    
    // Handle video loading separately
    const video = videoRef.current;
    if (video) {
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented, but that's okay
          console.log('Video autoplay was prevented');
        });
      }
    }
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoLoad}
        >
          <source src="/videos/sabarbondawebsiteloop.mp4" type="video/mp4" />
        </video>
        {/* Fallback background image - only show if video hasn't loaded */}
        {!videoLoaded && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/filmstill2_small.jpg)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col items-center w-full gap-8">
            {/* Top section - Logo and Laurels */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8">
              {/* Left side - Logo */}
              <div className="text-center lg:text-left">
                <div className="mb-6">
                  <img 
                    src="/images/heroimage.png" 
                    alt="Sabar Bonda Film Logo" 
                    className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 w-auto object-contain drop-shadow-2xl mx-auto lg:mx-0"
                    loading="eager"
                  />
                </div>
              </div>
              
              {/* Right side - Award Laurels Grid */}
              <div className="flex flex-col items-center">
                {/* 3-2 Grid of Award Laurels - Large and Prominent */}
                <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                  {/* Top row - 3 laurels */}
                  <div className="flex gap-3 sm:gap-4 lg:gap-6 xl:gap-8 justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36">
                      <img 
                        src="/images/award_laurels/Sundance Winner_World Cinema Grand Jury Prize-Dramatic_white.png" 
                        alt="Sundance World Cinema Grand Jury Prize" 
                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 brightness-110"
                      />
                    </div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36">
                      <img 
                        src="/images/award_laurels/SXSW winner laurel.png" 
                        alt="SXSW Winner Laurel" 
                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 brightness-110"
                      />
                    </div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36">
                      <img 
                        src="/images/award_laurels/Audience - Best Feature IFFLA 2025_white.png" 
                        alt="IFFLA 2025 Audience Best Feature" 
                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 brightness-110"
                      />
                    </div>
                  </div>
                  {/* Bottom row - 2 laurels */}
                  <div className="flex gap-3 sm:gap-4 lg:gap-6 xl:gap-8 justify-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36">
                      <img 
                        src="/images/award_laurels/IO-Audience-Award-Best-Narrative-Feature_white.png" 
                        alt="IO Audience Award Best Narrative Feature" 
                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 brightness-110"
                      />
                    </div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36">
                      <img 
                        src="/images/award_laurels/flc_ndnf25_laurels_official_selection_wht.png" 
                        alt="FLC NDNF25 Official Selection" 
                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300 brightness-110"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Symmetrically Positioned */}
            <div className="flex items-center justify-center mt-4 lg:mt-6">
              {/* Cleaned spacing: stack on xs, row on sm+. Smaller buttons with tighter gaps. */}
              <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-2 sm:gap-4 px-2 sm:px-0">
                <a
                  href="https://www.youtube.com/watch?v=7Z38Q_XT4Ow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full sm:w-auto px-3 py-2 sm:px-5 sm:py-2 border-2 border-white rounded-full font-nohemi font-bold text-white text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors duration-200 drop-shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  WATCH TRAILER
                </a>

                <a
                  href="https://in.bookmyshow.com/movies/sabar-bonda/ET00461143"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full sm:w-auto px-3 py-2 sm:px-5 sm:py-2 border-2 border-white rounded-full font-nohemi font-bold text-white text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors duration-200 drop-shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  aria-label="View showtimes"
                >
                  VIEW SHOWTIMES
                </a>

                <a
                  href="https://www.instagram.com/cactuspearsfilm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-3 py-2 sm:px-5 sm:py-2 border-2 border-white rounded-full font-nohemi font-bold text-white text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-colors duration-200 drop-shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={12} strokeWidth={2} className="w-4 h-4" />
                  <span>FOLLOW US</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
  <div className="absolute left-1/2 transform -translate-x-1/2 z-10 bottom-4 sm:bottom-8">
        <button 
          onClick={() => {
            const nextSection = document.querySelector('#about, section:nth-of-type(2), [data-section]:nth-of-type(2)');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="animate-bounce hover:animate-none cursor-pointer"
        >
          <svg 
            className="w-6 h-6 text-white opacity-70 hover:opacity-100 transition-opacity duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
