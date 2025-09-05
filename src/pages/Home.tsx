import { useState, useEffect } from 'react';
import { Play, Mail } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import StatBadge from '@/components/ui/StatBadge';
import LinkPill from '@/components/ui/LinkPill';
import heroImage from '@/assets/hero-poster.jpg';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-paper-50 to-sand-100/30">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible ? 'reveal' : 'reveal-hidden'}`}>
          {/* Hero Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-ink-900 mb-4">
                Sabar Bonda
              </h1>
              <h2 className="text-2xl sm:text-3xl font-serif text-ink-700 mb-6">
                Cactus Pears
              </h2>
              <p className="text-xl leading-relaxed text-body max-w-2xl">
                A powerful exploration of family bonds, cultural heritage, and the transformative power of tradition in modern times.
              </p>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium shadow-sm bg-copper-500 text-white hover:bg-copper-600 focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-200">
                <Play size={20} className="mr-2" />
                Watch Trailer
              </button>
              <button className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium shadow-sm bg-leather-500 text-white hover:bg-[#5D412B] focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-200">
                <Mail size={20} className="mr-2" />
                Contact Sales/Press
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl shadow-film-lg overflow-hidden">
              <img 
                src={heroImage} 
                alt="Sabar Bonda / Cactus Pears film poster featuring silhouettes against a desert landscape with cactus pears"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Synopsis Section */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <SectionHeader 
            title="Synopsis"
            centered
          />
          <div className="prose prose-lg max-w-none text-body leading-relaxed">
            <p>
              [Synopsis content will be added here. This section will contain the main plot summary and story description of Sabar Bonda, exploring themes of family, tradition, and cultural transformation.]
            </p>
            <button className="text-moss-500 hover:text-moss-600 font-medium mt-4 transition-colors duration-200">
              Read more
            </button>
          </div>
        </div>
      </Section>

      {/* Accolades Section */}
      <Section className="bg-sand-100/30">
        <SectionHeader 
          title="Recognition"
          subtitle="Celebrating critical acclaim and festival success"
          centered
        />
        <div className="flex flex-wrap justify-center gap-4">
          <StatBadge 
            title="Sundance 2025"
            subtitle="World Cinema Grand Jury Prize: Dramatic"
            variant="laurel"
          />
          <StatBadge 
            title="Film Festival"
            subtitle="Award Category"
            variant="laurel"
          />
          <StatBadge 
            title="Film Festival"
            subtitle="Award Category"
            variant="laurel"
          />
        </div>
      </Section>

      {/* Press Links */}
      <Section>
        <SectionHeader 
          title="Press Coverage"
          subtitle="Featured coverage and reviews"
          centered
        />
        <div className="flex flex-wrap justify-center gap-4">
          <LinkPill href="#" label="Variety Review" external />
          <LinkPill href="#" label="The Guardian Interview" external />
          <LinkPill href="#" label="IndieWire Feature" external />
          <LinkPill href="#" label="Film Comment Analysis" external />
          <LinkPill href="#" label="Screen International" external />
        </div>
      </Section>
    </>
  );
};

export default Home;