import { useState } from 'react';
import { Mail, Phone, Copy, Check } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid - in a real app, this would send the data
      console.log('Form submitted:', formData);
      alert('Thank you for your message. We will get back to you soon!');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Section>
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-cabinet font-bold tracking-tight text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl leading-relaxed text-muted max-w-3xl mx-auto font-nohemi font-medium">
            Get in touch with the Sabar Bonda team for distribution, press, and partnership opportunities
          </p>
        </div>
      </Section>

      {/* Contact Panels */}
      <Section className="glass">
        <SectionHeader 
          title="Get In Touch"
          subtitle="Choose the appropriate contact for your inquiry"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {contactPanels.map((panel, index) => (
            <div key={index} className="glass rounded-lg p-8 shadow-film">
              <h3 className="text-xl font-cabinet font-semibold text-white mb-4">
                {panel.title}
              </h3>
              <p className="text-white leading-relaxed mb-6 font-nohemi font-medium">
                {panel.description}
              </p>
              
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Mail size={18} className="text-moss-500 flex-shrink-0" />
                    <span className="text-sm text-white font-mono truncate">
                      {panel.email}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(panel.email, `email-${index}`)}
                    className="flex-shrink-0 p-2 text-moss-500 hover:text-moss-600 transition-colors duration-200"
                    aria-label={`Copy ${panel.email}`}
                  >
                    {copiedEmail === `email-${index}` ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
                
                {/* Phone */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Phone size={18} className="text-moss-500 flex-shrink-0" />
                    <span className="text-sm text-white font-mono">
                      {panel.phone}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(panel.phone, `phone-${index}`)}
                    className="flex-shrink-0 p-2 text-moss-500 hover:text-moss-600 transition-colors duration-200"
                    aria-label={`Copy ${panel.phone}`}
                  >
                    {copiedEmail === `phone-${index}` ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact Form */}
      <Section className="glass">
        <SectionHeader 
          title="Send Us a Message"
          subtitle="Have a specific inquiry? Send us a message and we'll get back to you promptly"
        />
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="glass rounded-lg p-8 shadow-film">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2 font-cabinet">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.name ? 'border-red-500' : 'border-border'
                  } focus:ring-2 focus:ring-copper-500 focus:border-copper-500 transition-colors duration-200`}
                  placeholder="Your full name"
                />
                {formErrors.name && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2 font-cabinet">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.email ? 'border-red-500' : 'border-border'
                  } focus:ring-2 focus:ring-copper-500 focus:border-copper-500 transition-colors duration-200`}
                  placeholder="your.email@example.com"
                />
                {formErrors.email && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2 font-cabinet">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.message ? 'border-red-500' : 'border-border'
                  } focus:ring-2 focus:ring-copper-500 focus:border-copper-500 transition-colors duration-200 resize-vertical`}
                  placeholder="Tell us about your inquiry..."
                />
                {formErrors.message && (
                  <p className="mt-2 text-sm text-red-600">{formErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-xl px-6 py-3 font-medium shadow-sm bg-copper-500 text-white hover:bg-copper-600 focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-200 font-cabinet"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
};

export default Contact;
