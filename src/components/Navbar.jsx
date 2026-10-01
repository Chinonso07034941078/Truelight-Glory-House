import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const isWccPage = location.pathname === "/wcc" || location.pathname.startsWith("/wcc/");
  
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
  { to: "/wcc", label: "WCC" },
  { to: "/contact", label: "Contact" },
];

  return (
    <nav className="fixed top-0 w-full z-50">
      
      {/* Background - Transparent initially, Navy/Dark Blue gradient when scrolled */}
      <div
        className={`absolute top-0 left-0 right-0 h-full transition-all duration-500 ${
          hasScrolled
            ? isWccPage
              ? 'bg-gradient-to-r from-[#431407] via-[#7c2d12] to-[#431407] shadow-[0_8px_30px_rgba(67,20,7,0.45)]'
              : 'bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 shadow-lg'
            : 'bg-transparent'
        }`}
      />
      
      {/* Main Nav Content */}
      <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex justify-between items-center transition-all duration-500 h-20">
        
        {/* Logo - Much Larger Size */}
        <Link to="/" className="flex items-center z-10" aria-label="Truelight Home">
          <img
            src='https://res.cloudinary.com/dnvgl9k4i/image/upload/v1767270378/truelight-logo_ta57tl.png'
            alt="Truelight Logo"
            className={`h-24 sm:h-28 transition-all duration-500 ${
              hasScrolled ? 'brightness-100' : 'brightness-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
            }`}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  className={`relative font-medium text-sm transition-all duration-300 ${
                    hasScrolled
                      ? location.pathname === item.to
                        ? isWccPage
                          ? 'text-orange-200 font-semibold'
                          : 'text-white font-semibold'
                        : isWccPage
                          ? 'text-orange-50/90 hover:text-orange-200'
                          : 'text-white/90 hover:text-white'
                      : location.pathname === item.to
                        ? isWccPage
                          ? 'text-orange-200 font-semibold drop-shadow-[0_2px_10px_rgba(251,146,60,0.45)]'
                          : 'text-white font-semibold drop-shadow-md'
                        : isWccPage
                          ? 'text-orange-50/90 hover:text-orange-200 drop-shadow-md'
                          : 'text-white/90 hover:text-white drop-shadow-md'
                  }`}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                  
                  {/* Active Indicator */}
                  {location.pathname === item.to && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                      isWccPage
                        ? 'bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.9)]'
                        : 'bg-white'
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
            className={`font-semibold text-sm px-5 py-2.5 rounded-md transition-all duration-300 ${
              hasScrolled
                ? isWccPage
                  ? 'bg-orange-400 text-orange-950 hover:bg-orange-300 shadow-[0_8px_24px_rgba(67,20,7,0.28)]'
                  : 'bg-white text-blue-900 hover:bg-blue-50'
                : isWccPage
                  ? 'bg-orange-400 text-orange-950 hover:bg-orange-300 shadow-[0_8px_24px_rgba(67,20,7,0.38)]'
                  : 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
            }`}
            aria-label="Support Truelight"
          >
            Give Now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={`lg:hidden transition-colors duration-300 z-10 ${
            hasScrolled ? 'text-white hover:text-white/80' : 'text-white hover:text-white/80 drop-shadow-md'
          }`}
          onClick={toggleMenu} 
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
        </button>
      </div>
      
      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className={`fixed inset-0 backdrop-blur-sm z-40 lg:hidden ${
            isWccPage
              ? 'bg-gradient-to-br from-[#431407]/90 via-[#7c2d12]/80 to-[#2b0d05]/95'
              : 'bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-950/90'
          }`}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 text-white shadow-2xl transform transition-all duration-500 ease-out z-50 lg:hidden ${
          isWccPage
            ? 'bg-gradient-to-br from-[#431407] via-[#7c2d12] to-[#2b0d05]'
            : 'bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-950/90'
        } ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        {/* Mobile Menu Header */}
        <div
          className={`p-6 flex justify-between items-center border-b ${
            isWccPage
              ? 'border-orange-300/20 bg-gradient-to-r from-[#431407] via-[#9a3412] to-[#431407]'
              : 'border-gray-200 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900'
          }`}
        >
          <span className="text-white font-semibold text-xl">Menu</span>
          <button 
            onClick={closeMenu} 
            className="text-white hover:text-white/80 transition-colors duration-300"
            aria-label="Close Menu"
          >
            <X size={26} strokeWidth={2} />
          </button>
        </div>
        
        {/* Mobile Menu Items */}
        <div className="px-6 py-6">
          <ul className="flex flex-col text-white  gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  onClick={closeMenu} 
                  className={`block py-3 px-4 font-medium text-base rounded-md transition-all duration-300 ${
                    location.pathname === item.to
                      ? isWccPage
                        ? 'text-orange-800 uppercase font-bold bg-orange-100'
                        : 'text-blue-600 uppercase font-bold bg-blue-50'
                      : isWccPage
                        ? 'text-orange-50 font-bold uppercase hover:text-orange-100 hover:bg-orange-950/40'
                        : 'text-white font-bold hover:text-gray-700 uppercase hover:bg-gray-50'
                  }`}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile CTA Button */}
          <div className={`mt-6 pt-6 border-t ${isWccPage ? 'border-orange-200/20' : 'border-gray-200'}`}>
            <Link
              to="/support"
              onClick={closeMenu}
              className={`block w-full text-center font-semibold text-base rounded-md py-3 transition-all duration-300 ${
                isWccPage
                  ? 'bg-orange-400 text-orange-950 hover:bg-orange-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
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
