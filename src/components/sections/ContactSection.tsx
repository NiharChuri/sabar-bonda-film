import { useState } from 'react';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState('');

  const contactPanels = [
    {
      title: 'Sales & Distribution',
      email: 'sales@sabarbonda.com',
      phone: '+1 (XXX) XXX-XXXX',
      description: 'For theatrical distribution, international sales, and licensing inquiries'
    },
    {
      title: 'Press & Media',
      email: 'press@sabarbonda.com', 
      phone: '+1 (XXX) XXX-XXXX',
      description: 'Press materials, interviews, and media-related requests'
    },
    {
      title: 'Producer Contact',
      email: 'producer@sabarbonda.com',
      phone: '+1 (XXX) XXX-XXXX',
      description: 'Direct contact with the production team and key personnel'
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
          <SectionHeader 
            title="Get In Touch"
            subtitle="Choose the appropriate contact for your inquiry"
            variant="dark"
          />
          
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
                      <Mail size={16} className="sm:w-[18px] sm:h-[18px] text-copper-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-white font-mono truncate">
                        {panel.email}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(panel.email, `email-${index}`)}
                      className="flex-shrink-0 p-1.5 sm:p-2 rounded-full text-copper-500 hover:text-moss-600 hover:bg-moss-50 transition-all duration-200"
                      aria-label={`Copy ${panel.email}`}
                    >
                      {copiedEmail === `email-${index}` ? (
                        <Check size={14} className="sm:w-4 sm:h-4" />
                      ) : (
                        <Copy size={14} className="sm:w-4 sm:h-4" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <Phone size={16} className="sm:w-[18px] sm:h-[18px] text-copper-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-white font-mono">
                        {panel.phone}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(panel.phone, `phone-${index}`)}
                      className="flex-shrink-0 p-1.5 sm:p-2 rounded-full text-copper-500 hover:text-moss-600 hover:bg-moss-50 transition-all duration-200"
                      aria-label={`Copy ${panel.phone}`}
                    >
                      {copiedEmail === `phone-${index}` ? (
                        <Check size={14} className="sm:w-4 sm:h-4" />
                      ) : (
                        <Copy size={14} className="sm:w-4 sm:h-4" />
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
