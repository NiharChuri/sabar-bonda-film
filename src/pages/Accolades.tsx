import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import StatBadge from '@/components/ui/StatBadge';

const Accolades = () => {
  const awards = [
    {
      year: '2025',
      festival: 'Sundance Film Festival',
      award: 'World Cinema Grand Jury Prize: Dramatic',
      description: 'Prestigious recognition for outstanding dramatic filmmaking in world cinema.'
    },
    {
      year: '2025',
      festival: '[Film Festival]',
      award: '[Award Category]',
      description: '[Award description will be added here]'
    },
    {
      year: '2025',
      festival: '[Film Festival]',
      award: '[Award Category]',
      description: '[Award description will be added here]'
    }
  ];

  const selections = [
    {
      festival: 'Sundance Film Festival 2025',
      category: 'World Cinema Dramatic Competition'
    },
    {
      festival: '[Film Festival]',
      category: '[Selection Category]'
    },
    {
      festival: '[Film Festival]',
      category: '[Selection Category]'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section>
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-cabinet font-bold tracking-tight text-white mb-6">
            Accolades & Recognition
          </h1>
          <p className="text-xl leading-relaxed text-muted max-w-3xl mx-auto font-nohemi font-medium">
            Celebrating the critical acclaim and festival success of Sabar Bonda
          </p>
        </div>
      </Section>

      {/* Awards */}
      <Section className="glass">
        <SectionHeader 
          title="Awards & Honors"
          subtitle="Recognition from prestigious film festivals and institutions"
        />
        <div className="space-y-8">
          {awards.map((award, index) => (
            <div key={index} className="glass rounded-lg p-8 shadow-film">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <StatBadge 
                      title={award.festival}
                      subtitle={award.year}
                      variant="laurel"
                    />
                  </div>
                  <h3 className="text-xl font-cabinet font-semibold text-white mb-2">
                    {award.award}
                  </h3>
                  <p className="text-white leading-relaxed font-nohemi font-medium">
                    {award.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Festival Selections */}
      <Section>
        <SectionHeader 
          title="Festival Selections"
          subtitle="Official selections and competition entries"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selections.map((selection, index) => (
            <div key={index} className="glass rounded-lg p-6 shadow-film card-hover">
              <h3 className="font-cabinet font-semibold text-lg text-white mb-2">
                {selection.festival}
              </h3>
              <p className="text-copper-500 font-medium font-nohemi">
                {selection.category}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Press Quotes */}
      <Section className="glass">
        <SectionHeader 
          title="Critical Praise"
          subtitle="What critics and industry professionals are saying"
        />
        <div className="space-y-8">
          <blockquote className="glass rounded-lg p-8 border-l-4 border-copper-500">
            <p className="text-lg italic text-white leading-relaxed mb-4 font-nohemi font-medium">
              "[Critical quote will be added here - professional review or industry praise for Sabar Bonda]"
            </p>
            <cite className="text-muted font-medium font-nohemi">— [Publication/Critic Name]</cite>
          </blockquote>
          
          <blockquote className="glass rounded-lg p-8 border-l-4 border-copper-500">
            <p className="text-lg italic text-white leading-relaxed mb-4 font-nohemi font-medium">
              "[Additional critical quote - another perspective on the film's artistic merit and impact]"
            </p>
            <cite className="text-muted font-medium font-nohemi">— [Publication/Critic Name]</cite>
          </blockquote>
        </div>
      </Section>
    </>
  );
};

export default Accolades;
