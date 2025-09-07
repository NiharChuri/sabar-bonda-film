import { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState('');

  const contactPanels = [
    {
      title: 'Producer',
      email: 'vision@lotusve.com',
      description: 'Direct contact with the production team and key personnel'
    },
    {
      title: 'Strand Releasing',
      email: 'marcus@strandreleasing.com',
      description: 'For theatrical distribution, international sales, and licensing inquiries'
    },
    {
      title: 'MPM Premium',
      email: 'licensing@mpmpremium.com',
      description: 'Press materials, interviews, and media-related requests'
    }
  ];

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(type);
      setTimeout(() => setCopiedEmail(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section id="contact" className="relative">
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
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cabinet font-semibold tracking-tight text-white mb-4 sm:mb-6">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-nohemi max-w-2xl mx-auto">
              Choose the appropriate contact for your inquiry
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {contactPanels.map((panel, index) => (
              <div key={index} className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl font-cabinet font-semibold text-white mb-3 sm:mb-4">
                  {panel.title}
                </h3>
                <p className="text-white leading-relaxed mb-4 sm:mb-6 font-nohemi font-medium text-sm sm:text-base">
                  {panel.description}
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <Mail size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px] text-copper-500 flex-shrink-0" />
                      <a 
                        href={`mailto:${panel.email}`}
                        className="text-xs sm:text-sm lg:text-base text-white font-mono truncate hover:text-copper-300 transition-colors duration-200"
                      >
                        {panel.email}
                      </a>
                    </div>
                    <button
                      onClick={() => copyToClipboard(panel.email, `email-${index}`)}
                      className="flex-shrink-0 p-1.5 sm:p-2 rounded-full text-copper-500 hover:text-white hover:bg-copper-500 transition-all duration-200"
                      aria-label={`Copy ${panel.email}`}
                    >
                      {copiedEmail === `email-${index}` ? (
                        <Check size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                      ) : (
                        <Copy size={12} className="sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
};

export default ContactSection;
