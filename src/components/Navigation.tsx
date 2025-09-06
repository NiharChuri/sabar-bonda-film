import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '#home', label: 'Home' },
    { path: '#about', label: 'About' },
    { path: '#accolades', label: 'Accolades' },
    { path: '#bts', label: 'BTS' },
    { path: '#screenings', label: 'Festivals' },
    { path: '#contact', label: 'Contact' }
  ];

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a 
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="font-cabinet font-bold text-2xl sm:text-3xl lg:text-4xl text-white hover:text-white/80 transition-colors duration-200"
          >
            Sabar Bonda
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="relative px-3 py-2 text-sm lg:text-base font-regular transition-colors duration-200 text-white/80 hover:text-white font-nohemi link-underline-copper tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-full text-white hover:text-white/80 hover:bg-white/10 transition-all duration-200"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-white/20 bg-black/50 backdrop-blur-md">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="px-3 py-2 text-base font-medium transition-colors duration-200 text-white/80 hover:text-white font-nohemi link-underline-copper"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;