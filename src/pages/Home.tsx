import { Play, Mail } from 'lucide-react';
import Section from '@/components/ui/Section';
import StatBadge from '@/components/ui/StatBadge';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Section className="min-h-screen flex items-center justify-center bg-paper-50">
        <div className="text-center max-w-6xl mx-auto space-y-16">
          <div className="space-y-8">
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-serif font-bold tracking-tighter text-ink-900 leading-none">
              Sabar Bonda
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-ink-700 font-light">
              Cactus Pears
            </h2>
            <p className="text-xl sm:text-2xl text-body max-w-3xl mx-auto font-light leading-relaxed">
              A powerful exploration of family bonds, cultural heritage, and the transformative power of tradition.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-3 font-medium bg-copper-500 text-white hover:bg-copper-600 transition-colors duration-200">
              <Play size={20} className="mr-2" />
              Watch Trailer
            </button>
            <button className="inline-flex items-center justify-center px-8 py-3 font-medium bg-ink-900 text-white hover:bg-ink-700 transition-colors duration-200">
              <Mail size={20} className="mr-2" />
              Contact
            </button>
          </div>
        </div>
      </Section>

      {/* Recognition */}
      <Section className="bg-white py-24">
        <div className="text-center space-y-12">
          <h3 className="text-2xl font-serif text-ink-900">Recognition</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <StatBadge 
              title="Sundance 2025"
              subtitle="World Cinema Grand Jury Prize"
              variant="laurel"
            />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;