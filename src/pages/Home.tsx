import { useState, useEffect } from 'react';
import { Play, Mail } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import StatBadge from '@/components/ui/StatBadge';
import LinkPill from '@/components/ui/LinkPill';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-gradient-to-br from-paper-50 to-sand-100/30 min-h-[70vh] flex items-center">
        <div className={`w-full text-center transition-all duration-700 ${isVisible ? 'reveal' : 'reveal-hidden'}`}>
          {/* Hero Content */}
          <div className="space-y-12 max-w-5xl mx-auto">
            <div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold tracking-tighter text-ink-900 mb-8 leading-none">
                Sabar Bonda
              </h1>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-ink-700 mb-12 tracking-tight">
                Cactus Pears
              </h2>
              <p className="text-2xl sm:text-3xl leading-relaxed text-body max-w-4xl mx-auto font-light">
                A powerful exploration of family bonds, cultural heritage, and the transformative power of tradition in modern times.
              </p>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-4 font-medium shadow-lg bg-copper-500 text-white hover:bg-copper-600 focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-200 text-lg">
                <Play size={24} className="mr-3" />
                Watch Trailer
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 font-medium shadow-lg bg-leather-500 text-white hover:bg-[#5D412B] focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-200 text-lg">
                <Mail size={24} className="mr-3" />
                Contact Sales/Press
              </button>
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