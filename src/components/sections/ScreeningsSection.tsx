import { Calendar, MapPin, Clock } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const ScreeningsSection = () => {
  const screenings = [
    {
      festival: 'Sundance Film Festival 2025',
      location: 'Park City, Utah',
      dates: 'January 23 - February 2, 2025',
      status: 'World Premiere',
      venue: 'Eccles Theater',
      time: 'Various Showtimes',
      category: 'World Cinema Dramatic Competition'
    },
    {
      festival: '[Film Festival]',
      location: '[Location]',
      dates: '[Dates]',
      status: 'International Premiere',
      venue: '[Venue]',
      time: '[Time]',
      category: '[Category]'
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
            subtitle="Premiere screenings and festival appearances"
            variant="dark"
          />
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/50"></div>
            
            <div className="space-y-12">
              {screenings.map((screening, index) => (
                <div key={index} className="relative flex gap-8">
                  <div className="flex-shrink-0 w-16 flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-copper-500 border-4 border-white shadow-sm"></div>
                  </div>
                  
                  <div className="flex-1 pb-12">
                    <div className="p-8 border border-white/20">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700">
                              {screening.status}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-cabinet font-semibold text-white mb-2">
                            {screening.festival}
                          </h3>
                          
                          <p className="text-copper-500 font-medium mb-4">
                            {screening.category}
                          </p>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-white font-nohemi font-medium">
                              <MapPin size={16} className="text-moss-500" />
                              <span>{screening.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white font-nohemi font-medium">
                              <Calendar size={16} className="text-moss-500" />
                              <span>{screening.dates}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white font-nohemi font-medium">
                              <Clock size={16} className="text-moss-500" />
                              <span>{screening.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white font-nohemi font-medium">
                              <span className="font-medium">Venue:</span>
                              <span>{screening.venue}</span>
                            </div>
                          </div>
                        </div>
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
