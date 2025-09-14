import { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const ContactSection = () => {
  const [copiedEmail, setCopiedEmail] = useState('');

  // Animation hooks
  const { ref: contactRef, isVisible: contactVisible, isItemVisible } = useStaggeredAnimation<HTMLDivElement>({
    delay: 200,
    staggerDelay: 200,
    childSelector: '.contact-panel'
  });

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
        <Section className="bg-black/30 backdrop-blur-sm" enableParallax>
          <SectionHeader 
            title="Get In Touch" 
            subtitle="Choose the appropriate contact for your inquiry"
            variant="dark"
            centered
          />
          
          <div 
            ref={contactRef}
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-1000 ease-out ${
              contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {contactPanels.map((panel, index) => (
              <div 
                key={index} 
                className={`contact-panel p-4 sm:p-6 lg:p-8 glass-dark rounded-lg border border-white/10 hover:border-copper-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-copper-500/10 btn-hover transform-gpu ${
                  isItemVisible(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
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
