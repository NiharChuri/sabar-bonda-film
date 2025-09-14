import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { path: '#home', label: 'Home' },
    { path: '#about', label: 'About' },
    { path: '#accolades', label: 'Reviews' },
    { path: '#screenings', label: 'Awards' },
    { path: '#bts', label: 'BTS' },
    { path: '#contact', label: 'Contact' }
  ];

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.path.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
      isScrolled ? 'bg-black/90 backdrop-blur-md shadow-film' : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-cabinet font-bold text-2xl sm:text-3xl lg:text-4xl text-white hover:text-white/80 transition-all duration-300 transform hover:scale-105"
          >
            Sabar Bonda
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item, index) => {
              const sectionId = item.path.substring(1);
              const isActive = activeSection === sectionId;
              
              return (
                <div 
                  key={item.path}
                  className="nav-item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <a
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={`relative px-3 py-2 text-sm lg:text-base font-regular transition-all duration-300 ease-out font-nohemi tracking-wide block ${
                      isActive 
                        ? 'text-copper-500 font-medium' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {/* Active indicator */}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-copper-500 transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0'
                    }`} />
                    {/* Hover effect */}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white/50 transition-all duration-300 ease-out hover:w-full" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-full text-white hover:text-white/80 hover:bg-white/10 transition-all duration-300 transform hover:scale-110 active:scale-95 touch-target"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transform transition-all duration-300 ease-out ${
                isOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
              }`}>
                <Menu size={24} />
              </span>
              <span className={`absolute inset-0 transform transition-all duration-300 ease-out ${
                isOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
              }`}>
                <X size={24} />
              </span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          isOpen 
            ? 'max-h-96 opacity-100 py-4 border-t border-white/20' 
            : 'max-h-0 opacity-0 py-0'
        }`}>
          <div className={`glass-dark rounded-lg transition-all duration-300 ease-out ${
            isOpen ? 'transform translate-y-0' : 'transform -translate-y-4'
          }`}>
            <div className="flex flex-col space-y-1 p-4">
              {navItems.map((item, index) => {
                const sectionId = item.path.substring(1);
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                    className={`px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg font-nohemi tracking-wide transform hover:scale-105 ${
                      isActive
                        ? 'text-copper-500 bg-copper-500/10 border-l-4 border-copper-500'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    style={{ 
                      animationDelay: `${(index + 1) * 100}ms`,
                      transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.3s ease-out ${(index + 1) * 100}ms`
                    }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;