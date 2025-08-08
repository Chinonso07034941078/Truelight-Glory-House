import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import trueligtLogo from '../assets/truelight-logo.png'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <Link to="/" className="flex items-center z-10">
        <img
  src={trueligtLogo}
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
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/units", label: "Units" },
              { to: "/sermons", label: "Sermons" },
              { to: "/events", label: "Events" },
              { to: "/support", label: "Support" }
            ].map((item) => (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  className={`relative font-medium transition-all duration-300 group ${
                    hasScrolled ? 'text-sm' : 'text-sm'
                  } hover:text-blue-300`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-200 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button for Desktop */}
        <div className="hidden md:block">
          <Link
            to="/support"
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-500 hover:to-blue-300 px-3 py-1.5 text-xs"
          >
            Give Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-blue-300 transition-colors duration-300 z-10" 
          onClick={toggleMenu} 
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Enhanced Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-blue-950/95 via-blue-900/90 to-blue-800/95 backdrop-blur-xl shadow-2xl transform transition-all duration-500 ease-out z-50 md:hidden border-l border-blue-400/20 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Menu Header */}
        <div className="p-4 flex justify-between items-center border-b border-blue-400/10">
          <span className="text-white font-bold text-lg">Menu</span>
          <button 
            onClick={closeMenu} 
            className="text-white hover:text-blue-300 transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Mobile Menu Items */}
        <div className="px-4 py-4">
          <ul className="flex flex-col gap-2 text-white">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/units", label: "Units" },
              { to: "/sermons", label: "Sermons" },
              { to: "/events", label: "Events" },
              { to: "/support", label: "Support" }
            ].map((item) => (
              <li key={item.to}>
                <Link 
                  to={item.to} 
                  onClick={closeMenu} 
                  className="block py-2 px-3 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 hover:text-blue-300 border-b border-transparent hover:border-blue-400/20"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile CTA Button */}
          <div className="mt-6 pt-4 border-t border-blue-400/10">
            <Link
              to="/support"
              onClick={closeMenu}
              className="block w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Give Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}