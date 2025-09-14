import { useState, useEffect, useRef } from 'react';
import { Instagram } from 'lucide-react';
import { useEntranceAnimation } from '@/hooks/useScrollAnimation';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Entrance animations with different delays
  const { isVisible: logoVisible } = useEntranceAnimation(500);
  const { isVisible: laurelsVisible } = useEntranceAnimation(800);
  const { isVisible: buttonsVisible } = useEntranceAnimation(1200);
  const { isVisible: arrowVisible } = useEntranceAnimation(1600);

  const awardImages = [
    "/images/award_laurels/Sundance Winner_World Cinema Grand Jury Prize-Dramatic_white.png",
    "/images/award_laurels/SXSW winner laurel.png",
    "/images/award_laurels/Audience - Best Feature IFFLA 2025_white.png",
    "/images/award_laurels/IO-Audience-Award-Best-Narrative-Feature_white.png",
    "/images/award_laurels/flc_ndnf25_laurels_official_selection_wht.png"
  ];

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

    // Preload award images
    awardImages.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => prev + 1);
      };
      img.src = src;
    });
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#about, section:nth-of-type(2), [data-section]:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
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
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
            videoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoLoad}
        >
          <source src="/videos/sabarbondawebsiteloop.mp4" type="video/mp4" />
        </video>
        {/* Fallback background image - only show if video hasn't loaded */}
        {!videoLoaded && (
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundImage: 'url(/images/filmstill2_small.jpg)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto w-full transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col items-center w-full gap-8">
            {/* Top section - Logo and Laurels */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-8">
              {/* Left side - Logo */}
              <div className="text-center lg:text-left">
                <div className={`mb-6 transition-all duration-1000 ease-out transform ${
                  logoVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                }`}>
                  <img 
                    src="/images/heroimage.png" 
                    alt="Sabar Bonda Film Logo" 
                    className="h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 w-auto object-contain drop-shadow-2xl mx-auto lg:mx-0 float transform-gpu"
                    loading="eager"
                  />
                </div>
              </div>
              
              {/* Right side - Award Laurels Grid */}
              <div className={`flex flex-col items-center transition-all duration-1000 ease-out ${
                laurelsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                {/* 3-2 Grid of Award Laurels - Large and Prominent */}
                <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                  {/* Top row - 3 laurels */}
                  <div className="flex gap-3 sm:gap-4 lg:gap-6 xl:gap-8 justify-center">
                    {awardImages.slice(0, 3).map((src, index) => (
                      <div 
                        key={index}
                        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 transition-all duration-700 ease-out transform ${
                          imagesLoaded > index && laurelsVisible 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 translate-y-4 scale-95'
                        }`}
                        style={{ 
                          transitionDelay: `${800 + (index * 200)}ms`,
                          animationDelay: `${index * 200}ms`
                        }}
                      >
                        <img 
                          src={src}
                          alt={`Award ${index + 1}`}
                          className="w-full h-full object-contain drop-shadow-2xl hover:scale-110 hover:rotate-3 transition-all duration-300 ease-out brightness-110 float-delayed transform-gpu"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Bottom row - 2 laurels */}
                  <div className="flex gap-3 sm:gap-4 lg:gap-6 xl:gap-8 justify-center">
                    {awardImages.slice(3, 5).map((src, index) => (
                      <div 
                        key={index + 3}
                        className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 transition-all duration-700 ease-out transform ${
                          imagesLoaded > (index + 3) && laurelsVisible 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 translate-y-4 scale-95'
                        }`}
                        style={{ 
                          transitionDelay: `${1400 + (index * 200)}ms`,
                          animationDelay: `${(index + 3) * 200}ms`
                        }}
                      >
                        <img 
                          src={src}
                          alt={`Award ${index + 4}`}
                          className="w-full h-full object-contain drop-shadow-2xl hover:scale-110 hover:rotate-3 transition-all duration-300 ease-out brightness-110 float-slow transform-gpu"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons - Symmetrically Positioned */}
            <div className={`flex items-center justify-center mt-6 lg:mt-8 transition-all duration-800 ease-out ${
              buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <div className="flex items-center gap-4 sm:gap-6">
                <a 
                  href="https://www.youtube.com/watch?v=7Z38Q_XT4Ow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 border-2 border-white rounded-full font-nohemi font-bold text-white text-xs sm:text-sm tracking-wider uppercase btn-hover btn-hover-glow transition-all duration-300 ease-out drop-shadow-lg transform-gpu"
                  style={{ 
                    transform: 'translateX(-6px)',
                    animationDelay: '1200ms'
                  }}
                >
                  WATCH TRAILER
                </a>
                
                <a
                  href="https://www.instagram.com/cactuspearsfilm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 border-2 border-white/70 rounded-full font-nohemi font-bold text-white text-xs sm:text-sm tracking-wider uppercase btn-hover btn-hover-glow transition-all duration-300 ease-out drop-shadow-lg transform-gpu"
                  aria-label="Follow us on Instagram"
                  style={{ 
                    transform: 'translateX(6px)',
                    animationDelay: '1400ms'
                  }}
                >
                  <Instagram size={12} className="sm:w-4 sm:h-4 transition-transform duration-300" />
                  <span>FOLLOW US</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-800 ease-out ${
        arrowVisible ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <button 
          onClick={handleScrollDown}
          className="animate-bounce hover:animate-none cursor-pointer group transition-all duration-300 transform hover:scale-110"
        >
          <svg 
            className="w-6 h-6 text-white group-hover:text-copper-500 transition-colors duration-300" 
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
