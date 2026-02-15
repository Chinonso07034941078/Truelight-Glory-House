import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    let throttleTimeout = null;
    
    const handleScroll = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          setHasScrolled(window.scrollY > 50);
          throttleTimeout = null;
        }, 100);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout) clearTimeout(throttleTimeout);
    };
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/units", label: "Units" },
    { to: "/sermons", label: "Sermons" },
    { to: "/events", label: "Events" },
    { to: "/support", label: "Support" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50">
      
      {/* Background - Clean Transition */}
      <div
        className={`absolute top-0 left-0 right-0 h-full transition-all duration-500 ${
          hasScrolled 
            ? 'bg-white border-b-2 border-gray-900 shadow-lg' 
            : 'bg-black/40 backdrop-blur-md border-b border-white/10'
        }`}
      />
      
      {/* Main Nav Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-center transition-all duration-500 h-20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center z-10" aria-label="Truelight Home">
          <img
            src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270378/truelight-logo_ta57tl.png'
            alt="Truelight Logo"
            className={`h-12 sm:h-14 transition-all duration-500 ${
              hasScrolled ? 'brightness-100' : 'brightness-200'
            }`}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  className={`relative font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                    hasScrolled 
                      ? location.pathname === item.to 
                        ? 'text-blue-600' 
                        : 'text-gray-900 hover:text-blue-600'
                      : location.pathname === item.to
                        ? 'text-blue-400'
                        : 'text-white hover:text-blue-400'
                  }`}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                  
                  {/* Active Indicator */}
                  {location.pathname === item.to && (
                    <span className={`absolute -bottom-2 left-0 right-0 h-0.5 ${
                      hasScrolled ? 'bg-blue-600' : 'bg-blue-400'
                    }`} />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA Button for Desktop */}
        <div className="hidden lg:block">
          <Link
            to="/support"
            className={`font-bold text-sm uppercase tracking-wider px-6 py-3 transition-all duration-300 ${
              hasScrolled
                ? 'bg-blue-600 text-white hover:bg-gray-900'
                : 'bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
            }`}
            aria-label="Support Truelight"
          >
            Give Now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={`lg:hidden transition-colors duration-300 z-10 ${
            hasScrolled ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-400'
          }`}
          onClick={toggleMenu} 
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>
      </div>
      
      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile Menu - Brutalist Style */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-all duration-500 ease-out z-50 lg:hidden border-l-4 border-blue-600 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Mobile Menu Header */}
        <div className="p-6 sm:p-8 flex justify-between items-center border-b-2 border-gray-900">
          <span className="text-gray-900 font-black text-2xl tracking-tight uppercase">Menu</span>
          <button 
            onClick={closeMenu} 
            className="text-gray-900 hover:text-blue-600 transition-colors duration-300"
            aria-label="Close Menu"
          >
            <X size={28} strokeWidth={2.5} />
          </button>
        </div>
        
        {/* Mobile Menu Items */}
        <div className="px-6 sm:px-8 py-8">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  onClick={closeMenu} 
                  className={`block py-4 px-4 font-bold text-lg uppercase tracking-wide transition-all duration-300 border-l-4 ${
                    location.pathname === item.to 
                      ? 'text-blue-600 border-blue-600 bg-blue-50' 
                      : 'text-gray-900 border-transparent hover:border-gray-900 hover:bg-gray-50'
                  }`}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile CTA Button */}
          <div className="mt-8 pt-8 border-t-2 border-gray-900">
            <Link
              to="/support"
              onClick={closeMenu}
              className="block w-full bg-blue-600 text-white text-center font-black text-base uppercase tracking-wider py-5 hover:bg-gray-900 transition-all duration-300"
              aria-label="Support Truelight"
            >
              Give Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}