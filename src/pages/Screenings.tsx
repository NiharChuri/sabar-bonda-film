import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Screenings = () => {
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
    },
    {
      festival: '[Film Festival]',
      location: '[Location]',
      dates: '[Dates]',
      status: 'Regional Premiere',
      venue: '[Venue]',
      time: '[Time]',
      category: '[Category]'
    }
  ];

  const upcomingScreenings = [
    {
      type: 'Theatrical Release',
      region: '[Region/Country]',
      date: '[Release Date]',
      distributor: '[Distributor Name]',
      status: 'Coming Soon'
    },
    {
      type: 'Festival Circuit',
      region: 'International',
      date: 'Spring 2025',
      distributor: 'Various Festivals',
      status: 'Submissions Open'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Section>
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-ink-900 mb-6">
            Screenings & Festivals
          </h1>
          <p className="text-xl leading-relaxed text-muted max-w-3xl mx-auto">
            Catch Sabar Bonda at these prestigious festivals and upcoming theatrical releases
          </p>
        </div>
      </Section>

      {/* Festival Timeline */}
      <Section className="bg-white">
        <SectionHeader 
          title="Festival Circuit"
          subtitle="Premiere screenings and festival appearances"
        />
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-12">
            {screenings.map((screening, index) => (
              <div key={index} className="relative flex gap-8">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-16 flex justify-center">
                  <div className="w-4 h-4 rounded-full bg-copper-500 border-4 border-white shadow-sm"></div>
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-12">
                  <div className="bg-white rounded-2xl p-8 shadow-film border border-border">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700">
                            {screening.status}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-serif font-semibold text-ink-900 mb-2">
                          {screening.festival}
                        </h3>
                        
                        <p className="text-copper-500 font-medium mb-4">
                          {screening.category}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-body">
                            <MapPin size={16} className="text-moss-500" />
                            <span>{screening.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-body">
                            <Calendar size={16} className="text-moss-500" />
                            <span>{screening.dates}</span>
                          </div>
                          <div className="flex items-center gap-2 text-body">
                            <Clock size={16} className="text-moss-500" />
                            <span>{screening.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-body">
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

      {/* Upcoming Releases */}
      <Section className="bg-sand-100/30">
        <SectionHeader 
          title="Upcoming Releases"
          subtitle="Theatrical and distribution announcements"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {upcomingScreenings.map((release, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-film">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-serif font-semibold text-ink-900">
                  {release.type}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sand-100 text-ink-900">
                  {release.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted">Region</span>
                  <span className="text-ink-900 font-medium">{release.region}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Date</span>
                  <span className="text-ink-900 font-medium">{release.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Distributor</span>
                  <span className="text-ink-900 font-medium">{release.distributor}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Screening Requests */}
      <Section>
        <SectionHeader 
          title="Private Screenings"
          subtitle="Request a screening for your organization or event"
          centered
        />
        
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-film text-center">
          <p className="text-body leading-relaxed mb-6">
            Interested in hosting a screening of Sabar Bonda for your film society, university, or cultural organization? We'd love to work with you to bring this powerful story to your audience.
          </p>
          
          <button className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium shadow-sm bg-copper-500 text-white hover:bg-copper-600 focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-200">
            Request Screening
          </button>
        </div>
      </Section>
    </>
  );
};

export default Screenings;