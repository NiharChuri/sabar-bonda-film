import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const AboutSection = () => {
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);

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
        <Section>
          <h2 className="text-4xl sm:text-5xl font-cabinet font-semibold tracking-tight text-white mb-8">
            Director's Statement
          </h2>
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Column */}
              <div className="lg:w-1/2">
                <div className="prose prose-sm max-w-none text-white leading-relaxed space-y-4">
                  <p className="font-nohemi font-light tracking-wide">
                    Sabar Bonda (Cactus Pears) is my deeply personal reimagining of the
                    grieving period I experienced in my ancestral village in 2016. Born
                    and raised in a Mumbai slum by a chauffeur father and a homemaker
                    mother, my parents accepted my sexuality, but my extended family
                    in the village was unaware. During this grieving period, they began
                    pressuring me to marry within a year, as per custom. This constant
                    pressure overshadowed my grief, leaving me longing for an escape I
                    couldn't find at the time.
                  </p>
                  <p className="font-nohemi font-light tracking-wide">
                    Through this film, I explore the possibility of solace and freedom by
                    allowing my protagonist to experience moments of connection and
                    respite with an estranged childhood friend. These moments gradually
                    blossom into a tender bond, making this film a journey that begins
                    with tragedy and moves toward hope and positivity.
                  </p>
                  <p className="font-nohemi font-light tracking-wide">
                    To ensure authenticity, I cast actors from the region where the film
                    was shot, despite the challenges of finding local talent willing to
                    portray queer characters due to cultural stigma. After three years of
                    searching, Bhushaan Manoj and Suraaj Suman were selected for their
                    backgrounds as trained theater actors and their six-year friendship,
                    which added depth and realism to the characters' bond and intimacy.
                    Their grounded and relatable appearances were also crucial to
                    portraying queer individuals as ordinary people rather than idealized
                    figures, further humanizing their story.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="lg:w-1/2">
                <div className="prose prose-sm max-w-none text-white leading-relaxed space-y-4">
                  <p className="font-nohemi font-light tracking-wide">
                    My personal experiences shaped Sabar Bonda to reflect the realities
                    of lower-class queer life in India, challenging the misconception that
                    queer experiences are limited to the upper class. By weaving together
                    urban and rural experiences, the film aims to normalize queerness and
                    celebrate its presence in all layers of society.
                  </p>
                  <p className="font-nohemi font-light tracking-wide">
                    The characters of the parents in the film are inspired by my parents
                    whose love and wisdom led them to accept my sexuality without
                    any conflict. By highlighting this aspect of acceptance without
                    sensationalizing struggle, the film offers a fresh perspective that
                    redefines queer narratives and fosters hope.
                  </p>
                  <p className="font-nohemi font-light tracking-wide">
                    I used static frames to capture the stillness and sluggish pace of that
                    time in the village. And although at its core it's a romance drama, it has
                    no background score. I wanted to use layered soundscape to paint the
                    urban and rural spaces to further enhances the tender quality of the
                    film.
                  </p>
                  <p className="font-nohemi font-light tracking-wide">
                    I shot this film in a small village called Kharshinde, where my mother
                    was born and raised. We filmed several scenes near a man-made lake
                    in the village, created decades ago due to the lack of a natural water
                    source. When the lake was being dug, my mother, then a teenager,
                    worked as one of the laborers. Knowing that this landscape holds a
                    part of my mother's personal history made the experience deeply
                    meaningful for me.
                  </p>
                  <div className="mt-8 pt-4 border-t border-white/30">
                    <p className="font-cabinet font-semibold text-white text-right text-2xl">
                      - Rohan Parashuram Kanawade, Director
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeader 
            title="Information"
            variant="dark"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Side - Movie Poster Carousel */}
            <div className="lg:col-span-4">
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <div className="relative">
                  <img 
                    src={posterImages[currentPosterIndex].src}
                    alt={posterImages[currentPosterIndex].alt}
                    className="w-full h-auto object-cover transition-all duration-500 ease-in-out"
                    loading="lazy"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevPoster}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-white/70 transition-all duration-200"
                    aria-label="Previous poster"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button
                    onClick={nextPoster}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-white/70 transition-all duration-200"
                    aria-label="Next poster"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Poster Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm font-nohemi">
                    {currentPosterIndex + 1} / {posterImages.length}
                  </div>
                </div>
                
                {/* Poster Indicators */}
                <div className="mt-4 flex justify-center space-x-2">
                  {posterImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPosterIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
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
            <div className="lg:col-span-8">
              <div>
                <h3 className="text-3xl font-cabinet font-bold text-white mb-6">
                  Synopsis
                </h3>
                <div className="prose prose-sm max-w-none text-white leading-relaxed space-y-4 text-sm font-nohemi font-light tracking-wider">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <p>
                        Anand (30), a call-center employee in Mumbai, is forced to spend ten days at his ancestral village to mourn the loss of his father at the behest of his mother, Suman (50).
                      </p>
                      <p>
                        As the mourning period begins post-cremation, he faces subtle but relentless badgering from relatives to get married so that at least his mother finds the pleasure of seeing him settled. Anand finds himself stifled, as coming out to extended family could alienate his mother from the relatives when she needs them the most.
                      </p>
                      <p>
                        He finds solace in his childhood friend, Balya (30), as he accompanies him on his daily outings into the mountains to herd goats. Balya has been using the 'educated girls favoring city-dwellers over farmers' as a ruse to stay unmarried as he undergoes similar pressures relating to his sexuality from his family.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <p>
                        To escape their pressures, the two men spend time together. Hailing from different worlds but bound by childhood memories, they connect over their common struggle.
                      </p>
                      <p>
                        As the days pass, their intimacy blooms emotionally and physically. With the mourning period ending, will their burgeoning bond survive beyond the ten days?
                      </p>
                      <p>
                        Sabar Bonda (Cactus Pears) explores the delicate bonds that develop under duress and the future of it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cast & Crew Section - Full Width Below */}
          <div className="mt-12">
            <div>
              <h3 className="text-2xl font-cabinet font-bold text-white mb-8 text-center">
                Cast & Crew
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Written and Directed */}
                <div>
                  <h4 className="text-md font-semibold text-copper-500 uppercase tracking-wide mb-3 font-cabinet">
                    Written & Directed
                  </h4>
                  <p className="text-md tracking-wider font-light text-white font-nohemi">
                    Rohan Parashuram Kanawade
                  </p>
                </div>

                {/* Cast */}
                <div>
                  <h4 className="text-md font-semibold text-copper-500 uppercase tracking-wide mb-3 font-cabinet">
                    Cast
                  </h4>
                  <div className="space-y-2">
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Bhushaan Manoj
                    </p>
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Suraaj Suman
                    </p>
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Jayshri Jagtap
                    </p>
                  </div>
                </div>

                {/* Producers */}
                <div>
                  <h4 className="text-md font-semibold text-copper-500 uppercase tracking-wide mb-3 font-cabinet">
                    Producers
                  </h4>
                  <div className="space-y-2">
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Lotus Visual Productions (Neeraj Churi)
                    </p>
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Kaushik Ray
                    </p>
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Naren Chandavarkar
                    </p>
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Sidharth Meer
                    </p>
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Hareesh Reddypalli
                    </p>
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Rohan Parashuram Kanawade
                    </p>
                  </div>
                </div>

                {/* Executive Producers */}
                <div>
                  <h4 className="text-md font-semibold text-copper-500 uppercase tracking-wide mb-3 font-cabinet">
                    Executive Producers
                  </h4>
                  <div className="space-y-2">
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Ilann Girard
                    </p>
                    <p className="text-md tracking-wider font-light text-white font-nohemi">
                      Kishor Vasant Sawant
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
};

export default AboutSection;
