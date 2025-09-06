import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const BTS = () => {
  const btsImages = [
    {
      id: 1,
      caption: '[BTS Info - Director working with cast]',
      pageRef: 'Page 1'
    },
    {
      id: 2,
      caption: '[BTS Info - Cinematography setup]',
      pageRef: 'Page 2'
    },
    {
      id: 3,
      caption: '[BTS Info - On-location shooting]',
      pageRef: 'Page 3'
    },
    {
      id: 4,
      caption: '[BTS Info - Cast preparation]',
      pageRef: 'Page 4'
    },
    {
      id: 5,
      caption: '[BTS Info - Production design]',
      pageRef: 'Page 5'
    },
    {
      id: 6,
      caption: '[BTS Info - Post-production work]',
      pageRef: 'Page 6'
    },
    {
      id: 7,
      caption: '[BTS Info - Crew collaboration]',
      pageRef: 'Page 7'
    },
    {
      id: 8,
      caption: '[BTS Info - Final scenes]',
      pageRef: 'Page 8'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section>
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-cabinet font-bold tracking-tight text-white mb-6">
            Behind the Scenes
          </h1>
          <p className="text-xl leading-relaxed text-muted max-w-3xl mx-auto font-nohemi font-medium">
            An intimate look at the making of Sabar Bonda, capturing the creative process and collaborative spirit behind the film
          </p>
        </div>
      </Section>

      {/* BTS Gallery */}
      <Section className="glass">
        <SectionHeader 
          title="Production Gallery"
          subtitle="Moments from the creation of Sabar Bonda"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {btsImages.map((image) => (
            <div key={image.id} className="glass rounded-lg shadow-film overflow-hidden card-hover">
              {/* Image Placeholder - Black and White */}
              <div className="aspect-[4/3] bg-gradient-to-br from-ink-400 to-ink-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-white/70">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-sm">BTS Photo {image.id}</p>
                  </div>
                </div>
                {/* Grayscale overlay effect for B&W aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              
              {/* Caption and Info */}
              <div className="p-6">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">
                      BTS Info
                    </label>
                    <p className="text-white leading-relaxed">
                      {image.caption}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">
                      Page Reference
                    </label>
                    <p className="text-sm text-copper-500 font-medium">
                      {image.pageRef}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Production Notes */}
      <Section className="glass">
        <SectionHeader 
          title="Production Notes"
          subtitle="Insights into the filmmaking process"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass rounded-lg p-8 shadow-film">
            <h3 className="text-xl font-cabinet font-semibold text-white mb-4">
              Filming Locations
            </h3>
            <p className="text-white leading-relaxed mb-4 font-nohemi font-medium">
              [Location details will be added here - describing the key filming locations and their significance to the story of Sabar Bonda]
            </p>
            <ul className="space-y-2 text-white font-nohemi font-medium">
              <li>• [Primary Location]</li>
              <li>• [Secondary Location]</li>
              <li>• [Additional Location]</li>
            </ul>
          </div>
          
          <div className="glass rounded-lg p-8 shadow-film">
            <h3 className="text-xl font-cabinet font-semibold text-white mb-4">
              Production Timeline
            </h3>
            <p className="text-white leading-relaxed mb-4 font-nohemi font-medium">
              [Timeline details will be added here - key dates and milestones in the production of Sabar Bonda]
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted">Pre-production</span>
                <span className="text-copper-500 font-medium">[Dates]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Principal Photography</span>
                <span className="text-copper-500 font-medium">[Dates]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Post-production</span>
                <span className="text-copper-500 font-medium">[Dates]</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default BTS;
