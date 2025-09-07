import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const GallerySection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const galleryImages = [
    {
      src: '/images/gallery/bts1.jpg',
      alt: 'Behind the scenes - Production still 1',
      caption: 'Director and cast during filming in the mountain village setting'
    },
    {
      src: '/images/gallery/bts2.jpg',
      alt: 'Behind the scenes - Production still 2',
      caption: 'Capturing intimate moments between the lead characters'
    },
    {
      src: '/images/gallery/bts3.jpg',
      alt: 'Behind the scenes - Production still 3',
      caption: 'On location filming the emotional climax sequence'
    },
    {
      src: '/images/gallery/bts4.jpg',
      alt: 'Behind the scenes - Production still 4',
      caption: 'Cast and crew preparing for the final scenes'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Touch/swipe handlers
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
        // Swipe left - next image
        nextImage();
      } else {
        // Swipe right - previous image
        prevImage();
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
        // Drag left - next image
        nextImage();
      } else {
        // Drag right - previous image
        prevImage();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    isDragging.current = false;
  };

  return (
    <section id="bts" className="relative">
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
        <Section className="bg-black/30 backdrop-blur-sm">
          <header className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-cabinet font-bold tracking-tight text-white mb-3 sm:mb-4">
              Gallery
            </h2>
            {/* <p className="text-base sm:text-lg leading-relaxed text-white/80 max-w-3xl font-nohemi font-medium">
              Behind the scenes moments and production stills
            </p> */}
          </header>
          
          {/* Image Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Main Image Display */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out cursor-grab active:cursor-grabbing select-none"
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
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white hover:text-white/70 transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white hover:text-white/70 transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 bg-black/60 text-white text-xs sm:text-sm font-nohemi">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-4 sm:mt-6 flex justify-center space-x-2 sm:space-x-3 overflow-x-auto pb-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'border-copper-500 shadow-lg scale-105' 
                      : 'border-white/30 hover:border-white/60'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <img 
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Dot Indicators */}
            <div className="mt-3 sm:mt-4 flex justify-center space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                    index === currentImageIndex 
                      ? 'bg-copper-500 scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
};

export default GallerySection;
