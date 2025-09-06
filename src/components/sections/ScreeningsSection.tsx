import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const ScreeningsSection = () => {
  const screenings = [
    {
      festival: 'Sundance Film Festival, USA, 2025',
      status: 'Winner of Grand Jury Prize in World Cinema Dramatic'
    },
    {
      festival: 'Sunny Bunny Festival, Ukraine, 2025',
      status: 'Best Feature Film'
    },
    {
      festival: 'San Francisco International Film Festival (SFFILM), USA, 2025',
      status: 'Global Visions Awards Honorable Mention'
    },
    {
      festival: 'IFFLA, USA, 2025',
      status: 'Audience Choice Award for Best Feature & Acting Honorary Mention'
    },
    {
      festival: 'Inside Out 2SLGBTQ+ Film Festival, Canada, 2025',
      status: 'Centrepiece Gala, Audience Award winner for Best Narrative Feature & Leadership Circle Award for Outstanding Performance (Bhushaan Manoj)'
    },
    {
      festival: 'SXSW London, UK, 2025',
      status: 'Grand Jury Prize for Best Film'
    },
    {
      festival: 'International Film Festival Guadalajara, Mexico, 2025',
      status: 'Maguey Award for Best Feature Film'
    }
  ];

  return (
    <section id="screenings" className="relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/filmstill2_small.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      <div className="relative z-10">
        <Section className="bg-black/30 backdrop-blur-sm">
          <SectionHeader 
            title="Festival Circuit"
            subtitle="Awards and international recognition"
            variant="dark"
          />
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-2 sm:left-3 md:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-copper-500 via-copper-400 to-copper-500"></div>
            
            <div className="space-y-1 sm:space-y-2 md:space-y-3">
              {screenings.map((screening, index) => (
                <div key={index} className="relative flex gap-2 sm:gap-3 md:gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-4 sm:w-6 md:w-8 flex justify-center pt-1 sm:pt-1.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-copper-500 border-2 border-white shadow-sm relative z-10"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-1 md:pb-2 min-w-0">
                    <div className="py-1 md:py-2 px-0">
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-cabinet font-semibold text-white mb-1 leading-tight">
                        {screening.festival}
                      </h3>
                      
                      <div className="inline-block">
                        <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 md:py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 leading-tight">
                          {screening.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </section>
  );
};

export default ScreeningsSection;
