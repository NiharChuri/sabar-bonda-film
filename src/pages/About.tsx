import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import PersonCard from '@/components/ui/PersonCard';

const About = () => {
  const [showDirectorStatement, setShowDirectorStatement] = useState(false);

  const filmInfo = [
    { label: 'Original Title', value: 'Sabar Bonda' },
    { label: 'English Title', value: 'Cactus Pears' },
    { label: 'Language', value: '[Language]' },
    { label: 'Runtime', value: '[Runtime]' },
    { label: 'Aspect Ratio', value: '[Aspect Ratio]' },
    { label: 'Format', value: '[Format]' },
    { label: 'Countries', value: '[Countries]' },
    { label: 'Year', value: '2025' }
  ];

  const cast = [
    {
      name: 'Bhushaan Manoj',
      role: 'Anand',
      bio: 'Acclaimed actor known for powerful dramatic performances.',
      fullBio: '[Full biography content will be added here for Bhushaan Manoj, detailing their career, previous works, and approach to the role of Anand in Sabar Bonda.]'
    },
    {
      name: 'Suraaj Suman',
      role: 'Balya',
      bio: 'Rising talent with a compelling screen presence.',
      fullBio: '[Full biography content will be added here for Suraaj Suman, highlighting their background and portrayal of Balya.]'
    },
    {
      name: 'Jayshri Jagtap',
      role: 'Suman',
      bio: 'Versatile performer bringing depth to complex characters.',
      fullBio: '[Full biography content will be added here for Jayshri Jagtap, exploring their artistic journey and role as Suman.]'
    }
  ];

  const crew = [
    { name: '[Director Name]', role: 'Director', bio: 'Visionary filmmaker with a unique storytelling approach.' },
    { name: '[Producer Name]', role: 'Producer', bio: 'Experienced producer with acclaimed filmography.' },
    { name: '[Co-Producer Name]', role: 'Co-Producer', bio: 'Collaborative producer bringing creative insights.' },
    { name: '[Cinematographer Name]', role: 'Cinematographer', bio: 'Master of visual storytelling and composition.' },
    { name: '[Editor Name]', role: 'Editor', bio: 'Expert in narrative pacing and visual rhythm.' },
    { name: '[Sound Designer Name]', role: 'Sound Design', bio: 'Creating immersive audio landscapes.' },
    { name: '[Production Designer Name]', role: 'Production Design', bio: 'Crafting authentic visual worlds.' },
    { name: '[Costume Designer Name]', role: 'Costume Design', bio: 'Bringing characters to life through wardrobe.' },
    { name: '[Colorist Name]', role: 'Colorist', bio: 'Enhancing visual mood and atmosphere.' }
  ];

  return (
    <>
      {/* Director's Statement */}
      <Section>
        <SectionHeader 
          title="Director's Statement"
        />
        <div className="bg-white rounded-2xl p-8 shadow-film">
          <button
            onClick={() => setShowDirectorStatement(!showDirectorStatement)}
            className="w-full flex justify-between items-center text-left"
          >
            <h3 className="text-xl font-serif font-semibold text-ink-900">
              Artist's Vision
            </h3>
            {showDirectorStatement ? (
              <ChevronUp size={24} className="text-moss-500" />
            ) : (
              <ChevronDown size={24} className="text-moss-500" />
            )}
          </button>
          
          {showDirectorStatement && (
            <div className="mt-6 prose prose-lg max-w-none text-body leading-relaxed">
              <p>
                [Director's statement content will be added here. This will include the filmmaker's personal vision, inspiration behind Sabar Bonda, artistic approach, and deeper exploration of the themes and messages within the film.]
              </p>
            </div>
          )}
        </div>
      </Section>

      {/* Film Information */}
      <Section className="bg-sand-100/30">
        <SectionHeader 
          title="Film Information"
        />
        <div className="bg-white rounded-2xl p-8 shadow-film">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filmInfo.map((info, index) => (
              <div key={index}>
                <dt className="text-sm font-medium text-muted mb-1">{info.label}</dt>
                <dd className="text-base font-medium text-ink-900">{info.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Cast */}
      <Section>
        <SectionHeader 
          title="Cast"
          subtitle="The talented performers bringing Sabar Bonda to life"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cast.map((person, index) => (
            <PersonCard
              key={index}
              name={person.name}
              role={person.role}
              bio={person.bio}
              fullBio={person.fullBio}
            />
          ))}
        </div>
      </Section>

      {/* Crew */}
      <Section className="bg-white">
        <SectionHeader 
          title="Crew"
          subtitle="The creative team behind Sabar Bonda"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crew.map((person, index) => (
            <PersonCard
              key={index}
              name={person.name}
              role={person.role}
              bio={person.bio}
            />
          ))}
        </div>
      </Section>
    </>
  );
};

export default About;