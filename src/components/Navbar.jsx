import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import truelightLogo from '../assets/truelight-logo.png'; // Fixed typo in import name

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation(); // Added to track current route
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    // Throttled scroll handler for better performance
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

  // Navigation items array to ensure consistency between desktop and mobile
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/units", label: "Units" },
    { to: "/sermons", label: "Sermons" },
    { to: "/events", label: "Events" },
    { to: "/support", label: "Support" },
    { to: "/contact", label: "Contact" } // Added to both desktop and mobile
  ];

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Enhanced Background Layer with smoother transitions */}
      <div
        className={`absolute top-0 left-0 right-0 h-full transition-all duration-700 ease-out ${
          hasScrolled 
            ? 'bg-gradient-to-r from-blue-950/95 via-blue-900/90 to-blue-800/95 backdrop-blur-xl border-b border-blue-400/20 shadow-2xl' 
            : 'bg-black/20 backdrop-blur-sm border-b border-blue-400/10'
        }`}
      />
      
      {/* Main Nav Content */}
      <div className="relative px-6 max-w-7xl mx-auto flex justify-between items-center text-white transition-all duration-700 py-1">
        
        {/* Logo */}
        <Link to="/" className="flex items-center z-10" aria-label="Truelight Home">
          <img
            src={truelightLogo} // Fixed variable name
            alt="Truelight Logo"
            className="h-16 scale-150 md:scale-125 lg:scale-[1.7] transition-transform duration-500 origin-left drop-shadow-2xl"
            style={{
              filter: 'brightness(1.3) contrast(1.2) saturate(1.1)',
              WebkitFilter: 'brightness(1.3) contrast(1.2) saturate(1.1)',
            }}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-8 lg:gap-12">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  className={`relative font-light tracking-wide transition-all duration-300 group ${
                    hasScrolled ? 'text-sm' : 'text-sm'
                  } hover:text-blue-200 ${
                    location.pathname === item.to ? 'text-blue-200 font-medium' : 'text-white/90'
                  }`}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent transition-all duration-300 ${
                    location.pathname === item.to ? 'w-full opacity-100' : 'w-0 opacity-0'
                  } group-hover:w-full group-hover:opacity-100`} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA Button for Desktop */}
        <div className="hidden md:block">
          <Link
            to="/support"
            className="bg-white/10 backdrop-blur-md text-white font-medium tracking-wide rounded-full border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105 px-6 py-2 text-sm"
            aria-label="Support Truelight"
          >
            Give Now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-blue-200 transition-colors duration-300 z-10" 
          onClick={toggleMenu} 
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Enhanced Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-blue-950/95 via-blue-900/90 to-blue-800/95 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-out z-50 md:hidden border-l border-blue-400/20 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Mobile Menu Header */}
        <div className="p-6 flex justify-between items-center border-b border-blue-400/10">
          <span className="text-white font-light text-xl tracking-wider">Menu</span>
          <button 
            onClick={closeMenu} 
            className="text-white hover:text-blue-200 transition-colors duration-300"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Mobile Menu Items */}
        <div className="px-6 py-8">
          <ul className="flex flex-col gap-3 text-white">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  onClick={closeMenu} 
                  className={`block py-3 px-4 rounded-xl font-light tracking-wide transition-all duration-300 hover:bg-white/10 hover:text-blue-200 border-b border-transparent hover:border-blue-400/20 ${
                    location.pathname === item.to ? 'text-blue-200 bg-white/5 font-medium' : 'text-white/90'
                  }`}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile CTA Button */}
          <div className="mt-8 pt-6 border-t border-blue-400/10">
            <Link
              to="/support"
              onClick={closeMenu}
              className="block w-full bg-white/10 backdrop-blur-md text-white text-center font-medium tracking-wide py-4 rounded-2xl border border-white/30 hover:bg-white hover:text-blue-900 transition-all duration-500 transform hover:scale-105"
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