import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const GallerySection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
          <SectionHeader 
            title="Gallery"
            subtitle="Behind the scenes moments and production stills"
            variant="dark"
          />
          
          {/* Image Carousel */}
          <div className="relative max-w-4xl mx-auto">
            {/* Main Image Display */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                loading="lazy"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-white/70 transition-all duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-white/70 transition-all duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white text-sm font-nohemi">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-6 flex justify-center space-x-3 overflow-x-auto pb-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
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
            <div className="mt-4 flex justify-center space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
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
