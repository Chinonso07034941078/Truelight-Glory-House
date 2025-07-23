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
      setHasScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50">
      {/* Blurred or Solid Background Layer */}
     <div
  className={`absolute top-0 left-0 right-0 h-full transition-all duration-500 border-b ${
    hasScrolled 
      ? 'bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 border-yellow-400/30' 
      : 'bg-slate-900/70 backdrop-blur-md border-yellow-400/20'
  }`}
></div>
      {/* Main Nav Content (not blurred) */}
     <div className="relative px-4 py-1 max-w-7xl mx-auto flex justify-between items-center text-white">
        <Link to="/" className="flex items-center">
    <img
      src={trueligtLogo}
      alt="Truelight Logo"
      className="object-contain transition-transform duration-300 hover:scale-110"
      style={{
         height: '7rem',         // or try 4.5rem, 5rem if needed
         maxHeight: '100%',
         width: 'auto',
         marginTop: '-1.5rem',   // lift it slightly if it feels too low
         marginBottom: '-2.3rem' // optional: compresses space without growing navbar
         }}
/>
    </Link>

        {/* Desktop Nav */}
      <div className="hidden md:flex flex-1 justify-center">
        <ul className="flex gap-14 text-md font-bold">
          <li><Link to="/" className="hover:text-yellow-400 transition-colors duration-300 hover:underline decoration-yellow-400">Home</Link></li>
          <li><Link to="/about" className="hover:text-yellow-400 transition-colors duration-300 hover:underline decoration-yellow-400">About</Link></li>
          <li><Link to="/units" className="hover:text-yellow-400 transition-colors duration-300 hover:underline decoration-yellow-400">Units</Link></li>
          <li><Link to="/sermons" className="hover:text-yellow-400 transition-colors duration-300 hover:underline decoration-yellow-400">Sermons</Link></li>
          <li><Link to="/events" className="hover:text-yellow-400 transition-colors duration-300 hover:underline decoration-yellow-400">Events</Link></li>
          <li><Link to="/support" className="hover:text-yellow-400 transition-colors duration-300 hover:underline decoration-yellow-400">Support</Link></li>
        </ul>
      </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-white hover:text-yellow-400 transition-colors duration-300" onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMenu}
        ></div>
      )}

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 md:hidden border-l border-yellow-400/30 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex justify-end border-b border-yellow-400/20">
          <button onClick={closeMenu} className="hover:text-yellow-400 transition-colors duration-300">
            <X size={24} className="text-white" />
          </button>
        </div>
        <ul className="flex flex-col gap-6 text-sm font-medium px-6 text-white mt-6">
          <li><Link to="/" onClick={closeMenu} className="hover:text-yellow-400 transition-colors duration-300 py-2 border-b border-transparent hover:border-yellow-400/30">Home</Link></li>
          <li><Link to="/about" onClick={closeMenu} className="hover:text-yellow-400 transition-colors duration-300 py-2 border-b border-transparent hover:border-yellow-400/30">About</Link></li>
          <li><Link to="/units" onClick={closeMenu} className="hover:text-yellow-400 transition-colors duration-300 py-2 border-b border-transparent hover:border-yellow-400/30">Units</Link></li>
          <li><Link to="/sermons" onClick={closeMenu} className="hover:text-yellow-400 transition-colors duration-300 py-2 border-b border-transparent hover:border-yellow-400/30">Sermons</Link></li>
          <li><Link to="/events" onClick={closeMenu} className="hover:text-yellow-400 transition-colors duration-300 py-2 border-b border-transparent hover:border-yellow-400/30">Events</Link></li>
          <li><Link to="/support" onClick={closeMenu} className="hover:text-yellow-400 transition-colors duration-300 py-2 border-b border-transparent hover:border-yellow-400/30">Support</Link></li>
        </ul>
      </div>
    </nav>
  );
}