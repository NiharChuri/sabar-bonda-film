import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Mail, Phone, Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import PersonCard from '@/components/ui/PersonCard';
import StatBadge from '@/components/ui/StatBadge';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Data
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
    { name: '[Sound Designer Name]', role: 'Sound Design', bio: 'Creating immersive audio landscapes.' }
  ];

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
    }
  ];

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

  const galleryImages = [
    {
      src: '/images/filmstill1_small.jpg',
      alt: 'Behind the scenes - Director with cast',
      caption: 'Director Rohan Parashuram Kanawade directing the leads in the village setting'
    },
    {
      src: '/images/filmstill2_small.jpg',
      alt: 'On location in the mountains',
      caption: 'Filming the goat herding scenes in the scenic mountain landscape'
    },
    {
      src: '/images/vertical_poster.jpg',
      alt: 'Production still',
      caption: 'Intimate moment captured during the emotional climax sequence'
    },
    {
      src: '/images/homepageimage_small.jpg',
      alt: 'Cast preparation',
      caption: 'Bhushaan Manoj and Suraaj Suman preparing for their characters'
    }
  ];

  // Functions
  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(type);
      setTimeout(() => setCopiedEmail(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
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
      console.log('Form submitted:', formData);
      alert('Thank you for your message. We will get back to you soon!');
      setFormData({ name: '', email: '', message: '' });
      setFormErrors({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/filmstill2_small.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
          <div className={`max-w-7xl mx-auto w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-between items-center w-full">
              {/* Left side - Title */}
              <div className="text-left">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white mb-6 leading-none font-serif">
                  Sabar Bonda
                </h1>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-nohemi font-light text-white/90 tracking-wide">
                  (Cactus Pears)
                </h2>
              </div>
              
              {/* Right side - Award Badge */}
              <div className="hidden lg:flex flex-col items-center">
                <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                  {/* Laurel Wreath SVG */}
                  <div className="w-24 h-24 mb-4 mx-auto">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-yellow-400 fill-current">
                      {/* Left laurel branch */}
                      <path d="M20 50c0-8 6-15 14-17-8-2-14-9-14-17 0 8-6 15-14 17 8 2 14 9 14 17z"/>
                      <path d="M30 40c0-6 4-11 10-13-6-2-10-7-10-13 0 6-4 11-10 13 6 2 10 7 10 13z"/>
                      <path d="M25 60c0-6 4-11 10-13-6-2-10-7-10-13 0 6-4 11-10 13 6 2 10 7 10 13z"/>
                      
                      {/* Right laurel branch */}
                      <path d="M80 50c0-8-6-15-14-17 8-2 14-9 14-17 0 8 6 15 14 17-8 2-14 9-14 17z"/>
                      <path d="M70 40c0-6-4-11-10-13 6-2 10-7 10-13 0 6 4 11 10 13-6 2-10 7-10 13z"/>
                      <path d="M75 60c0-6-4-11-10-13 6-2 10-7 10-13 0 6 4 11 10 13-6 2-10 7-10 13z"/>
                    </svg>
                  </div>
                  
                  {/* Award Text */}
                  <div className="text-center">
                    <div className="text-white font-bold text-sm mb-1 font-nohemi">SUNDANCE 2025</div>
                    <div className="text-white/90 text-xs leading-tight font-nohemi font-medium">World Cinema</div>
                    <div className="text-white/90 text-xs leading-tight font-nohemi font-medium">Grand Jury Prize</div>
                    <div className="text-white/90 text-xs leading-tight font-nohemi font-medium">Dramatic</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative">
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
              title="Director's Statement"
              variant="bold"
            />
            <div className="p-8">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Column */}
                <div className="lg:w-1/2">
                  <div className="prose prose-sm max-w-none text-white leading-relaxed space-y-4">
                    <p className="font-nohemi font-light">
                      Sabar Bonda (Cactus Pears) is my deeply personal reimagining of the
                      grieving period I experienced in my ancestral village in 2016. Born
                      and raised in a Mumbai slum by a chauffeur father and a homemaker
                      mother, my parents accepted my sexuality, but my extended family
                      in the village was unaware. During this grieving period, they began
                      pressuring me to marry within a year, as per custom. This constant
                      pressure overshadowed my grief, leaving me longing for an escape I
                      couldn't find at the time.
                    </p>
                    <p className="font-nohemi font-light">
                      Through this film, I explore the possibility of solace and freedom by
                      allowing my protagonist to experience moments of connection and
                      respite with an estranged childhood friend. These moments gradually
                      blossom into a tender bond, making this film a journey that begins
                      with tragedy and moves toward hope and positivity.
                    </p>
                    <p className="font-nohemi font-light">
                      To ensure authenticity, I cast actors from the region where the film
                      was shot, despite the challenges of finding local talent willing to
                      portray queer characters due to cultural stigma. After three years of
                      searching, Bhushaan Manoj and Suraaj Suman were selected for their
                      backgrounds as trained theater actors and their six-year friendship,
                      which added depth and realism to the characters' bond and intimacy.
                      Their grounded and relatable appearances were also crucial to
                      portraying queer individuals as ordinary people rather than idealized
                      figures, further humanizing their story.
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:w-1/2">
                  <div className="prose prose-sm max-w-none text-white leading-relaxed space-y-4">
                    <p className="font-nohemi font-light">
                      My personal experiences shaped Sabar Bonda to reflect the realities
                      of lower-class queer life in India, challenging the misconception that
                      queer experiences are limited to the upper class. By weaving together
                      urban and rural experiences, the film aims to normalize queerness and
                      celebrate its presence in all layers of society.
                    </p>
                    <p className="font-nohemi font-light">
                      The characters of the parents in the film are inspired by my parents
                      whose love and wisdom led them to accept my sexuality without
                      any conflict. By highlighting this aspect of acceptance without
                      sensationalizing struggle, the film offers a fresh perspective that
                      redefines queer narratives and fosters hope.
                    </p>
                    <p className="font-nohemi font-light">
                      I used static frames to capture the stillness and sluggish pace of that
                      time in the village. And although at its core it's a romance drama, it has
                      no background score. I wanted to use layered soundscape to paint the
                      urban and rural spaces to further enhances the tender quality of the
                      film.
                    </p>
                    <p className="font-nohemi font-light">
                      I shot this film in a small village called Kharshinde, where my mother
                      was born and raised. We filmed several scenes near a man-made lake
                      in the village, created decades ago due to the lack of a natural water
                      source. When the lake was being dug, my mother, then a teenager,
                      worked as one of the laborers. Knowing that this landscape holds a
                      part of my mother's personal history made the experience deeply
                      meaningful for me.
                    </p>
                    <div className="mt-8 pt-4 border-t border-white/30">
                      <p className="font-serif font-semibold text-white text-right text-2xl">
                        - Rohan Parashuram Kanawade, Director
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* <Section className="bg-black/30 backdrop-blur-sm">
            <SectionHeader 
              title="Film Information"
              variant="dark"
            />
            <div className="bg-white/95 backdrop-blur-sm p-8 shadow-film">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filmInfo.map((info, index) => (
                  <div key={index}>
                    <dt className="text-sm font-medium text-muted mb-1 font-nohemi">{info.label}</dt>
                    <dd className="text-base font-medium text-ink-900 font-nohemi">{info.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          </Section> */}

          <Section>
            <SectionHeader 
              title="Cast & Crew"
              variant="dark"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Side - Movie Poster */}
              <div className="lg:col-span-4">
                <div className="w-full max-w-md mx-auto lg:mx-0">
                  <img 
                    src="/images/vertical_poster.jpg"
                    alt="Sabar Bonda Movie Poster"
                    className="w-full h-auto shadow-film object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Middle - Synopsis */}
              <div className="lg:col-span-5">
                <div className="bg-white/95 backdrop-blur-sm p-8 shadow-film">
                  <h3 className="text-2xl font-serif font-bold text-ink-900 mb-6">
                    Synopsis
                  </h3>
                  <div className="prose prose-sm max-w-none text-body leading-relaxed space-y-4 text-sm font-nohemi font-medium">
                    <p>
                      Anand, a 30-something city dweller compelled to spend a 10-day mourning period for his father in the rugged countryside of western India, tenderly bonds with a local farmer who is struggling to stay unmarried. As the mourning ends, forcing his return, Anand must decide the fate of his relationship born under duress.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Cast & Crew List */}
              <div className="lg:col-span-3">
                <div className="bg-white/95 backdrop-blur-sm p-6 shadow-film">
                  <div className="space-y-6">
                    
                    {/* Written and Directed */}
                    <div>
                      <h4 className="text-sm font-semibold text-copper-500 uppercase tracking-wide mb-2 font-nohemi">
                        Written & Directed
                      </h4>
                      <p className="text-base font-medium text-ink-900 font-nohemi">
                        Rohan Parashuram Kanawade
                      </p>
                    </div>

                    {/* Producers */}
                    <div>
                      <h4 className="text-sm font-semibold text-copper-500 uppercase tracking-wide mb-2 font-nohemi">
                        Producers
                      </h4>
                      <div className="space-y-1">
                        <p className="text-base font-medium text-ink-900 font-nohemi">
                          Lotus Visual Productions (Neeraj Churi)
                        </p>
                        <p className="text-base font-medium text-ink-900 font-nohemi">
                          Kaushik Ray
                        </p>
                        <p className="text-base font-medium text-ink-900 font-nohemi">
                          Naren Chandavarkar
                        </p>
                        <p className="text-base font-medium text-ink-900 font-nohemi">
                          Sidharth Meer
                        </p>
                        <p className="text-base font-medium text-ink-900 font-nohemi">
                          Hareesh Reddypalli
                        </p>
                        <p className="text-base font-medium text-ink-900 font-nohemi">
                          Rohan Parashuram Kanawade
                        </p>
                      </div>
                    </div>

                    {/* Executive Producers */}
                    <div>
                      <h4 className="text-sm font-semibold text-copper-500 uppercase tracking-wide mb-2 font-nohemi">
                        Executive Producers
                      </h4>
                      <div className="space-y-1">
                        <p className="text-base font-medium text-ink-900 font-nohemi">
                          Ilann Girard
                        </p>
                        <p className="text-base font-medium text-ink-900 font-nohemi">
                          Kishor Vasant Sawant
                        </p>
                      </div>
                    </div>

                    {/* Cast */}
                    <div>
                      <h4 className="text-sm font-semibold text-copper-500 uppercase tracking-wide mb-2 font-nohemi">
                        Cast
                      </h4>
                      <div className="space-y-1 font-medium">
                        <p className="text-md font-medium text-ink-900 font-nohemi">
                          Bhushaan Manoj
                        </p>
                        <p className="text-md font-medium text-ink-900 font-nohemi">
                          Suraaj Suman
                        </p>
                        <p className="text-md font-medium text-ink-900 font-nohemi">
                          Jayshri Jagtap
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Accolades Section */}
      <section id="accolades" className="relative">
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
              title="Awards & Recognition"
              subtitle="Critical acclaim and festival honors"
              variant="dark"
            />
            
            {/* Auto-scrolling Carousel */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-infinite space-x-8 pb-4">
                {/* Awards */}
                <div className="flex-shrink-0 w-96 bg-white/95 backdrop-blur-sm p-6 shadow-film border-l-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-4">
                    <StatBadge 
                      title="Sundance Film Festival"
                      subtitle="2025"
                      variant="laurel"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-ink-900 mb-3 line-clamp-2">
                    World Cinema Grand Jury Prize: Dramatic
                  </h3>
                  <p className="text-sm text-body leading-relaxed font-nohemi font-medium line-clamp-3">
                    Prestigious recognition for outstanding dramatic filmmaking in world cinema competition.
                  </p>
                </div>

                {/* Critical Praise Items */}
                <div className="flex-shrink-0 w-96 bg-white/95 backdrop-blur-sm p-6 shadow-film border-l-4 border-copper-500">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 font-nohemi">
                      Critical Praise
                    </span>
                  </div>
                  <blockquote className="text-sm italic text-ink-900 leading-relaxed mb-3 font-nohemi font-medium line-clamp-4">
                    "A tender and authentic portrayal of queer love in rural India, beautifully crafted with emotional depth and cultural sensitivity."
                  </blockquote>
                  <cite className="text-xs text-muted font-medium font-nohemi">— Variety</cite>
                </div>

                <div className="flex-shrink-0 w-96 bg-white/95 backdrop-blur-sm p-6 shadow-film border-l-4 border-copper-500">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 font-nohemi">
                      Critical Praise
                    </span>
                  </div>
                  <blockquote className="text-sm italic text-ink-900 leading-relaxed mb-3 font-nohemi font-medium line-clamp-4">
                    "Kanawade's direction brings remarkable intimacy to this story of connection amidst grief and societal pressure."
                  </blockquote>
                  <cite className="text-xs text-muted font-medium font-nohemi">— The Hollywood Reporter</cite>
                </div>

                <div className="flex-shrink-0 w-96 bg-white/95 backdrop-blur-sm p-6 shadow-film border-l-4 border-copper-500">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 font-nohemi">
                    Critical Praise
                    </span>
                  </div>
                  <blockquote className="text-sm italic text-ink-900 leading-relaxed mb-3 font-nohemi font-medium line-clamp-4">
                    "A powerful debut that challenges stereotypes while celebrating the universality of human connection."
                  </blockquote>
                  <cite className="text-xs text-muted font-medium font-nohemi">— IndieWire</cite>
                </div>

                <div className="flex-shrink-0 w-96 bg-white/95 backdrop-blur-sm p-6 shadow-film border-l-4 border-green-500">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 font-nohemi">
                      Industry Recognition
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-ink-900 mb-3 line-clamp-2">
                    Official Selection - Mumbai Film Festival
                  </h3>
                  <p className="text-sm text-body leading-relaxed font-nohemi font-medium line-clamp-3">
                    Selected for the prestigious competition category celebrating innovative Indian cinema.
                  </p>
                </div>

                {/* Duplicate items for seamless loop */}
                <div className="flex-shrink-0 w-96 bg-white/95 backdrop-blur-sm p-6 shadow-film border-l-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-4">
                    <StatBadge 
                      title="Sundance Film Festival"
                      subtitle="2025"
                      variant="laurel"
                    />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-ink-900 mb-3 line-clamp-2">
                    World Cinema Grand Jury Prize: Dramatic
                  </h3>
                  <p className="text-sm text-body leading-relaxed font-nohemi font-medium line-clamp-3">
                    Prestigious recognition for outstanding dramatic filmmaking in world cinema competition.
                  </p>
                </div>

                <div className="flex-shrink-0 w-96 bg-white/95 backdrop-blur-sm p-6 shadow-film border-l-4 border-copper-500">
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-copper-100 text-copper-700 font-nohemi">
                      Critical Praise
                    </span>
                  </div>
                  <blockquote className="text-sm italic text-ink-900 leading-relaxed mb-3 font-nohemi font-medium line-clamp-4">
                    "A tender and authentic portrayal of queer love in rural India, beautifully crafted with emotional depth and cultural sensitivity."
                  </blockquote>
                  <cite className="text-xs text-muted font-medium font-nohemi">— Variety</cite>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="bts" className="relative">
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
          <Section className="bg-black/30 backdrop-blur-sm">
            <SectionHeader 
              title="Gallery"
              subtitle="Behind the scenes moments and production stills"
              variant="dark"
            />
            
            {/* Image Carousel */}
            <div className="relative max-w-4xl mx-auto">
              {/* Main Image Display */}
              <div className="relative aspect-video bg-black/50 backdrop-blur-sm shadow-film overflow-hidden">
                <img 
                  src={galleryImages[currentImageIndex].src}
                  alt={galleryImages[currentImageIndex].alt}
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                  loading="lazy"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all duration-200 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Counter */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-sm font-nohemi backdrop-blur-sm">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Image Caption */}
              <div className="mt-4 bg-white/95 backdrop-blur-sm p-4 shadow-film text-center">
                <p className="text-body font-nohemi font-medium leading-relaxed">
                  {galleryImages[currentImageIndex].caption}
                </p>
              </div>

              {/* Thumbnail Navigation */}
              <div className="mt-6 flex justify-center space-x-3 overflow-x-auto pb-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'border-copper-500 shadow-lg scale-105' 
                        : 'border-white/30 hover:border-white/60'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img 
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              {/* Dot Indicators */}
              <div className="mt-4 flex justify-center space-x-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentImageIndex 
                        ? 'bg-copper-500 scale-125' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* Screenings Section */}
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
                      <div className="bg-white/95 backdrop-blur-sm p-8 shadow-film border border-white/20">
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
                              <div className="flex items-center gap-2 text-body font-nohemi font-medium">
                                <MapPin size={16} className="text-moss-500" />
                                <span>{screening.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-body font-nohemi font-medium">
                                <Calendar size={16} className="text-moss-500" />
                                <span>{screening.dates}</span>
                              </div>
                              <div className="flex items-center gap-2 text-body font-nohemi font-medium">
                                <Clock size={16} className="text-moss-500" />
                                <span>{screening.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-body font-nohemi font-medium">
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

      {/* Contact Section */}
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {contactPanels.map((panel, index) => (
                <div key={index} className="bg-white/95 backdrop-blur-sm p-8 shadow-film">
                  <h3 className="text-xl font-serif font-semibold text-ink-900 mb-4">
                    {panel.title}
                  </h3>
                  <p className="text-body leading-relaxed mb-6 font-nohemi font-medium">
                    {panel.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Mail size={18} className="text-moss-500 flex-shrink-0" />
                        <span className="text-sm text-ink-900 font-mono truncate">
                          {panel.email}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(panel.email, `email-${index}`)}
                        className="flex-shrink-0 p-2 rounded-full text-moss-500 hover:text-moss-600 hover:bg-moss-50 transition-all duration-200"
                        aria-label={`Copy ${panel.email}`}
                      >
                        {copiedEmail === `email-${index}` ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Phone size={18} className="text-moss-500 flex-shrink-0" />
                        <span className="text-sm text-ink-900 font-mono">
                          {panel.phone}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(panel.phone, `phone-${index}`)}
                        className="flex-shrink-0 p-2 rounded-full text-moss-500 hover:text-moss-600 hover:bg-moss-50 transition-all duration-200"
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

          <Section className="bg-black/30 backdrop-blur-sm">
            <SectionHeader 
              title="Send Us a Message"
              subtitle="Have a specific inquiry? Send us a message and we'll get back to you promptly"
              variant="dark"
            />
            
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm p-8 shadow-film">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-ink-900 mb-2 font-nohemi">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-md border ${
                        formErrors.name ? 'border-red-500' : 'border-border'
                      } focus:ring-2 focus:ring-copper-500 focus:border-copper-500 transition-colors duration-200`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && (
                      <p className="mt-2 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ink-900 mb-2 font-nohemi">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-md border ${
                        formErrors.email ? 'border-red-500' : 'border-border'
                      } focus:ring-2 focus:ring-copper-500 focus:border-copper-500 transition-colors duration-200`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && (
                      <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-ink-900 mb-2 font-nohemi">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-md border ${
                        formErrors.message ? 'border-red-500' : 'border-border'
                      } focus:ring-2 focus:ring-copper-500 focus:border-copper-500 transition-colors duration-200 resize-vertical`}
                      placeholder="Tell us about your inquiry..."
                    />
                    {formErrors.message && (
                      <p className="mt-2 text-sm text-red-600">{formErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full px-6 py-3 font-medium shadow-sm bg-copper-500 text-white hover:bg-copper-600 focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </Section>
        </div>
      </section>
    </>
  );
};

export default Home;